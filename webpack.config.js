module.exports = {
    entry: './src/app.tsx',
    output: {
        filename: './dist/bundle.js'
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js','.js','.tsx']
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: 'ts', exclude: /node_modules/ },
            { test: /\.css?$/, loaders: ['style', 'css?sourceMap'] },
            { test: /\.scss?$/, loaders: [ 'style', 'css?sourceMap', 'sass?sourceMap' ] },
            { test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/, loader: 'url?limit=100000@name=[name][ext]' }
        ]
    }
}