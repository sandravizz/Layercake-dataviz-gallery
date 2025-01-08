<script>
	import { LayerCake, WebGL } from 'layercake';
	import ScatterWebGL from '../../_components/Scatter.webgl.svelte';
	import data from '../../_data/points.csv';

	const xKey = 'myX';
	const yKey = 'myY';
	const r = 3;
	const padding = 6;

	data.forEach(d => {
		d[yKey] = +d[yKey];
	});
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
		<WebGL>
			<ScatterWebGL {r} />
		</WebGL>
	</LayerCake>
</div>

<style>
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>
