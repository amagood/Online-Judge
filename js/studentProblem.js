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
        filter: null,//Search
        fields: [
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
        items: [
          { title: "question001", target: "loop", degree: "easy", pp: "50%", respondent: "100", time: "20190101" },
          { title: "question002", target: "loop", degree: "easy", pp: "50%", respondent: "100", time: "20180101" },
          { title: "question003", target: "count", degree: "hard", pp: "50%", respondent: "100", time: "20170101" },
          { title: "question004", target: "array", degree: "easy", pp: "50%", respondent: "100", time: "20190501" },
          { title: "question005", target: "function", degree: "midium", pp: "50%", respondent: "100", time: "20190131" }, 
        ]
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
    }
  })
}