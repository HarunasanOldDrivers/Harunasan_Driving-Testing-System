$(document).ready(function () {
    var UserLogin = $("#UserLogin");

    //点击登录时发送Ajax请求
    UserLogin.click(function () {
        var inputUserAccountTel = $("#inputUserAccountTel");
        var inputUserPassword = $("#inputUserPassword");
        $.ajax({
            type:"post",
            dataType:"json",
            url:"/api/user/login",
            data:{username:inputUserAccountTel.val(),password:inputUserPassword.val()
            },
            success:function (result) {
                if (result.code === 408){
                    alert(result.msg + "  用户名/密码错误" );
                }else{
                    alert("登录成功！");

                }
            },
            error :function (result) {
               alert("登录失败");
            }
        })


    })


    //创建Alert
    function createAlert(type,mesg) {
        var alert;
        // type ===1 创建危险框
        if(type === 1){
            alert = $(" <div class=\"alert alert-danger alert-dismissible col-lg-10 col-lg-offset-1 text-center\" style=\"font-size: 25px;\" id=\"dangerWarning\" role=\"alert\">\n" +
                "        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
                "    </div> ");
        }else if(type ===0){
            // type===0 创建成功狂
            alert = $(" <div class=\"alert alert-success alert-dismissible col-lg-10 col-lg-offset-1 text-center\" style=\"font-size: 25px;\" id=\"dangerWarning\" role=\"alert\">\n" +
                "        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
                "    </div> ");
        }
        // alertDiv.append(newDom);
        var alertDiv = $("#alertDiv");
        alert.append(mesg);
        alert.insertAfter(alertDiv);
    }

})