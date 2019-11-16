
var app1 = new Vue({
  el: "#app1",
  data: {
    showContent: false,
    showFocus1: false,
    showFocus2: false
  }
})


window.onload = function() {
  document.getElementsByTagName("html")[0].style.visibility = "visible";
  this.app1.showContent = true;
}