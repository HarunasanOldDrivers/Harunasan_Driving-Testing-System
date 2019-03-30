$(document).ready(function () {

    //当前页
    var pageNum;
    //总题目数
    var total;
    //总页数
    var pages;
    //文章数组存入articles
    var articles;
    //接口有问题
    //获取学车动态
    $.ajax({
        type:"get",
        url:"/api/news/abstract",
        dataType:"json",
        data:{
            type:1,
            pageNum:1,
            pageSize:6,
        },
        success:function (result) {
            articles = result.list;
            var MediaDiv =$("#MediaDiv");
            var LiNavigationFirstWrongLists =  $("#LiNavigationFirstWrongLists");
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
            //动态生成分页
            for (let i = result.pages ; i >= 1 ; i--){
                LiNavigationFirstWrongLists.after("<li></li>");
                LiNavigationFirstWrongLists.next().append("<a></a>");
                LiNavigationFirstWrongLists.next().children("a").attr("href","javascript:void(0);");
                LiNavigationFirstWrongLists.next().children("a").text(i);
                LiNavigationFirstWrongLists.next().children("li").addClass("liNavigation");
            }
            if(LiNavigationFirstWrongLists.next().text() == 1) {
                LiNavigationFirstWrongLists.next().addClass("active");
            }
            pageNum = result.pageNum;
            total = result.total;
            pages = result.pages;
        },
        error:function (result) {
            alert("与服务器似乎断开链接，请检查您的网络");
        }
    });

    //点击分页按钮进行分页
    $("#Ulpagination").on("click","li",function () {
        var pageNo = $(this).text().trim();
        //清空导媒体框，并重新生成
        var MediaDiv =$("#MediaDiv");
        MediaDiv.empty();
        // var Ulpagination = $("#Ulpagination");
        // Ulpagination.empty();
        // var FirstAndLast = $(" <li id=\"LiNavigationFirstWrongLists\" value=\"pre\" >\n" +
        //     "                                        <a href=\"#\" aria-label=\"Previous\" >\n" +
        //     "                                            首页\n" +
        //     "                                        </a>\n" +
        //     "                                    </li>\n" +
        //     "                                    <li id=\"NextviousPagination\">\n" +
        //     "                                        <a href=\"#\" aria-label=\"Next\" >\n" +
        //     "                                            尾页\n" +
        //     "                                        </a>\n" +
        //     "                                    </li>");
        // Ulpagination.append(FirstAndLast);
        // 如果是数字并且不是最后一页，执行跳转
        if(!isNaN(pageNo)){
            $(this).siblings().removeClass("active");
            $(this).addClass("active");
            $.ajax({
                type: "get",
                url: "/api/news/abstract",
                dataType: 'json',
                data: {
                    pageNo: pageNo,
                    type:1,
                    pageNum:pageNo,
                    pageSize:6,
                },
                beforeSend: function (XMLHttpRequest) {
                    var Authorization = $.cookie('AuthorizationSchool');
                    XMLHttpRequest.setRequestHeader("Authorization", Authorization);
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
        }
        //如果是首页一页
        else if(pageNo ==="首页"){
            $(this).siblings().removeClass("active");
            $(this).next().addClass("active");
            $.ajax({
                type: "get",
                url: "/api/news/abstract",
                dataType: 'json',
                data: {
                    pageNo: 1,
                    type:1,
                    pageNum:pages,
                    pageSize:6,
                },
                beforeSend: function (XMLHttpRequest) {
                    var Authorization = $.cookie('AuthorizationSchool');
                    XMLHttpRequest.setRequestHeader("Authorization", Authorization);
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
        }
        else {
            $(this).siblings().removeClass("active");
            $(this).prev().addClass("active");
            //点击最后一页
            $.ajax({
                type: "get",
                url: "/api/news/abstract",
                dataType: 'json',
                data: {
                    pageNo: pages,
                    type:1,
                    pageNum:pages,
                    pageSize:6,
                },
                beforeSend: function (XMLHttpRequest) {
                    var Authorization = $.cookie('AuthorizationSchool');
                    XMLHttpRequest.setRequestHeader("Authorization", Authorization);
                },
                success: function (result) {
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
                error: function () {
                    alert("网络好像开了小差了呢~");
                }
            });
        }

    })

    //创建学校推荐
    $.ajax({
        type:"get",
        url:"/api/news/recommend",
        dataType:"json",
        success:function (result) {
            schools = result.list;
            // alert("Yes");
            var tbodyCommend = $("#tbodyCommend");
            for (let i = 0 ;  i<10 ; i++){
                var tr = $("<tr></tr>")
                var thSchoolName = $("<th class='col-md-5' style=\"vertical-align:middle;\"><a href=\"#\"><strong></strong></a></th>");
                var thCouseName = $("<th class='col-md-4' style=\"vertical-align:middle;\"></th>");
                var thPrice = $("<th class='col-md-3' style=\"vertical-align:middle;\"></th>")
                var BtnEnroll = $("<th style=\"vertical-align:middle;\"><a class=\"btn btn-success\">报名</a></th>");
                thSchoolName.children().children().html(schools[i].schoolName);
                thCouseName.html(schools[i].courseName);
                thPrice.html(schools[i].coursePrice + "元");
                BtnEnroll.val(schools[i].schoolId);
                BtnEnroll.attr("onclick","window.location.href='/schoolCommend/detail?SchoolId=" + schools[i].schoolId + "'" );
                // alert(BtnEnroll.attr("href"));
                tr.append(thSchoolName);
                tr.append(thCouseName);
                tr.append(thPrice);
                tr.append(BtnEnroll);
                tbodyCommend.append(tr);
            }
        },
        error:function (result) {
            alert("网络好像开了一点小差的呢~");
        }
    });

})