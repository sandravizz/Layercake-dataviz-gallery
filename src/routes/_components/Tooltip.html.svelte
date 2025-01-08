<script>
	import { LayerCake, Svg, Html } from 'layercake';
	import { feature } from 'topojson-client';
	import { geoAlbersUsa } from 'd3-geo';
	import { scaleQuantize } from 'd3-scale';
	import { format } from 'd3-format';
	import MapSvg from '../../_components/Map.svg.svelte';
	import Tooltip from '../../_components/Tooltip.html.svelte';
	import usStates from '../../_data/us-states.topojson.json';
	import stateData from '../../_data/us-states-data.json';

	const colorKey = 'myValue';
	const joinKey = 'name';
	const dataLookup = new Map();
	const geojson = feature(usStates, usStates.objects.collection);
	const projection = geoAlbersUsa;

	stateData.forEach(d => {
		dataLookup.set(d[joinKey], d);
	});

	geojson.features.forEach(d => {
		Object.assign(d.properties, dataLookup.get(d.properties[joinKey]));
	});

	let evt;
	let hideTooltip = true;
	const flatData = geojson.features.map(d => d.properties);
	const colors = ['#ffdecc', '#ffc09c', '#ffa06b', '#ff7a33'];

	const addCommas = format(',');
</script>

<div class="chart-container">
	<LayerCake
		padding={{ top: 20 }}
		data={geojson}
		z={colorKey}
		zScale={scaleQuantize()}
		zRange={colors}
		{flatData}
	>
		<Svg>
			<MapSvg
				{projection}
				on:mousemove={event => (evt = hideTooltip = event)}
				on:mouseout={() => (hideTooltip = true)}
			/>
		</Svg>

		<Html pointerEvents={false}>
			{#if hideTooltip !== true}
				<Tooltip {evt} let:detail>
					{#each Object.entries(detail.props) as [key, value]}
						<div class="row">
							<span>{key}:</span>
							{typeof value === 'number' ? addCommas(value) : value}
						</div>
					{/each}
				</Tooltip>
			{/if}
		</Html>
	</LayerCake>
</div>

<style>
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>
