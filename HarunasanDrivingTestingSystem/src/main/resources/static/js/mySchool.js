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
            $("#EnbarkTimeSpan").html(result.data.schoolStartTime.substring(0,10));
            $("#CorporateNameSpan").html(result.data.schoolCorporateName);
            $("#CorporateNumberSpan").html(result.data.schoolCorporateTel);
            $("#PschoolIntroduction").html(result.data.schoolIntroduction);
            $("#imgSchoolDefaultimg").attr("src",result.data.schoolIcon);

        },
        error:function (result) {
            alert("与服务器似乎断开链接，请检查您的网络");
        }
    });

    //提交修改新的报名电话
    $("#BtnSubmitNewTel").click(function () {
        var newTEL =  $("#InputChargerTel").val();
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

    //点击提交按钮，更改首页图片
    $("#AsubmitImage").click(function (){
        var Inputimages = document.getElementById("Inputimages").files[0];
        var formdata = new FormData();
        formdata.append("image",Inputimages);
        $.ajax({
            type:"post",
            url:"/api/school/alterIcon",
            data:formdata,
            async:false,
            processData:false,
            contentType:false,
            beforeSend: function (XMLHttpRequest) {
                var Authorization = $.cookie('AuthorizationSchool');
                XMLHttpRequest.setRequestHeader("Authorization", Authorization);
            },
            success:function (result) {
                alert("success");
            },
            error:function (result) {
                alert("Ajax出了点错呢")
                alert("与服务器似乎断开链接，请检查您的网络");
            }
        });
    });



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