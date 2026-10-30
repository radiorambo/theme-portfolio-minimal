const achievements = window.achievements;
const filterGroup = document.querySelector('#filters');
const timeline = document.querySelector('#timeline');
const filterStatus = document.querySelector('#filter-status');
const filters = ['All', ...new Set(achievements.map((item) => item.type))];
const filterButtons = [];
let activeFilter = 'All';

function createEvent(item) {
	const listItem = document.createElement('li');
	listItem.className = 'event';

	const card = document.createElement('article');
	card.className = 'event-card';

	const meta = document.createElement('div');
	meta.className = 'event-meta';
	const time = document.createElement('time');
	time.dateTime = item.datetime;
	time.textContent = item.date;
	const separator = document.createElement('span');
	separator.setAttribute('aria-hidden', 'true');
	separator.textContent = '|';
	const type = document.createElement('span');
	type.className = 'event-type';
	type.textContent = `#${item.type.toLowerCase()}`;
	meta.append(time, separator, type);

	const heading = document.createElement('h3');
	if (item.href) {
		const link = document.createElement('a');
		link.className = 'event-link';
		link.href = item.href;
		link.append(document.createTextNode(item.title));
		const arrow = document.createElement('span');
		arrow.className = 'arrow';
		arrow.setAttribute('aria-hidden', 'true');
		arrow.textContent = '↗';
		link.append(arrow);
		heading.append(link);
	} else {
		heading.textContent = item.title;
	}

	card.append(meta, heading);
	if (item.context) {
		const context = document.createElement('p');
		context.className = 'context';
		context.textContent = item.context;
		card.append(context);
	}
	if (item.description) {
		const description = document.createElement('p');
		description.className = 'description';
		description.textContent = item.description;
		card.append(description);
	}

	listItem.append(card);
	return listItem;
}

function renderTimeline() {
	const visibleAchievements =
		activeFilter === 'All'
			? achievements
			: achievements.filter((item) => item.type === activeFilter);

	timeline.replaceChildren(...visibleAchievements.map(createEvent));
	filterStatus.textContent = `Showing ${visibleAchievements.length} ${activeFilter === 'All' ? 'achievements' : activeFilter.toLowerCase() + ' achievements'}.`;

	for (const button of filterButtons) {
		button.setAttribute('aria-pressed', String(button.textContent === activeFilter));
	}
}

for (const filter of filters) {
	const button = document.createElement('button');
	button.type = 'button';
	button.textContent = filter;
	button.setAttribute('aria-pressed', String(filter === activeFilter));
	button.addEventListener('click', () => {
		activeFilter = filter;
		renderTimeline();
	});
	filterButtons.push(button);
	filterGroup.append(button);
}

renderTimeline();
