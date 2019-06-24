/*********************************
 *  ./webpack.config.js
 *
 **********************************/
const  path = require('path');

module.exports = {
    entry: "./client/js/index.js",
    output: {
        path: path.resolve('./client/build'),
        filename: 'app.js'
    },
    watchOptions: {
        poll: true
    },
    module: {
        loaders: [
            { 
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    "plugins": [ "transform-react-jsx" ],
                    "presets":[ "es2015", "react", "stage-2"]
                }
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }, 
                    {
                        loader: "sass-loader",
                        options: {
                            includePaths: ["./client/css/", "./client/build/style.css"]
                        }
                    }
                ]
            }
        ]
    }
}
