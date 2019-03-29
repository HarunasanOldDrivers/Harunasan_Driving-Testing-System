$(document).ready(function () {

    var articles;
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
            articles = result.list;
            var MediaDiv =$("#MediaDiv");
            //动态生成左边的主要文章List
            for (i=0 ; i< result.list.length ; i++){
                var divMedia = $("<div class=\"media\" ></div>");
                var divMediaBody = $("<div class=\"media-body container\"></div>");
                var divMediaBodyH4 = $("<h4 class=\"media-heading\"></h4>");
                var divMediaBodyH4A = $("<a href=\"#\"></a>");
            //    此处插入a标签onclick属性
                divMediaBodyH4A.attr("onclick","window.location.href='/information/article?newsid=" + result.list[i].newsId + "'");
                divMediaBodyH4A.append(result.list[i].newsTitle);
                    divMediaBodyH4.append(divMediaBodyH4A);
                var divMediaBody2 = $("<div class=\"media-body\" style=\"padding-top: 10px;\"></div>");
                var divMediaBody2A = $("<a class=\"media-left col-lg-2\" href=\"#\"></a>");
                var divMediaBody2AImg = $("<img src=\"\" height=\"80px\" width=\"120px\">");
                    divMediaBody2AImg.attr("src",result.list[i].newsImage);
                    divMediaBody2A.append(divMediaBody2AImg);
                    divMediaBody2.append(divMediaBody2A);
            //    此处插入图片链接
                var divMediaBody2Div =$("<div class=\"shortArticle\"></div>");
                var divMediaBody2DivP = $("<p class=\"col-lg-9\" style=\"margin-left: 10px\"></p>");
                    divMediaBody2DivP.append("&emsp;" + result.list[i].newsContent);
                    // divMediaBody2Div.append(divMediaBody2DivP);
            //    此处插入P标签为正文"发布时间：" + result.data.newsEditTime.substring(0,10) + "&nbsp;" + result.data.newsEditTime.substring(12,20)
                var divMediaBody2DivPbr = $("<br>");
                var divMediaBody2DivPSpan = $("<span class=\"ArticleTime col-lg-offset-7\"></span>")
                    divMediaBody2DivPSpan.html(result.list[i].newsEditTime.substring(0,10));
            //    插入时间
            //    p标签插入顺序：先插入text再插入br再插入span时间
                    divMediaBody2DivP.append(divMediaBody2DivPbr).append(divMediaBody2DivPSpan);
                    divMediaBody2Div.append(divMediaBody2DivP);
                    divMediaBody2.append(divMediaBody2Div);
                    divMediaBody.append(divMediaBodyH4);
                    divMediaBody.append(divMediaBody2);
                    divMedia.append(divMediaBody);
                    MediaDiv.append(divMedia);
            }


        },
        error:function (result) {
            alert("与服务器似乎断开链接，请检查您的网络");
        }
    });
    $.ajax({
        type:"get",
        url:"/api/news/abstract",
        dataType:"json",
        data:{
            type:2
        },
        success:function (result) {
            articles = result.list;
            var MediaDiv =$("#MediaDiv");
            //动态生成左边的主要文章List
            for (i=0 ; i< result.list.length ; i++){
                var divMedia = $("<div class=\"media\" ></div>");
                var divMediaBody = $("<div class=\"media-body container\"></div>");
                var divMediaBodyH4 = $("<h4 class=\"media-heading\"></h4>");
                var divMediaBodyH4A = $("<a href=\"#\"></a>");
                //    此处插入a标签onclick属性
                divMediaBodyH4A.attr("onclick","window.location.href='/information/article?newsid=" + result.list[i].newsId + "'");
                divMediaBodyH4A.append(result.list[i].newsTitle);
                divMediaBodyH4.append(divMediaBodyH4A);
                var divMediaBody2 = $("<div class=\"media-body\" style=\"padding-top: 10px;\"></div>");
                var divMediaBody2A = $("<a class=\"media-left col-lg-2\" href=\"#\"></a>");
                var divMediaBody2AImg = $("<img src=\"\" height=\"80px\" width=\"120px\">");
                divMediaBody2AImg.attr("src",result.list[i].newsImage);
                divMediaBody2A.append(divMediaBody2AImg);
                divMediaBody2.append(divMediaBody2A);
            }


        },
        error:function (result) {
            alert("与服务器似乎断开链接，请检查您的网络");
        }
    });


})