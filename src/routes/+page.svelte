<script>
	import { achievements } from '../lib/achievements.js';

	const filters = ['All', ...new Set(achievements.map((item) => item.type))];
	let activeFilter = $state('All');
	let filteredAchievements = $derived(
		activeFilter === 'All'
			? achievements
			: achievements.filter((item) => item.type === activeFilter)
	);
</script>

<svelte:head>
	<meta
		name="description"
		content="A loose timeline of Shyam Ram's work, projects, talks, and learning."
	/>
</svelte:head>

<main class="page">
	<header class="intro">
		<div class="intro-content">
			<div class="identity">
				<h1>Shyam Ram</h1>
				<p class="role">Backend developer</p>
			</div>

			<div class="intro-copy">
				<p>
					I build reliable systems and useful tools. This is an informal record of work, projects, ideas,
					and things learned along the way.
				</p>
				<nav class="social-links" aria-label="Social links">
					<a href="mailto:shyam@example.com">Email</a>
					<a href="https://github.com/example">GitHub</a>
					<a href="https://www.linkedin.com/in/example">LinkedIn</a>
					<a href="https://x.com/example">X</a>
				</nav>
			</div>
		</div>
		<!-- Source: Unsplash, photo-1500648767791-00dcc994a43e -->
		<img
			class="portrait"
			src="/portrait.jpg"
			alt="Portrait placeholder from Unsplash"
			width="900"
			height="1100"
		/>
	</header>

	<section class="timeline-section" aria-labelledby="timeline-title">
		<div class="section-heading">
			<div>
				<h2 id="timeline-title">My Works</h2>
				<div class="filters" role="group" aria-label="Filter achievements by type">
					{#each filters as filter (filter)}
						<button
							type="button"
							aria-pressed={activeFilter === filter}
							onclick={() => (activeFilter = filter)}
						>
							{filter}
						</button>
					{/each}
				</div>
			</div>
		</div>

		<ol class="timeline">
			{#each filteredAchievements as item (item.title + item.date)}
				<li class="event">
					<article class="event-card">
						<div class="event-meta">
							<time datetime={item.datetime}>{item.date}</time>
							<span aria-hidden="true">|</span>
							<span class="event-type">#{item.type.toLowerCase()}</span>
						</div>

						<h3>
							{#if item.href}
								<!-- Absolute external URLs should not pass through SvelteKit resolve(). -->
								<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
								<a class="event-link" href={item.href}>
									{item.title}<span class="arrow" aria-hidden="true">↗</span>
								</a>
							{:else}
								{item.title}
							{/if}
						</h3>

						{#if item.context}
							<p class="context">{item.context}</p>
						{/if}
						{#if item.description}
							<p class="description">{item.description}</p>
						{/if}
					</article>
				</li>
			{/each}
		</ol>
	</section>
</main>

<style>
	:global(body) {
		background: hsl(0 0% 100%);
		color: hsl(0 0% 12%);
	}

	.page {
		--ink: hsl(0 0% 12%);
		--muted: hsl(0 0% 40%);
		--line: hsl(0 0% 84%);
		--surface: hsl(0 0% 98%);
		max-width: 1120px;
		margin-inline: auto;
		padding: clamp(2.5rem, 7vw, 6rem) 2rem 5rem;
	}

	.intro {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(180px, 260px);
		grid-template-areas: 'content portrait';
		align-items: center;
		gap: clamp(1.5rem, 5vw, 4rem);
		padding-bottom: 3.5rem;
		border-bottom: 1px solid var(--line);
	}

	.intro-content {
		grid-area: content;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1.75rem;
	}

	.portrait {
		grid-area: portrait;
		display: block;
		width: 100%;
		aspect-ratio: 4 / 5;
		object-fit: cover;
		object-position: center 35%;
		filter: grayscale(100%);
	}

	h1,
	h2,
	h3,
	p {
		margin-top: 0;
	}

	h1 {
		margin-bottom: 0.5rem;
		font-size: clamp(3.25rem, 8vw, 6.5rem);
		font-weight: 500;
		letter-spacing: -0.075em;
		line-height: 0.95;
	}

	.role {
		margin-bottom: 0;
		color: var(--ink);
		font-size: clamp(1.25rem, 2vw, 1.5rem);
		font-weight: 500;
		letter-spacing: -0.025em;
	}

	.intro-copy > p {
		max-width: 42ch;
		margin-bottom: 1.25rem;
		font-size: 1.0625rem;
		line-height: 1.65;
	}

	.social-links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.55rem 1.25rem;
	}

	.social-links a {
		color: var(--muted);
		font-size: 0.9375rem;
		text-decoration-color: var(--line);
		text-underline-offset: 0.22em;
	}

	.social-links a:hover,
	.event-link:hover {
		color: var(--muted);
	}

	.timeline-section {
		padding-top: 3.5rem;
	}

	.section-heading {
		display: flex;
		align-items: end;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.filters {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 1rem;
	}

	.filters button {
		min-height: 44px;
		padding: 0.45rem 0.8rem;
		border: 1px solid var(--line);
		background: transparent;
		color: var(--muted);
		font: inherit;
		font-size: 0.9375rem;
		cursor: pointer;
	}

	.filters button:hover:not([aria-pressed='true']) {
		border-color: var(--muted);
		color: var(--ink);
	}

	.filters button[aria-pressed='true'] {
		border-color: var(--ink);
		background: var(--ink);
		color: hsl(0 0% 100%);
	}

	.filters button:focus-visible {
		outline: 2px solid var(--ink);
		outline-offset: 3px;
	}

	h2 {
		margin-bottom: 0;
		font-size: clamp(1.75rem, 3vw, 2.5rem);
		font-weight: 500;
		letter-spacing: -0.05em;
	}

	.timeline {
		columns: 2;
		column-gap: 0.875rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.event {
		break-inside: avoid;
		margin-bottom: 0.875rem;
	}

	.event-card {
		padding: 1.25rem 1.35rem;
		border: 1px solid var(--line);
		background: var(--surface);
	}

	.event:nth-child(4n + 2) .event-card {
		padding-block: 1.7rem;
	}

	.event:nth-child(5n) .event-card {
		background: hsl(0 0% 96%);
	}

	.event-meta {
		display: flex;
		align-items: center;
		gap: 0.45rem;
		margin-bottom: 1.15rem;
		color: var(--muted);
		font-size: 0.875rem;
	}

	.event-meta time {
		font-variant-numeric: tabular-nums;
	}

	.event-type {
		color: var(--muted);
		font-size: 0.875rem;
		line-height: 1.35;
	}

	h3 {
		margin-bottom: 0.35rem;
		font-size: 1.25rem;
		font-weight: 500;
		letter-spacing: -0.025em;
		line-height: 1.3;
	}

	.event-link {
		color: var(--ink);
		text-decoration: none;
	}

	.event-link:focus-visible,
	.social-links a:focus-visible {
		border-radius: 1px;
		outline: 2px solid var(--ink);
		outline-offset: 4px;
	}

	.arrow {
		display: inline-block;
		margin-left: 0.3em;
		color: var(--muted);
		font-size: 0.85em;
		transition: transform 150ms ease;
	}

	.event-link:hover .arrow {
		transform: translate(2px, -2px);
	}

	.context,
	.description {
		margin-bottom: 0;
		font-size: 0.9375rem;
		line-height: 1.55;
	}

	.context {
		color: var(--muted);
	}

	.description {
		margin-top: 0.65rem;
	}

	@media (max-width: 700px) {
		.page {
			padding: 2.75rem 1.25rem 3rem;
		}

		.intro {
			grid-template-columns: 1fr;
			grid-template-areas: 'portrait' 'content';
			gap: 1.5rem;
			padding-bottom: 2.5rem;
		}

		.portrait {
			width: min(65%, 220px);
			justify-self: start;
		}

		.timeline-section {
			padding-top: 2.5rem;
		}

		.timeline {
			columns: 1;
		}
	}

	@media (max-width: 460px) {
		.section-heading {
			align-items: start;
			flex-direction: column;
			gap: 0.5rem;
		}

		.event-card {
			min-height: 0;
			padding: 1.1rem;
		}
	}
</style>
