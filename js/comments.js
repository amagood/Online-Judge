//選擇班級後送出
var showMessageAction = {
	"action" : "show_message",
	"hash" : localStorage.getItem("hash"),
	"Class" : "",
	
	"message" :[ 
		{"userName" :　"cornerman", "date" : "20191015", "time" : "1159", "content" : "haha"},
		{"userName" :　"87man", "date" : "20191016", "time" : "1900", "content" : "oh,haha"},
		{"userName" :　"charlieyang", "date" : "20191126", "time" : "1915", "content" : "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"}
	],
}
//按下next後送出
var handleSend = {
	"action" : "send_message",
	"userName" : "",
	"date" : "",
	"time" : "",
	"content" : "",
	"hash" : localStorage.getItem("hash"),
}
//一開始送出
var collectClass = {
	"action" : "selectClass",
	"userName" : localStorage.getItem("userName"),
	"hash" : localStorage.getItem("hash"),

	"Classes":
	[
		{"Class" : "CSIE110"},
		{"Class" : "CSIE111"},
		{"Class" : "LOL201"},
	]
}

//----navbar設定----
var navapp = new Vue({
	delimiters : ['${', '}'],
	el : "#navapp",
	data:{
		whichShow : "",
		userid : "",
		name : "",
	},
	created(){
		this.chooseProblems()
	},
	methods:{
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
			localStorage.clear()
		}
	},
})

//----留言內容輸入----
Vue.component('v-textarea', {
	delimiters : ['${', '}'],
	template: '#v-textarea',
	props : {
		who : {
			type : String,
			default : ""
		},
		value : {
			type : String,
			default : ""
		},
		username : {
			type : String,
			default : localStorage.getItem("userName")
		}
	},
});

//----留言結果顯示----
Vue.component("v-list", {
	delimiters : ['${', '}'],
	template : '#v-list',
	props : {
		list : {
			type : Array,
			default : []
		},
		authority: {
			type : Boolean
		},
		clock : {
			type : String,
			default : ""
		},
	},
	data : function(){
		return {
			itemlist : this.list
		}
	},
	methods : {
		handleReply(index){
			this.$emit("reply", index)
		},
		handleDelete(index){
			this.$emit("delete", index)
		}
	}
});

//----留言區域父組件---
var app1 = new Vue({
	delimiters : ['${', '}'],
	el : "#app1",
	data : {
		message : "",
		list : [],
		msgList : [],
		clock :"",
		username : localStorage.getItem("userName"),
		who : localStorage.getItem("who"),
		authority : false,
		classSet : [],
		selectedClass : "",
		nowFalse : false,
	},
	created(){
		this.checkID()
		this.setClass()
	},
	mounted(){
		this.showMessages()
	},
	methods : {
		checkID(){
			let self = this
			if(self.who === "admin"){
				self.authority = true
			}
		},
		setClass(){//取得使用者參加之班級
			let self = this
			axios.post("https://httpbin.org/post",collectClass)
				.then(function(response){
					console.log(response.data)
					console.log(response.status)
					console.log(response.statusText)
					console.log(response.headers)
					console.log(response.config)
					self.classSet = response.data.json.Classes
				})
				.catch(function(error){
					console.log(error)
				})
		},
		showMessages(){//點擊班級列表時秀出所點擊班級之留言
			let self = this
			axios.post("https://httpbin.org/post",showMessageAction)
				.then(function(response){
					console.log(response.data)
					console.log(response.status)
					console.log(response.statusText)
					console.log(response.headers)
					console.log(response.config)
					console.log(self.selectedClass)
					self.msgList = response.data.json.message
					for(let i=0; i<self.msgList.length; i++){
						let date = self.msgList[i].date
						let time = self.msgList[i].time
						self.msgList[i].showtime = date.substring(0,4) + "/" + date.substring(4,6) + "/" + date.substring(6,8) + " " + time.substring(0,2) + ":" + time.substring(2,4)
						self.list.push({
							name : self.msgList[i].userName,
							message : self.msgList[i].content,
							time : self.msgList[i].showtime,
						})
					}
				})
				.catch(function(error){
					console.log(error)
				})
		},
		createMessage(){//從這邊呼叫設定時間,送訊息
			this.setTime()
			//this.handleSend()
		},
		setTime(){//設定觸發時的時間
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
				console.log(this.clock)
    },
		/*handleSend(){
			if(this.message === ""){
				alert("Please enter comments")
				return
			}
			this.list.push({
				who : this.who,
				name : this.username,
				message : this.message
			})
			this.message = ""
		},*/
		handleReply : function(index){
			var name = this.list[index].name;
			this.message = "reply@" + name + ": ";
		},
		handleDelete : function(index){
			this.list.splice(index, 1)
		}
	}
});