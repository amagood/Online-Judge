var questionObj = {
  "action" : "createQ",
  "questionName" : "",
  "PDF" : "",
  "questionContent" : "",
  "language" : "",
  "sampleMain" : "", 
  "sampleFile" : "",
  "sampleHeader" : "",
  "sampleFillIn" : "", //填空程式碼 (如果沒有要製成填空題則為空字串
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
  "sampleMain" : "",
  "sampleFile" : "",
  "sampleHeader" : "",
  "sampleFillIn" : "",//填空程式碼 (如果沒有要製成填空題則為空字串
  "tdInput" : "",
  "tdOutput" : "",
  "userName" : "",
  "Class" : "",
  "hash" : ""

}
var postURL = "https://httpbin.org/response-headers?freeform="; //<--建立題目URL
var testURL = "https://httpbin.org/response-headers?freeform="; //<--測試測資URL
var tmpObj = {};
var tmpObj2 = {};

var testMode = true;
var PDFin = false;

//NAV BAR
var navapp = new Vue({
  delimiters : ['${', '}'],
  el : "#navapp",
  data : {
    whichShow : "",
    regIsShow : false,
    userid : "",
    name : "",
  },
  created(){
    this.chooseProblems()
    this.canRegister()
  },
  methods:{
    chooseProblems(){
      let self = this
      self.name = localStorage.getItem("userName")
      self.userid = localStorage.getItem("who")
      if(self.userid === "admin"||self.userid === "teacher"){
        self.whichShow = "teacher"
      }
      else if(self.userid === "student"){
        self.whichShow = "student"
      }
    },
    canRegister(){
      let self = this
      self.userid = localStorage.getItem("who")
      if(self.userid === "admin"){
        self.regIsShow = true
      }
    },
    clearStorage(){
      localStorage.clear()
    },
  },
})
//NAV BAR END


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

function inputExampleMain()
{
  var file = document.getElementById("id_exampleMain").files[0];
  var read = new FileReader();
  read.readAsBinaryString(file);
  
  read.onloadend = function(){
    testMode = true;
    console.log(read.result);
    testObj.sampleMain=read.result;
    questionObj.sampleMain=read.result;
  }
}

function inputExampleFile()
{
  var file = document.getElementById("id_exampleFile").files[0];
  var read = new FileReader();
  read.readAsBinaryString(file);
  
  read.onloadend = function(){
    testMode = true;
    console.log(read.result);
    testObj.sampleFile=read.result;
    questionObj.sampleFile=read.result;
  }
}

function inputExampleHeader()
{
  var file = document.getElementById("id_exampleHeader").files[0];
  var read = new FileReader();
  read.readAsBinaryString(file);
  
  read.onloadend = function(){
    testMode = true;
    console.log(read.result);
    testObj.sampleHeader=read.result;
    questionObj.sampleHeader=read.result;
  }
}

function inputExampleFillIn()
{
  var file = document.getElementById("id_exampleFillIn").files[0];
  var read = new FileReader();
  read.readAsBinaryString(file);
  
  read.onloadend = function(){
    console.log(read.result);
    testObj.sampleFillIn=read.result;
    questionObj.sampleFillIn=read.result;
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
        questionObj.tag=questionObj.tag='';
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
        //alert(questionObj.tag);
      
        axios.post(postURL,questionObj)
          .then(function (response) {
            console.log(response);
            tmpObj2 = response.data;
            tmpObj2.submitStats="success"
            if(tmpObj2.submitStats=="success")
            {
              alert("題目建立成功，將自動跳轉!");
              setTimeout(createSuccess, 500);
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
        alert("請先測試測資與範例程式是否正確!");
      }
      else
      {
        alert("請填寫所有空格!");
      }
    },

    testQ() {
      if(testObj.tdOutput!=""
        &&testObj.tdInput!=""
        &&testObj.sampleMain!="")
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
      
        axios.post(testURL,testObj)
          .then(function (response) {
            console.log(response);
            tmpObj = response.data;
            testMode = false;//等有Response要刪掉~~
            if(tmpObj.stats=="verified")
            {
              alert('測試正確!');
              //testMode = false; //測試時註解
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
      else
      {
        alert('請上傳檔案後重試');
      }
    }
  }
  
})



var selectField = document.getElementById("selectLanguage");

selectField.onchange = function() {
  if (document.getElementById("selectLanguage").selectedIndex == "0") {
      document.getElementById("id_selectFileMain").innerHTML = '<input name="exampleMain" type="file" id="id_exampleMain" autocomplete="off" value="" required="required" accept = ".c" oninput="inputExampleMain()" style="width:765px">';
      document.getElementById("id_selectFileFile").innerHTML = '<input name="exampleFile" type="file" id="id_exampleFile" autocomplete="off" value="" required="required" accept = ".c" oninput="inputExampleFile()" style="width:765px">';
      document.getElementById("id_selectFileHeader").innerHTML = '<label for="id_exampleCode" >Header Files (如需多檔再上傳):</label><input name="exampleHeader" type="file" id="id_exampleHeader" autocomplete="off" value="" required="required" accept = ".h" oninput="inputExampleHeader()" style="width:765px">';
      document.getElementById("id_selectFileFillIn").innerHTML = '<input name="exampleFillIn" type="file" id="id_exampleFillIn" autocomplete="off" value="" required="required" accept = ".c" oninput="inputExampleFillIn()" style="width:765px">';
  }
  else if (document.getElementById("selectLanguage").selectedIndex == "1"){
      document.getElementById("id_selectFileMain").innerHTML = '<input name="exampleMain" type="file" id="id_exampleMain" autocomplete="off" value="" required="required" accept = ".cpp" oninput="inputExampleMain()" style="width:765px">';
      document.getElementById("id_selectFileFile").innerHTML = '<input name="exampleFile" type="file" id="id_exampleFile" autocomplete="off" value="" required="required" accept = ".cpp" oninput="inputExampleFile()" style="width:765px">';
      document.getElementById("id_selectFileHeader").innerHTML = '<label for="id_exampleCode" >Header Files (如需多檔再上傳):</label><input name="exampleHeader" type="file" id="id_exampleHeader" autocomplete="off" value="" required="required" accept = ".h" oninput="inputExampleHeader()" style="width:765px">';
      document.getElementById("id_selectFileFillIn").innerHTML = '<input name="exampleFillIn" type="file" id="id_exampleFillIn" autocomplete="off" value="" required="required" accept = ".cpp" oninput="inputExampleFillIn()" style="width:765px">';
  }
  else{
      document.getElementById("id_selectFileMain").innerHTML = '<input name="exampleMain" type="file" id="id_exampleMain" autocomplete="off" value="" required="required" accept = ".py" oninput="inputExampleMain()" style="width:765px">';
      document.getElementById("id_selectFileFile").innerHTML = '<input name="exampleFile" type="file" id="id_exampleFile" autocomplete="off" value="" required="required" accept = ".py" oninput="inputExampleFile()" style="width:765px">';
      document.getElementById("id_selectFileHeader").innerHTML = ' ';
      document.getElementById("id_selectFileFillIn").innerHTML = '<input name="exampleFillIn" type="file" id="id_exampleFillIn" autocomplete="off" value="" required="required" accept = ".py" oninput="inputExampleFillIn()" style="width:765px">';
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

var exampleMain = document.getElementById("id_exampleMain");
var exampleFile = document.getElementById("id_exampleFile");
var exampleHeader = document.getElementById("id_exampleHeader");
var exampleFillIn = document.getElementById("id_exampleFillIn");

exampleMain.onchange = function() {
    if(this.files[0].size > 100*1024*1024){
       alert("File is too big!");
       this.value = "";
    };
};

exampleFile.onchange = function() {
    if(this.files[0].size > 100*1024*1024){
       alert("File is too big!");
       this.value = "";
    };
};

exampleHeader.onchange = function() {
    if(this.files[0].size > 100*1024*1024){
       alert("File is too big!");
       this.value = "";
    };
};

exampleFillIn.onchange = function() {
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


function createSuccess() {
  localStorage.setItem("Class", tmpObj2.Class);
  localStorage.setItem("userName", tmpObj2.userName);
  localStorage.setItem("hash", tmpObj2.hash);
  window.location.replace("../../");
}