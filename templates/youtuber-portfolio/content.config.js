/**
 * Everything a non-developer needs to change, in one file.
 *
 * Edit this, run `npm run build`, and the page is yours. No component is edited
 * to change copy, a link or a colour — if you find yourself opening
 * `page.template.html` to change words, something belongs here instead.
 */
export default {
	/** Shown in the tab, in search results and in link previews. */
	site: {
		name: 'Swarnil',
		title: 'Swarnil — build videos, courses and field notes',
		description:
			'I build things, film how it went, and write down what I learned. Videos, courses and build logs.',
		url: 'https://example.com',
		lang: 'en',
	},

	/**
	 * The accent. One colour, used for the primary button, links on hover and the
	 * live dot. Any CSS colour works; the rest of the palette follows it.
	 */
	accent: '#f04e2e',

	hero: {
		eyebrow: 'Salesforce engineer · Filmmaker · Budapest',
		/** The last word or two takes the accent — wrap them in <em>. */
		title: 'I build it, film it, and write down <em>what broke</em>.',
		lead: 'Courses, build logs and the occasional trip — documented on camera.',
		primary: { label: 'Watch the latest', href: '#videos' },
		secondary: { label: 'Read the notes', href: '#writing' },
		/** Optional. A 16:9 image or an mp4; leave blank for the pattern backdrop. */
		media: '',
	},

	/** The one video you want people to watch first. */
	featured: {
		title: 'Rebuilding my whole site on design tokens',
		excerpt: 'Nine months of ad hoc CSS, deleted in an afternoon. Here is what replaced it.',
		runtime: '18:04',
		href: 'https://www.youtube.com/@imswarnil',
		thumbnail: '',
	},

	videos: [
		{ title: 'Rebuilding my Ghost theme', excerpt: 'From Tailwind soup to a real system.', runtime: '14:22', href: '#', thumbnail: '' },
		{ title: 'The camera setup I actually use', excerpt: 'Three lights, one lens, no gimbal.', runtime: '09:41', href: '#', thumbnail: '' },
		{ title: 'Shipping a course in a weekend', excerpt: 'What I cut to make it fit.', runtime: '22:10', href: '#', thumbnail: '' },
		{ title: 'Why I stopped using a CMS', excerpt: 'And what I moved to instead.', runtime: '11:35', href: '#', thumbnail: '' },
	],

	writing: [
		{ title: 'Design tokens are a naming problem', excerpt: 'The values were never the hard part.', href: '#' },
		{ title: 'A theme is not a design system', excerpt: 'Where one ends and the other begins.', href: '#' },
		{ title: 'Notes from three months of daily uploads', excerpt: 'What survived contact with a schedule.', href: '#' },
	],

	about: {
		heading: 'About',
		body: [
			'I am a Salesforce engineer who films the work. Most of what I publish starts as a problem I had to solve anyway — the video is the notes.',
			'Based in Budapest. Available for consulting on design systems and Ghost themes.',
		],
		/** Optional square portrait. */
		portrait: '',
	},

	newsletter: {
		heading: 'One email when something ships',
		body: 'No schedule, no filler. Unsubscribe in a click.',
		/** Point this at your provider’s form endpoint. */
		action: '',
		buttonLabel: 'Subscribe',
	},

	links: [
		{ label: 'YouTube', href: 'https://www.youtube.com/@imswarnil' },
		{ label: 'GitHub', href: 'https://github.com/imswarnil' },
		{ label: 'X', href: '#' },
	],

	footer: { note: 'Almost monochrome, so one colour can mean something.' },
};
