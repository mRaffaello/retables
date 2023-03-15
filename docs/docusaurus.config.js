// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const codeImport = require('remark-code-import');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Retables',
    tagline: 'Another react table library',
    favicon: 'img/favicon.ico',

    // Set the production url of your site here
    url: 'https://retables.github.io',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'retables', // Usually your GitHub org/user name.
    projectName: 'retables.github.io', // Usually your repo name.
    trailingSlash: false,
    deploymentBranch: 'main',

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'en',
        locales: ['en']
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    routeBasePath: '/',
                    sidebarPath: require.resolve('./sidebars.js'),
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    //editUrl:
                    //    'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
                    remarkPlugins: [codeImport]
                },
                blog: false,
                theme: {
                    customCss: require.resolve('./src/css/custom.css')
                }
            })
        ]
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            // Replace with your project's social card
            image: 'img/docusaurus-social-card.jpg',
            navbar: {
                title: 'reTables',
                logo: {
                    alt: 'retables logo',
                    src: 'img/retables.svg',
                    height: 22,
                    width: 22
                },
                items: [
                    {
                        href: 'https://github.com/retables/retables',
                        label: 'GitHub',
                        position: 'right'
                    },
                    {
                        href: 'https://www.npmjs.com/package/retables',
                        label: 'Npm',
                        position: 'right'
                    }
                ]
            },
            footer: {
                links: [],
                copyright: `Made with ❤`
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme
            }
        }),

    plugins: [
        // ....
        async function myPlugin(context, options) {
            return {
                name: 'docusaurus-tailwindcss',
                configurePostCss(postcssOptions) {
                    // Appends TailwindCSS and AutoPrefixer.
                    postcssOptions.plugins.push(require('tailwindcss'));
                    postcssOptions.plugins.push(require('autoprefixer'));
                    return postcssOptions;
                }
            };
        }
    ]
};

module.exports = config;
