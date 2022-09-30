// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Hedgehog Book',
  tagline: 'The official documentation for Hedgehog Lab',
  url: 'https://hlab.app/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/hedgehog_1f994.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
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
          routeBasePath: 'docs',
          path: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
          lastVersion: 'current',
          onlyIncludeVersions: ['current'],
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          //editUrl:
            //'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Hedgehog Book',
        logo: {
          alt: 'My Site Logo',
          src: 'img/hedgehog_1f994.png',
        },
        items: [
          {
            to: '/Quickbook/intro-quickbook',    // ./math/intro.md
            label: 'Quickbook',
            position: 'left',
            activeBaseRegex: `/Quickbook/`,
            docsPluginId: 'Quickbook' // related the plugin id in this file.
          },
          {
            to: '/Hedgehog-Lab/intro-hedgehog-lab',    // ./math/intro.md
            label: 'Hedgehog Lab',
            position: 'left',
            activeBaseRegex: `/Hedgehog-Lab/`,
            docsPluginId: 'Hedgehog-Lab' // related the plugin id in this file.
          },
          {
            to: '/Hedgehog-Script/intro-hedgehog-script',    // ./math/intro.md
            label: 'Hedgehog Script',
            position: 'left',
            activeBaseRegex: `/Hedgehog-Script/`,
            docsPluginId: 'Hedgehog-Script' // related the plugin id in this file.
          },
          {
            to: '/math/intro-math',    // ./math/intro.md
            label: 'Math',
            position: 'left',
            activeBaseRegex: `/math/`,
            docsPluginId: 'math' // related the plugin id in this file.
          },
          {
            to: '/contribution/intro-contribution',  // ./docs-system/Intro.md
            label: 'Contribution',
            position: 'left',
            activeBaseRegex: `/contribution/`,
            docsPluginId: 'contribution'
          },
          /*{to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/facebook/docusaurus',
            label: 'GitHub',
            position: 'right',
          },*/
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.com/invite/kmuBw8pRFf',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/hedgehoglabhq',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Hedgehog Lab',
                href: 'https:hlab.app/',
              },
              {
                label: 'Github: Hedgehog Lab',
                href: 'https://github.com/Hedgehog-Computing/hedgehog-lab',
              },
              {
                label: 'GitHub: Hedgehog Computing',
                href: 'https://github.com/Hedgehog-Computing',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Hedgehog Computing. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),

  plugins: [
    /**
     * Define the multiple docs.
     * Example:
     *  the math docs folder is "projectRoot/math"
     *  so you just follow the under code.
     */
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'math',
        path: 'math',
        routeBasePath: 'math',
        sidebarPath: require.resolve('./sidebars.js'),
      },
    ],
    [
    '@docusaurus/plugin-content-docs',
     {
        id: 'contribution',
        path: 'contribution',
        routeBasePath: 'contribution',
        sidebarPath: require.resolve('./sidebars.js'),
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'Hedgehog-Script',
        path: 'Hedgehog-Script',
        routeBasePath: 'Hedgehog-Script',
        sidebarPath: require.resolve('./sidebars.js'),
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'Hedgehog-Lab',
        path: 'Hedgehog-Lab',
        routeBasePath: 'Hedgehog-Lab',
        sidebarPath: require.resolve('./sidebars.js'),
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'Quickbook',
        path: 'Quickbook',
        routeBasePath: 'Quickbook',
        sidebarPath: require.resolve('./sidebars.js'),
      },
    ],
  ],
};

module.exports = config;
