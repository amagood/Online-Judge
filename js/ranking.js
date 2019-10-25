
//在叫出ranking.html時就呼叫這個函式執行列出排名的動作
window.onload=showRanking

//開始從後端要資料後再一筆筆列出在網頁上
function showRanking(){
  var currentRow = 1

  rankRequest()
  $("#tbody").html("<tr>")
  for(var i=0; i<100; i++){
    createTable(currentRow, userName, ACTimes, CommitTimes)
    currentRow++
  }
  $("#tbody").html("</tr>")
}

//從後端呼叫一筆前100名的使用者資料
function rankRequest(){
  
}

//每呼叫一次此函式就輸出一列該排名的使用者資料
function createTable(currentRow, userName, ACTimes, CommitTimes){
  var passRate = (ACTimes/CommitTimes)*100

  var tableData = "<th scope='row'>" + currentRow + "</th>" //problem1
  tableData += "<td>" + userName + "</td>"
  tableData += "<td>" + passRate + "</td>"
  tableData += "<td>" + ACTimes + "/" + CommitTimes + "</td>"

  $("#tbody").html(tableData)
}

//參加排名後按鈕隱藏
$("#attend").click(function(){
  $("#attend").hide()
  userData.attendStatus = true
})