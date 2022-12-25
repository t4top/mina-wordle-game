<script lang="ts">
  import Icon from "$lib/components/icons/icon.svelte";
  import { absentKeys, presentKeys, correctKeys } from "$lib/gamelogic/store";
  import { keyPressed } from "$lib/gamelogic/wordle";

  export let key: string;

  $: isBackSpace = key === "BACKSPACE";
</script>

<button
  type="button"
  class:absent={$absentKeys.includes(key)}
  class:present={$presentKeys.includes(key)}
  class:correct={$correctKeys.includes(key)}
  class:backspace={isBackSpace}
  on:click={() => keyPressed(key)}
>
  {#if isBackSpace}
    <Icon name="backspace" title="Backspace" />
  {:else}
    {key}
  {/if}
</button>

<style lang="stylus">
  button
    font-weight 700
    text-transform uppercase
    background-color var(--color_bg_lightgray)
    border 0
    border-radius 0.3rem
    padding 0 0.5rem
    margin 0 0.2rem
    height 3.7rem
    flex 1
    display flex
    justify-content center
    align-items center
    user-select none
    -webkit-user-select none
    -moz-user-select none
    -ms-user-select none

    &.absent
      color var(--color_text_board)
      background-color var(--color_bg_gray)

    &.present
      color var(--color_text_board)
      background-color var(--color_bg_yellow)

    &.correct
      color var(--color_text_board)
      background-color var(--color_bg_green)

    &.backspace
      padding 0 1.2rem

</style>
