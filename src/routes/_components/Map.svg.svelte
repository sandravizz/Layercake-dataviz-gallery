<script>
	import { LayerCake, Svg } from 'layercake';
	import { feature } from 'topojson-client';
	import { geoAlbersUsa } from 'd3-geo';
	import { scaleQuantize } from 'd3-scale';
	import MapSvg from '../../_components/Map.svg.svelte';
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

	const flatData = geojson.features.map(d => d.properties);
	const colors = ['#ffdecc', '#ffc09c', '#ffa06b', '#ff7a33'];
</script>

<div class="chart-container">
	<LayerCake
		padding={{ top: 10 }}
		data={geojson}
		z={colorKey}
		zScale={scaleQuantize()}
		zRange={colors}
		{flatData}
	>
		<Svg>
			<MapSvg {projection} />
		</Svg>
	</LayerCake>
</div>

<style>
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>
