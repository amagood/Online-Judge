new Vue({ el: "#app1" });
new Vue({ el: "#app2" });


var submitObj = {
  "action": "submit_code",
  "qID": "problem000",
  "language": "cpp",
  "file":
  {
    "file1": "nothing in the editor",
  },
  "hash": "A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9" //SHA3_512
}


var app3 = new Vue({
  el: "#app3",
  data: {
    counter: 0,
    showResult: true,
    resultClass: "resultBlockAC",
    msg: "AC",
    responseRst: null,
    submitObj: submitObj
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
      this.getEditorValue();
      axios.post("url", this.submitObj)
        .then(function (response) {
          this.responseRst = response;
        })
        .catch(function (error) {
          this.responseRst = { err: "error! post failed." };
        })
    },
    getEditorValue() {
      this.submitObj.file.file1 = editor.getValue();
    }
  }

});