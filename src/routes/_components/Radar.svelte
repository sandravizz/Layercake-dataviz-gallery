<script>
	import { LayerCake, Svg } from 'layercake';
	import Radar from '../../_components/Radar.svelte';
	import data from '../../_data/radarScores.csv';

	const seriesKey = 'name';
	const xKey = ['fastball', 'change', 'slider', 'cutter', 'curve'];
	const seriesNames = Object.keys(data[0]).filter(d => d !== seriesKey);

	data.forEach(d => {
		seriesNames.forEach(name => {
			d[name] = +d[name];
		});
	});
</script>

<div class="chart-container">
	<LayerCake x={xKey} xDomain={[0, 10]} xRange={({ height }) => [0, height / 2]} {data}>
		<Svg>
			<Radar />
		</Svg>
	</LayerCake>
</div>

<style>
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>
