import { get } from "svelte/store";
import { toast, fixedtoast } from "$lib/components/notification/store";
import { isWordAllowed } from "./words_list";
import { WORD_LENGTH, MAX_ATTEMPT } from "./config";
import { gameGrid, secretWord, absentKeys, presentKeys, correctKeys, userScore, animation } from "./store";

// current letter location on the grid
let xPos: number = 0;
let yPos: number = 0;

// handle pressed input keys
export function keyPressed(key: string) {
  if (get(userScore).gameOver) return;

  switch (key) {
    case "ENTER":
      validateGuessWord();
      break;

    case "BACKSPACE":
      deleteLetter(key);
      break;

    default:
      inputLetter(key);
      break;
  }
}

// check guess word when ENTER key is pressed
function validateGuessWord() {
  const gridKeys = get(gameGrid);
  const secret = get(secretWord);
  const guessWord = gridKeys[yPos].join("").toUpperCase();

  // check if enough letters are entered
  if (!areLettersEnough(guessWord)) return;

  // check if entered guess word is in words dictionary list
  if (!isWordInDictionary(guessWord)) return;

  // play check ongoing animation
  animation.set({ tileFlip: true });

  // go to next row and incremenent number of attempts
  yPos += 1;
  xPos = 0;
  userScore.setAttempts(yPos);

  // check if guess is correct or not
  if (isGuessWordCorrect(yPos, guessWord, secret)) return;

  // check which letters are absent, present or correct
  checkWord(guessWord, secret);

  // if last attempt, game over
  gameOverIfLastAttempt(yPos, secret);
}

function deleteLetter(key: string) {
  const gridKeys = get(gameGrid);

  if (xPos > 0) {
    xPos -= 1;
    gridKeys[yPos][xPos] = "";
    gameGrid.set(gridKeys);
  }
}

function inputLetter(key: string) {
  const gridKeys = get(gameGrid);

  if (xPos < WORD_LENGTH) {
    gridKeys[yPos][xPos] = key;
    xPos += 1;
    gameGrid.set(gridKeys);

    // play text entered animation
    animation.set({ tileXPos: xPos, tileFlash: true });
  }
}

function areLettersEnough(guess: string): boolean {
  if (guess.length < WORD_LENGTH) {
    // play not enough word animation
    animation.set({ rowShake: true });

    toast.set("Not enough letters");
    return false;
  }
  return true;
}

function isWordInDictionary(guess: string): boolean {
  if (!isWordAllowed(guess)) {
    // play word not in list animation
    animation.set({ rowShake: true });

    toast.set("Not in word list");
    return false;
  }
  return true;
}

function isGuessWordCorrect(attempts: number, guess: string, secret: string): boolean {
  if (guess === secret) {
    correctKeys.set(guess.split(""));
    userScore.setResult(attempts, true);

    // play success animation
    setTimeout(() => {
      toast.set(get(userScore).remark);
      animation.set({ tileBounce: true });
    }, 1500);

    return true;
  }
  return false;
}

function checkWord(guess: string, secret: string) {
  const absent = new Set(get(absentKeys));
  const present = new Set(get(presentKeys));
  const correct = new Set(get(correctKeys));

  for (let i = 0; i < guess.length; i++) {
    const guessLetter = guess.charAt(i);
    const secretLetter = secret.charAt(i);

    if (guessLetter === secretLetter) {
      correct.add(guessLetter);
    } else if (secret.includes(guessLetter)) {
      present.add(guessLetter);
    } else {
      absent.add(guessLetter);
    }
  }

  absentKeys.set(Array.from(absent));
  presentKeys.set(Array.from(present));
  correctKeys.set(Array.from(correct));
}

function gameOverIfLastAttempt(attempts: number, secret: string) {
  if (attempts >= MAX_ATTEMPT) {
    userScore.setResult(attempts, false);
    fixedtoast.set(secret);
  }
}
