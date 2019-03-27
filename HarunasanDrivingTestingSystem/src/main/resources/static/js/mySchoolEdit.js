$(document).ready(function () {
    var classes;
    // $.ajax({
    //     type:"get",
    //     url:"/api/school/profile",
    //     dataType:"json",
    //     beforeSend: function (XMLHttpRequest) {
    //         var Authorization = $.cookie('AuthorizationSchool');
    //         XMLHttpRequest.setRequestHeader("Authorization", Authorization);
    //     },
    //     success:function (result) {
    //         var TrClasses = $("#TrClasses");
    //         classes = result.data.schoolCourses;
    //         alert(classes[0].courseName);
    //         TrClasses.children("th").eq(0).text(classes[0].courseName);
    //         TrClasses.children("th").eq(1).text(classes[0].courseDescribe);
    //         TrClasses.children("th").eq(2).text(classes[0].coursePrice);
    //         TrClasses.children("th").eq(3).text(classes[0].coursePrice);
    //     },
    //     error:function (result) {
    //         alert("与服务器似乎断开链接，请检查您的网络");
    //     }
    // });

    $.ajax({
        type:"get",
        url:"/api/school/getCourse",
        dataType:"json",
        beforeSend: function (XMLHttpRequest) {
            var Authorization = $.cookie('AuthorizationSchool');
            XMLHttpRequest.setRequestHeader("Authorization", Authorization);
        },
        success:function (result) {
            var TrClasses = $("#TrClasses");
            classes = result.list;
            alert(classes[0].courseName + "New interface");
            TrClasses.children("th").eq(0).text(classes[0].courseName);
            TrClasses.children("th").eq(1).text(classes[0].courseDescribe);
            TrClasses.children("th").eq(2).text(classes[0].coursePrice);
            TrClasses.children("th").eq(3).text(classes[0].count);
            alert(classes.length);
        },
        error:function (result) {
            alert("与服务器似乎断开链接，请检查您的网络");
        }
    });


});