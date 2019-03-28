$(document).ready(function () {
    $.ajax({
        type:"get",
        url:"/api/user/profile",
        dataType:"json",
        beforeSend: function (XMLHttpRequest) {
            var Authorization = $.cookie('Authorization');
            XMLHttpRequest.setRequestHeader("Authorization", Authorization);
        },
        // success:function (result) {
        //     alert("success");
        // }
        success:function (result) {
            alert("success");
        },
    });
})