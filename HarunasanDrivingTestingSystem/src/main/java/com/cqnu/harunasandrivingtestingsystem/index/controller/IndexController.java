package com.cqnu.harunasandrivingtestingsystem.index.controller;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class IndexController {

    @RequestMapping(value = "/index")
    public String hello(){
        return "main";
    }

    @RequestMapping(value = "/nav")
    public String nav(){
        return "nav";
    }

    @RequestMapping( value =  "/register")
    public String register(){
        return "register";
    }

    @RequestMapping(value = "/register/user")
    public String user(){ return "registerUser"; }

    @RequestMapping(value = "/register/school")
    public String school(){
        return "registerSchool";
    }

    @RequestMapping(value = "/subjectOne")
    public String subjectOneMain(){
        return "subjectOneMain";
    }

    @RequestMapping(value = "/subjectOne/test")
    public String subjectOneTest(){
        return "subjectOneTest";
    }

    @RequestMapping(value = "/subjectOne/practice")
    public String subjectOnepractice(Model model, @RequestParam(value = "chapter",required = true) String chapter ){
        model.addAttribute("chapter",chapter);
        return "subjectPractice";
    }

    @RequestMapping(value = "/subjectOne/wrongList")
    public String subjectOnewrongList(){
        return "subjectOneWrongList";
    }

    @RequestMapping(value = "/subjectFour")
    public String subjectFourMain(){
        return "subjectFourMain";
    }
    @RequestMapping(value = "/subjectFour/practice")
    public String subjectFourPractice(Model model, @RequestParam(value = "chapter",required = true) String chapter ){
        model.addAttribute("chapter",chapter);
        return "subjectFourPractice";}
    @RequestMapping(value = "/subjectFour/wrongList")
    public String subjectFourwrongList(){
        return "subjectFourWrongList";
    }
    @RequestMapping(value = "/subjectFour/test")
    public String subjectFourTest(){
        return "subjectFourTest";
    }

    @RequestMapping(value = "/school/profile")
    public String schoolProfile(){ return "mySchoolBaseInfo";}

    @RequestMapping(value = "/school/classes")
    public String schoolClasses(){ return "mySchoolEdit";}

    @RequestMapping(value = "/school/student")
    public String schoolStudent(){ return "mySchoolSelectStudent";}

    @RequestMapping(value = "/user/profile")
    public String NormalUser(){ return "userBaseInfo";}

    @RequestMapping(value = "/user/enroll")
    public String userEnroll(){ return "userEnrollClasses";}

    @RequestMapping(value = "/schoolCommend")
    public String schoolCommend(){ return "schoolCommend";}

    @RequestMapping(value = "/information")
    public String studyInfoList(){ return "studyInfoList";}

    @RequestMapping(value = "/information/article")
    public String informationarticle(){ return "Article";}
}
