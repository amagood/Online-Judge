messages= {
    "action" : "show_message",
    "hash" : "A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9" //SHA3_512
}

//留言者名稱
Vue.component('v-input', {
	template : "#v-input",
	props : {
		value : {
			type : String,
			default : ''
		}
	},
	methods : {
		fouceEvent : function(){
			this.$refs['input-ref'].focus()
		}
	}
});

//留言內容輸入
Vue.component('v-textarea', {
	template : '#v-textarea',
	props : {
		value : {
			type : String,
			default : ''
		}
	}
});

//留言結果顯示
Vue.component("v-list", {
	template : '#v-list',
	props : {
		list : {
			type : Array,
			default : []
		}
	},
	data : function(){
		return {
			itemlist : this.list
		}
	},
	methods : {
		handleReply : function(index){
			this.$emit("reply", index)
		},
		handleDelete : function(index){
			this.$emit("delete", index)
		}
	}
});

//留言區域父組件
var app1 = new Vue({
	el : "#app1",
	data : function(){
		return {
			username : '',
			message : '',
			list : []
		}
	},
	methods : {
		handleSend : function(){
			if (this.username === ''){
				alert("Please enter your name")
				return
			}
			if(this.message === ''){
				alert("Please enter comments")
				return
			}
			this.list.push({
				name : this.username,
				message : this.message
			})
			this.message = ''
			this.username = ''
		},
		handleReply : function(index){
			var name = this.list[index].name
			this.message = "reply@" + name + ": "
			this.$refs['input-com'].fouceEvent()
		},
		handleDelete : function(index){
			this.list.splice(index, 1)
		}
	}
});