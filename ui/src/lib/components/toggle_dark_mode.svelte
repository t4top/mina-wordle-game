<script>
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import Icon from "./icons/icon.svelte";

  const DARK_THEME_CLASS = "theme_dark";
  let isDarkMode = false;
  let isMounted = false;

  /**
   * @param {boolean} isDark
   */
  function setDarkMode(isDark) {
    if (browser && isMounted) {
      if (isDark) document.body.classList.add(DARK_THEME_CLASS);
      else document.body.classList.remove(DARK_THEME_CLASS);
      // document.body.classList.toggle(DARK_THEME_CLASS);
      localStorage.setItem(DARK_THEME_CLASS, isDark ? "true" : "false");
    }
  }

  $: setDarkMode(isDarkMode);

  onMount(() => {
    isDarkMode = localStorage.getItem(DARK_THEME_CLASS) === "true";
    isMounted = true;
  });
</script>

<button class="icon_button" on:click={() => (isDarkMode = !isDarkMode)}>
  {#if isMounted}
    {#if isDarkMode}
      <Icon name="sun" title="Light Mode" />
    {:else}
      <Icon name="moon" title="Dark Mode" />
    {/if}
  {/if}
</button>
