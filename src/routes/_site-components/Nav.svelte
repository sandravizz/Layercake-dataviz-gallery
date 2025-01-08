<script>
	import { page } from '$app/stores';

	let path;
	$: isServiceWorker = $page.url.pathname === '/service-worker.js';
	let segment = '';

	$: if (!isServiceWorker) {
		path = $page.url.pathname;
		segment = `/${path.replace('/', '')}`;
	}

	let open = false;
	let nav;
</script>

<div class="container">
	<a href="/" class="logo">Sandravizz</a>
</div>

<nav bind:this={nav}>
	<ul class="primary">
		<li>
			<a
				id="github-link"
				target="_blank"
				rel="noreferrer"
				href="https://github.com/sandravizz"
			/>
		</li>
	</ul>
</nav>

<style>
	@keyframes fadein {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.container {
		position: fixed;
		width: 100%;
		height: 2.5em;
		background-color: #fff;
		color: #000;
		border-bottom: 1px solid rgb(170, 30, 30, 0.1);
		font-family: 'SignPainter', Helvetica, sans-serif;
		z-index: 12;
	}

	nav {
		position: fixed;
		width: 14em;
		height: calc(100vh - 2.5em);
		top: 2.5em;
		font-family: 'SignPainter', Helvetica, sans-serif;
		background-color: white;
		transform: translate(-100%, 0);
		transition: transform 0.2s cubic-bezier(0.17, 0.67, 0.24, 0.99);
		border-right: 1px solid #eee;
		z-index: 12;
		padding: 1em;
		user-select: none;
	}





	ul {
		display: block;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.primary {
		margin: 0 0 0.5em 0;
	}

	.primary li {
		position: relative;
		display: block;
	}

	.primary li a {
		display: block;
		font-size: 25px;
		padding: 0 0 0.75em 0;
		text-decoration: none;
		line-height: 1;
	}

	.primary a:hover,
	.logo:hover {
		text-decoration: underline;
	}

	#github-link {
		width: 22px;
		height: 2px;
		background: url(/github-logo.svg);
		background-repeat: no-repeat;
		position: relative;
		top: 4px;
	}

	#github-link:hover:after {
		content: ' ';
		position: absolute;
		width: 20px;
		bottom: -3px;
		border-top: 1px solid #000;
	}

	@media (max-width: 645px) {
		a#github-link {
			width: 100% !important;
		}
	}
	@media (min-width: 645px) {
	
		.container {
			height: 3.5em;
		}

		nav {
			width: 100%;
			height: 3.5em;
			padding: 0 1.5em 0 0;
			transform: none;
			transition: none;
			height: 0;
		}

		.primary {
			position: fixed;
			top: 1rem;
			right: 1.5rem;
			margin: 0;
		}

		.primary li {
			display: inline-block;
			position: relative;
			padding: 0 1em;
		}

		.primary li:last-child::after {
			content: '';
		}
		.primary li::after {
			position: absolute;
			top: -2px;
			right: -3px;
			content: '|';
			font-size: 25px;
		}

		.primary li:last-child::after {
			content: '';
		}

		.logo {
			position: absolute;
			top: 1rem;
			left: 1.5rem;
			text-decoration: none;
			transform: none;
		}

	}
</style>
