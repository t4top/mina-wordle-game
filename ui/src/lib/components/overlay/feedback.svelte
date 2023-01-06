<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import Icon from "$lib/components/icons/icon.svelte";
  import { userScore, secretWord } from "$lib/gamelogic/store";
  import Popup from "./popup.svelte";

  let showFeedback: boolean = false;
  let isBusy: boolean = false;
  let alreadyShown: boolean = false;
  let countdown: string = "";
  let intervalId: NodeJS.Timeout | null = null;

  const TIMEOUT_DELAY: number = 4000;

  $: autoShow($userScore.gameOver);

  function autoShow(gameOver: boolean) {
    if (alreadyShown) return;

    if (gameOver) {
      const timeoutId = setTimeout(() => {
        showFeedback = true;
        alreadyShown = true;
        clearTimeout(timeoutId);
      }, TIMEOUT_DELAY);
    }
  }

  async function getPercentile() {
    isBusy = true;
    const { callZkPercentile } = await import("$lib/components/wallet/wallet");
    const percentile = await callZkPercentile($userScore.attempts);
    userScore.setPercentile(percentile);
    isBusy = false;
  }

  const zeroPad = (num: number, places: number) => String(num).padStart(places, "0");

  onMount(() => {
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const midnightTime = midnight.getTime();

    intervalId = setInterval(() => {
      const now = new Date().getTime();
      const remain = midnightTime - now;

      const hour = Math.floor(remain / (1000 * 60 * 60));
      const minute = Math.floor((remain % (1000 * 60 * 60)) / (1000 * 60));
      const second = Math.floor((remain % (1000 * 60)) / 1000);
      countdown = `${zeroPad(hour, 2)}:${zeroPad(minute, 2)}:${zeroPad(second, 2)}`;
    }, 1000);
  });

  onDestroy(() => {
    if (intervalId) clearInterval(intervalId);
  });
</script>

<button class="icon_button" on:click={() => (showFeedback = $userScore.gameOver)} disabled={!$userScore.gameOver}>
  <Icon name="barchart" title="Game Score" />
</button>

<Popup bind:show={showFeedback}>
  {#if $userScore.won}
    <h1>🥳 You won!</h1>
    <section class="section_stat">
      <p>STATISTICS</p>
      <div class="stat">
        <div>
          <h2>100</h2>
          <small>Win %</small>
        </div>
        <div>
          <h2>{$userScore.attempts}</h2>
          <small>Guess</small>
        </div>
        <div>
          {#if $userScore.percentile}
            <h2>{$userScore.percentile}</h2>
            <small>Percentile</small>
          {:else if isBusy}
            <span>Calculating ...</span>
            <br />
            <small>Percentile</small>
          {:else}
            <button on:click={getPercentile}>Get My Percentile</button>
            <br />
            <small><i>It will take few minutes to complete.</i></small>
          {/if}
        </div>
      </div>
    </section>
  {:else}
    <h1>😔 Game Over</h1>
    <section>
      <ul>
        <li><h3>The secret wordle is <span class="wordle">{$secretWord}.</span></h3></li>
        <li><h3>Try your luck again tomorrow.</h3></li>
      </ul>
    </section>
  {/if}

  <section class="section_countdown">
    <div>
      Next Wordle in {countdown}
    </div>
  </section>
</Popup>

<style lang="stylus">
  h1
    text-align center

  section
    margin-top 1rem
  
  .section_stat
    text-align center

    .stat
      display flex
      align-items baseline
      justify-content center

      h2
        font-size 3rem
        font-weight 400

      div
        padding 0.5rem

      button
        background-color transparent
        border 1px solid var(--color_text_primary)
        border-radius 0.4rem
        padding 0.2rem 0.5rem

        &:disabled
          border 1px solid var(--color_text_gray)

  .wordle
    font-weight 700
    text-transform uppercase
  
  .section_countdown
    div
      text-align center
      font-weight 700
      text-transform uppercase
      padding-top 1rem
      border-top 1px solid var(--color_border_lightgray)

</style>
