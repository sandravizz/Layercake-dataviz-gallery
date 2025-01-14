<script>
  import examples from "./_examples.js";
</script>

<svelte:head>
  <title>Sandraviz</title>
</svelte:head>

<div class="main">
  <div class="logo-container">
    <h1 class="text-big">Sandravizz</h1>
  </div>

  <div id="dek">
    <p class="text-medium">
      Below you find a collection of chart examples using layercake.
    </p>
  </div>

  <div id="gallery">
    {#each examples as example}
      <div class="gallery-item">
        <h4 class="text-medium">
          <a href="/example/{example.slug}">{example.title}</a>
        </h4>
        <svelte:component this={example.component} />
      </div>
    {/each}
  </div>
</div>

<style>
  .main {
    position: relative;
    max-width: 54em;
    background-color: white;
    padding: 1.5em 2em 2em 2em;
    margin: 0 auto;
    box-sizing: border-box;
    overflow: hidden;
  }
  h1 {
    font-size: 61px;
    display: inline-block;
    vertical-align: bottom;
    margin-bottom: 7px;
  }
  .gallery-item {
    display: inline-block;
    vertical-align: top;
    width: 45%;
    position: relative;
    height: 140px;
    margin-bottom: 60px;
  }
  .gallery-item :global(.chart-container) {
    height: 100% !important;
  }
  @media (max-width: 650px) {
    .gallery-item {
      width: 100%;
    }
  }
  @media (max-width: 350px) {
    h1 {
      font-size: 59px;
    }
  }
  .gallery-item:nth-child(odd) {
    margin-right: 5%;
  }
  #dek {
    width: 100%;
    max-width: 800px;
  }
  a:hover {
    color: var(--pink);
  }
  @media (max-width: 895px) {
    :global(#svelte) {
      overflow: hidden;
    }
    .main {
      padding: 1em;
    }
  }
</style>
