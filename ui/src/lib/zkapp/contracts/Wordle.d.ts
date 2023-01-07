import { Field, Bool, SmartContract, State, PublicKey, Signature } from 'snarkyjs';
declare const AttemptArray_base: (new (value: {
    value: Field[];
}) => {
    value: Field[];
}) & import("snarkyjs/dist/node/snarky").ProvablePure<{
    value: Field[];
}> & {
    toInput: (x: {
        value: Field[];
    }) => {
        fields?: Field[] | undefined;
        packed?: [Field, number][] | undefined;
    };
    toJSON: (x: {
        value: Field[];
    }) => {
        value: string[];
    };
    fromJSON: (x: {
        value: string[];
    }) => {
        value: Field[];
    };
};
export declare class AttemptArray extends AttemptArray_base {
    static fill(val: number): AttemptArray;
    hash(): Field;
}
export declare class Wordle extends SmartContract {
    oraclePublicKey: State<PublicKey>;
    allAttempts: State<AttemptArray>;
    events: {
        verified: typeof Bool;
        percentile: typeof Field;
    };
    init(): void;
    verify(date: Field, wordleSecret: Field, signature: Signature): void;
    percentile(userAttempt: Field): void;
}
export {};
