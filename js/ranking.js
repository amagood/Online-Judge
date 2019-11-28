var hash=""
var username=""
var attendRank= {
  action: "attend_rank",
  attendStatus: "attend",
  hash: localStorage.getItem("hash"),

  status : "success",
}
var notAttendRank= {
  action: "attend_rank",
  attendStatus: "notAttend",
  hash: localStorage.getItem("hash"),

  status : "fail",
}
var rankAction= {
  action: "rank",
  questionNum: "",//待定
  hash: localStorage.getItem("hash"),

  userData: [
    {
      name: "abb",
      ACTimes: 100,
      commitTimes: 130,
      rank: 1,
      AttendStatus: true
    },
    {
      name: "aaa22",
      ACTimes: 1,
      commitTimes: 3,
      rank: 2,
      AttendStatus: true
    },
    {
      name: "aaa",
      ACTimes: 0,
      commitTimes: 0,
      rank: 3,
      AttendStatus: true
    },
  ]
}

//----依照輸入的題目號碼創建列表----
var app2 = new Vue({
  delimiters: ['${', '}'],
  el: "#app2",
  data: {
    userData: []
  },
  mounted() {
    //JSON.stringify(rankAction)
    this.$root.$on("createRank", ()=>{
      let self = this;
      axios.post("https://httpbin.org/post",rankAction)
        .then(function(response){
          console.log(response.data)
          console.log(response.status)
          console.log(response.statusText)
          console.log(response.headers)
          console.log(response.config)
          console.log(response.data.questionNum)
          self.userData = response.data.json.userData
          for(let i=0; i<self.userData.length; i++){
            if(self.userData[i].commitTimes == 0)
              self.userData[i].passRate = 0
            else
              self.userData[i].passRate = ((self.userData[i].ACTimes*100)/self.userData[i].commitTimes).toFixed(2)
          }
        })
        .catch(function(error){
          console.log(error);
        })
    });
  },
})

//----執行使用者是否加入排名, 連線後註解要換掉----
var app1 = new Vue({
  el: "#app1",
  data: {
    isShow: true,
    qsNumber:"",
  },
  created: function() {
    this.idCheck()
  },
  methods: {
    idCheck(){
      localStorage.setItem("who","student")//測試
      let self = this
      if(localStorage.getItem("who") == "admin" ||localStorage.getItem("who") == "teacher"){
        self.isShow = false
      }
    },
    createRankList(){
      console.log(this.qsNumber)
      rankAction.questionNum = this.qsNumber
      this.$root.$emit("createRank")
    },
    sendAttendMSG(){
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
        console.log(error);
      })
      this.isShow = false
    },
    sendNotAttendMSG(){
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
        console.log(error);
      })
      this.isShow = false
    }
  }
})