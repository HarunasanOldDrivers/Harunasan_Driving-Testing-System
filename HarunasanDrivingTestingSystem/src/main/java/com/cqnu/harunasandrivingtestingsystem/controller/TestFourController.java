package com.cqnu.harunasandrivingtestingsystem.controller;

import com.alibaba.fastjson.JSONArray;
import com.cqnu.harunasandrivingtestingsystem.entity.QuestionsFour;
import com.cqnu.harunasandrivingtestingsystem.entity.QuestionsOne;
import com.cqnu.harunasandrivingtestingsystem.entity.Result;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.WrongQuestion;
import com.cqnu.harunasandrivingtestingsystem.security.JwtTokenUtil;
import com.cqnu.harunasandrivingtestingsystem.service.impl.QuestionsFourServiceImpl;
import com.cqnu.harunasandrivingtestingsystem.utils.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @author LiAixing
 * @version 1.0
 * @className TestController
 * @description TODO
 * @date 2019/3/14 3:11
 **/
@RestController
@RequestMapping("/api/test/four")
public class TestFourController {


    @Resource
    private QuestionsFourServiceImpl questionsService;

    /**
     * http请求
     */
    @Autowired
    private HttpServletRequest request;

    /**
     * json web token 在请求头的名字
     */
    @Value("${jwt.header}")
    private String tokenHeader;

    /**
     * 辅助操作 token 的工具类
     */
    @Autowired
    private JwtTokenUtil tokenUtils;

    /**
     * 获取试卷
     * @return
     */
    @GetMapping("/getPaper")
    public List<QuestionsFour> getPaper(){
        return questionsService.getPaper();
    }

    /**
     * 批量插入错题集
     * @param ids  错题List (json数组)
     * @return  code: 200 成功
     *          code: 510 未登录
     */
    @PreAuthorize("hasRole('User')")
    @PostMapping("/addMultiMistake")
    public Result addMultiMistake(@RequestBody String ids){
        String authToken = request.getHeader(this.tokenHeader);
        String username = this.tokenUtils.getUsernameFromToken(authToken);
        if (StringUtils.isEmpty(authToken) || StringUtils.isEmpty(username)){
            return ResultUtil.failure(510,"未登录");
        }
        JSONArray arrays = JSONArray.parseArray(ids.toString().trim());
        for (int i = 0; i < arrays.size(); i++){
            questionsService.addMistake(Integer.valueOf(username), Integer.valueOf(arrays.getJSONObject(i).getString("id")));
        }
        return ResultUtil.success();
    }



}
