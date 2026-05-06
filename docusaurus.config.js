// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Kedrogy',
  tagline: 'Orchestrate ML datasets and models with ease',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://millafedotova.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/kedrogy-landing/',

  // GitHub pages deployment config.
  organizationName: 'millafedotova',
  projectName: 'kedrogy-landing',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Kedrogy',
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/intro',
              },
              {
                label: 'Architecture',
                to: '/docs/architecture',
              },
              {
                label: 'API Reference',
                to: '/docs/api-reference',
              },
            ],
          },
          {
            title: 'Guides',
            items: [
              {
                label: 'Dataset Management',
                to: '/docs/guides/datasets',
              },
              {
                label: 'Model Training',
                to: '/docs/guides/training',
              },
              {
                label: 'Model Serving',
                to: '/docs/guides/serving',
              },
            ],
          },
        ],
        copyright: `Copyright \u00a9 ${new Date().getFullYear()} Kedrogy.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'python', 'yaml', 'json'],
      },
    }),
};

export default config;
