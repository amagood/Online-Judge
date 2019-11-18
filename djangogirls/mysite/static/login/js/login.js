

var loginObj = {
  "action" : "login",
  "account" : "",
  "password" : ""
}
var postURL = "http://127.0.0.1:8000/login/"
var testMode = false
var tmpObj = {};


var app1 = new Vue({
  el: "#app1",
  data: {
    showContent: false,
    showFocus1: false,
    showFocus2: false
  },
  methods: {
    loginPost() {
      loginObj.account  = document.getElementById("inputAccount").value;
      loginObj.password = document.getElementById("inputPassword").value;
      axios.post(postURL, loginObj)
        .then(function (response) {
          console.log(response);
          if (testMode)
            tmpObj = JSON.parse(response.data.freeform);
          else
            tmpObj = response.data;
          console.log(tmpObj);
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  }
})


window.onload = function() {
  document.getElementsByTagName("html")[0].style.visibility = "visible";
  this.app1.showContent = true;
}