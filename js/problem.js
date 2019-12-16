// 20191216
// navbar


clearStorage = function(){
  localStorage.clear();
}
var navapp = new Vue({
  el: "#navapp",
  data:{
    whichShow:"",
    userid: "",
  },
  created() {
    this.checkId()
  },
  methods: {
    checkId(){
      let self = this
      self.userid = localStorage.getItem("who")
      if(self.userid === "admin"||self.userid === "teacher"){
        self.whichShow = "teacher"
      }
      else if(self.userid === "student"){
        self.whichShow = "student"
      }
    }
  },
})


// app2 for lang, copy toolip, copy popup, theme


var app2 = new Vue({
  el: "#app2",
  data: {
    langDisplay: "C++",
    showCopyPopup: false,
    themeSelected: "tomorrow",
    themeOptions: [
      { text: "----------Bright----------", disabled: true },
      { text: "chrome" },
      { text: "clouds" },
      { text: "crimson_editor" },
      { text: "dawn" },
      { text: "dreamweaver" },
      { text: "eclipse" },
      { text: "github" },
      { text: "iplastic" },
      { text: "solarized_light" },
      { text: "textmate" },
      { text: "tomorrow" },
      { text: "xcode" },
      { text: "kuroir" },
      { text: "katzenmilch" },
      { text: "sqlserver" },
      { text: "-----------Dark-----------", disabled: true },
      { text: "ambiance" },
      { text: "chaos" },
      { text: "clouds_midnight" },
      { text: "dracula" },
      { text: "cobalt" },
      { text: "gruvbox" },
      { text: "gob" },
      { text: "idle_fingers" },
      { text: "kr_theme" },
      { text: "merbivore" },
      { text: "merbivore_soft" },
      { text: "mono_industrial" },
      { text: "monokai" },
      { text: "pastel_on_dark" },
      { text: "solarized_dark" },
      { text: "terminal" },
      { text: "tomorrow_night" },
      { text: "tomorrow_night_blue" },
      { text: "tomorrow_night_bright" },
      { text: "tomorrow_night_eighties" },
      { text: "twilight" },
      { text: "vibrant_ink" }
    ]
  },
  methods: {
    clickLang(langDisplay, selectedLang) {
      this.langDisplay = langDisplay;
      submitObj.language = selectedLang;
      if (selectedLang == "python")
        editor.session.setMode("ace/mode/python");
      else
        editor.session.setMode("ace/mode/c_cpp");
    },
    clickTheme() {
      var acePath = 'ace/theme/' + this.themeSelected;
      editor.setTheme(acePath);
    }
  }
})


// get content from file object


function getMainFileContent() {
  if (uploadFileApp.mainFile != null)
  {
    var read = new FileReader();
    read.readAsBinaryString(uploadFileApp.mainFile);
    read.onloadend = function(){
      uploadFileApp.mainFileString = read.result;
    }
  }
  else
    uploadFileApp.mainFileString = "";
}
function getImplementFile1Content() {
  if (uploadFileApp.implementFile != null)
  {
    var read = new FileReader();
    read.readAsBinaryString(uploadFileApp.implementFile[0]);
    read.onloadend = function(){
      uploadFileApp.implementFile1String = read.result;
    }
  }
  else
    uploadFileApp.implementFile1String = "";
}
function getImplementFile2Content() {
  if (uploadFileApp.implementFile != null && uploadFileApp.implementFile[1] != undefined)
  {
    var read = new FileReader();
    read.readAsBinaryString(uploadFileApp.implementFile[1]);
    read.onloadend = function(){
      uploadFileApp.implementFile2String = read.result;
    }
  }
  else
    uploadFileApp.implementFile2String = "";
}
function getHeaderFile1Content() {
  if (uploadFileApp.headerFile != null)
  {
    var read = new FileReader();
    read.readAsBinaryString(uploadFileApp.headerFile[0]);
    read.onloadend = function(){
      uploadFileApp.headerFile1String = read.result;
    }
  }
  else
    uploadFileApp.headerFile1String = "";
}
function getHeaderFile2Content() {
  if (uploadFileApp.headerFile != null && uploadFileApp.headerFile[1] != undefined)
  {
    var read = new FileReader();
    read.readAsBinaryString(uploadFileApp.headerFile[1]);
    read.onloadend = function(){
      uploadFileApp.headerFile2String = read.result;
    }
  }
  else
    uploadFileApp.headerFile2String = "";
}


// uploadFileApp


var uploadFileApp = new Vue({
  delimiters: ['${', '}'],
  el: "#uploadFileApp",
  data: {
    showUploadFileBlock: false,
    mainFile: null,
    implementFile: null,
    headerFile: null,
    showImplementFilesInvalidMsg: false,
    implementFilesInvalidMsg: "",
    showHeaderFilesInvalidMsg: false,
    headerFilesInvalidMsg: "",
    mainFileString: "",
    implementFile1String: "",
    implementFile2String: "",
    headerFile1String: "",
    headerFile2String: ""
  },
  methods: {
    checkMainFile() {
      getMainFileContent();
    },
    checkImplementFiles() {
      if (this.implementFile != null && this.implementFile.length > 2)
      {
        this.showImplementFilesInvalidMsg = true;
        this.implementFilesInvalidMsg = "files: exceed 2 files!";
      }
      else
      {
        this.showImplementFilesInvalidMsg = false;
        getImplementFile1Content();
        getImplementFile2Content();
      }
    },
    checkHeaderFiles() {
      if (this.headerFile != null && this.headerFile.length > 2)
      {
        this.showHeaderFilesInvalidMsg = true;
        this.headerFilesInvalidMsg = "header files: exceed 2 files!";
      }
      else
      {
        this.showHeaderFilesInvalidMsg = false;
        getHeaderFile1Content();
        getHeaderFile2Content();
      }
    }   
  }
})


// request and response object


var submitObj = {
  "action": "submit_code",
  "qID": "p000",
  "language": "cpp",
  "fileAmount": 0,
  "file":
  {
    "file1": "",
    "file2": "",
    "file3": ""
  },
  "headerFileAmount": 0,
  "headerFile":
  {
    "file1": "",
    "file2": ""
  },
  "hash": "A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9"
}
var postURL = "submit/"
var testMode = false
var tmpObj = {}


// app3 for submit


var app3 = new Vue({
  delimiters: ['${', '}'],
  el: "#app3",
  data: {
    showSpinner: false,
    codeState: "",
    errorMessage: "",
    exeTime: "",
    errorOutputCompare: "",
    htmlWrongOutput: "",
    htmlExpectedOutput: "",
    memoryUsage: "",
    verdictTime: "",
    hash: "",
    showAC: false,
    showCE: false,
    showTLE: false,
    showWA: false,
    showMLE: false,
    showERR: false
  },
  methods: {
    submitCode() {
      document.getElementById("submitBtn").setAttribute("disabled", "disabled");
      this.showSpinner = true;
      if (uploadFileApp.showUploadFileBlock)
      {
        submitObj.fileAmount = 1;
        if (uploadFileApp.implementFile != null)
        {
          if (uploadFileApp.implementFile.length > 2)
            submitObj.fileAmount = 3;
          else
            submitObj.fileAmount = uploadFileApp.implementFile.length + 1;
        }
        submitObj.file.file1 = uploadFileApp.mainFileString;
        submitObj.file.file2 = uploadFileApp.implementFile1String;
        submitObj.file.file3 = uploadFileApp.implementFile2String;
        submitObj.headerFileAmount = 0;
        if (uploadFileApp.headerFile != null)
        {
          if (uploadFileApp.headerFile.length > 2)
            submitObj.headerFileAmount = 2;
          else
            submitObj.headerFileAmount = uploadFileApp.headerFile.length;
        }
        submitObj.headerFile.file1 = uploadFileApp.headerFile1String;
        submitObj.headerFile.file2 = uploadFileApp.headerFile2String;
      }
      else
      {
        submitObj.fileAmount = 1;
        submitObj.file.file1 = editor.getValue();
        submitObj.file.file2 = "";
        submitObj.file.file3 = "";
        submitObj.headerFileAmount = 0;
        submitObj.headerFile.file1 = "";
        submitObj.headerFile.file2 = "";
      }
      this.showAC = false;
      this.showCE = false;
      this.showTLE = false;
      this.showWA = false;
      this.showMLE = false;
      this.showERR = false;
      axios.post(postURL, submitObj)
        .then(function (response) {
          console.log(response);
          app3.showSpinner = false;
          if (testMode)
            tmpObj = JSON.parse(response.data.freeform);
          else
            tmpObj = response.data; console.log(tmpObj);
          app3.codeState           = tmpObj.codeState;
          app3.errorMessage        = tmpObj.errorMessage;
          app3.exeTime             = tmpObj.exeTime;
          app3.errorOutputCompare  = tmpObj.errorOutputCompare;
          app3.htmlWrongOutput     = '<pre id="wrongOutput" class="samplePre2">' + tmpObj.wrongOutput + '</pre>';
          app3.htmlExpectedOutput  = '<pre id="expectedOutput" class="samplePre2">' + tmpObj.expectedOutput + '</pre>';
          app3.memoryUsage         = tmpObj.memoryUsage;
          app3.verdictTime         = tmpObj.verdictTime;
          app3.hash                = tmpObj.hash;
          app3["show" + tmpObj.codeState] = true;
        })
        .catch(function (error) {
          app3.showSpinner = false;
          console.log(error);
          app3.showERR = true;
        })
      setTimeout(function () {document.getElementById("submitBtn").removeAttribute("disabled");}, 2000);
    }
  },
})


// Onload


var userInfo = {
  "who" : "",
  "userName" : "",
  "hash" : ""
}

window.onload = function() {
  document.getElementsByTagName("body")[0].className = "w3-animate-opacity";
  document.getElementById("navapp").className = "navbar navbar-expand-lg navbar-light navbarset w3-animate-top";
  document.getElementById("mainBlock1").className = "mainBlock1 w3-animate-zoom";
  document.getElementById("mainBlock2").className = "mainBlock2 w3-animate-bottom";
  document.getElementsByTagName("html")[0].style.visibility = "visible";
  // Login System
  userInfo.who = localStorage.getItem("who");
  userInfo.userName = localStorage.getItem("userName");
  userInfo.hash = localStorage.getItem("hash");
  this.console.log(userInfo);
}


// copy function


function copyFn(id) {
  var val = document.getElementById(id);
  window.getSelection().selectAllChildren(val);
  document.execCommand("Copy");
  app2.showCopyPopup = true;
  setTimeout(function () { app2.showCopyPopup = false; }, 1500);
}


// set aceEditor


ace.config.set("basePath", "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.6/");
var editor = ace.edit("aceEditor");
editor.setTheme("ace/theme/tomorrow");
editor.session.setMode("ace/mode/c_cpp");
editor.session.setUseSoftTabs(true);
editor.setShowPrintMargin(false);
editor.setOption("scrollPastEnd", 0.5)
editor.setOption("enableBasicAutocompletion", true)
editor.setOption("enableLiveAutocompletion", true)
var aceEditorFontSize = 18;
editor.commands.addCommand({
  name: 'myCommandInc',
  bindKey: { win: 'Ctrl-+', mac: 'Command-+' },
  exec: function (editor) {
    if (aceEditorFontSize < 40) {
      aceEditorFontSize += 2;
      document.getElementById('aceEditor').style.fontSize = aceEditorFontSize + 'px';
    }
  },
  readOnly: true
});
editor.commands.addCommand({
  name: 'myCommandInc2',
  bindKey: { win: 'Ctrl-=', mac: 'Command-=' },
  exec: function (editor) {
    if (aceEditorFontSize < 40) {
      aceEditorFontSize += 2;
      document.getElementById('aceEditor').style.fontSize = aceEditorFontSize + 'px';
    }
  },
  readOnly: true
});
editor.commands.addCommand({
  name: 'myCommandDec',
  bindKey: { win: 'Ctrl--', mac: 'Command--' },
  exec: function (editor) {
    if (aceEditorFontSize > 2) {
      aceEditorFontSize -= 2;
      document.getElementById('aceEditor').style.fontSize = aceEditorFontSize + 'px';
    }
  },
  readOnly: true
});
var dom = require("ace/lib/dom");
editor.commands.addCommand({
  name: 'Toggle Fullscreen',
  bindKey: "F11",
  exec: function (editor) {
    var fullScreen = dom.toggleCssClass(document.body, "fullScreen")
    dom.setCssClass(editor.container, "fullScreen", fullScreen)
    editor.setAutoScrollEditorIntoView(!fullScreen)
    editor.resize()
  },
  readOnly: true
});


// dragbar


var aceEditorContainer = document.getElementById("aceEditorContainer")
var bar = document.getElementById("dragbar")

const drag = (e) => {
  document.selection ? document.selection.empty() : window.getSelection().removeAllRanges();
  aceEditorContainer.style.height = (e.clientY - aceEditorContainer.getBoundingClientRect().top) + 'px';
  editor.resize();
}

bar.addEventListener('mousedown', () => {
  document.addEventListener('mousemove', drag);
});

bar.addEventListener('mouseup', () => {
  document.removeEventListener('mousemove', drag);
});
