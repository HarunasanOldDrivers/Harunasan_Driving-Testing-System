$(document).ready(function () {
    //课程存放在这个变量里面
    var classes;
    //得到所有课程显示在select框里面
    $.ajax({
        type:"get",
        url:"/api/school/getCourse",
        dataType:"json",
        data:{
        },
        beforeSend: function (XMLHttpRequest) {
            var Authorization = $.cookie('AuthorizationSchool');
            XMLHttpRequest.setRequestHeader("Authorization", Authorization);
        },
        success:function (result) {
            //得到课程插入到select里面的option去
            classes = result.list;
            var InputSelectClasses = $("#InputSelectClasses");
            for (let i = 0 ; i <classes.length ; i++) {
                var singleOption = $("<option></option>");
                singleOption.append(classes[i].courseName);
                singleOption.val(classes[i].courseId);
                InputSelectClasses.append(singleOption);
            }
        },
        error:function (result) {
            alert("与服务器似乎断开链接，请检查您的网络");
        }
    });



    //点击查询按钮，查询对应数据
    $("#selectStudentBtn").click(function () {
        var InputEnrollTime = $("#InputEnrollTime");
        var InputStudentName = $("#InputStudentName");
        var InputSelectClasses= $("#InputSelectClasses");
        // alert("学生名字：" + InputStudentName.val() + "报名时间："+  InputEnrollTime.val() + "课程名称：" + InputSelectClasses.val() );
        $.ajax({
            type:"get",
            url:"/api/school/selectEnroll",
            dataType:"json",
            data:{
                studentName:InputStudentName.val(),
                enrollDate:InputEnrollTime.val(),
                courseId:InputSelectClasses.val()
            },
            beforeSend: function (XMLHttpRequest) {
                var Authorization = $.cookie('AuthorizationSchool');
                XMLHttpRequest.setRequestHeader("Authorization", Authorization);
            },
            success:function (result) {
                alert(result.mes);
            },
            error:function (result) {
                alert("与服务器似乎断开链接，请检查您的网络");
            }
        });
    })
});