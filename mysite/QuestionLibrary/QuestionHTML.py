# Question Library
# +field: type
# ----------
# +addQuestion()
# +deleteQuestion()

import os
class Question_Library():
    path='../../../QuestionData'
    def __init__(self,QuestionID):
        self.QuestionID = QuestionID
        if not os.path.isdir(self.path):
            os.mkdir(self.path)
    def addQuestion(self,Title,Tags,Description,SampleInput,SampleOut,SampleCode,FileNameExtention):
        p_path=self.path+'/{}'.format(self.QuestionID)
        if not os.path.isdir(p_path):
            os.mkdir(p_path)
        h_path=p_path+'/{}.html'.format(self.QuestionID)
        f=open(h_path,"w")
        html_str=''
        html_str+='''<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>'''
        html_str+=Title
        html_str+='''</title>
  <meta name="viewport" content="width=device-width">
  <link rel='stylesheet' href='http://unpkg.com/bootstrap@4.3.1/dist/css/bootstrap.min.css'>
  <link rel='stylesheet' href='http://unpkg.com/bootstrap-vue@2.0.2/dist/bootstrap-vue.css'>
  <link rel="stylesheet" href="../css/problem.css">
</head>

<body>
  <!-- partial:index.partial.html -->

  <body>
    <!-- navbar -->
    <div id="app1" style="border-bottom: 4px solid MediumSeaGreen">
      <b-navbar toggleable="lg" type="light" variant="light">
        <b-navbar-brand href="#">GreenTeam</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#">Problems</b-nav-item>
            <b-nav-item href="#">Ranking</b-nav-item>
          </b-navbar-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="#">Login</b-nav-item>
            <b-nav-item href="#">Register</b-nav-item>
          </b-navbar-nav>

        </b-collapse>
      </b-navbar>
    </div>
    <!-- navbar end -->
    <!-- mainBlock1 -->
    <div class="mainBlock1">
      <h1 class="bigTitle">'''
        html_str+=Title
        html_str+='''</h1>
      <p>'''
        for tag in Tags:
            html_str+='#{} '.format(tag)
        html_str+='''</p>
      <p class="smallTitle">Description</p>
      <p class="content">'''
        html_str+=Description
        html_str+='''</p>
      <div class="sampleInOutContainer">
        <div class="sampleInOut">
          <span class="smallTitle">Sample Input</span>
          <img id="imgCopyIn" src="../image/copy.svg" alt="" onclick="copyFn('sampleIn')">
          <pre id="sampleIn" class="samplePre">'''
        html_str+=SampleInput
        html_str+='''</pre>
        </div>
        <div class="sampleInOut">
          <span class="smallTitle">Sample Out</span>
          <img id="imgCopyOut" src="../image/copy.svg" alt="" onclick="copyFn('sampleOut')">
          <pre id="sampleOut" class="samplePre">'''
        html_str+=SampleOut
        html_str+='''</pre>
        </div>
      </div>

    </div>
    <!-- mainBlock1 end -->
    <!-- mainBlock2 -->
    <div class="mainBlock2">
      <div id="app2" style="position: relative;">
        <!-- tooltip for copy SampleInOut -->
        <b-tooltip target="imgCopyIn" title="Copy the sample input"></b-tooltip>
        <b-tooltip target="imgCopyOut" title="Copy the sample output"></b-tooltip>
        <transition name="slide-fade">
          <div v-bind:class="copyPopupClass" v-show="showCopyPopup">
            <p v-html="rawHtml"></p>
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
      <div class=" aceEditorContainer">
        <pre id="aceEditor">
#include < iostream>
using namespace std;

int main()
{
    int a, b;
    cin >> a >> b;
    cout << a+b;
    return 0;
}</pre>
      </div>
      <div id="app3">
        <div style="position: relative; height: 60px">
          <b-button disabled class="btnTest" pill variant="outline-secondary">Test</b-button>
          <b-button class="btnSubmit" v-on:click="testPost()" pill variant="outline-secondary">Submit</b-button>
        </div>
        <!-- resultBlcok -->
        <transition name="slide-fade">
          <div v-bind:class="resultClass" v-if="showResult">
            <!-- <p>{{ responseObj.codeStats }}</p>
            <p>execution time: {{ responseObj.exeTime }}</p>
            <p>error message: {{ responseObj.errorMessage }}</p> -->
            <p>sent a request. Open DevTools and look for console.</p>
          </div>
        </transition>
      </div>
    </div>
    <!-- mainBlock2 end -->
  </body>
  <!-- partial -->
  <script src='http://unpkg.com/babel-polyfill/dist/polyfill.min.js'></script>
  <script src='http://unpkg.com/vue@2.6.10/dist/vue.js'></script>
  <script src='http://unpkg.com/bootstrap-vue@2.0.2/dist/bootstrap-vue.js'></script>
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <!-- set ace -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.6/ace.js" integrity="sha256-CVkji/u32aj2TeC+D13f7scFSIfphw2pmu4LaKWMSY8=" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.6/ext-language_tools.js" integrity="sha256-5GsAp93HE/XYlhrUPMw4VBAoawG9n3c7+DbQE4tRwW0=" crossorigin="anonymous"></script>
  <script src="../js/problem.js"></script>
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
