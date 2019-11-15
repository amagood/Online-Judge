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
      let acePath = 'ace/theme/' + this.themeSelected;
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
  "hash": "A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9" //SHA3_512
}
var httpPostURL = "https://httpbin.org/response-headers?freeform=%7B%22codeStats%22%20%3A%20%22AC%22%2C%22errorMessage%22%20%3A%20%22string..........%22%2C%22exeTime%22%20%3A%20%2299999ms%22%2C%22errorOutputCompare%22%20%3A%20%22size%22%2C%22wrongOutput%22%20%3A%20%22your%20output%22%2C%22hash%22%20%3A%20%22A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9%22%7D";
var tmpObj = {}


// app3 for submit


var app3 = new Vue({
  el: "#app3",
  data: {
    showSpinner: false,
    codeStats: "AC",
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
      this.showSpinner = true;
      submitObj.file.file1 = editor.getValue();
      this.showAC = false;
      this.showCE = false;
      this.showTLE = false;
      this.showWA = false;
      this.showMLE = false;
      this.showERR = false;
      axios.post(httpPostURL, submitObj)
        .then(function (response) {
          app3.showSpinner = false;
          tmpObj = JSON.parse(response.data.freeform); console.log(tmpObj);
          app3.codeStats = tmpObj.codeStats;
          app3.errorMessage = tmpObj.errorMessage;
          app3.exeTime = tmpObj.exeTime;
          app3.errorOutputCompare = tmpObj.errorOutputCompare;
          app3.wrongOutput = tmpObj.wrongOutput;
          app3.hash = tmpObj.hash;
          app3["show" + tmpObj.codeStats] = true;
        })
        .catch(function (error) {
          app3.showSpinner = false;
          console.log(error);
          app3.showERR = true;
        })
    }
  },
})


// html visibility


window.onload = function() {
  document.getElementsByTagName("html")[0].style.visibility = "visible";
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