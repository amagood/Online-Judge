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
var postURL = ""; //<--建立題目URL
var testURL = ""; //<--測試測資URL
var tmpObj = {};
var tmpObj2 = {};

var testMode = true;
var PDFin = false;
var descriptionType = 0;
var descriptionFin = false;

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
  questionObj.PDF='';
  var file = document.getElementById("id_pdf").files[0];

  if(file.size>5*1024*1024)
  {
    alert("File is too big!");
    document.getElementById("id_pdf").value = "";
  }
  else
  {
    var read = new FileReader();
    read.readAsBinaryString(file);

    read.onloadend = function(){
      //console.log(read.result);
      //console.log(btoa(read.result));
      PDFin = true;
      questionObj.PDF=btoa(read.result);
    }
  }
}


function inputExampleMain()
{
  questionObj.sampleMain='';
  testObj.sampleMain='';
  var file = document.getElementById("id_exampleMain").files[0];

  if(file.size > 100*1024*1024){
    alert("File is too big!");
    document.getElementById("id_exampleMain").value = "";
    testMode = true;
  }
  else
  {
    var read = new FileReader();
    read.readAsBinaryString(file);
  
    read.onloadend = function(){
      testMode = true;
      console.log(read.result);
      testObj.sampleMain=read.result;
      questionObj.sampleMain=read.result;
    }
  }
}

function inputExampleFile()
{
  questionObj.sampleFile='';
  testObj.sampleFile='';
  var file = document.getElementById("id_exampleFile").files[0];

  if(file.size > 100*1024*1024){
    alert("File is too big!");
    document.getElementById("id_exampleFile").value = "";
    testMode = true;
  }
  else
  {
    var read = new FileReader();
    read.readAsBinaryString(file);
  
    read.onloadend = function(){
      testMode = true;
      console.log(read.result);
      testObj.sampleFile=read.result;
      questionObj.sampleFile=read.result;
    }
  }
  
}

function inputExampleHeader()
{
  questionObj.sampleHeader='';
  testObj.sampleHeader='';
  var file = document.getElementById("id_exampleHeader").files[0];

  if(file.size > 100*1024*1024){
    alert("File is too big!");
    document.getElementById("id_exampleHeader").value = "";
    testMode = true;
  }
  else
  {
    var read = new FileReader();
    read.readAsBinaryString(file);
  
    read.onloadend = function(){
      testMode = true;
      console.log(read.result);
      testObj.sampleHeader=read.result;
      questionObj.sampleHeader=read.result;
    }
  }
}

function inputExampleFillIn()
{
  questionObj.sampleFillIn='';
  testObj.sampleFillIn='';
  var file = document.getElementById("id_exampleFillIn").files[0];

  if(file.size > 100*1024*1024){
    alert("File is too big!");
    document.getElementById("id_exampleFillIn").value = "";
    testMode = true;
  }
  else
  {
    var read = new FileReader();
    read.readAsBinaryString(file);
  
    read.onloadend = function(){
      console.log(read.result);
      testObj.sampleFillIn=read.result;
      questionObj.sampleFillIn=read.result;
    }
  }
}

function inputInput()
{
  questionObj.input='';
  testObj.tdInput='';
  var file = document.getElementById("id_Input").files[0];

  if(file.size > 10*1024*1024){
    alert("File is too big!");
    document.getElementById("id_Input").value = "";
    testMode = true;
  }
  else
  {
    var read = new FileReader();
    read.readAsBinaryString(file);
  
    read.onloadend = function(){
      testMode = true;
      console.log(read.result);
      testObj.tdInput=read.result;
      questionObj.input=read.result;
    }
  }
  
}

function inputOutput()
{
  questionObj.output='';
  testObj.tdOutput='';
  var file = document.getElementById("id_Output").files[0];

  if(file.size > 10*1024*1024){
    alert("File is too big!");
    document.getElementById("id_Input").value = "";
    testMode = true;
  }
  else
  {
    var read = new FileReader();
    read.readAsBinaryString(file);
  
    read.onloadend = function(){
      testMode = true;
      console.log(read.result);
      testObj.tdOutput=read.result;
      questionObj.output=read.result;
    }
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
      //console.log(PDFin);
      //console.log(testMode);
      if(descriptionType==1)
      {
        if(PDFin==true)
        {
          descriptionFin=true;
        }
        else
        {
          descriptionFin=false;
          alert('請上傳題目敘述PDF!');
        }
      }
      else
      {
        if(document.getElementById("id_questionContent").validity.valid
          &&document.getElementById("id_exampleInput").validity.valid
          &&document.getElementById("id_exampleOutput").validity.valid)
        {
          descriptionFin=true;
        }
        else
        {
          descriptionFin=false;
          alert('請填寫題目敘述與範例測資!');
        }
      }
      if(document.getElementById("id_questionName").validity.valid
        &&descriptionFin==true
        &&testMode==false)
      {
        questionObj.questionName = document.getElementById("id_questionName").value;
        if(descriptionType==0)
        {
          questionObj.questionContent = document.getElementById("id_questionContent").value;
          questionObj.exampleInput = document.getElementById("id_exampleInput").value;
          questionObj.exampleOutput = document.getElementById("id_exampleOutput").value;
        }
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
      else if(descriptionFin==false)
      {

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
            //testMode = false;//等有Response要刪掉~~
            if(tmpObj.stats=="verified")
            {
              alert('測試正確!');
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
      else
      {
        alert('請重新上傳正確檔案後再試一次');
      }
    }
  }
})


var selectField = document.getElementById("selectLanguage");

selectField.onchange = function() {
  if (document.getElementById("selectLanguage").selectedIndex == "0") {
      document.getElementById("id_selectFileMain").innerHTML = '<input name="exampleMain" type="file" id="id_exampleMain" autocomplete="off" value="" required="required" accept = ".c" style="width:765px" oninput="inputExampleMain()">';
      document.getElementById("id_selectFileFile").innerHTML = '<input name="exampleFile" type="file" id="id_exampleFile" autocomplete="off" value="" required="required" accept = ".c" style="width:765px" oninput="inputExampleFile()">';
      document.getElementById("id_selectFileHeader").innerHTML = '<label for="id_exampleCode" >Header Files (如需多檔再上傳):</label><input name="exampleHeader" type="file" id="id_exampleHeader" autocomplete="off" value="" required="required" accept = ".h" style="width:765px" oninput="inputExampleHeader()">';
      document.getElementById("id_selectFileFillIn").innerHTML = '<input name="exampleFillIn" type="file" id="id_exampleFillIn" autocomplete="off" value="" required="required" accept = ".c" style="width:765px" oninput="inputExampleFillIn()">';
  }
  else if (document.getElementById("selectLanguage").selectedIndex == "1"){
      document.getElementById("id_selectFileMain").innerHTML = '<input name="exampleMain" type="file" id="id_exampleMain" autocomplete="off" value="" required="required" accept = ".cpp" style="width:765px" oninput="inputExampleMain()">';
      document.getElementById("id_selectFileFile").innerHTML = '<input name="exampleFile" type="file" id="id_exampleFile" autocomplete="off" value="" required="required" accept = ".cpp" style="width:765px" oninput="inputExampleFile()">';
      document.getElementById("id_selectFileHeader").innerHTML = '<label for="id_exampleCode" >Header Files (如需多檔再上傳):</label><input name="exampleHeader" type="file" id="id_exampleHeader" autocomplete="off" value="" required="required" accept = ".h" style="width:765px" oninput="inputExampleHeader()">';
      document.getElementById("id_selectFileFillIn").innerHTML = '<input name="exampleFillIn" type="file" id="id_exampleFillIn" autocomplete="off" value="" required="required" accept = ".cpp" style="width:765px" oninput="inputExampleFillIn()">';
  }
  else{
      document.getElementById("id_selectFileMain").innerHTML = '<input name="exampleMain" type="file" id="id_exampleMain" autocomplete="off" value="" required="required" accept = ".py" style="width:765px" oninput="inputExampleMain()">';
      document.getElementById("id_selectFileFile").innerHTML = '<input name="exampleFile" type="file" id="id_exampleFile" autocomplete="off" value="" required="required" accept = ".py" style="width:765px" oninput="inputExampleFile()">';
      document.getElementById("id_selectFileHeader").innerHTML = ' ';
      document.getElementById("id_selectFileFillIn").innerHTML = '<input name="exampleFillIn" type="file" id="id_exampleFillIn" autocomplete="off" value="" required="required" accept = ".py" style="width:765px" oninput="inputExampleFillIn()">';
  }
}

var selectDescription = document.getElementById("selectDescriptionType");

selectDescription.onchange = function() {
  if (document.getElementById("selectDescriptionType").selectedIndex == "0") {
      questionObj.PDF='';
      descriptionType = 0;
      PDFin=false;
      document.getElementById("PDFType").innerHTML = '';
      document.getElementById("textType").innerHTML = '<label for="id_Content">題目敘述 :</label><br><textarea id="id_questionContent" style="width:760px;height:310px;border:6px black double;" required></textarea>';
      document.getElementById("textType2").innerHTML = '<label for="id_exampleTestdata" >範例測資 :</label><br><textarea id="id_exampleInput" style="width:385px;height:200px;border:4px black double;" placeholder="範例測資輸入" required></textarea><textarea id="id_exampleOutput" style="width:385px;height:200px;border:4px black double;" placeholder="範例測資輸出" required></textarea>';
  }
  else{
      questionObj.questionContent = '';
      questionObj.exampleInput = '';
      questionObj.exampleOutput = '';
      descriptionType = 1;
      document.getElementById("PDFType").innerHTML = '<label for="id_questionPDF">題目敘述PDF :</label><br><input name="pdf" type="file" id="id_pdf" autocomplete="off" value="" required="required" accept = ".pdf" style="width:765px" oninput="inputPDF()">';
      document.getElementById("textType").innerHTML = '';
      document.getElementById("textType2").innerHTML = '';
  }
}



var exampleInput = document.getElementById("id_Input");

exampleInput.onchange = function() {
    if(this.files[0].size > 10*1024*1024){
       alert("File is too big!");
       this.value = "";
    }
    else
    {
      inputInput();
    }
};

var exampleOutput = document.getElementById("id_Output");

exampleOutput.onchange = function() {
    if(this.files[0].size > 10*1024*1024){
       alert("File is too big!");
       this.value = "";
    }
    else
    {
      inputOutput();
    }
};

function createSuccess() {
  localStorage.setItem("Class", tmpObj2.Class);
  localStorage.setItem("userName", tmpObj2.userName);
  localStorage.setItem("hash", tmpObj2.hash);
  window.location.replace("../../");
}