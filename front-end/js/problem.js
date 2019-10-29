// app1

new Vue({ el: "#app1" })


// copy function


function copyFn(id) {
  var val = document.getElementById(id);
  window.getSelection().selectAllChildren(val);
  document.execCommand("Copy");
  app2.showCopyPopup = true;
  setTimeout(function () { app2.showCopyPopup = false; }, 1500);
}


// app2 for lang, copy toolip, copy popup, theme


var app2 = new Vue({
  el: "#app2",
  data: {
    langDisplay: "C++",
    copyPopupClass: "copyPopup",
    showCopyPopup: false,
    rawHtml: "<p>Copied!</p>",
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
    "file1": "nothing in the editor",
    /*if this message show up in object or JSON, error occur!*/
  },
  "hash": "A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9" //SHA3_512
}
var responseObj = null


// app3 for submit


var app3 = new Vue({
  el: "#app3",
  data: {
    showResult: false,
    responseObj: {
      "codeStats": "AC",
      "errorMessage": "string of errorMessage..........",
      "exeTime": "99999ms",
      "errorOutputCompare": "size",
      "wrongOutput": "your output",
      "hash": "A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9" //SHA3_512
    }
  },
  computed: {
    resultClass: function () {
      if (this.responseObj.codeStats == "AC")
        return "resultAC"
      else
        return "resultWA"
    }
  },
  methods: {
    submitCode() {
      submitObj.file.file1 = editor.getValue();
      axios.post("https://httpbin.org/anything", submitObj)
        .then(function (response) {
          responseObj = response;
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    copyResponseObj() {
      this.responseObj.codeStats = responseObj.codeStats;
      this.responseObj.errorMessage = responseObj.errorMessage;
      this.responseObj.exeTime = responseObj.exeTime;
      this.responseObj.errorOutputCompare = responseObj.errorOutputCompare;
      this.responseObj.wrongOutput = responseObj.wrongOutput;
      this.responseObj.hash = responseObj.hash;
    },
    testPost() {
      submitObj.file.file1 = editor.getValue();
      console.log("editor value:");
      console.log(submitObj.file.file1);
      console.log("如果上面的結果跟使用者輸入的程式碼不同則發生錯誤");

      axios.post("https://httpbin.org/anything", submitObj)
        .then(function (response) {
          var tmpResponse = JSON.parse(JSON.stringify(response));
          console.log("tmpResponse:");
          console.log(tmpResponse);
          console.log("tmpResponse.data.json.file.file1:");
          console.log(tmpResponse.data.json.file.file1);
          console.log("如果上面的結果跟使用者輸入的程式碼不同則發生錯誤");
          console.log("end\n\n\n\n\n\n\n");
        })
        .catch(function (error) {
          console.log(error);
        });

      this.showResult = true;
    }
  },
})


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