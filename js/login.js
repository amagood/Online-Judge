

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
      document.getElementById("loginBtn").setAttribute("disabled", "disabled");
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
        document.getElementById("loginBtn").className = "btn btn-dark btn-lg rounded-pill animated shake";
        app1.msg = "Input is invalid!"
        app1.showMsg = true;
      }
      setTimeout(function () {document.getElementById("loginBtn").className = "btn btn-dark btn-lg rounded-pill"; document.getElementById("loginBtn").removeAttribute("disabled");}, 3000);
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


// trigger a function on enter


document.getElementById("inputAcct").addEventListener('keyup', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("inputPw").focus();
  }
});
document.getElementById("inputPw").addEventListener('keyup', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("loginBtn").click();
  }
});


// Login System


function loginSuccess() {
  localStorage.setItem("who", tmpObj.who);
  localStorage.setItem("userName", tmpObj.userName);
  localStorage.setItem("hash", tmpObj.hash);
  // window.location.replace("./problem/p000");
  window.location.href = "./problem/p000";
}
