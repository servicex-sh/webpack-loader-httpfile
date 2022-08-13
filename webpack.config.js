const path = require('path');

module.exports = {
    mode: "development",
    entry: {
        main: './demo/hello.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.http$/,
                use: [
                    {
                        loader: path.resolve(__dirname, './index.js'),
                        options: {
                            verbose: true
                        },
                    },
                ],
            },
        ]
    },
    experiments: {
        topLevelAwait: true
    }
};
