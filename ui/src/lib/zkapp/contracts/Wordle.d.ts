import { Field, SmartContract, State, PublicKey, Signature } from 'o1js';
declare const AttemptArray_base: (new (value: {
    value: import("o1js/dist/node/lib/field").Field[];
}) => {
    value: import("o1js/dist/node/lib/field").Field[];
}) & {
    _isStruct: true;
} & import("o1js/dist/node/snarky").ProvablePure<{
    value: import("o1js/dist/node/lib/field").Field[];
}> & {
    toInput: (x: {
        value: import("o1js/dist/node/lib/field").Field[];
    }) => {
        fields?: import("o1js/dist/node/lib/field").Field[] | undefined;
        packed?: [import("o1js/dist/node/lib/field").Field, number][] | undefined;
    };
    toJSON: (x: {
        value: import("o1js/dist/node/lib/field").Field[];
    }) => {
        value: string[];
    };
    fromJSON: (x: {
        value: string[];
    }) => {
        value: import("o1js/dist/node/lib/field").Field[];
    };
};
export declare class AttemptArray extends AttemptArray_base {
    static fill(val: number): AttemptArray;
    hash(): import("o1js/dist/node/lib/field").Field;
}
export declare class Wordle extends SmartContract {
    oraclePublicKey: State<PublicKey>;
    allAttempts: State<AttemptArray>;
    events: {
        verified: typeof import("o1js/dist/node/lib/bool").Bool & ((x: boolean | import("o1js/dist/node/lib/field").FieldVar | import("o1js/dist/node/lib/bool").Bool) => import("o1js/dist/node/lib/bool").Bool);
        percentile: typeof import("o1js/dist/node/lib/field").Field & ((x: string | number | bigint | import("o1js/dist/node/lib/field").Field | import("o1js/dist/node/lib/field").FieldVar | import("o1js/dist/node/lib/field").FieldConst) => import("o1js/dist/node/lib/field").Field);
    };
    init(): void;
    verify(date: Field, wordleSecret: Field, signature: Signature): void;
    percentile(userAttempt: Field): void;
}
export {};
