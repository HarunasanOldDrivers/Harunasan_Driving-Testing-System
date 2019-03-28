$(document).ready(function () {
    //默认进入之后读取2k-3k的驾校
    $.ajax({
        type:"get",
        url:"/api/news/search",
        data:{
            price:"2000-3000",
        },
        dataType:"json",
        success:function (result) {
            alert("success")
        },
        error:function (result) {
            alert("网络好像开了一点小差的呢~");
        }
    });
})