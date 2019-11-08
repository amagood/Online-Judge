//----執行創建排名列表, 連線後把userData內資料移除,註解function換掉----
var app1 = new Vue({
  el: "#app1",
  data: {
    rankAction: {
      action: "rank",
      hash: "A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9"
    },
    userData: [
      {
        name: "aaa",
        ACTimes: 0,
        commitTimes: 0,
        rank: 1,
        AttendStatus: true
      },
      {
        name: "aaa22",
        ACTimes: 1,
        commitTimes: 3,
        rank: 2,
        AttendStatus: true
      }
    ]
    /*真正用到的userData
    userData: []
    */
  },
  created: function() {
    this.getRankList()
  },
  methods: {
    getRankList(){
      for(let i=0; i<2; i++){
        if(this.userData[i].commitTimes == 0)
          this.userData[i].passRate = 0
        else
          this.userData[i].passRate = ((this.userData[i].ACTimes*100)/this.userData[i].commitTimes).toFixed(2)
      }
    }
    /*真正用到的function
    getRankList(){
      axios.post("https://whereshouldIconnect",JSON.stringify(rankAction))
        .then(function(response){
          console.log(response.data)
          console.log(response.status)
          console.log(response.statusText)
          console.log(response.headers)
          console.log(response.config)
          this.userData = response.userData
        })
      for(let i=0; i<2; i++){
        if(this.userData[i].commitTimes == 0)
          this.userData[i].passRate = 0
        else
          this.userData[i].passRate = ((this.userData[i].ACTimes*100)/this.userData[i].commitTimes).toFixed(2)
      }
    }
    */
  },
})

//----執行使用者是否加入排名, 連線後註解要換掉----
var app2 = new Vue({
  el: "#app2",
  data: {
    isShow: true,
    attendRank: {
      action: "attend_rank",
      attendStatus: "attend",
      hash: "A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9"
    },
    notAttendRank: {
      action: "attend_rank",
      attendStatus: "notAttend",
      hash: "A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9"
    },
  },
  methods: {
    sendAttendMSG(){
      alert("Congratulations! You success attend!")
      this.isShow = false
    },
    sendNotAttendMSG(){
      alert("Congratulations! You success attend!")
      this.isShow = false
    },
    /*真正用到的function
    sendAttendMSG(){
      axios.post("https://whereshouldIconnect",JSON.stringify(attendRank))
      .then(function(response){
        console.log(response.data)
        console.log(response.status)
        console.log(response.statusText)
        console.log(response.headers)
        console.log(response.config)
        if(response.status == "success"){
          alert("Congratulations! You successful attend!")
        }
        else{
          alert("Sorry! Maybe next time.")
        }
      })
      this.isShow = false
    },
    sendNotAttendMSG(){
      axios.post("https://whereshouldIconnect",JSON.stringify(notAttendRank))
      .then(function(response){
        console.log(response.data)
        console.log(response.status)
        console.log(response.statusText)
        console.log(response.headers)
        console.log(response.config)
        if(response.status == "success"){
          alert("What a pity! Attend 一下啦!")
        }
        else{
          alert("Sorry! Maybe next time.")
        }
      })
      this.isShow = false
    }
    */
  }
})