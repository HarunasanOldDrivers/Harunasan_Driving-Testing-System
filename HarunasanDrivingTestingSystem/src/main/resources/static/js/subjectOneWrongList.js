$(document).ready(function () {
    //当前页
    var pageNum;
    //总题目数
    var total;
    //总页数
    var pages;
    // 页面初始化
    $.ajax({
        type:"get",
        url:"/api/train/one/mistakes",
        dataType:'json',
        data:{
            pageSize:3,
        },
        beforeSend: function (XMLHttpRequest) {
            var Authorization = $.cookie('Authorization');
            XMLHttpRequest.setRequestHeader("Authorization", Authorization);
        },
        success:function (result) {
            // 生成导航页数量
            var LiNavigationFirstWrongLists =  $("#LiNavigationFirstWrongLists");
            for (var i = result.pages ; i >= 1 ; i--){
                LiNavigationFirstWrongLists.after("<li></li>");
                LiNavigationFirstWrongLists.next().append("<a></a>");
                LiNavigationFirstWrongLists.next().children("a").attr("href","javascript:void(0);");
                LiNavigationFirstWrongLists.next().children("a").text(i);
                LiNavigationFirstWrongLists.next().children("li").addClass("liNavigation");
            }
            if(result.isFirstPage){
                // alert("123");
                // LiNavigationFirstWrongLists.addClass("disabled");
            }
            if(result.isLastPage){
                // $("#NextviousPagination").addClass("disabled");

            }
            var $textarea = $("#qoDescription");
            var $textareaTwo = $("#qoDescriptionTwo");
            var $textareaThree = $("#qoDescriptionThree");
            pageNum = result.pageNum;
            total = result.total;
            pages = result.pages;
            LiNavigationFirstWrongLists.next().addClass("active");
            //第一道题
            $("#SpanQuestionId").html(result.list[0].qoId + "：" );
            $("#SpanQuestionTitle").html(result.list[0].qoTitle);
            $("#LiAnswers1").html(result.list[0].qoOptionA);
            $("#LiAnswers2").html(result.list[0].qoOptionB);
            $textarea.val(result.list[0].qoDescription);
            var textareaValue = $textarea.val();
            $textarea.val($(textareaValue).text());
            $("#QoRightAnswer").html(result.list[0].qoAnswer);
            $("#qoDifficulties").html(result.list[0].qoDifficultty);
            if((result.list[0].qoType  ==='judge')){
                $("#qoType").html("判断题")
            }else if((result.list[0].qoType === 'single')){
                $("#qoType").html("单选题")
            }else {
                $("#qoType").html("多选题")
            }
            //如果有CD选项
            if (result.list[0].qoOptionC !== null){
                $("#LiAnswers3").html(result.list[0].qoOptionC);
            }else {
                $("#BtnConfirmAnswerC").hide();
            }
            if(result.list[0].qoOptionD !==null) {
                $("#LiAnswers4").html(result.list[0].qoOptionD);
            }else {
                $("#BtnConfirmAnswerD").hide();
            }
            //如果有图片
            if(result.list[0].qoImage !==null){
                $("#qoimage").attr("src",result.list[0].qoImage)
            }
            //如果有视频
            if(result.list[0].qoImage !==null){
                $("#qoimage").attr("src",result.list[0].qoImage)
            }

            //第二道题
            $("#SpanQuestionIdTwo").html(result.list[1].qoId + "：" );
            $("#SpanQuestionTitleTwo").html(result.list[1].qoTitle);
            $("#LiAnswers1Two").html(result.list[1].qoOptionA);
            $("#LiAnswers2Two").html(result.list[1].qoOptionB);
            $textareaTwo.val(result.list[1].qoDescription);
            var textareaValue2 = $textareaTwo.val();
            $textareaTwo.val($(textareaValue2).text());
            $("#QoRightAnswerTwo").html(result.list[1].qoAnswer);
            $("#qoDifficultiesTwo").html(result.list[1].qoDifficultty);
            if((result.list[1].qoType  ==='judge')){
                $("#qoTypeTwo").html("判断题")
            }else if((result.list[1].qoType === 'single')){
                $("#qoTypeTwo").html("单选题")
            }else {
                $("#qoTypeTwo").html("多选题")
            }
            //如果有CD选项
            if (result.list[1].qoOptionC !== null){
                $("#LiAnswers3Two").html(result.list[1].qoOptionC);
            }else {
                $("#BtnConfirmAnswerCTwo").hide();
            }
            if(result.list[1].qoOptionD !==null) {
                $("#LiAnswers4Two").html(result.list[1].qoOptionD);
            }else {
                $("#BtnConfirmAnswerDTwo").hide();
            }
            //如果有图片
            if(result.list[1].qoImage !==null){
                $("#qoimageTwo").attr("src",result.list[1].qoImage)
            }
            //如果有视频
            if(result.list[1].qoImage !==null){
                $("#qoimageTwo").attr("src",result.list[1].qoImage)
            }

            //第三道题
            $("#SpanQuestionIdThree").html(result.list[2].qoId + "：" );
            $("#SpanQuestionTitleThree").html(result.list[2].qoTitle);
            $("#LiAnswers1Three").html(result.list[2].qoOptionA);
            $("#LiAnswers2Three").html(result.list[2].qoOptionB);
            $textareaThree.val(result.list[2].qoDescription);
            var textareaValue3 = $textareaThree.val();
            $textareaThree.val($(textareaValue3).text());
            $("#QoRightAnswerThree").html(result.list[2].qoAnswer);
            $("#qoDifficultiesThree").html(result.list[2].qoDifficultty);
            if((result.list[2].qoType  ==='judge')){
                $("#qoTypeThree").html("判断题")
            }else if((result.list[2].qoType === 'single')){
                $("#qoTypeThree").html("单选题")
            }else {
                $("#qoTypeThree").html("多选题")
            }
            //如果有CD选项
            if (result.list[2].qoOptionC !== null){
                $("#LiAnswers3Three").html(result.list[2].qoOptionC);
            }else {
                $("#BtnConfirmAnswerCThree").hide();
            }
            if(result.list[2].qoOptionD !==null) {
                $("#LiAnswers4Three").html(result.list[2].qoOptionD);
            }else {
                $("#BtnConfirmAnswerDThree").hide();
            }
            //如果有图片
            if(result.list[2].qoImage !==null){
                $("#qoimageThree").attr("src",result.list[2].qoImage)
            }
            //如果有视频
            if(result.list[2].qoImage !==null){
                $("#qoimageThree").attr("src",result.list[2].qoImage)
            }
        },
        error:function () {
            $("#SpanQuestionId").html("");
            $("#SpanQuestionTitle").html("");
            alert("网络好像开了小差了呢~");
        }
    });
    //点击第一道题解析，解析第一道题答案
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
    //点击第二道题解析，解析第二道题答案
    $("#BtnShowDescriptionTwo").click(function () {
        $("#qoDescriptionTwo").css("display","block");
        $("#DivAnswersTwo").css("visibility","visible");
        //答案变绿并且加粗
        switch ($("#QoRightAnswerTwo").text()) {
            case ("A"):$("#LiAnswers1Two").addClass("text-success").css("font-weight","bold") ;break;
            case ("B"):$("#LiAnswers2Two").addClass("text-success").css("font-weight","bold") ;break;
            case ("C"):$("#LiAnswers3Two").addClass("text-success").css("font-weight","bold") ;break;
            case ("D"):$("#LiAnswers4Two").addClass("text-success").css("font-weight","bold") ;break;
        }
    });
    //点击第三道题解析，解析第三道题答案
    $("#BtnShowDescriptionThree").click(function () {
        $("#qoDescriptionThree").css("display","block");
        $("#DivAnswersThree").css("visibility","visible");
        //答案变绿并且加粗
        switch ($("#QoRightAnswerThree").text()) {
            case ("A"):$("#LiAnswers1Three").addClass("text-success").css("font-weight","bold") ;break;
            case ("B"):$("#LiAnswers2Three").addClass("text-success").css("font-weight","bold") ;break;
            case ("C"):$("#LiAnswers3Three").addClass("text-success").css("font-weight","bold") ;break;
            case ("D"):$("#LiAnswers4TThree").addClass("text-success").css("font-weight","bold") ;break;
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
            }
            switch ($(this).text()) {
                case ("A"):LiAnswers1.addClass("text-danger").css("font-weight","bold") ;break;
                case ("B"):LiAnswers2.addClass("text-danger").css("font-weight","bold") ;break;
                case ("C"):LiAnswers3.addClass("text-danger").css("font-weight","bold") ;break;
                case ("D"):LiAnswers4.addClass("text-danger").css("font-weight","bold") ;break;
            }
        }
    });
    //点击回答按钮选项判断对错
    $(".btnConfirmAnswerTwo").click(function () {
        var SpanRightOrWrongTips = $("#SpanRightOrWrongTipsTwo");
        var QoRightAnswer = $("#QoRightAnswerTwo");
        var qoDescription = $("#qoDescriptionTwo");
        var DivAnswers = $("#DivAnswersTwo");
        var LiAnswers1 = $("#LiAnswers1Two");
        var LiAnswers2 = $("#LiAnswers2Two");
        var LiAnswers3 = $("#LiAnswers3Two");
        var LiAnswers4 = $("#LiAnswers4Two");
        var SpanUserChoose = $("#SpanUserChooseTwo");
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
            }
            switch ($(this).text()) {
                case ("A"):LiAnswers1.addClass("text-danger").css("font-weight","bold") ;break;
                case ("B"):LiAnswers2.addClass("text-danger").css("font-weight","bold") ;break;
                case ("C"):LiAnswers3.addClass("text-danger").css("font-weight","bold") ;break;
                case ("D"):LiAnswers4.addClass("text-danger").css("font-weight","bold") ;break;
            }
        }
    });
    //点击回答按钮选项判断对错
    $(".btnConfirmAnswerThree").click(function () {
        var SpanRightOrWrongTips = $("#SpanRightOrWrongTipsThree");
        var QoRightAnswer = $("#QoRightAnswerThree");
        var qoDescription = $("#qoDescriptionThree");
        var DivAnswers = $("#DivAnswersThree");
        var LiAnswers1 = $("#LiAnswers1Three");
        var LiAnswers2 = $("#LiAnswers2Three");
        var LiAnswers3 = $("#LiAnswers3Three");
        var LiAnswers4 = $("#LiAnswers4Three");
        var SpanUserChoose = $("#SpanUserChooseThree");
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
            }
            switch ($(this).text()) {
                case ("A"):LiAnswers1.addClass("text-danger").css("font-weight","bold") ;break;
                case ("B"):LiAnswers2.addClass("text-danger").css("font-weight","bold") ;break;
                case ("C"):LiAnswers3.addClass("text-danger").css("font-weight","bold") ;break;
                case ("D"):LiAnswers4.addClass("text-danger").css("font-weight","bold") ;break;
            }
        }
    });
    //点击分页按钮进行分页
    $("#Ulpagination").on("click","li",function () {
        var pageNo = $(this).text().trim();
        var LastPageCount = 3 - total%3;
        // 如果是数字并且不是最后一页，执行跳转
        if(!isNaN(pageNo) && pageNo !=pages  ){
            $(this).addClass("active");
            $(this).siblings().removeClass("active");
            //清除CSS样式
            var DivThreeQuestion =$("#DivThreeQuestion");
            var DivTwoQuestion =$("#DivTwoQuestion");
            DivThreeQuestion.show();
            DivTwoQuestion.show();
            var SpanRightOrWrongTips = $("#SpanRightOrWrongTips");
            var QoRightAnswer = $("#QoRightAnswer");
            var qoDescription = $("#qoDescription");
            var DivAnswers = $("#DivAnswers");
            var LiAnswers1 = $("#LiAnswers1");
            var LiAnswers2 = $("#LiAnswers2");
            var LiAnswers3 = $("#LiAnswers3");
            var LiAnswers4 = $("#LiAnswers4");
            var qoimage = $("#qoimage");
            var SpanQuestionIdTwo = $("SpanQuestionIdTwo");
            var SpanQuestionTitleTwo =$("SpanQuestionTitleTwo");
            var SpanQuestionIdThree = $("SpanQuestionIdThree");
            var SpanQuestionTitleThree =$("SpanQuestionTitleThree");
            var SpanQuestionId = $("SpanQuestionId");
            var SpanQuestionTitle =$("SpanQuestionTitle");
            SpanQuestionIdTwo.html("");
            SpanQuestionTitleTwo.html("");
            SpanQuestionId.html("");
            SpanQuestionTitle.html("");
            SpanQuestionIdThree.html("");
            SpanQuestionTitleThree.html("");
            $("#BtnConfirmAnswerC").show();
            $("#BtnConfirmAnswerD").show();
            var SpanUserChoose = $("#SpanUserChoose");
            qoDescription.css("display", "none").val("");
            DivAnswers.css("visibility", "hidden");
            qoimage.attr("src", "");
            SpanUserChoose.removeClass("text-success text-danger").text("");
            QoRightAnswer.removeClass("text-success text-danger").css("font-weight", "normal").text("");
            SpanRightOrWrongTips.removeClass("text-success text-danger").css("font-weight", "normal").text("");
            LiAnswers1.removeClass("text-success text-danger").css("font-weight", "normal").text("");
            LiAnswers2.removeClass("text-success text-danger").css("font-weight", "normal").text("");
            LiAnswers3.removeClass("text-success text-danger").css("font-weight", "normal").text("");
            LiAnswers4.removeClass("text-success text-danger").css("font-weight", "normal").text("");

            SpanRightOrWrongTips = $("#SpanRightOrWrongTipsTwo");
            QoRightAnswer = $("#QoRightAnswerTwo");
            qoDescription = $("#qoDescriptionTwo");
            DivAnswers = $("#DivAnswersTwo");
            LiAnswers1 = $("#LiAnswers1Two");
            LiAnswers2 = $("#LiAnswers2Two");
            LiAnswers3 = $("#LiAnswers3Two");
            LiAnswers4 = $("#LiAnswers4Two");
            qoimage = $("#qoimageTwo");
            $("#BtnConfirmAnswerCTwo").show();
            $("#BtnConfirmAnswerDTwo").show();
            SpanUserChoose = $("#SpanUserChooseTwo");
            qoDescription.css("display", "none").val("");
            DivAnswers.css("visibility", "hidden");
            qoimage.attr("src", "");
            SpanUserChoose.removeClass("text-success text-danger").text("");
            QoRightAnswer.removeClass("text-success text-danger").css("font-weight", "normal").text("");
            SpanRightOrWrongTips.removeClass("text-success text-danger").css("font-weight", "normal").text("");
            LiAnswers1.removeClass("text-success text-danger").css("font-weight", "normal").text("");
            LiAnswers2.removeClass("text-success text-danger").css("font-weight", "normal").text("");
            LiAnswers3.removeClass("text-success text-danger").css("font-weight", "normal").text("");
            LiAnswers4.removeClass("text-success text-danger").css("font-weight", "normal").text("");


            SpanRightOrWrongTips = $("#SpanRightOrWrongTipsThree");
            QoRightAnswer = $("#QoRightAnswerThree");
            qoDescription = $("#qoDescriptionThree");
            DivAnswers = $("#DivAnswersThree");
            LiAnswers1 = $("#LiAnswers1Three");
            LiAnswers2 = $("#LiAnswers2Three");
            LiAnswers3 = $("#LiAnswers3Three");
            LiAnswers4 = $("#LiAnswers4Three");
            qoimage = $("#qoimageThree");
            $("#BtnConfirmAnswerCThree").show();
            $("#BtnConfirmAnswerDThree").show();
            SpanUserChoose = $("#SpanUserChooseThree");
            qoDescription.css("display", "none").val("");
            DivAnswers.css("visibility", "hidden");
            qoimage.attr("src", "");
            SpanUserChoose.removeClass("text-success text-danger").text("");
            QoRightAnswer.removeClass("text-success text-danger").css("font-weight", "normal").text("");
            SpanRightOrWrongTips.removeClass("text-success text-danger").css("font-weight", "normal").text("");
            LiAnswers1.removeClass("text-success text-danger").css("font-weight", "normal").text("");
            LiAnswers2.removeClass("text-success text-danger").css("font-weight", "normal").text("");
            LiAnswers3.removeClass("text-success text-danger").css("font-weight", "normal").text("");
            LiAnswers4.removeClass("text-success text-danger").css("font-weight", "normal").text("");
            $.ajax({
                type: "get",
                url: "/api/train/one/mistakes",
                dataType: 'json',
                data: {
                    pageSize: 3,
                    pageNo: pageNo
                },
                beforeSend: function (XMLHttpRequest) {
                    var Authorization = $.cookie('Authorization');
                    XMLHttpRequest.setRequestHeader("Authorization", Authorization);
                },
                success: function (result) {
                    // 生成导航页数量
                    var LiNavigationFirstWrongLists = $("#LiNavigationFirstWrongLists");
                    for (var i = result.pages; i >= 1; i--) {
                        // LiNavigationFirstWrongLists.after("<li><a class='liNavigation' data-target='button' href=\"\">" + i + "</a></li>");
                    }
                    var $textarea = $("#qoDescription");
                    var $textareaTwo = $("#qoDescriptionTwo");
                    var $textareaThree = $("#qoDescriptionThree");
                    pageNum = result.pageNum;
                    total = result.total;
                    pages = result.pages;
                    //第一道题
                    $("#SpanQuestionId").html(result.list[0].qoId + "：");
                    $("#SpanQuestionTitle").html(result.list[0].qoTitle);
                    $("#LiAnswers1").html(result.list[0].qoOptionA);
                    $("#LiAnswers2").html(result.list[0].qoOptionB);
                    $textarea.val(result.list[0].qoDescription);
                    var textareaValue = $textarea.val();
                    $textarea.val($(textareaValue).text());
                    $("#QoRightAnswer").html(result.list[0].qoAnswer);
                    $("#qoDifficulties").html(result.list[0].qoDifficultty);
                    if ((result.list[0].qoType === 'judge')) {
                        $("#qoType").html("判断题")
                    } else if ((result.list[0].qoType === 'single')) {
                        $("#qoType").html("单选题")
                    } else {
                        $("#qoType").html("多选题")
                    }
                    //如果有CD选项
                    if (result.list[0].qoOptionC !== null) {
                        $("#LiAnswers3").html(result.list[0].qoOptionC);
                    } else {
                        $("#BtnConfirmAnswerC").hide();
                    }
                    if (result.list[0].qoOptionD !== null) {
                        $("#LiAnswers4").html(result.list[0].qoOptionD);
                    } else {
                        $("#BtnConfirmAnswerD").hide();
                    }
                    //如果有图片
                    if (result.list[0].qoImage !== null) {
                        $("#qoimage").attr("src", result.list[0].qoImage)
                    }
                    //如果有视频
                    if (result.list[0].qoImage !== null) {
                        $("#qoimage").attr("src", result.list[0].qoImage)
                    }

                    //第二道题
                    $("#SpanQuestionIdTwo").html(result.list[1].qoId + "：");
                    $("#SpanQuestionTitleTwo").html(result.list[1].qoTitle);
                    $("#LiAnswers1Two").html(result.list[1].qoOptionA);
                    $("#LiAnswers2Two").html(result.list[1].qoOptionB);
                    $textareaTwo.val(result.list[1].qoDescription);
                    var textareaValue2 = $textareaTwo.val();
                    $textareaTwo.val($(textareaValue2).text());
                    $("#QoRightAnswerTwo").html(result.list[1].qoAnswer);
                    $("#qoDifficultiesTwo").html(result.list[1].qoDifficultty);
                    if ((result.list[1].qoType === 'judge')) {
                        $("#qoTypeTwo").html("判断题")
                    } else if ((result.list[1].qoType === 'single')) {
                        $("#qoTypeTwo").html("单选题")
                    } else {
                        $("#qoTypeTwo").html("多选题")
                    }
                    //如果有CD选项
                    if (result.list[1].qoOptionC !== null) {
                        $("#LiAnswers3Two").html(result.list[1].qoOptionC);
                    } else {
                        $("#BtnConfirmAnswerCTwo").hide();
                    }
                    if (result.list[1].qoOptionD !== null) {
                        $("#LiAnswers4Two").html(result.list[1].qoOptionD);
                    } else {
                        $("#BtnConfirmAnswerDTwo").hide();
                    }
                    //如果有图片
                    if (result.list[1].qoImage !== null) {
                        $("#qoimageTwo").attr("src", result.list[1].qoImage)
                    }
                    //如果有视频
                    if (result.list[1].qoImage !== null) {
                        $("#qoimageTwo").attr("src", result.list[1].qoImage)
                    }

                    //第三道题
                    $("#SpanQuestionIdThree").html(result.list[2].qoId + "：");
                    $("#SpanQuestionTitleThree").html(result.list[2].qoTitle);
                    $("#LiAnswers1Three").html(result.list[2].qoOptionA);
                    $("#LiAnswers2Three").html(result.list[2].qoOptionB);
                    $textareaThree.val(result.list[2].qoDescription);
                    var textareaValue3 = $textareaThree.val();
                    $textareaThree.val($(textareaValue3).text());
                    $("#QoRightAnswerThree").html(result.list[2].qoAnswer);
                    $("#qoDifficultiesThree").html(result.list[2].qoDifficultty);
                    if ((result.list[2].qoType === 'judge')) {
                        $("#qoTypeThree").html("判断题")
                    } else if ((result.list[2].qoType === 'single')) {
                        $("#qoTypeThree").html("单选题")
                    } else {
                        $("#qoTypeThree").html("多选题")
                    }
                    //如果有CD选项
                    if (result.list[2].qoOptionC !== null) {
                        $("#LiAnswers3Three").html(result.list[2].qoOptionC);
                    } else {
                        $("#BtnConfirmAnswerCThree").hide();
                    }
                    if (result.list[2].qoOptionD !== null) {
                        $("#LiAnswers4Three").html(result.list[2].qoOptionD);
                    } else {
                        $("#BtnConfirmAnswerDThree").hide();
                    }
                    //如果有图片
                    if (result.list[2].qoImage !== null) {
                        $("#qoimageThree").attr("src", result.list[2].qoImage)
                    }
                    //如果有视频
                    if (result.list[2].qoImage !== null) {
                        $("#qoimageThree").attr("src", result.list[2].qoImage)
                    }
                },
                error: function () {
                    $("#SpanQuestionId").html("");
                    $("#SpanQuestionTitle").html("");
                    alert("网络好像开了小差了呢~");
                }
            });
        }
        //如果是数字并且是最后
        else if(pageNo ==="首页"){
            $(this).siblings().removeClass("active");
            $(this).next().addClass("active");
            //清除CSS样式
            var DivThreeQuestion =$("#DivThreeQuestion");
            var DivTwoQuestion =$("#DivTwoQuestion");
            DivThreeQuestion.show();
            DivTwoQuestion.show();
            var SpanRightOrWrongTips = $("#SpanRightOrWrongTips");
            var QoRightAnswer = $("#QoRightAnswer");
            var qoDescription = $("#qoDescription");
            var DivAnswers = $("#DivAnswers");
            var LiAnswers1 = $("#LiAnswers1");
            var LiAnswers2 = $("#LiAnswers2");
            var LiAnswers3 = $("#LiAnswers3");
            var LiAnswers4 = $("#LiAnswers4");
            var qoimage = $("#qoimage");
            var SpanQuestionIdTwo = $("SpanQuestionIdTwo");
            var SpanQuestionTitleTwo =$("SpanQuestionTitleTwo");
            var SpanQuestionIdThree = $("SpanQuestionIdThree");
            var SpanQuestionTitleThree =$("SpanQuestionTitleThree");
            var SpanQuestionId = $("SpanQuestionId");
            var SpanQuestionTitle =$("SpanQuestionTitle");
            SpanQuestionIdTwo.html("");
            SpanQuestionTitleTwo.html("");
            SpanQuestionId.html("");
            SpanQuestionTitle.html("");
            SpanQuestionIdThree.html("");
            SpanQuestionTitleThree.html("");
            $("#BtnConfirmAnswerC").show();
            $("#BtnConfirmAnswerD").show();
            var SpanUserChoose = $("#SpanUserChoose");
            qoDescription.css("display", "none").val("");
            DivAnswers.css("visibility", "hidden");
            qoimage.attr("src", "");
            SpanUserChoose.removeClass("text-success text-danger").text("");
            QoRightAnswer.removeClass("text-success text-danger").css("font-weight", "normal").text("");
            SpanRightOrWrongTips.removeClass("text-success text-danger").css("font-weight", "normal").text("");
            LiAnswers1.removeClass("text-success text-danger").css("font-weight", "normal").text("");
            LiAnswers2.removeClass("text-success text-danger").css("font-weight", "normal").text("");
            LiAnswers3.removeClass("text-success text-danger").css("font-weight", "normal").text("");
            LiAnswers4.removeClass("text-success text-danger").css("font-weight", "normal").text("");

            SpanRightOrWrongTips = $("#SpanRightOrWrongTipsTwo");
            QoRightAnswer = $("#QoRightAnswerTwo");
            qoDescription = $("#qoDescriptionTwo");
            DivAnswers = $("#DivAnswersTwo");
            LiAnswers1 = $("#LiAnswers1Two");
            LiAnswers2 = $("#LiAnswers2Two");
            LiAnswers3 = $("#LiAnswers3Two");
            LiAnswers4 = $("#LiAnswers4Two");
            qoimage = $("#qoimageTwo");
            $("#BtnConfirmAnswerCTwo").show();
            $("#BtnConfirmAnswerDTwo").show();
            SpanUserChoose = $("#SpanUserChooseTwo");
            qoDescription.css("display", "none").val("");
            DivAnswers.css("visibility", "hidden");
            qoimage.attr("src", "");
            SpanUserChoose.removeClass("text-success text-danger").text("");
            QoRightAnswer.removeClass("text-success text-danger").css("font-weight", "normal").text("");
            SpanRightOrWrongTips.removeClass("text-success text-danger").css("font-weight", "normal").text("");
            LiAnswers1.removeClass("text-success text-danger").css("font-weight", "normal").text("");
            LiAnswers2.removeClass("text-success text-danger").css("font-weight", "normal").text("");
            LiAnswers3.removeClass("text-success text-danger").css("font-weight", "normal").text("");
            LiAnswers4.removeClass("text-success text-danger").css("font-weight", "normal").text("");


            SpanRightOrWrongTips = $("#SpanRightOrWrongTipsThree");
            QoRightAnswer = $("#QoRightAnswerThree");
            qoDescription = $("#qoDescriptionThree");
            DivAnswers = $("#DivAnswersThree");
            LiAnswers1 = $("#LiAnswers1Three");
            LiAnswers2 = $("#LiAnswers2Three");
            LiAnswers3 = $("#LiAnswers3Three");
            LiAnswers4 = $("#LiAnswers4Three");
            qoimage = $("#qoimageThree");
            $("#BtnConfirmAnswerCThree").show();
            $("#BtnConfirmAnswerDThree").show();
            SpanUserChoose = $("#SpanUserChooseThree");
            qoDescription.css("display", "none").val("");
            DivAnswers.css("visibility", "hidden");
            qoimage.attr("src", "");
            SpanUserChoose.removeClass("text-success text-danger").text("");
            QoRightAnswer.removeClass("text-success text-danger").css("font-weight", "normal").text("");
            SpanRightOrWrongTips.removeClass("text-success text-danger").css("font-weight", "normal").text("");
            LiAnswers1.removeClass("text-success text-danger").css("font-weight", "normal").text("");
            LiAnswers2.removeClass("text-success text-danger").css("font-weight", "normal").text("");
            LiAnswers3.removeClass("text-success text-danger").css("font-weight", "normal").text("");
            LiAnswers4.removeClass("text-success text-danger").css("font-weight", "normal").text("");
            $.ajax({
                type: "get",
                url: "/api/train/one/mistakes",
                dataType: 'json',
                data: {
                    pageSize: 3,
                    pageNo: 1
                },
                beforeSend: function (XMLHttpRequest) {
                    var Authorization = $.cookie('Authorization');
                    XMLHttpRequest.setRequestHeader("Authorization", Authorization);
                },
                success: function (result) {
                    // 生成导航页数量
                    var LiNavigationFirstWrongLists = $("#LiNavigationFirstWrongLists");
                    for (var i = result.pages; i >= 1; i--) {
                        // LiNavigationFirstWrongLists.after("<li><a class='liNavigation' data-target='button' href=\"\">" + i + "</a></li>");
                    }
                    var $textarea = $("#qoDescription");
                    var $textareaTwo = $("#qoDescriptionTwo");
                    var $textareaThree = $("#qoDescriptionThree");
                    pageNum = result.pageNum;
                    total = result.total;
                    pages = result.pages;
                    //第一道题
                    $("#SpanQuestionId").html(result.list[0].qoId + "：");
                    $("#SpanQuestionTitle").html(result.list[0].qoTitle);
                    $("#LiAnswers1").html(result.list[0].qoOptionA);
                    $("#LiAnswers2").html(result.list[0].qoOptionB);
                    $textarea.val(result.list[0].qoDescription);
                    var textareaValue = $textarea.val();
                    $textarea.val($(textareaValue).text());
                    $("#QoRightAnswer").html(result.list[0].qoAnswer);
                    $("#qoDifficulties").html(result.list[0].qoDifficultty);
                    if ((result.list[0].qoType === 'judge')) {
                        $("#qoType").html("判断题")
                    } else if ((result.list[0].qoType === 'single')) {
                        $("#qoType").html("单选题")
                    } else {
                        $("#qoType").html("多选题")
                    }
                    //如果有CD选项
                    if (result.list[0].qoOptionC !== null) {
                        $("#LiAnswers3").html(result.list[0].qoOptionC);
                    } else {
                        $("#BtnConfirmAnswerC").hide();
                    }
                    if (result.list[0].qoOptionD !== null) {
                        $("#LiAnswers4").html(result.list[0].qoOptionD);
                    } else {
                        $("#BtnConfirmAnswerD").hide();
                    }
                    //如果有图片
                    if (result.list[0].qoImage !== null) {
                        $("#qoimage").attr("src", result.list[0].qoImage)
                    }
                    //如果有视频
                    if (result.list[0].qoImage !== null) {
                        $("#qoimage").attr("src", result.list[0].qoImage)
                    }

                    //第二道题
                    $("#SpanQuestionIdTwo").html(result.list[1].qoId + "：");
                    $("#SpanQuestionTitleTwo").html(result.list[1].qoTitle);
                    $("#LiAnswers1Two").html(result.list[1].qoOptionA);
                    $("#LiAnswers2Two").html(result.list[1].qoOptionB);
                    $textareaTwo.val(result.list[1].qoDescription);
                    var textareaValue2 = $textareaTwo.val();
                    $textareaTwo.val($(textareaValue2).text());
                    $("#QoRightAnswerTwo").html(result.list[1].qoAnswer);
                    $("#qoDifficultiesTwo").html(result.list[1].qoDifficultty);
                    if ((result.list[1].qoType === 'judge')) {
                        $("#qoTypeTwo").html("判断题")
                    } else if ((result.list[1].qoType === 'single')) {
                        $("#qoTypeTwo").html("单选题")
                    } else {
                        $("#qoTypeTwo").html("多选题")
                    }
                    //如果有CD选项
                    if (result.list[1].qoOptionC !== null) {
                        $("#LiAnswers3Two").html(result.list[1].qoOptionC);
                    } else {
                        $("#BtnConfirmAnswerCTwo").hide();
                    }
                    if (result.list[1].qoOptionD !== null) {
                        $("#LiAnswers4Two").html(result.list[1].qoOptionD);
                    } else {
                        $("#BtnConfirmAnswerDTwo").hide();
                    }
                    //如果有图片
                    if (result.list[1].qoImage !== null) {
                        $("#qoimageTwo").attr("src", result.list[1].qoImage)
                    }
                    //如果有视频
                    if (result.list[1].qoImage !== null) {
                        $("#qoimageTwo").attr("src", result.list[1].qoImage)
                    }

                    //第三道题
                    $("#SpanQuestionIdThree").html(result.list[2].qoId + "：");
                    $("#SpanQuestionTitleThree").html(result.list[2].qoTitle);
                    $("#LiAnswers1Three").html(result.list[2].qoOptionA);
                    $("#LiAnswers2Three").html(result.list[2].qoOptionB);
                    $textareaThree.val(result.list[2].qoDescription);
                    var textareaValue3 = $textareaThree.val();
                    $textareaThree.val($(textareaValue3).text());
                    $("#QoRightAnswerThree").html(result.list[2].qoAnswer);
                    $("#qoDifficultiesThree").html(result.list[2].qoDifficultty);
                    if ((result.list[2].qoType === 'judge')) {
                        $("#qoTypeThree").html("判断题")
                    } else if ((result.list[2].qoType === 'single')) {
                        $("#qoTypeThree").html("单选题")
                    } else {
                        $("#qoTypeThree").html("多选题")
                    }
                    //如果有CD选项
                    if (result.list[2].qoOptionC !== null) {
                        $("#LiAnswers3Three").html(result.list[2].qoOptionC);
                    } else {
                        $("#BtnConfirmAnswerCThree").hide();
                    }
                    if (result.list[2].qoOptionD !== null) {
                        $("#LiAnswers4Three").html(result.list[2].qoOptionD);
                    } else {
                        $("#BtnConfirmAnswerDThree").hide();
                    }
                    //如果有图片
                    if (result.list[2].qoImage !== null) {
                        $("#qoimageThree").attr("src", result.list[2].qoImage)
                    }
                    //如果有视频
                    if (result.list[2].qoImage !== null) {
                        $("#qoimageThree").attr("src", result.list[2].qoImage)
                    }
                },
                error: function () {
                    $("#SpanQuestionId").html("");
                    $("#SpanQuestionTitle").html("");
                    alert("网络好像开了小差了呢~");
                }
            });
        }else {
            if(LastPageCount === 1 && pageNo !== "尾页"){
                alert($(this).text());
                console.log($(this).text());
                var DivThreeQuestion =$("#DivThreeQuestion");
                DivThreeQuestion.hide();
                $(this).siblings().removeClass("active");
                $(this).addClass("active");
                //清除CSS样式
                var SpanRightOrWrongTips = $("#SpanRightOrWrongTips");
                var QoRightAnswer = $("#QoRightAnswer");
                var qoDescription = $("#qoDescription");
                var DivAnswers = $("#DivAnswers");
                var LiAnswers1 = $("#LiAnswers1");
                var LiAnswers2 = $("#LiAnswers2");
                var LiAnswers3 = $("#LiAnswers3");
                var LiAnswers4 = $("#LiAnswers4");
                var qoimage = $("#qoimage");
                var SpanQuestionIdTwo = $("SpanQuestionIdTwo");
                var SpanQuestionTitleTwo =$("SpanQuestionTitleTwo");
                var SpanQuestionIdThree = $("SpanQuestionIdThree");
                var SpanQuestionTitleThree =$("SpanQuestionTitleThree");
                var SpanQuestionId = $("SpanQuestionId");
                var SpanQuestionTitle =$("SpanQuestionTitle");
                SpanQuestionIdTwo.html("");
                SpanQuestionTitleTwo.html("");
                SpanQuestionId.html("");
                SpanQuestionTitle.html("");
                SpanQuestionIdThree.html("");
                SpanQuestionTitleThree.html("");
                $("#BtnConfirmAnswerC").show();
                $("#BtnConfirmAnswerD").show();
                var SpanUserChoose = $("#SpanUserChoose");
                qoDescription.css("display", "none").val("");
                DivAnswers.css("visibility", "hidden");
                qoimage.attr("src", "");
                SpanUserChoose.removeClass("text-success text-danger").text("");
                QoRightAnswer.removeClass("text-success text-danger").css("font-weight", "normal").text("");
                SpanRightOrWrongTips.removeClass("text-success text-danger").css("font-weight", "normal").text("");
                LiAnswers1.removeClass("text-success text-danger").css("font-weight", "normal").text("");
                LiAnswers2.removeClass("text-success text-danger").css("font-weight", "normal").text("");
                LiAnswers3.removeClass("text-success text-danger").css("font-weight", "normal").text("");
                LiAnswers4.removeClass("text-success text-danger").css("font-weight", "normal").text("");

                SpanRightOrWrongTips = $("#SpanRightOrWrongTipsTwo");
                QoRightAnswer = $("#QoRightAnswerTwo");
                qoDescription = $("#qoDescriptionTwo");
                DivAnswers = $("#DivAnswersTwo");
                LiAnswers1 = $("#LiAnswers1Two");
                LiAnswers2 = $("#LiAnswers2Two");
                LiAnswers3 = $("#LiAnswers3Two");
                LiAnswers4 = $("#LiAnswers4Two");
                qoimage = $("#qoimageTwo");
                $("#BtnConfirmAnswerCTwo").show();
                $("#BtnConfirmAnswerDTwo").show();
                SpanUserChoose = $("#SpanUserChooseTwo");
                qoDescription.css("display", "none").val("");
                DivAnswers.css("visibility", "hidden");
                qoimage.attr("src", "");
                SpanUserChoose.removeClass("text-success text-danger").text("");
                QoRightAnswer.removeClass("text-success text-danger").css("font-weight", "normal").text("");
                SpanRightOrWrongTips.removeClass("text-success text-danger").css("font-weight", "normal").text("");
                LiAnswers1.removeClass("text-success text-danger").css("font-weight", "normal").text("");
                LiAnswers2.removeClass("text-success text-danger").css("font-weight", "normal").text("");
                LiAnswers3.removeClass("text-success text-danger").css("font-weight", "normal").text("");
                LiAnswers4.removeClass("text-success text-danger").css("font-weight", "normal").text("");


                SpanRightOrWrongTips = $("#SpanRightOrWrongTipsThree");
                QoRightAnswer = $("#QoRightAnswerThree");
                qoDescription = $("#qoDescriptionThree");
                DivAnswers = $("#DivAnswersThree");
                LiAnswers1 = $("#LiAnswers1Three");
                LiAnswers2 = $("#LiAnswers2Three");
                LiAnswers3 = $("#LiAnswers3Three");
                LiAnswers4 = $("#LiAnswers4Three");
                qoimage = $("#qoimageThree");
                $("#BtnConfirmAnswerCThree").show();
                $("#BtnConfirmAnswerDThree").show();
                SpanUserChoose = $("#SpanUserChooseThree");
                qoDescription.css("display", "none").val("");
                DivAnswers.css("visibility", "hidden");
                qoimage.attr("src", "");
                SpanUserChoose.removeClass("text-success text-danger").text("");
                QoRightAnswer.removeClass("text-success text-danger").css("font-weight", "normal").text("");
                SpanRightOrWrongTips.removeClass("text-success text-danger").css("font-weight", "normal").text("");
                LiAnswers1.removeClass("text-success text-danger").css("font-weight", "normal").text("");
                LiAnswers2.removeClass("text-success text-danger").css("font-weight", "normal").text("");
                LiAnswers3.removeClass("text-success text-danger").css("font-weight", "normal").text("");
                LiAnswers4.removeClass("text-success text-danger").css("font-weight", "normal").text("");
                $.ajax({
                    type: "get",
                    url: "/api/train/one/mistakes",
                    dataType: 'json',
                    data: {
                        pageSize: 3,
                        pageNo: pages
                    },
                    beforeSend: function (XMLHttpRequest) {
                        var Authorization = $.cookie('Authorization');
                        XMLHttpRequest.setRequestHeader("Authorization", Authorization);
                    },
                    success: function (result) {
                        // 生成导航页数量
                        var LiNavigationFirstWrongLists = $("#LiNavigationFirstWrongLists");
                        for (var i = result.pages; i >= 1; i--) {
                            // LiNavigationFirstWrongLists.after("<li><a class='liNavigation' data-target='button' href=\"\">" + i + "</a></li>");
                        }
                        var $textarea = $("#qoDescription");
                        var $textareaTwo = $("#qoDescriptionTwo");
                        var $textareaThree = $("#qoDescriptionThree");
                        pageNum = result.pageNum;
                        total = result.total;
                        pages = result.pages;
                        //第一道题
                        $("#SpanQuestionId").html(result.list[0].qoId + "：");
                        $("#SpanQuestionTitle").html(result.list[0].qoTitle);
                        $("#LiAnswers1").html(result.list[0].qoOptionA);
                        $("#LiAnswers2").html(result.list[0].qoOptionB);
                        $textarea.val(result.list[0].qoDescription);
                        var textareaValue = $textarea.val();
                        $textarea.val($(textareaValue).text());
                        $("#QoRightAnswer").html(result.list[0].qoAnswer);
                        $("#qoDifficulties").html(result.list[0].qoDifficultty);
                        if ((result.list[0].qoType === 'judge')) {
                            $("#qoType").html("判断题")
                        } else if ((result.list[0].qoType === 'single')) {
                            $("#qoType").html("单选题")
                        } else {
                            $("#qoType").html("多选题")
                        }
                        //如果有CD选项
                        if (result.list[0].qoOptionC !== null) {
                            $("#LiAnswers3").html(result.list[0].qoOptionC);
                        } else {
                            $("#BtnConfirmAnswerC").hide();
                        }
                        if (result.list[0].qoOptionD !== null) {
                            $("#LiAnswers4").html(result.list[0].qoOptionD);
                        } else {
                            $("#BtnConfirmAnswerD").hide();
                        }
                        //如果有图片
                        if (result.list[0].qoImage !== null) {
                            $("#qoimage").attr("src", result.list[0].qoImage)
                        }
                        //如果有视频
                        if (result.list[0].qoImage !== null) {
                            $("#qoimage").attr("src", result.list[0].qoImage)
                        }

                        //第二道题
                        $("#SpanQuestionIdTwo").html(result.list[1].qoId + "：");
                        $("#SpanQuestionTitleTwo").html(result.list[1].qoTitle);
                        $("#LiAnswers1Two").html(result.list[1].qoOptionA);
                        $("#LiAnswers2Two").html(result.list[1].qoOptionB);
                        $textareaTwo.val(result.list[1].qoDescription);
                        var textareaValue2 = $textareaTwo.val();
                        $textareaTwo.val($(textareaValue2).text());
                        $("#QoRightAnswerTwo").html(result.list[1].qoAnswer);
                        $("#qoDifficultiesTwo").html(result.list[1].qoDifficultty);
                        if ((result.list[1].qoType === 'judge')) {
                            $("#qoTypeTwo").html("判断题")
                        } else if ((result.list[1].qoType === 'single')) {
                            $("#qoTypeTwo").html("单选题")
                        } else {
                            $("#qoTypeTwo").html("多选题")
                        }
                        //如果有CD选项
                        if (result.list[1].qoOptionC !== null) {
                            $("#LiAnswers3Two").html(result.list[1].qoOptionC);
                        } else {
                            $("#BtnConfirmAnswerCTwo").hide();
                        }
                        if (result.list[1].qoOptionD !== null) {
                            $("#LiAnswers4Two").html(result.list[1].qoOptionD);
                        } else {
                            $("#BtnConfirmAnswerDTwo").hide();
                        }
                        //如果有图片
                        if (result.list[1].qoImage !== null) {
                            $("#qoimageTwo").attr("src", result.list[1].qoImage)
                        }
                        //如果有视频
                        if (result.list[1].qoImage !== null) {
                            $("#qoimageTwo").attr("src", result.list[1].qoImage)
                        }
                    },
                    error: function () {
                        $("#SpanQuestionId").html("");
                        $("#SpanQuestionTitle").html("");
                        alert("网络好像开了小差了呢~");
                    }
                });
            }
            else{
                var DivThreeQuestion =$("#DivThreeQuestion");
                DivThreeQuestion.hide();
                var DivTwoQuestion =$("#DivTwoQuestion");
                DivThreeQuestion.hide();
                $(this).siblings().removeClass("active");
                $(this).prev().addClass("active");
                //清除CSS样式
                var SpanRightOrWrongTips = $("#SpanRightOrWrongTips");
                var QoRightAnswer = $("#QoRightAnswer");
                var qoDescription = $("#qoDescription");
                var DivAnswers = $("#DivAnswers");
                var LiAnswers1 = $("#LiAnswers1");
                var LiAnswers2 = $("#LiAnswers2");
                var LiAnswers3 = $("#LiAnswers3");
                var LiAnswers4 = $("#LiAnswers4");
                var qoimage = $("#qoimage");
                var SpanQuestionIdTwo = $("SpanQuestionIdTwo");
                var SpanQuestionTitleTwo =$("SpanQuestionTitleTwo");
                var SpanQuestionIdThree = $("SpanQuestionIdThree");
                var SpanQuestionTitleThree =$("SpanQuestionTitleThree");
                var SpanQuestionId = $("SpanQuestionId");
                var SpanQuestionTitle =$("SpanQuestionTitle");
                SpanQuestionIdTwo.html("");
                SpanQuestionTitleTwo.html("");
                SpanQuestionId.html("");
                SpanQuestionTitle.html("");
                SpanQuestionIdThree.html("");
                SpanQuestionTitleThree.html("");
                $("#BtnConfirmAnswerC").show();
                $("#BtnConfirmAnswerD").show();
                var SpanUserChoose = $("#SpanUserChoose");
                qoDescription.css("display", "none").val("");
                DivAnswers.css("visibility", "hidden");
                qoimage.attr("src", "");
                SpanUserChoose.removeClass("text-success text-danger").text("");
                QoRightAnswer.removeClass("text-success text-danger").css("font-weight", "normal").text("");
                SpanRightOrWrongTips.removeClass("text-success text-danger").css("font-weight", "normal").text("");
                LiAnswers1.removeClass("text-success text-danger").css("font-weight", "normal").text("");
                LiAnswers2.removeClass("text-success text-danger").css("font-weight", "normal").text("");
                LiAnswers3.removeClass("text-success text-danger").css("font-weight", "normal").text("");
                LiAnswers4.removeClass("text-success text-danger").css("font-weight", "normal").text("");

                SpanRightOrWrongTips = $("#SpanRightOrWrongTipsTwo");
                QoRightAnswer = $("#QoRightAnswerTwo");
                qoDescription = $("#qoDescriptionTwo");
                DivAnswers = $("#DivAnswersTwo");
                LiAnswers1 = $("#LiAnswers1Two");
                LiAnswers2 = $("#LiAnswers2Two");
                LiAnswers3 = $("#LiAnswers3Two");
                LiAnswers4 = $("#LiAnswers4Two");
                qoimage = $("#qoimageTwo");
                $("#BtnConfirmAnswerCTwo").show();
                $("#BtnConfirmAnswerDTwo").show();
                SpanUserChoose = $("#SpanUserChooseTwo");
                qoDescription.css("display", "none").val("");
                DivAnswers.css("visibility", "hidden");
                qoimage.attr("src", "");
                SpanUserChoose.removeClass("text-success text-danger").text("");
                QoRightAnswer.removeClass("text-success text-danger").css("font-weight", "normal").text("");
                SpanRightOrWrongTips.removeClass("text-success text-danger").css("font-weight", "normal").text("");
                LiAnswers1.removeClass("text-success text-danger").css("font-weight", "normal").text("");
                LiAnswers2.removeClass("text-success text-danger").css("font-weight", "normal").text("");
                LiAnswers3.removeClass("text-success text-danger").css("font-weight", "normal").text("");
                LiAnswers4.removeClass("text-success text-danger").css("font-weight", "normal").text("");


                SpanRightOrWrongTips = $("#SpanRightOrWrongTipsThree");
                QoRightAnswer = $("#QoRightAnswerThree");
                qoDescription = $("#qoDescriptionThree");
                DivAnswers = $("#DivAnswersThree");
                LiAnswers1 = $("#LiAnswers1Three");
                LiAnswers2 = $("#LiAnswers2Three");
                LiAnswers3 = $("#LiAnswers3Three");
                LiAnswers4 = $("#LiAnswers4Three");
                qoimage = $("#qoimageThree");
                $("#BtnConfirmAnswerCThree").show();
                $("#BtnConfirmAnswerDThree").show();
                SpanUserChoose = $("#SpanUserChooseThree");
                qoDescription.css("display", "none").val("");
                DivAnswers.css("visibility", "hidden");
                qoimage.attr("src", "");
                SpanUserChoose.removeClass("text-success text-danger").text("");
                QoRightAnswer.removeClass("text-success text-danger").css("font-weight", "normal").text("");
                SpanRightOrWrongTips.removeClass("text-success text-danger").css("font-weight", "normal").text("");
                LiAnswers1.removeClass("text-success text-danger").css("font-weight", "normal").text("");
                LiAnswers2.removeClass("text-success text-danger").css("font-weight", "normal").text("");
                LiAnswers3.removeClass("text-success text-danger").css("font-weight", "normal").text("");
                LiAnswers4.removeClass("text-success text-danger").css("font-weight", "normal").text("");
                $.ajax({
                    type: "get",
                    url: "/api/train/one/mistakes",
                    dataType: 'json',
                    data: {
                        pageSize: 3,
                        pageNo: pages
                    },
                    beforeSend: function (XMLHttpRequest) {
                        var Authorization = $.cookie('Authorization');
                        XMLHttpRequest.setRequestHeader("Authorization", Authorization);
                    },
                    success: function (result) {
                        // 生成导航页数量
                        var LiNavigationFirstWrongLists = $("#LiNavigationFirstWrongLists");
                        for (var i = result.pages; i >= 1; i--) {
                            // LiNavigationFirstWrongLists.after("<li><a class='liNavigation' data-target='button' href=\"\">" + i + "</a></li>");
                        }
                        var $textarea = $("#qoDescription");
                        var $textareaTwo = $("#qoDescriptionTwo");
                        var $textareaThree = $("#qoDescriptionThree");
                        pageNum = result.pageNum;
                        total = result.total;
                        pages = result.pages;
                        //第一道题
                        $("#SpanQuestionId").html(result.list[0].qoId + "：");
                        $("#SpanQuestionTitle").html(result.list[0].qoTitle);
                        $("#LiAnswers1").html(result.list[0].qoOptionA);
                        $("#LiAnswers2").html(result.list[0].qoOptionB);
                        $textarea.val(result.list[0].qoDescription);
                        var textareaValue = $textarea.val();
                        $textarea.val($(textareaValue).text());
                        $("#QoRightAnswer").html(result.list[0].qoAnswer);
                        $("#qoDifficulties").html(result.list[0].qoDifficultty);
                        if ((result.list[0].qoType === 'judge')) {
                            $("#qoType").html("判断题")
                        } else if ((result.list[0].qoType === 'single')) {
                            $("#qoType").html("单选题")
                        } else {
                            $("#qoType").html("多选题")
                        }
                        //如果有CD选项
                        if (result.list[0].qoOptionC !== null) {
                            $("#LiAnswers3").html(result.list[0].qoOptionC);
                        } else {
                            $("#BtnConfirmAnswerC").hide();
                        }
                        if (result.list[0].qoOptionD !== null) {
                            $("#LiAnswers4").html(result.list[0].qoOptionD);
                        } else {
                            $("#BtnConfirmAnswerD").hide();
                        }
                        //如果有图片
                        if (result.list[0].qoImage !== null) {
                            $("#qoimage").attr("src", result.list[0].qoImage)
                        }
                        //如果有视频
                        if (result.list[0].qoImage !== null) {
                            $("#qoimage").attr("src", result.list[0].qoImage)
                        }
                    },
                    error: function () {
                        $("#SpanQuestionId").html("");
                        $("#SpanQuestionTitle").html("");
                        alert("网络好像开了小差了呢~");
                    }
                });
            }
        }
    })
    //第一题删除
    $("#BtnRemoveOne").click(function () {
        var CurrentQuestionId = $("#SpanQuestionId").text();
        //清除数字后面的冒号
        CurrentQuestionId = CurrentQuestionId.substring(0,CurrentQuestionId.length-1);
        $.ajax({
            type:"post",
            url:"/api/train/one/deleteMistake",
            dataType:'json',
            data:{
                id:CurrentQuestionId,
            },
            beforeSend: function (XMLHttpRequest) {
                var Authorization = $.cookie('Authorization');
                XMLHttpRequest.setRequestHeader("Authorization", Authorization);
            },
            success:function (result) {
                alert("删除成功");
                window.location.href="../subjectOne/wrongList";
            },
            error:function () {
                alert("网络好像开了小差了呢~删除没有成功呢");
            }
        });
    })
    //第二题删除
    $("#BtnRemoveTwo").click(function () {
        var CurrentQuestionId = $("#SpanQuestionIdTwo").text();
        //清除数字后面的冒号
        CurrentQuestionId = CurrentQuestionId.substring(0,CurrentQuestionId.length-1);
        $.ajax({
            type:"post",
            url:"/api/train/one/deleteMistake",
            dataType:'json',
            data:{
                id:CurrentQuestionId,
            },
            beforeSend: function (XMLHttpRequest) {
                var Authorization = $.cookie('Authorization');
                XMLHttpRequest.setRequestHeader("Authorization", Authorization);
            },
            success:function (result) {
                alert("删除成功");
                window.location.href="../subjectOne/wrongList";
            },
            error:function () {
                alert("网络好像开了小差了呢~删除没有成功呢");
            }
        });
    })
    //第三题删除
    $("#BtnRemoveThree").click(function () {
        var CurrentQuestionId = $("#SpanQuestionIdThree").text();
        //清除数字后面的冒号
        CurrentQuestionId = CurrentQuestionId.substring(0,CurrentQuestionId.length-1);
        $.ajax({
            type:"post",
            url:"/api/train/one/deleteMistake",
            dataType:'json',
            data:{
                id:CurrentQuestionId,
            },
            beforeSend: function (XMLHttpRequest) {
                var Authorization = $.cookie('Authorization');
                XMLHttpRequest.setRequestHeader("Authorization", Authorization);
            },
            success:function (result) {
                alert("删除成功");
                window.location.href="../subjectOne/wrongList";
            },
            error:function () {
                alert("网络好像开了小差了呢~删除没有成功呢");
            }
        });
    })



});