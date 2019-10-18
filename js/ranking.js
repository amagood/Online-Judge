var userData={
    userName:null,
    acTimes:0,
    commitTimes:0,
    attendStatus:false,
}

//在叫出ranking.html時就呼叫下列函式
//window.onload=callUserRank

/*fuction=callUserRank{
    if()
}
*/

//參加排名後按鈕隱藏
$("#attend").click(function(){
    $("#attend").hide()
    userData.attendStatus=true
})