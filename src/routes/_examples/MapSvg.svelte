<script>
	import { LayerCake, Svg, Html } from 'layercake';
	import { feature } from 'topojson-client';
	import { geoIdentity } from 'd3-geo';
	import { scaleQuantize } from 'd3-scale';
	import { format } from 'd3-format';
	import MapSvg from '../../_components/Map.svg.svelte';
	import Tooltip from '../../_components/Tooltip.html.svelte';
	import usStates from '../../_data/states-albers-10m.json';
	import stateData from '../../_data/us-states-data.json';

	const colorKey = 'myValue';
	const dataJoinKey = 'name';
	const mapJoinKey = 'name';
	const dataLookup = new Map();

	const geojson = feature(usStates, usStates.objects.states);
	const projection = geoIdentity;

	stateData.forEach(d => {
		dataLookup.set(d[dataJoinKey], d);
	});

	let evt;
	let hideTooltip = true;
	const flatData = geojson.features.map(d => d.properties);
	const colors = ['#ffdecc', '#ffc09c', '#ffa06b', '#ff7a33'];

	const addCommas = format(',');
</script>

<div class="chart-container">
	<LayerCake
		data={geojson}
		z={d => dataLookup.get(d[mapJoinKey])[colorKey]}
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
					<!-- For the tooltip, do another data join because the hover event only has the data from the geography data -->
					{@const tooltipData = { ...detail.props, ...dataLookup.get(detail.props[mapJoinKey]) }}
					{#each Object.entries(tooltipData) as [key, value]}
						{@const keyCapitalized = key.replace(/^\w/, d => d.toUpperCase())}
						<div class="row">
							<span>{keyCapitalized}:</span>
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
