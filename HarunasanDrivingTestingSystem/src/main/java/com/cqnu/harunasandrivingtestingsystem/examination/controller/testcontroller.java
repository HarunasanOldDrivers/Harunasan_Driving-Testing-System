package com.cqnu.harunasandrivingtestingsystem.examination.controller;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.boot.SpringApplication;


@Controller
@EnableAutoConfiguration(exclude = DataSourceAutoConfiguration.class)
public class testcontroller {

    @RequestMapping("/")
    @ResponseBody
    String home(){
        return "Hello Worl1231323d!";
    }
    public static void main(String[] args) throws Exception {
        SpringApplication.run(testcontroller.class, args);
    }

}
