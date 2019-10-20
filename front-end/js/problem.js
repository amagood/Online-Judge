new Vue({ el: "#app1" })
new Vue({ el: "#app2" })


var submitObj = {
  "action": "submit_code",
  "qID": "problem000",
  "language": "cpp",
  "file":
  {
    "file1": "nothing in the editor",
    /*comment test*/
  },
  "hash": "A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9" //SHA3_512
}
var responseObj = null


var app3 = new Vue({
  el: "#app3",
  data: {
    counter: 0,
    showResult: true,
    resultClass: "resultBlockAC",
    msg: "AC"
  },
  computed: {
    showResultByCt: function () {
      if (this.counter > 0)
        return true
      else
        return false
    },
    resultClassByCt: function () {
      if (this.counter == 2)
        return "resultBlockWA"
      else
        return "resultBlockAC"
    },
    msgByCt: function () {
      if (this.counter == 2)
        return "WA"
      else
        return "AC"
    }
  },
  methods: {
    // change url
    submitCode() {
      submitObj.file.file1 = editor.getValue();
      axios.post("https://httpbin.org/anything", submitObj)
        .then(function (response) {
          responseObj = response;
          console.log(response);      // dbg msg
          console.log(responseObj);   // dbg msg
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    // getEditorValue() {  // dbg method
    //   submitObj.file.file1 = editor.getValue();
    // }
  },
})