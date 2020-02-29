module.exports = {
	publicPath: './',
	productionSourceMap: true,
	devServer: {
		open: true,
	},
	css: {
		loaderOptions: {
			sass: {
				data: `
                        @import "@/styles/index.scss";
                     `
			}
		}
	}
}
