/*
	2019/12/16
	version1.2 只有管理員(admin)顯示註冊按鈕
*/
var app1 = new Vue({
	delimiters : ['${', '}'],
	el : "#app1",
	data : {
		userid : "",
		name : "",
		isShow : false, //題目庫顯示
		regIsShow : false, //註冊頁顯示
		whichShow : "",
	},
	created() {
		this.test()
		this.chooseProblems()
		this.canRegister()
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
		clearStorage(){
			localStorage.clear();
		},
	},
})