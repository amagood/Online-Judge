p000.html for server  
p000_local.html for local test
# Feature
- live autocompletion
- automatic indent and outdent
- highlight matching parentheses
- highlight selected word
- multiple cursors and selections
- indent guides
- code folding
- overscroll
- search (regular expression, case sensitive, whole word, replace)
- [Shortcuts](https://github.com/ajaxorg/ace/wiki/Default-Keyboard-Shortcuts)  
`Ctrl-+/=` : Increase font-size  
`Ctrl--` : Decrease font-size  
`F11` : Toggle FullScreen  
- Line Operations:  
`Ctrl-/` : comment or uncomment  
`Ctrl-D` : remove line  
`Alt-Shift-Down/Up` : Copy lines down/up  
`Alt-Delete/Backspace` : Remove to line end/start  
`Ctrl-Delete/Backspace` : Remove word right/left  
- Go to:  
`Ctrl-L` : Go to line  
`Ctrl-Down/Up` : Scroll line down/up  
---
## API
```
{  //submit request
    "action" : "submit_code",
    "qID" : ex"p001",
    "language" : "cpp"||"c"||"python",
    "fileAmount": 0,
    "file":
    {
        "file1" : "code_string..................",  //main.cpp || main.c
        "file2" : "code_string..................",
        "file3" : "code_string.................."
    },
    "headerFileAmount": 0,
    "headerFile":
    {
        "file1" : "code_string..................",  //1.h
        "file2" : "code_string..................",  //2.h
        "file3" : "code_string.................."   //3.h
    },
    "userName" : ex"amagood",
    "Class" : ex"CSIE110",
    "hash" : "A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9"
}
```
```
{  //submit response
    "codeState" : "AC" || "CE" || "TLE" || "WA" || "MLE",
    "errorMessage" : ex"string..........",
    "exeTime" : ex"99999ms",
    "errorOutputCompare" : "size",
    "OutputAvailable": "true" || "false",
    "wrongOutput" : "0",
    "expectedOutput" : "3",
    "memoryUsage" : "72KB",
    "verdictTime" : "11:59:59  2019/01/01"
    "userName" : ex"amagood",
    "Class" : ex"CSIE110",
    "hash" : "A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9"
}
```
----
### 2019/12/27 Tab
	html css js only p000_local.html will work correctly
### 2019/12/27 WA output available
	html js hide output result when outputAvailable is false
### 2019/12/26 Problem with PDF
	p000pdf.html p000pdf.pdf
### 2019/12/23 Login before submit
	js disable submit button when user is not logged in
### 2019/12/23 qID
	html js submit.qID = qID when onload
### 2019/12/21 Update server-specific file
	update p000.html
### 2019/12/21 New implement on upload file
	js
	max file amount of implementFile/headerFile set by the global variable named "maxFileAmount" (value is 10)
### 2019/12/21 Hide upload header files in py mode
	html js hide and clear upload header files when change to py mode
### 2019/12/21 InitCode
	html js set initial code on editor
	solve the problem about header file like <stdio.h> would become a html tag
### 2019/12/21 Update navbar
	html js update navbar: index v1.2, OnlyNavbar modeify
	get userName and hash when onload
### 2019/12/16 Fix typo error
	js uploadFileApp,headerFile2String
### 2019/12/12 Improve styling on upload file block
	css right: 0; max-width: 500px;
### 2019/12/12 fix bug: upload header file
	js fix bug : read implementFile when upload headerFile
### 2019/12/09 fileAmount
	js submitObj.fileAmount, submitObj.headerFileAmount
### 2019/12/08 Submit Uploaded File
	html css js submit uploaded files when the btn Upload files is toggled.
	Maximum number of files: 1main, 2files, 2header files.
### 2019/11/30 Navbar
	html css js
### 2019/11/30 Result Info
	html css js  content of submit result
### 2019/11/25 codeStats -> codeState
	html css js
### 2019/11/22 UserInfo
	js show userInfo in console
### 2019/11/18 Submit CD, Init Transition
	html js
	set CD(2s) on submit button
	init transition start after onload
### 2019/11/16 Fix Code Editor Fullscreen Bug
	css body.fullScreen height 100vh
### 2019/11/16 Dragbar, Popup Transition
	html css js
	dragbar for resize code editor
	copy popup use different transition from result transition
### 2019/11/16 Post Test 3
	html js change delimiters: ['${', '}']
### 2019/11/15 Post Test 2
	postURL "submit/"
	tmpObj = response.data
### 2019/11/15 Post Test
	html css js
	pointer cursor on copy img
	adjust copy popup width
	console.log
### 2019/11/15 postURL, testMode
	css js
	improve display of result when submit after the first time
	variables postURL, testMode(bool)
### 2019/11/15 Submit, Transition, Visibility, Spinner, Overflow
	html css js
	show corresponding result after submit
	init transition
	hide html tag until window.onload
	show spinner when submit
	set max-height of Description, SampleIn/Out
### 2019/11/09 Improve Styling on Lang and Theme
	p000.html  problem.css
		responsive styling by using flexbox, @media
		add box-shadow
### 2019/10/31 Fix Omission of White-Space in Description
	problem.css
		.content add property white-space: pre-wrap;
### 2019/10/31 Change Paths
	move the files in the folder front-end out
### 2019/10/29 Add Keybinding to Font-size and FullScreen of Editor. Add Theme Menu.
	Ctrl-+/= : Increase font-size
	Ctrl-- : Decrease font-size
	F11 : Toggle FullScreen
	Theme menu
### 2019/10/28 Server-Specific File
	p000.html for server
	p000_local.html for local test
### 2019/10/27 Delete Ace Files, Add CDN Links
	https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.6/ace.js
	https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.6/ext-language_tools.js
### 2019/10/26 Set Ace Options
	p000.html
		ext-language_tools.js
		scrollPastEnd, enableBasicAutocompletion, enableLiveAutocompletion
### 2019/10/26 Adjust Styling
	p000.html
		use soft tab in editor
		hide print margin of editor
	problem.css
		center copy popup horizontally, and set the stack order
		trifle
### 2019/10/26 Set Mode Of Editor When Lang Selected
	problem.js
		set mode
### 2019/10/24 Hide Copy Popup When Init Render
	p000.html  proble.js
		using class binding and v-html directive
### 2019/10/23 Add Copy Img
	move problem.html to front-end/problem/p000.html
	add front-end/image/copy.svg
	p000.html  problem.css  problem.js
		add images next to sampleInOut
		hover on it will show a tooltip
		onclick will copy the content of sampleInOut and show a popup on top of page
### 2019/10/23 Improving Display of SampleInOut
	problem.html  problem.css
		equal height columns by using flex
### 2019/10/23 Sync Lang and Request.language
	problem.html  problem.js
		rewrite a method.
### 2019/10/23 Show Correct Content of Lang Dropdown
	problem.html  problem.js
		show correct content of lang dropdown
### 2019/10/22 Test Post 3
	problem.html
		disabled test button, add it to a class
		add event to submit button, add it to a class
		change content of resultBlock, add a slide-fade transition
	problem.css
		add .btnTest .btnSubmit and transition
	problem.js
		delete variables related to counter in app3.data and app3.computed. add other data
		add copyResponseObj(), testPost()
### 2019/10/20 Test Post 2
	problem.js
		successfully store response
### 2019/10/19 Test Post
	problem.html
		add axios by using cdn
	problem.js
		restore the encoding
		successfully send a test request, including code
### 2019/10/19 Change Paths and Filenames
	delete the folder src
	delete the file license.txt
	move the file index.html to front-end/problem.html
	move the file style.css to front-end/css/problem.css
	move the file script.js to front-end/js/problem.js
	move the folder ace-builds-master to front-end/js/lib/ace-builds-master
	move the file README.markdown to front-end/problem.md
	formate documents. mistake: change the encoding of problem.js
### 2019/10/01 Show Tmp Test Result
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
### 2019/09/29 Add aceEditor
	only update flies in the folder "dist"
		1. #app 改為分開的三個 #app1, #app2, #app3
		2. 加入 aceEditor ，語言暫時固定為 c_cpp
		3. Language 調整顯示位置， dropup 改為 dropdown 

 ProblemPage
 _A Pen created at CodePen.io. Original URL: [https://codepen.io/k435467/pen/gOYqeMr](https://codepen.io/k435467/pen/gOYqeMr).

 