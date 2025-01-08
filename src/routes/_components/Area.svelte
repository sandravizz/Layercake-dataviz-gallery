<script>
	import { LayerCake, Svg } from 'layercake';
	import Area from '../../_components/Area.svelte';
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
			<Area fill="#ff7ac7" />
		</Svg>
	</LayerCake>
</div>

<style>
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>
