$(document).ready(function () {
    var classes;
    $.ajax({
        type:"get",
        url:"/api/school/profile",
        dataType:"json",
        beforeSend: function (XMLHttpRequest) {
            var Authorization = $.cookie('AuthorizationSchool');
            XMLHttpRequest.setRequestHeader("Authorization", Authorization);
        },
        success:function (result) {
            $("#schoolAddressSpan").html(result.data.address);
            $("#schoolNameSpan").html(result.data.schoolName);
            $("#registerTelSpan").html(result.data.schoolEnrollTelephone);
            $("#CompanyNameSpan").html(result.data.schoolCompanyName);
            $("#EnbarkTimeSpan").html(result.data.schoolStartTime);
            $("#CorporateNameSpan").html(result.data.schoolCorporateName);
            $("#CorporateNumberSpan").html(result.data.schoolCorporateTel);
            $("#PschoolIntroduction").html(result.data.schoolIntroduction);
        },
        error:function (result) {
            alert("与服务器似乎断开链接，请检查您的网络");
        }
    });

    //提交修改新的报名电话
    $("#BtnSubmitNewTel").click(function () {
        var newTEL =  $("#InputChargerTel").val();
        // var reg2 = new RegExp(/^\d{11}$/);
        // var reg = new RegExp(/^\d{8}$/);
        // if(!reg.test(newTEL).val()) {
        //     alert("请输入8位或者11位电话！");
        // }else if(!reg2.test(newTEL).val()){
        //     alert("请输入8位或者11位电话！");
        // }else {
        //     alert("last Else");
            $.ajax({
                type: "post",
                url: "/api/school/alterTel",
                dataType: "json",
                data: {
                    newTel: newTEL
                },
                beforeSend: function (XMLHttpRequest) {
                    var Authorization = $.cookie('AuthorizationSchool');
                    XMLHttpRequest.setRequestHeader("Authorization", Authorization);
                },
                success: function (result) {
                    if(result.code===200){
                        alert("修改电话号码成功");
                        window.location.href="/school/profile";
                    }
                },
                error: function (result) {
                    alert("与服务器似乎断开链接，请检查您的网络");
                }
            });
        // }

    })




    $("#cancelEditor").click(function () {
        var schoolIntroductionEditor = $(".schoolIntroductionEditor");
        schoolIntroductionEditor.css("display","none");
        var PschoolIntroduction = $("#PschoolIntroduction");
        PschoolIntroduction.css("display","block");
    });

    function modifySchoolIntroduction(){
        var schoolIntroductionEditor = $(".schoolIntroductionEditor");
        schoolIntroductionEditor.css("display","block");
        var PschoolIntroduction = $("#PschoolIntroduction");
        PschoolIntroduction.css("display","none");
    }



    $("#selectStudentBtn").click(function () {
        var InputEnrollTime = $("#InputEnrollTime");
        var InputStudentName = $("#InputStudentName");
        var InputSelectClasses= $("#InputSelectClasses");
        alert("学生名字：" + InputStudentName.val() + "报名时间："+  InputEnrollTime.val() + "课程名称：" + InputSelectClasses.val() );
    })
});