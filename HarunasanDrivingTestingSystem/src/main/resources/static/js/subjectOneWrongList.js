$(document).ready(function () {
    // 页面初始化
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
})