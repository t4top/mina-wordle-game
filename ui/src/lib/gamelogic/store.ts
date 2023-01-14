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
  const { subscribe, update } = writable(emptyUserScore);

  // success notification remarks. It depends on number of attempts before correct guess
  const remarks: string[] = ["Genius", "Magnificient", "Impressive", "Splendid", "Great", "Phew"];

  return {
    subscribe,

    setAttempts: (attempts: number) => update(old => Object.assign({}, old, { attempts })),

    setResult: (attempts: number, won: boolean) =>
      update(old => Object.assign({}, old, { attempts, won, remark: remarks[attempts - 1], gameOver: true })),

    setPercentile: (percentile: number) => update(old => Object.assign({}, old, { percentile }))
  };
}

export const userScore = createUserScore();

//--------------------------------------------------
// store for animation flags

const RESET_FLAG_DELAY: number = 1500;

const animationState = {
  tileFlash: false as boolean,
  tileXPos: -1 as number,
  rowShake: false as boolean,
  tileFlip: false as boolean,
  tileBounce: false as boolean
};

function createAnimation() {
  const { subscribe, set, update } = writable(animationState);

  let timeoutId: NodeJS.Timeout | null = null;
  const _clearTimeout = () => timeoutId && clearTimeout(timeoutId);

  return {
    subscribe,

    set: (value: any) => {
      update(_ => Object.assign({}, animationState, value));

      _clearTimeout();
      timeoutId = setTimeout(() => set(animationState), RESET_FLAG_DELAY);

      return () => _clearTimeout();
    }
  };
}

export const animation = createAnimation();

//--------------------------------------------------
// helper function for number formatting

export function zeroPad(num: number, places: number) {
  return String(num).padStart(places, "0");
}
