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
    delimiters: ['${', '}'],
    el: "#app-1",
      data() {
        return {
          perPage: 20,//一頁幾行
          currentPage: 1,//當前頁數
          //pageOptions: [5,10, 15],//使用者選擇當前頁數
          filter: null,//Search
          clickAddClass:false,//連結 Class button
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
            {
              key:"selected",
              sortable:false
            }
          ],
          items: [],//每行內容
          selectMode: 'range',//選擇模式，<b-table :select-mode="selectMode">
        }
    },//data end
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
    },//computed end
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
      problemLink(value){
        return `${value}`
      },
      addClass(fields){
        this.clickAddClass=!this.clickAddClass;
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
      }
    },//method end

  })
}

