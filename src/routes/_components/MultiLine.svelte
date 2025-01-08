<script>
	import { LayerCake, Svg } from 'layercake';
	import { scaleOrdinal } from 'd3-scale';
	import { timeParse } from 'd3-time-format';
	import MultiLine from '../../_components/MultiLine.svelte';
	import data from '../../_data/fruit.csv';

	const xKey = 'month';
	const yKey = 'value';
	const zKey = 'fruit';
	const seriesNames = Object.keys(data[0]).filter(d => d !== xKey);
	const seriesColors = ['#ffe4b8', '#ffb3c0', '#ff7ac7', '#ff00cc'];
	const parseDate = timeParse('%Y-%m-%d');
	const dataLong = seriesNames.map(key => {
		return {
			[zKey]: key,
			values: data.map(d => {	
				d[xKey] = typeof d[xKey] === 'string' ? parseDate(d[xKey]) : d[xKey];
				return {
					[yKey]: +d[key],
					[xKey]: d[xKey]
				};
			})
		};
	});

	const flatten = data =>
		data.reduce((memo, group) => {
			return memo.concat(group.values);
		}, []);
</script>

<div class="chart-container">
	<LayerCake
		padding={{ top: 10 }}
		x={xKey}
		y={yKey}
		z={zKey}
		yDomain={[0, null]}
		zScale={scaleOrdinal()}
		zDomain={seriesNames}
		zRange={seriesColors}
		flatData={flatten(dataLong)}
		data={dataLong}
	>
		<Svg>
			<MultiLine />
		</Svg>
	</LayerCake>
</div>

<style>
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>
