<script>
	import { LayerCake, Html } from 'layercake';
	import { feature } from 'topojson-client';
	import { geoAlbersUsa, geoCentroid } from 'd3-geo';
	import MapPointsHtml from '../../_components/MapPoints.html.svelte';
	import usStates from '../../_data/us-states.topojson.json';

	const geojson = feature(usStates, usStates.objects.collection);
	const projection = geoAlbersUsa;

	const features = geojson.features.map(d => {
		return {
			properties: d.properties,
			geometry: {
				coordinates: geoCentroid(d)
			}
		};
	});
</script>

<div class="chart-container">
	<LayerCake padding={{ top: 10 }} data={geojson}>
		<Html>
			<MapPointsHtml {projection} {features} />
		</Html>
	</LayerCake>
</div>

<style>
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>
