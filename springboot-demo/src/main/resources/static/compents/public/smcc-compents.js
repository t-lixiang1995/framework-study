var smccTagsInput = {
	template: "<div class='smcc-tags-input'><div class='smcc-tags' v-for='(item,ind) in emitData.tags ' \
	:key='ind'><span class='text'>{{item.name}}</span><i class='smcc-close-icon' @click='handleClose(item)'></i></div>\
	<input v-show='inp*1' v-model='inpText' @keyup.13='FnAddTags(inpText)' class='flex1' type='text' /></div>",
	data: function() {
		return {
			inpText: "",
			emitData: {
				tags: [],
				tagKey:'',
			}
		}
	},
	props:['tagKey','disabled','inp'],
	watch: {
		emitData: {
			handler: function(newValue, oldValue) {				
				this.$emit("tagdata",newValue)				
			},
			deep: true
		}

	},
	methods: {
		FnAddTags: function(text) {
			this.emitData.tags.push({
				name: text,
				type: ''
			})
			this.inpText = ""
		},
		handleClose:function(tag) {
			this.emitData.tags.splice(this.emitData.tags.indexOf(tag), 1);
		},
	},
	created: function() {
		this.emitData.tagKey=this.tagKey
	}
}