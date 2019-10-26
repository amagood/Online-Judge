window.onload = () => {
  new Vue({ el: '#app' })
}
/*function clickClass(){
  var addProblem=document.getElementById("addProblem");
  addProblem.classList.toggle("hideAdd");
}*/
function titleLinkOver(e){
  e.style.color="DodgerBlue";
  e.style.fortWeight="bold";
}
function titleLinkOut(e){
  e.style.color="black";
}