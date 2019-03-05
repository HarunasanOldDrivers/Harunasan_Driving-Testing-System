
$(document).ready(function () {

    var NavSideNav = $(".nav-side-nav");
    //侧边导航栏js
    NavSideNav.children("li").children("a").click(function () {
        $(this).parent("li").parent("ul").children("li").children("a").css("background","#2aabd2");
        $(this).css("background","#ff3669");
    })

    function setSideNavBg1() {
        NavSideNav.children("li").children("a").css("background","#2aabd2");
        NavSideNav.children(":nth-child(1)").children("a").css("background","#ff3669");
    }

    function setSideNavBg2() {
        NavSideNav.children("li").children("a").css("background","#2aabd2");
        NavSideNav.children(":nth-child(2)").children("a").css("background","#ff3669");
    }

    function setSideNavBg3() {
        NavSideNav.children("li").children("a").css("background","#2aabd2");
        NavSideNav.children(":nth-child(3)").children("a").css("background","#ff3669");
    }

    function setSideNavBg4() {
        NavSideNav.children("li").children("a").css("background","#2aabd2");
        NavSideNav.children(":nth-child(4)").children("a").css("background","#ff3669");
    }

    //使用windows滚动条监听，改变导航颜色
    window.onscroll = function(){
        var t = document.documentElement.scrollTop || document.body.scrollTop;  //获取距离页面顶部的距离

        if( t <= 375 ) { //当距离顶部超过750px时
            setSideNavBg1();
        } else if (t >= 375 && t <= 1125){
            setSideNavBg2();
        } else if( t >= 1125 && t <=1850){
            setSideNavBg3();
        } else if ( t >= 1850){
            setSideNavBg4();
        }else{

        }
    }


})
