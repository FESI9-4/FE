import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@chromatic-com/storybook',
        '@storybook/addon-docs',
        '@storybook/addon-a11y',
        '@storybook/addon-vitest',
    ],
    framework: {
        name: '@storybook/nextjs-vite',
        options: {},
    },
    staticDirs: ['../public'],
    viteFinal: async (config) => {
        // SVG를 컴포넌트로 처리하기 위한 설정
        if (config.define) {
            config.define['process.env.NODE_ENV'] = JSON.stringify(
                process.env.NODE_ENV
            );
        }

        return config;
    },
};
export default config;
