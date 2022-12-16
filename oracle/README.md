# mina-wordle-game-oracle

An oracle server that returns the New York Times Wordle of the day with a Mina compatible signature scheme.

This is the oracle server backend for the [Mina Wordle Game](../README.md). It returns the New York Times Wordle of the day with a Mina compatible signature scheme. It uses `koa` HTTP middleware framework and `pm2` process manager for nodejs.

The oracle server runs on port `3000` by default.

## Demo

The following endpoints are available.

- [/wordle](https://mina-wordle.juxdan.io/wordle): returns the secret wordle of the day signed with the oracle server account.
- /wordle/\<date\>: provides wordle for a specific date. For example, [/wordle/2022-12-15](https://mina-wordle.juxdan.io/wordle/2022-12-15)

## Setup the configurations

The configuration file is `.env`. It should be placed in the root folder. A sample [.env.sample](./.env.sample) is provided as a reference.

Rename `.env.sample` to `.env` and add parameters for your setup.

#### Configurable parameters

| Parameter   | Required | Remark                                                                           |
| ----------- | -------- | -------------------------------------------------------------------------------- |
| PRIVATE_KEY | Yes      | Private key to sign response payload. Do not share your private key with anyone. |
| PORT        | No       | The server will listen on this port. 3000 will be used if not set.               |

## How to build

1. Clone this git repository and change to the oracle directory

```bash
git clone https://github.com/t4top/mina-wordle-game.git
cd mina-wordle-game/oracle
```

2. Install project dependencies

```bash
npm install
```

3. For local development, start a development server.

```bash
npm run dev
```

4. Open a browser and navigate to `localhost:3000/wordle` to get a JSON response from the server.

## Launch the server for production

Run below command to start the oracle server as a background service.

```bash
npm start
```

To stop the server, run below command.

```bash
npm stop
```
