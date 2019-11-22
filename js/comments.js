var showAction= {
    "action" : "show_message",
    "hash" : ""
}
var handleSend= {
	"action" : "send_message",
	"userName" : "",
	"date" : "",
	"time" : "",
	"content" : "",
	"hash" : ""
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
	el: "#app1",
	data: {
		function(){
			return {
				username: '',
				message: '',
				list: []
			}
		},
		msgList: [],
	},
	created: function() {
    this.showMessages()
  },
	methods: {
		showMessages(){
			let self = this;
			axios.post("https://httpbin.org/post",showAction)
				.then(function(response){
					console.log(response.data)
					console.log(response.status)
					console.log(response.statusText)
					console.log(response.headers)
					console.log(response.config)
					self.msgList = response.data.json.message
					for(let i=0; i<self.message.length; i++){
						
					}
				})
				.catch(function(error){
					console.log(error);
				})
		},
		handleSend(){
			if (this.username === ''){
				alert("Please enter your name")
				return
			}
			if(this.message === ''){
				alert("Please enter comments")
				return
			}
			this.list.push({
				name: this.username,
				message: this.message
			})
			this.message = ''
			this.username = ''
		},
		handleReply: function(index){
			var name = this.list[index].name
			this.message = "reply@" + name + ": "
			this.$refs['input-com'].fouceEvent()
		},
		handleDelete: function(index){
			this.list.splice(index, 1)
		}
	}
});