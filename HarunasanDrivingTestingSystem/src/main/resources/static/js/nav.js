$(document).ready(function () {
    var UserLogin = $("#UserLogin");

    // alert($.cookie("Authorization").val());
    //加载的时候判断是否有cookie的登录信息，如果有，显示用户名密码，如果没有，显示登录/注册
    if($.cookie("Authorization")){
    $(".UserNameAndLogoff").show();
    $(".loginIn").hide();}
    else {
        $(".loginIn").show();
        $(".UserNameAndLogoff").hide();
    }

    //点击登录时发送Ajax请求
    UserLogin.click(function () {
        var inputUserAccountTel = $("#inputUserAccountTel");
        var inputUserPassword = $("#inputUserPassword");
        if(inputUserAccountTel.val() && inputUserPassword.val()){
            $.ajax({
                type:"post",
                dataType:"json",
                url:"/api/user/login",
                data:{username:inputUserAccountTel.val(),password:inputUserPassword.val(),
                },
                success:function (result) {
                    if (result.code === 408){
                        alert(result.msg + "  用户名/密码错误" );
                    }else{
                        alert("登录成功！");
                        alert(result.token);
                        $.cookie("Authorization",result.token);
                        $(".UserNameAndLogoff").show();
                        $(".loginIn").hide();
                        $('#login').modal('hide');
                        $('.modal-backdrop').remove();
                    }
                },
                error :function (result) {
                    alert("登录失败");
                }
            })
        }else {
            alert("请填写用户名/密码");
        }
    });

    //注销按钮点击之后自己删cookies里面的Authorization
    $("#AUserLogoff").click(function () {
        //本地删除Authorization
        $.cookie('Authorization',null,{expires:-1});
        createAlert(0,"您已经成功退出登录");
        alert("您已经成功注销");

        $(".loginIn").show();
        $(".UserNameAndLogoff").hide();
        // 跳转回主页面
        window.location.href="index";
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