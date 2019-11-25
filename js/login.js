

var loginObj = {
  "action" : "login",
  "account" : "",
  "password" : ""
}
var postURL = ""
var testMode = false
var tmpObj = {};


var app1 = new Vue({
  el: "#app1",
  data: {
    showContent: false,
    showFocusAcct: false,
    showFocusPw: false,
    focusAcctClass: "inputFocusGreen",
    focusPwClass: "inputFocusGreen"
  },
  methods: {
    LoginPost() {
      loginObj.account  = document.getElementById("inputAcct").value;
      loginObj.password = document.getElementById("inputPw").value;
      axios.post(postURL, loginObj)
        .then(function (response) {
          console.log(response);
          if (testMode)
            tmpObj = JSON.parse(response.data.freeform);
          else
            tmpObj = response.data;
          console.log(tmpObj);
          setTimeout(loginSuccess, 3000);
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    ValidateAcct() {
      var el = document.getElementById("inputAcct");
      if (el.validity.valid)
      {
        el.parentElement.style.borderColor = "#e6e6e6";
        this.focusAcctClass = "inputFocusGreen";
      }
      else
      {
        el.parentElement.style.borderColor = "red";
        this.focusAcctClass = "inputFocusRed";
      }
    },
    ValidatePw() {
      var el = document.getElementById("inputPw");
      if (el.validity.valid)
      {
        el.parentElement.style.borderColor = "#e6e6e6";
        this.focusPwClass = "inputFocusGreen";
      }
      else
      {
        el.parentElement.style.borderColor = "red";
        this.focusPwClass = "inputFocusRed";
      }
    }
  }
})


window.onload = function() {
  document.getElementsByTagName("html")[0].style.visibility = "visible";
  this.app1.showContent = true;
}


// Login System


function loginSuccess() {
  localStorage.setItem("who", tmpObj.who);
  localStorage.setItem("userName", tmpObj.userName);
  localStorage.setItem("hash", tmpObj.hash);
  window.location.replace("problem/p000");
}
