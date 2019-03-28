$(document).ready(function () {
    var BtnEnroll =$("#BtnEnroll");

    BtnEnroll.click(function () {
        var schoolDetialTable  =$("#schoolDetialTable");
        var ClassCount = schoolDetialTable.children('tbody').children("tr").length;
        var selectClassesSelect = $("#selectClasses");
        selectClassesSelect.empty();
        //获取课程元素的值，放进Select下拉菜单
        for(let i=0;i<ClassCount ; i++){
            var createOption = $("<option></option>");
            var ClassName = schoolDetialTable.children('tbody').children('tr').find("th:first").eq(i).text();
            createOption.text(ClassName);
            selectClassesSelect.append(createOption);
        }
    })
});