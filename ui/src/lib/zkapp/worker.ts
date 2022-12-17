import { Mina, isReady, shutdown, PublicKey, fetchAccount, Encoding, Signature, Field } from "snarkyjs";
// import type { Wordle } from "../../../../contracts/src/Wordle";
import type { Wordle } from "$lib/contracts/Wordle";

type Transaction = Awaited<ReturnType<typeof Mina.transaction>>;

const state = {
  Wordle: null as null | typeof Wordle,
  zkapp: null as null | Wordle,
  transaction: null as null | Transaction,
  hasBeenSetup: false as boolean
};

const BERKELEY_ENDPOINT: string = "https://proxy.berkeley.minaexplorer.com/graphql";

//--------------------------------------------------
// functions definition

async function loadSnarkyJS(args: {}) {
  await isReady;
}

async function unloadSnarkyJS(args: {}) {
  await shutdown();
}

async function setActiveInstanceToBerkeley(args: {}) {
  const Berkeley = Mina.Network(BERKELEY_ENDPOINT);
  Mina.setActiveInstance(Berkeley);
}

async function loadContract(args: {}) {
  console.log("loading contract...");
  const { Wordle } = await import("$lib/contracts/Wordle");
  state.Wordle = Wordle;
  console.log("done");
}

async function compileContract(args: {}) {
  console.log("compiling contract...");
  await state.Wordle!.compile();
  console.log("done");
}

async function initZkappInstance(args: { publicKey58: string }) {
  console.log("init instance...");
  const publicKey = PublicKey.fromBase58(args.publicKey58);
  state.zkapp = new state.Wordle!(publicKey);
  console.log("done");
}

async function _fetchAccount(args: { publicKey58: string }) {
  const publicKey = PublicKey.fromBase58(args.publicKey58);
  return await fetchAccount({ publicKey });
}

async function getBalance(args: { publicKey58: string }) {
  const publicKey = PublicKey.fromBase58(args.publicKey58);
  const balance = Mina.getBalance(publicKey);
  return JSON.stringify(balance.toJSON());
}

async function createVerifyTransaction(args: { date: string; secret: string; signature: any }) {
  const dateField = Encoding.stringToFields(args.date)[0];
  const secretField = Encoding.stringToFields(args.secret)[0];
  const signature = Signature.fromJSON(args.signature);

  const transaction = await Mina.transaction(() => {
    state.zkapp!.verify(dateField, secretField, signature);
  });
  state.transaction = transaction;
}

async function createPercentileTransaction(args: { attempt: number }) {
  const attempt = Field(args.attempt);

  const transaction = await Mina.transaction(() => {
    state.zkapp!.percentile(attempt);
  });
  state.transaction = transaction;
}

async function proveTransaction(args: {}) {
  await state.transaction!.prove();
}

async function getTransactionJSON(args: {}) {
  return state.transaction!.toJSON();
}

async function fetchEvent(args: {}) {
  let eventValue = Field(60);

  // fetchEvents is not yet implemented in SnarkyJs for remote blockchain.
  // I will skip below code and just return Field(60) for now
  if (false) {
    const events = await state.zkapp!.fetchEvents();
    if (events && events.length) eventValue = events[0].event.toFields(null)[0];
  }

  return JSON.stringify(eventValue.toJSON());
}

//--------------------------------------------------
// list of callable functions wrapping zkApp methods

const functions = {
  loadSnarkyJS,
  unloadSnarkyJS,
  setActiveInstanceToBerkeley,
  loadContract,
  compileContract,
  initZkappInstance,
  fetchAccount: _fetchAccount,
  getBalance,
  proveTransaction,
  getTransactionJSON,
  fetchEvent,

  setupZkappInstance: async (args: { publicKey58: string }) => {
    if (state.hasBeenSetup) return;

    console.log("setting up Zkapp...");
    await loadContract(args);
    await compileContract(args);
    await initZkappInstance(args);
    state.hasBeenSetup = true;
    console.log("done");
  },

  getVerifyTransactionJSON: async (args: { publicKey58: string; date: string; secret: string; signature: any }) => {
    console.log("getting @verify txn JSON...");
    await _fetchAccount(args);
    await createVerifyTransaction(args);
    await proveTransaction(args);
    const transactionJSON = await getTransactionJSON(args);
    console.log("done");

    return transactionJSON;
  },

  getPercentileTransactionJSON: async (args: { publicKey58: string; attempt: number }) => {
    console.log("getting @percentile txn JSON...");
    await _fetchAccount(args);
    await createPercentileTransaction(args);
    await proveTransaction(args);
    const transactionJSON = await getTransactionJSON(args);
    console.log("done");

    return transactionJSON;
  }
};

//--------------------------------------------------

export type WorkerFunctions = keyof typeof functions;

export type ZkappWorkerRequest = {
  id: number;
  fn: WorkerFunctions;
  args: any;
};

export type ZkappWorkerReponse = {
  id: number;
  data: any;
};

onmessage = async (event: MessageEvent<ZkappWorkerRequest>) => {
  const returnData = await functions[event.data.fn](event.data.args);

  const response: ZkappWorkerReponse = {
    id: event.data.id,
    data: returnData
  };
  postMessage(response);
};
