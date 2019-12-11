var registerObj = {
  "action" : "register",
  "who" : "",
  "account" : "",
  "password" : "",
  "email" : ""
}
var postURL = "https://httpbin.org/post";
var tmpObj = {};

new Vue({
  el: '#app1',
  data() {
    return {
      msg: ""
    }
  },
  methods: {
    submitForm() {
      if(document.getElementById("id_account").validity.valid
      	&&document.getElementById("id_password").validity.valid
      	&&document.getElementById("id_confirm_password").validity.valid
      	&&document.getElementById("id_email").validity
      	)
      {
      registerObj.account = document.getElementById("id_account").value;
      registerObj.password = document.getElementById("id_password").value;
      registerObj.email = document.getElementById("id_email").value;

      for (i=0; i<document.getElementsByTagName('input').length; i+=1) 
      {
        if(document.getElementsByTagName('input')[i].type=='radio')
        {
          if(document.getElementsByTagName('input')[i].checked)
          {
        	registerObj.who = document.getElementsByTagName('input')[i].value;
          } 
        }
      }

      if(registerObj.password.length<8 || registerObj.password.length>20)
      {
      	this.msg='密碼長度錯誤!';
      }
      else
      {
      	if(document.getElementById("id_confirm_password").value==registerObj.password)
      	{
        	axios.post(postURL,registerObj)
          	.then(function (response) {
            	console.log(response);
            	tmpObj = response.data;
            	this.msg=tmpObj.status;
          	})
          	.catch(function (error) {
            	this.msg = "連線錯誤! 請再試一次~"
            	console.log(error);
          	})
	  	}
     	else
      	{
        	this.msg='密碼確認錯誤!';
      	}
      }
      
    }
    else
    {
    	this.msg='表格沒填完!!';
    }
}
  }
}
)



