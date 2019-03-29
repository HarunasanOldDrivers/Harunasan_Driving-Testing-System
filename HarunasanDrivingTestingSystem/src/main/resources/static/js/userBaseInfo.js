$(document).ready(function () {
    //载入页面加载数据
    var UserInfo;
    $.ajax({
        type:"get",
        url:"/api/user/profile",
        dataType:"json",
        beforeSend: function (XMLHttpRequest) {
            var Authorization = $.cookie('Authorization');
            XMLHttpRequest.setRequestHeader("Authorization", Authorization);
        },
        success:function (result) {
            UserInfo = result;
            $("#UserNameSpan").html(result.userNickname);
            $("#accountTelSpan").html(result.userTelphone);
            $("#myEmailSpan").html(result.userEmail);
        },
    });


    //发送验证码修改密码
    $("#BtnGetCode").click(function () {
        // UserInfo.sendSMS
        $.ajax({
            type:"get",
            url:"/api/user/sendSMS",
            dataType:"json",
            data:{
                telephone:UserInfo.userTelphone
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
    })

    //密码验证
    function validatePassword () {
        var InputUserPasswordDiv = $("#InputUserPasswordDiv");
        var InputUserPasswordGlyTrue = $("#InputUserPasswordGlyTrue");
        var InputUserPasswordGlyFalse = $("#InputUserPasswordGlyFalse");
        var InputUserPasswordGlyWarning = $("#InputUserPasswordGlyWarning");
        var level =  $("#level");
        if(level.hasClass("pw-medium") || level.hasClass("pw-strong") ){
            //如果密码状态为中等或者强，设置DIV成成功
            InputUserPasswordDiv.removeClass("has-error");
            InputUserPasswordDiv.removeClass("has-warning");
            InputUserPasswordDiv.addClass("has-success");
            InputUserPasswordGlyFalse.addClass("hidden");
            InputUserPasswordGlyWarning.addClass("hidden");
            InputUserPasswordGlyTrue.removeClass("hidden");
        }else if(level.hasClass("pw-weak")){
            //如果密码状态为弱，设置DIV成警告
            InputUserPasswordDiv.removeClass("has-error");
            InputUserPasswordDiv.removeClass("has-success");
            InputUserPasswordDiv.addClass("has-warning");
            InputUserPasswordGlyFalse.addClass("hidden");
            InputUserPasswordGlyTrue.addClass("hidden");
            InputUserPasswordGlyWarning.removeClass("hidden");
        }else{
            //如果密码不符合弱规则，设置DIV成错误
            InputUserPasswordDiv.removeClass("has-warning");
            InputUserPasswordDiv.removeClass("has-success");
            InputUserPasswordDiv.addClass("has-error");
            InputUserPasswordGlyWarning.addClass("hidden");
            InputUserPasswordGlyTrue.addClass("hidden");
            InputUserPasswordGlyFalse.removeClass("hidden");
        }
    }

    //密码确认验证
    function validatePasswordAgain() {
        var InputUserPasswordAgainDiv =  $("#InputUserPasswordAgainDiv");
        var InputUserPasswordAgainFalseTip = $("#InputUserPasswordAgainFalseTip");
        var InputUserPasswordAgainGlyTrue = $("#InputUserPasswordAgainGlyTrue");
        var InputUserPasswordAgainGlyFalse = $("#InputUserPasswordAgainGlyFalse");
        var level =  $("#level");
        //如果设置的密码为中/高强度密码，提示进行验证
        if (level.hasClass("pw-medium") || level.hasClass("pw-strong")){
            if($("#InputUserPasswordAgain").val() === $("#InputUserPassword").val()){
                //密码一致，正确提示框；
                InputUserPasswordAgainDiv.removeClass("has-error");
                InputUserPasswordAgainDiv.addClass("has-success");
                InputUserPasswordAgainFalseTip.addClass("hidden");
                InputUserPasswordAgainGlyFalse.addClass("hidden");
                InputUserPasswordAgainGlyTrue.removeClass("hidden");
            }else{
                InputUserPasswordAgainDiv.removeClass("has-success");
                InputUserPasswordAgainDiv.addClass("has-error");
                InputUserPasswordAgainFalseTip.removeClass("hidden");
                InputUserPasswordAgainGlyFalse.removeClass("hidden");
                InputUserPasswordAgainGlyTrue.addClass("hidden");
                InputUserPasswordAgainFalseTip.html("密码输入不一致，请重新输入！");
            }
        }else {
            //如果设置密码为低/或者小于六位的密码，提示用户设置成中/高强度密码
            InputUserPasswordAgainDiv.removeClass("has-success");
            InputUserPasswordAgainDiv.addClass("has-error");
            InputUserPasswordAgainFalseTip.removeClass("hidden");
            InputUserPasswordAgainGlyFalse.removeClass("hidden");
            InputUserPasswordAgainGlyTrue.addClass("hidden");
            InputUserPasswordAgainFalseTip.html("请设置中/强强度密码");
        }
    }
    
    $("#BtnSubmitConfirmAlterPassword").click(function () {
        var InputNewPassword =  $("#InputNewPassword");
        var InputNewPasswordAgain = $("#InputNewPasswordAgain");
        var InputOldPassword = $("#InputOldPassword");
        var inputCode = $("#inputCode");
        $.ajax({
            type:"post",
            url:"/api/user/alterPassword",
            dataType:"json",
            data:{
                oldPassword:InputOldPassword.val(),
                newPassword:InputNewPassword.val(),
                verifyCode:inputCode.val(),
            },
            beforeSend: function (XMLHttpRequest) {
                var Authorization = $.cookie('Authorization');
                XMLHttpRequest.setRequestHeader("Authorization", Authorization);
            },
            success:function (result) {
                alert("修改密码成功！");
            },
            error:function (result) {
                if(result.code === 408){
                    alert(result.msg);
                }else if (result.code === 409){
                    alert(result.msg)
                }else{
                    alert("修改密码失败")
                }
            }
        });
    })

})