require.config({
	// baseUrl:
	
	// 配置短路径（别名）
	paths:{
		jquery:'../lib/jquery-3.1.1',
		cookie:'../lib/jquery.cookie',
		xcarousel:'../lib/jquery-xCarousel/jquery.xcarousel',
		xzoom:'../lib/xzoom/xzoom',
		common:'common',
		header:'header',
		xheader:'xheader'
	},

	// 配置依赖
	shim:{
		xcarousel:['jquery'],
		cookie:['jquery'],
		header:['jquery','common'],
		xheader:['jquery','common']
	}
});