package com.cqnu.harunasandrivingtestingsystem.examination.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.boot.SpringApplication;
import java.util.Map;


@Controller
public class testcontroller {

    @RequestMapping(value = "/index")
    public String hello(Map<String, Object> map){
        map.put("hello","Hello thymeleaf");
        map.put("message","这是一条信息");
        return "success";
    }


}
