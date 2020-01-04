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
//var postURL = ""
var postURL="https://httpbin.org/response-headers?freeform=%7B%20%20%20%22questionLib%22%3A%20%5B%20%20%20%20%20%7B%20%22id%22%3A%20%22a001%22%2C%20%22title%22%3A%20%22title01%22%2C%20%22target%22%3A%20%22loop%22%2C%20%22degree%22%3A%20%22easy%22%2C%20%22percentagePassing%22%3A%20%2250%22%2C%20%22respondent%22%3A%20%22100%22%2C%20%22inputTime%22%3A%20%2220190101%22%20%7D%2C%20%20%20%20%20%7B%20%22id%22%3A%20%22a002%22%2C%20%22title%22%3A%20%22title02%22%2C%20%22target%22%3A%20%22array%22%2C%20%22degree%22%3A%20%22hard%22%2C%20%22percentagePassing%22%3A%20%2250%22%2C%20%22respondent%22%3A%20%220%22%2C%20%22inputTime%22%3A%20%2220180101%22%20%7D%2C%20%20%20%20%20%7B%20%22id%22%3A%20%22a003%22%2C%20%22title%22%3A%20%22title03%22%2C%20%22target%22%3A%20%22array%22%2C%20%22degree%22%3A%20%22easy%22%2C%20%22percentagePassing%22%3A%20%2250%22%2C%20%22respondent%22%3A%20%2250%22%2C%20%22inputTime%22%3A%20%2220170101%22%20%7D%2C%20%20%20%20%20%7B%20%22id%22%3A%20%22a004%22%2C%20%22title%22%3A%20%22title04%22%2C%20%22target%22%3A%20%22array%22%2C%20%22degree%22%3A%20%22hard%22%2C%20%22percentagePassing%22%3A%20%2250%22%2C%20%22respondent%22%3A%20%2211%22%2C%20%22inputTime%22%3A%20%2220160101%22%20%7D%2C%20%20%20%20%20%7B%20%22id%22%3A%20%22a005%22%2C%20%22title%22%3A%20%22title05%22%2C%20%22target%22%3A%20%22loop%22%2C%20%22degree%22%3A%20%22mid%22%2C%20%22percentagePassing%22%3A%20%2250%22%2C%20%22respondent%22%3A%20%221%22%2C%20%22inputTime%22%3A%20%2220150101%22%20%7D%20%20%20%5D%2C%20%20%20%22userName%22%20%3A%20%22amagood%22%2C%20%20%20%22Class%22%20%3A%20%22CSIE110%22%2C%20%20%20%22hash%22%20%3A%20%22A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9%22%20%7D"

//使用者所有班級
var classList={
  "action" : "getClassList",
  "userName" : "amagood",
  "hash" : "A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9"
}
//var classPostURL=""
var classPostURL="https://httpbin.org/response-headers?freeform=%20%20%7B%20%20%20%20%20%22classList%22%3A%5B%5D%2C%20%20%20%20%20%22userName%22%20%3A%20%22amagood%22%2C%20%20%20%20%20%22hash%22%20%3A%20%22A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9%22%20%20%20%7D"
var classTmpobj={}

//加題目至班級
var addQuestionToClass ={
  "action" : "addQuestionToClass",
  "addQuestionId" : [],
  "userName" : "amagood",
  "Class" : "",
  "hash" : "A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9"
}
var addQuesPostURL=""

//刪除班級題目
var deleteQuestion ={
  "action" : "deleteQuestion",
  "deleteQuestionId" : [],
  "userName" : "amagood",
  "Class" : "",
  "hash" : "A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9"
}
var deleteQuesPostURL=""

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
    //isSelected:false,判斷目前有無選擇
    createClassName:'',//create new class存放新班名字
    classList:[],//存class name list
    classButtonText: "Class",
    rowItemId:'',//click row item + - 
    showDeleteButton:false,//All Problem時false
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
    //selectMode: 'multi',選擇模式['multi', 'single', 'range']<b-table :select-mode="selectMode">
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
          tmpobj =JSON.parse(response.data.freeform)
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
    //class V2
    getClassList(){
      axios
        .post(classPostURL, classList)
        .then(function (response) {
          //console.log(response.data)
          //console.log(JSON.parse(response.data.freeform))//test
          classTmpobj =JSON.parse(response.data.freeform)
          probapp.classList=classTmpobj.classList
          probapp.classList=[
            {"class":"CSIE111"},
            {"class":"CSIE112"},
            {"class":"CSIE113"}
          ]
          console.log(probapp.classList)
          console.log("get class list from classPostURL")
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    showAddToModal(item){
      this.$refs['addToModal'].show()
      this.rowItemId=item.id//存取當前題目資料
    },
    clickCreate(evt){//creat new class
      evt.preventDefault()
      //console.log(evt,probapp.rowItemId)
      this.$refs['addToModal'].hide()
      createClass.Class=probapp.createClassName
      createClassPostURL="https://httpbin.org/response-headers?freeform=%7B%20%20%20%22stats%22%3A%22success%22%2C%20%20%20%22classList%22%3A%5B%20%20%20%20%20%7B%22class%22%3A%22CSIE111%22%7D%2C%20%20%20%20%20%7B%22class%22%3A%22CSIE112%22%7D%2C%20%20%20%20%20%7B%22class%22%3A%22CSIE113%22%7D%20%20%20%5D%2C%20%20%20%22userName%22%3A%22amagood%22%2C%20%20%20%22hash%22%3A%22A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9%22%20%7D"
      //test postURL
      console.log("request createClass",createClass)
      axios
        .post(createClassPostURL, createClass)
        .then(function (response) {
          //console.log(response.data)
          //console.log(JSON.parse(response.data.freeform))//test
          if(JSON.parse(response.data.freeform).stats == "success"){
            probapp.$bvToast.toast(`Create class <`+probapp.createClassName+`> success !`, {
              title: 'Success',
              autoHideDelay: 8000,//8 sec
              variant: "warning",
              toaster: "b-toaster-top-center"
            })
            probapp.getClassList()
            probapp.clickAddToClass(probapp.createClassName)
            probapp.createClassName=''
          }
          else{
            probapp.$bvToast.toast(`Create class <`+probapp.createClassName+`> is fail... Please try again !`, {
            title: 'Error',
            autoHideDelay: 8000,//8 sec
            variant: "danger",
            toaster: "b-toaster-top-center"
            })
          }
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    clickAddToClass(chooseClass) {//將選取題目加入目前已存在班級
      this.$refs['addToModal'].hide()
      //console.log(chooseClass,probapp.rowItemId)
      var nofindClass = true
      for (var i = 0; i < this.classList.length; i++) {
        if (this.classList[i].class == chooseClass) {
          var chooseProblemId = []
          chooseProblemId[0] = probapp.rowItemId
          console.log(chooseProblemId[0] , probapp.rowItemId)
          addQuestionToClass.addQuestionId = chooseProblemId
          addQuestionToClass.Class = chooseClass
          //班級不能有重複名字//id 一次傳一個
          //跳出for
          nofindClass=false
        }
      }
      if(nofindClass){
        console.log("error,didn't find class")
        probapp.$bvToast.toast(`Add promlem to class <` + chooseClass + `> fail... Please try again !`, {
          title: 'Error',
          autoHideDelay: 8000,//8 sec
          variant: "danger",
          toaster: "b-toaster-top-center"
        })
      }
      else{
        addQuesPostURL="https://httpbin.org/response-headers?freeform=%7B%20%20%20%22stats%22%20%3A%20%22success%22%2C%20%20%20%22userName%22%20%3A%20%22amagood%22%2C%20%20%20%22Class%22%20%3A%20%22CSIE112%22%2C%20%20%20%22hash%22%20%3A%20%22A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9%22%20%7D"
      //test postURL (success post)
      console.log("request addQuestionToClass",addQuestionToClass)
      axios
        .post(addQuesPostURL, addQuestionToClass)
        .then(function (response) {
          //console.log(addQuestionToClass)
          //console.log(response.data)
          //console.log(JSON.parse(response.data.freeform))//test
          if (JSON.parse(response.data.freeform).stats == "success") {
            probapp.$bvToast.toast(`Add problem to class <` + chooseClass + `> success !`, {
              title: 'Success',
              autoHideDelay: 8000,//8 sec
              variant: "success",
              toaster: "b-toaster-top-center"
            })
          }
          else {
            probapp.$bvToast.toast(`Add promlem to class <` + chooseClass + `> fail... Please try again !`, {
              title: 'Error',
              autoHideDelay: 8000,//8 sec
              variant: "danger",
              toaster: "b-toaster-top-center"
            })
          }
        })
        .catch(function (error) {
          console.log(error);
        })
      }
      
    },
    showDeleteModal(item){
      this.rowItemId=item.id//存取當前題目資料
      this.$bvModal.msgBoxConfirm('Please confirm that you want to delete <'+item.id+'>'+item.title, {
        title: 'Please Confirm',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'Yes',
        cancelVariant: 'secondary',
        cancelTitle: 'Cancel',
        headerBgVariant:'secondary',
        headerTextVariant:'light',
        footerBgVariant:'light'
      })
      .then(value => {//true:ok/false:cancel
        if(value){
          this.noGetData = true
          probapp.deleteProblem()
          probapp.getQuestionData()
          console.log("class delete problem get data")
        }
      })
      .catch(error => {
        console.log(error);
      })
    },
    deleteProblem() {//刪除班級題目
      var chooseProblemId = []
      chooseProblemId[0] = probapp.rowItemId//id 一次傳一個
      deleteQuestion.deleteQuestionId = chooseProblemId
      deleteQuesPostURL="https://httpbin.org/response-headers?freeform=%7B%20%20%20%22stats%22%20%3A%20%22success%22%2C%20%20%20%22userName%22%20%3A%20%22amagood%22%2C%20%20%20%22Class%22%20%3A%20%22CSIE112%22%2C%20%20%20%22hash%22%20%3A%20%22A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9%22%20%7D"

      //test postURL (success post)
      console.log("request deleteQuestion",deleteQuestion)
      axios
        .post(deleteQuesPostURL, deleteQuestion)
        .then(function (response) {
          //console.log(response.data)
          //console.log(JSON.parse(response.data.freeform))//test
          if (JSON.parse(response.data.freeform).stats == "success") {
            probapp.$bvToast.toast(`Delete success !`, {
              title: 'Delete',
              autoHideDelay: 8000,//8 sec
              variant: "warning",
              toaster: "b-toaster-top-center"
            })
          }
          else {
            probapp.$bvToast.toast(`Delete fail... Please try again !`, {
              title: 'Error',
              autoHideDelay: 8000,//8 sec
              variant: "danger",
              toaster: "b-toaster-top-center"
            })
          }
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    clickClass(chooseClass){
      console.log(chooseClass)//傳入班級
      if (chooseClass != "All Problem") {
        probapp.classButtonText = chooseClass
        questionLibObj.Class= chooseClass
        probapp.noGetData = true
        probapp.showDeleteButton=true
        //postURL="https://httpbin.org/response-headers?freeform=%7B%20%20%20%20%20%22questionLib%22%3A%20%5B%20%20%20%20%20%20%20%7B%20%22id%22%3A%20%22a001%22%2C%20%22title%22%3A%20%22title01%22%2C%20%22target%22%3A%20%22loop%22%2C%20%22degree%22%3A%20%22easy%22%2C%20%22percentagePassing%22%3A%20%2250%22%2C%20%22respondent%22%3A%20%22100%22%2C%20%22inputTime%22%3A%20%2220190101%22%20%7D%2C%20%20%20%20%20%20%20%7B%20%22id%22%3A%20%22a003%22%2C%20%22title%22%3A%20%22title03%22%2C%20%22target%22%3A%20%22array%22%2C%20%22degree%22%3A%20%22easy%22%2C%20%22percentagePassing%22%3A%20%2250%22%2C%20%22respondent%22%3A%20%2250%22%2C%20%22inputTime%22%3A%20%2220170101%22%20%7D%20%20%20%20%20%5D%2C%20%20%20%20%20%22userName%22%20%3A%20%22amagood%22%2C%20%20%20%20%20%22Class%22%20%3A%20%22CSIE110%22%2C%20%20%20%20%20%22hash%22%20%3A%20%22A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9%22%20%20%20%7D"
        //test postURL (class problem)
        console.log("request changeClass",questionLibObj)
        probapp.getQuestionData()
        console.log("class get class data")
      }
      else{
        probapp.noGetData = true
        probapp.showDeleteButton=false
        probapp.classButtonText = "Class"
        questionLibObj.Class= chooseClass
        //postURL="https://httpbin.org/response-headers?freeform=%7B%20%20%20%22questionLib%22%3A%20%5B%20%20%20%20%20%7B%20%22id%22%3A%20%22a001%22%2C%20%22title%22%3A%20%22title01%22%2C%20%22target%22%3A%20%22loop%22%2C%20%22degree%22%3A%20%22easy%22%2C%20%22percentagePassing%22%3A%20%2250%22%2C%20%22respondent%22%3A%20%22100%22%2C%20%22inputTime%22%3A%20%2220190101%22%20%7D%2C%20%20%20%20%20%7B%20%22id%22%3A%20%22a002%22%2C%20%22title%22%3A%20%22title02%22%2C%20%22target%22%3A%20%22array%22%2C%20%22degree%22%3A%20%22hard%22%2C%20%22percentagePassing%22%3A%20%2250%22%2C%20%22respondent%22%3A%20%220%22%2C%20%22inputTime%22%3A%20%2220180101%22%20%7D%2C%20%20%20%20%20%7B%20%22id%22%3A%20%22a003%22%2C%20%22title%22%3A%20%22title03%22%2C%20%22target%22%3A%20%22array%22%2C%20%22degree%22%3A%20%22easy%22%2C%20%22percentagePassing%22%3A%20%2250%22%2C%20%22respondent%22%3A%20%2250%22%2C%20%22inputTime%22%3A%20%2220170101%22%20%7D%2C%20%20%20%20%20%7B%20%22id%22%3A%20%22a004%22%2C%20%22title%22%3A%20%22title04%22%2C%20%22target%22%3A%20%22array%22%2C%20%22degree%22%3A%20%22hard%22%2C%20%22percentagePassing%22%3A%20%2250%22%2C%20%22respondent%22%3A%20%2211%22%2C%20%22inputTime%22%3A%20%2220160101%22%20%7D%2C%20%20%20%20%20%7B%20%22id%22%3A%20%22a005%22%2C%20%22title%22%3A%20%22title05%22%2C%20%22target%22%3A%20%22loop%22%2C%20%22degree%22%3A%20%22mid%22%2C%20%22percentagePassing%22%3A%20%2250%22%2C%20%22respondent%22%3A%20%221%22%2C%20%22inputTime%22%3A%20%2220150101%22%20%7D%20%20%20%5D%2C%20%20%20%22userName%22%20%3A%20%22amagood%22%2C%20%20%20%22Class%22%20%3A%20%22CSIE110%22%2C%20%20%20%22hash%22%20%3A%20%22A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9%22%20%7D"
        //test postURL (all problem)
        console.log("request changeClass",questionLibObj)
        probapp.getQuestionData()
        console.log("clear class,get all data")
      }
    }
  },//method end

})


window.onload = () => {
  document.getElementById("probapp").className = "problemLib w3-animate-opacity";
  document.getElementsByTagName("html")[0].style.visibility = "visible";
}