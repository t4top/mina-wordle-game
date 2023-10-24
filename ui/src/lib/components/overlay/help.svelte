<script lang="ts">
  import Icon from "$lib/components/icons/icon.svelte";
  import Popup from "./popup.svelte";
  let showHelp: boolean = true;
</script>

<button class="icon_button" on:click={() => (showHelp = true)}>
  <Icon name="help" title="Help" />
</button>

<Popup bind:show={showHelp}>
  <section>
    <h1>Mina Wordle</h1>
    <h3>A wordle-clone game to showcase Mina's zkApp.</h3>
    <ul>
      <li>Powered by o1js and zk oracle backend.</li>
      <li>Created as an entry for the zkIgnite, Cohort 0 challenge.</li>
    </ul>
  </section>
  <section>
    <h2>How To Play</h2>
    <ul>
      <li>
        Connect Mina
        <a href="https://www.aurowallet.com/" title="Auro Wallet" target="_blank" rel="noopener noreferrer">
          Auro Wallet
        </a> on Berkeley Testnet.
      </li>
      <li>
        Fund the wallet with free testnet Mina from the
        <a
          href="https://faucet.minaprotocol.com/"
          title="Testnet Mina Faucet"
          target="_blank"
          rel="noopener noreferrer"
        >
          faucet
        </a>.
      </li>
      <li>Guess the Wordle of the day in 6 tries.</li>
      <li>Each guess must be a valid 5-letter word.</li>
      <li>The color of the tiles will change to show how close your guess was to the word.</li>
      <li><span class="correct">Green</span> backcolor means the letter is in the word and in the correct spot.</li>
      <li><span class="present">Yellow</span> backcolor means the letter is in the word but in the wrong spot.</li>
      <li><span class="absent">Gray</span> backcolor means the letter is not in the word in any spot.</li>
    </ul>
    <h3>👍 Good Luck! 🍀</h3>
  </section>
</Popup>

<!-- {#if showHelp}
  <div class="overlay" on:click={handleClose} on:keydown={handleClose}>
    <div class="container" on:click|stopPropagation={() => {}} on:keydown|stopPropagation={() => {}}>
      <button class="icon_button" on:click={handleClose}>x</button>
    </div>
  </div>
{/if} -->
<style lang="stylus">
  // .overlay
  //   position absolute
  //   z-index var(--layer_help)
  //   left 0
  //   top 0
  //   width 100%
  //   height 100vh
  //   display flex
  //   align-items center
  //   justify-content center
  //   overflow hidden
  //   background-color red

  //   .container
  //     position relative
  //     width min(90vw, $site_max_width)
  //     background-color var(--color_bg_primary)
  //     border 1px solid var(--color_border_darkgray)
  //     padding 3rem 2rem
  //     border-radius 0.5rem
  //     box-shadow 0 4px 23px 0 rgb(0 0 0 / 20%)
  //     max-height 95%
  //     overflow-y auto

  //     h1
  //       font-weight 700
  //       font-size 2.2rem

  //     h2
  //       font-weight 700
  //       font-size 1.7rem

  //     h3
  //       font-weight 500
  //       font-size 1.3rem
      
  //     button
  //       position absolute
  //       top 1rem
  //       right 1rem
  //       background-color transparent
  //       border 0
  //       padding 0
  //       display flex
  //       justify-content center
  //       align-items center
  //       font-size 2rem
  //       font-weight 700

  //     ul
  //       display block
  //       list-style-type disc
  //       margin 1rem 0
  //       padding 0 1.5rem
      
  //     li
  //       display list-item
  //       margin-bottom 0.5rem

  .absent
    padding 0.1rem 0.2rem
    color var(--color_text_board)
    background-color var(--color_bg_gray)

  .present
    padding 0.1rem 0.2rem
    color var(--color_text_board)
    background-color var(--color_bg_yellow)

  .correct
    padding 0.1rem 0.2rem
    color var(--color_text_board)
    background-color var(--color_bg_green)

</style>
