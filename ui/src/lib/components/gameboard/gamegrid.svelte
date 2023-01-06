<script lang="ts">
  import Tile from "./tile.svelte";
  import { WORD_LENGTH, MAX_ATTEMPT } from "$lib/gamelogic/config";
  import { userScore, animation } from "$lib/gamelogic/store";
</script>

<div class="board">
  <div class="grid" style:--rows={MAX_ATTEMPT} style:--cols={WORD_LENGTH}>
    {#each { length: MAX_ATTEMPT } as _, y}
      <div class="row" class:shake={$animation.rowShake && $userScore.attempts === y}>
        {#each { length: WORD_LENGTH } as _, x}
          <Tile xPos={x} yPos={y} />
        {/each}
      </div>
    {/each}
  </div>
</div>

<style lang="stylus">
  .board
    display flex
    align-items center
    justify-content center

  .grid
    margin 0.5rem auto
    display grid
    grid-template-rows repeat(var(--rows), 1fr)
    grid-gap 0.4rem

  .row
    display grid
    grid-template-columns repeat(var(--cols), 1fr)
    grid-gap 0.4rem

    &.shake
      animation shake 600ms ease-in-out

</style>
