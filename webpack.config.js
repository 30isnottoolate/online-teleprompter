const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: "./src/index.js",

    output: {
        path: path.join(__dirname, "/build"),
        filename: "main.js",
    },

    target: "web",

    devServer: {
        port: "3000",
        static: "./public",
        open: true,
        hot: true,
        liveReload: true
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: "./public/index.html"
        }),

        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
    ],

    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }
            },

            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            }
        ]
    }

}
