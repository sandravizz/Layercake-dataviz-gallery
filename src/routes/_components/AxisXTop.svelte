<script>
	import { LayerCake, Svg } from 'layercake';
	import AxisXTop from '../../_components/AxisXTop.svelte';
	import data from '../../_data/points.csv';

	const xKey = 'myX';
	const yKey = 'myY';

	data.forEach(d => {
		d[yKey] = +d[yKey];
	});

	let tickMarks = false;
	let snapLabels = false;
	let gridlines = true;
	let baseline = true;
	let tickMarkLength = 6;
	let tickGutter = 0;
	let dx = 0;
	let dy = -4;
</script>

<div class="component-container">
	<div class="props">
		<label>
			<input type="checkbox" bind:checked={tickMarks} /> tickMarks
		</label>

		<label>
			<input type="checkbox" bind:checked={gridlines} /> gridlines
		</label>

		<label>
			<input type="checkbox" bind:checked={baseline} /> baseline
		</label>

		<label>
			<input type="checkbox" bind:checked={snapLabels} /> snapLabels
		</label>

		<label class="number" class:disabled={!tickMarks}>
			<span class:disabled={!tickMarks}>tickMarkLength</span>
			<input type="number" bind:value={tickMarkLength} disabled={!tickMarks} />
		</label>

		<label class="number">
			tickGutter
			<input type="number" bind:value={tickGutter} />
		</label>

		<label class="number">
			dx
			<input type="number" bind:value={dx} />
		</label>
		<label class="number">
			dy
			<input type="number" bind:value={dy} />
		</label>
	</div>

	<div class="chart-container">
		<LayerCake padding={{ top: 20, bottom: 10 }} x={xKey} y={yKey} {data}>
			<Svg>
				<AxisXTop
					{baseline}
					{tickMarks}
					{gridlines}
					{snapLabels}
					{tickMarkLength}
					{tickGutter}
					{dx}
					{dy}
				/>
			</Svg>
		</LayerCake>
	</div>
</div>

<style>
	.component-container {
		display: flex;
		flex-direction: row-reverse;
		gap: 10px;
		height: 100%;
	}
	.chart-container {
		flex: 1;
	}
	.props {
		flex-grow: 0;
		flex-shrink: 1;
		display: flex;
		flex-direction: column;
		user-select: none;
		overflow-y: auto;
		font-size: 0.9rem;
	}
	label {
		display: flex;
		cursor: pointer;
		align-items: center;
	}
	input[type='checkbox'] {
		margin-left: 0;
	}
	label.number {
		display: flex;
		justify-content: space-between;
	}
	input[type='number'] {
		max-width: 35px;
		margin-left: 10px;
		float: right;
	}
	span.disabled {
		opacity: 0.5;
	}
	label.disabled {
		pointer-events: none;
	}
</style>
