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

    @RequestMapping(value = "/register")
    public String register(Map<String, Object> map){
        return "register";
    }

    @RequestMapping(value = "/registerUser")
    public String user(Map<String, Object> map){

        return "registerUser";
    }

    @RequestMapping(value = "/registerSchool")
    public String rgisterSchool(Map<String, Object> map){
        return "registerSchool";
    }

    @RequestMapping(value = "/information")
    public String information(Map<String, Object> map){
        return "drivingTestInformation";
    }

    @RequestMapping(value = "/school")
    public String schoolCommend(Map<String, Object> map){
        return "schoolCommend";
    }

    @RequestMapping(value = "/schoolDetails")
    public String schoolDetails(Map<String, Object> map){
        return "schoolDetails";
    }

}
