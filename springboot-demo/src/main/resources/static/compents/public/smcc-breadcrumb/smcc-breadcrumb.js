var smccBreadcrumb = {
	template: reutrnRes(comp_src + "/compents/public/smcc-breadcrumb/smcc-breadcrumb.html"),
	data: function() {
		return {
			
		};
	},
	props:['breadcrumb'],
	methods: {
		FnReTurn:function(){
			// window.history.go(-1)
            location.href='javascript:history.back(-1)';
		},
	}
}