
window.onload = () => {
  new Vue({
    el: "#navapp",
    data: {
      whichShow: "",
      userid: "",
      name: localStorage.getItem(userName),
    },
    created() {
      this.chooseProblems()
    },
    methods: {
      chooseProblems() {
        let self = this
        self.userid = localStorage.getItem("who")
        if (self.userid === "admin" || self.userid === "teacher") {
          self.whichShow = "teacher"
        }
        else if (self.userid === "student") {
          self.whichShow = "student"
        }
      },
      clearStorage() {
        localStorage.clear();
      },
    },
  })
}

var questionLibObj = {
  "action": "questionLib",
  "questionNum": "20",//there are twenty question in one page. 
  "questionPage": "1",//1 means select the top 20 question
  "sequence": "id",
  "tag": "loop",
  "degree": "easy",
  "userName": "amagood",
  "Class": "CSIE110",
  "hash": "A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9"
}
var tmpobj = {}

window.onload = () => {
  new Vue({
    el: '#app-1',
    data() {
      return {
        perPage: 20,//一頁幾行
        currentPage: 1,//當前頁數
        filter: null,//Search
        Target: "Target",
        Degree: "Degree",
        fields: [
          {
            key: "id",
            label: "#",
            sortable: true
          },
          {
            key: "title",
            label: "Title",
            sortable: false
          },
          {
            key: "tag",
            label: "Tag",
            sortable: true
          },
          {
            key: "degree",
            label: "Degree",
            sortable: true
          },
          {
            key: "percentagePassing",
            label: "Percentage Passing",
            sortable: true
          },
          {
            key: "respondent",
            label: "Respondent",
            sortable: true
          },
          {
            key: "inputTime",
            label: "Input Time",
            sortable: true
          },
          {
            key: "problem",
            label: "",
          }
        ],
        items:[],
        problemButton: {
          id: 'problemButton',
          title: '',
          content: ''
        }
      }
    },
    computed: {
      rows() {
        return this.items.length
      },
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }
    },
    created: function () {
      this.getQuestionData()
    },
    methods: {
      getQuestionData() {
        axios
          .post("https://httpbin.org/response-headers?freeform=%7B%20%20%20%20%20%22questionLib%22%3A%5B%20%20%20%20%20%20%20%7B%22id%22%3A%22a001%22%2C%22title%22%3A%22title01%22%2C%22tag%22%3A%22loop%22%2C%22degree%22%3A%22easy%22%2C%22percentagePassing%22%3A%2250%22%2C%22respondent%22%3A%22100%22%2C%22inputTime%22%3A%2220190101%22%7D%2C%20%20%20%20%20%20%20%7B%22id%22%3A%22a002%22%2C%22title%22%3A%22title01%22%2C%22tag%22%3A%22loop%22%2C%22degree%22%3A%22easy%22%2C%22percentagePassing%22%3A%2250%22%2C%22respondent%22%3A%22100%22%2C%22inputTime%22%3A%2220190101%22%7D%2C%7B%22id%22%3A%22a020%22%2C%22title%22%3A%22title01%22%2C%22tag%22%3A%22loop%22%2C%22degree%22%3A%22easy%22%2C%22percentagePassing%22%3A%2250%22%2C%22respondent%22%3A%22100%22%2C%22inputTime%22%3A%2220190101%22%7D%20%20%20%20%20%5D%2C%20%20%20%20%20%22userName%22%20%3A%20%22amagood%22%2C%20%20%20%20%20%22Class%22%20%3A%20%22CSIE110%22%2C%20%20%20%20%20%22hash%22%20%3A%20%22A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9%22%20%7D", questionLibObj)
          .then(response => {
            tmpobj = JSON.parse(response.data.freeform);
            //console.log(tmpobj.questionLib)
            //console.log(this.items)
            this.items = tmpobj.questionLib
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      clickTarget(Target) {
        this.Target = Target;
        this.Degree = "Degree";
      },
      clickDegree(Degree) {
        this.Degree = Degree;
        this.Target = "Target";
      },
      info(item, index, button) {
        this.problemButton.title = `Row index: ${index}`
        this.problemButton.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', this.problemButton.id, button)
      },
      resetProblemButton() {
        this.problemButton.title = ''
        this.problemButton.content = ''
      },
    }
  })
}