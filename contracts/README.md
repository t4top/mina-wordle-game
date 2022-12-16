# mina-wordle-game-contracts

This is the zkApp smart contract for the [Mina Wordle Game](../). It uses `SnarkyJS` with TypeScript template.

## Demo

A sample zkApp is deployed to Mina Berkeley Testnet. The account is below.

- [B62qo7TsbVEKU2q7md2upZuMwjEizuYcMy5t4FPdmB3YkonZbF5dJSu](https://berkeley.minaexplorer.com/wallet/B62qo7TsbVEKU2q7md2upZuMwjEizuYcMy5t4FPdmB3YkonZbF5dJSu)

## How to build

1. Clone this git repository and change to the contracts directory

```bash
git clone https://github.com/t4top/mina-wordle-game.git
cd mina-wordle-game/contracts
```

2. Install project dependencies

```bash
npm install
```

3. Build the zkApp

```bash
npm run build
```

## How to run tests

```sh
npm run test
npm run testw # watch mode
```

## How to run coverage

```sh
npm run coverage
```
