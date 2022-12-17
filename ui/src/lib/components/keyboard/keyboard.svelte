<script lang="ts">
  import { onMount } from "svelte";
  import { keyPressed } from "$lib/gamelogic/wordle";
  import { precondition, checkPreConditions } from "$lib/components/wallet/user_store";
  import Key from "./key.svelte";

  const keys: string[][] = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DELETE"]
  ];

  onMount(() => {
    document.addEventListener("keydown", e => {
      if ($precondition) {
        const key = e.key.toUpperCase();
        if (keys.flat().includes(key)) keyPressed(key);
      } else {
        checkPreConditions();
      }
    });
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
