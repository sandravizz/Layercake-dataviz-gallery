<script>
	import { LayerCake, Svg, Html } from 'layercake';
	import { format } from 'd3-format';
	import { scaleOrdinal } from 'd3-scale';
	import Key from '../../_components/Key.html.svelte';
	import AxisX from '../../_components/AxisX.svelte';
	import Beeswarm from '../../_components/Beeswarm.svelte';
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

	const addCommas = format(',');
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
			<AxisX baseline format={addCommas} tickMarks />	
			<Beeswarm r={width < 400 ? r / 1.6 : r} spacing={1} getTitle={d => d.data[titleKey]} />
		</Svg>

		<Html pointerEvents={false}>
			<Key
				align="end"
				shape="circle"
				lookup={{
					USA: 'U.S.'
				}}
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
