<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { keyPressed } from "$lib/gamelogic/wordle";
  import { precondition, checkPreConditions } from "$lib/components/wallet/user_store";
  import Key from "./key.svelte";

  const keys: string[][] = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"]
  ];

  function handleKeyPressed(e: KeyboardEvent) {
    const key = e.key.toUpperCase();
    if (keys.flat().includes(key)) {
      $precondition ? keyPressed(key) : checkPreConditions();
    }
  }

  onMount(() => document.addEventListener("keydown", handleKeyPressed));

  onDestroy(() => {
    if (typeof document !== "undefined") document.removeEventListener("keydown", handleKeyPressed);
  });
</script>

<div>
  {#each keys as row, i}
    <div class="row" class:second_row={i === 1}>
      {#each row as key}
        <Key {key} />
      {/each}
    </div>
  {/each}
</div>

<style lang="stylus">
  .row
    display flex
    text-align center
    margin 0 auto 0.5rem auto
    touch-action manipulation

  .second_row
    padding 0 1.5rem

</style>
