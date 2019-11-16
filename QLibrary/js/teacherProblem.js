window.onload = () => {
  new Vue({ el: '#app' })
}


window.onload = () => {
  new Vue({
    el: '#app',
      data() {
        return {
          clickAddClass:false,
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
            }
          ],
          items: [//每行內容
            { title: "question001", target:"loop" ,degree:"easy",pp:"50%",respondent:"100",time:"20190101" },
            { title: "question002", target:"loop" ,degree:"easy",pp:"50%",respondent:"100",time:"20180101" },
            { title: "question003", target:"count" ,degree:"hard",pp:"50%",respondent:"100",time:"20170101" },
            { title: "question004", target:"array" ,degree:"easy",pp:"50%",respondent:"100",time:"20190501" },
            { title: "question005", target:"function" ,degree:"midium",pp:"50%",respondent:"100",time:"20190131" }
          ],
          selectMode: 'range',//選擇模式，<b-table :select-mode="selectMode">
        }
    },//data end
    methods: {
      addClass(fields){
        this.clickAddClass=!this.clickAddClass
        /*if(this.clickAddClass){
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
    }//method end
  })
}