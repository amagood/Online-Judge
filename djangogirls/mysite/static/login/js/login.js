

var loginObj = {
  "action" : "login",
  "account" : "",
  "password" : ""
}
var postURL = ""
var testMode = false
var tmpObj = {};


var app1 = new Vue({
  delimiters: ['${', '}'],
  el: "#app1",
  data: {
    showContent: false,
    showFocusAcct: false,
    showFocusPw: false,
    focusAcctClass: "inputFocusGreen",
    focusPwClass: "inputFocusGreen",
    showSpinner: false,
    showMsg: false,
    msg: ""
  },
  methods: {
    LoginPost() {
      app1.showMsg = false;
      if (document.getElementById("inputAcct").validity.valid
         && document.getElementById("inputPw").validity.valid)
      {
        app1.showSpinner = true;
        loginObj.account  = document.getElementById("inputAcct").value;
        loginObj.password = document.getElementById("inputPw").value;
        axios.post(postURL, loginObj)
          .then(function (response) {
            app1.showSpinner = false;
            console.log(response);
            if (testMode) tmpObj = JSON.parse(response.data.freeform);
            else tmpObj = response.data;
            console.log(tmpObj);
            if (tmpObj.stats == "success")
            {
              app1.msg = "Success!"
              app1.showMsg = true;
              setTimeout(loginSuccess, 3000);
            }
            else
            {
              app1.msg = "Account and password are incorrect!"
              app1.showMsg = true;
            }
          })
          .catch(function (error) {
            app1.showSpinner = false;
            app1.msg = "Network error! Please try again."
            app1.showMsg = true;
            console.log(error);
          })
      }
      else
      {
        app1.msg = "Input is invalid!"
        app1.showMsg = true;
      }
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
  window.location.replace("../problem/p000");
}
