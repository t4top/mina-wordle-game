<script lang="ts">
  import Tile from "./tile.svelte";
  import { WORD_LENGTH, MAX_ATTEMPT } from "$lib/gamelogic/config";
</script>

<div class="board">
  <div class="grid">
    {#each { length: MAX_ATTEMPT } as _, y}
      <div class="row">
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
    grid-template-rows repeat(6, 1fr)
    grid-gap 0.4rem

  .row
    display grid
    grid-template-columns repeat(5, 1fr)
    grid-gap 0.4rem

</style>
