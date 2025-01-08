<script>
	import { page } from '$app/stores';
	import examples from '../../_examples.js';

	$: example = examples.find(ex => ex.slug === $page.params.slug);
</script>

<svelte:head>
	<title>{example.title}</title>
</svelte:head>

<div class="main">
	<h1>
		{example.title}
	</h1>

	<div class="chart-hero">
		<svelte:component this={example.component} />
	</div>
	<div>
		Placeholder
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
	.chart-hero {
		width: 100%;
		height: 500px;
		margin: 1.5em 0 2em 0;
		position: relative;
	}
	.chart-hero :global(.chart-container) {
		height: 100% !important;
	}
	:global(.tab.active) {
		color: #000;
		pointer-events: none;
		border-bottom: 2px solid #000;
	}
</style>
