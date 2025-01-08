<script>
	import { LayerCake, Svg } from 'layercake';
	import { curveCardinal } from 'd3-shape';
	import Area from '../../_components/Area-D3.svelte';
	import data from '../../_data/points.csv';

	const xKey = 'myX';
	const yKey = 'myY';

	data.forEach(d => {
		d[yKey] = +d[yKey];
	});
</script>

<div class="chart-container">
	<LayerCake x={xKey} y={yKey} yDomain={[0, null]} {data}>
		<Svg>
			<Area fill="#f0c" curve={curveCardinal} />
		</Svg>
	</LayerCake>
</div>

<style>
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>
