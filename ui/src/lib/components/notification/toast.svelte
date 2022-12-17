<script>
  import { toast, fixedtoast } from "./store";
</script>

{#if $toast || $fixedtoast}
  <div>
    <p>{$toast || $fixedtoast}</p>
  </div>
{/if}

<style lang="stylus">
  div
    z-index var(--layer_toast)
    position absolute
    top 4.5rem
    left 50%
    transform translate(-50%, 0)
    pointer-events none
    width fit-content
    color var(--color_text_secondary)
    background-color var(--color_bg_secondary)
    border-radius 0.2rem

    p
      font-weight 700
      padding 0.5rem 1rem

</style>
