<script>
	import { LayerCake, Svg, flatten, stack } from 'layercake';
	import { scaleOrdinal } from 'd3-scale';
	import { format } from 'd3-format';
	import { timeParse, timeFormat } from 'd3-time-format';
	import AxisX from '../../_components/AxisX.svelte';
	import AxisY from '../../_components/AxisY.svelte';
	import AreaStacked from '../../_components/AreaStacked.svelte';
	import data from '../../_data/fruit.csv';

	const xKey = 'month';
	const yKey = [0, 1];
	const zKey = 'key';
	const xKeyCast = timeParse('%Y-%m-%d');
	const seriesNames = Object.keys(data[0]).filter(d => d !== xKey);
	const seriesColors = ['#ff00cc', '#ff7ac7', '#ffb3c0', '#ffe4b8'];
	const formatLabelX = timeFormat('%b. %-d');
	const formatLabelY = d => format(`~s`)(d);

	data.forEach(d => {
		d[xKey] = typeof d[xKey] === 'string' ? xKeyCast(d[xKey]) : d[xKey];

		seriesNames.forEach(name => {
			d[name] = +d[name];
		});
	});

	const stackedData = stack(data, seriesNames);
</script>

<div class="chart-container">
	<LayerCake
		padding={{ top: 0, right: 0, bottom: 20, left: 17 }}
		x={d => d.data[xKey]}
		y={yKey}
		z={zKey}
		zScale={scaleOrdinal()}
		zDomain={seriesNames}
		zRange={seriesColors}
		flatData={flatten(stackedData)}
		data={stackedData}
	>
		<Svg>
			<AxisX format={formatLabelX} tickMarks />
			<AxisY format={formatLabelY} />
			<AreaStacked />
		</Svg>
	</LayerCake>
</div>

<style>
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>
