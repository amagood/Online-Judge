//----hash值還沒抓----
var rankAction = {
  "action": "rank",
  "hash": "A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9"
}

var attendRankList ={
  "action": "attend_rank",
  "attendStatus": "attend",
  "hash": "A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9"
}

//----執行創建排名列表----
var app1 = new Vue({
  el: "#app1",
  data: {
    userData: []
  },
  computed: {
    passRate: function(){
      passRate = (userData.ACTimes*100)/userData.commitTimes
    }
  },
  created: {
    getRankList(){
      axios.post("https://whereshouldIconnect",JSON.stringify(rankAction))
        .then(function(response){
          this.userData = JSON.parse(response)
        })
    }
  } 
})

//----執行使用者是否加入排名----
var app2 = new Vue({
  el: "#app2",
  data: {

  },
  mounted: {

  }
})


/*參加排名後按鈕隱藏
$("#attend").click(function(){
  $("#attend").hide()
  userData.attendStatus = true
})*/