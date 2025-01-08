<script>
	import { LayerCake, Html } from 'layercake';
	import { scaleOrdinal } from 'd3-scale';
	import BeeswarmHtml from '../../_components/Beeswarm.html.svelte';
	import data from '../../_data/cars-2.csv';

	const xKey = 'Weight_in_lbs';
	const zKey = 'Origin';
	const titleKey = 'Name';
	const r = 4;
	const seriesNames = new Set();
	const seriesColors = ['#ccc', '#fc0', '#000'];
	const dataTransformed = data.map(d => {
		seriesNames.add(d[zKey]);
		return {
			[titleKey]: d[titleKey],
			[xKey]: +d[xKey],
			[zKey]: d[zKey]
		};
	});
</script>

<div class="chart-container">
	<LayerCake
		x={xKey}
		z={zKey}
		zScale={scaleOrdinal()}
		zDomain={[...seriesNames].sort()}
		zRange={seriesColors}
		data={dataTransformed}
		let:width
	>
		<Html>
			<BeeswarmHtml r={width < 400 ? r / 1.6 : r} spacing={1} getTitle={d => d.data[titleKey]} />
		</Html>
	</LayerCake>
</div>

<style>
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>
