<script>
	import { LayerCake, Svg, Html } from 'layercake';
	import { scaleOrdinal } from 'd3-scale';
	import { timeParse } from 'd3-time-format';
	import MultiLine from '../../_components/MultiLine.svelte';
	import Labels from '../../_components/GroupLabels.html.svelte';
	import data from '../../_data/fruit.csv';
	const xKey = 'month';
	const yKey = 'value';
	const zKey = 'key';

	const seriesNames = Object.keys(data[0]).filter(d => d !== xKey);
	const seriesColors = ['#ffe4b8', '#ffb3c0', '#ff7ac7', '#ff00cc'];

	const parseDate = timeParse('%Y-%m-%d');

	const dataLong = seriesNames.map(key => {
		return {
			key,
			values: data.map(d => {
				d[xKey] = typeof d[xKey] === 'string' ? parseDate(d[xKey]) : d[xKey];
				return {
					key,
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
		padding={{ top: 7, right: 10 }}
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

		<Html>
			<Labels />
		</Html>
	</LayerCake>
</div>

<style>
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>
