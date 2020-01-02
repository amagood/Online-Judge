var navapp = new Vue({
	delimiters : ['${', '}'],
	el : "#navapp",
	data : {
		userid : "",
		name : "",
		isShow : false, //題目庫顯示
		whichShow : "",
	},
	created() {
		this.chooseProblems()
	},
	methods: {
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

//題目庫資料 request
var questionLibObj = {//加辨別身分?
  "action": "questionLib",
  "questionNum": "20",//there are twenty question in one page. 
  "questionPage": "1",//1 means select the top 20 question
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

//使用者所有班級
var classList={
  "action" : "getClassList",
  "userName" : "amagood",
  "hash" : "A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9"
}
var classPostURL=""
//test classPostURL="https://httpbin.org/response-headers?freeform=%20%20%7B%20%20%20%20%20%22classList%22%3A%5B%5D%2C%20%20%20%20%20%22userName%22%20%3A%20%22amagood%22%2C%20%20%20%20%20%22hash%22%20%3A%20%22A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9%22%20%20%20%7D"
var classTmpobj={}

//加題目至班級
var addQuestionToClass ={
  "action" : "addClass",
  "addQuestionId" : [],
  "userName" : "amagood",
  "Class" : "",
  "hash" : "A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9"
}
var addQuesPostURL=""
var objItems=[]//table選擇中的item //add class

//創班級
var createClass={
  "action":"createClass",
  "Class":"",
  "userName":"amagood",
  "hash":"A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9"
}
var createClassPostURL=""

var probapp = new Vue({
  delimiters: ['${', '}'],
  el: "#probapp",
  data: {
    isSelected:false,//判斷目前有無選擇
    createClassName:'',//create new class存放新班名字
    classList:[],//存class name list
    classButtonText: "Class",
    //add class
    noGetData: true,//loading
    filterData: false,//判斷filter
    Tag: "tag",//for dropdown buttom
    Degree: "degree",//for dropdown buttom
    filter: null,//text in filter
    sortBy: "id",//排序方式
    sortDesc: false,//false:升序
    //perPage: 20,//一頁幾行
    currentPage: 1,//當前頁數
    totalRows: 1,//總行數
    selectMode: 'multi',//選擇模式['multi', 'single', 'range']
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
      {
        key: "selected",
        label:" ",//add class
        sortable: false
      }
    ],
    items: [],//每行內容

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
    this.getClassList()
  },
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
      //console.log(questionLibObj)
      this.getQuestionData()
      console.log("update data for sort")
    }

    //---clear filter---
    if (!this.filter && this.filterData) {
      this.noGetData = true
      this.Degree = "degree"
      this.Tag = "tag"
      questionLibObj.target = this.Tag
      questionLibObj.degree = this.Degree
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
          tmpobj =response.data
          probapp.items = tmpobj.questionLib
          /*set problem link*/
          for(i=0;i<tmpobj.questionLib.length;i++){//可能會'length' undefined-->response直接傳link
            probapp.items[i]={
              "id":tmpobj.questionLib[i].id,
              "title":tmpobj.questionLib[i].title,
              "target":tmpobj.questionLib[i].target,
              "degree":tmpobj.questionLib[i].degree,
              "percentagePassing":tmpobj.questionLib[i].percentagePassing,
              "respondent":tmpobj.questionLib[i].respondent,
              "inputTime":tmpobj.questionLib[i].inputTime,
              "link":"problem/"+tmpobj.questionLib[i].id+".html"
            }
          }
          console.log(probapp.items)
          // Set the initial number of items、totalRows
          probapp.totalRows = probapp.items.length
          //console.log(questionLibObj)
          console.log("get new data from postURL")

          //determine get data due to loading
          probapp.noGetData = false
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    problemLink(value) {
      return `${value}`
    },
    //html dropdown buttom(block 1)
    clickTag(Tag) {
      this.Tag = Tag
      questionLibObj.target = this.Tag
      this.Degree = "degree"
      questionLibObj.degree = "degree"
      if (Tag != "tag") {
        this.noGetData = true
        this.filterData = true
        this.getQuestionData()
        console.log("tag sort get data")
      }
    },
    clickDegree(Degree) {
      this.Degree = Degree
      questionLibObj.degree = this.Degree
      this.Tag = "tag"
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
    },
    //add class
    getClassList(){
      axios
        .post(classPostURL, classList)
        .then(function (response) {
          //console.log(response.data)
          //console.log(JSON.parse(response.data.freeform))//test
          classTmpobj =response.data
          probapp.classList=classTmpobj.classList
          console.log(probapp.classList)
          console.log("get class list from classPostURL")
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    whenRowSelected(items){//判斷目前有無選擇<b-table @row-selected="whenRowSelected">
      if(items.length){
        this.isSelected=true
        objItems=items
      }
      else{
        this.isSelected=false
      }
    },
    showModal(){//有選擇-->open Add to modal
      if(this.isSelected){
        this.$refs["classModal"].show()
      }
      else{
        this.$bvToast.toast(`Please choose the problem row first!`, {
          title: 'Warning',
          variant: "danger",
          toaster: "b-toaster-top-center"
        })
      }
    },
    clickCreate(evt){//creat new class
      evt.preventDefault()
      this.$refs['classModal'].hide()
      createClass.Class=probapp.createClassName
      //createClassPostURL="https://httpbin.org/response-headers?freeform=%7B%20%20%20%22stats%22%3A%22success%22%2C%20%20%20%22classList%22%3A%5B%20%20%20%20%20%7B%22class%22%3A%22CSIE111%22%7D%2C%20%20%20%20%20%7B%22class%22%3A%22CSIE112%22%7D%2C%20%20%20%20%20%7B%22class%22%3A%22CSIE113%22%7D%20%20%20%5D%2C%20%20%20%22userName%22%3A%22amagood%22%2C%20%20%20%22hash%22%3A%22A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9%22%20%7D"
      //test postURL
      axios
        .post(createClassPostURL, createClass)
        .then(function (response) {
          console.log(createClass)
          //console.log(response.data)
          //console.log(JSON.parse(response.data.freeform))//test
          probapp.classList=response.data.classList
          //console.log(probapp.classList)
          if(response.data.stats == "success"){
            probapp.$bvToast.toast(`Create class <`+probapp.createClassName+`> success !`, {
              title: 'Success',
              variant: "warning",
              toaster: "b-toaster-top-center"
            })
          }
          else{
            probapp.$bvToast.toast(`Create class <`+probapp.createClassName+`> is fail... Please try again !`, {
            title: 'Warning',
            variant: "danger",
            toaster: "b-toaster-top-center"
            })
          }
        })
        .catch(function (error) {
          console.log(error);
        })
        //objItems=目前已選取題目資料
        probapp.clickAddToList(probapp.createClassName)
    },
    clickClass(chooseClass){
      console.log(chooseClass)//傳入班級
      if (chooseClass != "All Problem") {
        probapp.classButtonText = chooseClass
        questionLibObj.Class= chooseClass
        probapp.noGetData = true
        //postURL="https://httpbin.org/response-headers?freeform=%7B%20%20%20%20%20%22questionLib%22%3A%20%5B%20%20%20%20%20%20%20%7B%20%22id%22%3A%20%22a001%22%2C%20%22title%22%3A%20%22title01%22%2C%20%22target%22%3A%20%22loop%22%2C%20%22degree%22%3A%20%22easy%22%2C%20%22percentagePassing%22%3A%20%2250%22%2C%20%22respondent%22%3A%20%22100%22%2C%20%22inputTime%22%3A%20%2220190101%22%20%7D%2C%20%20%20%20%20%20%20%7B%20%22id%22%3A%20%22a003%22%2C%20%22title%22%3A%20%22title03%22%2C%20%22target%22%3A%20%22array%22%2C%20%22degree%22%3A%20%22easy%22%2C%20%22percentagePassing%22%3A%20%2250%22%2C%20%22respondent%22%3A%20%2250%22%2C%20%22inputTime%22%3A%20%2220170101%22%20%7D%20%20%20%20%20%5D%2C%20%20%20%20%20%22userName%22%20%3A%20%22amagood%22%2C%20%20%20%20%20%22Class%22%20%3A%20%22CSIE110%22%2C%20%20%20%20%20%22hash%22%20%3A%20%22A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9%22%20%20%20%7D"
        //test postURL (class problem)
        //console.log(questionLibObj)
        probapp.getQuestionData()
        console.log("class get class data")
      }
      else{
        probapp.noGetData = true
        probapp.classButtonText = "Class"
        questionLibObj.Class= chooseClass
        //postURL="https://httpbin.org/response-headers?freeform=%7B%20%20%20%22questionLib%22%3A%20%5B%20%20%20%20%20%7B%20%22id%22%3A%20%22a001%22%2C%20%22title%22%3A%20%22title01%22%2C%20%22target%22%3A%20%22loop%22%2C%20%22degree%22%3A%20%22easy%22%2C%20%22percentagePassing%22%3A%20%2250%22%2C%20%22respondent%22%3A%20%22100%22%2C%20%22inputTime%22%3A%20%2220190101%22%20%7D%2C%20%20%20%20%20%7B%20%22id%22%3A%20%22a002%22%2C%20%22title%22%3A%20%22title02%22%2C%20%22target%22%3A%20%22array%22%2C%20%22degree%22%3A%20%22hard%22%2C%20%22percentagePassing%22%3A%20%2250%22%2C%20%22respondent%22%3A%20%220%22%2C%20%22inputTime%22%3A%20%2220180101%22%20%7D%2C%20%20%20%20%20%7B%20%22id%22%3A%20%22a003%22%2C%20%22title%22%3A%20%22title03%22%2C%20%22target%22%3A%20%22array%22%2C%20%22degree%22%3A%20%22easy%22%2C%20%22percentagePassing%22%3A%20%2250%22%2C%20%22respondent%22%3A%20%2250%22%2C%20%22inputTime%22%3A%20%2220170101%22%20%7D%2C%20%20%20%20%20%7B%20%22id%22%3A%20%22a004%22%2C%20%22title%22%3A%20%22title04%22%2C%20%22target%22%3A%20%22array%22%2C%20%22degree%22%3A%20%22hard%22%2C%20%22percentagePassing%22%3A%20%2250%22%2C%20%22respondent%22%3A%20%2211%22%2C%20%22inputTime%22%3A%20%2220160101%22%20%7D%2C%20%20%20%20%20%7B%20%22id%22%3A%20%22a005%22%2C%20%22title%22%3A%20%22title05%22%2C%20%22target%22%3A%20%22loop%22%2C%20%22degree%22%3A%20%22mid%22%2C%20%22percentagePassing%22%3A%20%2250%22%2C%20%22respondent%22%3A%20%221%22%2C%20%22inputTime%22%3A%20%2220150101%22%20%7D%20%20%20%5D%2C%20%20%20%22userName%22%20%3A%20%22amagood%22%2C%20%20%20%22Class%22%20%3A%20%22CSIE110%22%2C%20%20%20%22hash%22%20%3A%20%22A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9%22%20%7D"
        //test postURL (all problem)
        //console.log(questionLibObj)
        probapp.getQuestionData()
        console.log("clear class,get all data")
      }
    },
    clickAddToList(chooseClass){//將選取題目加入目前已存在班級
      this.$refs['classModal'].hide()
      //console.log(chooseClass)
      for(var i=0;i<this.classList.length;i++)
      {
        if(this.classList[i].class==chooseClass){
          //console.log(objItems)//目前選取的題目的資料
          var chooseProblemId = []
          for(var j=0;j<objItems.length;j++){
            chooseProblemId[j]=objItems[j].id
          }
          //console.log(chooseProblemId)
          addQuestionToClass.Class=chooseClass
          addQuestionToClass.addQuestionId=chooseProblemId
          //班級不能有重複名字
          //跳出for
        }
      }
      //addQuesPostURL="https://httpbin.org/response-headers?freeform=%7B%20%20%20%22stats%22%20%3A%20%22success%22%2C%20%20%20%22userName%22%20%3A%20%22amagood%22%2C%20%20%20%22Class%22%20%3A%20%22CSIE112%22%2C%20%20%20%22hash%22%20%3A%20%22A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9%22%20%7D"
      //test postURL (success post)
      axios
        .post(addQuesPostURL, addQuestionToClass)
        .then(function (response) {
          //console.log(addQuestionToClass)
          //console.log(response.data)
          //console.log(JSON.parse(response.data.freeform))//test
          if(response.data.stats == "success"){
            objItems=[]
            probapp.clearSelected()
            probapp.makeToast()
          }
          else{
            probapp.$bvToast.toast(`Add promlem to class <`+chooseClass+`> fail... Please try again !`, {
            title: 'Warning',
            variant: "danger",
            toaster: "b-toaster-top-center"
            })
          }
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    clearSelected() {//清空選取
      this.$refs.selectableTable.clearSelected()//<b-table  ref="selectableTable">
    },
    makeToast(append = false) {//成功加入班級提醒
      this.$bvToast.toast(`Add problem success !`, {
        title: 'Success',
        autoHideDelay: 2000,//2 sec
        appendToast: append,
        variant: "success",
        toaster: "b-toaster-top-center"
      })
    }
  },//method end

})


window.onload = () => {
  document.getElementById("probapp").className = "problemLib w3-animate-opacity";
  document.getElementsByTagName("html")[0].style.visibility = "visible";
}