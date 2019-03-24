package com.cqnu.harunasandrivingtestingsystem.controller;

import com.cqnu.harunasandrivingtestingsystem.entity.QuestionsOne;
import com.cqnu.harunasandrivingtestingsystem.service.impl.QuestionsOneServiceImpl;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author LiAixing
 * @version 1.0
 * @className TestController
 * @description TODO
 * @date 2019/3/14 3:11
 **/
@RestController
@RequestMapping("/api/test/one")
public class TestOneController {

    @Resource
    private QuestionsOneServiceImpl questionsOneService;

    @GetMapping("/getPaper")
    public List<QuestionsOne> getPaper(){
        return questionsOneService.getPaper();
    }


}
