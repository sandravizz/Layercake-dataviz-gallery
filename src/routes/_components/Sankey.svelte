<script>
	import { LayerCake, Svg } from 'layercake';
	import Sankey from '../../_components/Sankey.svelte';
	import data from '../../_data/sankey-data.js';
</script>

<div class="chart-container">
	<LayerCake padding={{ top: 10 }} {data}>
		<Svg>
			<Sankey colorNodes={() => '#00bbff'} colorLinks={() => '#00bbff35'} />
		</Svg>
	</LayerCake>
</div>

<style>
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>
