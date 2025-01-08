<script>
	import { LayerCake, Svg } from 'layercake';
	import Line from '../../_components/Line.svelte';
	import data from '../../_data/points.csv';

	const xKey = 'myX';
	const yKey = 'myY';

	data.forEach(d => {
		d[yKey] = +d[yKey];
	});
</script>

<div class="chart-container">
	<LayerCake padding={{ top: 10 }} x={xKey} y={yKey} {data}>
		<Svg>
			<Line stroke="#de63fd" />
		</Svg>
	</LayerCake>
</div>

<style>
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>
