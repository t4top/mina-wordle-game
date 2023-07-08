import { Field, SmartContract, State, PublicKey, Signature } from 'snarkyjs';
declare const AttemptArray_base: (new (value: {
    value: import("snarkyjs/dist/node/lib/field").Field[];
}) => {
    value: import("snarkyjs/dist/node/lib/field").Field[];
}) & {
    _isStruct: true;
} & import("snarkyjs/dist/node/snarky").ProvablePure<{
    value: import("snarkyjs/dist/node/lib/field").Field[];
}> & {
    toInput: (x: {
        value: import("snarkyjs/dist/node/lib/field").Field[];
    }) => {
        fields?: import("snarkyjs/dist/node/lib/field").Field[] | undefined;
        packed?: [import("snarkyjs/dist/node/lib/field").Field, number][] | undefined;
    };
    toJSON: (x: {
        value: import("snarkyjs/dist/node/lib/field").Field[];
    }) => {
        value: string[];
    };
    fromJSON: (x: {
        value: string[];
    }) => {
        value: import("snarkyjs/dist/node/lib/field").Field[];
    };
};
export declare class AttemptArray extends AttemptArray_base {
    static fill(val: number): AttemptArray;
    hash(): import("snarkyjs/dist/node/lib/field").Field;
}
export declare class Wordle extends SmartContract {
    oraclePublicKey: State<PublicKey>;
    allAttempts: State<AttemptArray>;
    events: {
        verified: typeof import("snarkyjs/dist/node/lib/bool").Bool & ((x: boolean | import("snarkyjs/dist/node/lib/field").FieldVar | import("snarkyjs/dist/node/lib/bool").Bool) => import("snarkyjs/dist/node/lib/bool").Bool);
        percentile: typeof import("snarkyjs/dist/node/lib/field").Field & ((x: string | number | bigint | import("snarkyjs/dist/node/lib/field").Field | Uint8Array | import("snarkyjs/dist/node/lib/field").FieldVar) => import("snarkyjs/dist/node/lib/field").Field);
    };
    init(): void;
    verify(date: Field, wordleSecret: Field, signature: Signature): void;
    percentile(userAttempt: Field): void;
}
export {};
