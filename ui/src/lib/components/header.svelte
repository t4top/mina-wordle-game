<script>
  import Help from "$lib/components/overlay/help.svelte";
  import Feedback from "$lib/components/overlay/feedback.svelte";
  import ToggleDarkMode from "./toggle_dark_mode.svelte";
</script>

<div class="header">
  <div class="title">Mina Wordle</div>
  <div class="submenu">
    <Help />
    <Feedback />
    <ToggleDarkMode />
  </div>
</div>

<style lang="stylus">
  .header
    padding 0 1rem
    display flex
    align-items center
    justify-content space-between
    @media $mq_md
      padding 0

  .title
    flex 1
    font-size 2rem
    font-weight 700
    margin 0.7rem 0
    white-space nowrap

  .submenu
    width 100%
    display flex
    justify-content right

  :global
    .icon_button
      background-color transparent
      border 0
      height 2rem
      width 2rem
      padding 0
      margin-left 0.5rem
      display flex
      justify-content center
      align-items center

</style>
