$(document).ready(function () {

    //顺序练习题号，从1开始
    var Currentid = 1;
    //解码当前处于哪个章节
    var chapter = getQueryString('chapter');
    var difficulites = getQueryString('difficulites');
    chapter = decodeURI(chapter);
    var model = getQueryString("model");
    if(model ==="sequence" && chapter === "null")
    {
        //刷新第一道题
        $.ajax({
            type:"get",
            url:"/api/train/one/order",
            data:{
                'id':Currentid
            },
            dataType:"json",
            success:function (result) {
                $("#breadcrumbChapter2").html("科目一顺序练习");
                $("#SpanQuestionId").html(result.qoId + "：" );
                $("#SpanQuestionTitle").html(result.qoTitle);
                $("#LiAnswers1").html(result.qoOptionA);
                $("#LiAnswers2").html(result.qoOptionB);
                $("#qoDescription").html(result.qoDescription);
                $("#QoRightAnswer").html(result.qoAnswer);
                $("#qoDifficulties").html(result.qoDifficultty);
                if((result.qoType  ==='judge')){
                    $("#qoType").html("判断题")
                }else if((result.qoType === 'single')){
                    $("#qoType").html("单选题")
                }else {
                    $("#qoType").html("多选题")
                }
                //如果有CD选项
                if (result.qoOptionC !== null){
                    $("#LiAnswers3").html(result.qoOptionC);
                }else {
                    $("#BtnConfirmAnswerC").hide();
                }
                if(result.qoOptionD !==null) {
                    $("#LiAnswers4").html(result.qoOptionD);
                }else {
                    $("#BtnConfirmAnswerD").hide();
                }
                //如果有图片
                if(result.qoImage !==null){
                    $("#qoimage").attr("src",result.qoImage)
                }
                //如果有视频
                if(result.qoImage !==null){
                    $("#qoimage").attr("src",result.qoImage)
                }
            },
            error:function () {
                $("#SpanQuestionId").html("");
                $("#SpanQuestionTitle").html("");
                alert("没有题了呢，点击上一题/下一题，或者试试其他练习吧~");
                if(Currentid < 2){
                    Currentid++
                }else {
                    Currentid--
                }
            }
        });
        //点击下一题发送Ajax请求
        $("#BtnNextQuestion").click(function () {
            //发送请求之前，清空答题版所有的CSS样式
            Currentid++;
            var SpanRightOrWrongTips = $("#SpanRightOrWrongTips");
            var QoRightAnswer = $("#QoRightAnswer");
            var qoDescription = $("#qoDescription");
            var DivAnswers = $("#DivAnswers");
            var LiAnswers1 = $("#LiAnswers1");
            var LiAnswers2 = $("#LiAnswers2");
            var LiAnswers3 = $("#LiAnswers3");
            var LiAnswers4 = $("#LiAnswers4");
            var qoimage = $("#qoimage");
            $("#BtnConfirmAnswerC").show();
            $("#BtnConfirmAnswerD").show();
            var SpanUserChoose = $("#SpanUserChoose");
            qoDescription.css("display","none");
            DivAnswers.css("visibility","hidden");
            qoimage.attr("src","");
            SpanUserChoose.removeClass("text-success text-danger").text("");
            QoRightAnswer.removeClass("text-success text-danger").css("font-weight","normal").text("");
            SpanRightOrWrongTips.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers1.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers2.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers3.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers4.removeClass("text-success text-danger").css("font-weight","normal").text("");
            $.ajax({
                type:"get",
                url:"/api/train/one/order",
                data:{
                    'id':Currentid
                },
                dataType:"json",
                success:function (result) {
                    $("#breadcrumbChapter2").html("科目一顺序练习");
                    $("#SpanQuestionId").html(result.qoId + "：" );
                    $("#SpanQuestionTitle").html(result.qoTitle);
                    $("#LiAnswers1").html(result.qoOptionA);
                    $("#LiAnswers2").html(result.qoOptionB);
                    $("#qoDescription").html(result.qoDescription);
                    $("#QoRightAnswer").html(result.qoAnswer);
                    $("#qoDifficulties").html(result.qoDifficultty);
                    if((result.qoType  ==='judge')){
                        $("#qoType").html("判断题")
                    }else if((result.qoType === 'single')){
                        $("#qoType").html("单选题")
                    }else {
                        $("#qoType").html("多选题")
                    }
                    //如果有CD选项
                    if (result.qoOptionC !== null){
                        $("#LiAnswers3").html(result.qoOptionC);
                    }else {
                        $("#BtnConfirmAnswerC").hide();
                    }
                    if(result.qoOptionD !==null) {
                        $("#LiAnswers4").html(result.qoOptionD);
                    }else {
                        $("#BtnConfirmAnswerD").hide();
                    }
                    //如果有图片
                    if(result.qoImage !==null){
                        $("#qoimage").attr("src",result.qoImage)
                    }
                    //如果有视频
                    if(result.qoImage !==null){
                        $("#qoimage").attr("src",result.qoImage)
                    }
                },
                error:function () {
                    $("#SpanQuestionId").html("");
                    $("#SpanQuestionTitle").html("");
                    alert("没有题了呢，点击上一题/下一题，或者试试其他练习吧~");
                    if(Currentid < 2){
                        Currentid++
                    }else {
                        Currentid--
                    }
                }
            });
        });
        //点击上一题发送Ajax请求
        $("#BtnPreQuestion").click(function () {
            //发送请求之前，清空答题版所有的CSS样式
            Currentid--;
            var SpanRightOrWrongTips = $("#SpanRightOrWrongTips");
            var QoRightAnswer = $("#QoRightAnswer");
            var qoDescription = $("#qoDescription");
            var DivAnswers = $("#DivAnswers");
            var LiAnswers1 = $("#LiAnswers1");
            var LiAnswers2 = $("#LiAnswers2");
            var LiAnswers3 = $("#LiAnswers3");
            var LiAnswers4 = $("#LiAnswers4");
            var qoimage = $("#qoimage");
            $("#BtnConfirmAnswerC").show();
            $("#BtnConfirmAnswerD").show();
            var SpanUserChoose = $("#SpanUserChoose");
            qoDescription.css("display","none");
            DivAnswers.css("visibility","hidden");
            qoimage.attr("src","");
            SpanUserChoose.removeClass("text-success text-danger").text("");
            QoRightAnswer.removeClass("text-success text-danger").css("font-weight","normal").text("");
            SpanRightOrWrongTips.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers1.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers2.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers3.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers4.removeClass("text-success text-danger").css("font-weight","normal").text("");
            $.ajax({
                type:"get",
                url:"/api/train/one/order",
                data:{
                    'id':Currentid
                },
                dataType:"json",
                success:function (result) {
                    $("#breadcrumbChapter2").html("科目一顺序练习");
                    $("#SpanQuestionId").html(result.qoId + "：");
                    $("#SpanQuestionTitle").html(result.qoTitle);
                    $("#LiAnswers1").html(result.qoOptionA);
                    $("#LiAnswers2").html(result.qoOptionB);
                    $("#qoDescription").html(result.qoDescription);
                    $("#QoRightAnswer").html(result.qoAnswer);
                    $("#qoDifficulties").html(result.qoDifficultty);
                    if((result.qoType  ==='judge')){
                        $("#qoType").html("判断题")
                    }else if((result.qoType === 'single')){
                        $("#qoType").html("单选题")
                    }else {
                        $("#qoType").html("多选题")
                    }
                    //如果有CD选项
                    if (result.qoOptionC !== null){
                        $("#LiAnswers3").html(result.qoOptionC);
                    }else {
                        $("#BtnConfirmAnswerC").hide();
                    }
                    if(result.qoOptionD !==null) {
                        $("#LiAnswers4").html(result.qoOptionD);
                    }else {
                        $("#BtnConfirmAnswerD").hide();
                    }
                    //如果有图片
                    if(result.qoImage !==null){
                        $("#qoimage").attr("src",result.qoImage)
                    }
                    //如果有视频
                    if(result.qoImage !==null){
                        $("#qoimage").attr("src",result.qoImage)
                    }
                },
                error:function () {
                    $("#SpanQuestionId").html("");
                    $("#SpanQuestionTitle").html("");
                    alert("没有题了呢，点击上一题/下一题，或者试试其他练习吧~");
                    if(Currentid < 2){
                        Currentid++
                    }else {
                        Currentid--
                    }
                }
            });
        })
    }
    else if(model === "orderDifficulty" && chapter === "null")
    {
        //刷新第一道题
        $.ajax({
            type:"get",
            url:"/api/train/one/orderDifficulty",
            data:{
                'id':Currentid,
                'difficulty':difficulites
            },
            dataType:"json",
            success:function (result) {
                switch (difficulites) {
                    case "1" :{$("#breadcrumbChapter").html("  简单题 (顺序练习)");break;}
                    case "2" :{$("#breadcrumbChapter").html("  容易题 (顺序练习)");break;}
                    case "3" :{$("#breadcrumbChapter").html("  一般题 (顺序练习)");break;}
                    case "4" :{$("#breadcrumbChapter").html("  易错题 (顺序练习)");break;}
                    case "5" :{$("#breadcrumbChapter").html("  困难题 (顺序练习)");break;}
                }
                $("#AbreadcrumbChapter2").html("专项练习");
                $("#SpanQuestionId").html(result.qoId + "：" );
                $("#SpanQuestionTitle").html(result.qoTitle);
                $("#LiAnswers1").html(result.qoOptionA);
                $("#LiAnswers2").html(result.qoOptionB);
                $("#qoDescription").html(result.qoDescription);
                $("#QoRightAnswer").html(result.qoAnswer);
                $("#qoDifficulties").html(result.qoDifficultty);
                if((result.qoType  ==='judge')){
                    $("#qoType").html("判断题")
                }else if((result.qoType === 'single')){
                    $("#qoType").html("单选题")
                }else {
                    $("#qoType").html("多选题")
                }
                //如果有CD选项
                if (result.qoOptionC !== null){
                    $("#LiAnswers3").html(result.qoOptionC);
                }else {
                    $("#BtnConfirmAnswerC").hide();
                }
                if(result.qoOptionD !==null) {
                    $("#LiAnswers4").html(result.qoOptionD);
                }else {
                    $("#BtnConfirmAnswerD").hide();
                }
                //如果有图片
                if(result.qoImage !==null){
                    $("#qoimage").attr("src",result.qoImage)
                }
                //如果有视频
                if(result.qoImage !==null){
                    $("#qoimage").attr("src",result.qoImage)
                }
            },
            error:function () {
                $("#SpanQuestionId").html("");
                $("#SpanQuestionTitle").html("");
                alert("没有题了呢，点击上一题/下一题，或者试试其他练习吧~");
                if(Currentid < 2){
                    Currentid++
                }else {
                    Currentid--
                }
            }
        });
        //点击下一题发送Ajax请求
        $("#BtnNextQuestion").click(function () {
            //发送请求之前，清空答题版所有的CSS样式
            Currentid++;
            var SpanRightOrWrongTips = $("#SpanRightOrWrongTips");
            var QoRightAnswer = $("#QoRightAnswer");
            var qoDescription = $("#qoDescription");
            var DivAnswers = $("#DivAnswers");
            var LiAnswers1 = $("#LiAnswers1");
            var LiAnswers2 = $("#LiAnswers2");
            var LiAnswers3 = $("#LiAnswers3");
            var LiAnswers4 = $("#LiAnswers4");
            var qoimage = $("#qoimage");
            $("#BtnConfirmAnswerC").show();
            $("#BtnConfirmAnswerD").show();
            var SpanUserChoose = $("#SpanUserChoose");
            qoDescription.css("display","none");
            DivAnswers.css("visibility","hidden");
            qoimage.attr("src","");
            SpanUserChoose.removeClass("text-success text-danger").text("");
            QoRightAnswer.removeClass("text-success text-danger").css("font-weight","normal").text("");
            SpanRightOrWrongTips.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers1.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers2.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers3.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers4.removeClass("text-success text-danger").css("font-weight","normal").text("");
            $.ajax({
                type:"get",
                url:"/api/train/one/orderDifficulty",
                data:{
                    'id':Currentid,
                    'difficulty':difficulites
                },
                dataType:"json",
                success:function (result) {
                    switch (difficulites) {
                        case "1" :{$("#breadcrumbChapter").html("  简单题 (顺序练习)");break;}
                        case "2" :{$("#breadcrumbChapter").html("  容易题 (顺序练习)");break;}
                        case "3" :{$("#breadcrumbChapter").html("  一般题 (顺序练习)");break;}
                        case "4" :{$("#breadcrumbChapter").html("  易错题 (顺序练习)");break;}
                        case "5" :{$("#breadcrumbChapter").html("  困难题 (顺序练习)");break;}
                    }
                    $("#SpanQuestionId").html(result.qoId + "：" );
                    $("#SpanQuestionTitle").html(result.qoTitle);
                    $("#LiAnswers1").html(result.qoOptionA);
                    $("#LiAnswers2").html(result.qoOptionB);
                    $("#qoDescription").html(result.qoDescription);
                    $("#QoRightAnswer").html(result.qoAnswer);
                    $("#qoDifficulties").html(result.qoDifficultty);
                    if((result.qoType  ==='judge')){
                        $("#qoType").html("判断题")
                    }else if((result.qoType === 'single')){
                        $("#qoType").html("单选题")
                    }else {
                        $("#qoType").html("多选题")
                    }
                    //如果有CD选项
                    if (result.qoOptionC !== null){
                        $("#LiAnswers3").html(result.qoOptionC);
                    }else {
                        $("#BtnConfirmAnswerC").hide();
                    }
                    if(result.qoOptionD !==null) {
                        $("#LiAnswers4").html(result.qoOptionD);
                    }else {
                        $("#BtnConfirmAnswerD").hide();
                    }
                    //如果有图片
                    if(result.qoImage !==null){
                        $("#qoimage").attr("src",result.qoImage)
                    }
                    //如果有视频
                    if(result.qoImage !==null){
                        $("#qoimage").attr("src",result.qoImage)
                    }
                },
                error:function () {
                    $("#SpanQuestionId").html("");
                    $("#SpanQuestionTitle").html("");
                    alert("没有题了呢，点击上一题/下一题，或者试试其他练习吧~");
                    if(Currentid < 2){
                        Currentid++
                    }else {
                        Currentid--
                    }
                    console.log(Currentid);
                }
            });
        });
        //点击上一题发送Ajax请求
        $("#BtnPreQuestion").click(function () {
            //发送请求之前，清空答题版所有的CSS样式
            Currentid--;
            var SpanRightOrWrongTips = $("#SpanRightOrWrongTips");
            var QoRightAnswer = $("#QoRightAnswer");
            var qoDescription = $("#qoDescription");
            var DivAnswers = $("#DivAnswers");
            var LiAnswers1 = $("#LiAnswers1");
            var LiAnswers2 = $("#LiAnswers2");
            var LiAnswers3 = $("#LiAnswers3");
            var LiAnswers4 = $("#LiAnswers4");
            var qoimage = $("#qoimage");
            $("#BtnConfirmAnswerC").show();
            $("#BtnConfirmAnswerD").show();
            var SpanUserChoose = $("#SpanUserChoose");
            qoDescription.css("display","none");
            DivAnswers.css("visibility","hidden");
            qoimage.attr("src","");
            SpanUserChoose.removeClass("text-success text-danger").text("");
            QoRightAnswer.removeClass("text-success text-danger").css("font-weight","normal").text("");
            SpanRightOrWrongTips.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers1.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers2.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers3.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers4.removeClass("text-success text-danger").css("font-weight","normal").text("");
            $.ajax({
                type:"get",
                url:"/api/train/one/orderDifficulty",
                data:{
                    'id':Currentid,
                    'difficulty':difficulites
                },
                dataType:"json",
                success:function (result) {
                    switch (difficulites) {
                        case "1" :{$("#breadcrumbChapter").html("  简单题 (顺序练习)");break;}
                        case "2" :{$("#breadcrumbChapter").html("  容易题 (顺序练习)");break;}
                        case "3" :{$("#breadcrumbChapter").html("  一般题 (顺序练习)");break;}
                        case "4" :{$("#breadcrumbChapter").html("  易错题 (顺序练习)");break;}
                        case "5" :{$("#breadcrumbChapter").html("  困难题 (顺序练习)");break;}
                    }
                    $("#SpanQuestionId").html(result.qoId + "：");
                    $("#SpanQuestionTitle").html(result.qoTitle);
                    $("#LiAnswers1").html(result.qoOptionA);
                    $("#LiAnswers2").html(result.qoOptionB);
                    $("#qoDescription").html(result.qoDescription);
                    $("#QoRightAnswer").html(result.qoAnswer);
                    $("#qoDifficulties").html(result.qoDifficultty);
                    if((result.qoType  ==='judge')){
                        $("#qoType").html("判断题")
                    }else if((result.qoType === 'single')){
                        $("#qoType").html("单选题")
                    }else {
                        $("#qoType").html("多选题")
                    }
                    //如果有CD选项
                    if (result.qoOptionC !== null){
                        $("#LiAnswers3").html(result.qoOptionC);
                    }else {
                        $("#BtnConfirmAnswerC").hide();
                    }
                    if(result.qoOptionD !==null) {
                        $("#LiAnswers4").html(result.qoOptionD);
                    }else {
                        $("#BtnConfirmAnswerD").hide();
                    }
                    //如果有图片
                    if(result.qoImage !==null){
                        $("#qoimage").attr("src",result.qoImage)
                    }
                    //如果有视频
                    if(result.qoImage !==null){
                        $("#qoimage").attr("src",result.qoImage)
                    }
                },
                error:function () {
                    $("#SpanQuestionId").html("");
                    $("#SpanQuestionTitle").html("");
                    alert("没有题了呢，点击上一题/下一题，或者试试其他练习吧~");
                    if(Currentid < 2){
                        Currentid++
                    }else {
                        Currentid--
                    }
                }
            });
        })
    }
    else if(model === "randomDifficulty" && chapter === "null")
    {
        //刷新第一道题
        $.ajax({
            type:"get",
            url:"/api/train/one/randomDifficulty",
            data:{
                'difficulty':difficulites
            },
            dataType:"json",
            success:function (result) {
                switch (difficulites) {
                    case "1" :{$("#breadcrumbChapter").html("  简单题 (随机练习)");break;}
                    case "2" :{$("#breadcrumbChapter").html("  容易题 (随机练习)");break;}
                    case "3" :{$("#breadcrumbChapter").html("  一般题 (随机练习)");break;}
                    case "4" :{$("#breadcrumbChapter").html("  易错题 (随机练习)");break;}
                    case "5" :{$("#breadcrumbChapter").html("  困难题 (随机练习)");break;}
                }
                $("#AbreadcrumbChapter2").html("专项练习");
                $("#SpanQuestionId").html(result.qoId + "：" );
                $("#SpanQuestionTitle").html(result.qoTitle);
                $("#LiAnswers1").html(result.qoOptionA);
                $("#LiAnswers2").html(result.qoOptionB);
                $("#qoDescription").html(result.qoDescription);
                $("#QoRightAnswer").html(result.qoAnswer);
                $("#qoDifficulties").html(result.qoDifficultty);
                if((result.qoType  ==='judge')){
                    $("#qoType").html("判断题")
                }else if((result.qoType === 'single')){
                    $("#qoType").html("单选题")
                }else {
                    $("#qoType").html("多选题")
                }
                //如果有CD选项
                if (result.qoOptionC !== null){
                    $("#LiAnswers3").html(result.qoOptionC);
                }else {
                    $("#BtnConfirmAnswerC").hide();
                }
                if(result.qoOptionD !==null) {
                    $("#LiAnswers4").html(result.qoOptionD);
                }else {
                    $("#BtnConfirmAnswerD").hide();
                }
                //如果有图片
                if(result.qoImage !==null){
                    $("#qoimage").attr("src",result.qoImage)
                }
                //如果有视频
                if(result.qoImage !==null){
                    $("#qoimage").attr("src",result.qoImage)
                }
            },
            error:function () {
                $("#SpanQuestionId").html("");
                $("#SpanQuestionTitle").html("");
                alert("没有题了呢，点击上一题/下一题，或者试试其他练习吧~");
                if(Currentid < 2){
                    Currentid++
                }else {
                    Currentid--
                }
            }
        });
        //点击下一题发送Ajax请求
        $("#BtnNextQuestion").click(function () {
            //发送请求之前，清空答题版所有的CSS样式
            var SpanRightOrWrongTips = $("#SpanRightOrWrongTips");
            var QoRightAnswer = $("#QoRightAnswer");
            var qoDescription = $("#qoDescription");
            var DivAnswers = $("#DivAnswers");
            var LiAnswers1 = $("#LiAnswers1");
            var LiAnswers2 = $("#LiAnswers2");
            var LiAnswers3 = $("#LiAnswers3");
            var LiAnswers4 = $("#LiAnswers4");
            var qoimage = $("#qoimage");
            $("#BtnConfirmAnswerC").show();
            $("#BtnConfirmAnswerD").show();
            var SpanUserChoose = $("#SpanUserChoose");
            qoDescription.css("display","none");
            DivAnswers.css("visibility","hidden");
            qoimage.attr("src","");
            SpanUserChoose.removeClass("text-success text-danger").text("");
            QoRightAnswer.removeClass("text-success text-danger").css("font-weight","normal").text("");
            SpanRightOrWrongTips.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers1.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers2.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers3.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers4.removeClass("text-success text-danger").css("font-weight","normal").text("");
            $.ajax({
                type:"get",
                url:"/api/train/one/randomDifficulty",
                data:{
                    'difficulty':difficulites
                },
                dataType:"json",
                success:function (result) {
                    switch (difficulites) {
                        case "1" :{$("#breadcrumbChapter").html("  简单题 (随机练习)");break;}
                        case "2" :{$("#breadcrumbChapter").html("  容易题 (随机练习)");break;}
                        case "3" :{$("#breadcrumbChapter").html("  一般题 (随机练习)");break;}
                        case "4" :{$("#breadcrumbChapter").html("  易错题 (随机练习)");break;}
                        case "5" :{$("#breadcrumbChapter").html("  困难题 (随机练习)");break;}
                    }
                    $("#SpanQuestionId").html(result.qoId + "：" );
                    $("#SpanQuestionTitle").html(result.qoTitle);
                    $("#LiAnswers1").html(result.qoOptionA);
                    $("#LiAnswers2").html(result.qoOptionB);
                    $("#qoDescription").html(result.qoDescription);
                    $("#QoRightAnswer").html(result.qoAnswer);
                    $("#qoDifficulties").html(result.qoDifficultty);
                    if((result.qoType  ==='judge')){
                        $("#qoType").html("判断题")
                    }else if((result.qoType === 'single')){
                        $("#qoType").html("单选题")
                    }else {
                        $("#qoType").html("多选题")
                    }
                    //如果有CD选项
                    if (result.qoOptionC !== null){
                        $("#LiAnswers3").html(result.qoOptionC);
                    }else {
                        $("#BtnConfirmAnswerC").hide();
                    }
                    if(result.qoOptionD !==null) {
                        $("#LiAnswers4").html(result.qoOptionD);
                    }else {
                        $("#BtnConfirmAnswerD").hide();
                    }
                    //如果有图片
                    if(result.qoImage !==null){
                        $("#qoimage").attr("src",result.qoImage)
                    }
                    //如果有视频
                    if(result.qoImage !==null){
                        $("#qoimage").attr("src",result.qoImage)
                    }
                },
                error:function () {
                    $("#SpanQuestionId").html("");
                    $("#SpanQuestionTitle").html("");
                    alert("没有题了呢，点击上一题/下一题，或者试试其他练习吧~");
                    if(Currentid < 2){
                        Currentid++
                    }else {
                        Currentid--
                    }
                    console.log(Currentid);
                }
            });
        });
        //点击上一题发送Ajax请求
        $("#BtnPreQuestion").click(function () {
            //发送请求之前，清空答题版所有的CSS样式
            var SpanRightOrWrongTips = $("#SpanRightOrWrongTips");
            var QoRightAnswer = $("#QoRightAnswer");
            var qoDescription = $("#qoDescription");
            var DivAnswers = $("#DivAnswers");
            var LiAnswers1 = $("#LiAnswers1");
            var LiAnswers2 = $("#LiAnswers2");
            var LiAnswers3 = $("#LiAnswers3");
            var LiAnswers4 = $("#LiAnswers4");
            var qoimage = $("#qoimage");
            $("#BtnConfirmAnswerC").show();
            $("#BtnConfirmAnswerD").show();
            var SpanUserChoose = $("#SpanUserChoose");
            qoDescription.css("display","none");
            DivAnswers.css("visibility","hidden");
            qoimage.attr("src","");
            SpanUserChoose.removeClass("text-success text-danger").text("");
            QoRightAnswer.removeClass("text-success text-danger").css("font-weight","normal").text("");
            SpanRightOrWrongTips.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers1.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers2.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers3.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers4.removeClass("text-success text-danger").css("font-weight","normal").text("");
            $.ajax({
                type:"get",
                url:"/api/train/one/randomDifficulty",
                data:{
                    'difficulty':difficulites
                },
                dataType:"json",
                success:function (result) {
                    switch (difficulites) {
                        case "1" :{$("#breadcrumbChapter").html("  简单题 (随机练习)");break;}
                        case "2" :{$("#breadcrumbChapter").html("  容易题 (随机练习)");break;}
                        case "3" :{$("#breadcrumbChapter").html("  一般题 (随机练习)");break;}
                        case "4" :{$("#breadcrumbChapter").html("  易错题 (随机练习)");break;}
                        case "5" :{$("#breadcrumbChapter").html("  困难题 (随机练习)");break;}
                    }
                    $("#SpanQuestionId").html(result.qoId + "：");
                    $("#SpanQuestionTitle").html(result.qoTitle);
                    $("#LiAnswers1").html(result.qoOptionA);
                    $("#LiAnswers2").html(result.qoOptionB);
                    $("#qoDescription").html(result.qoDescription);
                    $("#QoRightAnswer").html(result.qoAnswer);
                    $("#qoDifficulties").html(result.qoDifficultty);
                    if((result.qoType  ==='judge')){
                        $("#qoType").html("判断题")
                    }else if((result.qoType === 'single')){
                        $("#qoType").html("单选题")
                    }else {
                        $("#qoType").html("多选题")
                    }
                    //如果有CD选项
                    if (result.qoOptionC !== null){
                        $("#LiAnswers3").html(result.qoOptionC);
                    }else {
                        $("#BtnConfirmAnswerC").hide();
                    }
                    if(result.qoOptionD !==null) {
                        $("#LiAnswers4").html(result.qoOptionD);
                    }else {
                        $("#BtnConfirmAnswerD").hide();
                    }
                    //如果有图片
                    if(result.qoImage !==null){
                        $("#qoimage").attr("src",result.qoImage)
                    }
                    //如果有视频
                    if(result.qoImage !==null){
                        $("#qoimage").attr("src",result.qoImage)
                    }
                },
                error:function () {
                    $("#SpanQuestionId").html("");
                    $("#SpanQuestionTitle").html("");
                    alert("没有题了呢，点击上一题/下一题，或者试试其他练习吧~");
                    if(Currentid < 2){
                        Currentid++
                    }else {
                        Currentid--
                    }
                }
            });
        })
    }
    else if(model === "sequenceJudge" && chapter === "null")
    {
        //刷新第一道题
        $.ajax({
            type:"get",
            url:"/api/train/one/orderType",
            data:{
                'id':Currentid,
                'type':"judge"
            },
            dataType:"json",
            success:function (result) {
                $("#AbreadcrumbChapter2").html("专项练习");
                $("#breadcrumbChapter").html("判断题 (顺序练习)");
                $("#SpanQuestionId").html(result.qoId + "：" );
                $("#SpanQuestionTitle").html(result.qoTitle);
                $("#LiAnswers1").html(result.qoOptionA);
                $("#LiAnswers2").html(result.qoOptionB);
                $("#qoDescription").html(result.qoDescription);
                $("#QoRightAnswer").html(result.qoAnswer);
                $("#qoDifficulties").html(result.qoDifficultty);
                if((result.qoType  ==='judge')){
                    $("#qoType").html("判断题")
                }else if((result.qoType === 'single')){
                    $("#qoType").html("单选题")
                }else {
                    $("#qoType").html("多选题")
                }
                //如果有CD选项
                if (result.qoOptionC !== null){
                    $("#LiAnswers3").html(result.qoOptionC);
                }else {
                    $("#BtnConfirmAnswerC").hide();
                }
                if(result.qoOptionD !==null) {
                    $("#LiAnswers4").html(result.qoOptionD);
                }else {
                    $("#BtnConfirmAnswerD").hide();
                }
                //如果有图片
                if(result.qoImage !==null){
                    $("#qoimage").attr("src",result.qoImage)
                }
                //如果有视频
                if(result.qoImage !==null){
                    $("#qoimage").attr("src",result.qoImage)
                }
            },
            error:function () {
                $("#SpanQuestionId").html("");
                $("#SpanQuestionTitle").html("");
                alert("没有题了呢，点击上一题/下一题，或者试试其他练习吧~");
                if(Currentid < 2){
                    Currentid++
                }else {
                    Currentid--
                }
            }
        });
        //点击下一题发送Ajax请求
        $("#BtnNextQuestion").click(function () {
            //发送请求之前，清空答题版所有的CSS样式
            Currentid++;
            var SpanRightOrWrongTips = $("#SpanRightOrWrongTips");
            var QoRightAnswer = $("#QoRightAnswer");
            var qoDescription = $("#qoDescription");
            var DivAnswers = $("#DivAnswers");
            var LiAnswers1 = $("#LiAnswers1");
            var LiAnswers2 = $("#LiAnswers2");
            var LiAnswers3 = $("#LiAnswers3");
            var LiAnswers4 = $("#LiAnswers4");
            var qoimage = $("#qoimage");
            $("#BtnConfirmAnswerC").show();
            $("#BtnConfirmAnswerD").show();
            var SpanUserChoose = $("#SpanUserChoose");
            qoDescription.css("display","none");
            DivAnswers.css("visibility","hidden");
            qoimage.attr("src","");
            SpanUserChoose.removeClass("text-success text-danger").text("");
            QoRightAnswer.removeClass("text-success text-danger").css("font-weight","normal").text("");
            SpanRightOrWrongTips.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers1.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers2.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers3.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers4.removeClass("text-success text-danger").css("font-weight","normal").text("");
            $.ajax({
                type:"get",
                url:"/api/train/one/orderType",
                data:{
                    'id':Currentid,
                    'type':"judge"
                },
                dataType:"json",
                success:function (result) {
                    $("#breadcrumbChapter").html("判断题 (顺序练习)");
                    $("#SpanQuestionId").html(result.qoId + "：" );
                    $("#SpanQuestionTitle").html(result.qoTitle);
                    $("#LiAnswers1").html(result.qoOptionA);
                    $("#LiAnswers2").html(result.qoOptionB);
                    $("#qoDescription").html(result.qoDescription);
                    $("#QoRightAnswer").html(result.qoAnswer);
                    $("#qoDifficulties").html(result.qoDifficultty);
                    if((result.qoType  ==='judge')){
                        $("#qoType").html("判断题")
                    }else if((result.qoType === 'single')){
                        $("#qoType").html("单选题")
                    }else {
                        $("#qoType").html("多选题")
                    }
                    //如果有CD选项
                    if (result.qoOptionC !== null){
                        $("#LiAnswers3").html(result.qoOptionC);
                    }else {
                        $("#BtnConfirmAnswerC").hide();
                    }
                    if(result.qoOptionD !==null) {
                        $("#LiAnswers4").html(result.qoOptionD);
                    }else {
                        $("#BtnConfirmAnswerD").hide();
                    }
                    //如果有图片
                    if(result.qoImage !==null){
                        $("#qoimage").attr("src",result.qoImage)
                    }
                    //如果有视频
                    if(result.qoImage !==null){
                        $("#qoimage").attr("src",result.qoImage)
                    }
                },
                error:function () {
                    $("#SpanQuestionId").html("");
                    $("#SpanQuestionTitle").html("");
                    alert("没有题了呢，点击上一题/下一题，或者试试其他练习吧~");
                    if(Currentid < 2){
                        Currentid++
                    }else {
                        Currentid--
                    }
                    console.log(Currentid);
                }
            });
        });
        //点击上一题发送Ajax请求
        $("#BtnPreQuestion").click(function () {
            //发送请求之前，清空答题版所有的CSS样式
            Currentid--;
            var SpanRightOrWrongTips = $("#SpanRightOrWrongTips");
            var QoRightAnswer = $("#QoRightAnswer");
            var qoDescription = $("#qoDescription");
            var DivAnswers = $("#DivAnswers");
            var LiAnswers1 = $("#LiAnswers1");
            var LiAnswers2 = $("#LiAnswers2");
            var LiAnswers3 = $("#LiAnswers3");
            var LiAnswers4 = $("#LiAnswers4");
            var qoimage = $("#qoimage");
            $("#BtnConfirmAnswerC").show();
            $("#BtnConfirmAnswerD").show();
            var SpanUserChoose = $("#SpanUserChoose");
            qoDescription.css("display","none");
            DivAnswers.css("visibility","hidden");
            qoimage.attr("src","");
            SpanUserChoose.removeClass("text-success text-danger").text("");
            QoRightAnswer.removeClass("text-success text-danger").css("font-weight","normal").text("");
            SpanRightOrWrongTips.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers1.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers2.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers3.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers4.removeClass("text-success text-danger").css("font-weight","normal").text("");
            $.ajax({
                type:"get",
                url:"/api/train/one/orderType",
                data:{
                    'id':Currentid,
                    'type':"judge"
                },
                dataType:"json",
                success:function (result) {
                    $("#breadcrumbChapter").html("判断题 (顺序练习)");
                    $("#SpanQuestionId").html(result.qoId + "：" );
                    $("#SpanQuestionTitle").html(result.qoTitle);
                    $("#LiAnswers1").html(result.qoOptionA);
                    $("#LiAnswers2").html(result.qoOptionB);
                    $("#qoDescription").html(result.qoDescription);
                    $("#QoRightAnswer").html(result.qoAnswer);
                    $("#qoDifficulties").html(result.qoDifficultty);
                    if((result.qoType  ==='judge')){
                        $("#qoType").html("判断题")
                    }else if((result.qoType === 'single')){
                        $("#qoType").html("单选题")
                    }else {
                        $("#qoType").html("多选题")
                    }
                    //如果有CD选项
                    if (result.qoOptionC !== null){
                        $("#LiAnswers3").html(result.qoOptionC);
                    }else {
                        $("#BtnConfirmAnswerC").hide();
                    }
                    if(result.qoOptionD !==null) {
                        $("#LiAnswers4").html(result.qoOptionD);
                    }else {
                        $("#BtnConfirmAnswerD").hide();
                    }
                    //如果有图片
                    if(result.qoImage !==null){
                        $("#qoimage").attr("src",result.qoImage)
                    }
                    //如果有视频
                    if(result.qoImage !==null){
                        $("#qoimage").attr("src",result.qoImage)
                    }
                },
                error:function () {
                    $("#SpanQuestionId").html("");
                    $("#SpanQuestionTitle").html("");
                    alert("没有题了呢，点击上一题/下一题，或者试试其他练习吧~");
                    if(Currentid < 2){
                        Currentid++
                    }else {
                        Currentid--
                    }
                    console.log(Currentid);
                }
            });
        });
    }
    else if(model === "sequenceSingle" && chapter === "null")
    {
        //刷新第一道题
        $.ajax({
            type:"get",
            url:"/api/train/one/orderType",
            data:{
                'id':Currentid,
                'type':"single"
            },
            dataType:"json",
            success:function (result) {
                $("#AbreadcrumbChapter2").html("专项练习");
                $("#breadcrumbChapter").html("单选题 (顺序练习)");
                $("#SpanQuestionId").html(result.qoId + "：" );
                $("#SpanQuestionTitle").html(result.qoTitle);
                $("#LiAnswers1").html(result.qoOptionA);
                $("#LiAnswers2").html(result.qoOptionB);
                $("#qoDescription").html(result.qoDescription);
                $("#QoRightAnswer").html(result.qoAnswer);
                $("#qoDifficulties").html(result.qoDifficultty);
                if((result.qoType  ==='judge')){
                    $("#qoType").html("判断题")
                }else if((result.qoType === 'single')){
                    $("#qoType").html("单选题")
                }else {
                    $("#qoType").html("多选题")
                }
                //如果有CD选项
                if (result.qoOptionC !== null){
                    $("#LiAnswers3").html(result.qoOptionC);
                }else {
                    $("#BtnConfirmAnswerC").hide();
                }
                if(result.qoOptionD !==null) {
                    $("#LiAnswers4").html(result.qoOptionD);
                }else {
                    $("#BtnConfirmAnswerD").hide();
                }
                //如果有图片
                if(result.qoImage !==null){
                    $("#qoimage").attr("src",result.qoImage)
                }
                //如果有视频
                if(result.qoImage !==null){
                    $("#qoimage").attr("src",result.qoImage)
                }
            },
            error:function () {
                $("#SpanQuestionId").html("");
                $("#SpanQuestionTitle").html("");
                alert("没有题了呢，点击上一题/下一题，或者试试其他练习吧~");
                if(Currentid < 2){
                    Currentid++
                }else {
                    Currentid--
                }
            }
        });
        //点击下一题发送Ajax请求
        $("#BtnNextQuestion").click(function () {
            //发送请求之前，清空答题版所有的CSS样式
            Currentid++;
            var SpanRightOrWrongTips = $("#SpanRightOrWrongTips");
            var QoRightAnswer = $("#QoRightAnswer");
            var qoDescription = $("#qoDescription");
            var DivAnswers = $("#DivAnswers");
            var LiAnswers1 = $("#LiAnswers1");
            var LiAnswers2 = $("#LiAnswers2");
            var LiAnswers3 = $("#LiAnswers3");
            var LiAnswers4 = $("#LiAnswers4");
            var qoimage = $("#qoimage");
            $("#BtnConfirmAnswerC").show();
            $("#BtnConfirmAnswerD").show();
            var SpanUserChoose = $("#SpanUserChoose");
            qoDescription.css("display","none");
            DivAnswers.css("visibility","hidden");
            qoimage.attr("src","");
            SpanUserChoose.removeClass("text-success text-danger").text("");
            QoRightAnswer.removeClass("text-success text-danger").css("font-weight","normal").text("");
            SpanRightOrWrongTips.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers1.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers2.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers3.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers4.removeClass("text-success text-danger").css("font-weight","normal").text("");
            $.ajax({
                type:"get",
                url:"/api/train/one/orderType",
                data:{
                    'id':Currentid,
                    'type':"single"
                },
                dataType:"json",
                success:function (result) {
                    $("#breadcrumbChapter").html("单选题 (顺序练习)");
                    $("#SpanQuestionId").html(result.qoId + "：" );
                    $("#SpanQuestionTitle").html(result.qoTitle);
                    $("#LiAnswers1").html(result.qoOptionA);
                    $("#LiAnswers2").html(result.qoOptionB);
                    $("#qoDescription").html(result.qoDescription);
                    $("#QoRightAnswer").html(result.qoAnswer);
                    $("#qoDifficulties").html(result.qoDifficultty);
                    if((result.qoType  ==='judge')){
                        $("#qoType").html("判断题")
                    }else if((result.qoType === 'single')){
                        $("#qoType").html("单选题")
                    }else {
                        $("#qoType").html("多选题")
                    }
                    //如果有CD选项
                    if (result.qoOptionC !== null){
                        $("#LiAnswers3").html(result.qoOptionC);
                    }else {
                        $("#BtnConfirmAnswerC").hide();
                    }
                    if(result.qoOptionD !==null) {
                        $("#LiAnswers4").html(result.qoOptionD);
                    }else {
                        $("#BtnConfirmAnswerD").hide();
                    }
                    //如果有图片
                    if(result.qoImage !==null){
                        $("#qoimage").attr("src",result.qoImage)
                    }
                    //如果有视频
                    if(result.qoImage !==null){
                        $("#qoimage").attr("src",result.qoImage)
                    }
                },
                error:function () {
                    $("#SpanQuestionId").html("");
                    $("#SpanQuestionTitle").html("");
                    alert("没有题了呢，点击上一题/下一题，或者试试其他练习吧~");
                    if(Currentid < 2){
                        Currentid++
                    }else {
                        Currentid--
                    }
                    console.log(Currentid);
                }
            });
        });
        //点击上一题发送Ajax请求
        $("#BtnPreQuestion").click(function () {
            //发送请求之前，清空答题版所有的CSS样式
            Currentid--;
            var SpanRightOrWrongTips = $("#SpanRightOrWrongTips");
            var QoRightAnswer = $("#QoRightAnswer");
            var qoDescription = $("#qoDescription");
            var DivAnswers = $("#DivAnswers");
            var LiAnswers1 = $("#LiAnswers1");
            var LiAnswers2 = $("#LiAnswers2");
            var LiAnswers3 = $("#LiAnswers3");
            var LiAnswers4 = $("#LiAnswers4");
            var qoimage = $("#qoimage");
            $("#BtnConfirmAnswerC").show();
            $("#BtnConfirmAnswerD").show();
            var SpanUserChoose = $("#SpanUserChoose");
            qoDescription.css("display","none");
            DivAnswers.css("visibility","hidden");
            qoimage.attr("src","");
            SpanUserChoose.removeClass("text-success text-danger").text("");
            QoRightAnswer.removeClass("text-success text-danger").css("font-weight","normal").text("");
            SpanRightOrWrongTips.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers1.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers2.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers3.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers4.removeClass("text-success text-danger").css("font-weight","normal").text("");
            $.ajax({
                type:"get",
                url:"/api/train/one/orderType",
                data:{
                    'id':Currentid,
                    'type':"single"
                },
                dataType:"json",
                success:function (result) {
                    $("#breadcrumbChapter").html("单选题 (顺序练习)");
                    $("#SpanQuestionId").html(result.qoId + "：" );
                    $("#SpanQuestionTitle").html(result.qoTitle);
                    $("#LiAnswers1").html(result.qoOptionA);
                    $("#LiAnswers2").html(result.qoOptionB);
                    $("#qoDescription").html(result.qoDescription);
                    $("#QoRightAnswer").html(result.qoAnswer);
                    $("#qoDifficulties").html(result.qoDifficultty);
                    if((result.qoType  ==='judge')){
                        $("#qoType").html("判断题")
                    }else if((result.qoType === 'single')){
                        $("#qoType").html("单选题")
                    }else {
                        $("#qoType").html("多选题")
                    }
                    //如果有CD选项
                    if (result.qoOptionC !== null){
                        $("#LiAnswers3").html(result.qoOptionC);
                    }else {
                        $("#BtnConfirmAnswerC").hide();
                    }
                    if(result.qoOptionD !==null) {
                        $("#LiAnswers4").html(result.qoOptionD);
                    }else {
                        $("#BtnConfirmAnswerD").hide();
                    }
                    //如果有图片
                    if(result.qoImage !==null){
                        $("#qoimage").attr("src",result.qoImage)
                    }
                    //如果有视频
                    if(result.qoImage !==null){
                        $("#qoimage").attr("src",result.qoImage)
                    }
                },
                error:function () {
                    $("#SpanQuestionId").html("");
                    $("#SpanQuestionTitle").html("");
                    alert("没有题了呢，点击上一题/下一题，或者试试其他练习吧~");
                    if(Currentid < 2){
                        Currentid++
                    }else {
                        Currentid--
                    }
                    console.log(Currentid);
                }
            });
        });
    }
    else if(model === "randomJudge" && chapter === "null")
    {
        //刷新第一道题
        $.ajax({
            type:"get",
            url:"/api/train/one/randomType",
            data:{
                'type':"judge"
            },
            dataType:"json",
            success:function (result) {
                $("#AbreadcrumbChapter2").html("专项练习");
                $("#breadcrumbChapter").html("判断题 (随机练习)");
                $("#SpanQuestionId").html(result.qoId + "：" );
                $("#SpanQuestionTitle").html(result.qoTitle);
                $("#LiAnswers1").html(result.qoOptionA);
                $("#LiAnswers2").html(result.qoOptionB);
                $("#qoDescription").html(result.qoDescription);
                $("#QoRightAnswer").html(result.qoAnswer);
                $("#qoDifficulties").html(result.qoDifficultty);
                if((result.qoType  ==='judge')){
                    $("#qoType").html("判断题")
                }else if((result.qoType === 'single')){
                    $("#qoType").html("单选题")
                }else {
                    $("#qoType").html("多选题")
                }
                //如果有CD选项
                if (result.qoOptionC !== null){
                    $("#LiAnswers3").html(result.qoOptionC);
                }else {
                    $("#BtnConfirmAnswerC").hide();
                }
                if(result.qoOptionD !==null) {
                    $("#LiAnswers4").html(result.qoOptionD);
                }else {
                    $("#BtnConfirmAnswerD").hide();
                }
                //如果有图片
                if(result.qoImage !==null){
                    $("#qoimage").attr("src",result.qoImage)
                }
                //如果有视频
                if(result.qoImage !==null){
                    $("#qoimage").attr("src",result.qoImage)
                }
            },
            error:function () {
                $("#SpanQuestionId").html("");
                $("#SpanQuestionTitle").html("");
                alert("没有题了呢，点击上一题/下一题，或者试试其他练习吧~");
                if(Currentid < 2){
                    Currentid++
                }else {
                    Currentid--
                }
            }
        });
        //点击下一题发送Ajax请求
        $("#BtnNextQuestion").click(function () {
            //发送请求之前，清空答题版所有的CSS样式
            var SpanRightOrWrongTips = $("#SpanRightOrWrongTips");
            var QoRightAnswer = $("#QoRightAnswer");
            var qoDescription = $("#qoDescription");
            var DivAnswers = $("#DivAnswers");
            var LiAnswers1 = $("#LiAnswers1");
            var LiAnswers2 = $("#LiAnswers2");
            var LiAnswers3 = $("#LiAnswers3");
            var LiAnswers4 = $("#LiAnswers4");
            var qoimage = $("#qoimage");
            $("#BtnConfirmAnswerC").show();
            $("#BtnConfirmAnswerD").show();
            var SpanUserChoose = $("#SpanUserChoose");
            qoDescription.css("display","none");
            DivAnswers.css("visibility","hidden");
            qoimage.attr("src","");
            SpanUserChoose.removeClass("text-success text-danger").text("");
            QoRightAnswer.removeClass("text-success text-danger").css("font-weight","normal").text("");
            SpanRightOrWrongTips.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers1.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers2.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers3.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers4.removeClass("text-success text-danger").css("font-weight","normal").text("");
            $.ajax({
                type:"get",
                url:"/api/train/one/randomType",
                data:{
                    'type':"judge"
                },
                dataType:"json",
                success:function (result) {
                    $("#breadcrumbChapter").html("判断题 (随机练习)");
                    $("#SpanQuestionId").html(result.qoId + "：" );
                    $("#SpanQuestionTitle").html(result.qoTitle);
                    $("#LiAnswers1").html(result.qoOptionA);
                    $("#LiAnswers2").html(result.qoOptionB);
                    $("#qoDescription").html(result.qoDescription);
                    $("#QoRightAnswer").html(result.qoAnswer);
                    $("#qoDifficulties").html(result.qoDifficultty);
                    if((result.qoType  ==='judge')){
                        $("#qoType").html("判断题")
                    }else if((result.qoType === 'single')){
                        $("#qoType").html("单选题")
                    }else {
                        $("#qoType").html("多选题")
                    }
                    //如果有CD选项
                    if (result.qoOptionC !== null){
                        $("#LiAnswers3").html(result.qoOptionC);
                    }else {
                        $("#BtnConfirmAnswerC").hide();
                    }
                    if(result.qoOptionD !==null) {
                        $("#LiAnswers4").html(result.qoOptionD);
                    }else {
                        $("#BtnConfirmAnswerD").hide();
                    }
                    //如果有图片
                    if(result.qoImage !==null){
                        $("#qoimage").attr("src",result.qoImage)
                    }
                    //如果有视频
                    if(result.qoImage !==null){
                        $("#qoimage").attr("src",result.qoImage)
                    }
                },
                error:function () {
                    $("#SpanQuestionId").html("");
                    $("#SpanQuestionTitle").html("");
                    alert("没有题了呢，点击上一题/下一题，或者试试其他练习吧~");
                    if(Currentid < 2){
                        Currentid++
                    }else {
                        Currentid--
                    }
                }
            });
        });
        //点击下一题发送Ajax请求
        $("#BtnPreQuestion").click(function () {
            //发送请求之前，清空答题版所有的CSS样式
            var SpanRightOrWrongTips = $("#SpanRightOrWrongTips");
            var QoRightAnswer = $("#QoRightAnswer");
            var qoDescription = $("#qoDescription");
            var DivAnswers = $("#DivAnswers");
            var LiAnswers1 = $("#LiAnswers1");
            var LiAnswers2 = $("#LiAnswers2");
            var LiAnswers3 = $("#LiAnswers3");
            var LiAnswers4 = $("#LiAnswers4");
            var qoimage = $("#qoimage");
            $("#BtnConfirmAnswerC").show();
            $("#BtnConfirmAnswerD").show();
            var SpanUserChoose = $("#SpanUserChoose");
            qoDescription.css("display","none");
            DivAnswers.css("visibility","hidden");
            qoimage.attr("src","");
            SpanUserChoose.removeClass("text-success text-danger").text("");
            QoRightAnswer.removeClass("text-success text-danger").css("font-weight","normal").text("");
            SpanRightOrWrongTips.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers1.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers2.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers3.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers4.removeClass("text-success text-danger").css("font-weight","normal").text("");
            $.ajax({
                type:"get",
                url:"/api/train/one/randomType",
                data:{
                    'type':"judge"
                },
                dataType:"json",
                success:function (result) {
                    $("#breadcrumbChapter").html("判断题 (随机练习)");
                    $("#SpanQuestionId").html(result.qoId + "：" );
                    $("#SpanQuestionTitle").html(result.qoTitle);
                    $("#LiAnswers1").html(result.qoOptionA);
                    $("#LiAnswers2").html(result.qoOptionB);
                    $("#qoDescription").html(result.qoDescription);
                    $("#QoRightAnswer").html(result.qoAnswer);
                    $("#qoDifficulties").html(result.qoDifficultty);
                    if((result.qoType  ==='judge')){
                        $("#qoType").html("判断题")
                    }else if((result.qoType === 'single')){
                        $("#qoType").html("单选题")
                    }else {
                        $("#qoType").html("多选题")
                    }
                    //如果有CD选项
                    if (result.qoOptionC !== null){
                        $("#LiAnswers3").html(result.qoOptionC);
                    }else {
                        $("#BtnConfirmAnswerC").hide();
                    }
                    if(result.qoOptionD !==null) {
                        $("#LiAnswers4").html(result.qoOptionD);
                    }else {
                        $("#BtnConfirmAnswerD").hide();
                    }
                    //如果有图片
                    if(result.qoImage !==null){
                        $("#qoimage").attr("src",result.qoImage)
                    }
                    //如果有视频
                    if(result.qoImage !==null){
                        $("#qoimage").attr("src",result.qoImage)
                    }
                },
                error:function () {
                    $("#SpanQuestionId").html("");
                    $("#SpanQuestionTitle").html("");
                    alert("没有题了呢，点击上一题/下一题，或者试试其他练习吧~");
                    if(Currentid < 2){
                        Currentid++
                    }else {
                        Currentid--
                    }
                }
            });
        });
    }
    else if(model === "randomSingle" && chapter === "null"){
        //刷新第一道题
        $.ajax({
            type:"get",
            url:"/api/train/one/randomType",
            data:{
                'type':"single"
            },
            dataType:"json",
            success:function (result) {
                $("#AbreadcrumbChapter2").html("专项练习");
                $("#breadcrumbChapter").html("单选题 (随机练习)");
                $("#SpanQuestionId").html(result.qoId + "：" );
                $("#SpanQuestionTitle").html(result.qoTitle);
                $("#LiAnswers1").html(result.qoOptionA);
                $("#LiAnswers2").html(result.qoOptionB);
                $("#qoDescription").html(result.qoDescription);
                $("#QoRightAnswer").html(result.qoAnswer);
                $("#qoDifficulties").html(result.qoDifficultty);
                if((result.qoType  ==='judge')){
                    $("#qoType").html("判断题")
                }else if((result.qoType === 'single')){
                    $("#qoType").html("单选题")
                }else {
                    $("#qoType").html("多选题")
                }
                //如果有CD选项
                if (result.qoOptionC !== null){
                    $("#LiAnswers3").html(result.qoOptionC);
                }else {
                    $("#BtnConfirmAnswerC").hide();
                }
                if(result.qoOptionD !==null) {
                    $("#LiAnswers4").html(result.qoOptionD);
                }else {
                    $("#BtnConfirmAnswerD").hide();
                }
                //如果有图片
                if(result.qoImage !==null){
                    $("#qoimage").attr("src",result.qoImage)
                }
                //如果有视频
                if(result.qoImage !==null){
                    $("#qoimage").attr("src",result.qoImage)
                }
            },
            error:function () {
                $("#SpanQuestionId").html("");
                $("#SpanQuestionTitle").html("");
                alert("没有题了呢，点击上一题/下一题，或者试试其他练习吧~");
                if(Currentid < 2){
                    Currentid++
                }else {
                    Currentid--
                }
            }
        });
        //点击下一题发送Ajax请求
        $("#BtnNextQuestion").click(function () {
            //发送请求之前，清空答题版所有的CSS样式
            var SpanRightOrWrongTips = $("#SpanRightOrWrongTips");
            var QoRightAnswer = $("#QoRightAnswer");
            var qoDescription = $("#qoDescription");
            var DivAnswers = $("#DivAnswers");
            var LiAnswers1 = $("#LiAnswers1");
            var LiAnswers2 = $("#LiAnswers2");
            var LiAnswers3 = $("#LiAnswers3");
            var LiAnswers4 = $("#LiAnswers4");
            var qoimage = $("#qoimage");
            $("#BtnConfirmAnswerC").show();
            $("#BtnConfirmAnswerD").show();
            var SpanUserChoose = $("#SpanUserChoose");
            qoDescription.css("display","none");
            DivAnswers.css("visibility","hidden");
            qoimage.attr("src","");
            SpanUserChoose.removeClass("text-success text-danger").text("");
            QoRightAnswer.removeClass("text-success text-danger").css("font-weight","normal").text("");
            SpanRightOrWrongTips.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers1.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers2.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers3.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers4.removeClass("text-success text-danger").css("font-weight","normal").text("");
            $.ajax({
                type:"get",
                url:"/api/train/one/randomType",
                data:{
                    'type':"single"
                },
                dataType:"json",
                success:function (result) {
                    $("#breadcrumbChapter").html("单选题 (随机练习)");
                    $("#SpanQuestionId").html(result.qoId + "：" );
                    $("#SpanQuestionTitle").html(result.qoTitle);
                    $("#LiAnswers1").html(result.qoOptionA);
                    $("#LiAnswers2").html(result.qoOptionB);
                    $("#qoDescription").html(result.qoDescription);
                    $("#QoRightAnswer").html(result.qoAnswer);
                    $("#qoDifficulties").html(result.qoDifficultty);
                    if((result.qoType  ==='judge')){
                        $("#qoType").html("判断题")
                    }else if((result.qoType === 'single')){
                        $("#qoType").html("单选题")
                    }else {
                        $("#qoType").html("多选题")
                    }
                    //如果有CD选项
                    if (result.qoOptionC !== null){
                        $("#LiAnswers3").html(result.qoOptionC);
                    }else {
                        $("#BtnConfirmAnswerC").hide();
                    }
                    if(result.qoOptionD !==null) {
                        $("#LiAnswers4").html(result.qoOptionD);
                    }else {
                        $("#BtnConfirmAnswerD").hide();
                    }
                    //如果有图片
                    if(result.qoImage !==null){
                        $("#qoimage").attr("src",result.qoImage)
                    }
                    //如果有视频
                    if(result.qoImage !==null){
                        $("#qoimage").attr("src",result.qoImage)
                    }
                },
                error:function () {
                    $("#SpanQuestionId").html("");
                    $("#SpanQuestionTitle").html("");
                    alert("没有题了呢，点击上一题/下一题，或者试试其他练习吧~");
                    if(Currentid < 2){
                        Currentid++
                    }else {
                        Currentid--
                    }
                }
            });
        });
        //点击下一题发送Ajax请求
        $("#BtnPreQuestion").click(function () {
            //发送请求之前，清空答题版所有的CSS样式
            var SpanRightOrWrongTips = $("#SpanRightOrWrongTips");
            var QoRightAnswer = $("#QoRightAnswer");
            var qoDescription = $("#qoDescription");
            var DivAnswers = $("#DivAnswers");
            var LiAnswers1 = $("#LiAnswers1");
            var LiAnswers2 = $("#LiAnswers2");
            var LiAnswers3 = $("#LiAnswers3");
            var LiAnswers4 = $("#LiAnswers4");
            var qoimage = $("#qoimage");
            $("#BtnConfirmAnswerC").show();
            $("#BtnConfirmAnswerD").show();
            var SpanUserChoose = $("#SpanUserChoose");
            qoDescription.css("display","none");
            DivAnswers.css("visibility","hidden");
            qoimage.attr("src","");
            SpanUserChoose.removeClass("text-success text-danger").text("");
            QoRightAnswer.removeClass("text-success text-danger").css("font-weight","normal").text("");
            SpanRightOrWrongTips.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers1.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers2.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers3.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers4.removeClass("text-success text-danger").css("font-weight","normal").text("");
            $.ajax({
                type:"get",
                url:"/api/train/one/randomType",
                data:{
                    'type':"single"
                },
                dataType:"json",
                success:function (result) {
                    $("#breadcrumbChapter").html("单选题 (随机练习)");
                    $("#SpanQuestionId").html(result.qoId + "：" );
                    $("#SpanQuestionTitle").html(result.qoTitle);
                    $("#LiAnswers1").html(result.qoOptionA);
                    $("#LiAnswers2").html(result.qoOptionB);
                    $("#qoDescription").html(result.qoDescription);
                    $("#QoRightAnswer").html(result.qoAnswer);
                    $("#qoDifficulties").html(result.qoDifficultty);
                    if((result.qoType  ==='judge')){
                        $("#qoType").html("判断题")
                    }else if((result.qoType === 'single')){
                        $("#qoType").html("单选题")
                    }else {
                        $("#qoType").html("多选题")
                    }
                    //如果有CD选项
                    if (result.qoOptionC !== null){
                        $("#LiAnswers3").html(result.qoOptionC);
                    }else {
                        $("#BtnConfirmAnswerC").hide();
                    }
                    if(result.qoOptionD !==null) {
                        $("#LiAnswers4").html(result.qoOptionD);
                    }else {
                        $("#BtnConfirmAnswerD").hide();
                    }
                    //如果有图片
                    if(result.qoImage !==null){
                        $("#qoimage").attr("src",result.qoImage)
                    }
                    //如果有视频
                    if(result.qoImage !==null){
                        $("#qoimage").attr("src",result.qoImage)
                    }
                },
                error:function () {
                    $("#SpanQuestionId").html("");
                    $("#SpanQuestionTitle").html("");
                    alert("没有题了呢，点击上一题/下一题，或者试试其他练习吧~");
                    if(Currentid < 2){
                        Currentid++
                    }else {
                        Currentid--
                    }
                }
            });
        });
    }
    else if(model ==="random" && chapter !== null){
        //刷新第一道题
        $.ajax({
            type:"get",
            url:"/api/train/one/randomChapter",
            data:{
                'chapter':chapter
            },
            dataType:"json",
            success:function (result) {
                $("#breadcrumbChapter").html(chapter + " (随机练习)");
                $("#SpanQuestionId").html(result.qoId + "：" );
                $("#SpanQuestionTitle").html(result.qoTitle);
                $("#LiAnswers1").html(result.qoOptionA);
                $("#LiAnswers2").html(result.qoOptionB);
                $("#qoDescription").html(result.qoDescription);
                $("#QoRightAnswer").html(result.qoAnswer);
                $("#qoDifficulties").html(result.qoDifficultty);
                if((result.qoType  ==='judge')){
                    $("#qoType").html("判断题")
                }else if((result.qoType === 'single')){
                    $("#qoType").html("单选题")
                }else {
                    $("#qoType").html("多选题")
                }
                //如果有CD选项
                if (result.qoOptionC !== null){
                    $("#LiAnswers3").html(result.qoOptionC);
                }else {
                    $("#BtnConfirmAnswerC").hide();
                }
                if(result.qoOptionD !==null) {
                    $("#LiAnswers4").html(result.qoOptionD);
                }else {
                    $("#BtnConfirmAnswerD").hide();
                }
                //如果有图片
                if(result.qoImage !==null){
                    $("#qoimage").attr("src",result.qoImage)
                }
                //如果有视频
                if(result.qoImage !==null){
                    $("#qoimage").attr("src",result.qoImage)
                }
            },
            error:function () {
                $("#SpanQuestionId").html("");
                $("#SpanQuestionTitle").html("");
                alert("没有题了呢，点击上一题/下一题，或者试试其他练习吧~");
                if(Currentid < 2){
                    Currentid++
                }else {
                    Currentid--
                }
            }
        });
        //点击下一题发送Ajax请求
        $("#BtnNextQuestion").click(function () {
            //发送请求之前，清空答题版所有的CSS样式
            Currentid++;
            var SpanRightOrWrongTips = $("#SpanRightOrWrongTips");
            var QoRightAnswer = $("#QoRightAnswer");
            var qoDescription = $("#qoDescription");
            var DivAnswers = $("#DivAnswers");
            var LiAnswers1 = $("#LiAnswers1");
            var LiAnswers2 = $("#LiAnswers2");
            var LiAnswers3 = $("#LiAnswers3");
            var LiAnswers4 = $("#LiAnswers4");
            var qoimage = $("#qoimage");
            $("#BtnConfirmAnswerC").show();
            $("#BtnConfirmAnswerD").show();
            var SpanUserChoose = $("#SpanUserChoose");
            qoDescription.css("display","none");
            DivAnswers.css("visibility","hidden");
            qoimage.attr("src","");
            SpanUserChoose.removeClass("text-success text-danger").text("");
            QoRightAnswer.removeClass("text-success text-danger").css("font-weight","normal").text("");
            SpanRightOrWrongTips.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers1.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers2.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers3.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers4.removeClass("text-success text-danger").css("font-weight","normal").text("");
            $.ajax({
                type:"get",
                url:"/api/train/one/randomChapter",
                data:{
                    'chapter':chapter
                },
                dataType:"json",
                success:function (result) {
                    $("#breadcrumbChapter2").html("科目一顺序练习");
                    $("#SpanQuestionId").html(result.qoId + "：" );
                    $("#SpanQuestionTitle").html(result.qoTitle);
                    $("#LiAnswers1").html(result.qoOptionA);
                    $("#LiAnswers2").html(result.qoOptionB);
                    $("#qoDescription").html(result.qoDescription);
                    $("#QoRightAnswer").html(result.qoAnswer);
                    $("#qoDifficulties").html(result.qoDifficultty);
                    if((result.qoType  ==='judge')){
                        $("#qoType").html("判断题")
                    }else if((result.qoType === 'single')){
                        $("#qoType").html("单选题")
                    }else {
                        $("#qoType").html("多选题")
                    }
                    //如果有CD选项
                    if (result.qoOptionC !== null){
                        $("#LiAnswers3").html(result.qoOptionC);
                    }else {
                        $("#BtnConfirmAnswerC").hide();
                    }
                    if(result.qoOptionD !==null) {
                        $("#LiAnswers4").html(result.qoOptionD);
                    }else {
                        $("#BtnConfirmAnswerD").hide();
                    }
                    //如果有图片
                    if(result.qoImage !==null){
                        $("#qoimage").attr("src",result.qoImage)
                    }
                    //如果有视频
                    if(result.qoImage !==null){
                        $("#qoimage").attr("src",result.qoImage)
                    }
                },
                error:function () {
                    $("#SpanQuestionId").html("");
                    $("#SpanQuestionTitle").html("");
                    alert("没有题了呢，点击上一题/下一题，或者试试其他练习吧~");
                    if(Currentid < 2){
                        Currentid++
                    }else {
                        Currentid--
                    }
                }
            });
        });
        //点击上一题发送Ajax请求
        $("#BtnPreQuestion").click(function () {
            //发送请求之前，清空答题版所有的CSS样式
            var SpanRightOrWrongTips = $("#SpanRightOrWrongTips");
            var QoRightAnswer = $("#QoRightAnswer");
            var qoDescription = $("#qoDescription");
            var DivAnswers = $("#DivAnswers");
            var LiAnswers1 = $("#LiAnswers1");
            var LiAnswers2 = $("#LiAnswers2");
            var LiAnswers3 = $("#LiAnswers3");
            var LiAnswers4 = $("#LiAnswers4");
            var qoimage = $("#qoimage");
            $("#BtnConfirmAnswerC").show();
            $("#BtnConfirmAnswerD").show();
            var SpanUserChoose = $("#SpanUserChoose");
            qoDescription.css("display","none");
            DivAnswers.css("visibility","hidden");
            qoimage.attr("src","");
            SpanUserChoose.removeClass("text-success text-danger").text("");
            QoRightAnswer.removeClass("text-success text-danger").css("font-weight","normal").text("");
            SpanRightOrWrongTips.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers1.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers2.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers3.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers4.removeClass("text-success text-danger").css("font-weight","normal").text("");
            $.ajax({
                type:"get",
                url:"/api/train/one/randomChapter",
                data:{
                    'chapter':chapter
                },
                dataType:"json",
                success:function (result) {
                    $("#breadcrumbChapter2").html("科目一顺序练习");
                    $("#SpanQuestionId").html(result.qoId + "：");
                    $("#SpanQuestionTitle").html(result.qoTitle);
                    $("#LiAnswers1").html(result.qoOptionA);
                    $("#LiAnswers2").html(result.qoOptionB);
                    $("#qoDescription").html(result.qoDescription);
                    $("#QoRightAnswer").html(result.qoAnswer);
                    $("#qoDifficulties").html(result.qoDifficultty);
                    if((result.qoType  ==='judge')){
                        $("#qoType").html("判断题")
                    }else if((result.qoType === 'single')){
                        $("#qoType").html("单选题")
                    }else {
                        $("#qoType").html("多选题")
                    }
                    //如果有CD选项
                    if (result.qoOptionC !== null){
                        $("#LiAnswers3").html(result.qoOptionC);
                    }else {
                        $("#BtnConfirmAnswerC").hide();
                    }
                    if(result.qoOptionD !==null) {
                        $("#LiAnswers4").html(result.qoOptionD);
                    }else {
                        $("#BtnConfirmAnswerD").hide();
                    }
                    //如果有图片
                    if(result.qoImage !==null){
                        $("#qoimage").attr("src",result.qoImage)
                    }
                    //如果有视频
                    if(result.qoImage !==null){
                        $("#qoimage").attr("src",result.qoImage)
                    }
                },
                error:function () {
                    $("#SpanQuestionId").html("");
                    $("#SpanQuestionTitle").html("");
                    alert("没有题了呢，点击上一题/下一题，或者试试其他练习吧~");
                    if(Currentid < 2){
                        Currentid++
                    }else {
                        Currentid--
                    }
                }
            });
        })
    }
    else if(model === "sequence" && chapter !== null) {
        //刷新第一道题
        $.ajax({
            type:"get",
            url:"/api/train/one/orderChapter",
            data:{
                'id':Currentid,
                'chapter':chapter
            },
            dataType:"json",
            success:function (result) {
                $("#breadcrumbChapter").html(chapter + " (顺序练习)");
                $("#SpanQuestionId").html(result.qoId + "：" );
                $("#SpanQuestionTitle").html(result.qoTitle);
                $("#LiAnswers1").html(result.qoOptionA);
                $("#LiAnswers2").html(result.qoOptionB);
                $("#qoDescription").html(result.qoDescription);
                $("#QoRightAnswer").html(result.qoAnswer);
                $("#qoDifficulties").html(result.qoDifficultty);
                if((result.qoType  ==='judge')){
                    $("#qoType").html("判断题")
                }else if((result.qoType === 'single')){
                    $("#qoType").html("单选题")
                }else {
                    $("#qoType").html("多选题")
                }
                //如果有CD选项
                if (result.qoOptionC !== null){
                    $("#LiAnswers3").html(result.qoOptionC);
                }else {
                    $("#BtnConfirmAnswerC").hide();
                }
                if(result.qoOptionD !==null) {
                    $("#LiAnswers4").html(result.qoOptionD);
                }else {
                    $("#BtnConfirmAnswerD").hide();
                }
                //如果有图片
                if(result.qoImage !==null){
                    $("#qoimage").attr("src",result.qoImage)
                }
                //如果有视频
                if(result.qoImage !==null){
                    $("#qoimage").attr("src",result.qoImage)
                }
            },
            error:function () {
                $("#SpanQuestionId").html("");
                $("#SpanQuestionTitle").html("");
                alert("没有题了呢，点击上一题/下一题，或者试试其他练习吧~");
                if(Currentid < 2){
                    Currentid++
                }else {
                    Currentid--
                }
            }
        });
        //点击下一题发送Ajax请求
        $("#BtnNextQuestion").click(function () {
            //发送请求之前，清空答题版所有的CSS样式
            Currentid++;
            var SpanRightOrWrongTips = $("#SpanRightOrWrongTips");
            var QoRightAnswer = $("#QoRightAnswer");
            var qoDescription = $("#qoDescription");
            var DivAnswers = $("#DivAnswers");
            var LiAnswers1 = $("#LiAnswers1");
            var LiAnswers2 = $("#LiAnswers2");
            var LiAnswers3 = $("#LiAnswers3");
            var LiAnswers4 = $("#LiAnswers4");
            var qoimage = $("#qoimage");
            $("#BtnConfirmAnswerC").show();
            $("#BtnConfirmAnswerD").show();
            var SpanUserChoose = $("#SpanUserChoose");
            qoDescription.css("display","none");
            DivAnswers.css("visibility","hidden");
            qoimage.attr("src","");
            SpanUserChoose.removeClass("text-success text-danger").text("");
            QoRightAnswer.removeClass("text-success text-danger").css("font-weight","normal").text("");
            SpanRightOrWrongTips.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers1.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers2.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers3.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers4.removeClass("text-success text-danger").css("font-weight","normal").text("");
            $.ajax({
                type:"get",
                url:"/api/train/one/orderChapter",
                data:{
                    'id':Currentid,
                    'chapter':chapter
                },
                dataType:"json",
                success:function (result) {
                    $("#breadcrumbChapter").html(chapter + " (顺序练习)");
                    $("#SpanQuestionId").html(result.qoId + "：" );
                    $("#SpanQuestionTitle").html(result.qoTitle);
                    $("#LiAnswers1").html(result.qoOptionA);
                    $("#LiAnswers2").html(result.qoOptionB);
                    $("#qoDescription").html(result.qoDescription);
                    $("#QoRightAnswer").html(result.qoAnswer);
                    $("#qoDifficulties").html(result.qoDifficultty);
                    if((result.qoType  ==='judge')){
                        $("#qoType").html("判断题")
                    }else if((result.qoType === 'single')){
                        $("#qoType").html("单选题")
                    }else {
                        $("#qoType").html("多选题")
                    }
                    //如果有CD选项
                    if (result.qoOptionC !== null){
                        $("#LiAnswers3").html(result.qoOptionC);
                    }else {
                        $("#BtnConfirmAnswerC").hide();
                    }
                    if(result.qoOptionD !==null) {
                        $("#LiAnswers4").html(result.qoOptionD);
                    }else {
                        $("#BtnConfirmAnswerD").hide();
                    }
                    //如果有图片
                    if(result.qoImage !==null){
                        $("#qoimage").attr("src",result.qoImage)
                    }
                    //如果有视频
                    if(result.qoImage !==null){
                        $("#qoimage").attr("src",result.qoImage)
                    }
                },
                error:function () {
                    $("#SpanQuestionId").html("");
                    $("#SpanQuestionTitle").html("");
                    alert("没有题了呢，点击上一题/下一题，或者试试其他练习吧~");
                    if(Currentid < 2){
                        Currentid++
                    }else {
                        Currentid--
                    }
                    console.log(Currentid);
                }
            });
        });
        //点击上一题发送Ajax请求
        $("#BtnPreQuestion").click(function () {
            //发送请求之前，清空答题版所有的CSS样式
            Currentid--;
            var SpanRightOrWrongTips = $("#SpanRightOrWrongTips");
            var QoRightAnswer = $("#QoRightAnswer");
            var qoDescription = $("#qoDescription");
            var DivAnswers = $("#DivAnswers");
            var LiAnswers1 = $("#LiAnswers1");
            var LiAnswers2 = $("#LiAnswers2");
            var LiAnswers3 = $("#LiAnswers3");
            var LiAnswers4 = $("#LiAnswers4");
            var qoimage = $("#qoimage");
            $("#BtnConfirmAnswerC").show();
            $("#BtnConfirmAnswerD").show();
            var SpanUserChoose = $("#SpanUserChoose");
            qoDescription.css("display","none");
            DivAnswers.css("visibility","hidden");
            qoimage.attr("src","");
            SpanUserChoose.removeClass("text-success text-danger").text("");
            QoRightAnswer.removeClass("text-success text-danger").css("font-weight","normal").text("");
            SpanRightOrWrongTips.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers1.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers2.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers3.removeClass("text-success text-danger").css("font-weight","normal").text("");
            LiAnswers4.removeClass("text-success text-danger").css("font-weight","normal").text("");
            $.ajax({
                type:"get",
                url:"/api/train/one/orderChapter",
                data:{
                    'id':Currentid,
                    'chapter':chapter
                },
                dataType:"json",
                success:function (result) {
                    $("#breadcrumbChapter").html(chapter + " (顺序练习)");
                    $("#SpanQuestionId").html(result.qoId + "：");
                    $("#SpanQuestionTitle").html(result.qoTitle);
                    $("#LiAnswers1").html(result.qoOptionA);
                    $("#LiAnswers2").html(result.qoOptionB);
                    $("#qoDescription").html(result.qoDescription);
                    $("#QoRightAnswer").html(result.qoAnswer);
                    $("#qoDifficulties").html(result.qoDifficultty);
                    if((result.qoType  ==='judge')){
                        $("#qoType").html("判断题")
                    }else if((result.qoType === 'single')){
                        $("#qoType").html("单选题")
                    }else {
                        $("#qoType").html("多选题")
                    }
                    //如果有CD选项
                    if (result.qoOptionC !== null){
                        $("#LiAnswers3").html(result.qoOptionC);
                    }else {
                        $("#BtnConfirmAnswerC").hide();
                    }
                    if(result.qoOptionD !==null) {
                        $("#LiAnswers4").html(result.qoOptionD);
                    }else {
                        $("#BtnConfirmAnswerD").hide();
                    }
                    //如果有图片
                    if(result.qoImage !==null){
                        $("#qoimage").attr("src",result.qoImage)
                    }
                    //如果有视频
                    if(result.qoImage !==null){
                        $("#qoimage").attr("src",result.qoImage)
                    }
                },
                error:function () {
                    $("#SpanQuestionId").html("");
                    $("#SpanQuestionTitle").html("");
                    alert("没有题了呢，点击上一题/下一题，或者试试其他练习吧~");
                    if(Currentid < 2){
                        Currentid++
                    }else {
                        Currentid--
                    }
                }
            });
        })
    }else {
        alert("请选择一种类型进行练习哟");
    }

    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if ( r != null ){
            return unescape(r[2]);
        }else{
            return null;
        }
    }

    //点击查看解析按钮，显示答案以及解析
    $("#BtnShowDescription").click(function () {
        $("#qoDescription").css("display","block");
        $("#DivAnswers").css("visibility","visible");
        //答案变绿并且加粗
        switch ($("#QoRightAnswer").text()) {
            case ("A"):$("#LiAnswers1").addClass("text-success").css("font-weight","bold") ;break;
            case ("B"):$("#LiAnswers2").addClass("text-success").css("font-weight","bold") ;break;
            case ("C"):$("#LiAnswers3").addClass("text-success").css("font-weight","bold") ;break;
            case ("D"):$("#LiAnswers4").addClass("text-success").css("font-weight","bold") ;break;
            }
        });
    //点击回答按钮选项判断对错
    $(".btnConfirmAnswer").click(function () {
        var SpanRightOrWrongTips = $("#SpanRightOrWrongTips");
        var QoRightAnswer = $("#QoRightAnswer");
        var qoDescription = $("#qoDescription");
        var DivAnswers = $("#DivAnswers");
        var LiAnswers1 = $("#LiAnswers1");
        var LiAnswers2 = $("#LiAnswers2");
        var LiAnswers3 = $("#LiAnswers3");
        var LiAnswers4 = $("#LiAnswers4");
        var SpanUserChoose = $("#SpanUserChoose");
        SpanUserChoose.removeClass("text-success text-danger");
        LiAnswers1.removeClass("text-success text-danger").css("font-weight","normal");
        LiAnswers2.removeClass("text-success text-danger").css("font-weight","normal");
        LiAnswers3.removeClass("text-success text-danger").css("font-weight","normal");
        LiAnswers4.removeClass("text-success text-danger").css("font-weight","normal");
        if($(this).text() === QoRightAnswer.text()){
            SpanUserChoose.text($(this).text()).addClass("text-success");
            qoDescription.css("display","block");
            DivAnswers.css("visibility","visible");
            SpanRightOrWrongTips.removeClass("text-danger");
            SpanRightOrWrongTips.text("回答正确").addClass("text-success");
            switch (QoRightAnswer.text()) {
                case ("A"):LiAnswers1.addClass("text-success").css("font-weight","bold") ;break;
                case ("B"):LiAnswers2.addClass("text-success").css("font-weight","bold") ;break;
                case ("C"):LiAnswers3.addClass("text-success").css("font-weight","bold") ;break;
                case ("D"):LiAnswers4.addClass("text-success").css("font-weight","bold") ;break;
            }
        }else{
            SpanUserChoose.html($(this).text()).addClass("text-danger");
            qoDescription.css("display","block");
            DivAnswers.css("visibility","visible");
            SpanRightOrWrongTips.removeClass("text-success");
            SpanRightOrWrongTips.html("回答错误").addClass("text-danger");
            switch (QoRightAnswer.text()) {
                case ("A"):LiAnswers1.addClass("text-success").css("font-weight","bold") ;break;
                case ("B"):LiAnswers2.addClass("text-success").css("font-weight","bold") ;break;
                case ("C"):LiAnswers3.addClass("text-success").css("font-weight","bold") ;break;
                case ("D"):LiAnswers4.addClass("text-success").css("font-weight","bold") ;break;
            };
            switch ($(this).text()) {
                case ("A"):LiAnswers1.addClass("text-danger").css("font-weight","bold") ;break;
                case ("B"):LiAnswers2.addClass("text-danger").css("font-weight","bold") ;break;
                case ("C"):LiAnswers3.addClass("text-danger").css("font-weight","bold") ;break;
                case ("D"):LiAnswers4.addClass("text-danger").css("font-weight","bold") ;break;
            }
        }
    });
    //点击加入错题集
    $("#BtnAddWrongList").click(function () {
        var CurrentQuestionId = $("#SpanQuestionId").text();
        //清除数字后面的冒号
        CurrentQuestionId = CurrentQuestionId.substring(0,CurrentQuestionId.length-1);
        $.ajax({
            type:"post",
            url:"/api/train/one/addMistake",
            data:{ 'id':CurrentQuestionId},
            dataType:"json",
            beforeSend: function (XMLHttpRequest) {
                var Authorization = $.cookie('Authorization');
                XMLHttpRequest.setRequestHeader("Authorization", Authorization);
            },
            success:function (result) {
                if(result.code === 510){
                    createAlert(1,"请登录后操作")
                }else if(result.code === 511){
                    createAlert(2,"该错题已经存在")
                }else if(result.code === 512){
                    createAlert(1,"插入错题失败")
                }else if(result.code ===200){
                    createAlert(0,"成功加入错题集 点击<strong>查看错题集</strong>进行查看哦")
                }else if(result.code === 401){
                    alert("请登录/重新登录后操作");
                }
            },
            error:function (result) {
                alert("与服务器似乎断开链接，请检查您的网络");
            }
        });
    });
    function createAlert(type,mesg) {
        var alert;
        // type ===1 创建危险框
        if(type === 1){
            alert = $(" <div class=\"alert alert-danger alert-dismissible col-lg-10 col-lg-offset-1 text-center\" style=\"font-size: 25px;\" id=\"dangerWarning\" role=\"alert\">\n" +
                "        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
                "    </div> ");
        }else if(type ===0){
            // type===0 创建成功框
            alert = $(" <div class=\"alert alert-success alert-dismissible col-lg-10 col-lg-offset-1 text-center\" style=\"font-size: 25px;\" id=\"dangerWarning\" role=\"alert\">\n" +
                "        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
                "    </div> ");
        //    type=2,创建warning框
        }else if(type=2){
            alert = $(" <div class=\"alert alert-warning alert-dismissible col-lg-10 col-lg-offset-1 text-center\" style=\"font-size: 25px;\" id=\"dangerWarning\" role=\"alert\">\n" +
                "        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
                "    </div> ");
        }
        // alertDiv.append(newDom);
        var alertDiv = $("#alertDiv");
        alert.append(mesg);
        alert.insertAfter(alertDiv);
    }

})
