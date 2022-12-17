import { fetchAccount, PublicKey, Field, UInt64 } from "snarkyjs";

import type { ZkappWorkerRequest, ZkappWorkerReponse, WorkerFunctions } from "./worker";

export default class ZkappWorkerClient {
  loadSnarkyJS() {
    return this._call("loadSnarkyJS", {});
  }

  unloadSnarkyJS() {
    return this._call("unloadSnarkyJS", {});
  }

  setActiveInstanceToBerkeley() {
    return this._call("setActiveInstanceToBerkeley", {});
  }

  publicKeyFromBase58(publicKey58: string) {
    return PublicKey.fromBase58(publicKey58);
  }

  loadContract() {
    return this._call("loadContract", {});
  }

  compileContract() {
    return this._call("compileContract", {});
  }

  fetchAccount(publicKey58: string): ReturnType<typeof fetchAccount> {
    const result = this._call("fetchAccount", { publicKey58 });
    return result as ReturnType<typeof fetchAccount>;
  }

  async getBalance(publicKey58: string): Promise<UInt64> {
    const result = await this._call("getBalance", { publicKey58 });
    return UInt64.fromJSON(JSON.parse(result as string));
  }

  initZkappInstance(publicKey58: string) {
    return this._call("initZkappInstance", { publicKey58 });
  }

  setupZkappInstance(publicKey58: string) {
    return this._call("setupZkappInstance", { publicKey58 });
  }

  getVerifyTransactionJSON(publicKey58: string, date: string, secret: string, signature: any) {
    return this._call("getVerifyTransactionJSON", { publicKey58, date, secret, signature });
  }

  getPercentileTransactionJSON(publicKey58: string, attempt: number) {
    return this._call("getPercentileTransactionJSON", { publicKey58, attempt });
  }

  proveTransaction() {
    return this._call("proveTransaction", {});
  }

  async getTransactionJSON() {
    const result = await this._call("getTransactionJSON", {});
    return result;
  }

  async fetchEvent(): Promise<Field> {
    const result = await this._call("fetchEvent", {});
    return Field.fromJSON(JSON.parse(result as string));
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

  worker: Worker;

  promises: { [id: number]: { resolve: (res: any) => void; reject: (err: any) => void } };

  nextId: number;

  constructor() {
    this.worker = new Worker(new URL("./worker.ts", import.meta.url), {
      type: "module"
    });
    this.promises = {};
    this.nextId = 0;

    this.worker.onmessage = (event: MessageEvent<ZkappWorkerReponse>) => {
      this.promises[event.data.id].resolve(event.data.data);
      delete this.promises[event.data.id];
    };
  }

  _call(fn: WorkerFunctions, args: any) {
    return new Promise((resolve, reject) => {
      const message: ZkappWorkerRequest = { id: this.nextId, fn, args };

      this.promises[this.nextId] = { resolve, reject };
      this.worker.postMessage(message);
      this.nextId++;
    });
  }
}
