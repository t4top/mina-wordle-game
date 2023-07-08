<script lang="ts">
  import { clickOutside } from "../../actions/click_outside";

  export let show: boolean = false;

  function close() {
    show = false;
  }
</script>

{#if show}
  <div class="overlay">
    <div class="overlay_container" use:clickOutside={close}>
      <button class="closeBtn" on:click={close}>x</button>
      <slot />
    </div>
  </div>
{/if}

<style lang="stylus">
  .overlay
    position absolute
    z-index var(--layer_help)
    left 0
    top 0
    width 100%
    height 100vh
    display flex
    align-items center
    justify-content center
    overflow hidden

    :global
      .overlay_container
        position relative
        width min(90vw, $site_max_width)
        background-color var(--color_bg_primary)
        border 1px solid var(--color_border_darkgray)
        padding 3rem 2rem
        border-radius 0.5rem
        box-shadow 0 4px 23px 0 rgb(0 0 0 / 20%)
        max-height 95%
        overflow-y auto

        h1
          font-weight 700
          font-size 2.2rem

        h2
          font-weight 700
          font-size 1.7rem

        h3
          font-weight 500
          font-size 1.3rem
        
        .closeBtn
          position absolute
          top 1rem
          right 1rem
          background-color transparent
          border 0
          padding 0
          display flex
          justify-content center
          align-items center
          font-size 2rem
          font-weight 700

        ul
          display block
          list-style-type disc
          margin 1rem 0
          padding 0 1.5rem
        
        li
          display list-item
          margin-bottom 0.5rem


</style>
