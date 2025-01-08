<script>
	import { getContext } from 'svelte';
	import { line, curveLinear } from 'd3-shape';

	const { data, xGet, yGet, zGet } = getContext('LayerCake');
	
	export let curve = curveLinear;

	$: path = line().x($xGet).y($yGet).curve(curve);

</script>

<g class="line-group">
	{#each $data as dataa}
		<path class="path-line" d={path(dataa.values)} stroke={$zGet(dataa)}></path>
	{/each}
</g>

<style>
	.path-line {
		fill: none;
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 3px;
	}
</style>
