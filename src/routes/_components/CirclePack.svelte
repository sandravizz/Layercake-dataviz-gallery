<script>
	import { LayerCake, Html } from 'layercake';
	import CirclePack from '../../_components/CirclePack.html.svelte';
	import data from '../../_data/fruitGroups.csv';

	const idKey = 'fruit';
	const valueKey = 'value';

	data.forEach(d => {
		d[valueKey] = +d[valueKey];
	});
</script>

<div class="chart-container">
	<LayerCake padding={{ top: 10, bottom: 20, left: 30 }} {data}>
		<Html>
			<CirclePack
				{idKey}
				{valueKey}
				fill="#ff00cc"
				stroke="#9f0080"
				textColor="#61004e"
				textStroke="#ffdbf8"
				textStrokeWidth={1}
			/>
		</Html>
	</LayerCake>
</div>

<style>
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>
