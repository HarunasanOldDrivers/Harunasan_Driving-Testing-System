package com.cqnu.harunasandrivingtestingsystem.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.alibaba.fastjson.support.config.FastJsonConfig;
import com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter;
import com.cqnu.harunasandrivingtestingsystem.entity.QuestionsOne;
import com.cqnu.harunasandrivingtestingsystem.entity.Result;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.WrongQuestion;
import com.cqnu.harunasandrivingtestingsystem.security.JwtTokenUtil;
import com.cqnu.harunasandrivingtestingsystem.service.impl.QuestionsOneServiceImpl;
import com.cqnu.harunasandrivingtestingsystem.utils.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.http.HttpMessageConverters;
import org.springframework.context.annotation.Bean;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

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


//    @Bean
//    public HttpMessageConverters fastJsonHttpMessageConverters() {
//        FastJsonHttpMessageConverter fastConverter = new FastJsonHttpMessageConverter();
//        FastJsonConfig fastJsonConfig = new FastJsonConfig();
//        fastJsonConfig.setSerializerFeatures(SerializerFeature.PrettyFormat);
//        fastConverter.setFastJsonConfig(fastJsonConfig);
//        HttpMessageConverter<?> converter = fastConverter;
//        return new HttpMessageConverters(converter);
//    }


    @Resource
    private QuestionsOneServiceImpl questionsService;

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
    public List<QuestionsOne> getPaper(){
        return questionsService.getPaper();
    }

    /**
     * 批量插入错题集
     * @param ids  错题List (json数组)  example [{"id":10},{"id":999}]
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
