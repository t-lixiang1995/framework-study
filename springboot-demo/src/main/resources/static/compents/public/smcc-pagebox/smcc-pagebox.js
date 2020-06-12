console.warn(1);
var smccPagebox = {
	template: reutrnRes(comp_src + "/compents/public/smcc-pagebox/smcc-pagebox.html"),
	data: function() {
		return {
			page_now: 1,
			page_sum: 0,
			page_btn_num: 1,
			page_start_btn: 0,
			act_bol: [true, false, false, false, false]
		};
	},
	props: ['page_num', 'page_len', 'page_btn_max'],
	watch: {
		page_len: function(nVal) {
			this.page_sum = Math.ceil(nVal / this.page_num)
			if(this.page_btn_max) {
				if(this.page_btn_max > this.page_btn_num) this.page_btn_num = this.page_sum
				if(this.page_btn_max < this.page_btn_num) this.page_btn_num = this.page_btn_max
			} else {
				this.page_btn_num = this.page_sum
			}
		},
	},
	computed: {
		pagearr: function() {
			var page_arr = [];
			for(var i = this.page_start_btn; i < this.page_btn_num; i++) {
				page_arr.push(i + 1)
			}
			return page_arr
		},
		ban_bol_start: function() {
			if(this.page_sum) {
				if(this.page_now * 1 === 1) return true
				return false
			}
		},
		ban_bol_end: function() {
			if(this.page_sum) {
				if(this.page_now >= this.page_sum) return true
				return false
			}
		}
	},
	methods: {
		FnPage: function(page) {
			switch(page) {
				case '+':
					this.page_now -= 1
					if(this.page_now <= 1) this.page_now = 1
					if(this.page_sum >= this.page_btn_max) {
						this.page_start_btn -= 1;
						this.page_btn_num -= 1
						if(this.page_start_btn <= 0) this.page_start_btn = 0
						if(this.page_btn_num <= this.page_btn_max) this.page_btn_num = this.page_btn_max
					}
					break;
				case '-':
					this.page_now += 1
					if(this.page_now >= this.page_sum) this.page_now = this.page_sum
					if(this.page_sum >= this.page_btn_max) {
						this.page_start_btn += 1;
						this.page_btn_num += 1;
						if(this.page_btn_num >= this.page_sum) this.page_btn_num = this.page_sum
						if(this.page_start_btn >= this.page_sum - this.page_btn_max) this.page_start_btn = this.page_sum - this.page_btn_max
					}

					break;
				case 'enter':
					if(this.page_now <= 1) this.page_now = 1
					if(this.page_sum >= this.page_btn_max) {
						this.page_start_btn = this.page_now - 1
						this.page_btn_num = this.page_now - 1 + this.page_btn_max
						if(this.page_start_btn <= 0) this.page_start_btn = 0
						if(this.page_start_btn >= this.page_sum - this.page_btn_max) this.page_start_btn = this.page_sum - this.page_btn_max
						if(this.page_btn_num <= this.page_btn_max) this.page_btn_num = this.page_btn_max
						if(this.page_btn_num >= this.page_sum) this.page_btn_num = this.page_sum
					}
					if(this.page_now >= this.page_sum) this.page_now = this.page_sum
					break;
				default:
					this.page_now = page
			}
			this.act_bol = [false, false, false, false, false]
			this.act_bol[this.page_now - 1] = true
			this.$emit('page', this.page_now);
		}
	},
	created: function() {},
	mounted: function() {

	}
}