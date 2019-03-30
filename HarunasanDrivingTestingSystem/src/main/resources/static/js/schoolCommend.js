$(document).ready(function () {
    $("#nav").load("../nav",function () {
        // 在载入完成之后改变状态
        $("#mainpage").removeClass("active");
        $("#schoolCommend").addClass("active");
    });
    //默认进入之后读取2k-3k的驾校
    var schools;
    //当前页
    var pageNum;
    //总题目数
    var total;
    //总页数
    var pages;
    //请求Ajax传输驾校信息
    $.ajax({
        type:"get",
        url:"/api/news/search",
        data:{
            price:"0-2000",
        },
        dataType:"json",
        success:function (result) {
            schools = result.list;
            console.log(schools);
            // alert(schools[0].schoolIcon);
            var LiNavigationFirstWrongLists =  $("#LiNavigationFirstWrongLists");
            var panelHeading = $("#panelHeading");
            // 生成驾校pannelBody
            for (var i = 0 ;  i< result.list.length ; i++){
                var OutSidediv = $("<div class=\"panel-body\"></div>");
               var divMedia = $("<div class=\"media\"></div>");
               var divMediaA = $("<a href=\"#\" class=\"media-left\"></a>");
               var divMediaAImg = $("<img src=\"\" alt=\"\" height=\"150\" width=\"250\"/>");
               divMediaAImg.attr("src",result.list[i].schoolIcon);
               divMediaA.append(divMediaAImg);
               divMedia.append(divMedia);
               //a标签以上做完
               var divMediaBody =$("<div class=\"media-body\" ></div>");
               var br = $("<br>");
               var divMediaBodyH4 = $("<h4 class=\"media-heading col-md-offset-1\"></h4>");
               var divMediaBodyH4A = $("<a href=\"#\"></a>");
               divMediaBodyH4A.attr("href","/schoolCommend/detail?" + "SchoolId=" + result.list[i].schoolId);
                divMediaBodyH4A.text(result.list[i].schoolName);
               var divMediaBodyH4Span = $("<span class=\"schoolPrice\"></span>");
               var divMediaBodyH4SpanStrong = $("<strong></strong>");
                divMediaBodyH4SpanStrong.text(result.list[i].schoolStartPrice);
               var divMediaBodyH4SpanSpan =$("<span>起</span>");
                divMediaBodyH4Span.append(divMediaBodyH4SpanStrong);
                divMediaBodyH4Span.append(divMediaBodyH4SpanSpan);
                divMediaBodyH4.append(divMediaBodyH4A);
                divMediaBodyH4.append(divMediaBodyH4Span);
            //    Mediabody h4以内做完
                var divMediaBodyDiv = $("<div class=\"myapp-score col-md-offset-1\"></div>")
                var divMediaBodyDiv1 = $("<div></div>");
                divMediaBodyDiv1.attr("id","schoolScore" + i);
                divMediaBodyDiv.append(divMediaBodyDiv1);
            //    星星DIV做完
                var divMediaBodySchoolDisc = $("<div class=\"schoolDisc col-md-offset-1\" ></div>");
                var divMediaBodySchoolDiscSpan =$("<span class=\"detialDics\"></span>");
                divMediaBodySchoolDiscSpan.text(result.list[i].schoolArea + result.list[i].schoolDetailAddress );
                divMediaBodySchoolDisc.append(divMediaBodySchoolDiscSpan);
            //    驾校详细地址做完
                var br2 = $("<br>");
                var AShowDetail =$("<a class=\"btn btn-info col-md-offset-1\">查看详情</a>");
                AShowDetail.attr("href","/schoolCommend/detail?" + "SchoolId=" + result.list[i].schoolId);
                //按钮做完，下面加media-body里面的标签
                divMediaBody.append(br);
                divMediaBody.append(divMediaBodyH4);
                divMediaBody.append(divMediaBodyDiv);
                divMediaBody.append(divMediaBodySchoolDisc);
                divMediaBody.append(br2);
                divMediaBody.append(AShowDetail);
            //    media-body做完，下面最后整合
                divMedia.append(divMediaA);
                divMedia.append(divMediaBody);
                OutSidediv.append(divMedia);
                panelHeading.after(OutSidediv);
            }
            //生成分页
            for (var i = result.pages ; i >= 1 ; i--){
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
            alert("网络好像开了一点小差的呢~");
        }
    });

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

    //点击查询btn，刷新查询的学校数据
    $("#selectBtn").click(function () {
        var InputDistrict = $("#InputDistrict");
        var InputPrice = $("#InputPrice");
        var InputSchoolName = $("#InputSchoolName");
        if(!InputPrice.val() && !InputDistrict.val() && !InputSchoolName.val() ){
            $.ajax({
                type:"get",
                url:"/api/news/search",
                data:{
                    price:"0-99999",
                },
                dataType:"json",
                success:function (result) {
                    schools = result.list;
                    console.log(schools);
                    // alert(schools[0].schoolIcon);
                    var LiNavigationFirstWrongLists =  $("#LiNavigationFirstWrongLists");
                    var panelHeading = $("#panelHeading");
                    //清空驾校List
                    for( i = 0 ; i < total ; i++){
                        panelHeading.next().remove();
                    }
                    //清空分页
                    for (let i = result.pages ; i >= 1 ; i--){
                        LiNavigationFirstWrongLists.next().remove();
                    }
                    // 生成驾校pannelBody
                    for (let i = 0 ;  i< result.list.length ; i++){
                        var OutSidediv = $("<div class=\"panel-body\"></div>");
                        var divMedia = $("<div class=\"media\"></div>");
                        var divMediaA = $("<a href=\"#\" class=\"media-left\"></a>");
                        var divMediaAImg = $("<img src=\"\" alt=\"\" height=\"150\" width=\"250\"/>");
                        divMediaAImg.attr("src",result.list[i].schoolIcon);
                        divMediaA.append(divMediaAImg);
                        divMedia.append(divMedia);
                        //a标签以上做完
                        var divMediaBody =$("<div class=\"media-body\" ></div>");
                        var br = $("<br>");
                        var divMediaBodyH4 = $("<h4 class=\"media-heading col-md-offset-1\"></h4>");
                        var divMediaBodyH4A = $("<a href=\"#\"></a>");
                        divMediaBodyH4A.attr("href","/schoolCommend/detail?" + "SchoolId=" + result.list[i].schoolId);
                        divMediaBodyH4A.text(result.list[i].schoolName);
                        var divMediaBodyH4Span = $("<span class=\"schoolPrice\"></span>");
                        var divMediaBodyH4SpanStrong = $("<strong></strong>");
                        divMediaBodyH4SpanStrong.text(result.list[i].schoolStartPrice);
                        var divMediaBodyH4SpanSpan =$("<span>起</span>");
                        divMediaBodyH4Span.append(divMediaBodyH4SpanStrong);
                        divMediaBodyH4Span.append(divMediaBodyH4SpanSpan);
                        divMediaBodyH4.append(divMediaBodyH4A);
                        divMediaBodyH4.append(divMediaBodyH4Span);
                        //    Mediabody h4以内做完
                        var divMediaBodyDiv = $("<div class=\"myapp-score col-md-offset-1\"></div>")
                        var divMediaBodyDiv1 = $("<div></div>");
                        divMediaBodyDiv1.attr("id","schoolScore" + i);
                        divMediaBodyDiv.append(divMediaBodyDiv1);
                        //    星星DIV做完
                        var divMediaBodySchoolDisc = $("<div class=\"schoolDisc col-md-offset-1\" ></div>");
                        var divMediaBodySchoolDiscSpan =$("<span class=\"detialDics\"></span>");
                        divMediaBodySchoolDiscSpan.text(result.list[i].schoolArea + result.list[i].schoolDetailAddress );
                        divMediaBodySchoolDisc.append(divMediaBodySchoolDiscSpan);
                        //    驾校详细地址做完
                        var br2 = $("<br>");
                        var AShowDetail =$("<a class=\"btn btn-info col-md-offset-1\">查看详情</a>");
                        AShowDetail.attr("href","/schoolCommend/detail?" + "SchoolId=" + result.list[i].schoolId);
                        //按钮做完，下面加media-body里面的标签
                        divMediaBody.append(br);
                        divMediaBody.append(divMediaBodyH4);
                        divMediaBody.append(divMediaBodyDiv);
                        divMediaBody.append(divMediaBodySchoolDisc);
                        divMediaBody.append(br2);
                        divMediaBody.append(AShowDetail);
                        //    media-body做完，下面最后整合
                        divMedia.append(divMediaA);
                        divMedia.append(divMediaBody);
                        OutSidediv.append(divMedia);
                        panelHeading.after(OutSidediv);
                    }
                    //生成分页
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
                    alert("网络好像开了一点小差的呢~");
                }
            });
        }else {
            $.ajax({
                type:"get",
                url:"/api/news/search",
                data:{
                    price:InputPrice.val(),
                    area:InputDistrict.val(),
                    schoolName:InputSchoolName.val(),
                },
                dataType:"json",
                success:function (result) {
                    schools = result.list;
                    console.log(schools);
                    // alert(schools[0].schoolIcon);
                    var LiNavigationFirstWrongLists =  $("#LiNavigationFirstWrongLists");
                    var panelHeading = $("#panelHeading");
                    //清空驾校List
                    for( i = 0 ; i < total ; i++){
                        panelHeading.next().remove();
                    }
                    //清空分页
                    for (let i = result.pages ; i >= 1 ; i--){
                        LiNavigationFirstWrongLists.next().remove();
                    }
                    // 生成驾校pannelBody
                    for (let i = 0 ;  i< result.list.length ; i++){
                        var OutSidediv = $("<div class=\"panel-body\"></div>");
                        var divMedia = $("<div class=\"media\"></div>");
                        var divMediaA = $("<a href=\"#\" class=\"media-left\"></a>");
                        var divMediaAImg = $("<img src=\"\" alt=\"\" height=\"150\" width=\"250\"/>");
                        divMediaAImg.attr("src",result.list[i].schoolIcon);
                        divMediaA.append(divMediaAImg);
                        divMedia.append(divMedia);
                        //a标签以上做完
                        var divMediaBody =$("<div class=\"media-body\" ></div>");
                        var br = $("<br>");
                        var divMediaBodyH4 = $("<h4 class=\"media-heading col-md-offset-1\"></h4>");
                        var divMediaBodyH4A = $("<a href=\"#\"></a>");
                        divMediaBodyH4A.attr("href","/schoolCommend/detail?" + "SchoolId=" + result.list[i].schoolId);
                        divMediaBodyH4A.text(result.list[i].schoolName);
                        var divMediaBodyH4Span = $("<span class=\"schoolPrice\"></span>");
                        var divMediaBodyH4SpanStrong = $("<strong></strong>");
                        divMediaBodyH4SpanStrong.text(result.list[i].schoolStartPrice);
                        var divMediaBodyH4SpanSpan =$("<span>起</span>");
                        divMediaBodyH4Span.append(divMediaBodyH4SpanStrong);
                        divMediaBodyH4Span.append(divMediaBodyH4SpanSpan);
                        divMediaBodyH4.append(divMediaBodyH4A);
                        divMediaBodyH4.append(divMediaBodyH4Span);
                        //    Mediabody h4以内做完
                        var divMediaBodyDiv = $("<div class=\"myapp-score col-md-offset-1\"></div>")
                        var divMediaBodyDiv1 = $("<div></div>");
                        divMediaBodyDiv1.attr("id","schoolScore" + i);
                        divMediaBodyDiv.append(divMediaBodyDiv1);
                        //    星星DIV做完
                        var divMediaBodySchoolDisc = $("<div class=\"schoolDisc col-md-offset-1\" ></div>");
                        var divMediaBodySchoolDiscSpan =$("<span class=\"detialDics\"></span>");
                        divMediaBodySchoolDiscSpan.text(result.list[i].schoolArea + result.list[i].schoolDetailAddress );
                        divMediaBodySchoolDisc.append(divMediaBodySchoolDiscSpan);
                        //    驾校详细地址做完
                        var br2 = $("<br>");
                        var AShowDetail =$("<a class=\"btn btn-info col-md-offset-1\">查看详情</a>");
                        AShowDetail.attr("href","/schoolCommend/detail?" + "SchoolId=" + result.list[i].schoolId);
                        //按钮做完，下面加media-body里面的标签
                        divMediaBody.append(br);
                        divMediaBody.append(divMediaBodyH4);
                        divMediaBody.append(divMediaBodyDiv);
                        divMediaBody.append(divMediaBodySchoolDisc);
                        divMediaBody.append(br2);
                        divMediaBody.append(AShowDetail);
                        //    media-body做完，下面最后整合
                        divMedia.append(divMediaA);
                        divMedia.append(divMediaBody);
                        OutSidediv.append(divMedia);
                        panelHeading.after(OutSidediv);
                    }
                    //生成分页
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
                    alert("网络好像开了一点小差的呢~");
                }
            });
        }
    });

    $("#resetBtn").click(function () {
        $("#InputDistrict").html("");
        $("#InputSchoolName").val("");
        $("#InputPrice").val("");
    })



})