//import your path module for joining paths with your main directory.
const path = require("path");

//then import your webpack plugin, so you can now bundle your file in your html file.
const htmlPlugin = require("html-webpack-plugin");

//Now define the object your are exporting, that will be used by webpack to bundle your files.
module.exports = {
  //Define your properties
  //-entry property is the entry file where your app would be registered or where the react-dom is initialized.
  //-output property is the output file where your app bundles directory would be set, and where your files would be bundled at.
  //-module property is where all your rules would be set, for your loaders.
  entry: path.join(__dirname, "/src/index.js"),
  output: {
    //The directory where your index.html file is being created in.
    path: path.join(__dirname, "/dist"),
    //Define the bundle file where all your files would be bundled in.
    filename: "index.bundle.js",
  },
  module: {
    //You rules property would contain all your rules for yoour loaders.
    rules: [
      //Each item would contain a test property which would be regex indicating what files to compile.
      {
        test: /\.(js|jsx)/,
        //WOuld exclude node-Modules from being loaded.
        exclude: /node_modules/,
        //You would have this loaded by babel.
        //You would also have a options object with it's cacheDirectory property set true.
        options: {
          cacheDirectory: true,
        },
        loader: "babel-loader",
      },
      //We can also load css files.
      //No need for a exclude property or options.
      {
        test: /\.css/,
        loader: ["style-loader", "css-loader"],
      },
    ],
  },
  //Now define your array property where you would initialize your webpack plugin.
  plugins: [
    new htmlPlugin({
      //Have your url of your index.html'
      template: "./src/index.html",
    }),
  ],
  externals: [
    {
      "isomorphic-fetch": {
        root: "isomorphic-fetch",
        commonjs2: "isomorphic-fetch",
        commonjs: "isomorphic-fetch",
        amd: "isomorphic-fetch",
      },
    },
  ],
};
