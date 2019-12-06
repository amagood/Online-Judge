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

//----navbar設定----
var navapp = new Vue({
	delimiters: ['${', '}'],
	el: "#navapp",
	data:{
		whichShow:"",
		userid: "",
		name: "",
	},
	created() {
		this.chooseProblems()
	},
	methods: {
		chooseProblems(){
			let self = this
			self.name = localStorage.getItem("userName")
			self.userid = localStorage.getItem("who")
			if(self.userid === "admin"||self.userid === "teacher"){
				self.whichShow = "teacher"
			}
			else if(self.userid === "student"){
				self.whichShow = "student"
			}
		},
		clearStorage(){
			localStorage.clear();
		}
	},
})

//----留言內容輸入----
Vue.component('v-textarea', {
	delimiters: ['${', '}'],
	template: '#v-textarea',
	props: {
		who: {
			type: String,
			default: ""
		},
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

//----留言結果顯示----
Vue.component("v-list", {
	delimiters: ['${', '}'],
	template: '#v-list',
	props: {
		list: {
			type: Array,
			default: []
		},
		authority: {
			type: Boolean
		},
		clock: {
			type: String,
			default: ""
		},
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

//----留言區域父組件---
var app1 = new Vue({
	delimiters: ['${', '}'],
	el: "#app1",
	data: {
		message: "",
		list: [],
		msgList: [],
		clock:"",
		username: localStorage.getItem("userName"),
		who: localStorage.getItem("who"),
		authority: false,
	},
	created: function(){
		this.checkID()
		//this.showMessages()
	},
	methods: {
		checkID(){
			let self = this
			if(self.who === "admin"){
				self.authority = true
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
		createMessage(){
			this.setTime()
			this.handleSend()
		},
		setTime(){
      this.clock = ""
      var now = new Date()
        var year = now.getFullYear()
        var month = now.getMonth() + 1
        var day = now.getDate()
        var hh = now.getHours()
        var mm = now.getMinutes()
        this.clock = year + "/"
        if(month < 10)
          this.clock += "0"
        this.clock += month + "/"
        if(day < 10)
          this.clock += "0"       
        this.clock += day + " "       
        if(hh < 10)
          this.clock += "0"     
        this.clock += hh + ":"
        if (mm < 10) this.clock += '0' 
        this.clock += mm
    },
		handleSend(){
			if(this.message === ""){
				alert("Please enter comments")
				return
			}
			this.list.push({
				who: this.who,
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