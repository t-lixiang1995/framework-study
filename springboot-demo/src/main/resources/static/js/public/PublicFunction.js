/*此文件为服务于vue.js的脚步js，根据需求，可以自行修改；*/

/*
  为不在环境下紧急调取模板用法 ，用于加载异步组件；常规用法还应该在环境下使用
  参数：url 为所引模板路径
*/
function reutrnRes(url) {
	var same = null;
	jQuery.ajax({
		type: "get",
		url: url,
		cache: false,
		async: false,
		success: function(res) {
			same = res
		}
	});
	return same
}
/*结束*/
/*
  基于首页搜索一个的关于全选全不选公用方法
  为不在环境下紧急调取模板用法 ，用于加载异步组件；常规用法还应该在环境下使用
  参数：ind 为当前状态数组的下标，msg:数据源或数据固定长度，key:当前判断数据的键值，token:附加的判断条件
*/

function handleCheckAllChange(ind, msg, key, token) {
	if(this.allTokenArr[ind]) {
		if(token) {
			msg.forEach(function(item, ind) {
				if(token === item.orgKey || item.orgKey === "public") {
					this.emitdata[key].push(item.orgCode);
				}
			}.bind(this))
		} else {
			msg.forEach(function(item, ind) {
				this.emitdata[key].push(item.orgCode);
			}.bind(this))
		}
	} else {
		this.emitdata[key] = [];
		this.$set(this.isIndeterArr, ind, false)
	}
}

function handleCheckedCitiesChange(ind, msg, key) {
	var msgLen = 0;
	if(typeof msg === "number") msgLen = msg;
	if(typeof msg !== "number") msgLen = msg.length;
	var arrLen = this.emitdata[key].length
	this.$set(this.isIndeterArr, ind, arrLen !== 0 && arrLen < msgLen)
	if(arrLen === msgLen) this.$set(this.allTokenArr, ind, true)
	if(arrLen > 0 && arrLen < 9) this.$set(this.allTokenArr, ind, true)
	if(arrLen === 0) this.$set(this.allTokenArr, ind, false)
}
/*结束*/

/*数组排重（可考虑所有情况）待完善*/

//对象id排重;
//参数 newArr, token 外部变量 filterArr filterObjArr;
function FnObjUniq(newArr, token , key , subKey) {
	newArr.forEach(function(item) {
		if(item) {
			ind = $.inArray(item[subKey], this.filterArr)
			if(ind === -1 && token) {
				this.filterArr.push(item[subKey]);
				this.filterObjArr.push(item)
			}
			if(ind !== -1 && !token) {
				this.filterArr.splice(ind, 1);
				this.filterObjArr.splice(ind, 1);
			}
		}
	}, this)
	this[key] = [].concat(this.filterObjArr)
}

//清除所有cookie
function clearAllCookie() {
	var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
	if(keys) {
		for(var i = keys.length; i--;)
			document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
	}
}

// vue 全局点击事件

Vue.prototype.globalClick = function(callback) {		
		document.body.onclick = function() {
			callback();
		};
	};
