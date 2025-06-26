import type { Preview } from '@storybook/nextjs';
import '../src/app/globals.css';

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        backgrounds: {
            default: 'dark',
            options: [
                {
                    name: 'dark',
                    value: '#1a1b1f',
                },
                {
                    name: 'dark-light',
                    value: '#2b2c30',
                },
                {
                    name: 'light',
                    value: '#ffffff',
                },
            ],
        },
        viewport: {
            options: {
                mobile: {
                    name: 'Mobile',
                    styles: {
                        width: '375px',
                        height: '812px',
                    },
                },
                tablet: {
                    name: 'Tablet',
                    styles: {
                        width: '744px',
                        height: '1133px',
                    },
                },
                desktop: {
                    name: 'Desktop',
                    styles: {
                        width: '1920px',
                        height: '1080px',
                    },
                },
            },
        },
        layout: 'centered',
        a11y: {
            test: 'todo',
        },
    },
    tags: ['autodocs'],
};

export default preview;
