//----app1 post請求的發送值, hash值還不知----
var rankAction = {
  action: "rank",
  hash: "A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9"
}

//----app2 post請求的發送值, 改變學生參加排名狀態(預設應該為notAttend)----
var attendRankList = {
  action: "attend_rank",
  attendStatus: "attend",
  hash: "A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9"
}

//----執行創建排名列表----
var app1 = new Vue({
  el: "#app1",
  data: {
    userData: [
      {
        name: "aaa",
        ACTimes: "0",
        commitTimes: "0",
        rank: "1",
        AttendStatus: "true"
      },
      {
        name: "aaa22",
        ACTimes: "1",
        commitTimes: "3",
        rank: "2",
        AttendStatus: "true"
      }
    ]
  },
  created: function() {
    this.aaa()
    //this.getRankList()
  },
  methods: {
    aaa(){
      for(let i=0; i<2; i++){
        if(this.userData[i].commitTimes == 0)
          this.userData[i].passRate = 0;
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
          for(let i=0; i<100; i++){
            this.userData[i].passRate = (this.userData[i].ACTimes*100)/this.userData.commitTimes
          }
        })
    }
    */
  },
})

//----執行使用者是否加入排名----
/*
var app2 = new Vue({
  el: "#app2",
  data: {

  },
  mounted: {

  }
})
*/

/*參加排名後按鈕隱藏
$("#attend").click(function(){
  $("#attend").hide()
  userData.attendStatus = true
})*/
