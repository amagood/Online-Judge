# Question Library
# +field: type
# ----------
# +addQuestion()
# +deleteQuestion()

import os
class Question_Library():
    path='./templates/QuestionData'
    def __init__(self,QuestionID):
        self.QuestionID = QuestionID
        if not os.path.isdir(self.path):
            os.mkdir(self.path)
    def addQuestion(self,Title,Tags,Description,SampleInput,SampleOut,SampleCode,FileNameExtention,pdf):
        p_path=self.path+'/{}'.format(self.QuestionID)
        if not os.path.isdir(p_path):
            os.mkdir(p_path)
        h_path=p_path+'/{}.html'.format(self.QuestionID)
        f=open(h_path,"w")
        html_str=''
        html_str+='''﻿<!-- 20191231 -->
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>'''
        html_str+=Title
        html_str+='''</title>
  <meta name="viewport" content="width=device-width">
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
  <link rel='stylesheet' href='http://unpkg.com/bootstrap@4.3.1/dist/css/bootstrap.min.css'>
  <link rel='stylesheet' href='http://unpkg.com/bootstrap-vue@2.0.2/dist/bootstrap-vue.css'>
  {% load static %}
  <link rel="stylesheet" href={% static "QuestionData/css/problem.css" %}>
</head>

<body>
  <!-- partial:index.partial.html -->
  <!-- navbar -->
  <div id="app1">
    <nav class="navbar navbar-expand-lg navbar-light navbarset" style="border-bottom: 4px solid MediumSeaGreen">
      <a class="navbar-brand" href="/index"><img class="img-home" src= {% static "QuestionData/image/logo.png" %} /></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="/index"><img class="navbarimage" src= {% static "QuestionData/image/home.svg" %}/> Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" v-if="whichShow === 'teacher'" href="/teacherProblem"><img class="navbarimage" src= {% static "QuestionData/image/file.svg" %} /> Problems</a>
            <a class="nav-link" v-else-if="whichShow === 'student'" href="/studentProblem"><img class="navbarimage" src= {% static "QuestionData/image/file.svg" %} /> Problems</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" v-show="isShow" href="/ranking"><img class="navbarimage" src= {% static "QuestionData/image/list-ordered.svg" %} /> Ranking</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" v-show="isShow" href="/comments"><img class="navbarimage" src= {% static "QuestionData/image/comments-regular.svg" %} /> Comments</a>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <span id="username" v-show="isShow">Hello! ${ name } &nbsp</span>
          </li>
          <li class="nav-item">
            <a class="nav-link" v-on:click="clearStorage()" href="/index"><img class="navbarimage" src= {% static "QuestionData/image/sign-out-alt-solid.svg" %}/> Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
  <!-- navbar end -->
  <!-- mainBlock1 -->
  <div id="mainBlock1" class="mainBlock1">
    <h1 class="bigTitle">'''
        html_str+=Title
        html_str+='''</h1>
      <p>'''
        for tag in Tags:
            html_str+='#{} '.format(tag)
        html_str+='''</p>'''
        if True:#pdf==''
            html_str+='''<p class="smallTitle">Description</p>
      <p class="content">'''
            html_str+=Description
            html_str+='''</p>
    <div class="sampleInOutContainer">
      <div class="sampleInOut">
        <span class="smallTitle">Sample Input</span>
        <img id="imgCopyIn" src={% static "QuestionData/image/copy.svg" %} alt="" onclick="copyFn('sampleIn')" style="cursor: pointer;">
        <pre id="sampleIn" class="samplePre">'''
            html_str+=SampleInput
            html_str+='''</pre>
      </div>
      <div class="sampleInOut">
        <span class="smallTitle">Sample Out</span>
        <img id="imgCopyOut" src={% static "QuestionData/image/copy.svg" %} alt="" onclick="copyFn('sampleOut')" style="cursor: pointer;">
        <pre id="sampleOut" class="samplePre">'''
            html_str+=SampleOut
            html_str+='''</pre>
      </div>
    </div>'''
        else:
            html_str+='<iframe src="{}pdf.pdf" style="width: 100%; height: 800px;"></iframe>'.format(self.QuestionID)
            c_path=p_path+'/{}pdf.pdf'.format(self.QuestionID)
            f2=open(c_path,"w")
            f2.write(pdf)
            f2.close()
        html_str+='''</div>
  <!-- mainBlock1 end -->
  <!-- mainBlock2 -->
  <div id="mainBlock2" class="mainBlock2">
    <div id="app2" style="position: relative;">
      <!-- tooltip for copy SampleInOut -->
      <b-tooltip target="imgCopyIn" title="Copy the sample input"></b-tooltip>
      <b-tooltip target="imgCopyOut" title="Copy the sample output"></b-tooltip>
      <transition name="slide-fade-popup">
        <div class="copyPopup" v-show="showCopyPopup">
          <p>Copied!</p>
        </div>
      </transition>
      <!-- tooltip for copy SampleInOut end -->
      <div class="d-flex langThemeFlexBox">
        <!-- Lang dropdown -->
        <div class="flex-fill">
          <span class="langLbl">Language:</span>
          <b-dropdown variant="light" v-bind:text="langDisplay">
            <b-dropdown-item v-on:click="clickLang('C++', 'cpp')">C++</b-dropdown-item>
            <b-dropdown-item v-on:click="clickLang('C','c')">C</b-dropdown-item>
            <b-dropdown-item v-on:click="clickLang('Python', 'python')">Python</b-dropdown-item>
          </b-dropdown>
        </div>
        <!-- Lang dropdown end -->
        <!-- select form -->
        <div class="themeFlexBox">
          <span class="themeLbl">Theme:</span>
          <b-form-select class="themeSelect" v-model="themeSelected" v-on:change="clickTheme()" :options="themeOptions">
          </b-form-select>
        </div>
        <!-- select form end -->
        </div>
    </div>
    <div id="uploadFileApp">
      <b-button id="uploadFileBtn" v-on:click="showUploadFileBlock = !showUploadFileBlock" :pressed="showUploadFileBlock" size="sm" variant="outline-secondary" title="submit uploaded files when this button is toggled">Upload files</b-button>
      <transition name="fade">
        <div class="uploadFileBlock" v-show="showUploadFileBlock">
          <span>main</span>
          <b-form-file id="file-default" v-model="mainFile" v-on:input="checkMainFile" accept=".c, .cpp, .py"></b-form-file>
          <span>files</span>
          <b-form-file id="file-default" v-model="implementFile" v-on:input="checkImplementFiles" accept=".c, .cpp, .py" multiple></b-form-file>
          <div v-show="showHeaderFile">
            <span>header files</span>
            <b-form-file id="file-default" v-model="headerFile" v-on:input="checkHeaderFiles" accept=".h" multiple></b-form-file>
          </div>
          <span v-show="showImplementFilesInvalidMsg" style="color: red;">${ implementFilesInvalidMsg }</span>
          <span v-show="showHeaderFilesInvalidMsg" style="color: red;">${ headerFilesInvalidMsg }</span>
        </div>
      </transition>
    </div>
    <div id="aceEditorContainer" class=" aceEditorContainer">
      <pre id="aceEditor"></pre>
    </div>
    <!-- dragbar -->
    <div class="dragbar" id="dragbar"></div>
    <!-- dragbar end -->
    <div id="app3">
      <div class="d-flex justify-content-end mb-3">
        <transition name="fade">
          <b-spinner v-if="showSpinner" variant="secondary" label="Spinning"></b-spinner>
        </transition>
        <!-- <b-button class="mr-1 ml-3" disabled pill variant="outline-secondary">Test</b-button> -->
        <b-button id="submitBtn" class="mx-1" v-on:click="submitCode()" pill variant="outline-secondary">Submit</b-button>
      </div>
      <!-- resultBlcok -->
      <transition name="slide-fade">
        <div class="resultGreen d-flex" v-if="showAC">
          <div class="flex-fill">
            <span class="codeState">${ codeState }</span>
            <span>(${ exeTime }, ${ memoryUsage })</span>
          </div>
          <div>
            <span>${ verdictTime }</span>
          </div>
        </div>
      </transition>
      <transition name="slide-fade">
        <div class="resultRed d-flex" v-if="showCE">
          <div class="flex-fill">
            <span class="codeState">${ codeState }</span>
            <p>${ errorMessage }</p>
          </div>
          <div>
            <span>${ verdictTime }</span>
          </div>
        </div>
      </transition>
      <transition name="slide-fade">
        <div class="resultRed d-flex" v-if="showTLE">
          <div class="flex-fill">
            <span class="codeState">${ codeState }</span>
            <span>(${ exeTime })</span>
          </div>
          <div>
            <span>${ verdictTime }</span>
          </div>
        </div>
      </transition>
      <transition name="slide-fade">
        <div class="resultRed" v-if="showWA">
          <div class="d-flex">
            <div class="flex-fill">
              <span class="codeState">${ codeState }</span>
            </div>
            <div>
              <span>${ verdictTime }</span>
            </div>
          </div>
          <div class="sampleInOutContainer">
            <div class="sampleInOut">
              <span class="smallTitle2">Wrong Output</span>
              <img src={% static "QuestionData/image/copy.svg" %} alt="" onclick="copyFn('wrongOutput')" style="cursor: pointer;">
              <div v-html="htmlWrongOutput"></div>
            </div>
            <div class="sampleInOut">
              <span class="smallTitle2">Expected Output</span>
              <img src={% static "QuestionData/image/copy.svg" %} alt="" onclick="copyFn('expectedOutput')" style="cursor: pointer;">
              <div v-html="htmlExpectedOutput"></div>
            </div>
          </div>
        </div>
      </transition>
      <transition name="slide-fade">
        <div class="resultRed d-flex" v-if="showMLE">
          <div class="flex-fill">
            <span class="codeState">${ codeState }</span>
            <span>(${ memoryUsage })</span>
          </div>
          <div>
            <span>${ verdictTime }</span>
          </div>
        </div>
      </transition>
      <transition name="slide-fade">
        <div v-if="showERR">
          <p class="codeState">Network error! Please try again.</p>
        </div>
      </transition>
      <!-- resultBlcok end -->
    </div>
  </div>
  <!-- mainBlock2 end -->
  <!-- partial -->
  <script src='http://unpkg.com/babel-polyfill/dist/polyfill.min.js'></script>
  <script src='http://unpkg.com/vue@2.6.10/dist/vue.js'></script>
  <script src='http://unpkg.com/bootstrap-vue@2.0.2/dist/bootstrap-vue.js'></script>
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <!-- set ace -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.6/ace.js" integrity="sha256-CVkji/u32aj2TeC+D13f7scFSIfphw2pmu4LaKWMSY8=" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.6/ext-language_tools.js" integrity="sha256-5GsAp93HE/XYlhrUPMw4VBAoawG9n3c7+DbQE4tRwW0=" crossorigin="anonymous"></script>
  <script src={% static "QuestionData/js/problem.js" %}></script>
  <script>
    var qID = "p000";
    var initCode = ``;
  </script>
</body>

</html>'''
        f.write(html_str)
        f.close()
        c_path=p_path+'/{}exampleCode.{}'.format(self.QuestionID,FileNameExtention)
        f=open(c_path,"w")
        f.write(SampleCode)
        f.close()
    def deleteQuestion(self,QuestionID):
        self.QuestionID = QuestionID
        p_path=self.path+'/{}'.format(self.QuestionID)
        if os.path.isdir(p_path):
            files=os.listdir(p_path)
            for file in files:
                f_path=p_path+'/'+file
                os.remove(f_path)
            os.rmdir(p_path)
        #delete html&code

# folder PATH:
# ./QuestionData/"QuestionID"/"QuestionID".html
#                             "QuestionID"exampleCode.c
#                             "QuestionID"exampleCode.cpp
#                             "QuestionID"exampleCode.py
#               /css
#               /js
#               /image

#Question_Lirbrary(str: QuestionID)
#question.addQuestion(str:title, list(str1,str2,...):tags, str:description, str:sample input description, str:sample output description, str:exampleCode, str:FileNameExtension)
#question.deleteQuestion(str: QuestionID)

#####TestUnderWTFLine#####

# a=Question_Lirbrary('p00001')#start a question 'a' which id is 'p00001'
# input_title='myTitle'                       #here is title
# input_tags=['myTag1', 'myTag2', 'myTag3']   #Tags
# input_description='Here is description.'    #problem description
# input_sampleinput='1 2'                     #sample input
# input_sampleoutput='3'                      #sample output
#                                             #sample code
# input_samplecode='''import os
# print(\'a\')
# '''
# input_filenameextension='py'                #filename extension
# a.addQuestion(input_title,input_tags,input_description,input_sampleinput,input_sampleoutput,input_samplecode,input_filenameextension)#create problem a
# #a.deleteQuestion('p00001')#delete problem a's folder
