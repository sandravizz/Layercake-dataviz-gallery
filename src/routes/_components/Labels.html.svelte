<script>
	import { LayerCake, Html } from 'layercake';
	import Labels from '../../_components/Labels.html.svelte';
	import data from '../../_data/points.csv';

	const xKey = 'myX';
	const yKey = 'myY';

	data.forEach(d => {
		d[xKey] = +d[xKey];
		d[yKey] = +d[yKey];
	});

	const labels = data.filter((d, i) => {
		return i % 6 === 0;
	});
</script>

<div class="chart-container">
	<LayerCake padding={{ top: 20, left: 10, right: 10 }} x={xKey} y={yKey} {data}>
		<Html>
			<Labels getLabelName={d => d[xKey]} {labels} />
		</Html>
	</LayerCake>
</div>

<style>
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>
