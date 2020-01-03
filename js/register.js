var registerObj = {
  "action" : "register",
  "who" : "",
  "account" : "",
  "password" : "",
  "email" : ""
}
var postURL = "https://httpbin.org/response-headers?freeform="; //<--URL
var tmpObj = {};

new Vue({
  el: '#app1',
  data() {
    return {
    }
  },
  methods: {
    submitForm() {
      if(document.getElementById("id_account").validity.valid
      	&&document.getElementById("id_password").validity.valid
      	&&document.getElementById("id_confirm_password").validity.valid
      	&&document.getElementById("id_email").validity.valid
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
      	alert('密碼長度錯誤!');
      }
      else
      {
      	if(document.getElementById("id_confirm_password").value==registerObj.password)
      	{
        	axios.post(postURL,registerObj)
          	.then(function (response) {
            	console.log(response);
            	tmpObj = response.data;
            	if(tmpObj.stats=='success')
            	{
            		alert('註冊成功，將自動跳轉到主畫面!');
            		setTimeout(RregisterSuccess, 500);
            	}
            	else
            	{
            		alert(tmpObj.err_msg);
            		alert('請稍後再試');
            	}
            	
          	})
          	.catch(function (error) {
            	alert("連線錯誤! 請再試一次~");
            	console.log(error);
          	})
	  	}
     	else
      	{
        	alert('密碼確認錯誤!');
      	}
      }
      
    }
    else
    {
    	if(!document.getElementById("id_account").validity.valid)
    	{
    		alert('帳號格式錯誤(8~20英數字)');
    	}
    	else if(!document.getElementById("id_password").validity.valid)
    	{
    		alert('密碼格式錯誤(8~20英數字)');
    	}
      	else if(!document.getElementById("id_email").validity.valid)
      	{
      		alert('電子郵件信箱格式錯誤');
      	}
      	else
      	{
      		alert('表格沒填完!!');
      	}

    }
}
  }
}
)


function registerSuccess() {
  localStorage.setItem("who", registerObj.who);
  localStorage.setItem("userName", registerObj.account);
  window.location.replace("../");
}
