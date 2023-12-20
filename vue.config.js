const webpack = require("webpack");
const path = require("path");
function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    assetsDir: 'static',
    parallel: false,
    publicPath: './',
    lintOnSave: true,
    productionSourceMap: false,
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require("postcss-plugin-px2rem")({
                        rootValue: 37.5, // 新版本的是这个值
                        mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
                        minPixelValue: 3, //设置要替换的最小像素值(3px会被转rem)。 默认 0
                    }),
                ],
            },
        },
    },
    devServer: {
        // 调试端口
        port: 8080
    },
    chainWebpack: config => {
        config.resolve.alias
          .set("@",resolve("src"))
          .set("~@",resolve("src"))
        // html设置
        config.plugin('html').tap(args => {
            // 修改网页标题
            args[0].title = "2023年度医生诊疗数据画像";

            return args
        })
    },
    configureWebpack: {
        resolve: {
            alias: {
                assets: "@/assets",
                common: "@/components",
                components: "@/components",
                network: "@/network",
                views: "@/views",
                plugins: "@/plugins",
                http: "@/http",
            },
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "windows.jQuery": "jquery",
            }),
        ],
    },
};
