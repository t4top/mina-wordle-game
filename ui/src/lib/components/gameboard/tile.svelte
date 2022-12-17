<script lang="ts">
  import { gameGrid, userScore, secretWord } from "$lib/gamelogic/store";

  // the tile horizontal position on the board
  export let xPos: number;

  // the tile vertical position
  export let yPos: number;

  $: letter = $gameGrid[yPos][xPos];
  $: pastAttempt = yPos < $userScore.attempts;
  $: present = $secretWord.includes(letter);
  $: correct = $secretWord.charAt(xPos) === letter;
</script>

<div
  class:active={!!letter}
  class:absent={!present && pastAttempt}
  class:present={present && pastAttempt}
  class:correct={correct && pastAttempt}
>
  {letter}
</div>

<style lang="stylus">
  div
    font-size 2.6rem
    font-weight 700
    text-transform uppercase
    display flex
    justify-content center
    align-items center
    height 4rem
    width 4rem
    background-color transparent
    border 2px solid var(--color_border_lightgray)
    @media $mq_sm
      height 4.5rem
      width 4.5rem

    &.active
      border 2px solid var(--color_border_darkgray)

    &.absent
      color var(--color_text_board)
      background-color var(--color_bg_gray)
      border 2px solid var(--color_bg_gray)

    &.present
      color var(--color_text_board)
      background-color var(--color_bg_yellow)
      border 2px solid var(--color_bg_yellow)

    &.correct
      color var(--color_text_board)
      background-color var(--color_bg_green)
      border 2px solid var(--color_bg_green)

</style>
