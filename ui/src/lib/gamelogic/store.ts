import { writable, type Writable } from "svelte/store";
import { WORD_LENGTH, MAX_ATTEMPT } from "./config";

//--------------------------------------------------

// empty game grid used for initialization
const emptyGrid = [...Array(MAX_ATTEMPT)].map(e => Array(WORD_LENGTH).fill(""));

// board grid matrix holding letter guesses entered by the user
export const gameGrid: Writable<string[][]> = writable(emptyGrid);

// entered keys that are in secret word and in right spot
export const correctKeys: Writable<string[]> = writable([]);

// entered keys that are in secret word but in wrong spot
export const presentKeys: Writable<string[]> = writable([]);

// entered keys that are not in the secret word
export const absentKeys: Writable<string[]> = writable([]);

// number of guess attempts by the user
export const guessCount: Writable<number> = writable(0);

//--------------------------------------------------

// secret word from oracle server
export const secretWord: Writable<string> = writable("");

//--------------------------------------------------
// store to keep track of user score

const emptyUserScore = {
  attempts: 0 as number,
  percentile: 0 as number,
  won: false as boolean,
  remark: "" as string,
  gameOver: false as boolean
};

function createUserScore() {
  const { subscribe, set, update } = writable(emptyUserScore);

  // success notification remarks. It depends on number of attempts before correct guess
  const remarks: string[] = ["Genius", "Magnificient", "Impressive", "Splendid", "Great", "Phew"];

  return {
    subscribe,

    setAttempts: (attempts: number) => update(old => Object.assign({}, old, { attempts })),

    setResult: (attempts: number, won: boolean) =>
      update(old => Object.assign({}, old, { attempts, won, remark: remarks[attempts - 1], gameOver: true })),

    setPercentile: (percentile: number) => update(old => Object.assign({}, old, { percentile })),

    reset: () => set(emptyUserScore)
  };
}

export const userScore = createUserScore();
