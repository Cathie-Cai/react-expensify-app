// entry point -> output
const path = require("path");
 


module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
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
        use: ['style-loader', 'css-loader', 'sass-loader']
      }]
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    static: path.resolve(__dirname, "public"),
    historyApiFallback: true,
    compress: true, 
        port: 8080
  }
};
