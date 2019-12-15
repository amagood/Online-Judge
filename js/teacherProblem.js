var navapp = new Vue({
  delimiters: ['${', '}'],
  el: "#navapp",
  data: {
    userid: "",
    name: "",
    isShow: false,
    whichShow: "",
  },
  created() {
    this.test()
    this.chooseProblems()
  },
  methods: {
    test() {//測試
      localStorage.setItem("who", "student")
      localStorage.setItem("userName", "i")
      let who = localStorage.getItem("who")
      console.log(who)
    },
    chooseProblems() {
      let self = this
      self.name = localStorage.getItem("userName")
      self.userid = localStorage.getItem("who")
      if (self.userid === "admin" || self.userid === "teacher") {
        self.isShow = true
        self.whichShow = "teacher"
      }
      else if (self.userid === "student") {
        self.isShow = true
        self.whichShow = "student"
      }
    },
    clearStorage() {
      localStorage.clear();
    },
  },
})
var questionLibObj = {
  "action": "questionLib",
  "questionNum": "2",//there are twenty question in one page. 
  "questionPage": "1",//1 means select the top 20 question
  "sequence": "id",
  "tag": "Tag",
  "degree": "Degree",
  "userName": "amagood",
  "Class": "CSIE110",
  "hash": "A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9"
}
var tmpobj = {}
var postURL = "https://httpbin.org/response-headers?freeform=%7B%20%20%20%22questionLib%22%3A%20%5B%20%20%20%20%20%7B%20%22id%22%3A%20%22a001%22%2C%20%22title%22%3A%20%22title01%22%2C%20%22tag%22%3A%20%22loop%22%2C%20%22degree%22%3A%20%22easy%22%2C%20%22percentagePassing%22%3A%20%2250%22%2C%20%22respondent%22%3A%20%22100%22%2C%20%22inputTime%22%3A%20%2220190101%22%20%7D%2C%20%20%20%20%20%7B%20%22id%22%3A%20%22a002%22%2C%20%22title%22%3A%20%22title01%22%2C%20%22tag%22%3A%20%22array%22%2C%20%22degree%22%3A%20%22hard%22%2C%20%22percentagePassing%22%3A%20%2250%22%2C%20%22respondent%22%3A%20%220%22%2C%20%22inputTime%22%3A%20%2220180101%22%20%7D%2C%20%20%20%20%20%7B%20%22id%22%3A%20%22a003%22%2C%20%22title%22%3A%20%22title01%22%2C%20%22tag%22%3A%20%22array%22%2C%20%22degree%22%3A%20%22easy%22%2C%20%22percentagePassing%22%3A%20%2250%22%2C%20%22respondent%22%3A%20%2250%22%2C%20%22inputTime%22%3A%20%2220170101%22%20%7D%2C%20%20%20%20%20%7B%20%22id%22%3A%20%22a004%22%2C%20%22title%22%3A%20%22title01%22%2C%20%22tag%22%3A%20%22array%22%2C%20%22degree%22%3A%20%22hard%22%2C%20%22percentagePassing%22%3A%20%2250%22%2C%20%22respondent%22%3A%20%2211%22%2C%20%22inputTime%22%3A%20%2220160101%22%20%7D%2C%20%20%20%20%20%7B%20%22id%22%3A%20%22a005%22%2C%20%22title%22%3A%20%22title01%22%2C%20%22tag%22%3A%20%22loop%22%2C%20%22degree%22%3A%20%22mid%22%2C%20%22percentagePassing%22%3A%20%2250%22%2C%20%22respondent%22%3A%20%221%22%2C%20%22inputTime%22%3A%20%2220150101%22%20%7D%20%20%20%5D%2C%20%20%20%22userName%22%20%3A%20%22amagood%22%2C%20%20%20%22Class%22%20%3A%20%22CSIE110%22%2C%20%20%20%22hash%22%20%3A%20%22A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9%22%20%7D%20"

//判斷filter
var noFilterData=0

window.onload = () => {
  new Vue({
    delimiters: ['${', '}'],
    el: "#probapp",
    data() {
      return {
        getData:false,
        Tag: "Tag",//for dropdown buttom
        Degree: "Degree",//for dropdown buttom
        filter: null,//Search
        sortBy: "id",//排序方式
        sortDesc: false,//false:升序
        //perPage: 20,//一頁幾行
        currentPage: 1,//當前頁數
        totalRows: 1,//總行數
        //pageOptions: [5,10, 15],//使用者選擇當前頁數
        clickAddClass: false,//連結 Class button
        showDismissibleAlert: false,//add class bar 
        modes: ['multi', 'single', 'range'],//選擇模式多選、一次一行、shirt/ctrl選範圍
        fields: [//table 每列項目,用來取整列值
          {
            key: "id",
            label: "#",
            sortable: true
          },
          {
            key: "title",
            label: "Title",
            sortable: false,
            formatter: "problemLink"
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
            key: "selected",
            sortable: false
          }
        ],
        items: [],//每行內容
        selectMode: 'range',//選擇模式，<b-table :select-mode="selectMode">
      }
    },//data end
    computed: {
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }
    },//computed end
    created() {
      this.getQuestionData()
    },
    updated() {
      //---updata questionLibObj---
      if (this.currentPage != questionLibObj.questionPage || this.sortBy != questionLibObj.sequence) {
        questionLibObj.questionPage = this.currentPage.toString()//轉字串
        questionLibObj.sequence = this.sortBy
        console.log(questionLibObj)
      }

      //---clear filter---
      if (!this.filter&&noFilterData) {
        this.Degree = "Degree"
        this.Tag = "Tag"
        questionLibObj.tag = this.Tag
        questionLibObj.degree = this.Degree
        console.log(questionLibObj)
        //postURL = "https://httpbin.org/response-headers?freeform=%7B%20%20%20%22questionLib%22%3A%20%5B%20%20%20%20%20%7B%20%22id%22%3A%20%22a001%22%2C%20%22title%22%3A%20%22title01%22%2C%20%22tag%22%3A%20%22loop%22%2C%20%22degree%22%3A%20%22easy%22%2C%20%22percentagePassing%22%3A%20%2250%22%2C%20%22respondent%22%3A%20%22100%22%2C%20%22inputTime%22%3A%20%2220190101%22%20%7D%2C%20%20%20%20%20%7B%20%22id%22%3A%20%22a002%22%2C%20%22title%22%3A%20%22title01%22%2C%20%22tag%22%3A%20%22array%22%2C%20%22degree%22%3A%20%22hard%22%2C%20%22percentagePassing%22%3A%20%2250%22%2C%20%22respondent%22%3A%20%220%22%2C%20%22inputTime%22%3A%20%2220180101%22%20%7D%2C%20%20%20%20%20%7B%20%22id%22%3A%20%22a003%22%2C%20%22title%22%3A%20%22title01%22%2C%20%22tag%22%3A%20%22array%22%2C%20%22degree%22%3A%20%22easy%22%2C%20%22percentagePassing%22%3A%20%2250%22%2C%20%22respondent%22%3A%20%2250%22%2C%20%22inputTime%22%3A%20%2220170101%22%20%7D%2C%20%20%20%20%20%7B%20%22id%22%3A%20%22a004%22%2C%20%22title%22%3A%20%22title01%22%2C%20%22tag%22%3A%20%22array%22%2C%20%22degree%22%3A%20%22hard%22%2C%20%22percentagePassing%22%3A%20%2250%22%2C%20%22respondent%22%3A%20%2211%22%2C%20%22inputTime%22%3A%20%2220160101%22%20%7D%2C%20%20%20%20%20%7B%20%22id%22%3A%20%22p000%22%2C%20%22title%22%3A%20%22title01%22%2C%20%22tag%22%3A%20%22loop%22%2C%20%22degree%22%3A%20%22mid%22%2C%20%22percentagePassing%22%3A%20%2250%22%2C%20%22respondent%22%3A%20%221%22%2C%20%22inputTime%22%3A%20%2220150101%22%20%7D%20%20%20%5D%2C%20%20%20%22userName%22%20%3A%20%22amagood%22%2C%20%20%20%22Class%22%20%3A%20%22CSIE110%22%2C%20%20%20%22hash%22%20%3A%20%22A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9%22%20%7D"
        this.getQuestionData()
        console.log("clear,get all data")
        noFilterData=0
      }
    },
    methods: {
      getQuestionData() {
        axios
          .post(postURL, questionLibObj)
          .then(response => {
            tmpobj = JSON.parse(response.data.freeform);
            this.items = tmpobj.questionLib

            // Set the initial number of items、totalRows
            this.totalRows = this.items.length

            console.log("get new data from postURL")
            this.getData=true
            console.log(this.getData)
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      problemLink(value) {
        return `${value}`
      },
      addClass(fields) {
        this.clickAddClass = !this.clickAddClass;
        //showDismissibleAlert=!showDismissibleAlert;

        /*if(this.clickAddClass){
          document.getElementById("addClassBar").style.display="block";
        }
        else{
          document.getElementById("addClassBar").style.display="none";
        }
        if(this.clickAddClass){
          this.fields.push({
            key:"add",
            label: "Add",
            sortable:false
          })
        }
        else{
          this.fields.splice()
        }*/
      },
      //mainblock1
      clickTag(Tag) {
        this.Tag = Tag
        questionLibObj.tag = this.Tag
        this.Degree = "Degree"
        questionLibObj.degree = "Degree"
        //console.log(questionLibObj)
        noFilterData=1
        //postURL="https://httpbin.org/response-headers?freeform=%7B%20%20%20%22questionLib%22%3A%20%5B%20%20%20%20%20%7B%20%22id%22%3A%20%22a001%22%2C%20%22title%22%3A%20%22title01%22%2C%20%22tag%22%3A%20%22loop%22%2C%20%22degree%22%3A%20%22easy%22%2C%20%22percentagePassing%22%3A%20%2250%22%2C%20%22respondent%22%3A%20%22100%22%2C%20%22inputTime%22%3A%20%2220190101%22%20%7D%2C%20%20%20%20%20%7B%20%22id%22%3A%20%22p000%22%2C%20%22title%22%3A%20%22title01%22%2C%20%22tag%22%3A%20%22loop%22%2C%20%22degree%22%3A%20%22mid%22%2C%20%22percentagePassing%22%3A%20%2250%22%2C%20%22respondent%22%3A%20%221%22%2C%20%22inputTime%22%3A%20%2220150101%22%20%7D%20%20%20%5D%2C%20%20%20%22userName%22%20%3A%20%22amagood%22%2C%20%20%20%22Class%22%20%3A%20%22CSIE110%22%2C%20%20%20%22hash%22%20%3A%20%22A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9%22%20%7D"
        this.getQuestionData()
        console.log("tag sort get data")
      },
      clickDegree(Degree) {
        this.Degree = Degree
        questionLibObj.degree = this.Degree
        this.Tag = "Tag"
        questionLibObj.tag = "Tag"
        //console.log(questionLibObj)
        noFilterData=1
        this.getQuestionData()
        console.log("degree sort get data")
      },
      //mainblock3
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    },//method end

  })
  document.getElementById("mainBlockStudentProblem").className = "mainBlockStudentProblem w3-animate-opacity";
  document.getElementsByTagName("html")[0].style.visibility = "visible";
}

