# mina-wordle-game

<p align="center">

![Mina Wordle Game Screenshot](./ui/static/wordle_screenshot.png)

</p>

This is a Wordle inspired game for Mina Protocol. It is to demonstrate zkApp smart contract and oracle using SnarkyJs. It was created as an entry to the [zkIgnite Cohort 0](https://minaprotocol.com/blog/zkignite-cohort0) challenge.

## Demo

Find below deployed samples. Please, visit any of the sites.

- [https://mina-wordle.juxdan.io/](https://mina-wordle.juxdan.io/)
- [https://t4top.github.io/mina-wordle-game/](https://t4top.github.io/mina-wordle-game/)

## What is Wordle?

Wordle is a five letter word guessing game. You get six tries to guess the right word and every time you guess a word, you get feedback regarding the letters.

A Green feedback on a letter means the letter is correct and on the correct spot in the word.

A Yellow feedback on a letter means that letter is present in the word but in wrong spot.

A Gray feedback means the letter is not present at all in the word.

## How to Play

- Connect Mina Auro Wallet on Berkeley Testnet.
- Fund the wallet with free testnet Mina from the faucet.
- Guess the Wordle of the day using the keyboard.
- Each guess must be a valid 5-letter word.
- The color of the tiles will change to show how close your guess was to the word.
- You have maximum 6 tries to guess the correct word.

## Features

Below are some of the major features of this zkApp.

- Realistic clone of the popular Wordle game
- zkApp smart contract using SnarkyJs and deployed to Berkeley Testnet
- Koa-powered Oracle server using Mina Signature to sign responses
- Dark mode
- UI made with SvelteKit

## How to build

This project is divided into 3 parts - ui, contracts and oracle. Clone this repository and follow the steps under each part.

1. Clone this git repository and change to the project directory

```bash
git clone https://github.com/t4top/mina-wordle-game.git
cd mina-wordle-game
```

2. Install project dependencies

```bash
npm install
```

3. Follow the build steps under each part

- [oracle](oracle/)
- [contracts](contracts/)
- [ui](ui/)

## License

[GPL-3.0](./LICENSE)
