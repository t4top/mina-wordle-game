import { Wordle } from './Wordle';
import { isReady, shutdown, Mina, PrivateKey, PublicKey, AccountUpdate, Signature, Encoding, Field, } from 'snarkyjs';
// The public key of oracle trusted data provider
const ORACLE_PUBLIC_KEY = 'B62qqW3XwzR7K94C7HjiX37ni4yoeycGx5k7DriERn3d4QbuWenJRuB';
const ORACLE_ENDPOINT = 'https://mina-wordle-oracle.juxdan.io/wordle';
let proofsEnabled = false;
function createLocalBlockchain() {
    const Local = Mina.LocalBlockchain({ proofsEnabled });
    Mina.setActiveInstance(Local);
    return Local.testAccounts[0].privateKey;
}
async function localDeploy(zkAppInstance, zkAppPrivatekey, deployerAccount) {
    const txn = await Mina.transaction(deployerAccount, () => {
        AccountUpdate.fundNewAccount(deployerAccount);
        zkAppInstance.deploy({ zkappKey: zkAppPrivatekey });
        zkAppInstance.init();
    });
    await txn.prove();
    txn.sign([zkAppPrivatekey]);
    await txn.send();
}
describe('Wordle', () => {
    let deployerAccount, zkAppAddress, zkAppPrivateKey;
    beforeAll(async () => {
        await isReady;
        if (proofsEnabled)
            Wordle.compile();
    });
    beforeEach(async () => {
        deployerAccount = createLocalBlockchain();
        zkAppPrivateKey = PrivateKey.random();
        zkAppAddress = zkAppPrivateKey.toPublicKey();
    });
    afterAll(async () => {
        setTimeout(shutdown, 0);
    });
    it('generates and deploys smart contract', async () => {
        const zkAppInstance = new Wordle(zkAppAddress);
        await localDeploy(zkAppInstance, zkAppPrivateKey, deployerAccount);
        const oraclePublicKey = zkAppInstance.oraclePublicKey.get();
        expect(oraclePublicKey).toEqual(PublicKey.fromBase58(ORACLE_PUBLIC_KEY));
    });
    describe('@method verify requests', () => {
        it('verifys that oracle data and signature are valid', async () => {
            const zkAppInstance = new Wordle(zkAppAddress);
            await localDeploy(zkAppInstance, zkAppPrivateKey, deployerAccount);
            const response = await fetch(ORACLE_ENDPOINT);
            const data = await response.json();
            const date = data.data.date;
            const secret = data.data.wordle;
            const dateField = Encoding.stringToFields(date)[0];
            const secretField = Encoding.stringToFields(secret)[0];
            const signature = Signature.fromJSON(data.signature);
            const txn = await Mina.transaction(deployerAccount, () => {
                zkAppInstance.verify(dateField, secretField, signature ?? fail('something is wrong with the signature'));
            });
            await txn.prove();
            await txn.send();
            const events = await zkAppInstance.fetchEvents();
            const verifiedEventValue = events[0].event.toFields(null)[0];
            expect(verifiedEventValue).toEqual(Field(1));
        });
        it('throws an error since provided signature is invalid', async () => {
            const zkAppInstance = new Wordle(zkAppAddress);
            await localDeploy(zkAppInstance, zkAppPrivateKey, deployerAccount);
            const date = '2022-12-13';
            const secret = 'spoke';
            const dateField = Encoding.stringToFields(date)[0];
            const secretField = Encoding.stringToFields(secret)[0];
            const signature = Signature.fromJSON({
                r: '15627992987088413121296225715690574618267672377606159735435349048202035460601',
                s: '27603209323282787199249937061570222205344595036378733345336263504567313494106',
            });
            expect(async () => {
                await Mina.transaction(deployerAccount, () => {
                    zkAppInstance.verify(dateField, secretField, signature ?? fail('something is wrong with the signature'));
                });
            }).rejects;
        });
    });
    describe('@method percentile requests', () => {
        it('returns 99 percentile for first attempt', async () => {
            const zkAppInstance = new Wordle(zkAppAddress);
            await localDeploy(zkAppInstance, zkAppPrivateKey, deployerAccount);
            const attempt = Field(1);
            const txn = await Mina.transaction(deployerAccount, () => {
                zkAppInstance.percentile(attempt);
            });
            await txn.prove();
            await txn.send();
            const events = await zkAppInstance.fetchEvents();
            const verifiedEventValue = events[0].event.toFields(null)[0];
            expect(verifiedEventValue).toEqual(Field(99));
        });
    });
});
//# sourceMappingURL=Wordle.test.js.map