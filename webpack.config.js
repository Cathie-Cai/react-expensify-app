// entry point -> output
const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DefinePlugin } = require("webpack");
const webpack  = require('webpack');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({path: '.env.test'});  
} else if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({path: '.env.development'});
}

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'  

  return {
    entry: "./src/app.js",
    output: {
      path: path.resolve(__dirname, "public", "dist"),
      filename: "bundle.js",
      publicPath: '/dist/'
    },
    mode: "development",
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                 presets: ['@babel/preset-env', '@babel/preset-react'],
                 plugins: ['@babel/plugin-proposal-class-properties'] 
              }
            }
        }, {
          test: /\.s?css$/,

          use: [
             MiniCssExtractPlugin.loader,
             {
              loader: 'css-loader',
              options: {
                  sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                  sourceMap: true
              }
            }
          ]
        }]
    },

    plugins: [
      new MiniCssExtractPlugin({ 
          filename: 'styles.css'
      }),
      new webpack.DefinePlugin({
        'process.env.FIREBASE_API_KEY':JSON.stringify(process.env.FIREBASE_API_KEY),
        'process.env.FIREBASE_AUTH_DOMAIN' : JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        'process.env.FIREBASE_DATABASE_URL' : JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        'process.env.FIREBASE_PROJECT_ID' : JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        'process.env.FIREBASE_STORAGE_BUCKET' : JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        'process.env.FIREBASE_MESSAGING_SENDER' : JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER),
        'process.env.FIREBASE_APPID' : JSON.stringify(process.env.FIREBASE_APPID),
        'process.env.FIREBASE_MEASUREMENTID' : JSON.stringify(process.env.FIREBASE_MEASUREMENTID)
      })
    ],
    devtool: isProduction ? 'source-map' : 'inline-cheap-module-source-map',
    devServer: {
      static: path.resolve(__dirname, "public"),
      historyApiFallback: true,
      
      compress: true, 
          port: 8080
    }
  };
};

