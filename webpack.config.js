const webpack = require("webpack");
const path = require("path");

var buildFolder = path.resolve(__dirname, "build");
var jsFolder = path.resolve(__dirname, "js");

var config = {
    entry:{
        "login":jsFolder + "/login.js",
        "main":jsFolder + "/main.js",
<<<<<<< HEAD
		"admin":jsFolder + "/admin.js"
=======
        "admin":jsFolder + "/admin.js",
        "navbar":jsFolder + "/navbar.js",
        "orders":jsFolder + "/orders.js",
        "kitchen":jsFolder + "/kitchen.js"
>>>>>>> e52a50a9948df0dc0738fcd7315f4b5db44890a7
    },
    output:{
        filename:"[name]bundle.js",
        path:buildFolder
    },
    plugins:[
        new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery"
        })
    ]
};

module.exports = config;