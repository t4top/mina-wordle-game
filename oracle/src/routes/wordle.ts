import type { ParameterizedContext } from "koa";

import axios from "axios";
import * as dotenv from "dotenv";
import { isReady, PrivateKey, Signature, Encoding } from "snarkyjs";

dotenv.config();

// We will use the NYTimes endpoint as the oracle source of truth.
// The NYTimes owns Wordle and publishes the daily wordle of the day.
const WORDLE_BACKEND_BASEURL: string = "https://www.nytimes.com/svc/wordle/v2/";

// RAM cache of past wordle responses to reduce number of get requests to NYTimes backend
const wordleCache: Map<string, object> = new Map();

async function fetchWordle(date: string) {
  return axios
    .get(`${WORDLE_BACKEND_BASEURL}${date}.json`)
    .then((res) => res.data)
    .catch((e) => console.log("fetchWordle failed. Error:", e.message));
}

async function getSignedWordle(date: string) {
  // return locally cached response if available
  if (wordleCache.has(date)) return wordleCache.get(date);

  // Wait for SnarkyJS to finish loading before we can do anything
  await isReady;

  // get wordle of the specified date from backend oracle
  const { solution } = await fetchWordle(date);

  // Load the private key of our account from an environment variable
  const privateKey = PrivateKey.fromBase58(process.env.PRIVATE_KEY || "");

  // Compute the public key associated with the private key
  const publicKey = privateKey.toPublicKey();

  // Define Field element with the date value
  const dateFields = Encoding.stringToFields(date);

  // Define Field element with the wordle of the day
  const wordleFields = Encoding.stringToFields(solution);

  // Use private key to sign an array of Fields containing the date and wordle
  const signature = Signature.create(privateKey, [
    ...dateFields,
    ...wordleFields,
  ]);

  // format response into Mina compatible signature scheme
  const res = {
    data: { date, wordle: solution },
    signature,
    publicKey,
  };

  // store response in cache for better performance and to reduce repetitive calls to NYTimes backend
  wordleCache.set(date, res);

  return res;
}

export async function getHandler(ctx: ParameterizedContext) {
  try {
    let { date } = ctx.params;

    // set today's date if date is not specified
    if (!date) date = new Date().toJSON().slice(0, 10);

    ctx.body = await getSignedWordle(date);
  } catch (e) {
    ctx.throw(404);
  }
}
