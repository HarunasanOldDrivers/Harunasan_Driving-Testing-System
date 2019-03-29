$(document).ready(function () {


    var registerBtn = $("#registerBtn");
    registerBtn.click(function () {
        var InputStudentName = $("#InputStudentName");
        var InputStudentTel = $("#InputStudentTel");
        var selectClass = $("#selectClasses option:selected").val();
        selectClass = parseInt(selectClass);
        if( InputStudentName.val() && InputStudentTel.val() && selectClass){
            $.ajax({
                type:"Post",
                url:"/api/user/enroll",
                dataType:"json",
                data:{
                    courseId:selectClass,
                    username:InputStudentName.val(),
                    telephone:InputStudentTel.val(),
                },
                beforeSend: function (XMLHttpRequest) {
                    var Authorization = $.cookie('Authorization');
                    XMLHttpRequest.setRequestHeader("Authorization", Authorization);
                },
                success:function (result) {
                    if(result.code ===510){
                        alert("请先登录哟~");
                    }else if(result.code ===600){
                        alert("请填写所有的信息哟");
                    }else if(result.code ===401){
                        alert("请登陆后再报名呢");
                    }else if(result.code ===200){
                        alert("报名成功呢，驾校管理人员会通过电话跟你联系~");
                        window.location.href="/schoolCommend/";
                    }else {
                        alert("网络可能有点问题的呢~");
                    }
                },
                error:function (result) {
                    alert("网络好像开了一点小差的呢~");
                }
            });

        }else {
            alert("请填写所有的信息哟");
        }


    })
    //把传过来的课程都放在这里
    var classes;
    //当前页
    var pageNum;
    //总题目数
    var total;
    //总页数
    var pages;

    var SchoolId = getQueryString('SchoolId');
    SchoolId = parseInt(SchoolId);
    // 查找驾校详情
    $.ajax({
        type:"get",
        url:"/api/news/school/" + SchoolId,
        dataType:"json",
        success:function (result) {
            //赋值到驾校所有信息
            var SpanSchoolName = $("#SpanSchoolName");
            SpanSchoolName.text(result.data.schoolName);
            var StrongStartPrice =$("#StrongStartPrice");
            // StrongStartPrice.text("￥" + result.data );
            var SpanDetailDice = $("#SpanDetailDice");
            SpanDetailDice.text(result.data.address);
            var SpanEnrollTel = $("#SpanEnrollTel");
            SpanEnrollTel.text(result.data.schoolEnrollTelephone);
            var PSchoolDescription = $("#PSchoolDescription");
            PSchoolDescription.html(result.data.schoolIntroduction);
            var ImgSchoolIcon = $("#ImgSchoolIcon");
            ImgSchoolIcon.attr("src",result.data.schoolIcon);
            //插入到到所有课程信息
            classes = result.data.schoolCourses;
            var tbodyClasses = $("#tbodyClasses");
            for(i=0 ; i < classes.length ; i ++){
                var Tr = $("<tr></tr>");
                //插入课程名称，生成对应表格
                var thClassName= $("<th class=\"text-center col-md-4 \"></th>");
                var thClassDetail= $("<th class=\"text-center col-md-4 \"></th>");
                var thClassPrice= $("<th class=\"text-center col-md-4 \"></th>");
                thClassName.append(classes[i].courseName);
                thClassDetail.append(classes[i].courseDescribe);
                thClassDetail.addClass("col-md-3");
                thClassPrice.append(classes[i].coursePrice);
                Tr.append(thClassName);
                Tr.append(thClassDetail);
                Tr.append(thClassPrice);
                tbodyClasses.append(Tr);
            }
        //    插入报名的select中的option信息
            var selectClassesSelect = $("#selectClasses");
            selectClassesSelect.empty();
            for(let i=0;i<result.data.schoolCourses.length ; i++){
                var createOption = $("<option></option>");
                var ClassName = result.data.schoolCourses[i].courseName;
                createOption.text(ClassName);
                createOption.val(result.data.schoolCourses[i].courseId);
                selectClassesSelect.append(createOption);
            }
        },
        error:function (result) {
            alert("网络好像开了一点小差的呢~");
        }
    });

    // //页面加载之后插入所有课程数据 (做参考)
    // $.ajax({
    //     type:"get",
    //     url:"/api/school/getCourse",
    //     dataType:"json",
    //     beforeSend: function (XMLHttpRequest) {
    //         var Authorization = $.cookie('AuthorizationSchool');
    //         XMLHttpRequest.setRequestHeader("Authorization", Authorization);
    //     },
    //     success:function (result) {
    //         var tbodyClasses = $("#tbodyClasses");
    //         classes = result.list;
    //         //在表格中插入所有数据
    //         for(i=0 ; i < classes.length ; i ++){
    //             var Tr = $("<tr></tr>");
    //             //插入课程名称，生成对应表格
    //             var thClassName= $("<th class=\"text-center\"></th>");
    //             var thClassDetail= $("<th class=\"text-center\"></th>");
    //             var thClassPrice= $("<th class=\"text-center\"></th>");
    //             var thEnrollNumber= $("<th class=\"text-center\"></th>");
    //             var thDeleteBtn = $("<th><button class=\"btn btn-danger\" data-toggle=\"modal\" data-target=\"#DeleteModal\">删除</button></th>")
    //             thClassName.append(classes[i].courseName);
    //             thClassDetail.append(classes[i].courseDescribe);
    //             thClassDetail.addClass("col-md-3");
    //             thClassPrice.append(classes[i].coursePrice);
    //             thEnrollNumber.append(classes[i].count);
    //             //
    //             thDeleteBtn.find("button").text("删除");
    //             thDeleteBtn.find("button").attr("data-whatever",i);
    //             Tr.append(thClassName);
    //             Tr.append(thClassDetail);
    //             Tr.append(thClassPrice);
    //             Tr.append(thEnrollNumber);
    //             Tr.append(thDeleteBtn);
    //             tbodyClasses.append(Tr);
    //         }
    //         // 生成导航页数量
    //         var LiNavigationFirstWrongLists =  $("#LiNavigationFirstWrongLists");
    //         for (var i = result.pages ; i >= 1 ; i--){
    //             LiNavigationFirstWrongLists.after("<li></li>");
    //             LiNavigationFirstWrongLists.next().append("<a></a>");
    //             LiNavigationFirstWrongLists.next().children("a").attr("href","javascript:void(0);");
    //             LiNavigationFirstWrongLists.next().children("a").text(i);
    //             LiNavigationFirstWrongLists.next().children("li").addClass("liNavigation");
    //         }
    //         LiNavigationFirstWrongLists.next().addClass("active");
    //         pageNum = result.pageNum;
    //         total = result.total;
    //         pages = result.pages;
    //     },
    //     error:function (result) {
    //         alert("与服务器似乎断开链接，请检查您的网络");
    //     }
    // });

    //获取驾校推荐
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

    //解码URL地址中的参数
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if ( r != null ){
            return unescape(r[2]);
        }else{
            return null;
        }
    }



});