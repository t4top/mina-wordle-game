<script lang="ts">
  import { absentKeys, presentKeys, correctKeys } from "$lib/gamelogic/store";
  import { keyPressed } from "$lib/gamelogic/wordle";

  export let key: string;
</script>

<button
  type="button"
  class:absent={$absentKeys.includes(key)}
  class:present={$presentKeys.includes(key)}
  class:correct={$correctKeys.includes(key)}
  on:click={() => keyPressed(key)}
>
  {key}
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

</style>
