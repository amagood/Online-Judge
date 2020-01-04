var postURL = ""

//選擇班級後送出
var showMessageAction = {
	"action" : "show_message",
	"userName" : localStorage.getItem("userName"),
	"hash" : localStorage.getItem("hash"),
	"Class" : "", 
	
	// "message" :[ 
	// 	{"userName" :　"cornerman", "date" : "20191015", "time" : "1159", "content" : "haha"},
	// 	{"userName" :　"87man", "date" : "20191016", "time" : "1900", "content" : "oh,haha"},
	// 	{"userName" :　"wwwwwwwwwwwwwwwwwwww", "date" : "20191126", "time" : "1915", "content" : "AAAAAA\nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"}
	// ],
}
//按下next後送出
var sendMsg = {
	"action" : "send_message",
	"userName" : "",
	"date" : "",
	"Class" : "",
	"time" : "",
	"content" : "",
	"hash" : localStorage.getItem("hash"),
}
//一開始送出
var collectClass = {
	"action" : "selectClass",
	"userName" : localStorage.getItem("userName"),
	"hash" : localStorage.getItem("hash"),

	// "Classes":
	// [
	// 	{"Class" : "CSIE110"},
	// 	{"Class" : "CSIE111"},
	// 	{"Class" : "LOL201"},
	// ]
}

//----navbar設定----
var navapp = new Vue({
	delimiters : ['${', '}'],
	el : "#navapp",
	data : {
		userid : "",
		name : "",
		isShow : false, //題目庫顯示
		whichShow : "",
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
				self.isShow = true
				self.whichShow = "teacher"
			}
			else if(self.userid === "student"){
				self.isShow = true
				self.whichShow = "student"
			}
		},
		clearStorage(){
			localStorage.clear();
		},
	},
})

//----個別留言結果顯示----
Vue.component("v-list", {
	delimiters : ['${', '}'],
	template : '#v-list',
	props : {
		list : {
			type : Array,
			default : []
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
	}
});

//----選班級,輸入和顯示留言---
var app1 = new Vue({
	delimiters : ['${', '}'],
	el : "#app1",
	data : {
		inputmsg : "", //使用者輸入訊息
		list : [],      //準備顯示的資訊列表
		msgList : [],    //接收其他人的訊息列表
		msgCheck : {},  //確認最後一筆訊息是否相同
		msgSend : "",    //接收使用者傳的訊息
		dateSend : "",   //送出的日期
		timeSend : "",   //送出的時間
		username : localStorage.getItem("userName"),
		who : localStorage.getItem("who"),
		classSet : [],   //使用者的班級列表(或全部?)
		selectedClass : "", //選擇的班級
		timerCall : "",  //定時呼叫request
		callFromBack : false, //是否為定時呼叫
		noShow : false, //暫時不要顯示
	},
	created(){
		this.setClass()
	},
	mounted(){
		this.timerCall = setInterval(this.reqCall,5000)
	},
	beforeDestroy() {
		clearInterval(this.timerCall);
	},
	methods : {
		reqCall(){   //5秒定時呼叫
			let self = this
			this.setClass()
			if(self.selectedClass !== ""){
				callFromBack = true
				this.showMessages()
			}
		},
		setClass(){   //取得使用者參加之班級
			let self = this
			axios.post(postURL,collectClass)  //"https://httpbin.org/post"
				.then(function(response){
					console.log(response.data)
					console.log(response.status)
					console.log(response.statusText)
					console.log(response.headers)
					console.log(response.config)
					self.classSet = response.data.Classes  //data.json
				})
				.catch(function(error){
					console.log(error)
				})
		},
		showMessages(){   //點擊班級列表時秀出所點擊班級之留言
			let self = this
			console.log(self.selectedClass)
			showMessageAction.Class = self.selectedClass
			axios.post(postURL,showMessageAction) //"https://httpbin.org/post"
				.then(function(response){
					console.log(response.data)
					console.log(response.status)
					console.log(response.statusText)
					console.log(response.headers)
					console.log(response.config)
					self.msgCheck = self.msgList[self.msgList.length-1]
					self.msgList = response.data.message  //data.json
					if(self.callFromBack === true && self.msgCheck.date === self.msgList[self.msgList.length-1].date && self.msgCheck.time === self.msgList[self.msgList.length-1].time){
						self.callFromBack = false
						return
					}
					else{
						self.list.splice(0,self.list.length)
					}
					for(let i=self.msgList.length-1; i>=0; i--){
						let date = self.msgList[i].date
						let time = self.msgList[i].time
						self.msgList[i].floor = i+1
						if(self.msgList[i].floor%10 === 1){
							self.msgList[i].floor += "st" 
						}
						else if(self.msgList[i].floor%10 === 2){
							self.msgList[i].floor += "nd" 
						}
						else if(self.msgList[i].floor%10 === 3){
							self.msgList[i].floor += "rd" 
						}
						else{
							self.msgList[i].floor += "th" 
						}
						self.msgList[i].showtime = date.substring(0,4) + "/" + date.substring(4,6) + "/" + date.substring(6,8) + " " + time.substring(0,2) + ":" + time.substring(2,4)
						self.list.push({
							name : self.msgList[i].userName,
							message : self.msgList[i].content,
							time : self.msgList[i].showtime,
							floor : self.msgList[i].floor,
						})
					}
				})
				.catch(function(error){
					console.log(error)
				})
		},
		setTime(){   //設定觸發時的時間
			let self = this
			self.dateSend = ""
			self.timeSend = ""
      var now = new Date()
			var year = now.getFullYear()
			var month = now.getMonth() + 1
			var day = now.getDate()
			var hh = now.getHours()
			var mm = now.getMinutes()
			self.dateSend = String(year)
			if(month < 10){
				self.dateSend += "0"
			}
			self.dateSend += String(month)
			if(day < 10){
				self.dateSend += "0"
			}      
			self.dateSend += String(day)   
					
			if(hh < 10){
				self.timeSend += "0"
			}
			self.timeSend += String(hh)
			if (mm < 10){
				self.timeSend += '0'
			}
			self.timeSend += String(mm)
    },
		handleSend(){
			let self = this
			self.msgSend = ""
			self.setTime()
			sendMsg.userName = localStorage.getItem("userName")
			sendMsg.date = this.dateSend
			sendMsg.time = this.timeSend
			sendMsg.content = this.inputmsg.trim()
			console.log(sendMsg.content)
			if(this.selectedClass === ""){
				alert("Please choose class.")
				return
			}
			if(sendMsg.content === undefined||sendMsg.content === ""){
				alert("Please enter comments.")
				return
			}
			else{
				console.log(self.selectedClass)
				sendMsg.Class = self.selectedClass
				axios.post(postURL,sendMsg) //"https://httpbin.org/post"
				.then(function(response){
					console.log(response.data)
					console.log(response.status)
					console.log(response.statusText)
					console.log(response.headers)
					console.log(response.config)
					self.msgSend = response.data //data.json
					let date = self.msgSend.date
					let time = self.msgSend.time
					self.msgSend.showtime = date.substring(0,4) + "/" + date.substring(4,6) + "/" + date.substring(6,8) + " " + time.substring(0,2) + ":" + time.substring(2,4)
					if(typeof(self.msgList) === "undefined"){
						self.msgList = []
					}
					self.msgList.push({
						userName : self.msgSend.userName,
						content : self.msgSend.content,
						showtime : self.msgSend.showtime,
					})
					self.list.splice(0,self.list.length)
					for(let i=self.msgList.length-1; i>=0; i--){
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
			}
			this.inputmsg = ""
		},
		handleReply : function(index){
			var floor = this.list[index].floor;
			this.inputmsg = "reply@ Floor " + floor + ": ";
		},
	}
});