<script>
	import { LayerCake, Canvas } from 'layercake';
	import { feature } from 'topojson-client';
	import { geoAlbersUsa } from 'd3-geo';
	import MapCanvas from '../../_components/Map.canvas.svelte';
	import usStates from '../../_data/us-states.topojson.json';

	const geojson = feature(usStates, usStates.objects.collection);
	const projection = geoAlbersUsa;
</script>

<div class="chart-container">
	<LayerCake padding={{ top: 10 }} data={geojson}>
		<Canvas>
			<MapCanvas {projection} fill="#fff" />
		</Canvas>
	</LayerCake>
</div>

<style>
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>
