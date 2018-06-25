var path = require("path");

module.exports = {
  entry: {
    app: ["./src/index.js"]
  },
  output: {
    path: path.resolve(__dirname, "public"),
    //publicPath: "/public/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public"), // Tell the server where to serve content from. This is only necessary if you want to serve static files
    //publicPath: "/", // The bundled files will be available in the browser under this path.
    noInfo: false // Only errors & warns on hot reload
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /.(jpg|png|svg)$/, loader: 'url-loader', options: { limit: 25000, }, }
    ]
  },
};