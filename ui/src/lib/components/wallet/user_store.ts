import { derived, writable, get } from "svelte/store";
import { alert } from "$lib/components/notification/store";

export const transactionFee = 0.1;

const emptyUser = {
  hasWallet: false as boolean,
  walletConnected: false as boolean,
  accountExists: false as boolean,
  publicKey58: "" as string,
  network: "" as string,
  balance: 0 as number // account balance in Mina
};

function createUserStore() {
  const { subscribe, set, update } = writable(emptyUser);

  return {
    subscribe,
    set: (value: any) => update(old => Object.assign({}, old, value)),
    reset: () => set(emptyUser)
  };
}

export const user = createUserStore();

export const precondition = derived(
  user,
  $user => $user.hasWallet && $user.walletConnected && $user.network === "Berkeley" && $user.balance > transactionFee
);

export function checkPreConditions() {
  const $user = get(user);

  if (!$user.hasWallet) return alert.set("Mina Wallet missing. Please install Auro Wallet.");

  if ($user.network !== "Berkeley") return alert.set("Please change Mina network to Berkeley on Auro Wallet.");

  if (!$user.walletConnected) return alert.set("Please connect your Mina wallet.");

  if (!$user.accountExists)
    return alert.set("Account does not exist. Please fund your account with free testnet Mina from the faucet.");

  if ($user.balance <= transactionFee)
    return alert.set("Account balance not enough. Please visit the Mina testnet faucet to add fund to your account.");
}
