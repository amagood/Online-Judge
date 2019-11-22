var hash=""
var username=""
var attendRank= {
  action: "attend_rank",
  attendStatus: "attend",
  hash: "",

  status : "success",
}
var notAttendRank= {
  action: "attend_rank",
  attendStatus: "notAttend",
  hash: "",

  status : "success",
}
var rankAction= {
  action: "rank",
  hash: "",

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

//----執行創建排名列表----
var app1 = new Vue({
  el: "#app1",
  data: {
    userData: []
  },
  created: function() {
    this.getRankList()
  },
  methods: {
    //JSON.stringify(rankAction)
    getRankList(){
      let self = this;
      axios.post("https://httpbin.org/post",rankAction)
        .then(function(response){
          console.log(response.data)
          console.log(response.status)
          console.log(response.statusText)
          console.log(response.headers)
          console.log(response.config)
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
    }
  },
})

//----執行使用者是否加入排名, 連線後註解要換掉----
var app2 = new Vue({
  el: "#app2",
  data: {
    isShow: true,
  },
  methods: {
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
          alert("Sorry! Maybe next time.")
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
        if(response.data.json.status == "success"){
          alert("OK! Maybe next time!")
        }
        else{
          alert("Sorry! Maybe next time.")
        }
      })
      .catch(function(error){
        console.log(error);
      })
      this.isShow = false
    }
  }
})