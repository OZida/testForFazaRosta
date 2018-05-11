const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
	mode: 'none',
	entry: {
		main: path.resolve(__dirname,'src','index.js'),
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname,'build')
	},
	watch: true,
	module: {
		rules: [
		{
			test: /\.css$/,
			use: [
				{
					loader: 'style-loader',
				},
				{
					loader: 'css-loader',
				},
				{
					loader: 'postcss-loader',
					options: {
						plugins: function () {
							return [
							// require('precss'),
							require('autoprefixer')
							];
						}	
					}		
				},
				{
					loader: 'sass-loader',
				},	
			]
		},

		{
			test: /\.scss$/,
			use: [
				{loader: 'style-loader'},
				{loader: 'css-loader'},
				{loader: 'sass-loader'},
			]
		},
		
		{
			test: /\.(png|jpg|gif|svg)$/,
            use: [
                {
                    loader: "url-loader",
                    options: {
                        limit: 8000, 
                    }
                }
            ]
        },
        {
	        test: /\.(png|jpg|gif|svg)$/,
	        loader: 'file-loader',
	        options: {
	        	name: '[name].[ext]?[hash]'
	        }
	    },
	    {
			test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8000, // Convert images < 8kb to base64 strings
                            //  name: 'images/[hash]-[name].[ext]'
                        }
                    }
                ]
        },
	    {
	        test: /\.(woff|woff2|eot|ttf|otf)$/,
	        loader: "file-loader",
        },
        ]
    },    
    devServer: {
		contentBase: path.join(__dirname,"build"),
		compress: true,
		disableHostCheck: true,
		port: 8080,
		open: true,
		hot: true,
		stats: {
			children: false,
	        chunks: false,
	        colors: true,
	        depth: false,
	        entrypoints: false,
	        errors: true,
	        errorDetails: true,
	        hash: true,
	        modules: false,
	        maxModules: 15,
	        modulesSort: "field",
	        performance: true,
	        timings: true,
	        version: true,
	        warnings: true
		}
	},
    plugins: [
    	new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({template:'./static/index.html'}),
		new webpack.ProvidePlugin({
		    $: 'jquery',
		    jQuery: 'jquery',
		    'window.jQuery': 'jquery'
		}),
		new CopyWebpackPlugin([
			{ from: 'static/img/*.*'},
			// { from: 'fonts/*.*'}
		]),
	]
}