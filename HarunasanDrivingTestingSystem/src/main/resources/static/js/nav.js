$(document).ready(function () {
    var UserLogin = $("#UserLogin");
    var BtnSchoolUserLogin = $("#BtnSchoolUserLogin");
    // alert($.cookie("Authorization").val());
    //加载的时候判断是否有cookie的登录信息，如果有，显示用户名密码，如果没有，显示登录/注册
    if($.cookie("Authorization")){
        var username = $.cookie("UserName");
        $("#AUserName").html(username);
        $(".UserNameAndLogoff").show();
        $(".loginIn").hide();
    }
    else if($.cookie("AuthorizationSchool")){
        var schoolName = $.cookie("schoolName");
        $("#AUserName").html(schoolName);
        $(".UserNameAndLogoff").show();
        $(".loginIn").hide();
    }else{
        $(".loginIn").show();
        $(".UserNameAndLogoff").hide();
    }

    //发送验证码修改密码
    $("#BtnForgetGetCode").click(function () {
        // UserInfo.sendSMS
        var inputForgetUserAccountTel = $("#inputForgetUserAccountTel");
        //如果有值，发送验证码
        if(inputForgetUserAccountTel.val()){
            $.ajax({
                type:"get",
                url:"/api/user/sendSMS",
                dataType:"json",
                data:{
                    telephone:inputForgetUserAccountTel.val()
                },
                beforeSend: function (XMLHttpRequest) {
                    var Authorization = $.cookie('Authorization');
                    XMLHttpRequest.setRequestHeader("Authorization", Authorization);
                },
                success:function (result) {
                    alert("发送验证码成功，请注意查收");
                },
                error:function (result) {
                    alert("验证码错误，请重新输入");
                }
            });
        }else{
            alert("请输入手机号/账号");
        }

    });

    //提交修改密码
    $("#BtnSubmitNewPassword").click(function () {
        var inputForgetUserAccountTel = $("#inputForgetUserAccountTel");
        inputForgetUserAccountTel = Number(inputForgetUserAccountTel.val());
        var inputForgetUserPassword = $("#inputForgetUserPassword");
        var inputUserPasswordAgain = $("#inputUserPasswordAgain");
        var inputTelCode = $("#inputTelCode");
        if (inputForgetUserPassword.val() && inputForgetUserAccountTel && inputUserPasswordAgain.val() && inputTelCode.val() ){
           if(inputForgetUserPassword.val() === inputUserPasswordAgain.val()){
               if($("#level").hasClass("pw-medium") || $("#level").hasClass("pw-strong")) {
                   $.ajax({
                       type:"post",
                       url:"/api/user/forgotPassword",
                       dataType:"json",
                       data:{
                           username:inputForgetUserAccountTel,
                           newPassword:inputForgetUserPassword.val(),
                           verifyCode:inputTelCode.val()
                       },
                       beforeSend: function (XMLHttpRequest) {
                           var Authorization = $.cookie('Authorization');
                           XMLHttpRequest.setRequestHeader("Authorization", Authorization);
                       },
                       success:function (result) {
                           if(result.code === 408){
                               alert(result.msg)
                           }else if (result.code === 409){
                               alert(result.msg)
                           }else{
                               alert(result.msg)
                           }
                       },
                       error:function (result) {
                           alert("用户名/手机号输入错误");
                       }
                   });
               }
               else{
                   alert("请输入强度为中度以上的密码");
               }
           }
           else{
               alert("两次输入密码不一致");
           }
        }
        else {
            alert("请填写所有信息以及验证码");
        }
    });

    //输入密码时实时验证密码强度
    var inputForgetUserPassword = $("#inputForgetUserPassword");
    inputForgetUserPassword.keyup(function () {
        var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
        var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
        var enoughRegex = new RegExp("(?=.{6,}).*", "g");
        var level = $("#level");
        if (false === enoughRegex.test($(this).val())) {
            //密码小于六位的时候，密码强度图片都为灰色
            level.removeClass('pw-weak');
            level.removeClass('pw-medium');
            level.removeClass('pw-strong');
            level.addClass('pw-defule');
        }
        else if (strongRegex.test($(this).val())) {
            level.removeClass('pw-weak');
            level.removeClass('pw-medium');
            level.removeClass('pw-strong');
            level.addClass(' pw-strong');
            //密码为八位及以上并且字母数字特殊字符三项都包括,强度最强 （大小写字母）
        }
        else if (mediumRegex.test($(this).val())) {
            level.removeClass('pw-weak');
            level.removeClass('pw-medium');
            level.removeClass('pw-strong');
            level.addClass(' pw-medium');
            //密码为七位及以上并且字母、数字、特殊字符三项中有两项，强度是中等
        }
        else {
            level.removeClass('pw-weak');
            level.removeClass('pw-medium');
            level.removeClass('pw-strong');
            level.addClass('pw-weak');
            //如果密码为6为及以下，就算字母、数字、特殊字符三项都包括，强度也是弱的
        }
    });


    //点击普通用户登录时发送Ajax请求
    UserLogin.click(function () {
        var inputUserAccountTel = $("#inputUserAccountTel");
        var inputUserPassword = $("#inputUserPassword");
        $.ajax({
            type:"post",
            dataType:"json",
            url:"../api/user/login",
            data:{username:inputUserAccountTel.val(),password:inputUserPassword.val(),
            },
            success:function (result) {
                if (result.code === 408){
                    alert(result.msg + "  用户名/密码错误" );
                }else if (result.code === 200) {
                    alert("登录成功！");
                    //把token和用户名放入cookie
                    $.cookie("Authorization",result.data.token,{ expires:1,path:'*',domain:'localhost'});
                    $.cookie("UserName",result.data.nickname,{ expires:1,path:'* ',domain:'localhost'});
                    $(".UserNameAndLogoff").show();
                    $(".loginIn").hide();
                    $("#AUserName").html(result.data.nickname);
                    $('#login').modal('hide');
                    $('.modal-backdrop').remove();
                } else{
                    alert("登录失败,用户名/密码错误");
                }
            },
            error :function (result) {
               alert("登录失败");
            }
        })


    });
    //点击驾校登录发送Ajax请求
    BtnSchoolUserLogin.click(function () {
       var inputSchoolEmail = $("#inputSchoolEmail");
       var inputSchoolPassword = $("#inputSchoolPassword");

        $.ajax({
            type:"post",
            dataType:"json",
            url:"../api/school/login",
            data:{email:inputSchoolEmail.val(),password:inputSchoolPassword.val(),
            },
            success:function (result) {
                if (result.code === 408){
                    alert(result.msg + "  用户名/密码错误" );
                }else if (result.code === 200) {
                    alert("登录成功！");
                    //把token和用户名放入cookie
                    $.cookie("AuthorizationSchool",result.data.token,{ expires:1,path:'*',domain:'localhost'});
                    $.cookie("schoolName",result.data.schoolName,{ expires:1,path:'* ',domain:'localhost'});
                    $(".UserNameAndLogoff").show();
                    $(".loginIn").hide();
                    $("#AUserName").html(result.data.schoolName);
                    $('#login').modal('hide');
                    $('.modal-backdrop').remove();
                } else{
                    alert("登录失败,用户名/密码错误");
                }
            },
            error :function (result) {
                alert("登录失败");
            }
        })
    })


    //注销按钮点击之后自己删cookies里面的Authorization
    $("#AUserLogoff").click(function () {
        //本地删除Authorization
        $.cookie('Authorization',null,{expires:-1,path:'/',domain:'localhost'});
        $.cookie('UserName',null,{expires:-1,path:'/',domain:'localhost'});
        $.cookie('AuthorizationSchool',null,{expires:-1,path:'/',domain:'localhost'});
        $.cookie('schoolName',null,{expires:-1,path:'/',domain:'localhost'});
        $("#AUserName").html("");
        createAlert(0,"您已经成功退出登录");
        alert("您已经成功注销");

        $(".loginIn").show();
        $(".UserNameAndLogoff").hide();
        //跳转回主页面
        window.location.href="/index";
    })

    //点击用户名判断
    $("#AUserName").click(function () {
        if($.cookie("schoolName")){
            window.location.href="/school/profile"
        }else if($.cookie("UserName")){
            window.location.href="/user/profile"
        }

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