var questionObj = {
  "action" : "createQ",
  "questionName" : "",
  "PDF" : "",
  "questionContent" : "",
  "language" : "",
  "sampleProgram" : "",
  "exampleInput" : "",
  "exampleOutput" : "",
  "input" : "",
  "output" : "",
  "tag" : "",
  "difficulty" : "",
  "userName" : "",
  "Class" : "",
  "hash" : ""
}
var testObj = {
  "action" : "verify_td",
  "language" : "",
  "sampleProgram" : "",
  "tdInput" : "",
  "tdOutput" : "",
  "userName" : "",
  "Class" : "",
  "hash" : ""

}
var postURL = "https://httpbin.org/post";
var tmpObj = {};
var tmpObj2 = {};

var testMode = true;
var PDFin = false;


function inputPDF()
{
  var file = document.getElementById("id_pdf").files[0];
  var read = new FileReader();
  read.readAsBinaryString(file);
  
  read.onloadend = function(){
    //console.log(read.result);
    //console.log(btoa(read.result));
    PDFin = true;
    questionObj.PDF=btoa(read.result);
  }
}

function inputExampleCode()
{
  var file = document.getElementById("id_exampleCode").files[0];
  var read = new FileReader();
  read.readAsBinaryString(file);
  
  read.onloadend = function(){
    testMode = true;
    console.log(read.result);
    testObj.sampleProgram=read.result;
    questionObj.sampleProgram=read.result;
  }
}

function inputInput()
{
  var file = document.getElementById("id_Input").files[0];
  var read = new FileReader();
  read.readAsBinaryString(file);
  
  read.onloadend = function(){
    testMode = true;
    console.log(read.result);
    testObj.tdInput=read.result;
    questionObj.input=read.result;
  }
}

function inputOutput()
{
  var file = document.getElementById("id_Output").files[0];
  var read = new FileReader();
  read.readAsBinaryString(file);
  
  read.onloadend = function(){
    testMode = true;
    console.log(read.result);
    testObj.tdOutput=read.result;
    questionObj.output=read.result;
  }
}


new Vue({
  el: '#app1',
  data() {
    return {
    }
  },
  methods: {
    submitQ() {
      console.log(PDFin);
      console.log(testMode);
      if(document.getElementById("id_questionName").validity.valid
        &&document.getElementById("id_questionContent").validity.valid
        &&document.getElementById("id_exampleInput").validity.valid
        &&document.getElementById("id_exampleOutput").validity.valid
        &&PDFin==true
        &&testMode==false)
      {
        questionObj.questionName = document.getElementById("id_questionName").value;
        questionObj.questionContent = document.getElementById("id_questionContent").value;
        questionObj.exampleInput = document.getElementById("id_exampleInput").value;
        questionObj.exampleOutput = document.getElementById("id_exampleOutput").value;
        if (document.getElementById("selectLanguage").selectedIndex == "0") 
        {
          questionObj.language = "c";
        }
        else if (document.getElementById("selectLanguage").selectedIndex == "1")
        {
          questionObj.language = "cpp";
        }
        else
        {
          questionObj.language = "python";
        }

        for (i=0; i<document.getElementsByTagName('input').length; i+=1) 
        {
          if(document.getElementsByTagName('input')[i].type=='radio')
          {
            if(document.getElementsByTagName('input')[i].checked)
            {
              questionObj.difficulty = document.getElementsByTagName('input')[i].value;
            } 
          }
        }
        for (i=0; i<document.getElementsByTagName('input').length; i+=1) 
        {
          if(document.getElementsByTagName('input')[i].type=='checkbox')
          {
            if(document.getElementsByTagName('input')[i].checked)
            {
              questionObj.tag=questionObj.tag.concat(document.getElementsByTagName('input')[i].value);
              questionObj.tag=questionObj.tag.concat(" ");
            } 
          }
        }
        alert(questionObj.tag);
      
        axios.post(postURL,questionObj)
          .then(function (response) {
            console.log(response);
            tmpObj2 = response.data;
            if(tmpObj2.stats=="success")
            {
              alert("Question Submit Success!");
            }
            else
            {
              alert("ERROR!");
            }

          })
          .catch(function (error) {
            console.log(error);
          })
      }
      else if(testMode==true)
      {
        alert("請先測試測資與範例程式是否正確!")
      }
      else
      {
        alert("請填寫所有空格!");
      }
    },

    testQ() {
      if(testObj.tdOutput!=""
        &&testObj.tdInput!=""
        &&testObj.sampleProgram!="")
      {
        if (document.getElementById("selectLanguage").selectedIndex == "0") 
        {
          testObj.language = "c";
        }
        else if (document.getElementById("selectLanguage").selectedIndex == "1")
        {
          testObj.language = "cpp";
        }
        else
        {
          testObj.language = "python";
        }
      
        axios.post(postURL,testObj)
          .then(function (response) {
            console.log(response);
            tmpObj = response.data;
            //testMode = false;//等有Response要刪掉~~
            if(tmpObj.stats=="verified")
            {
              alert('題目建立成功');
              testMode = false; //測試時註解
            }
            else
            {
              alert('測資與程式不相符! 請重新上傳檔案!');
            }
          })
          .catch(function (error) {
            alert('Network error! Please try again.');
            console.log(error);
          })
      }
    }
  }
  
})



var selectField = document.getElementById("selectLanguage");

selectField.onchange = function() {
  if (document.getElementById("selectLanguage").selectedIndex == "0") {
      document.getElementById("id_selectFileType").innerHTML = '<input size="40" name="account" type="file" id="id_exampleCode" autocomplete="off" value="" required="" accept = ".c" oninput="inputExampleCode()">';
  }
  else if (document.getElementById("selectLanguage").selectedIndex == "1"){
    document.getElementById("id_selectFileType").innerHTML = '<input size="40" name="account" type="file" id="id_exampleCode" autocomplete="off" value="" required="" accept = ".cpp,.cc" oninput="inputExampleCode()">';
  }
  else{
    document.getElementById("id_selectFileType").innerHTML = '<input size="40" name="account" type="file" id="id_exampleCode" autocomplete="off" value="" required="" accept = ".py" oninput="inputExampleCode()">';
  }
}

var exampleInput = document.getElementById("id_Input");

exampleInput.onchange = function() {
    if(this.files[0].size > 10*1024*1024){
       alert("File is too big!");
       this.value = "";
    };
};

var exampleOutput = document.getElementById("id_Output");

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