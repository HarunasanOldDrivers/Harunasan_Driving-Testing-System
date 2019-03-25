$(document).ready(function () {
    //切换专项练习/章节练习 Tab页
    var BtnSpecialPractice = $("#BtnSpecialPractice");
    var BtnSectionPractice = $("#BtnSectionPractice");

    BtnSpecialPractice.click(function () {
        BtnSpecialPractice.addClass("active");
        BtnSectionPractice.removeClass("active");
        $("#DivSectionPractice").hide(300);
        $("#DivSpecialPractice").show(300);
    })
    BtnSectionPractice.click(function () {
        BtnSectionPractice.addClass("active");
        BtnSpecialPractice.removeClass("active");
        $("#DivSectionPractice").show(300);
        $("#DivSpecialPractice").hide(300);
    })

    //设置题目难度各种评分
    $("#schoolScore1").lqScore({
        $tipEle: $("#schoolScoretips1"),
        score: 1,
        tips:""
        //如果需要设置后还能评分，请添加[isReScore:true]属性
    });
    $("#schoolScore2").lqScore({
        $tipEle: $("#schoolScoretips2"),
        score: 2,
        tips:""
        //如果需要设置后还能评分，请添加[isReScore:true]属性
    });
    $("#schoolScore3").lqScore({
        $tipEle: $("#schoolScoretips3"),
        score: 3,
        tips:""
        //如果需要设置后还能评分，请添加[isReScore:true]属性
    });
    $("#schoolScore4").lqScore({
        $tipEle: $("#schoolScoretips4"),
        score: 4,
        tips:""
        //如果需要设置后还能评分，请添加[isReScore:true]属性
    });
    $("#schoolScore5").lqScore({
        $tipEle: $("#schoolScoretips5"),
        score: 5,
        tips:""
        //如果需要设置后还能评分，请添加[isReScore:true]属性
    });

    //获取所有顺序练习button里面的题目title
    $(".btnSequencePractices").click(function () {
        var rawtype = $(this).parent().parent().children("a").children((":first")).text();
        var address = "/subjectOne/practice?id=1&chapter=" + rawtype;
        address = encodeURI(encodeURI(address));
        window.location.href = address;

    })

});
