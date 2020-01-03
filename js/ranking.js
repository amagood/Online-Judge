//選擇參加後送出
var attendRank = {
  action : "attend_rank",
  attendStatus : "attend",
  hash : localStorage.getItem("hash"),
  Class : "", //該學生所選擇班級
  questionNum : "",
  userName : localStorage.getItem("userName"),

  // status : "success",
}
//選擇不參加後送出
var notAttendRank = {
  action : "attend_rank",
  attendStatus : "notAttend",
  hash : localStorage.getItem("hash"),
  Class : "",
  questionNum : "",
  userName : localStorage.getItem("userName"),

  // status : "fail",
}
//填寫題號enter後送出
var rankAction = {
  action : "rank",
  questionNum : "", //題目編號
  userName : localStorage.getItem("userName"),
  Class : "",
  hash : localStorage.getItem("hash"),

  // userData : [
  //   {
  //     name : "wwwwwwwwwwwwwwwwwwww",
  //     ACTimes : 100,
  //     commitTimes : 130,
  //     rank : 1,
  //     AttendStatus : true,
  //     passTime : "0.0001",
  //     language : "C++"
  //   },
  //   {
  //     name : "aaa22",
  //     ACTimes : 1,
  //     commitTimes : 3,
  //     rank : 2,
  //     AttendStatus : true,
  //     passTime : "0.000001",
  //     language : "C++"
  //   },
  //   {
  //     name : "aaa",
  //     ACTimes : 0,
  //     commitTimes : 0,
  //     rank : 3,
  //     AttendStatus : true,
  //     passTime : "0.00000001",
  //     language : "C++"
  //   },
  // ]
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

//----navbar的設定----
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

//----執行使用者是否加入排名,並根據輸入題號和選擇的班級列表----
var app1 = new Vue({
  delimiters : ['${', '}'],
  el : "#app1",
  data : {
    userdata : [],
    isShow : false,
    qsNumber :"",    //原本輸入的編號
    enterQSNum : "", //上次enter的編號
    isSearch : false, //是否搜尋過
    clock : "",
    classSet : [],   //使用者的班級列表(或全部?)
    selectedClass : "", //選擇的班級
    timerCall : "", //定時呼叫req
    callFromBack : false,  //是否定時呼叫
    enterPressed : false,  //是否已按過enter
  },
  created(){
    this.setTime()
    this.setClass()
  },
  mounted(){
		this.timerCall = setInterval(this.reqCall,5000)
	},
	beforeDestroy() {
		clearInterval(this.timerCall);
	},
  methods:{
    reqCall(){   //5秒定時呼叫
      this.setClass()
      this.setTime()
      if(self.selectedClass !== ""){
				this.callFromBack = true
				this.createRankList()
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
					self.classSet = response.data.json.Classes  //data.json
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
      if(this.callFromBack === false && this.qsNumber.trim() !== ""){   //若按下enter輸入,留下前一次輸入編號做重新req
        this.isSearch = true
        this.enterQSNum = this.qsNumber.trim()
      }
      if(this.selectedClass === "" && this.callFromBack === false){
        alert("Please choose your class.")
        return
      }
      if(this.qsNumber.trim() === "" && this.callFromBack === false){
        alert("Please enter questionID.")
        return
      }
      if(this.qsNumber.trim().indexOf(" ") >= 0 && this.callFromBack === false){
        alert("Please enter correct questionID.")
        return
      }
      if(this.enterPressed === false && this.callFromBack === false){   //若按過enter才重複發送req
        this.enterPressed = true
      }
      if(this.enterPressed === false && this.callFromBack === true){ 
        this.callFromBack = false
        return
      }
      let verifiedQsNum = this.enterQSNum
      let self = this;
      console.log(verifiedQsNum)
      console.log(self.selectedClass)
      rankAction.Class = self.selectedClass
      rankAction.questionNum = verifiedQsNum
      notAttendRank.questionNum = verifiedQsNum
      attendRank.questionNum = verifiedQsNum
      axios.post("https://httpbin.org/post",rankAction)
        .then(function(response){
          console.log(response.data)
          console.log(response.status)
          console.log(response.statusText)
          console.log(response.headers)
          console.log(response.config)
          self.userdata = response.data.json.userData  //.data.json
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
      if(self.callFromBack === false){
        self.attendButtonShow();
      }
      this.callFromBack = false
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
        if(response.data.json.status == "success"){   //data.json
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
        if(response.data.json.status == "fail"){   //data.json
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