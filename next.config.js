// const isProd = process.env.NODE_ENV === 'production';

const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')([
  'uniforms-bridge-json-schema',
  'uniforms',
  'uniforms-semantic',
  'ajv'
]);
const basePath = '/adsviewer';
module.exports = withPlugins([withTM], {
  basePath,
  trailingSlash: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.(png|svg)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 8192,
          publicPath: basePath + '/_next/static/',
          outputPath: 'static/',
          name: '[name].[ext]'
        }
      }
    });
    return config;
  }
});
