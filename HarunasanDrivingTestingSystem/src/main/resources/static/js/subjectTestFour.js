$(document).ready(function () {
    $("#nav").load("../nav",function () {
        // 在载入完成之后改变状态
        $("#mainpage").removeClass("active");
        $("#subjectFour").addClass("active");
    });

    var text;

    intBtn();
    intLabClick_1()
    displayBtn();
    var RemainTime;
    //当前题目号
    var currentQuestionId = 1;
    //错误题目
    var WrongCount = 0;
    //没做的题目
    var remainAnswer =50;

    var WrongQuestion = new Array(10);
    var WrongQuestionId = new Array(10);
    //计时器45分钟
    function countdown(setTime){
        var Interval = setInterval(function () {
            var hour=0,minute=0,second=0;
            if(setTime>0){
                hour = Math.floor(setTime/(60*60));
                minute = Math.floor(setTime/60 - hour * 60);
                second = Math.floor( (setTime) - (hour * 60 * 60 ) - (minute * 60 ));
                if(minute <= 9){
                    minute = '0' + minute;
                }
                if( second <= 9) {
                    second = '0' +  second;
                }
            }
            RemainTime = $("#remainTime").html( minute + "分" + second + "秒");
            setTime--;
        },1000);
    };

    //让交卷模态框居中显示
    var  ModelConfirmFinish = $("#ModelConfirmFinish");
    $("#BtnFinishTest").click(function () {
        ModelConfirmFinish.modal({backdrop:'static'});
    });
    ModelConfirmFinish.on('show.bs.modal',function () {
        var $this = $(this);
        var $modal_dialog = $this.find('.modal-dialog');
        // 关键代码，如没将modal设置为 block，则$modala_dialog.height() 为零
        $this.css('display', 'block');
        $modal_dialog.css({'margin-top': Math.max(0, ($(window).height() - $modal_dialog.height()) / 2) });
    })

    //生成50个题目Button
    function createQuestionsList(){
        var UlQuestions = $("#UlQuestions");
        for (let i = 1 ; i <= 50 ; i++){
            var singleQuestion = $("<a href=\"javascript:void(0);\" class=\"LiSingleQuestion\"></a>");
            // var singleQuestion = $("<li class=\"LiSingleQuestion\"></li>");
            singleQuestion.append(i);
            UlQuestions.append(singleQuestion);
            if(i===1){
                singleQuestion.css("background","#cec027");
            }
        }
        //点击a标签之后跳转到对应的题目
        // var UlQuestions = $("#UlQuestions");
        // UlQuestions.on("click","a",function () {
        //     // alert($(this).text());     // 可以获取题目号
        //     // UlQuestions.children("a").css("background","rgba(255, 135, 124, 0.64)");
        //     // $(this).css("background","#ff3669");
        //     // currentQuestionId = $(this).text();
        //     // craeteOneQuestion($(this).text());
        //
        // })
    }

    // 注意！！以下为科目四特有代码，不要直接复制到科目四
    //点击开始考试按钮进行考试计时
    var Paper ;
    $("#BtnStartTest").click(function () {
        //设置初试时间
        text = $("#remainTime").html(  "45分" + "00秒");
        //设置定时器
        var setTime = parseInt(2699);
        countdown(setTime);
        $(this).hide();
        $("#DivTestingBtns").show();
        //生成题目号
        createQuestionsList();
        //得到试卷
        $.ajax({
            type:"get",
            url:"/api/test/four/getPaper",
            dataType:"json",
            success:function (result) {
                var JsonPaper = JSON.stringify(result);
                Paper = eval(JsonPaper);
                craeteOneQuestion(0);
            }
        });
    })

    //i为当前的题目编号
    function craeteOneQuestion(i) {
        clearAllCss();
        intBtn();
        intLabClick_1();
        $("#SpanQuestionTitle").html(Paper[i].qoTitle);
        $("#SpanQuestionId").html(currentQuestionId + "：");
        $("#LiAnswers1").html(Paper[i].qoOptionA);
        $("#LiAnswers2").html(Paper[i].qoOptionB);
        $("#qoDescription").html(Paper[i].qoDescription);
        $("#QoRightAnswer").html(Paper[i].qoAnswer);
        $("#qoDifficulties").html(Paper[i].qoDifficultty);
        if((Paper[i].qoType  ==='judge')){
            $("#SpanQuestionType").html("判断题")
        }else if((Paper[i].qoType === 'single')){
            $("#SpanQuestionType").html("单选题")
        }else {
            $("#SpanQuestionType").html("多选题")
        }
        //如果有CD选项
        if (Paper[i].qoOptionC !== null){
            $("#MBtnConfirmAnswerC").css("display","block");
            $("#LiAnswers3").html(Paper[i].qoOptionC);
        }else {

            $("#MBtnConfirmAnswerC").css("display","none");

        }
        if(Paper[i].qoOptionD !==null) {
            $("#MBtnConfirmAnswerD").css("display","block");
            $("#LiAnswers4").html(Paper[i].qoOptionD);
        }else {
            $("#BtnConfirmAnswerD").hide();
            $("#MBtnConfirmAnswerD").css("display","none");
        }
        //如果有图片
        if(Paper[i].qoImage !==null){
            $("#qoimage").attr("src",Paper[i].qoImage);
            $("#qoimage").css("display","block");
            $("#qovideo").css("display","none");
        }
        //如果有视频
        if(Paper[i].qoVideo !==null){
            $("#qoimage").attr("src",Paper[i].qoVideo);
            $("#qovideo").css("display","block");
            $("#qoimage").css("display","none");
        }
    }

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
        var AcurrentQuestion =  $("#UlQuestions").find("a").eq(currentQuestionId - 1);
        SpanUserChoose.removeClass("text-success text-danger");
        LiAnswers1.removeClass("text-success text-danger").css("font-weight","normal");
        LiAnswers2.removeClass("text-success text-danger").css("font-weight","normal");
        LiAnswers3.removeClass("text-success text-danger").css("font-weight","normal");
        LiAnswers4.removeClass("text-success text-danger").css("font-weight","normal");
        //如果回答正确
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
            AcurrentQuestion.css("background","#16ab33");
            AcurrentQuestion.next().css("background","#cec027");
            var UlQuestions = $("#UlQuestions");
            currentQuestionId++;
            craeteOneQuestion(currentQuestionId );
            remainAnswer--;
            // UlQuestions.children("a").eq(currentQuestionId).click();

        }else{
            //如果回答错误
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
            AcurrentQuestion.css("background","red");
            AcurrentQuestion.next().css("background","#cec027");
            var UlQuestions = $("#UlQuestions");
            currentQuestionId++
            craeteOneQuestion(currentQuestionId);
            // UlQuestions.children("a").eq(currentQuestionId).click();
            WrongQuestion[WrongCount] = currentQuestionId;
            WrongQuestionId[WrongCount] = Paper[currentQuestionId].qoId;
            console.log("WrongQuestion[WrongCount] = "+WrongQuestion[WrongCount]);
            console.log("WrongQuestionId[WrongCount] = "+WrongQuestionId[WrongCount]);
            WrongCount++;
            remainAnswer--;
            if(WrongCount === 6){
                alert("您已经错了六道题了考试结束");
                GenerateResult();
            }
        }

    });

    //点击交卷按钮交卷
    $("#btnModelFinishTest").click(function () {
        GenerateResult();
    });

    //展示错题集
    $("#ShowTheWrongList").click(function () {
        if($.cookie("Authorization")){
            window.location.href="../subjectFour/wrongList";
        }else {
            alert("请先登录");
        }
    })

    //清除所有的css样式
    function clearAllCss() {
        //清除所有样式
        var SpanRightOrWrongTips = $("#SpanRightOrWrongTips");
        var QoRightAnswer = $("#QoRightAnswer");
        var qoDescription = $("#qoDescription");
        var DivAnswers = $("#DivAnswers");
        var LiAnswers1 = $("#LiAnswers1");
        var LiAnswers2 = $("#LiAnswers2");
        var LiAnswers3 = $("#LiAnswers3");
        var LiAnswers4 = $("#LiAnswers4");
        var qoimage = $("#qoimage");
        var qovideo = $("#qovideo");
        $("#BtnConfirmAnswerC").show();
        $("#BtnConfirmAnswerD").show();
        var SpanUserChoose = $("#SpanUserChoose");
        qoDescription.css("display","none");
        DivAnswers.css("visibility","hidden");
        qoimage.attr("src","");
        qovideo.attr("src","");
        SpanUserChoose.removeClass("text-success text-danger").text("");
        QoRightAnswer.removeClass("text-success text-danger").css("font-weight","normal").text("");
        SpanRightOrWrongTips.removeClass("text-success text-danger").css("font-weight","normal").text("");
        LiAnswers1.removeClass("text-success text-danger").css("font-weight","normal").text("");
        LiAnswers2.removeClass("text-success text-danger").css("font-weight","normal").text("");
        LiAnswers3.removeClass("text-success text-danger").css("font-weight","normal").text("");
        LiAnswers4.removeClass("text-success text-danger").css("font-weight","normal").text("");

    }

    //生成试卷
    function GenerateResult() {
        // if($.cookie("Authorization")){
        //     // $.ajax({
        //     //     type:"post",
        //     //     url:"/api/test/one/addMultiMistake",
        //     //     data: { 'id':CurrentQuestionId
        //     //     },
        //     //     dataType:"json",
        //     //     beforeSend: function (XMLHttpRequest) {
        //     //         var Authorization = $.cookie('Authorization');
        //     //         XMLHttpRequest.setRequestHeader("Authorization", Authorization);
        //     //     },
        //     //     success:function (result) {
        //     //         if(result.code === 510){
        //     //             createAlert(1,"请登录后操作")
        //     //         }else if(result.code === 511){
        //     //             createAlert(2,"该错题已经存在")
        //     //         }else if(result.code === 512){
        //     //             createAlert(1,"插入错题失败")
        //     //         }else if(result.code ===200){
        //     //             createAlert(0,"成功加入错题集 点击<strong>查看错题集</strong>进行查看哦")
        //     //         }else if(result.code === 401){
        //     //             alert("请登录/重新登录后操作");
        //     //         }
        //     //     },
        //     //     error:function (result) {
        //     //         alert("与服务器似乎断开链接，请检查您的网络");
        //     //     }
        //     // });
        //     window.location.href="../subjectFour/wrongList";
        // }
        $("#DivQuestionArea").hide();
        $("#DivQuestionsListArea").hide();
        $("#DivResult").show();
        var score = 100 - WrongCount*2 - remainAnswer*2;
        $("#SpanTestScore").text(score);
        if(score >= 90){
            $("#H2Result").addClass("text-success");
            $("#TestResult").text("成功");
            $("#h1TestScore").addClass("text-success")
        }else{
            $("#H2Result").addClass("text-danger");
            $("#TestResult").text("失败");
            $("#h1TestScore").addClass("text-danger")
        }

    }
    $("#MBtnSubimit").click(function () {
        var Choices = "";
        $.each($('input:checkbox:checked'),function () {
            Choices += $(this).val();
        })
        intBtn()
        intLabClick_1();
        var SpanRightOrWrongTips = $("#SpanRightOrWrongTips");
        var QoRightAnswer = $("#QoRightAnswer");
        var qoDescription = $("#qoDescription");
        var DivAnswers = $("#DivAnswers");
        var LiAnswers1 = $("#LiAnswers1");
        var LiAnswers2 = $("#LiAnswers2");
        var LiAnswers3 = $("#LiAnswers3");
        var LiAnswers4 = $("#LiAnswers4");
        var SpanUserChoose = $("#SpanUserChoose");

        var AcurrentQuestion =  $("#UlQuestions").find("a").eq(currentQuestionId - 1);

        SpanUserChoose.removeClass("text-success text-danger");
        LiAnswers1.removeClass("text-success text-danger").css("font-weight","normal");
        LiAnswers2.removeClass("text-success text-danger").css("font-weight","normal");
        LiAnswers3.removeClass("text-success text-danger").css("font-weight","normal");
        LiAnswers4.removeClass("text-success text-danger").css("font-weight","normal");
        if(Choices === QoRightAnswer.text()){
            SpanUserChoose.text(Choices).addClass("text-success");
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
            AcurrentQuestion.css("background","#16ab33");
            AcurrentQuestion.next().css("background","#cec027");
            var UlQuestions = $("#UlQuestions");
            currentQuestionId++;
            craeteOneQuestion(currentQuestionId );
            remainAnswer--;

        }else{
            SpanUserChoose.html(Choices).addClass("text-danger");
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
            AcurrentQuestion.css("background","red");
            AcurrentQuestion.next().css("background","#cec027");
            var UlQuestions = $("#UlQuestions");
            currentQuestionId++
            craeteOneQuestion(currentQuestionId);
            // UlQuestions.children("a").eq(currentQuestionId).click();
            WrongQuestion[WrongCount] = currentQuestionId;
            WrongQuestionId[WrongCount] = Paper[currentQuestionId].qoId;
            console.log("WrongQuestion[WrongCount] = "+WrongQuestion[WrongCount]);
            console.log("WrongQuestionId[WrongCount] = "+WrongQuestionId[WrongCount]);
            WrongCount++;
            remainAnswer--;
            if(WrongCount === 6){
                alert("您已经错了6道题了考试结束");
                GenerateResult();
            }
        }
    })
    function displayBtn() {
        $("#M_showBtns").css("display","none");
        $("#MBtnSubimit").css("display","none");
    }
    function intBtn() {
        $("#MBtnSubimit").css("display","block");
        $("[name= choBtn]:checkbox").prop("checked",false);
        $(".iptConfirmAnswer").css("display","block");
        $("#M_showBtns").css("display","block");
        $(".labBtn").css("font-size","52px");
        $(".labBtn").css("color","#DCDCDC");
        $(".labBtn").css("font-size","52px");
        $(".labBtn").css("color","#DCDCDC");
        $(".labBtn").css("font-size","52px");
        $(".labBtn").css("color","#DCDCDC");
        $("#MBtnSubimit").css("margin-left","80%");
    }
    function intLabClick_1() {
        var i_a = 0;
        $("#Lab_Ans_A").click(function () {
            if (i_a++%2 == 0) {
                $("#Lab_Ans_A").css("color","#6cf");
            } else {
                $("#Lab_Ans_A").css("color","#DCDCDC");
            }
        });
        var i_b = 0;
        $("#Lab_Ans_B").click(function () {
            if (i_b++%2 == 0) {
                $("#Lab_Ans_B").css("color","#6cf");
            } else {
                $("#Lab_Ans_B").css("color","#DCDCDC");
            }
        });
        var i_c = 0;
        $("#Lab_Ans_C").click(function () {

            if (i_c ++%2 == 0) {
                $("#Lab_Ans_C").css("color","#6cf");
            } else {
                $("#Lab_Ans_C").css("color","#DCDCDC");
            }
        });
        var i_d = 0;
        $("#Lab_Ans_D").click(function () {

            if (i_d++%2 == 0) {
                $("#Lab_Ans_D").css("color","#6cf");
            } else {
                $("#Lab_Ans_D").css("color","#DCDCDC");
            }
        });
    }
})