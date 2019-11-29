function clearStorage(){
	localStorage.clear();
}

var app1 = new Vue({
	delimiters: ['${', '}'],
	el: "#app1",
	data: {
		userid: "",
		name: localStorage.getItem("userName"),
		isShow: false,
		whichShow: "",
	},
	created() {
		this.checkId()
		this.test()
	},
	methods: {
		test(){//測試
			localStorage.setItem("who","student")
			localStorage.setItem("userName","charlie")
			let who = localStorage.getItem("who")
			console.log(who)
		},
		checkId(){
			let self = this
			self.userid = localStorage.getItem("who")
			if(self.userid === "admin"||self.userid === "teacher"){
				self.isShow = true
				self.whichShow = "teacher"
			}
			else if(self.userid === "student"){
				self.isShow = true
				self.whichShow = "student"
			}
		}
	},
})