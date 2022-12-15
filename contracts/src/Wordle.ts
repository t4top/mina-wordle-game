import {
  Field,
  Bool,
  SmartContract,
  state,
  State,
  method,
  Permissions,
  PublicKey,
  Signature,
  Struct,
  Circuit,
  Poseidon,
} from 'snarkyjs';

// The public key of our trusted wordle secret provider
const ORACLE_PUBLIC_KEY =
  'B62qqW3XwzR7K94C7HjiX37ni4yoeycGx5k7DriERn3d4QbuWenJRuB';

export class AttemptArray extends Struct({
  value: [Field, Field, Field, Field, Field, Field],
}) {
  static fill(val: number) {
    return new AttemptArray({ value: Array(6).fill(Field(val)) });
  }

  hash() {
    return Poseidon.hash(this.value);
  }
}

export class Wordle extends SmartContract {
  // contract states
  @state(PublicKey) oraclePublicKey = State<PublicKey>();
  @state(AttemptArray) allAttempts = State<AttemptArray>();

  // contract events
  events = {
    verified: Bool,
    percentile: Field,
  };

  init() {
    super.init();
    this.setPermissions({
      ...Permissions.default(),
      editState: Permissions.proofOrSignature(),
    });

    // initialize contract states
    this.oraclePublicKey.set(PublicKey.fromBase58(ORACLE_PUBLIC_KEY));
    this.allAttempts.set(AttemptArray.fill(0));
  }

  @method verify(date: Field, wordleSecret: Field, signature: Signature) {
    // get the oracle public key from the contract state
    const oraclePublicKey = this.oraclePublicKey.get();
    this.oraclePublicKey.assertEquals(oraclePublicKey);

    // evaluate whether the signature is valid for the provided data
    const validSignature = signature.verify(oraclePublicKey, [
      date,
      wordleSecret,
    ]);
    validSignature.assertTrue();

    // emit an event containing the verified result
    this.emitEvent('verified', validSignature);
  }

  /*
    Evaluate user performance rank compared to all others who participated in the game.
    In theory, real percentile rank requires an offline database and enough data distribution.
    For this demo, we will simplify by using below formula.

      percentile = (100(x) / n) - 1

    where
      x = number of attempts above and including users
      n = total number of all attempts
    Note: 1 is subtracted since 99 is max possible percentile.
  */
  @method percentile(userAttempt: Field) {
    // check the number of attempt is within range 0 < x <= 6
    userAttempt.assertGt(Field(0));
    userAttempt.assertLte(Field(6));

    // userAttempt is 1 origin, decrease by 1 to get array index
    let attempt = userAttempt.sub(Field(1));

    // get all attempts array from the Mina network
    const allAttempts = this.allAttempts.get();
    this.allAttempts.assertEquals(allAttempts);

    // calculate percentile using our simplified formula
    let sum_all_attempts = Field(0);
    let sum_upto_user_attempt = Field(0);

    for (let i: number = 0; i < 6; i++) {
      // increment attempt position similar to user's
      let eqAttempt = attempt.equals(Field(i));

      allAttempts.value[i] = Circuit.if(
        eqAttempt,
        allAttempts.value[i].add(Field(1)),
        allAttempts.value[i]
      );

      // sum attempts above and including user's
      let gteAttempt = attempt.gte(Field(i));

      sum_upto_user_attempt = Circuit.if(
        gteAttempt,
        sum_upto_user_attempt.add(allAttempts.value[i]),
        sum_upto_user_attempt
      );

      // sum up all positions
      sum_all_attempts = sum_all_attempts.add(allAttempts.value[i]);
    }

    let percentile = sum_upto_user_attempt
      .mul(100)
      .div(sum_all_attempts)
      .sub(1);

    // update new state
    this.allAttempts.set(allAttempts);

    // emit an event containing the percentile
    this.emitEvent('percentile', percentile);
  }
}
