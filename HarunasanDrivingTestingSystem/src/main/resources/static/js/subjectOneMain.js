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

    //读取题目数量
    $.ajax({
        type:"get",
        url:"/api/train/one/getCountByChapter",
        data:{
            'chapter':"道路交通安全法律、法规和规章",
        },
        dataType:"json",
        success:function (result) {
            $("#chapterOneCount").html("(共" + result + "题)");
        }
    });
    $.ajax({
        type:"get",
        url:"/api/train/one/getCountByChapter",
        data:{
            'chapter':"交通信号",
        },
        dataType:"json",
        success:function (result) {
            $("#chaptertwoCount").html("(共" + result + "题)");
        }
    });
    $.ajax({
        type:"get",
        url:"/api/train/one/getCountByChapter",
        data:{
            'chapter':"安全行车、文明驾驶基础知识",
        },
        dataType:"json",
        success:function (result) {
            $("#chapterThreeCount").html("(共" + result + "题)");
        }
    });
    $.ajax({
        type:"get",
        url:"/api/train/one/getCountByChapter",
        data:{
            'chapter':"机动车驾驶操作相关基础知识",
        },
        dataType:"json",
        success:function (result) {
            $("#chapterFourCount").html("(共" + result + "题)");
        }
    });
    $.ajax({
        type:"get",
        url:"/api/train/one/getCount",
        dataType:"json",
        success:function (result) {
            $("#ChapterOneTotalCount").html("(共" + result + "题)");
        }
    });

    //点击题目title，获取顺序练习
    $(".subjectOneTitles").click(function () {
        var rawtype = $(this).children('span').text();
        var address = "/subjectOne/practice?model=sequence&chapter=" + rawtype;
        address = encodeURI(encodeURI(address));
        window.location.href = address;
    })
    //获取所有顺序练习button里面的题目
    $(".btnSequencePractices").click(function () {
        var rawtype = $(this).parent().parent().children("a").children((":first")).text();
        var address = "/subjectOne/practice?model=sequence&chapter=" + rawtype;
        address = encodeURI(encodeURI(address));
        window.location.href = address;

    })
    //章节练习的随机练习
    $(".btnRandomPractices").click(function () {
        var rawtype = $(this).parent().parent().children("a").children((":first")).text();
        var address = "/subjectOne/practice?model=random&chapter=" + rawtype;
        address = encodeURI(encodeURI(address));
        window.location.href = address;
    })
    //科目一顺序练习
    $("#BtnSequencePractice").click(function () {
        var address = "/subjectOne/practice?model=sequence&chapter=null"
        address = encodeURI(encodeURI(address));
        window.location.href = address;
    })

});
