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
        url:"/api/train/four/getCountByChapter",
        data:{
            'chapter':"交通事故救护及常见危化品处置常识",
        },
        dataType:"json",
        success:function (result) {
            $("#subjectFourChapterOneCount").html("(共" + result + "题)");
        }
    });
    $.ajax({
        type:"get",
        url:"/api/train/four/getCountByChapter",
        data:{
            'chapter':"安全行车常识",
        },
        dataType:"json",
        success:function (result) {
            $("#subjectFourChapterTwoCount").html("(共" + result + "题)");
        }
    });
    $.ajax({
        type:"get",
        url:"/api/train/four/getCountByChapter",
        data:{
            'chapter':"常见交通标志、标线和交通手势辨识",
        },
        dataType:"json",
        success:function (result) {
            $("#subjectFourChapterThreeCount").html("(共" + result + "题)");
        }
    });
    $.ajax({
        type:"get",
        url:"/api/train/four/getCountByChapter",
        data:{
            'chapter':"恶劣气候和复杂道路条件下驾驶常识",
        },
        dataType:"json",
        success:function (result) {
            $("#subjectFourChapterFourCount").html("(共" + result + "题)");
        }
    });
    $.ajax({
        type:"get",
        url:"/api/train/four/getCountByChapter",
        data:{
            'chapter':"紧急情况下避险常识",
        },
        dataType:"json",
        success:function (result) {
            $("#subjectFourChapterFiveCount").html("(共" + result + "题)");
        }
    });
    $.ajax({
        type:"get",
        url:"/api/train/four/getCountByChapter",
        data:{
            'chapter':"违法行为综合判断与案例分析",
        },
        dataType:"json",
        success:function (result) {
            $("#subjectFourChapterSixCount").html("(共" + result + "题)");
        }
    });
    $.ajax({
        type:"get",
        url:"/api/train/four/getCountByChapter",
        data:{
            'chapter':"驾驶职业道德和文明驾驶常识",
        },
        dataType:"json",
        success:function (result) {
            $("#subjectFourChapterSevenCount").html("(共" + result + "题)");
        }
    });
    $.ajax({
        type:"get",
        url:"/api/train/four/getCount",
        dataType:"json",
        success:function (result) {
            $("#ChapterFourTotalCount").html("(共" + result + "题)");
            $("#Diffcult_total").html("(共" + result + "题)");
            $("#Type_total").html("(共" + result + "题)");
        }
    });
    $.ajax({
        type:"get",
        url:"/api/train/four/getCountByDifficulty",
        data:{
            'difficulty':"1",
        },
        dataType:"json",
        success:function (result) {
            $("#Diffcult_1").html("(共" + result + "题)");
        }
    });
    $.ajax({
        type:"get",
        url:"/api/train/four/getCountByType",
        data:{
            type:"single"
        },
        dataType:"json",
        success:function (result) {
            $("#SpanTypeCountSingle").html("(共" + result + "题)");
        }
    });
    $.ajax({
        type:"get",
        url:"/api/train/four/getCountByType",
        data:{
            type:"multi"
        },
        dataType:"json",
        success:function (result) {
            $("#SpanTypeCountMulti").html("(共" + result + "题)");
        }
    });
    $.ajax({
        type:"get",
        url:"/api/train/four/getCountByType",
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
        url:"/api/train/four/getCountByDifficulty",
        data:{
            'difficulty':"2",
        },
        dataType:"json",
        success:function (result) {
            $("#Diffcult_2").html("(共" + result + "题)");
        }
    });
    $.ajax({
        type:"get",
        url:"/api/train/four/getCountByDifficulty",
        data:{
            'difficulty':"3",
    },
        dataType:"json",
        success:function (result) {
            $("#Diffcult_3").html("(共" + result + "题)");
        }
    });
    $.ajax({
        type:"get",
        url:"/api/train/four/getCountByDifficulty",
        data:{
            'difficulty':"4",
        },
        dataType:"json",
        success:function (result) {
            $("#Diffcult_4").html("(共" + result + "题)");
        }
    });

    $.ajax({
        type:"get",
        url:"/api/train/four/getCountByDifficulty",
        data:{
            'difficulty':"5",
        },
        dataType:"json",
        success:function (result) {
            $("#Diffcult_5").html("(共" + result + "题)");
        }
    });
    //点击题目title，获取顺序练习
    $(".subjectFourTitles").click(function () {
        var rawtype = $(this).children('span').text();
        var address = "/subjectFour/practice?model=sequence&chapter=" + rawtype;
        address = encodeURI(encodeURI(address));
        window.location.href = address;
    })
    //获取所有顺序练习button里面的题目
    $(".btnSequencePractices").click(function () {
        var rawtype = $(this).parent().parent().children("a").children((":first")).text();
        var address = "/subjectFour/practice?model=sequence&chapter=" + rawtype;
        address = encodeURI(encodeURI(address));
        window.location.href = address;

    })
    //章节练习的随机练习
    $(".btnRandomPractices").click(function () {
        var rawtype = $(this).parent().parent().children("a").children((":first")).text();
        var address = "/subjectFour/practice?model=random&chapter=" + rawtype;
        address = encodeURI(encodeURI(address));
        window.location.href = address;
    })
    //科目四顺序练习
    $("#BtnSequencePractice").click(function () {
        var address = "/subjectFour/practice?model=sequence&chapter=null"
        address = encodeURI(encodeURI(address));
         window.location.href = address;
    })
    //科目四按照难度顺序练习
    $("#BtnDifficultiesSequencePractice").click(function () {
        var difficulites = $('input[name="RadioQuestionDifficulties"]:checked').val();
        var address = "/subjectFour/practice?model=orderDifficulty&chapter=null&difficulites=" + difficulites;
        address = encodeURI(encodeURI(address));
        window.location.href = address;
    })
    //科目四按照难度随机练习
    $("#BtnDifficultiesRandomPractice").click(function () {
        var difficulites = $('input[name="RadioQuestionDifficulties"]:checked').val();
        var address = "/subjectFour/practice?model=randomDifficulty&chapter=null&difficulites=" + difficulites;
        address = encodeURI(encodeURI(address));
        window.location.href = address;
    })
    //科目四按照类型(单选/判断)顺序练习
    $("#BtnTypesSequencePractice").click(function () {
        var type = $('input[name="RadioQuestionTypes"]:checked').val();
        if(type === "judge"){
            var address = "/subjectFour/practice?model=sequenceJudge&chapter=null&difficulites=null";
            address = encodeURI(encodeURI(address));
            window.location.href = address;
        }else if(type === "single"){
            var address = "/subjectFour/practice?model=sequenceSingle&chapter=null&difficulites=null";
            address = encodeURI(encodeURI(address));
            window.location.href = address;
        }else {
            var address = "/subjectFour/practice?model=sequenceMulti&chapter=null&difficulites=null";
            address = encodeURI(encodeURI(address));
            window.location.href = address;
        }

    })
    //科目四按照类型(单选/判断)随机练习
    $("#BtnTypesRandomPractice").click(function () {
        var type = $('input[name="RadioQuestionTypes"]:checked').val();
        if(type === "judge"){
            var address = "/subjectFour/practice?model=randomJudge&chapter=null&difficulites=null";
            address = encodeURI(encodeURI(address));
            window.location.href = address;
        }else if(type === "single"){
            var address = "/subjectFour/practice?model=randomSingle&chapter=null&difficulites=null";
            address = encodeURI(encodeURI(address));
            window.location.href = address;
        }else {
            var address = "/subjectFour/practice?model=randomMulti&chapter=null&difficulites=null";
            address = encodeURI(encodeURI(address));
            window.location.href = address;
        }

    })

});
