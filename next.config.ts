import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: true,
    webpack(config) {
        const fileLoaderRule = config.module.rules.find((rule) =>
            rule.test?.test?.('.svg')
        );

        config.module.rules.push(
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/,
            },
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: {
                    not: [...fileLoaderRule.resourceQuery.not, /url/],
                },
                use: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            svgo: false,
                            typescript: true,
                            ext: 'tsx',
                        },
                    },
                ],
            }
        );
        fileLoaderRule.exclude = /\.svg$/i;

        return config;
    },
    images: {
        remotePatterns: [
            {
                hostname: '**',
            },
        ],
    },
};

export default nextConfig;
