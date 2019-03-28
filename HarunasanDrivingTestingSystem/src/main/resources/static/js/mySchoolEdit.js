$(document).ready(function () {
    //把传过来的课程都放在这里
    var classes;
    //当前页
    var pageNum;
    //总题目数
    var total;
    //总页数
    var pages;
    //页面加载之后插入所有课程数据
    $.ajax({
        type:"get",
        url:"/api/school/getCourse",
        dataType:"json",
        beforeSend: function (XMLHttpRequest) {
            var Authorization = $.cookie('AuthorizationSchool');
            XMLHttpRequest.setRequestHeader("Authorization", Authorization);
        },
        success:function (result) {
            var tbodyClasses = $("#tbodyClasses");
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
            var LiNavigationFirstWrongLists =  $("#LiNavigationFirstWrongLists");
            for (var i = result.pages ; i >= 1 ; i--){
                LiNavigationFirstWrongLists.after("<li></li>");
                LiNavigationFirstWrongLists.next().append("<a></a>");
                LiNavigationFirstWrongLists.next().children("a").attr("href","javascript:void(0);");
                LiNavigationFirstWrongLists.next().children("a").text(i);
                LiNavigationFirstWrongLists.next().children("li").addClass("liNavigation");
            }
            pageNum = result.pageNum;
            total = result.total;
            pages = result.pages;
        },
        error:function (result) {
            alert("与服务器似乎断开链接，请检查您的网络");
        }
    });

    //点击添加课程按钮添加课程
    $("#registerBtn").click(function () {
        var ClassIntroductionTextarea = $("#ClassIntroductionTextarea");
        var InputClassPrice = $("#InputClassPrice");
        var InputClassName =$("#InputClassName");
        if(ClassIntroductionTextarea.val() && InputClassPrice.val() && InputClassName.val() ){
            $.ajax({
                type:"post",
                url:"/api/school/addCourse",
                dataType:"json",
                data:{
                    courseId:"123",
                    courseName: InputClassName.val(),
                    price:InputClassPrice.val(),
                    describe:ClassIntroductionTextarea.val()
              },
                beforeSend: function (XMLHttpRequest) {
                    var Authorization = $.cookie('AuthorizationSchool');
                    XMLHttpRequest.setRequestHeader("Authorization", Authorization);
                },
                success:function (result) {
                    alert("添加课程成功");
                    window.location.href="/school/classes"
                },
                error:function (result) {
                    alert("与服务器似乎断开链接，请检查您的网络");
                }
            });
        }else{
            alert("请填写所有信息后再进行提交哦")
        }
    })
    
    $("#deleteModel").click(function () {
        
    })

    //全局变量classes数组在第一个Ajax请求时候的下标，每次打开模态框，读取同时赋值给delete按钮的data-whatever
    //属性，找到Classes[i] 中的i，之后如果点击“确认删除”进行删除
    var ClassesWantToDeleteIndex;
    var relatedTargerBtn
    var DeleteModal = $("#DeleteModal");

    DeleteModal.on('show.bs.modal',function (event) {
        relatedTargerBtn = $(event.relatedTarget);
        ClassesWantToDeleteIndex = relatedTargerBtn.attr("data-whatever");
    });

    //清除模态框打开的Cache以防意外,有可能绑定两个按钮
    DeleteModal.on('hidden.bs.modal',function (event) {
        relatedTargerBtn = ""
    });

    //点击模态框中的删除按钮，删除课程
    $("#BtnDeleteClass").click(function () {
        $.ajax({
            type:"post",
            url:"/api/school/closeCourse",
            dataType:"json",
            data:{
                courseId:classes[ClassesWantToDeleteIndex].courseId
            },
            beforeSend: function (XMLHttpRequest) {
                var Authorization = $.cookie('AuthorizationSchool');
                XMLHttpRequest.setRequestHeader("Authorization", Authorization);
            },
            success:function (result) {
                alert("删除成功");
                window.location.href="/school/classes";
            },
            error:function (result) {
                alert("与服务器似乎断开链接，请检查您的网络");
            }
        });
    })



});