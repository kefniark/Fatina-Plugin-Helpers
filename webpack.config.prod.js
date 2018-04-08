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
	mode: "production",
	entry: "./src/index.ts",
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "fatina-plugin-helpers.min.js",
		library: "FatinaPluginHelpers",
		libraryTarget: "umd",
		umdNamedDefine: true,
		globalObject: "typeof self !== 'undefined' ? self : this"
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js"]
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{ loader: "ts-loader" }
				]
			}
		]
	},
	plugins: [
		new DtsBundlePlugin()
	]
};
