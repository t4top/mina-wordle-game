<script>
  import GameGrid from "$lib/components/gameboard/gamegrid.svelte";
  import Keyboard from "$lib/components/keyboard/keyboard.svelte";
</script>

<div>
  <GameGrid />
  <Keyboard />
</div>

<style lang="stylus">
  div
    display grid
    grid-template-rows 1fr auto
    height 100%

</style>
