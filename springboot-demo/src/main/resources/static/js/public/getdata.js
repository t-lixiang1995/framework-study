var src_ele = document.querySelector('#src-qianhou');
var comp_src = "";
if(src_ele.dataset) {
	comp_src = src_ele.dataset.src
} else {
	comp_src = $('#src-qianhou').data('src')
}

/*
	为ajax请求后端数据，待完善，并没有考虑跨域等各种情况；
	所用变量：
	origin ： 为当前后端请求域 例 'http://secp.smcc.sinopec.com:8083/'
	内部方法传入参数：
	url ： 为引入后端请求接口路径
	type ： 为接受变量名
	formData ： 为上传文件的参数
	外部脚本建议所用参数： 请看不同请求注释用法
*/

//var origin = 'http://sebl.smcc.sinopec.com:8090';
//var origin = 'http://192.168.0.100:8083/';

//var origin = "http://localhost:8083/";

// ajax 请求


/*
	SmccGetData: null, // 可选（但推荐用于区分数据） 指明 所发送的请求
	SmccGetWork: null, // 可选（但推荐用于区分数据）get请求的工作状态
	SmccPostWork: null, // 可选 （但推荐用于区分数据）post请求的工作状态		
	getData: null, // 必选 接受Get返回数据，用于处理返回数据
	postData: null, // 必选 接受Post返回数据，用于处理返回数据
	FnSetParam： 为当前组件或所属坏境设置向后端发送请求参数
*/

// get 请求
function FnGetData(url, type) {
	var param = {};
	var that = this;
	this.FnSetParam(param);
	that.$nextTick(function() {
		$.get(origin + url, param, function(data) {
			if(type) that[type] = data
		})
	})
}

// post 请求
function FnPostData(url, type) {
	var param = {};
	var that = this;
	this.FnSetParam(param)
	$.ajax({
		url: origin + url,
		type: "POST",
		datType: "JSON",
		contentType: "application/json;charset=utf-8",
		data: JSON.stringify(param),
		success: function(data) {
			that.$nextTick(function() {
				if(type) that[type] = data
			})
		}
	})
}

// 上传 文件

/*
 formData: new FormData(), 必选 声明 请求添加文件函数
 postFileData: null, 必选 请求返回文件数据
 postFileId: null, 可选 请求返回文件ID
 postFile: null, 可选 请求返回文件的dom 用于清空文件
*/

function FnPostFile(url, formData, type) {
	var that = this;
	$.ajax({
		url: origin + url,
		type: 'POST',
		cache: false,
		data: formData,
		processData: false,
		contentType: false
	}).then(function(data) {
		that.$nextTick(function() {
			if(type) that[type] = data
		})
	})
}