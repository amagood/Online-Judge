window.onload = () => {
  new Vue({ el: '#app' })
}

var selectField = document.getElementById("selectLanguage");

selectField.onchange = function() {
	if (document.getElementById("selectLanguage").selectedIndex == "0") {
  		document.getElementById("id_selectFileType").innerHTML = '<input size="40" name="account" type="file" id="id_pdf" autocomplete="off" value="" required="" accept = ".c">';
	}
	else if (document.getElementById("selectLanguage").selectedIndex == "1"){
		document.getElementById("id_selectFileType").innerHTML = '<input size="40" name="account" type="file" id="id_pdf" autocomplete="off" value="" required="" accept = ".cpp,.cc">';
	}
	else{
		document.getElementById("id_selectFileType").innerHTML = '<input size="40" name="account" type="file" id="id_pdf" autocomplete="off" value="" required="" accept = ".py">';
	}
}

var exampleInput = document.getElementById("id_exampleInput");

exampleInput.onchange = function() {
    if(this.files[0].size > 10*1024*1024){
       alert("File is too big!");
       this.value = "";
    };
};

var exampleOutput = document.getElementById("id_exampleOutput");

exampleOutput.onchange = function() {
    if(this.files[0].size > 10*1024*1024){
       alert("File is too big!");
       this.value = "";
    };
};

var exampleCode = document.getElementById("id_exampleCode");

exampleCode.onchange = function() {
    if(this.files[0].size > 100*1024*1024){
       alert("File is too big!");
       this.value = "";
    };
};

var PDF = document.getElementById("id_pdf");

PDF.onchange = function() {
    if(this.files[0].size > 1024*1024){
       alert("File is too big!");
       this.value = "";
    };
};