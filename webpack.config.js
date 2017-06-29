"use strict";

const path = require("path");
const webpack = require("webpack");

// Generate the description file d.ts
function DtsBundlePlugin() { }
DtsBundlePlugin.prototype.apply = function (compiler) {
	compiler.plugin("done", function () {
		var dts = require("dts-bundle");

		dts.bundle({
			name: "FatinaPluginHelpers",
			baseDir: "lib",
			main: "./lib/src/index.d.ts",
			out: "../build/fatina-plugin-helpers.d.ts",
			exclude: (file, external) => {
				return file.indexOf("tests") !== -1;
			},
			removeSource: true,
			verbose: false,
			outputAsModuleFolder: true // to use npm in-package typings
		});
	});
};

module.exports = {
	entry: {
		"fatina-plugin-helpers": "./src/index.ts",
		"fatina-plugin-helpers.min": "./src/index.ts"
	},
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "[name].js",
		library: "FatinaPluginHelpers",
		libraryTarget: "umd",
		umdNamedDefine: true
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js"]
	},
	devtool: "source-map",
	module: {
		rules: [
			{ test: /\.tsx?$/, loader: "ts-loader" }
		]
	},
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			sourceMap: true,
			include: /\.min\.js$/
		}),
		new DtsBundlePlugin()
	]
};
