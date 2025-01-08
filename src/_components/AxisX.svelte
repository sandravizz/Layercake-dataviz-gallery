<script>
	import { getContext } from 'svelte';
	const { width, height, xScale, yRange } = getContext('LayerCake');
	export let tickMarks = false;	
	export let gridlines = false;
	export let tickMarkLength = 6;
	export let baseline = false;
	export let snapLabels = false;
	export let format = d => d;
	export let ticks = undefined;
	export let tickGutter = 0;
	export let dx = 0;
	export let dy = 12;

	function textAnchor(i, sl) {
		if (sl === true) {
			if (i === 0) {
				return 'start';
			}
			if (i === tickVals.length - 1) {
				return 'end';
			}
		}
		return 'middle';
	}

	$: tickLen = tickMarks === true ? tickMarkLength ?? 6 : 0;
	$: isBandwidth = typeof $xScale.bandwidth === 'function';
	$: tickVals = Array.isArray(ticks)
		? ticks
		: isBandwidth
			? $xScale.domain()
			: typeof ticks === 'function'
				? ticks($xScale.ticks())
				: $xScale.ticks(ticks);
	$: halfBand = isBandwidth ? $xScale.bandwidth() / 2 : 0;
</script>

<g class="axis x-axis" class:snapLabels>
	{#each tickVals as tick, i (tick)}
		{#if baseline === true}
			<line class="baseline" y1={$height} y2={$height} x1="0" x2={$width} />
		{/if}

		<g class="tick tick-{i}" transform="translate({$xScale(tick)},{Math.max(...$yRange)})">
			{#if gridlines === true}
				<line class="gridline" x1={halfBand} x2={halfBand} y1={-$height} y2="0" />
			{/if}
			{#if tickMarks === true}
				<line
					class="tick-mark"
					x1={halfBand}
					x2={halfBand}
					y1={tickGutter}
					y2={tickGutter + tickLen}
				/>
			{/if}
			<text x={halfBand} y={tickGutter + tickLen} {dx} {dy} text-anchor={textAnchor(i, snapLabels)}
				>{format(tick)}</text
			>
		</g>
	{/each}
</g>

<style>
	.tick {
		font-size: 11px;
	}

	line,
	.tick line {
		stroke: red;
		stroke-dasharray: 2;
	}

	.tick text {
		fill: green;
	}

	.tick .tick-mark,
	.baseline {
		stroke-dasharray: 0;
	}
	.axis.snapLabels .tick:last-child text {
		transform: translateX(3px);
	}
	.axis.snapLabels .tick.tick-0 text {
		transform: translateX(-3px);
	}
</style>
