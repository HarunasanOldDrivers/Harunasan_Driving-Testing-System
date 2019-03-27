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
            $("#SpanDifficultiesCount").html("(共" + result + "题)");
            $("#SpanTypeCount").html("(共" + result + "题)");
        }
    });
    $.ajax({
        type:"get",
        url:"/api/train/one/getCountByDifficulty",
        data:{
            difficulty:1
        },
        dataType:"json",
        success:function (result) {
            $("#SpanDifficultyCountOne").html("(共" + result + "题)");
        }
    });
    $.ajax({
        type:"get",
        url:"/api/train/one/getCountByDifficulty",
        data:{
            difficulty:2
        },
        dataType:"json",
        success:function (result) {
            $("#SpanDifficultyCountTwo").html("(共" + result + "题)");
        }
    });
    $.ajax({
        type:"get",
        url:"/api/train/one/getCountByDifficulty",
        data:{
            difficulty:3
        },
        dataType:"json",
        success:function (result) {
            $("#SpanDifficultyCountThree").html("(共" + result + "题)");
        }
    });
    $.ajax({
        type:"get",
        url:"/api/train/one/getCountByDifficulty",
        data:{
            difficulty:4
        },
        dataType:"json",
        success:function (result) {
            $("#SpanDifficultyCountFour").html("(共" + result + "题)");
        }
    });
    $.ajax({
        type:"get",
        url:"/api/train/one/getCountByDifficulty",
        data:{
            difficulty:5
        },
        dataType:"json",
        success:function (result) {
            $("#SpanDifficultyCountFive").html("(共" + result + "题)");
        }
    });
    $.ajax({
        type:"get",
        url:"/api/train/one/getCountByType",
        data:{
            type:"judge"
        },
        dataType:"json",
        success:function (result) {
            $("#SpanTypeCountJudge").html("(共" + result + "题)");
        }
    });
    $.ajax({
        type:"get",
        url:"/api/train/one/getCountByType",
        data:{
            type:"single"
        },
        dataType:"json",
        success:function (result) {
            $("#SpanTypeCountSelect").html("(共" + result + "题)");
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
    });
    //科目一按照难度顺序练习
    $("#BtnDifficultiesSequencePractice").click(function () {
        var difficulites = $('input[name="RadioQuestionDifficulties"]:checked').val();
        var address = "/subjectOne/practice?model=orderDifficulty&chapter=null&difficulites=" + difficulites;
        address = encodeURI(encodeURI(address));
        window.location.href = address;
    })
    //科目一按照难度随机练习
    $("#BtnDifficultiesRandomPractice").click(function () {
        var difficulites = $('input[name="RadioQuestionDifficulties"]:checked').val();
        var address = "/subjectOne/practice?model=randomDifficulty&chapter=null&difficulites=" + difficulites;
        address = encodeURI(encodeURI(address));
        window.location.href = address;
    })
    //科目一按照类型(单选/判断)顺序练习
    $("#BtnTypesSequencePractice").click(function () {
        var type = $('input[name="RadioQuestionTypes"]:checked').val();
        if(type === "judge"){
            var address = "/subjectOne/practice?model=sequenceJudge&chapter=null&difficulites=null";
            address = encodeURI(encodeURI(address));
            window.location.href = address;
        }else if(type === "single"){
            var address = "/subjectOne/practice?model=sequenceSingle&chapter=null&difficulites=null";
            address = encodeURI(encodeURI(address));
            window.location.href = address;
        }

    })
    //科目一按照类型(单选/判断)随机练习
    $("#BtnTypesRandomPractice").click(function () {
        var type = $('input[name="RadioQuestionTypes"]:checked').val();
        if(type === "judge"){
            var address = "/subjectOne/practice?model=randomJudge&chapter=null&difficulites=null";
            address = encodeURI(encodeURI(address));
            window.location.href = address;
        }else if(type === "single"){
            var address = "/subjectOne/practice?model=randomSingle&chapter=null&difficulites=null";
            address = encodeURI(encodeURI(address));
            window.location.href = address;
        }

    })

    //展示错题集
    $("#ShowTheWrongList").click(function () {
        if($.cookie("Authorization")){
        window.location.href="../subjectOne/wrongList";
        }else {
            alert("请先登录");
        }
    })

    //开始考试
    $("#StartSubjectOneTest").click(function () {
        window.location.href="../subjectOne/test";
    })
});
