<script>
	import { LayerCake, Svg } from 'layercake';
	import { scaleBand, scaleOrdinal } from 'd3-scale';
	import ClevelandDotPlot from '../../_components/ClevelandDotPlot.svelte';
	import data from '../../_data/fruitOrdinal.csv';

	const yKey = 'year';
	const xKey = Object.keys(data[0]).filter(d => d !== yKey);
	const seriesColors = ['#f0c', '#00bbff', '#00e047', '#ff7a33'];

	data.forEach(d => {
		xKey.forEach(name => {
			d[name] = +d[name];
		});
	});
</script>

<div class="chart-container">
	<LayerCake
		padding={{ left: 10, right: 10 }}
		x={xKey}
		y={yKey}
		yScale={scaleBand().paddingInner(0.05).round(true)}
		yDomain={['2016', '2017', '2018', '2019']}
		zScale={scaleOrdinal()}
		zDomain={xKey}
		zRange={seriesColors}
		{data}
	>
		<Svg>
			<ClevelandDotPlot />
		</Svg>
	</LayerCake>
</div>

<style>
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>
