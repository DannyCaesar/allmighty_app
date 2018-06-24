const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const proxy = require('http-proxy-middleware');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.join(__dirname, '/build'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}	
			}
		]
	},
	devServer: {
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				secure: false
			}
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		})
	]
}