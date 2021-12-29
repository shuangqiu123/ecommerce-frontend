const { when, whenDev, whenProd, loaderByName } = require('@craco/craco');
const webpack = require("webpack");
const CracoLessPlugin = require('craco-less');
const CracoAntDesignPlugin = require('craco-antd');
const CracoVtkPlugin = require('craco-vtk');
const WebpackBar = require('webpackbar');
const CompressionPlugin = require("compression-webpack-plugin");
const CircularDependencyPlugin = require('circular-dependency-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const {	BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const DashboardPlugin = require('webpack-dashboard/plugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const path = require('path');
  
const isBuildAnalyzer = process.env.BUILD_ANALYZER === "true";
  
const pathResolve = pathUrl => path.join(__dirname, pathUrl);

module.exports = {
	webpack: {
		alias: {
			"@": pathResolve("src"),
		},
		plugins: [
			new WebpackBar({
				profile: true
			}),
			new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
			new SimpleProgressWebpackPlugin(),
			new AntdDayjsWebpackPlugin(),
			...whenDev(
				() => [
					new CircularDependencyPlugin({
						exclude: /node_modules/,
						include: /src/,
						failOnError: true,
						allowAsyncCycles: false,
						cwd: process.cwd()
					}),
					new DashboardPlugin()
				], []
			),
			...when(
				isBuildAnalyzer, () => [
					new BundleAnalyzerPlugin({
						analyzerMode: "static",
						openAnalyzer: false,
						reportFilename: resolve(__dirname, "analyzer/index.html")
					})
				], []
			),
			...whenProd(
				() => [
					new TerserPlugin({
						  terserOptions: {
							ecma: undefined,
							parse: {},
							compress: {
								warnings: false,
								drop_console: true,
								drop_debugger: true,
								pure_funcs: ["console.log"]
							}
						}
					}),
					new CompressionPlugin({
						algorithm: 'gzip',
						test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
						threshold: 1024,
						minRatio: 0.8
					})
				], []
			)
		],
		optimization: {
			splitChunks: {
				cacheGroups: {
					commons: {
						chunks: "initial",
						minChunks: 2,
						maxInitialRequests: 5,
						minSize: 0
					},
					vendor: {
						test: /node_modules/,
						chunks: "initial",
						name: "vendor",
						priority: 10,
						enforce: true
					}
				}
			}
		},
		configure: (webpackConfig, {
			env, paths
		}) => {
			paths.appPath='public';
			paths.appBuild = "dist";
			webpackConfig.output = {
				...webpackConfig.output,
				...{
				  filename: whenDev(() => "static/js/bundle.js", "static/js/[name].js"),
				  chunkFilename: "static/js/[name].js"
				},
				path: path.resolve(__dirname, "dist"),
				publicPath: "/"
			};
			webpackConfig.optimization.splitChunks = {
				...webpackConfig.optimization.splitChunks,
				...{
					chunks: "all",
					name: true
				}
			};
			return webpackConfig;
		}
	},
	babel: {
		presets: [],
		plugins: [
			["import", {
				libraryName: "antd",
				libraryDirectory: "es",
				style: true
			}, "antd"],
			["@babel/plugin-proposal-decorators", {
				legacy: true
			}]
		],
		loaderOptions: (babelLoaderOptions, {
			env, paths
		}) => {
			return babelLoaderOptions;
		}
	},
	plugins: [
		...whenDev(
			() => [{
				plugin: CracoVtkPlugin()
			}, {
				plugin: new AntdDayjsWebpackPlugin()
			}], []
		),
		{
		  plugin: CracoLessPlugin,
		  options: {
			lessLoaderOptions: {
				lessOptions: {
				  modifyVars: { 
					  '@primary-color': '#1DA57A',
					  '@font-family': '"Open Sans", sans-serif',
					  '@line-height': '1.25'
					},
				  javascriptEnabled: true,
				},
			},
			modifyLessRule(lessRule, context) {
				lessRule.exclude = /node_modules/;
				lessRule.test = /\.less$/;
				lessRule.use = [
					{ loader: 'style-loader' },
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[local]-[hash:base64:5]',
							},
						},
					},
					{
						loader: 'less-loader',
						options: {
							lessOptions: { javascriptEnabled: true },
						},
					},
				];
				return lessRule;
			  },
		  }
		},
		{ plugin: CracoAntDesignPlugin }
	]
};