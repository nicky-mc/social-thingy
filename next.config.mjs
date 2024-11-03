// next.config.mjs
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader',
      ],
    });
    return config;
  },
};

export default nextConfig;