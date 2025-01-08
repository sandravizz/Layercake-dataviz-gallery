<script>
	import { LayerCake, Svg } from 'layercake';
	import { scaleBand } from 'd3-scale';
	import Column from '../../_components/Column.svelte';
	import data from '../../_data/groups.csv';

	const xKey = 'year';
	const yKey = 'value';

	data.forEach(d => {
		d[yKey] = +d[yKey];
	});
</script>

<div class="chart-container">
	<LayerCake
		padding={{ top: 10 }}
		x={xKey}
		y={yKey}
		xScale={scaleBand().paddingInner(0.02).round(true)}
		xDomain={['1979', '1980', '1981', '1982', '1983']}
		yDomain={[0, null]}
		{data}
	>
		<Svg>
			<Column />
		</Svg>
	</LayerCake>
</div>

<style>
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>
