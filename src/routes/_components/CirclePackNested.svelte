<script>
	import { LayerCake, Html } from 'layercake';
	import CirclePack from '../../_components/CirclePack.html.svelte';
	import data from '../../_data/familyTree.csv';

	const idKey = 'name';
	const parentKey = 'parent';
</script>

<div class="chart-container">
	<LayerCake padding={{ top: 15 }} {data}>
		<Html>
			<CirclePack
				{idKey}
				{parentKey}
				spacing={5}
				sortBy={(a, b) => b.depth - a.depth}
				labelVisibilityThreshold={r => false}
				stroke="#00bbff"
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
