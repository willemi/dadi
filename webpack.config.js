const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

let output = {
	path: path.resolve(__dirname, 'public'),
	filename: 'resource/js/[name].js',
	},
	modules = {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015'],
				cacheDirectory: true
			}
		},{
			test: /\.css$/,
			use: ExtractTextWebpackPlugin.extract({
				use: ['css-loader'],
				fallback: 'style-loader'
			})
		},{
			test: /\.(eot|svg|ttf|woff|woff2|png)\w*/,
			loader: 'file-loader',
			query: {
				publicPath: '../fonts',
				outputPath: 'resource/fonts/',
				name: '[name].[ext]'
			}
		},{
			test: /\.scss$/,
			use: ExtractTextWebpackPlugin.extract({
				use: ['css-loader','sass-loader'],
				fallback: 'style-loader'
			})
		},{
			test: /\.(png|jpg|gif|svg)$/,
			loader: 'file-loader',
			query: {
				publicPath: '../img',
				outputPath: 'resource/img/',
				name: '[name].[ext]'
			}
		},{
			test: /\.tpl$/,
			loader: 'dot-loader',
			options: {}
		}]
	},
	plugins = [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		}),
		new ExtractTextWebpackPlugin({
			filename: 'resource/css/[name].css',
			allChunks: true
		}),
		new CleanWebpackPlugin('public')
	],
	devServer = {
		contentBase: path.join(__dirname, "public"),
		inline: true,
		open:true
	},
	optimization = {
		splitChunks: {
			chunks: "all", 
			minSize: 0,   
			name: 'common',
			minChunks: 1,
		}
	};
function getEntry(dir) {
	let entrys = {};
	try {
		fs.readdirSync(dir).forEach(file => {
			let filePath = dir + '/' + file;
			let fileName = path.basename(file, '.js');
			if (/\.js$/.test(filePath)) {
				entrys[fileName] = filePath;
			}
		})
	} catch (e) {}
	return entrys
};
function getPlugin(dir) {
	let entrys = [];
	try {
		fs.readdirSync(dir).forEach(file => {
			let fileName = path.basename(file, '.html');
			console.log(fileName,file)
			if (/\.html$/.test(file)) {
				entrys.push(new HtmlWebpackPlugin({
					chunks: ['common', fileName],
					filename: file,
					template: dir + '/' + file
				}));
			}
		})
	} catch (e) {}
	return entrys
};
module.exports = {
	entry: getEntry('./src/resource/js'),
	output,
	devServer,
	module: modules,
	plugins: plugins.concat(getPlugin('./src')),
	optimization
};