<script>
	import { LayerCake, Svg, Canvas, Html } from 'layercake';
	import { feature } from 'topojson-client';
	import { geoAlbersUsa } from 'd3-geo';
	import { scaleQuantize } from 'd3-scale';
	import MapSvg from '../../_components/Map.svg.svelte';
	import MapCanvas from '../../_components/Map.canvas.svelte';
	import MapLabels from '../../_components/MapLabels.html.svelte';
	import usStates from '../../_data/us-states.topojson.json';
	import stateData from '../../_data/us-states-data.json';
	import stateLabels from '../../_data/us-states-labels.json';

	const colorKey = 'myValue';
	const labelCoordinatesKey = 'center';
	const labelNameKey = 'abbr';
	const geojson = feature(usStates, usStates.objects.collection);
	const projection = geoAlbersUsa;
	const dataJoinKey = 'name';
	const mapJoinKey = 'name';
	const dataLookup = new Map();

	stateData.forEach(d => {
		dataLookup.set(d[dataJoinKey], d[colorKey]);
	});

	const labelsToExclude = ['VT', 'MD', 'NJ', 'RI', 'DC', 'DE', 'WV', 'MA', 'CT', 'NH'];
	const labelsToDisplay = stateLabels.filter(d => {
		return !labelsToExclude.includes(d[labelNameKey]);
	});

	const flatData = geojson.features.map(d => d.properties);
	const colors = ['#ffdecc', '#ffc09c', '#ffa06b', '#ff7a33'];
</script>

<div class="chart-container">
	<LayerCake
		data={geojson}
		z={d => dataLookup.get(d[mapJoinKey])}
		zScale={scaleQuantize()}
		zRange={colors}
		{flatData}
	>
		<Canvas>
			<MapCanvas {projection} fill="#fff" />
		</Canvas>

		<Svg>
			<MapSvg {projection} features={geojson.features.slice(40, 50)} />
		</Svg>

		<Html pointerEvents={false}>
			<MapLabels
				{projection}
				features={labelsToDisplay}
				getCoordinates={d => d[labelCoordinatesKey]}
				getLabel={d => d[labelNameKey]}
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
