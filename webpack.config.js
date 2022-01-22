import {fileURLToPath} from 'url';
import {resolve, dirname} from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = {
	entry: ['react-hot-loader/patch', './src/index.tsx'],
	output: {
		path: resolve(__dirname, 'dist'),
		filename: '[name].[contenthash].js',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		new MiniCssExtractPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.ts(x)?$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
		],
	},
	devServer: {
		static: {
			directory: './dist',
		},
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		alias: {
			'react-dom': '@hot-loader/react-dom',
			'~': resolve(__dirname, 'src'),
		},
	},
	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			chunks: 'all',
			maxInitialRequests: Infinity,
			minSize: 0,
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name(module) {
						// get the name. E.g. node_modules/packageName/not/this/part.js
						// or node_modules/packageName
						const packageName = module.context.match(
							/[\\/]node_modules[\\/](.*?)([\\/]|$)/
						)[1];

						// npm package names are URL-safe, but some servers don't like @ symbols
						return `npm.${packageName.replace('@', '')}`;
					},
				},
			},
		},
	},
};

export default (env, argv) => {
	if (argv.mode === 'development') {
	}

	if (argv.mode === 'production') {
		config.devtool = false;
	}

	return config;
};
