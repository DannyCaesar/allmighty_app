const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const proxy = require('http-proxy-middleware');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
			},
			{
			    test: /\.(css|scss|sass)$/,
			   use: ExtractTextPlugin.extract({
			   	fallback: "style-loader",
			   	use: "css-loader!sass-loader"
			   })
			},
			{
				test: /\.(jpe?g|png|gif|mp3)$/i,
            	//include: SRC,
            	loaders: ['file-loader']
			},
			{ test: /\.(woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
		]
	},
	devServer: {
		historyApiFallback: true,
		contentBase: './',
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
		}),
		new ExtractTextPlugin("styles.css")
	],
	node: {
		fs: 'empty'
	}
}