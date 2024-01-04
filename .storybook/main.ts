import type {StorybookConfig} from '@storybook/nextjs';
import {TsconfigPathsPlugin} from 'tsconfig-paths-webpack-plugin';

const config: StorybookConfig = {
  stories: ['../**/**/*.stories.mdx', '../**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {
      fastRefresh: true,
      builder: {fsCache: true},
    },
  },
  docs: {
    autodocs: true, // true | 'tag'
  },
  webpackFinal: async (config, _options) => {
    function setDefaultResolve() {
      if (typeof config.resolve === 'undefined') config.resolve = {};
      if (typeof config.resolve.fallback === 'undefined') config.resolve.fallback = {};
      if (typeof config.resolve.plugins === 'undefined') config.resolve.plugins = [];
    }
    function setTsconfigPathsPlugin() {
      config.resolve?.plugins?.push(
        new TsconfigPathsPlugin({
          extensions: config.resolve.extensions ?? [],
        }),
      );
    }
    function setCssPropRule() {
      config.module?.rules?.push({
        test: /\.(ts|tsx)$/,
        loader: require.resolve('babel-loader'),
        options: {
          presets: [require.resolve('@emotion/babel-preset-css-prop')],
        },
      });
    }
    function setFallback() {
      if (!config.resolve?.fallback) return;
      config.resolve.fallback = {
        ...(config.resolve || {}).fallback,
        fs: false,
        // Related "remark-frism" ---------
        net: false,
        tls: false,
        child_process: false,
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        stream: require.resolve('stream-browserify'),
        zlib: require.resolve('browserify-zlib'),
        os: require.resolve('os-browserify/browser'),
        vm: require.resolve('vm-browserify'),
      };
    }

    setDefaultResolve();
    setTsconfigPathsPlugin();
    setCssPropRule();
    setFallback();

    return config;
  },
};

export default config;
