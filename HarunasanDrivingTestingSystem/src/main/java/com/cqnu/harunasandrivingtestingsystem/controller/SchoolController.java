package com.cqnu.harunasandrivingtestingsystem.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author LiAixing
 * @version 1.0
 * @className SchoolController
 * @description TODO
 * @date 2019/3/14 3:10
 **/
@RestController
@RequestMapping("/api/school")
public class SchoolController {


    @PostMapping("/login")
    public String login(){

        return null;

    }



}
