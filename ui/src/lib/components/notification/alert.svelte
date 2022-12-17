<script>
  import { alert } from "./store";
</script>

{#if $alert}
  <div class="overlay">
    <div>
      <p>{$alert}</p>
      <button class="icon_button" on:click={() => ($alert = "")}>x</button>
    </div>
  </div>
{/if}

<style lang="stylus">
  .overlay
    position absolute
    z-index var(--layer_alert)
    left 0
    top 0
    width 100%
    height 100vh
    display flex
    align-items baseline
    justify-content center
    overflow hidden

    div
      opacity 95%
      margin-top 8rem
      max-width 80vw 
      display flex
      align-items baseline
      background-color var(--color_bg_primary)
      border 1px solid var(--color_border_darkgray)
      padding 0.5rem 1rem
      border-radius 0.3rem
      box-shadow 0 4px 23px 0 rgb(0 0 0 / 20%)

      p
        font-weight 700
        font-size 1.5rem
        padding 0.5rem 1rem
      
      button
        background-color transparent
        border 0
        padding 0
        margin-left 0.5rem
        display flex
        justify-content center
        align-items center
        font-size 2rem
        font-weight 700

</style>
