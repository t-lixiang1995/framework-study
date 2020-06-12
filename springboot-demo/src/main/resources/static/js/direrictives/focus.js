// 自定义指令 focus所用
// 自动获取焦点
var Focus = function (el, binding, vm) {
	el.focus()
}

Vue.directive('focus', {
	inserted: Focus,			
})
