$(document).ready(function () {
    //改变导航页面可选择状态
    $("#nav").load("nav",function () {
        //在载入完成之后改变导航栏状态
        $("#mainpage").removeClass("active");
        $("#register").addClass("active");
    });
    $('[data-toggle="tooltip"]').tooltip();  //初始化
    //页面加载时，先隐藏后面两个步骤的表格
    var DetailInfo = $("#DetailInfo");
    var CertificationInfo = $("#CertificationInfo");
    var BaseInfo = $("#BaseInfo");
    var InputPassword = $("#InputPassword");

    DetailInfo.hide();
    CertificationInfo.hide();


    //首先将表格设置为不可见，在加载完成后设置为可见，以回避城市联动栏过长的bug
    DetailInfo.css("visibility","visible");

    //点击第一张表格下一页，显示第二张表格(检查每个DIV是否有has-success属性)
    $("#BaseInfoNextBtn").click(function () {
        var checkBoxAcceptLaw = $("#checkBoxAcceptLaw");
        var checkBoxAcceptLawFalseTips = $("#checkBoxAcceptLawFalseTips");
        checkBaseInfo();
        //服务条款勾选验证
        if(!checkBoxAcceptLaw.is(':checked')){
            checkBoxAcceptLawFalseTips.removeClass("hidden");
            checkBoxAcceptLawFalseTips.html("请接受我们的服务条款");

        }else{
            checkBoxAcceptLawFalseTips.addClass("hidden");
        }

        if ($("#InputEmailDiv").hasClass("has-success")  && $("#InputSchoolNameDiv").has("has-success") && $("#InputPasswordDiv").has("has-success") &&
            $("#InputPasswordAgainDiv").hasClass("has-success") &&  $("#InputChargerTelDiv").has("has-success") && checkBoxAcceptLaw.is(':checked')
        ){
            setTimeout(showSchoolInfo,1000);
            function showSchoolInfo() {
                BaseInfo.hide(300);
                DetailInfo.show(300);
            }
        }
    });

    //点击第二张表格下一页，显示第三张表格
    $("#DetailInfoNextBtn").click(function () {
        checkDetialInfo();
        if ($("#InputCompanyNameDiv").hasClass("has-success") && $("#InputCorporateNameDiv").hasClass("has-success") && $("#InputCorporateNumberDiv").hasClass("has-success")
        && $("#InputSocialCodeDiv").hasClass("has-success") && $("#InputEnbarkTimeDiv").hasClass("has-success") && $("#InputDetailedLocationDiv").hasClass("has-success")
            && $("#InputDistrictDiv").hasClass("has-success")
        ){
            setTimeout(showCertificationInfo,1000);
            function showCertificationInfo() {
                CertificationInfo.show(300);
                DetailInfo.hide(300);
            }
        }else{
        }
    });

    //点击第二张表格上一页，显示第一张表格
    $("#DetailInfoPreBtn").click(function () {
        BaseInfo.show(300);
        DetailInfo.hide(300);
    });

    $("#GetTelCode").click(function () {
        checkBaseInfo();
        if ($("#InputEmailDiv").hasClass("has-success")  && $("#InputSchoolNameDiv").has("has-success") && $("#InputPasswordDiv").has("has-success") &&
            $("#InputPasswordAgainDiv").hasClass("has-success") &&  $("#InputChargerTelDiv").has("has-success")
        ) {
            $.ajax({
                type:"get",
                dataType:"json",
                url:"api/user/sendSMS",
                data:{telephone:$("#InputChargerTel").val()},
                success:function (result) {
                    if (result.result === 0){
                        createAlert(0,"验证码已成功发送到您手机")
                    }else {
                        createAlert(1,result.errmsg);
                    }
                },
                error :function () {
                    var BtnGetCodeFalseTip =  $("#BtnGetCodeFalseTip");
                    BtnGetCodeFalseTip.html("验证码错误，请重新输入");
                    BtnGetCodeFalseTip.removeClass("hidden");
                }
            })
        }else {
            createAlert(1,"请填写基本信息")
        }
    })

    //点击第三张表格上一页，显示第二张表格
    $("#CertificationPreBtn").click(function () {
        CertificationInfo.hide(300);
        DetailInfo.show(300);
    });

    //点击第三页提交,查看数据
    $("#CertificationSubmit").click(function () {
    //            首先要判断图片代码
        $.ajax({
            type:"post",
            dataType:"json",
            url:"/api/school/signUp",
            date:{

            }
        })

    });

    //验证基本信息页完整性
    function checkBaseInfo() {
        validateEmail();   //验证邮箱完整性
        validateSchoolName ();  //驾校名字非空验证
        validatePassword();   //密码输入完成后验证是否合格
        validatePasswordAgain(); //重新输入密码验证
        validateNumber();  //负责人手机号码验证
        // alert("手机验证码验证没写");
    }

    //验证驾校详情页完整性
    function checkDetialInfo(){
        validateCompanyName();          //非空验证公司名字
        validateCorporatePersonName();  //非空验证法人姓名
        validateCorporateTel();         //验证公司电话
        validateSocialCode();            //非空验证社会信用代码
        validateEmbarkTime();          //驾校成立时间非空
        validateSchoolDics();          //地区非空验证
        validateDetialDics();          //详细地址非空验证
    }
    
    //输入密码时实时验证密码强度
    InputPassword.keyup(function () {
        var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
        var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
        var enoughRegex = new RegExp("(?=.{6,}).*", "g");
        var level = $("#level");
        var InputPasswordDiv = $("#InputPasswordDiv");
        var InputPasswordGlyTrue = $("#InputPasswordGlyTrue");
        var InputPasswordGlyFalse = $("#InputPasswordGlyFalse");
        var InputPasswordGlyWarning = $("#InputPasswordGlyWarning");

        if (false === enoughRegex.test($(this).val())) {
            //密码小于六位的时候，密码强度图片都为灰色
            level.removeClass('pw-weak');
            level.removeClass('pw-medium');
            level.removeClass('pw-strong');
            level.addClass('pw-defule');
            InputPasswordDiv.removeClass("has-error");
            InputPasswordDiv.removeClass("has-warning");
            InputPasswordDiv.removeClass("has-success");
            InputPasswordGlyFalse.addClass("hidden");
            InputPasswordGlyWarning.addClass("hidden");
            InputPasswordGlyTrue.addClass("hidden");
        }
        else if (strongRegex.test($(this).val())) {
            level.removeClass('pw-weak');
            level.removeClass('pw-medium');
            level.removeClass('pw-strong');
            level.addClass(' pw-strong');
            InputPasswordDiv.removeClass("has-error");
            InputPasswordDiv.removeClass("has-warning");
            InputPasswordDiv.addClass("has-success");
            InputPasswordGlyFalse.addClass("hidden");
            InputPasswordGlyWarning.addClass("hidden");
            InputPasswordGlyTrue.removeClass("hidden");
            //密码为八位及以上并且字母数字特殊字符三项都包括,强度最强 （大小写字母）
        }
        else if (mediumRegex.test($(this).val())) {
            level.removeClass('pw-weak');
            level.removeClass('pw-medium');
            level.removeClass('pw-strong');
            level.addClass(' pw-medium');
            //密码为七位及以上并且字母、数字、特殊字符三项中有两项，强度是中等
            InputPasswordDiv.removeClass("has-error");
            InputPasswordDiv.removeClass("has-warning");
            InputPasswordDiv.addClass("has-success");
            InputPasswordGlyFalse.addClass("hidden");
            InputPasswordGlyWarning.addClass("hidden");
            InputPasswordGlyTrue.removeClass("hidden");
        }
        else {
            level.removeClass('pw-weak');
            level.removeClass('pw-medium');
            level.removeClass('pw-strong');
            level.addClass('pw-weak');
            InputPasswordDiv.removeClass("has-error");
            InputPasswordDiv.removeClass("has-success");
            InputPasswordDiv.addClass("has-warning");
            InputPasswordGlyFalse.addClass("hidden");
            InputPasswordGlyTrue.addClass("hidden");
            InputPasswordGlyWarning.removeClass("hidden");
            //如果密码为6为及以下，就算字母、数字、特殊字符三项都包括，强度也是弱的
        }
    });
     var InputPasswordAgain = $("#InputPasswordAgain");
    InputPasswordAgain.blur(validatePasswordAgain);
    //邮箱完整性验证
    function validateEmail() {
        //验证邮箱
        var InputEmailDiv = $("#InputEmailDiv");
        var InputEmailGlyTrue = $("#InputEmailGlyTrue");
        var InputEmailGlyFalse = $("#InputEmailGlyFalse");
        var InputEmailFalseTip = $("#InputEmailFalseTip");
        if(!$("#InputEmail").val().match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/)) {
            InputEmailDiv.removeClass("has-success");
            InputEmailDiv.addClass("has-error");
            InputEmailGlyTrue.addClass("hidden");
            InputEmailGlyFalse.removeClass("hidden");
            InputEmailFalseTip.removeClass("hidden");
            InputEmailFalseTip.html("请输入正确的邮箱");
        } else {
            InputEmailDiv.removeClass("has-error");
            InputEmailDiv.addClass("has-success");
            InputEmailGlyFalse.addClass("hidden");
            InputEmailGlyTrue.removeClass("hidden");
            InputEmailFalseTip.addClass("hidden");
        }
    }

    //驾校名字非空验证
    function validateSchoolName () {
        var InputSchoolNameDiv = $("#InputSchoolNameDiv");
        var InputSchoolNameGlyTrue = $("#InputSchoolNameGlyTrue");
        var InputSchoolNameGlyFalse = $("#InputSchoolNameGlyFalse");
        var InputSchoolNameFalseTips = $("#InputSchoolNameFalseTips");
        if ($("#InputSchoolName").val()){
            InputSchoolNameDiv.removeClass("has-error");
            InputSchoolNameDiv.addClass("has-success");
            InputSchoolNameGlyFalse.addClass("hidden");
            InputSchoolNameGlyTrue.removeClass("hidden");
            InputSchoolNameFalseTips.addClass("hidden");

        }else{
            InputSchoolNameDiv.removeClass("has-success");
            InputSchoolNameDiv.addClass("has-error");
            InputSchoolNameGlyTrue.addClass("hidden");
            InputSchoolNameGlyFalse.removeClass("hidden");
            InputSchoolNameFalseTips.removeClass("hidden");
            InputSchoolNameFalseTips.html("请输入驾校名称");
        }
    }

    //密码输入完成之后验证是否合格
    function validatePassword () {
        var InputPasswordDiv = $("#InputPasswordDiv");
        var InputPasswordGlyTrue = $("#InputPasswordGlyTrue");
        var InputPasswordGlyFalse = $("#InputPasswordGlyFalse");
        var InputPasswordGlyWarning = $("#InputPasswordGlyWarning");
        var level =  $("#level");
        if(level.hasClass("pw-medium") || level.hasClass("pw-strong") ){
            //如果密码状态为中等或者强，设置DIV成成功
            InputPasswordDiv.removeClass("has-error");
            InputPasswordDiv.removeClass("has-warning");
            InputPasswordDiv.addClass("has-success");
            InputPasswordGlyFalse.addClass("hidden");
            InputPasswordGlyWarning.addClass("hidden");
            InputPasswordGlyTrue.removeClass("hidden");
        }else if(level.hasClass("pw-weak")){
            //如果密码状态为弱，设置DIV成警告
            InputPasswordDiv.removeClass("has-error");
            InputPasswordDiv.removeClass("has-success");
            InputPasswordDiv.addClass("has-warning");
            InputPasswordGlyFalse.addClass("hidden");
            InputPasswordGlyTrue.addClass("hidden");
            InputPasswordGlyWarning.removeClass("hidden");
        }else{
            //如果密码不符合弱规则，设置DIV成错误
            InputPasswordDiv.removeClass("has-warning");
            InputPasswordDiv.removeClass("has-success");
            InputPasswordDiv.addClass("has-error");
            InputPasswordGlyWarning.addClass("hidden");
            InputPasswordGlyTrue.addClass("hidden");
            InputPasswordGlyFalse.removeClass("hidden");
        }
    }

    //重新输入密码密码验证
    function validatePasswordAgain () {
        var InputPasswordAgainDiv =  $("#InputPasswordAgainDiv");
        var InputPasswordAgainFalseTip = $("#InputPasswordAgainFalseTip");
        var InputPasswordAgainGlyTrue = $("#InputPasswordAgainGlyTrue");
        var InputPasswordAgainGlyFalse = $("#InputPasswordAgainGlyFalse");
        var level =  $("#level");
        //如果设置的密码为中/高强度密码，提示进行验证
        if (level.hasClass("pw-medium") || level.hasClass("pw-strong")){
            if($("#InputPasswordAgain").val() === $("#InputPassword").val()){
                //密码一致，正确提示框；
                InputPasswordAgainDiv.removeClass("has-error");
                InputPasswordAgainDiv.addClass("has-success");
                InputPasswordAgainFalseTip.addClass("hidden");
                InputPasswordAgainGlyFalse.addClass("hidden");
                InputPasswordAgainGlyTrue.removeClass("hidden");
            }else{
                InputPasswordAgainDiv.removeClass("has-success");
                InputPasswordAgainDiv.addClass("has-error");
                InputPasswordAgainFalseTip.removeClass("hidden");
                InputPasswordAgainGlyFalse.removeClass("hidden");
                InputPasswordAgainGlyTrue.addClass("hidden");
                InputPasswordAgainFalseTip.html("密码输入不一致，请重新输入！");
            }
        }else {
            //如果设置密码为低/或者小于六位的密码，提示用户设置成中/高强度密码
            InputPasswordAgainDiv.removeClass("has-success");
            InputPasswordAgainDiv.addClass("has-error");
            InputPasswordAgainFalseTip.removeClass("hidden");
            InputPasswordAgainGlyFalse.removeClass("hidden");
            InputPasswordAgainGlyTrue.addClass("hidden");
            InputPasswordAgainFalseTip.html("请设置中/强强度密码");
        }
    }

    //负责人手机号验证
    function validateNumber () {
        //验证130-139,150-159,180-189号码段的手机号码
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        var InputChargerTelFalseTip = $("#InputChargerTelFalseTip");
        var InputChargerTelDiv = $("#InputChargerTelDiv");
        var InputChargerTelGlyFalse = $("#InputChargerTelGlyFalse");
        var InputChargerTelGlyTrue = $("#InputChargerTelGlyTrue");
        if(!myreg.test($("#InputChargerTel").val()))
        {
            //如果输入的手机号码错误
            InputChargerTelDiv.removeClass("has-success");
            InputChargerTelDiv.addClass("has-error");
            InputChargerTelGlyTrue.addClass("hidden");
            InputChargerTelGlyFalse.removeClass("hidden");
            InputChargerTelFalseTip.removeClass("hidden");
            InputChargerTelFalseTip.html("请输入有效的手机号码！");
        }else{
            //如果输入的手机号码正确
            InputChargerTelDiv.removeClass("has-error");
            InputChargerTelDiv.addClass("has-success");
            InputChargerTelGlyFalse.addClass("hidden");
            InputChargerTelGlyTrue.removeClass("hidden");
            InputChargerTelFalseTip.addClass("hidden");
        }
    }

    //公司名字非空验证
    function validateCompanyName () {
        var InputCompanyNameDiv = $("#InputCompanyNameDiv");
        var InputCompanyNameFalseTip = $("#InputCompanyNameFalseTip");
        var InputCompanyNameGlyFalse = $("#InputCompanyNameGlyFalse");
        var InputCompanyNameGlyTrue = $("#InputCompanyNameGlyTrue");
        if ($("#InputCompanyName").val()){
            InputCompanyNameDiv.removeClass("has-error");
            InputCompanyNameDiv.addClass("has-success");
            InputCompanyNameGlyFalse.addClass("hidden");
            InputCompanyNameGlyTrue.removeClass("hidden");
            InputCompanyNameFalseTip.addClass("hidden");
            return true ;
        }else{
            InputCompanyNameDiv.removeClass("has-success");
            InputCompanyNameDiv.addClass("has-error");
            InputCompanyNameGlyTrue.addClass("hidden");
            InputCompanyNameGlyFalse.removeClass("hidden");
            InputCompanyNameFalseTip.removeClass("hidden");
            InputCompanyNameFalseTip.html("请输入工商局注册公司名称");
            return false;
        }
    }

    //法人姓名非空验证
    function validateCorporatePersonName() {
        var InputCorporateNameDiv = $("#InputCorporateNameDiv");
        var InputCorporateNameFalseTip = $("#InputCorporateNameFalseTip");
        var InputCorporateNameGlyFalse = $("#InputCorporateNameGlyFalse");
        var InputCorporateNameGlyTrue = $("#InputCorporateNameGlyTrue");
        if ($("#InputCorporateName").val()){
            InputCorporateNameDiv.removeClass("has-error");
            InputCorporateNameDiv.addClass("has-success");
            InputCorporateNameGlyFalse.addClass("hidden");
            InputCorporateNameGlyTrue.removeClass("hidden");
            InputCorporateNameFalseTip.addClass("hidden");
            return true ;
        }else{
            InputCorporateNameDiv.removeClass("has-success");
            InputCorporateNameDiv.addClass("has-error");
            InputCorporateNameGlyTrue.addClass("hidden");
            InputCorporateNameGlyFalse.removeClass("hidden");
            InputCorporateNameFalseTip.removeClass("hidden");
            InputCorporateNameFalseTip.html("请输入法人姓名");
            return false;
        }
    }

    //法人电话验证
    function validateCorporateTel() {
        //验证130-139,150-159,180-189号码段的手机号码
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        var InputCorporateNumberFalseTip = $("#InputCorporateNumberFalseTip");
        var InputCorporateNumberDiv = $("#InputCorporateNumberDiv");
        var InputCorporateNumberGlyFalse = $("#InputCorporateNumberGlyFalse");
        var InputCorporateNumberGlyTrue = $("#InputCorporateNumberGlyTrue");
        if(!myreg.test($("#InputCorporateNumber").val()))
        {
            //如果输入的手机号码错误
            InputCorporateNumberDiv.removeClass("has-success");
            InputCorporateNumberDiv.addClass("has-error");
            InputCorporateNumberGlyTrue.addClass("hidden");
            InputCorporateNumberGlyFalse.removeClass("hidden");
            InputCorporateNumberFalseTip.removeClass("hidden");
            InputCorporateNumberFalseTip.html("请输入有效的手机号码！");
            return false;
        }else{
            //如果输入的手机号码正确
            InputCorporateNumberDiv.removeClass("has-error");
            InputCorporateNumberDiv.addClass("has-success");
            InputCorporateNumberGlyFalse.addClass("hidden");
            InputCorporateNumberGlyTrue.removeClass("hidden");
            InputCorporateNumberFalseTip.addClass("hidden");
        }
    }

    //社会信用代码非空验证
    function validateSocialCode() {
        var InputSocialCodeDiv = $("#InputSocialCodeDiv");
        var InputSocialCodeFalseTip = $("#InputSocialCodeFalseTip");
        var InputSocialCodeGlyFalse = $("#InputSocialCodeGlyFalse");
        var InputSocialCodeGlyTrue = $("#InputSocialCodeGlyTrue");
        if ($("#InputSocialCode").val()){
            InputSocialCodeDiv.removeClass("has-error");
            InputSocialCodeDiv.addClass("has-success");
            InputSocialCodeGlyFalse.addClass("hidden");
            InputSocialCodeGlyTrue.removeClass("hidden");
            InputSocialCodeFalseTip.addClass("hidden");
            return true ;
        }else{
            InputSocialCodeDiv.removeClass("has-success");
            InputSocialCodeDiv.addClass("has-error");
            InputSocialCodeGlyTrue.addClass("hidden");
            InputSocialCodeGlyFalse.removeClass("hidden");
            InputSocialCodeFalseTip.removeClass("hidden");
            InputSocialCodeFalseTip.html("请输入社会信用代码");
            return false;
        }
    }

    //驾校成立时间非空验证
    function validateEmbarkTime () {
        var InputEnbarkTimeDiv = $("#InputEnbarkTimeDiv");
        var InputEnbarkTimeGlyFalse = $("#InputEnbarkTimeGlyFalse");
        var InputEnbarkTimeGlyTrue = $("#InputEnbarkTimeGlyTrue");
        if ($("#InputEnbarkTime").val()){
            InputEnbarkTimeDiv.removeClass("has-error");
            InputEnbarkTimeDiv.addClass("has-success");
            InputEnbarkTimeGlyFalse.addClass("hidden");
            InputEnbarkTimeGlyTrue.removeClass("hidden");
            return true ;
        }else{
            InputEnbarkTimeDiv.removeClass("has-success");
            InputEnbarkTimeDiv.addClass("has-error");
            InputEnbarkTimeGlyTrue.addClass("hidden");
            InputEnbarkTimeGlyFalse.removeClass("hidden");
            return false;
        }
    }

    //驾校所在地区非空验证 
    function validateSchoolDics() {
        var InputDistrictDiv = $("#InputDistrictDiv");
        if ($("#InputDistrict").val()){
            InputDistrictDiv.removeClass("has-error");
            InputDistrictDiv.addClass("has-success");
            return true ;
        }else{
            InputDistrictDiv.removeClass("has-success");
            InputDistrictDiv.addClass("has-error");
            return false;
        }
    }

    //驾校详细地址非空验证
    function validateDetialDics () {
        var InputDetailedLocationDiv = $("#InputDetailedLocationDiv");
        var InputDetailedLocationFalseTip = $("#InputDetailedLocationFalseTip");
        var InputDetailedLocationGlyFalse = $("#InputDetailedLocationGlyFalse");
        var InputDetailedLocationGlyTrue = $("#InputDetailedLocationGlyTrue");
        if ($("#InputDetailedLocation").val()){
            InputDetailedLocationDiv.removeClass("has-error");
            InputDetailedLocationDiv.addClass("has-success");
            InputDetailedLocationGlyFalse.addClass("hidden");
            InputDetailedLocationGlyTrue.removeClass("hidden");
            InputDetailedLocationFalseTip.addClass("hidden");
            return true ;
        }else{
            InputDetailedLocationDiv.removeClass("has-success");
            InputDetailedLocationDiv.addClass("has-error");
            InputDetailedLocationGlyTrue.addClass("hidden");
            InputDetailedLocationGlyFalse.removeClass("hidden");
            InputDetailedLocationFalseTip.removeClass("hidden");
            InputDetailedLocationFalseTip.html("请输入驾校详细地址");
            return false;
        }
    }


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