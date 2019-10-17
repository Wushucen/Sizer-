module.exports = {
    mode: 'development',
    entry: './app/main.js',
    output: {
        filename: 'bundle.js',
        publicPath: 'xuni'
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader', // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                    },
                    {
                        loader: 'less-loader', // compiles Less to CSS
                    },
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react'],
                        plugins: [
                            ["import", {
                                "libraryName": "antd",
                                "libraryDirectory": "lib",   // default: lib
                                "style": false
                            }], 
                            ['@babel/plugin-proposal-decorators', {
                                'legacy': true
                            }]
                        ]
                    }
                }
            }
        ],
    },
}
