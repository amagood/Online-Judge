var app1 = new Vue({
	delimiters: ['${', '}'],
	el: "#app1",
	data: {
		userid: "",
		name: "",
		isShow: false,
		whichShow: "",
	},
	created() {
		this.test()
		this.chooseProblems()
	},
	methods: {
		test(){//測試
			localStorage.setItem("who","admin")
			localStorage.setItem("userName","i")
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
		clearStorage(){
			localStorage.clear();
		},
	},
})