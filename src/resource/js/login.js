import '../css/login.scss';
window.myStorage = (new (function(){
 
    var storage;    //声明一个变量，用于确定使用哪个本地存储函数
 
    if(window.localStorage){
        storage = localStorage;     //当localStorage存在，使用H5方式
    }
    else{
        storage = cookieStorage;    //当localStorage不存在，使用兼容方式
    }
 
    this.setItem = function(key, value){
        storage.setItem(key, value);
    };
 
    this.getItem = function(name){
        return storage.getItem(name);
    };
 
    this.removeItem = function(key){
        storage.removeItem(key);
    };
 
    this.clear = function(){
        storage.clear();
    };
})());
window.host = "http://"+ (location.host || "118.26.10.50:9999");
var isEmpty = (str) => {
	str = $.trim(str)
	return (str === '' || typeof(str) === 'undefined' || str === null) ? true : false;
}
function login(data){    
	$.ajax({
		type: "post",
		url: host +"/dadi/login/login",
		data: JSON.stringify(data),
		dataType: "json",
		cache: false,
		contentType: "application/json;charset=UTF-8",
		success: function(res) {
            console.log(res)
			if(res.status == 1){
                let user_name = {
                    account: $("#account").val()
                };
                user_name = JSON.stringify(user_name)
                myStorage.setItem("user_name", user_name)

				var data = res.data.perm;
                data = JSON.stringify(data)
                myStorage.setItem("user_mid", data)
                location.href= "index.html"
			}else{
                $(".yam-ing").html('<img src="'+ host +'/dadi/login/checkcode?'+ Date.now() +'">');
                $("input").val('')
            }
            $error.html(res.message)		
		},
		error: function(){			
		}
	});
	
}
let $error = $(".error-span");
$("input").on("click", function(){
    $error.html("") 
})

$(".yam-btn").on("click",function(){
    $(".yam-ing").html('<img src="'+ host +'/dadi/login/checkcode?'+ Date.now() +'">');
})
$(".yam-btn").click();
 //回车提交事件 
$("body").keydown(function() {   
    if (event.keyCode == "13") {
        //keyCode=13是回车键    
        $(".btn-go").click();  
    } 
}); 

$(".btn-go").on("click", function(){
    let account = $("#account").val(),
        password = $("#password").val(),
        code = $("#code").val(); 
    if(isEmpty(account) || isEmpty(password) || isEmpty(code)){
        $error.html("不能为空!") 
    }else{
        let data = {
            account: account,
            password: password,
            code: code
        }
        login(data)	
    }
})