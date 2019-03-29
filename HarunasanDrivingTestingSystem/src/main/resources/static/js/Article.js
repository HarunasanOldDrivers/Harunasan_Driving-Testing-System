$(document).ready(function () {
    var newsid = getQueryString('newsid');
    let editor;
    var s;

    $.ajax({
        type:"get",
        url:"/api/news/article/"+newsid,
        dataType:"json",
        success:function (result) {
            $("#text_title").html(result.data.newsTitle);
            $("#newsAuthor").html("作者：" + result.data.newsAuthor);
            $("#ArticleTime").html("发布时间：" + result.data.newsEditTime.substring(0,10) + "&nbsp;" + result.data.newsEditTime.substring(12,20));
            $("#schoolIntroductionEditor").html(result.data.newsConten);
            $("#edtitor").html(result.data.newsContent);
            $("#PschoolIntroduction").html(result.data.newsContent);
        },
        error:function () {
            alert("Ajax出了点错呢");
            alert("与服务器似乎断开链接，请检查您的网络");
        }
    });
    $("#PschoolIntroduction").html("pnews");
    ClassicEditor
        .create( document.querySelector( '#editor' )
        )
        .then( newEditor => {
            editor = newEditor;
        } )
        .catch( error => {
            console.error( error );
        } );
    document.querySelector( '#btnConfirm' ).addEventListener( 'click', () => {
        const editorData = editor1.getData();
        alert(editorData);
        $("#schoolIntroductionEditor").css("display","none");
        $("#pnews").html(editor.getData());
        // window.location.href="/information/article?newsid="+newsid;
        // ...
    } );
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if ( r != null ){
            return unescape(r[2]);
        }else{
            return null;
        }
    }
})