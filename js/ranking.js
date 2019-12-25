//選擇參加後送出
var attendRank = {
  action : "attend_rank",
  attendStatus : "attend",
  hash : localStorage.getItem("hash"),
  Class : "", //該學生所選擇班級
  questionNum : "",
  userName : localStorage.getItem("userName"),

  status : "success",
}
//選擇不參加後送出
var notAttendRank = {
  action : "attend_rank",
  attendStatus : "notAttend",
  hash : localStorage.getItem("hash"),
  Class : "",
  questionNum : "",
  userName : localStorage.getItem("userName"),

  status : "fail",
}
//填寫題號enter後送出
var rankAction = {
  action : "rank",
  questionNum : "", //題目編號
  userName : localStorage.getItem("userName"),
  Class : "",
  hash : localStorage.getItem("hash"),

  userData : [
    {
      name : "abb",
      ACTimes : 100,
      commitTimes : 130,
      rank : 1,
      AttendStatus : true,
      passTime : "0.0001",
    },
    {
      name : "aaa22",
      ACTimes : 1,
      commitTimes : 3,
      rank : 2,
      AttendStatus : true,
      passTime : "0.000001",
    },
    {
      name : "aaa",
      ACTimes : 0,
      commitTimes : 0,
      rank : 3,
      AttendStatus : true,
      passTime : "0.00000001",
    },
  ]
}
//一開始送出
var collectClass = {
	"action" : "selectClass",
	"userName" : localStorage.getItem("userName"),
	"hash" : localStorage.getItem("hash"),

	/*"Classes":
	[
		{"Class" : "CSIE110"},
		{"Class" : "CSIE111"},
		{"Class" : "LOL201"},
	]*/
}

//----navbar的設定----
var navapp = new Vue({
  delimiters : ['${', '}'],
  el : "#navapp",
  data : {
    whichShow : "",
    regIsShow : false,
    userid : "",
    name : "",
  },
  created(){
    this.chooseProblems()
    this.canRegister()
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
    canRegister(){
			let self = this
			self.userid = localStorage.getItem("who")
			if(self.userid === "admin"){
				self.regIsShow = true
			}
		},
    clearStorage(){
      localStorage.clear()
    },
  },
})

//----執行使用者是否加入排名,並根據輸入題號和選擇的班級列表----
var app1 = new Vue({
  delimiters : ['${', '}'],
  el : "#app1",
  data : {
    userdata : [],
    isShow : false,
    qsNumber :"",
    clock : "",
    classSet : [],   //使用者的班級列表(或全部?)
    selectedClass : "", //選擇的班級
  },
  created(){
    this.setTime()
    this.setClass()
  },
  methods:{
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
    attendButtonShow(){
      let self = this
      if(localStorage.getItem("who") == "student"){
        self.isShow = true
      }
    },
    setTime(){
      this.clock = ""
      var now = new Date()
      var year = now.getFullYear()
      var month = now.getMonth() + 1
      var day = now.getDate()
      var hh = now.getHours()
      var mm = now.getMinutes()
      this.clock = year + "-"
      if(month < 10)
        this.clock += "0"
      this.clock += month + "-"
      if(day < 10)
        this.clock += "0"       
      this.clock += day + " "       
      if(hh < 10)
        this.clock += "0"     
      this.clock += hh + ":"
      if (mm < 10) this.clock += '0' 
      this.clock += mm
    },
    createRankList(){
      if(this.selectedClass === ""){
        alert("Please choose your class.")
        return
      }
      if(this.qsNumber.indexOf(" ") >= 0||this.qsNumber === undefined||this.qsNumber ===""){
        alert("Please enter questionID.")
        return
      }
      else{
        let self = this;
        console.log(self.qsNumber)
        console.log(self.selectedClass)
        rankAction.Class = self.selectedClass
        rankAction.questionNum = this.qsNumber
        notAttendRank.questionNum = this.qsNumber
        attendRank.questionNum = this.qsNumber
        axios.post("https://httpbin.org/post",rankAction)
          .then(function(response){
            console.log(response.data)
            console.log(response.status)
            console.log(response.statusText)
            console.log(response.headers)
            console.log(response.config)
            console.log(response.data.questionNum)
            self.userdata = response.data.json.userData
            for(let i=0; i<self.userdata.length; i++){
              if(self.userdata[i].commitTimes == 0)
                self.userdata[i].passRate = 0
              else
                self.userdata[i].passRate = ((self.userdata[i].ACTimes*100)/self.userdata[i].commitTimes).toFixed(2)
            }
          })
          .catch(function(error){
            console.log(error)
          })
      }
      this.attendButtonShow();
    },
    sendAttendMSG(){
      console.log(this.selectedClass)
      attendRank.Class = this.selectedClass
      axios.post("https://httpbin.org/post",attendRank)
      .then(function(response){
        console.log(response.data)
        console.log(response.status)
        console.log(response.statusText)
        console.log(response.headers)
        console.log(response.config)
        if(response.data.json.status == "success"){
          alert("Congratulations! You successful attend!")
        }
        else{
          alert("Error!")
        }
      })
      .catch(function(error){
        console.log(error)
      })
      this.isShow = false
      this.setTime()
    },
    sendNotAttendMSG(){
      console.log(this.selectedClass)
      notAttendRank.Class = this.selectedClass
      axios.post("https://httpbin.org/post",notAttendRank)
      .then(function(response){
        console.log(response.data)
        console.log(response.status)
        console.log(response.statusText)
        console.log(response.headers)
        console.log(response.config)
        if(response.data.json.status == "fail"){
          alert("OK! Maybe next time!")
        }
        else{
          alert("Error!")
        }
      })
      .catch(function(error){
        console.log(error)
      })
      this.isShow = false
      this.setTime()
    }
  }
})