$(document).ready(function () {
    $("#nav").load("../nav",function () {
        // 在载入完成之后改变状态
        $("#mainpage").removeClass("active");
        $("#subjectOne").addClass("active");
    });
    var text;

    //点击开始考试按钮进行考试计时
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
    })

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
            text = $("#remainTime").html( minute + "分" + second + "秒");
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

    //生成100个题目Button
    function createQuestionsList(){
        var UlQuestions = $("#UlQuestions");
        for (let i = 1 ; i <= 100 ; i++){
            var singleQuestion = $("<a href=\"javascript:void();\" class=\"LiSingleQuestion\"></a>");
            singleQuestion.append(i);
            UlQuestions.append(singleQuestion);
        }
    }


})