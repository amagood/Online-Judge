window.onload = () => {
  new Vue({ el: '#app' })
}

window.onload = () => {
  new Vue({
    el: '#app-1',
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
              key: "title",
              label: "Title",
              sortable: true
            },
            {
              key: "target",
              label: "Target",
              sortable: true
            },
            {
              key: "degree",
              label: "Degree",
              sortable: true
            },
            {
              key: "pp",
              label: "Percentage Passing",
              sortable: true
            },
            {
              key: "respondent",
              label: "Respondent",
              sortable: true
            },
            {
              key: "time",
              label: "Input Time",
              sortable: true
            },
            {
              key:"selected",
              sortable:false
            }
          ],
          items: [//每行內容
            { title: "question001", target:"loop" ,degree:"easy",pp:"50%",respondent:"100",time:"20190101" },
            { title: "question002", target:"loop" ,degree:"easy",pp:"50%",respondent:"100",time:"20180101" },
            { title: "question003", target:"count" ,degree:"hard",pp:"50%",respondent:"100",time:"20170101" },
            { title: "question004", target:"array" ,degree:"easy",pp:"50%",respondent:"100",time:"20190501" },
            { title: "question005", target:"function" ,degree:"medium",pp:"50%",respondent:"100",time:"20190131" },
            { title: "question006", target: "loop", degree: "easy", pp: "50%", respondent: "100", time: "20190101" },
            { title: "question007", target: "loop", degree: "easy", pp: "50%", respondent: "100", time: "20180101" },
            { title: "question008", target: "count", degree: "hard", pp: "50%", respondent: "100", time: "20170101" },
            { title: "question009", target: "array", degree: "easy", pp: "50%", respondent: "100", time: "20190501" },
            { title: "question0010", target: "function", degree: "medium", pp: "50%", respondent: "100", time: "20190131" },
            { title: "question011", target: "loop", degree: "easy", pp: "50%", respondent: "100", time: "20190101" },
            { title: "question012", target: "loop", degree: "easy", pp: "50%", respondent: "100", time: "20180101" },
            { title: "question013", target: "count", degree: "hard", pp: "50%", respondent: "100", time: "20170101" },
            { title: "question014", target: "array", degree: "easy", pp: "50%", respondent: "100", time: "20190501" },
            { title: "question015", target: "function", degree: "medium", pp: "50%", respondent: "100", time: "20190131" },
            { title: "question016", target: "loop", degree: "easy", pp: "50%", respondent: "100", time: "20190101" },
            { title: "question017", target: "loop", degree: "easy", pp: "50%", respondent: "100", time: "20180101" },
            { title: "question018", target: "count", degree: "hard", pp: "50%", respondent: "100", time: "20170101" },
            { title: "question019", target: "array", degree: "easy", pp: "50%", respondent: "100", time: "20190501" },
            { title: "question020", target: "array", degree: "easy", pp: "50%", respondent: "100", time: "20190501" },
            { title: "question021", target: "function", degree: "medium", pp: "50%", respondent: "100", time: "20190131" },
            { title: "question022", target: "loop", degree: "easy", pp: "50%", respondent: "100", time: "20190101" },
            { title: "question023", target: "loop", degree: "easy", pp: "50%", respondent: "100", time: "20180101" },
            { title: "question024", target: "count", degree: "hard", pp: "50%", respondent: "100", time: "20170101" },
            { title: "question025", target: "array", degree: "easy", pp: "50%", respondent: "100", time: "20190501" },
          ],
          selectMode: 'multi',//選擇模式，<b-table :select-mode="selectMode">
        }
    },//data end
    methods: {
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
    }//computed end
  })
}

