$(document).ready(function () {

    var classes;

    $.ajax({
        type:"get",
        url:"/api/user/courses",
        dataType:"json",
        beforeSend: function (XMLHttpRequest) {
            var Authorization = $.cookie('Authorization');
            XMLHttpRequest.setRequestHeader("Authorization", Authorization);
        },
        success:function (result) {
            classes = result.list;
            //在表格中插入所有数据
            var ClassTbody = $("#ClassTbody");
            for(i=0 ; i < classes.length ; i ++){
                var Tr = $("<tr></tr>");
                //插入课程名称，生成对应表格
                var thSchoolName= $("<th class=\"text-center col-md-2\"></th>");
                var thClassName=$("<th class=\"text-center col-md-2 className\"></th>");
                var thClassDescription= $("<th class=\"col-md-2\"></th>");
                var thSchoolAddress= $("<th class=\"col-md-2\"></th>");
                var thSchoolEnrollTel= $("<th class=\"col-md-2 text-center\"></th>");
                var thSchoolPrice= $("<th class=\"col-md-2 text-center\"></th>");
                thSchoolName.append(classes[i].schoolName);
                thClassName.append(classes[i].courseName);
                thClassDescription.append(classes[i].courseDescribe);
                thSchoolAddress.append(classes[i].schoolAddress);
                thSchoolEnrollTel.append(classes[i].schoolTel);
                thSchoolPrice.append(classes[i].coursePrice);
                Tr.append(thSchoolName);
                Tr.append(thClassName);
                Tr.append(thClassDescription);
                Tr.append(thSchoolAddress);
                Tr.append(thSchoolEnrollTel);
                Tr.append(thSchoolPrice);
                ClassTbody.append(Tr);
                // thClassName.append(classes[i].courseName);
                // thClassDetail.append(classes[i].courseDescribe);
                // thClassDetail.addClass("col-md-3");
                // thClassPrice.append(classes[i].coursePrice);
                // thEnrollNumber.append(classes[i].count);
                // //
                // thDeleteBtn.find("button").text("删除");
                // thDeleteBtn.find("button").attr("data-whatever",i);
                // Tr.append(thClassName);
                // Tr.append(thClassDetail);
                // Tr.append(thClassPrice);
                // Tr.append(thEnrollNumber);
                // Tr.append(thDeleteBtn);
                // tbodyClasses.append(Tr);
            }
        },
    });
})