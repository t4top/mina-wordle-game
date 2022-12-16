# mina-wordle-game

This is a Wordle inspired game for Mina Protocol. It is to demonstrate zkApp smart contract and oracle using SnarkyJs. It was created as an entry to the [zkIgnite Cohort 0](https://minaprotocol.com/blog/zkignite-cohort0) challenge.

## Demo

Please, visit below site.

- [GitHub Pages](https://t4top.github.io/mina-wordle-game/index.html)

## What is Wordle?

Wordle is a five letter word guessing game. You get six tries to guess the right word and every time you guess a word, you get feedback regarding the letters.

A Green feedback on a letter means the letter is correct and on the correct spot in the word.

A Yellow feedback on a letter means that letter is present in the word but in wrong spot.

A Gray feedback means the letter is not present at all in the word.

## How to Play

![Mina Wordle Game Screenshot](./ui/static/wordle_screenshot.png)

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

## How to build

This project is divided into 3 parts - ui, contracts and oracle. Clone this repository and follow the steps under each part.

- [ui](ui/)
- [contracts](contracts/)
- [oracle](oracle/)

## License

[GPL-3.0](./LICENSE)
