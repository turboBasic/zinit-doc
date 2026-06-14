// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	vite: {
		server: {
			fs: {
				allow: ['..'],
			},
		},
	},
	integrations: [
		starlight({
			title: 'Zinit Knowledge Base',
			description: 'Knowledge Base for Zinit, the Zsh plugin manager.',
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/turboBasic/zinit-doc',
				},
			],
			sidebar: [
				{ label: 'Ices', items: [{ autogenerate: { directory: 'ices' } }] },
				{ label: 'Commands', items: [{ autogenerate: { directory: 'commands' } }] },
				{ label: 'Concepts', items: [{ autogenerate: { directory: 'concepts' } }] },
				{ label: 'Annexes', items: [{ autogenerate: { directory: 'annexes' } }] },
				{ label: 'Packages', items: [{ autogenerate: { directory: 'packages' } }] },
				{ label: 'Recipes', items: [{ autogenerate: { directory: 'recipes' } }] },
			],
			components: {
				MarkdownContent: './src/components/MarkdownContent.astro',
				Footer: './src/components/Footer.astro',
			},
			editLink: {
				baseUrl:
					'https://github.com/turboBasic/zinit-doc/edit/main/',
			},
		}),
	],
});
