### 2019/10/23 Commit: Show Correct Content of Lang Dropdown
	problem.html  problem.js
		show correct content of lang dropdown
### 2019/10/22 Commit: Test Post 3
	problem.html
		disabled test button, add it to a class
		add event to submit button, add it to a class
		change content of resultBlock, add a slide-fade transition
	problem.css
		add .btnTest .btnSubmit and transition
	problem.js
		delete variables related to counter in app3.data and app3.computed. add other data
		add copyResponseObj(), testPost()
### 2019/10/20 Commit: Test Post 2
	problem.js
		successfully store response
### 2019/10/19 Commit: Test Post
	problem.html
		add axios by using cdn
	problem.js
		restore the encoding
		successfully send a test request, including code
### 2019/10/19 Commit: Change Paths and Filenames
	delete the folder src
	delete the file license.txt
	move the file index.html to front-end/problem.html
	move the file style.css to front-end/css/problem.css
	move the file script.js to front-end/js/problem.js
	move the folder ace-builds-master to front-end/js/lib/ace-builds-master
	move the file README.markdown to front-end/problem.md
	formate documents. mistake: change the encoding of problem.js
### 2019/10/01 Commit: Show Tmp Test Result
	only update flies in the folder "dist"
	index.html
		1. Vue 的模式由 Production (vue.min.js) 改為 Development (vue.js)
		2. 更改 #app3 的內容，顯示 Test 的執行結果，暫時頂著用
	style.css
		1. 刪除 #resultBlock
		2. 新增 .resultBlockAC .resultBlockWA
	script.js
		1. 將 onload() 刪除，保留裡面的東西
		2. 更改Instance app3 的內容，當使用者按下 Test 按鈕後顯示執行結果為AC於下方，再按一次顯示為WA
### 2019/09/29 Commit: Add aceEditor
	only update flies in the folder "dist"
		1. #app 改為分開的三個 #app1, #app2, #app3
		2. 加入 aceEditor ，語言暫時固定為 c_cpp
		3. Language 調整顯示位置， dropup 改為 dropdown 

### ProblemPage
 _A Pen created at CodePen.io. Original URL: [https://codepen.io/k435467/pen/gOYqeMr](https://codepen.io/k435467/pen/gOYqeMr).

 