import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        domains: ['randomuser.me'],  
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        });
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
