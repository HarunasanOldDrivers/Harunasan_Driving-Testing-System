$(document).ready(function () {

    //接口有问题
    //获取学车动态
    $.ajax({
        type:"get",
        url:"/api/news/abstract",
        dataType:"json",
        data:{
            type:1
        },
        success:function (result) {
            var divMedia = $("<div class=\"media\" ></div>");
            var divMediaBody = $("<div class=\"media-body container\"></div>");
            var divMediaBodyH4 = $("<h4 class=\"media-heading\"></h4>");
            var divMediaBodyH4A = $("<a href=\"#\"></a>");
        //    此处插入a标签onclick属性
            divMediaBodyH4.append(divMediaBodyH4A);
            var divMediaBody2 = $("<div class=\"media-body\" style=\"padding-top: 10px;\"></div>");
            var divMediaBody2A = $("<a class=\"media-left col-lg-2\" href=\"#\"></a>");
            var divMediaBody2AImg = $("<img src=\"\" height=\"80px\" width=\"120px\">");
        //    此处插入图片链接
            var divMediaBody2Div =$("<div class=\"shortArticle\"></div>");
            var divMediaBody2DivP = $("<p class=\"col-lg-9\" style=\"margin-left: 10px\"></p>");
        //    此处插入P标签为正文
            var divMediaBody2DivPbr = $("<br>");
            var divMediaBody2DivPSpan = $("<span class=\"ArticleTime col-lg-offset-7\"></span>")
        //    插入时间
        //    p标签插入顺序：先插入text再插入br再插入span时间



        },
        error:function (result) {
            alert("与服务器似乎断开链接，请检查您的网络");
        }
    });


})