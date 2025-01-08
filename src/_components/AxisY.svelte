<script>
	import { getContext } from 'svelte';

	const { xRange, yScale, width } = getContext('LayerCake');

	export let tickMarks = false;
	export let labelPosition = 'even';
	export let snapBaselineLabel = false;
	export let gridlines = false;
	export let tickMarkLength = undefined;
	export let format = d => d;
	export let ticks = 0;
	export let tickGutter = 0;
	export let dx = 0;
	export let dy = 0;
	export let charPixelWidth = 7.25;

	$: isBandwidth = typeof $yScale.bandwidth === 'function';
	$: tickVals = Array.isArray(ticks)
		? ticks
		: isBandwidth
			? $yScale.domain()
			: typeof ticks === 'function'
				? ticks($yScale.ticks())
				: $yScale.ticks(ticks);

	function calcStringLength(sum, val) {
		if (val === ',' || val === '.') return sum + charPixelWidth * 0.5;
		return sum + charPixelWidth;
	}

	$: tickLen =
		tickMarks === true
			? labelPosition === 'above'
				? tickMarkLength ?? widestTickLen
				: tickMarkLength ?? 6
			: 0;

	$: widestTickLen = Math.max(
		10,
		Math.max(...tickVals.map(d => format(d).toString().split('').reduce(calcStringLength, 0)))
	);

	$: x1 = -tickGutter - (labelPosition === 'above' ? widestTickLen : tickLen);
	$: y = isBandwidth ? $yScale.bandwidth() / 2 : 0;
	$: maxTickValPx = Math.max(...tickVals.map($yScale));
</script>

<g class="axis y-axis">
	{#each tickVals as tick (tick)}
		{@const tickValPx = $yScale(tick)}
		<g class="tick tick-{tick}" transform="translate({$xRange[0]}, {tickValPx})">
			{#if gridlines === true}
				<line class="gridline" {x1} x2={$width} y1={y} y2={y}></line>
			{/if}
			{#if tickMarks === true}
				<line class="tick-mark" {x1} x2={x1 + tickLen} y1={y} y2={y}></line>
			{/if}
			<text
				x={x1}
				{y}
				dx={dx + (labelPosition === 'even' ? -3 : 0)}
				text-anchor={labelPosition === 'above' ? 'start' : 'end'}
				dy={dy +
					(labelPosition === 'above' || (snapBaselineLabel === true && tickValPx === maxTickValPx)
						? -3
						: 4)}>{format(tick)}</text
			>
		</g>
	{/each}
</g>

<style>
	.tick {
		font-size: 11px;
	}
	.tick line {
		stroke:orange;
	}
	.tick .gridline {
		stroke-dasharray: 5;
	}
	.tick text {
		fill: #666;
	}
	.tick.tick-0 line {
		stroke-dasharray: 0;
	}
</style>
