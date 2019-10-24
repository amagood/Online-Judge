new Vue({ el: "#app1" })


function copyFn(id) {
  var val = document.getElementById(id);
  window.getSelection().selectAllChildren(val);
  document.execCommand("Copy");
  // alert("Copy success!")
  app2.showCopyPopup = true;
  setTimeout(function () { app2.showCopyPopup = false; }, 1500);
}


var app2 = new Vue({
  el: "#app2",
  data: {
    langDisplay: "C++",
    copyPopupClass: "copyPopup",
    showCopyPopup: false,
    rawHtml: "<p>Copied!</p>"
  },
  methods: {
    clickLang(langDisplay, selectedLang) {
      this.langDisplay = langDisplay;
      submitObj.language = selectedLang;
    }
  }
})


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
    // change url
    submitCode() {
      submitObj.file.file1 = editor.getValue();
      axios.post("https://httpbin.org/anything", submitObj)
        .then(function (response) {
          responseObj = response;
          console.log("responseObj:");
          console.log(responseObj);   // dbg msg
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    // getEditorValue() {  // dbg method
    //   submitObj.file.file1 = editor.getValue();
    // },
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