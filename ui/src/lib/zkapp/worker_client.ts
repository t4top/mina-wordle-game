import { fetchAccount, PublicKey, Field, UInt64 } from "snarkyjs";

import type { ZkappWorkerRequest, ZkappWorkerReponse, WorkerFunctions } from "./worker";

export default class ZkappWorkerClient {
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

  async getAllAttempts(): Promise<Array<Field>> {
    const result = await this._call("getAllAttempts", {});
    const allAttempts = JSON.parse(result as string);
    return allAttempts.map((v: string) => Field.fromJSON(v));
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

  isReady: boolean;

  constructor() {
    this.isReady = false;
    this.worker = new Worker(new URL("./worker.ts", import.meta.url), {
      type: "module"
    });
    this.promises = {};
    this.nextId = 0;

    this.worker.onmessage = (event: MessageEvent<ZkappWorkerReponse>) => {
      this.isReady = true;
      const { id, data } = event.data;
      if (Object.hasOwn(this.promises, id)) {
        this.promises[id].resolve(data);
        delete this.promises[id];
      }
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
