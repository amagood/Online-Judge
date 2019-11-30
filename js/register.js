window.onload = () => {
  new Vue({ el: '#app' })
}

var submitObj = {
  "action": "register",
  "who" : "teacher"||"student",
  "account" : "account_name",
  "password" : "123456789",
  "email" : "123456789@fsdfsdf.com"
}
var postURL = "submit/"
var testMode = false
var tmpObj = {}
