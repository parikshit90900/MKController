<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import Canva from './lib/Canva.svelte'
  import TopBar from './lib/TopBar.svelte';
  import "./app.css"
  import { tryConnectWs } from './lib/socket';
  import { onDestroy, onMount } from 'svelte';
  tryConnectWs(true);
  let connection_retries = null
  const retry_time = 1000*10
  onMount(() => {
    connection_retries = setInterval(() => {
      tryConnectWs(true);
    }, retry_time)
  })

  onDestroy(() => {
    clearInterval(connection_retries)
  })


</script>

<main>
  <TopBar />
  <Canva />

</main>

<style>
  /* .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  } */
</style>