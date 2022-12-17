<script lang="ts">
  import "$lib/styles/global.styl";
  import Meta from "$lib/components/meta.svelte";
  import IconsList from "$lib/components/icons/icons_list.svelte";
  import Alert from "$lib/components/notification/alert.svelte";
  import Toast from "$lib/components/notification/toast.svelte";
  import Header from "$lib/components/header.svelte";
  import Wallet from "$lib/components/wallet/wallet.svelte";
</script>

<Meta />
<IconsList />
<Alert />
<Toast />

<div class="page">
  <div class="header_container">
    <header><Header /></header>
  </div>
  <div class="account_status"><Wallet /></div>
  <main><slot /></main>
</div>

<div class="rotate">
  <p>Oh no! We can't fit everything on your screen.</p>
  <p><b>Please rotate your device.</b></p>
</div>

<style lang="stylus">
  .page
    min-height 100vh
    display grid
    grid-template-rows auto auto 1fr

  .header_container
    border-bottom 1px solid var(--color_border_lightgray)
    display flex
    align-items center
    height 4rem
  
  .account_status
    height 2rem
    display flex
    align-items center
    justify-content center
    position relative

  header, main, .account_status
    width 100%  
    max-width $site_max_width
    margin 0 auto
  
  main
    height calc(90vh - 6rem)
    max-height $game_max_height

  .rotate
    display none

  $mh = "only screen and (orientation: landscape) and (max-height: " + $game_min_height + ")"
  @media $mh
    .page
      display none
    
    .rotate
      height 100vh
      display flex
      flex-direction column
      align-items center
      justify-content center

      p
        font-size 1.7rem

</style>
