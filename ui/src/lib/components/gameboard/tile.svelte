<script lang="ts">
  import { gameGrid, userScore, secretWord, animation } from "$lib/gamelogic/store";

  // the tile horizontal position on the board
  export let xPos: number;

  // the tile vertical position
  export let yPos: number;

  $: letter = $gameGrid[yPos][xPos];
  $: pastAttempt = yPos < $userScore.attempts;
  $: present = $secretWord.includes(letter);
  $: correct = $secretWord.charAt(xPos) === letter;
  $: currentX = $animation.tileXPos === xPos + 1;
  $: currentY = $userScore.attempts === yPos;
  $: guessedY = $userScore.attempts === yPos + 1;
</script>

<div
  class:active={!!letter}
  class:absent={!present && pastAttempt}
  class:present={present && pastAttempt}
  class:correct={correct && pastAttempt}
  class:flash={$animation.tileFlash && currentX && currentY}
  class:flip={$animation.tileFlip && guessedY}
  class:bounce={$animation.tileBounce && guessedY}
  style:--delay={xPos * 100}
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
    &.present
    &.correct
      color var(--color_text_board)
      transition background, color, border
      transition-delay calc((var(--delay) * 3ms))
      animation-delay calc(var(--delay) * 1ms)

    &.absent
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

    &.flash
      animation flash 120ms ease-in-out

    &.flip
      animation flip 500ms ease-in
      animation-delay calc(var(--delay) * 2ms)

    &.bounce
      animation bounce 1s ease-in-out
      animation-delay calc(var(--delay) * 1ms)

</style>
