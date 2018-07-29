const CompressionPlugin = require("compression-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const rewireStyledComponents = require('react-app-rewire-styled-components');
const apiMocker = require('webpack-api-mocker');

const path = require('path');
const fs = require('fs');

module.exports = {
  webpack: function(config, env) {
    rewireStyledComponents(config);

    // Rename output files, we need their path's to be short, for SPIFFS
    config.output.filename = 'js/[name].js';

    config.module.rules[1].oneOf.forEach((rule) => {
      try {
        if (rule.options.name == 'static/media/[name].[hash:8].[ext]') {
          rule.options.name = 'media/[name].[ext]'
        }
      } catch (e) {
      }
    });

    if (env === "production") {
      const extractTextPlugin = config.plugins.find((plugin) => plugin instanceof ExtractTextPlugin);
      extractTextPlugin.filename = "css/[name].css";

      // disable sourcemap for production build
      config.devtool = false;

      // add compression plugin, compress javascript, html and css
      config.plugins.push(new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.(js|html|css)$/,
        deleteOriginalAssets: true
      }));
    }

    return config;
  },
  jest: function(config) {
    return config;
  },
  devServer: function(configFunction) {
    return function(proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);

      config.before = function(app) {
        apiMocker(app, path.resolve('./mocker/index.js'));
      };

      return config;
    }
  },
}
