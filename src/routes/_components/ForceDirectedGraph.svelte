<script>
	import { LayerCake, Svg } from 'layercake';
	import { scaleOrdinal } from 'd3-scale';
	import { schemeCategory10 } from 'd3-scale-chromatic';
	import ForceDirectedGraph from '../../_components/ForceDirectedGraph.svelte';
	import data from '../../_data/miserables.json';

	const xKey = 'id';
	const zKey = 'group';
	const seriesNames = new Set();

	data.nodes.forEach(d => {
		seriesNames.add(d[zKey]);
	});
</script>

<div class="chart-container">
	<LayerCake
		{data}
		x={xKey}
		z={zKey}
		zScale={scaleOrdinal()}
		zDomain={Array.from(seriesNames)}
		zRange={[...schemeCategory10]}
	>
		<Svg>
			<ForceDirectedGraph linkDistance={5} manyBodyStrength={-20} ticks={100} />
		</Svg>
	</LayerCake>
</div>

<style>
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>
