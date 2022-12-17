import { writable, type Writable } from "svelte/store";

const TIMEOUT_DELAY: number = 1500;

export const alert: Writable<string> = writable("");
export const toast: Writable<string> = writable("");
export const fixedtoast: Writable<string> = writable("");

const { set } = toast;

toast.set = value => {
  set(value);
  const timeoutId = setTimeout(() => {
    set("");
  }, TIMEOUT_DELAY);

  return () => {
    if (timeoutId) clearTimeout(timeoutId);
  };
};
