<script>
	import { LayerCake, Svg, Html } from 'layercake';
	import Annotations from '../../_components/Annotations.html.svelte';
	import Arrows from '../../_components/Arrows.svelte';
	import ArrowheadMarker from '../../_components/ArrowheadMarker.svelte';

	const annotations = [
		{
			text: 'Arrows...',
			top: '18%',
			left: '30%',
			arrows: [
				{
					clockwise: false, 
					source: {
						anchor: 'left-bottom', 
						dx: -2,
						dy: -7
					},
					target: {
						x: '28%',
						y: '75%'
					}
				},
				{
					source: {
						anchor: 'right-bottom',
						dy: -7,
						dx: 5
					},
					target: {
						x: '68%',
						y: '48%'
					}
				}
			]
		}
	];
</script>

<div class="chart-container">
	<LayerCake>
		<Html>
			<Annotations {annotations} />
		</Html>

		<Svg>
			<svelte:fragment slot="defs">
				<ArrowheadMarker />
			</svelte:fragment>
			<Arrows {annotations} />
		</Svg>
	</LayerCake>
</div>

<style>
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>
