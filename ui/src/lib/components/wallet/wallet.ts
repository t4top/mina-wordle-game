import { secretWord } from "$lib/gamelogic/store";
import ZkappWorkerClient from "$lib/zkapp/worker_client";
import { user, transactionFee } from "./user_store";

const MINA_SUB_DECIMAL: number = 1e9;

// Endpoint of oracle server
const ORACLE_ENDPOINT: string = "https://mina-wordle-oracle.juxdan.io/wordle";

// Public Address of the zkApp account
const ZKAPP_CONTRACT_ADDRESS: string = "B62qo7TsbVEKU2q7md2upZuMwjEizuYcMy5t4FPdmB3YkonZbF5dJSu";

const WALLET_CONNECTED_BEFORE_FLAG: string = "wallet_connected_before";

const mina = (window as any)?.mina;
const zkClient = new ZkappWorkerClient();

// -------------------------------------------------------

export async function init() {
  user.set({ hasWallet: !!mina });

  // Wallet initialization
  if (mina) {
    mina.on("chainChanged", handleChainChanged);
    mina.on("accountsChanged", handleAccountsChanged);

    // load SnarkyJs and set active network to Berkeley Testnet
    console.log("Loading SnarkyJS...");
    await zkClient.loadSnarkyJS();
    await zkClient.setActiveInstanceToBerkeley();
    await requestNetwork();
    console.log("done");

    // request Account only if user has connected before to avoid obstructive wallet popup
    const hasConnectedBefore = localStorage.getItem(WALLET_CONNECTED_BEFORE_FLAG) === "true";
    if (hasConnectedBefore) {
      await requestAccounts();
      validateOracleData();
    }
  }
}

export async function cleanup() {
  if (zkClient) await zkClient.unloadSnarkyJS();
}

export async function connect() {
  if (!mina) return;
  await requestNetwork();
  await requestAccounts();
  await validateOracleData();

  localStorage.setItem(WALLET_CONNECTED_BEFORE_FLAG, "true");
}

export async function callZkPercentile(attempt: number): Promise<number> {
  let percentile: number = 0;

  // send user's number of attempts to the smart contract and get the percentile rank
  await zkClient
    .setupZkappInstance(ZKAPP_CONTRACT_ADDRESS)
    .then(() => zkClient.getPercentileTransactionJSON(ZKAPP_CONTRACT_ADDRESS, attempt))
    .then(txnJSON => zkClient.sendTransaction(txnJSON, transactionFee))
    .then(hash => console.log("@percentile call txn hash:", hash))
    .then(() => zkClient.fetchEvent())
    .then(eventValue => {
      percentile = Number(eventValue.toString());
    })
    .catch((e: any) => console.log(e));

  return percentile;
}

// -------------------------------------------------------

// fetch secret hidden word of the day from oracle server
async function getOracleData() {
  try {
    const date = new Date().toJSON().slice(0, 10);
    const res = await fetch(`${ORACLE_ENDPOINT}/${date}`);
    const data = await res.json();
    const secret = data.data.wordle;
    secretWord.set(secret.toUpperCase());

    return data;
  } catch (e: any) {
    console.log("Failed to fetch the secret word of the day. Error:", e.message);
  }
}

async function validateOracleData() {
  let date: string, secret: string, signature: any;

  // fetch secret word from oracle
  const data = await getOracleData();
  date = data.data.date;
  secret = data.data.wordle;
  signature = data.signature;

  const execute = false; // skip for now since it takes too long to compile zkApp
  if (execute) {
    // verify the signature of the oracle data
    await zkClient
      .setupZkappInstance(ZKAPP_CONTRACT_ADDRESS)
      .then(() => zkClient.getVerifyTransactionJSON(ZKAPP_CONTRACT_ADDRESS, date, secret, signature))
      .then(txnJSON => zkClient.sendTransaction(txnJSON, transactionFee))
      .then(hash => console.log("@verify call txn hash:", hash))
      .then(() => zkClient.fetchEvent())
      .then(eventValue => eventValue.assertGte(1))
      .catch((e: any) => console.log(e));
  }
}

async function requestNetwork() {
  await mina
    .requestNetwork()
    .then(handleChainChanged)
    .catch((e: any) => console.error(e));
}

async function handleChainChanged(newChain: string) {
  user.set({ network: newChain });
}

async function requestAccounts() {
  await mina
    .requestAccounts()
    .then(handleAccountsChanged)
    .catch((e: any) => console.error(e));
}

async function handleAccountsChanged(accounts: string[]) {
  let publicKey58: string = "";
  let walletConnected: boolean = false;

  if (accounts && accounts.length) {
    publicKey58 = accounts[0];
    await setupWorkerClient(publicKey58);
    walletConnected = true;
  } else {
    localStorage.setItem(WALLET_CONNECTED_BEFORE_FLAG, "false");
  }
  user.set({ publicKey58, walletConnected });
}

async function setupWorkerClient(publicKey58: string) {
  try {
    // check if connected user account exists or not
    const res = await zkClient.fetchAccount(publicKey58);
    const accountExists = res.error == null;
    user.set({ accountExists });

    // get account balance if account exists
    if (accountExists) {
      const balance = await zkClient.getBalance(publicKey58);
      user.set({ balance: Number(balance.toString()) / MINA_SUB_DECIMAL });
    }
  } catch (e: any) {
    console.error(e);
  }
}
