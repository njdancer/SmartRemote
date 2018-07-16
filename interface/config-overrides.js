const CompressionPlugin = require("compression-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const path = require('path');
const fs = require('fs');

module.exports = function override(config, env) {
  if (env === "production") {
    // rename the ouput file, we need it's path to be short, for SPIFFS
    config.output.filename = 'js/[name].js';

    // disable sourcemap for production build
    config.devtool = false;

    const extractTextPlugin = config.plugins.find((plugin) => plugin instanceof ExtractTextPlugin);
    extractTextPlugin.filename = "css/[name].css";

    config.module.rules[1].oneOf.forEach((rule) => {
      try {
        if (rule.options.name == 'static/media/[name].[hash:8].[ext]') {
          rule.options.name = 'media/[name].[ext]'
        }
      } catch (e) {
      }
    });

    // add compression plugin, compress javascript, html and css
    config.plugins.push(new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.(js|html|css)$/,
      deleteOriginalAssets: true
    }));
  }
  return config;
}
