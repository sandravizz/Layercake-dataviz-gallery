<script>
	import { LayerCake, Svg, Html, groupLonger, flatten } from 'layercake';
	import { scaleOrdinal } from 'd3-scale';
	import { timeParse, timeFormat } from 'd3-time-format';
	import { format } from 'd3-format';	
	import MultiLine from '../../_components/MultiLine.svelte';
	import AxisX from '../../_components/AxisX.svelte';
	import AxisY from '../../_components/AxisY.svelte';
	import Labels from '../../_components/GroupLabels.html.svelte';
	import SharedTooltip from '../../_components/SharedTooltip.html.svelte';
	import data from '../../_data/fruit.csv';

	const xKey = 'month';
	const yKey = 'value';
	const zKey = 'fruit';

	const xKeyCast = timeParse('%Y-%m-%d');

	const seriesNames = Object.keys(data[0]).filter(d => d !== xKey);
	const seriesColors = ['#ffe4b8', '#ffb3c0', '#ff7ac7', '#ff00cc'];

	data.forEach(d => {
		d[xKey] = typeof d[xKey] === 'string' ? xKeyCast(d[xKey]) : d[xKey];

		seriesNames.forEach(name => {
			d[name] = +d[name];
		});
	});

	const formatLabelX = timeFormat('%b. %e');
	const formatLabelY = d => format(`~s`)(d);

	const groupedData = groupLonger(data, seriesNames, {
		groupTo: zKey,
		valueTo: yKey
	});
</script>

<div class="chart-container">
	<LayerCake
		padding={{ top: 7, right: 10, bottom: 20, left: 25 }}
		x={xKey}
		y={yKey}
		z={zKey}
		yDomain={[0, null]}
		zScale={scaleOrdinal()}
		zRange={seriesColors}
		flatData={flatten(groupedData, 'values')}
		data={groupedData}
	>
		<Svg>
			<AxisX
				gridlines={false}
				ticks={data.map(d => d[xKey]).sort((a, b) => a - b)}
				format={formatLabelX}
				snapLabels
				tickMarks
			/>
			<AxisY ticks={0} format={formatLabelY} />
			<MultiLine />
		</Svg>

		<Html>
			<Labels />
			<SharedTooltip formatTitle={formatLabelX} dataset={data} />
		</Html>
	</LayerCake>
</div>

<style>
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>
