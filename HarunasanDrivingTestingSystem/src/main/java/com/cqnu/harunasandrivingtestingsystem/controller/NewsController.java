package com.cqnu.harunasandrivingtestingsystem.controller;

import com.cqnu.harunasandrivingtestingsystem.entity.School;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.PageInfo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author LiAixing
 * @version 1.0
 * @className NewsController
 * @description TODO
 * @date 2019/3/23 4:03
 **/
@RestController
@RequestMapping("/api/news")
public class NewsController {

    @GetMapping("/search")
    public PageInfo<School> search(@RequestParam(defaultValue = "1") int pageNo, @RequestParam(defaultValue = "5") int pageSize,
                                   String schoolName, String area, String price){

        return null;
    }


}
