<script lang="ts">
  import { onMount } from "svelte";
  import Icon from "$lib/components/icons/icon.svelte";
  import { user, precondition, checkPreConditions } from "./user_store";
  import { onClick } from "../../actions/on_click";

  let wallet: { init: any; connect: () => Promise<void> };

  let initialized: boolean = false;
  let isBusy: boolean = false;

  onMount(async () => {
    wallet = await import("./wallet");
    await wallet.init();
    initialized = true;
  });

  function shortenPublicKeyBase58(publicKey58: string): string {
    return publicKey58 ? `${publicKey58.slice(0, 7)}....${publicKey58.slice(-4)}` : "";
  }

  async function connect() {
    isBusy = true;
    await wallet?.connect();
    checkPreConditions();
    isBusy = false;
  }
</script>

{#if initialized}
  {#if $user.walletConnected}
    <div class="connected">
      <p><b>Net:</b> {$user.network}</p>
      <p><b>Addr:</b> {shortenPublicKeyBase58($user.publicKey58)}</p>
      <p><b>Bal:</b> {$user.balance.toFixed(2)} tMINA</p>
    </div>
  {:else}
    <div>
      <p><b>Mina Wallet Not Connected:</b></p>
      <button on:click={connect} disabled={isBusy}>
        <p>Connect</p>
        <span><Icon name="wallet" title="Connect Wallet" /></span>
      </button>
    </div>
  {/if}
{:else}
  <p>Loading...</p>
{/if}

{#if !$precondition}
  <div class="overlay" use:onClick={checkPreConditions} />
{/if}

<style lang="stylus">
  div
    display flex
    align-items center
    justify-content space-between
  
  .connected
    width 100%
    padding 0 0.5rem

  button
    background-color transparent
    height 2rem
    border 0
    padding 0 1rem
    margin-left 1rem
    display flex
    align-items center
    
    span
      width 2rem
      height 2rem
      display flex
      justify-content center
      align-items center

  .overlay
    z-index var(--layer_overlay)
    position absolute
    width 100%
    top 100%
    height 100vh
    background-color transparent
    overflow hidden

</style>
