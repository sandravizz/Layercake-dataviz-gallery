<script>
	import { LayerCake, Svg } from 'layercake';
	import Voronoi from '../../_components/Voronoi.svelte';
	import data from '../../_data/points.csv';

	const xKey = 'myX';
	const yKey = 'myY';

	data.forEach(d => {
		d[yKey] = +d[yKey];
	});

	function logEvent(d) {
		console.log('dispatched event', d, d.detail);
	}
</script>

<div class="chart-container">
	<LayerCake padding={{ top: 10 }} x={xKey} y={yKey} {data}>
		<Svg>
			<Voronoi stroke="#000" on:voronoi-mouseover={logEvent} />
		</Svg>
	</LayerCake>
</div>

<style>
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>
