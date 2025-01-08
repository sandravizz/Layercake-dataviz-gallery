<script>
	import { LayerCake, Canvas } from 'layercake';
	import ScatterCanvas from '../../_components/Scatter.canvas.svelte';
	import data from '../../_data/points.csv';

	const xKey = 'myX';
	const yKey = 'myY';

	data.forEach(d => {
		d[yKey] = +d[yKey];
	});

	const r = 3;
	const padding = 10;
</script>

<div class="chart-container">
	<LayerCake
		padding={{ top: 10 }}
		x={xKey}
		y={yKey}
		xPadding={[padding, padding]}
		yPadding={[padding, padding]}
		{data}
	>
		<Canvas>
			<ScatterCanvas {r} fill="#0cf" />
		</Canvas>
	</LayerCake>
</div>

<style>
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>
