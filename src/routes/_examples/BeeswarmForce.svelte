<script>
	import { LayerCake, Svg, Html } from 'layercake';
	import { scaleOrdinal } from 'd3-scale';
	import Key from '../../_components/Key.html.svelte';
	import AxisX from '../../_components/AxisX.svelte';
	import Beeswarm from '../../_components/BeeswarmForce.svelte';
	import data from '../../_data/us-senate.csv';

	const xKey = 'date_of_birth';
	const zKey = 'gender';
	const titleKey = 'name';
	const r = 6;
	const seriesColors = ['#fc0', '#000'];
	const dataTransformed = data.map(d => {
		return {
			[titleKey]: d[titleKey],
			[zKey]: d[zKey],
			[xKey]: +d[xKey].split('-')[0]
		};
	});
</script>

<div class="chart-container">
	<LayerCake
		padding={{ bottom: 15 }}
		x={xKey}
		z={zKey}
		zScale={scaleOrdinal()}
		zRange={seriesColors}
		data={dataTransformed}
		let:width
	>
		<Svg>
			<AxisX />
			<Beeswarm
				r={width < 400 ? r / 1.25 : r}
				strokeWidth={1}
				xStrength={0.95}
				yStrength={0.075}
				getTitle={d => d[titleKey]}
			/>
		</Svg>

		<Html pointerEvents={false}>
			<Key shape="circle" />
		</Html>
	</LayerCake>
</div>

<style>
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>
