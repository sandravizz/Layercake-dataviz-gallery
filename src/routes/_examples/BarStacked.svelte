<script>
	import { LayerCake, Svg, flatten, stack } from 'layercake';
	import { scaleBand, scaleOrdinal } from 'd3-scale';
	import { format } from 'd3-format';
	import BarStacked from '../../_components/BarStacked.svelte';
	import AxisX from '../../_components/AxisX.svelte';
	import AxisY from '../../_components/AxisY.svelte';
	import data from '../../_data/fruitOrdinal.csv';

	const xKey = [0, 1];
	const yKey = 'year';
	const zKey = 'key';
	const seriesNames = Object.keys(data[0]).filter(d => d !== yKey);
	const seriesColors = ['#00bbff', '#8bcef6', '#c4e2ed', '#f7f6e3'];

	data.forEach(d => {
		seriesNames.forEach(name => {
			d[name] = +d[name];
		});
	});

	const formatLabelX = d => format(`~s`)(d);
	const stackedData = stack(data, seriesNames);
</script>

<div class="chart-container">
	<LayerCake
		padding={{ top: 0, bottom: 20, left: 35 }}
		x={xKey}
		y={d => d.data[yKey]}
		z={zKey}
		yScale={scaleBand().paddingInner(0.05)}
		zScale={scaleOrdinal()}
		zDomain={seriesNames}
		zRange={seriesColors}
		flatData={flatten(stackedData)}
		data={stackedData}
	>
		<Svg>
			<AxisX baseline snapLabels format={formatLabelX} />
			<AxisY gridlines={false} />
			<BarStacked />
		</Svg>
	</LayerCake>
</div>

<style>
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>
