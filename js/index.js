/*
	2019/12/29
	version1.3 
		1.修改home圖片
		2.login後不再顯示login
*/
var app1 = new Vue({
	delimiters : ['${', '}'],
	el : "#app1",
	data : {
		userid : "",
		name : "",
		isShow : false, //題目庫顯示
		regIsShow : false, //註冊頁顯示
		logIsShow : true, //登入頁顯示
		whichShow : "",
	},
	created() {
		// this.test()
		this.chooseProblems()
		this.canRegister()
		this.canLogin()
	},
	methods: {
		test(){//測試
			localStorage.setItem("who","student")
			localStorage.setItem("userName","imtestman")
			let who = localStorage.getItem("who")
			console.log(who)
		},
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
		canRegister(){
			let self = this
			self.userid = localStorage.getItem("who")
			if(self.userid === "admin"){
				self.regIsShow = true
			}
		},
		canLogin(){
			let self = this
			self.userid = localStorage.getItem("userName")
			if(self.userid){
				self.logIsShow = false
			}
		},
		clearStorage(){
			localStorage.clear();
		},
	},
})