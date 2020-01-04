var navapp = new Vue({
  delimiters: ['${', '}'],
  el: "#navapp",
  data: {
    userid: "",
    name: "",
    isShow: false, //題目庫顯示
    whichShow: "",
  },
  created() {
    this.chooseProblems()
  },
  methods: {
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

//題目庫資料 request
var questionLibObj = {
  "action": "questionLib",
  "questionNum": "20",//there are twenty question in one page. 一頁幾行
  "questionPage": "1",//1 means select the top 20 question.當前頁數
  "sortDesc": "false",//false:升序
  "sequence": "id",//排序方式
  "target": "tag",//filter
  "degree": "degree",//filter
  "userName": "amagood",
  "Class": "CSIE110",
  "hash": "A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9"
}
var tmpobj = {}
var postURL = ""
//test postURL="https://httpbin.org/response-headers?freeform=%7B%20%20%20%22questionLib%22%3A%20%5B%20%20%20%20%20%7B%20%22id%22%3A%20%22a001%22%2C%20%22title%22%3A%20%22title01%22%2C%20%22target%22%3A%20%22loop%22%2C%20%22degree%22%3A%20%22easy%22%2C%20%22percentagePassing%22%3A%20%2250%22%2C%20%22respondent%22%3A%20%22100%22%2C%20%22inputTime%22%3A%20%2220190101%22%20%7D%2C%20%20%20%20%20%7B%20%22id%22%3A%20%22a002%22%2C%20%22title%22%3A%20%22title02%22%2C%20%22target%22%3A%20%22array%22%2C%20%22degree%22%3A%20%22hard%22%2C%20%22percentagePassing%22%3A%20%2250%22%2C%20%22respondent%22%3A%20%220%22%2C%20%22inputTime%22%3A%20%2220180101%22%20%7D%2C%20%20%20%20%20%7B%20%22id%22%3A%20%22a003%22%2C%20%22title%22%3A%20%22title03%22%2C%20%22target%22%3A%20%22array%22%2C%20%22degree%22%3A%20%22easy%22%2C%20%22percentagePassing%22%3A%20%2250%22%2C%20%22respondent%22%3A%20%2250%22%2C%20%22inputTime%22%3A%20%2220170101%22%20%7D%2C%20%20%20%20%20%7B%20%22id%22%3A%20%22a004%22%2C%20%22title%22%3A%20%22title04%22%2C%20%22target%22%3A%20%22array%22%2C%20%22degree%22%3A%20%22hard%22%2C%20%22percentagePassing%22%3A%20%2250%22%2C%20%22respondent%22%3A%20%2211%22%2C%20%22inputTime%22%3A%20%2220160101%22%20%7D%2C%20%20%20%20%20%7B%20%22id%22%3A%20%22a005%22%2C%20%22title%22%3A%20%22title05%22%2C%20%22target%22%3A%20%22loop%22%2C%20%22degree%22%3A%20%22mid%22%2C%20%22percentagePassing%22%3A%20%2250%22%2C%20%22respondent%22%3A%20%221%22%2C%20%22inputTime%22%3A%20%2220150101%22%20%7D%20%20%20%5D%2C%20%20%20%22userName%22%20%3A%20%22amagood%22%2C%20%20%20%22Class%22%20%3A%20%22CSIE110%22%2C%20%20%20%22hash%22%20%3A%20%22A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9%22%20%7D"

//tag 列表
var tagListObj = {
  "action": "getTagList",
  "Class": "CSIE110",
  "userName": "amagood",
  "hash": "A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9"
}
var tagTmpobj = {}
var tagPostURL = ""
//test tagPostURL="https://httpbin.org/response-headers?freeform=%7B%20%20%20%22tagList%22%3A%5B%20%20%20%20%20%7B%22tag%22%3A%22loop%22%7D%2C%20%20%20%20%20%7B%22tag%22%3A%22if%22%7D%2C%20%20%20%20%20%7B%22tag%22%3A%22array%22%7D%2C%20%20%20%20%20%7B%22tag%22%3A%22string%22%7D%2C%20%20%20%20%20%7B%22tag%22%3A%22pointer%22%7D%2C%20%20%20%20%20%7B%22tag%22%3A%22binary%22%7D%2C%20%20%20%20%20%7B%22tag%22%3A%22Treesort%22%7D%2C%20%20%20%20%20%7B%22tag%22%3A%22dp%22%7D%20%20%20%5D%2C%20%20%20%22userName%22%20%3A%20%22amagood%22%2C%20%20%20%22Class%22%3A%22CSIE110%22%2C%20%20%20%22hash%22%20%3A%20%22A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9%22%20%7D"


var probapp = new Vue({
  delimiters: ['${', '}'],
  el: "#probapp",
  data: {
    tagList: [],//存tag list
    tagButtonText: "tag",//Tag: "tag",//for dropdown buttom
    //get tag
    degreeButtonText: "degree",//Degree: "degree",//for dropdown buttom
    noGetData: true,//loading
    filterData: false,//判斷filter
    filter: null,//text in filter
    sortBy: "id",//排序方式
    sortDesc: false,//false:升序
    //perPage: 2,//一頁幾行
    currentPage: 1,//當前頁數
    totalRows: 1,//總行數
    fields: [
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
        key: "target",
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
        label: "Pass Ratio",
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
    ],
    items: [],
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
    this.getTagList()
  },//created end
  updated() {
    //---updata questionLibObj for changePage---
    if (this.currentPage != parseInt(questionLibObj.questionPage)) {//轉數字
      questionLibObj.questionPage = this.currentPage.toString()//轉字串
      //console.log(questionLibObj)
      console.log("update data for changePage ")
    }

    //---update data for sort---
    if (this.sortBy != questionLibObj.sequence || this.sortDesc.toString() != questionLibObj.sortDesc) {
      this.noGetData = true
      questionLibObj.sequence = this.sortBy
      questionLibObj.sortDesc = this.sortDesc.toString()//轉字串
      if (questionLibObj.sequence == this.sortBy || questionLibObj.sortDesc == this.sortDesc.toString()) {
        //console.log("sort request",questionLibObj)
        this.getQuestionData()
        console.log("update data for sort")
      }
    }

    //---clear filter---
    if (!this.filter && this.filterData) {
      this.noGetData = true
      this.degreeButtonText = "degree"
      this.tagButtonText = "tag"
      questionLibObj.target = this.tagButtonText
      questionLibObj.degree = this.degreeButtonText
      //console.log(questionLibObj)
      this.getQuestionData()
      console.log("clear,get all data")
      this.filterData = false
    }
  },//updated end
  methods: {
    //html b-table(block 2)
    getQuestionData() {
      axios
        .post(postURL, questionLibObj)
        .then(function (response) {
          //console.log(response.data)
          //console.log(JSON.parse(response.data.freeform))//test
          tmpobj = response.data
          probapp.items = tmpobj.questionLib
          /*set problem link*/
          for (i = 0; i < tmpobj.questionLib.length; i++) {
            probapp.items[i] = {
              "id": tmpobj.questionLib[i].id,
              "title": tmpobj.questionLib[i].title,
              "target": tmpobj.questionLib[i].target,
              "degree": tmpobj.questionLib[i].degree,
              "percentagePassing": tmpobj.questionLib[i].percentagePassing,
              "respondent": tmpobj.questionLib[i].respondent,
              "inputTime": tmpobj.questionLib[i].inputTime,
              "link": "problem/" + tmpobj.questionLib[i].id + ".html"
            }
          }
          console.log("response data", probapp.items)
          // Set the initial number of items、totalRows
          probapp.totalRows = probapp.items.length
          //console.log(questionLibObj)
          console.log("get new data from postURL")

          //determine get data due to loading
          probapp.noGetData = false
        })
        .catch(function (error) {
          console.log(error)
        });
    },
    problemLink(value) {
      return `${value}`
    },
    //html dropdown buttom(block 1)
    getTagList() {
      axios
        .post(tagPostURL, tagListObj)
        .then(function (response) {
          //console.log(response.data)
          //console.log(JSON.parse(response.data.freeform))//test
          tagTmpobj = response.data
          probapp.tagList = tagTmpobj.tagList
          //console.log(probapp.tagList)
          console.log("get tag list from tagPostURL")
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    clickTag(Tag) {
      this.tagButtonText = Tag
      questionLibObj.target = this.tagButtonText
      this.degreeButtonText = "degree"
      questionLibObj.degree = "degree"
      if (Tag != "tag") {
        this.noGetData = true
        this.filterData = true
        this.getQuestionData()
        console.log("tag sort get data")
      }
    },
    clickDegree(Degree) {
      this.degreeButtonText = Degree
      questionLibObj.degree = Degree
      this.tagButtonText = "tag"
      questionLibObj.target = "tag"
      if (Degree != "degree") {
        this.noGetData = true
        this.filterData = true
        this.getQuestionData()
        console.log("degree sort get data")
      }
    },
    //html pagination(block3)
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  },//methods end
})


window.onload = () => {
  document.getElementById("probapp").className = "problemLib w3-animate-opacity";
  document.getElementsByTagName("html")[0].style.visibility = "visible";
}