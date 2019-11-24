

var loginObj = {
  "action" : "login",
  "account" : "",
  "password" : ""
}
var postURL = "login/"
var testMode = false
var tmpObj = {};


var app1 = new Vue({
  el: "#app1",
  data: {
    showContent: false,
    showFocus1: false,
    showFocus2: false,
    focus1Class: "inputFocusGreen",
    focus2Class: "inputFocusGreen"
  },
  methods: {
    LoginPost() {
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
          setTimeout(loginSuccess, 3000);
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    Validation1() {
      var el = document.getElementById("inputAccount");
      if (el.validity.patternMismatch | el.validity.valueMissing)
      {
        el.parentElement.style.borderColor = "red";
        this.focus1Class = "inputFocusRed";
      }
      else
      {
        el.parentElement.style.borderColor = "#e6e6e6";
        this.focus1Class = "inputFocusGreen";
      }
    },
    Validation2() {
      var el = document.getElementById("inputPassword");
      if (el.validity.patternMismatch | el.validity.valueMissing)
      {
        el.parentElement.style.borderColor = "red";
        this.focus2Class = "inputFocusRed";
      }
      else
      {
        el.parentElement.style.borderColor = "#e6e6e6";
        this.focus2Class = "inputFocusGreen";
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
