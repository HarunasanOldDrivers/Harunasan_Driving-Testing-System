package com.cqnu.harunasandrivingtestingsystem.index.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.boot.SpringApplication;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Controller
public class IndexController {

    @RequestMapping(value = "/index")
    public String hello(Map<String, Object> map){
        return "main";
    }

    @RequestMapping(value = "/nav")
    public String nav(Map<String, Object> map){
        return "nav";
    }

    @RequestMapping( value =  "/register")
    public String register(Map<String, Object> map){
        return "register";
    }

    @RequestMapping(value = "/register/user")
    public String user(Map<String, Object> map){

        return "registerUser";
    }

    @RequestMapping(value = "/register/school")
    public String school(Map<String, Object> map){
        return "registerSchool";
    }



}
