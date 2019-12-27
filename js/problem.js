// 20191227
// navbar


var navapp = new Vue({
  delimiters: ['${', '}'],
  el : "#navapp",
  data :{
    whichShow : "",//顯示哪個題目庫
    regIsShow : "",//顯示註冊鈕
    userid : "",
    name : localStorage.getItem("userName"),
  },
  created() {
    this.chooseProblems()
    this.canRegister()
  },
  methods: {
    chooseProblems(){
      let self = this
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
      localStorage.clear();
    },
  },
})


// app2 for lang, copy toolip, copy popup, theme, tab


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
      if (selectedLang == "python") {
        editor.session.setMode("ace/mode/python");
        uploadFileApp.showHeaderFile = false;
        uploadFileApp.headerFile = null;
      } else {
        editor.session.setMode("ace/mode/c_cpp");
        uploadFileApp.showHeaderFile = true;
      }
    },
    clickTheme() {
      var acePath = 'ace/theme/' + this.themeSelected;
      editor.setTheme(acePath);
    },
    openTab(id) {
      var i = 0;
      var tabContent = document.getElementsByClassName("tabContent");
      for (i=0; i<tabContent.length; i++) {
        tabContent[i].style.display = "none";
      }
      document.getElementById(id).style.display = "block";
      uploadFileApp.uploadFileMode = (id == "uploadFileTab");
    }
  }
})


// FileReader


var maxFileAmount = 10;
var mainFileReader = new FileReader();
var implementFileReaders = [];
var headerFileReaders = [];
function creatFileReaders() {
  var i = 0;
  for (i=0; i<maxFileAmount; i++) {
    implementFileReaders[i] = new FileReader();
    headerFileReaders[i] = new FileReader();
  }
}
function readMainFileContent() {
  if (uploadFileApp.mainFile != null)
    mainFileReader.readAsText(uploadFileApp.mainFile);
}
function readImplementFileContent() {
  var i = 0;
  for (i=0; i<maxFileAmount; i++)
    if (uploadFileApp.implementFile != null && uploadFileApp.implementFile[i] != undefined)
      implementFileReaders[i].readAsText(uploadFileApp.implementFile[i]);
}
function readHeaderFileContent() {
  var i = 0;
  for (i=0; i<maxFileAmount; i++)
    if (uploadFileApp.headerFile != null && uploadFileApp.headerFile[i] != undefined)
      headerFileReaders[i].readAsText(uploadFileApp.headerFile[i]);
}


// uploadFileApp


var uploadFileApp = new Vue({
  delimiters: ['${', '}'],
  el: "#uploadFileApp",
  data: {
    uploadFileMode: false,
    showHeaderFile: true,
    showImplementFilesInvalidMsg: false,
    showHeaderFilesInvalidMsg: false,
    mainFile: null,
    implementFile: null,
    headerFile: null,
    implementFilesInvalidMsg: "",
    headerFilesInvalidMsg: ""
  },
  methods: {
    checkMainFile() {
      readMainFileContent();
    },
    checkImplementFiles() {
      if (this.implementFile != null && this.implementFile.length > maxFileAmount) {
        this.showImplementFilesInvalidMsg = true;
        this.implementFilesInvalidMsg = "files: exceed " + maxFileAmount.toString() + " files!";
      } else {
        this.showImplementFilesInvalidMsg = false;
        readImplementFileContent();
      }
    },
    checkHeaderFiles() {
      if (this.headerFile != null && this.headerFile.length > maxFileAmount) {
        this.showHeaderFilesInvalidMsg = true;
        this.headerFilesInvalidMsg = "header files: exceed " + maxFileAmount.toString() + " files!";
      } else {
        this.showHeaderFilesInvalidMsg = false;
        readHeaderFileContent();
      }
    }   
  }
})


// request and response object


var submitObj = {
  "action": "submit_code",
  "qID": "",
  "language": "cpp",
  "fileAmount": 0,
  "file":
  {
    "file1": ""
  },
  "headerFileAmount": 0,
  "headerFile":
  {
    "file1": ""
  },
  "userName" : "",
  "Class" : "",
  "hash": ""
}
var postURL = "submit/"
var testMode = false
var tmpObj = {}
function copyFileStringsToSubmitObj() {
  submitObj.file["file1"] = mainFileReader.result;
  if (uploadFileApp.mainFile == null)
    submitObj.file["file1"] = "";
  var i = 0;
  for (i=0; i<maxFileAmount; i++) {
    if (uploadFileApp.implementFile != null && uploadFileApp.implementFile.length > 0) {
      if (implementFileReaders[i].result != null && i < uploadFileApp.implementFile.length)
        submitObj.file["file"+(i+2)] = implementFileReaders[i].result;
      else
        delete submitObj.file["file"+(i+2)];
    } else {
      delete submitObj.file["file"+(i+2)];
    }
    if (uploadFileApp.headerFile != null && uploadFileApp.headerFile.length > 0) {
      if (headerFileReaders[i].result != null && i < uploadFileApp.headerFile.length)
        submitObj.headerFile["file"+(i+1)] = headerFileReaders[i].result;
      else
        delete submitObj.headerFile["file"+(i+1)];
    } else {
      delete submitObj.headerFile["file"+(i+1)];
    }
  }
}


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
    OutputAvailable: false,
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
      if (uploadFileApp.uploadFileMode) {
        copyFileStringsToSubmitObj();
        if (uploadFileApp.implementFile != null)
          submitObj.fileAmount = 1 + uploadFileApp.implementFile.length;
        else
          submitObj.fileAmount = 1;
        if (uploadFileApp.headerFile != null)
          submitObj.headerFileAmount = uploadFileApp.headerFile.length;
        else
          submitObj.headerFileAmount = 0;
      } else {
        submitObj.fileAmount = 1;
        submitObj.file.file1 = editor.getValue();
        submitObj.headerFileAmount = 0;
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
          app3.OutputAvailable     = (tmpObj.OutputAvailable == "true");
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
  app2.openTab("codeEditorTab");
  userInfo.who = localStorage.getItem("who");
  userInfo.userName = localStorage.getItem("userName");
  userInfo.hash = localStorage.getItem("hash");
  this.console.log(userInfo);
  submitObj.userName = userInfo.userName;
  submitObj.hash = userInfo.hash;
  if (submitObj.userName == null || submitObj.hash == null) {
    document.getElementById("submitBtn").setAttribute("disabled", "disabled");
    document.getElementById("submitBtn").textContent = "Login before submit";
  }
  submitObj.qID = qID;
  editor.setValue(initCode);
  document.getElementsByTagName("body")[0].className = "w3-animate-opacity";
  document.getElementById("navapp").className = "navbar navbar-expand-lg navbar-light navbarset w3-animate-top";
  document.getElementById("mainBlock1").className = "mainBlock1 w3-animate-zoom";
  document.getElementById("mainBlock2").className = "mainBlock2 w3-animate-bottom";
  document.getElementsByTagName("html")[0].style.visibility = "visible";
  creatFileReaders();
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
