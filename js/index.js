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
	},
	methods: {
		checkId(){
			let self = this
			localStorage.setItem("who","student")//測試
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