<script>
	import { LayerCake, Svg, Html } from 'layercake';
	import ScatterSvg from '../../_components/Scatter.svg.svelte';
	import QuadTree from '../../_components/QuadTree.html.svelte';
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
		padding={{ top: 20 }}
		x={xKey}
		y={yKey}
		xPadding={[padding, padding]}
		yPadding={[padding, padding]}
		{data}
	>
		<Svg>
			<ScatterSvg {r} />
		</Svg>

		<Html>
			<QuadTree let:x let:y let:visible>
				<div
					class="circle"
					style="top:{y}px;left:{x}px;display: {visible ? 'block' : 'none'};"
				></div>
			</QuadTree>
		</Html>
	</LayerCake>
</div>

<style>
	.chart-container {
		width: 100%;
		height: 250px;
	}
	.circle {
		position: absolute;
		border-radius: 50%;
		background-color: rgba(171, 0, 214);
		transform: translate(-50%, -50%);
		pointer-events: none;
		width: 10px;
		height: 10px;
	}
</style>
