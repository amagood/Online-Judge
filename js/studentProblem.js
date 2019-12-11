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
		test(){//測試
			localStorage.setItem("who","student")
			localStorage.setItem("userName","i")
			let who = localStorage.getItem("who")
			console.log(who)
		},
		chooseProblems(){
			let self = this
			self.name = localStorage.getItem("userName")
			self.userid = localStorage.getItem("who")
			if(self.userid === "admin"||self.userid === "teacher"){
				self.isShow = true
				self.whichShow = "teacher"
			}
			else if(self.userid === "student"){
				self.isShow = true
				self.whichShow = "student"
			}
		},
		clearStorage(){
			localStorage.clear();
		},
	},
})

var questionLibObj = {
  "action": "questionLib",
  "questionNum": "2",//there are twenty question in one page. 一頁幾行
  "questionPage": "1",//1 means select the top 20 question.當前頁數
  "sequence": "id",//排序方式,API少升降序
  "tag": "Tag",//filter
  "degree": "Degree",//filter
  "userName": "amagood",
  "Class": "CSIE110",
  "hash": "A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9"
}
var tmpobj = {}

window.onload = () => {
  new Vue({
    delimiters: ['${', '}'],
    el: "#probapp",
    data() {
      return {
        Tag: "Tag",//for dropdown buttom
        Degree: "Degree",//for dropdown buttom
        sortBy: "id",//排序方式
        sortDesc: false,//false:升序
        //perPage: 2,//一頁幾行
        currentPage: 1,//當前頁數
        totalRows:1,//總行數
        filter: null,//text in filter
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
            formatter:"problemLink"
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
        ],
        items: [],
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
    created(){
      this.getQuestionData()
    },//created end
    updated(){
      //---updata questionLibObj---
      //console.log(questionLibObj.questionPage)
      if(this.currentPage!=questionLibObj.questionPage||this.sortBy!=questionLibObj.sequence){
        questionLibObj.questionPage=this.currentPage.toString()//轉字串
        questionLibObj.sequence=this.sortBy
        console.log(questionLibObj)
      }
      //console.log(questionLibObj.questionPage)
      //console.log(this.sortBy,this.sortDesc)

      //---clear filter---
      //console.log(this.filter)
      if(!this.filter){
        this.Degree = "Degree"
        this.Tag = "Tag"
        questionLibObj.tag=this.Tag
        questionLibObj.degree=this.Degree
        console.log(questionLibObj)
      }
    },
    methods: {
      //mainblock2
      getQuestionData() {
        axios
        .post("https://httpbin.org/response-headers?freeform=%7B%20%20%20%22questionLib%22%3A%20%5B%20%20%20%20%20%7B%20%22id%22%3A%20%22a001%22%2C%20%22title%22%3A%20%22title01%22%2C%20%22tag%22%3A%20%22loop%22%2C%20%22degree%22%3A%20%22easy%22%2C%20%22percentagePassing%22%3A%20%2250%22%2C%20%22respondent%22%3A%20%22100%22%2C%20%22inputTime%22%3A%20%2220190101%22%20%7D%2C%20%20%20%20%20%7B%20%22id%22%3A%20%22a002%22%2C%20%22title%22%3A%20%22title01%22%2C%20%22tag%22%3A%20%22array%22%2C%20%22degree%22%3A%20%22hard%22%2C%20%22percentagePassing%22%3A%20%2250%22%2C%20%22respondent%22%3A%20%220%22%2C%20%22inputTime%22%3A%20%2220180101%22%20%7D%2C%20%20%20%20%20%7B%20%22id%22%3A%20%22a003%22%2C%20%22title%22%3A%20%22title01%22%2C%20%22tag%22%3A%20%22array%22%2C%20%22degree%22%3A%20%22easy%22%2C%20%22percentagePassing%22%3A%20%2250%22%2C%20%22respondent%22%3A%20%2250%22%2C%20%22inputTime%22%3A%20%2220170101%22%20%7D%2C%20%20%20%20%20%7B%20%22id%22%3A%20%22a004%22%2C%20%22title%22%3A%20%22title01%22%2C%20%22tag%22%3A%20%22array%22%2C%20%22degree%22%3A%20%22hard%22%2C%20%22percentagePassing%22%3A%20%2250%22%2C%20%22respondent%22%3A%20%2211%22%2C%20%22inputTime%22%3A%20%2220160101%22%20%7D%2C%20%20%20%20%20%7B%20%22id%22%3A%20%22a005%22%2C%20%22title%22%3A%20%22title01%22%2C%20%22tag%22%3A%20%22loop%22%2C%20%22degree%22%3A%20%22mid%22%2C%20%22percentagePassing%22%3A%20%2250%22%2C%20%22respondent%22%3A%20%221%22%2C%20%22inputTime%22%3A%20%2220150101%22%20%7D%20%20%20%5D%2C%20%20%20%22userName%22%20%3A%20%22amagood%22%2C%20%20%20%22Class%22%20%3A%20%22CSIE110%22%2C%20%20%20%22hash%22%20%3A%20%22A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9%22%20%7D%20",questionLibObj)
        .then(response => {
            //console.log(response.data.freeform)
            tmpobj = JSON.parse(response.data.freeform)
            //console.log(tmpobj.questionLib)
            //console.log(this.items)
            this.items = tmpobj.questionLib

            // Set the initial number of items、totalRows
            this.totalRows = this.items.length
            //console.log(this.items.length)
          })
          .catch(function (error) {
            console.log(error)
          });
      },
      problemLink(value){
        return `${value}`
      },
      //mainblock1
      clickTag(Tag) {
        this.Tag = Tag
        this.Degree = "Degree"
        questionLibObj.tag=this.Tag
        console.log(questionLibObj)
      },
      clickDegree(Degree) {
        this.Degree = Degree
        this.Tag = "Tag"
        questionLibObj.degree=this.Degree
      },
      //mainblock3
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    },//methods end
  })
}
/*response example
{
  "questionLib": [
    { "id": "a001", "title": "title01", "tag": "loop", "degree": "easy", "percentagePassing": "50", "respondent": "100", "inputTime": "20190101" },
    { "id": "a002", "title": "title01", "tag": "array", "degree": "hard", "percentagePassing": "50", "respondent": "0", "inputTime": "20180101" },
    { "id": "a003", "title": "title01", "tag": "array", "degree": "easy", "percentagePassing": "50", "respondent": "50", "inputTime": "20170101" },
    { "id": "a004", "title": "title01", "tag": "array", "degree": "hard", "percentagePassing": "50", "respondent": "11", "inputTime": "20160101" },
    { "id": "a005", "title": "title01", "tag": "loop", "degree": "mid", "percentagePassing": "50", "respondent": "1", "inputTime": "20150101" }
  ],
  "userName" : "amagood",
  "Class" : "CSIE110",
  "hash" : "A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9"
} 
*/