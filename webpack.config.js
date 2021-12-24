import {fileURLToPath} from 'url';
import {resolve, dirname} from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = {
	entry: ['react-hot-loader/patch', './src/index.tsx'],
	output: {
		path: resolve(__dirname, 'dist'),
		filename: '[name].bundle.js',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		new MiniCssExtractPlugin(),
		new CompressionPlugin({
			test: /\.(html|css|js)(\?.*)?$/i,
		}),
		new BundleAnalyzerPlugin(),
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
				reactVendor: {
					test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
					name: 'reactVendor',
				},
				threeVendor: {
					test: /[\\/]node_modules[\\/](three)[\\/]/,
					name: 'threeVendor',
				},
				vendor: {
					test: /[\\/]node_modules[\\/](!react)(!react-dom)(!three)[\\/]/,
					name: 'vendor',
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
