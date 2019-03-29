$(document).ready(function () {
    //课程存放在这个变量里面
    var classes;
    //学生信息放这个变量里面
    var students;
    //当前页
    var pageNum;
    //总题目数
    var total;
    //总页数
    var pages;
    //得到所有课程显示在select框里面
    $.ajax({
        type:"get",
        url:"/api/school/courseName",
        dataType:"json",
        data:{
        },
        beforeSend: function (XMLHttpRequest) {
            var Authorization = $.cookie('AuthorizationSchool');
            XMLHttpRequest.setRequestHeader("Authorization", Authorization);
        },
        success:function (result) {
            //得到课程插入到select里面的option去
            classes = result.data;
            var InputSelectClasses = $("#InputSelectClasses");
            var singleOptionNull = $("<option></option>");
            InputSelectClasses.append(singleOptionNull);
            for (let i = 0 ; i <classes.length ; i++) {
                var singleOption = $("<option></option>");
                singleOption.append(classes[i].courseName);
                singleOption.val(classes[i].courseId);
                InputSelectClasses.append(singleOption);
            }
            pageNum = result.pageNum;
            total = result.total;
            pages = result.pages;
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
                pageNum = result.pageNum;
                total = result.total;
                pages = result.pages;
                students = result.list;
                //在表格中插入所有数据
                //清空表格和分页栏，并且重新获取
                var tbodyStudent = $("#tbodyStudent");
                var Ulpagination = $("#Ulpagination");
                tbodyStudent.empty();
                Ulpagination.empty();
                var FirstAndLast = $(" <li id=\"LiNavigationFirstWrongLists\" value=\"pre\" >\n" +
                    "                                        <a href=\"#\" aria-label=\"Previous\" >\n" +
                    "                                            首页\n" +
                    "                                        </a>\n" +
                    "                                    </li>\n" +
                    "                                    <li id=\"NextviousPagination\">\n" +
                    "                                        <a href=\"#\" aria-label=\"Next\" >\n" +
                    "                                            尾页\n" +
                    "                                        </a>\n" +
                    "                                    </li>");
                Ulpagination.append(FirstAndLast);
                // 生成表格
                for(i=0 ; i < students.length ; i ++){
                    var Tr = $("<tr></tr>");
                    //插入课程名称，生成对应表格
                    var thClassName= $("<th class=\"\"></th>");
                    var thStudentName= $("<th class=\"\"></th>");
                    var thStudentTelephone= $("<th class=\"\"></th>");
                    var thenrollDateTime= $("<th class=\"\"></th>");
                    thClassName.append(students[i].courseName);
                    thStudentName.append(students[i].userName);
                    thStudentTelephone.append(students[i].userTelephone);
                    thenrollDateTime.append(students[i].enrollDateTime.substring(0,10));
                    Tr.append(thClassName);
                    Tr.append(thStudentName);
                    Tr.append(thStudentTelephone);
                    Tr.append(thenrollDateTime);
                    tbodyStudent.append(Tr);
                }
                //生成分页栏
                var LiNavigationFirstWrongLists =  $("#LiNavigationFirstWrongLists");
                for (var i = result.pages ; i >= 1 ; i--){
                    LiNavigationFirstWrongLists.after("<li></li>");
                    LiNavigationFirstWrongLists.next().append("<a></a>");
                    LiNavigationFirstWrongLists.next().children("a").attr("href","javascript:void(0);");
                    LiNavigationFirstWrongLists.next().children("a").text(i);
                    LiNavigationFirstWrongLists.next().children("li").addClass("liNavigation");
                }
                if(LiNavigationFirstWrongLists.next().text() === 1){
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
    })

    //点击分页按钮进行分页
    $("#Ulpagination").on("click","li",function () {
        var pageNo = $(this).text().trim();
        // 如果是数字并且不是最后一页，执行跳转
        if(!isNaN(pageNo) && pageNo !==pages  ){
            $(this).siblings().removeClass("active");
            $(this).addClass("active");
            $.ajax({
                type: "get",
                url: "/api/school/getCourse",
                dataType: 'json',
                data: {
                    pageSize: 5,
                    pageNo: pageNo
                },
                beforeSend: function (XMLHttpRequest) {
                    var Authorization = $.cookie('AuthorizationSchool');
                    XMLHttpRequest.setRequestHeader("Authorization", Authorization);
                },
                success: function (result) {
                    var tbodyClasses = $("#tbodyClasses");
                    //首先清空元素下所有字节点
                    tbodyClasses.empty();
                    classes = result.list;
                    //在表格中插入所有数据
                    for(i=0 ; i < classes.length ; i ++){
                        var Tr = $("<tr></tr>");
                        //插入课程名称，生成对应表格
                        var thClassName= $("<th class=\"text-center\"></th>");
                        var thClassDetail= $("<th class=\"text-center\"></th>");
                        var thClassPrice= $("<th class=\"text-center\"></th>");
                        var thEnrollNumber= $("<th class=\"text-center\"></th>");
                        var thDeleteBtn = $("<th><button class=\"btn btn-danger\" data-toggle=\"modal\" data-target=\"#DeleteModal\">删除</button></th>")
                        thClassName.append(classes[i].courseName);
                        thClassDetail.append(classes[i].courseDescribe);
                        thClassDetail.addClass("col-md-3");
                        thClassPrice.append(classes[i].coursePrice);
                        thEnrollNumber.append(classes[i].count);
                        //
                        thDeleteBtn.find("button").text("删除");
                        thDeleteBtn.find("button").attr("data-whatever",i);
                        Tr.append(thClassName);
                        Tr.append(thClassDetail);
                        Tr.append(thClassPrice);
                        Tr.append(thEnrollNumber);
                        Tr.append(thDeleteBtn);
                        tbodyClasses.append(Tr);
                    }
                    // 生成导航页数量
                    pageNum = result.pageNum;
                    total = result.total;
                    pages = result.pages;
                },
                error: function () {
                    $("#SpanQuestionId").html("");
                    $("#SpanQuestionTitle").html("");
                    alert("网络好像开了小差了呢~");
                }
            });
        }
        //如果是数字并且是最后
        else if(pageNo ==="首页"){
            $(this).siblings().removeClass("active");
            $(this).next().addClass("active");
            $.ajax({
                type: "get",
                url: "/api/school/getCourse",
                dataType: 'json',
                data: {
                    pageSize: 5,
                    pageNo: 1
                },
                beforeSend: function (XMLHttpRequest) {
                    var Authorization = $.cookie('AuthorizationSchool');
                    XMLHttpRequest.setRequestHeader("Authorization", Authorization);
                },
                success: function (result) {
                    var tbodyClasses = $("#tbodyClasses");
                    //首先清空元素下所有字节点
                    tbodyClasses.empty();
                    classes = result.list;
                    //在表格中插入所有数据
                    for(i=0 ; i < classes.length ; i ++){
                        var Tr = $("<tr></tr>");
                        //插入课程名称，生成对应表格
                        var thClassName= $("<th class=\"text-center\"></th>");
                        var thClassDetail= $("<th class=\"text-center\"></th>");
                        var thClassPrice= $("<th class=\"text-center\"></th>");
                        var thEnrollNumber= $("<th class=\"text-center\"></th>");
                        var thDeleteBtn = $("<th><button class=\"btn btn-danger\" data-toggle=\"modal\" data-target=\"#DeleteModal\">删除</button></th>")
                        thClassName.append(classes[i].courseName);
                        thClassDetail.append(classes[i].courseDescribe);
                        thClassDetail.addClass("col-md-3");
                        thClassPrice.append(classes[i].coursePrice);
                        thEnrollNumber.append(classes[i].count);
                        thDeleteBtn.find("button").text("删除");
                        thDeleteBtn.find("button").attr("data-whatever",i);
                        Tr.append(thClassName);
                        Tr.append(thClassDetail);
                        Tr.append(thClassPrice);
                        Tr.append(thEnrollNumber);
                        Tr.append(thDeleteBtn);
                        tbodyClasses.append(Tr);
                    }
                    pageNum = result.pageNum;
                    total = result.total;
                    pages = result.pages;
                },
                error: function () {
                    $("#SpanQuestionId").html("");
                    $("#SpanQuestionTitle").html("");
                    alert("网络好像开了小差了呢~");
                }
            });
        }
        else {
            $(this).siblings().removeClass("active");
            $(this).prev().addClass("active");
            //点击最后一页
            $.ajax({
                type: "get",
                url: "/api/school/getCourse",
                dataType: 'json',
                data: {
                    pageSize: 5,
                    pageNo: pages
                },
                beforeSend: function (XMLHttpRequest) {
                    var Authorization = $.cookie('AuthorizationSchool');
                    XMLHttpRequest.setRequestHeader("Authorization", Authorization);
                },
                success: function (result) {
                    var tbodyClasses = $("#tbodyClasses");
                    //首先清空元素下所有字节点
                    tbodyClasses.empty();
                    classes = result.list;
                    //在表格中插入所有数据
                    for(i=0 ; i < classes.length ; i ++){
                        var Tr = $("<tr></tr>");
                        //插入课程名称，生成对应表格
                        var thClassName= $("<th class=\"text-center\"></th>");
                        var thClassDetail= $("<th class=\"text-center\"></th>");
                        var thClassPrice= $("<th class=\"text-center\"></th>");
                        var thEnrollNumber= $("<th class=\"text-center\"></th>");
                        var thDeleteBtn = $("<th><button class=\"btn btn-danger\" data-toggle=\"modal\" data-target=\"#DeleteModal\">删除</button></th>")
                        thClassName.append(classes[i].courseName);
                        thClassDetail.append(classes[i].courseDescribe);
                        thClassDetail.addClass("col-md-3");
                        thClassPrice.append(classes[i].coursePrice);
                        thEnrollNumber.append(classes[i].count);
                        //
                        thDeleteBtn.find("button").text("删除");
                        thDeleteBtn.find("button").attr("data-whatever",i);
                        Tr.append(thClassName);
                        Tr.append(thClassDetail);
                        Tr.append(thClassPrice);
                        Tr.append(thEnrollNumber);
                        Tr.append(thDeleteBtn);
                        tbodyClasses.append(Tr);
                    }
                    pageNum = result.pageNum;
                    total = result.total;
                    pages = result.pages;
                },
                error: function () {
                    $("#SpanQuestionId").html("");
                    $("#SpanQuestionTitle").html("");
                    alert("网络好像开了小差了呢~");
                }
            });
        }

    })
});