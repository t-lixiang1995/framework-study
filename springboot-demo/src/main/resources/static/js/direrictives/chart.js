// 自定义指令 chart所用
// chart图插入函数
var ChartCanvas = function (el, binding, vm) {
	if(binding.value) {
		var myChart = echarts.init(el);
		if(el.dataset.chart === 'open') {
			setTimeout(function() {
				myChart.setOption(binding.value.option);
			}, 400)
			myChart.on('click', function(params) {
				if(binding.value.href) ChartSwitch(params, vm.context,binding.value.Data,binding.value.href)				
			});
		}

	}
}

Vue.directive('charts', {
	inserted: ChartCanvas,
	update: ChartCanvas
})
// 设置临时本地数据
function ChartSwitch(params, vm, token,href) {
	var data = {
		name:params.name,
		ind:params.dataIndex
	}
	$.extend(true, data, token);
	$.cookie('drillValue', JSON.stringify(data), { expires: 30, path: '/' })
	location.href=origin+href
}