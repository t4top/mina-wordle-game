import { Mina, PublicKey, fetchAccount, Encoding, Signature, Field, UInt64 } from "o1js";
import { Wordle } from "./contracts/Wordle";

type Transaction = Awaited<ReturnType<typeof Mina.transaction>>;

const BERKELEY_ENDPOINT: string = "https://proxy.berkeley.minaexplorer.com/graphql";

export default class ZkappClient {
  setActiveInstanceToBerkeley() {
    const Berkeley = Mina.Network(BERKELEY_ENDPOINT);
    Mina.setActiveInstance(Berkeley);
  }

  publicKeyFromBase58(publicKey58: string) {
    return PublicKey.fromBase58(publicKey58);
  }

  loadContract() {
    console.log("loading contract...");
    this.Wordle = Wordle;
    console.log("done");
  }

  async compileContract() {
    console.log("compiling contract...");
    await this.Wordle!.compile();
    console.log("done");
  }

  async fetchAccount(publicKey58: string): ReturnType<typeof fetchAccount> {
    const publicKey = this.publicKeyFromBase58(publicKey58);
    return await fetchAccount({ publicKey });
  }

  getBalance(publicKey58: string): UInt64 {
    const publicKey = this.publicKeyFromBase58(publicKey58);
    const balance = Mina.getBalance(publicKey);
    return balance;
  }

  getAllAttempts(): Array<Field> {
    const allAttempts = this.zkapp!.allAttempts.get();
    return allAttempts.value;
  }

  initZkappInstance(publicKey58: string) {
    console.log("init instance...");
    const publicKey = this.publicKeyFromBase58(publicKey58);
    this.zkapp = new this.Wordle!(publicKey);
    console.log("done");
  }

  async setupZkappInstance(publicKey58: string) {
    if (this.hasBeenSetup) return;

    console.log("setting up Zkapp...");
    this.loadContract();
    await this.compileContract();
    this.initZkappInstance(publicKey58);
    this.hasBeenSetup = true;
    console.log("done");
  }

  async createVerifyTransaction(date: string, secret: string, signature: any) {
    const dateField = Encoding.stringToFields(date)[0];
    const secretField = Encoding.stringToFields(secret)[0];
    const hash = Signature.fromJSON(signature);

    const transaction = await Mina.transaction(() => {
      this.zkapp!.verify(dateField, secretField, hash);
    });
    this.transaction = transaction;
  }

  async getVerifyTransactionJSON(publicKey58: string, date: string, secret: string, signature: any) {
    console.log("getting @verify txn JSON...");
    await this.fetchAccount(publicKey58);
    await this.createVerifyTransaction(date, secret, signature);
    await this.proveTransaction();
    const transactionJSON = await this.getTransactionJSON();
    console.log("done");

    return transactionJSON;
  }

  async createPercentileTransaction(attempt: number) {
    const attemptField = Field(attempt);

    const transaction = await Mina.transaction(() => {
      this.zkapp!.percentile(attemptField);
    });
    this.transaction = transaction;
  }

  async getPercentileTransactionJSON(publicKey58: string, attempt: number) {
    console.log("getting @percentile txn JSON...");
    await this.fetchAccount(publicKey58);
    await this.createPercentileTransaction(attempt);
    await this.proveTransaction();
    const transactionJSON = await this.getTransactionJSON();
    console.log("done");

    return transactionJSON;
  }

  async proveTransaction() {
    await this.transaction!.prove();
  }

  async getTransactionJSON() {
    return this.transaction!.toJSON();
  }

  async fetchEvent(): Promise<Field> {
    let eventValue = Field(60);

    // fetchEvents() is not yet implemented in o1js for remote blockchain.
    // I will skip below code and just return Field(60) for now
    if (false) {
      const events = await this.zkapp!.fetchEvents();
      if (events && events.length) eventValue = events[0].event.data.toFields(null)[0];
    }

    return eventValue;
  }

  async sendTransaction(transactionJSON: any, transactionFee: number) {
    const { hash } = await (window as any).mina.sendTransaction({
      transaction: transactionJSON,
      feePayer: {
        fee: transactionFee,
        memo: ""
      }
    });
    return hash;
  }

  hasBeenSetup: boolean;
  Wordle: null | typeof Wordle;
  zkapp: null | Wordle;
  transaction: null | Transaction;

  constructor() {
    this.hasBeenSetup = false;
    this.Wordle = Wordle;
    this.zkapp = null;
    this.transaction = null;
  }
}
