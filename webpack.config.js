var path = require('path');

module.exports = {
	entry: {
		app: "./src/app.js"
	},
	devtool: 'source-map',
	output: {
		path: path.join(__dirname, "build"),
		filename: "[name].build.js"
	},
	module: {
		loaders: [
			{
				test: /.json-viewer./,
				loader: "babel"
			},
			{
				test: /\.js$/,
				exclude: /node_modules|bower_components/,
				loader: "babel",
				query: {
					//optional: ['runtime'],
					stage: 0
				}
			},
			{ test: /\.css$/, loader: "style-loader!css-loader?root=build" },
			{ test: /\.jpg$/, loader: "url-loader" },
			{ test: /\.png$/, loader: "file-loader" },
			{
				test: /\.eot$/,
				loader: 'file'
			}, {
				test: /\.svg$/,
				loader: 'file'
			}, {
				test: /\.ttf$/,
				loader: 'file'
			}, {
				test: /\.woff$/,
				loader: 'file'
			}
		]
	}
}
