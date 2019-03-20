package com.cqnu.harunasandrivingtestingsystem.controller;

import com.cqnu.harunasandrivingtestingsystem.entity.QuestionsOne;
import com.cqnu.harunasandrivingtestingsystem.service.IQuestionsService;
import com.cqnu.harunasandrivingtestingsystem.service.impl.QuestionsOneServiceImpl;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @author LiAixing
 * @version 1.0
 * @className TrainController
 * @description TODO
 * @date 2019/3/15 1:19
 **/

@RestController
@RequestMapping("/api/train")
public class TrainController {

    @Resource
    private QuestionsOneServiceImpl questionsOneService;

    @GetMapping("/random")
    public QuestionsOne randomTrain(){
        return questionsOneService.randomTrain();
    }

    @GetMapping("/order")
    public QuestionsOne orderTrain(int id) {  return questionsOneService.orderTrain(id);}

    @PostMapping("/judge")
    public void judge(int id, String answer){

    }

}
