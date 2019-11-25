// app1


new Vue({ el: "#app1" })


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


// request and response object


var submitObj = {
  "action": "submit_code",
  "qID": "problem000",
  "language": "cpp",
  "file":
  {
    "file1": "nothing in the editor", /*if this message show up in object or JSON, error occur!*/
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
    codeState: "AC",
    errorMessage: "errorMessage....",
    exeTime: "99999ms",
    errorOutputCompare: "",
    wrongOutput: "",
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
      submitObj.file.file1 = editor.getValue();
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
          app3.wrongOutput         = tmpObj.wrongOutput;
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
  document.getElementById("app1").className = "w3-animate-top";
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
