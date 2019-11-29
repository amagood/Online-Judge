var showAction = {
	"action" : "show_message",
	"hash" : localStorage.getItem("hash"),
	
	"message" :[ 
		{"userName" :　"Ian", "date" : "20191015", "time" : "1159", "content" : "aaa"},
		{"userName" :　"charlie", "date" : "20191016", "time" : "1900", "content" : "aeaa"},
		{"userName" :　"Iann", "date" : "20191126", "time" : "1915", "content" : "aaeqwa"}
	],
}
var handleSend = {
	"action" : "send_message",
	"userName" : "",
	"date" : "",
	"time" : "",
	"content" : "",
	"hash" : localStorage.getItem("hash"),
}

//留言內容輸入
Vue.component('v-textarea', {
	delimiters: ['${', '}'],
	template: '#v-textarea',
	props: {
		value: {
			type: String,
			default: ""
		},
		username: {
			type: String,
			default: localStorage.getItem("userName")
		}
	},
});

//留言結果顯示
Vue.component("v-list", {
	delimiters: ['${', '}'],
	template: '#v-list',
	props: {
		list: {
			type: Array,
			default: []
		},
		userid: {
			type: Boolean
		}
	},
	data: function(){
		return {
			itemlist: this.list
		}
	},
	methods: {
		handleReply: function(index){
			this.$emit("reply", index)
		},
		handleDelete: function(index){
			this.$emit("delete", index)
		}
	}
});

//留言區域父組件
var app1 = new Vue({
	delimiters: ['${', '}'],
	el: "#app1",
	data: {
		message: "",
		list: [],
		msgList: [],
		username: localStorage.getItem("userName"),
		id: false,
	},
	created: function(){
		this.checkId()
		this.test()
    //this.showMessages()
	},
	methods: {
		test(){//測試
			localStorage.setItem("userName","Ian")
			localStorage.setItem("who","admin")
		},
		checkId(){
			let self = this
			let who = localStorage.getItem("who")
			if(who == "admin"){
				self.id = true
			}
		},
		/*showMessages(){
			let self = this
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
		},*/
		handleSend(){
			if(this.message === ""){
				alert("Please enter comments")
				return
			}
			this.list.push({
				name: this.username,
				message: this.message
			})
			this.message = ""
		},
		handleReply : function(index){
			var name = this.list[index].name;
			this.message = "reply@" + name + ": ";
		},
		handleDelete: function(index){
			this.list.splice(index, 1)
		}
	}
});