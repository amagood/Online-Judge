window.onload = () => {
    new Vue({ el: '#app' })
}
function titleLinkOver(e){
    e.style.color="DodgerBlue";
    e.style.fortWeight="bold";
}
function titleLinkOut(e){
    e.style.color="black";
}