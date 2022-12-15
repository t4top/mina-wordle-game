import { SmartContract, Permissions } from 'snarkyjs';

export class Wordle extends SmartContract {
  init() {
    super.init();
    this.setPermissions({
      ...Permissions.default(),
      editState: Permissions.proofOrSignature(),
    });
  }
}
