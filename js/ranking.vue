<script>
  //----app1 post請求的發送值, hash值還不知----
  var rankAction = {
    "action": "rank",
    "hash": "A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9"
  },

  //----app2 post請求的發送值, 改變學生參加排名狀態(預設應該為notAttend)----
  var attendRankList = {
    "action": "attend_rank",
    "attendStatus": "attend",
    "hash": "A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9"
  },

  export default {

    //----執行創建排名列表----
    app1 = new Vue({
      el: "#app1",
      data: {
        userData: []
      },
      computed: {
        passRate = function(){
          var rate = (userData.ACTimes*100)/userData.commitTimes
          return rate
        }
      },
      created: {
        getRankList(){
          axios.post("https://whereshouldIconnect",JSON.stringify(rankAction))
            .then(function(response){
              this.userData = JSON.parse(response)
              console.log(response.data)
              console.log(response.status)
              console.log(response.statusText)
              console.log(response.headers)
              console.log(response.config)
            })
        }
      } 
    }),

    //----執行使用者是否加入排名----
    app2 = new Vue({
      el: "#app2",
      data: {

      },
      mounted: {

      }
    })
    
  }
</script>

/*參加排名後按鈕隱藏
$("#attend").click(function(){
  $("#attend").hide()
  userData.attendStatus = true
})*/