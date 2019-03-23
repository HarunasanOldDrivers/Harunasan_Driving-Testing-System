package com.cqnu.harunasandrivingtestingsystem.controller;

import com.cqnu.harunasandrivingtestingsystem.entity.Result;
import com.cqnu.harunasandrivingtestingsystem.entity.School;
import com.cqnu.harunasandrivingtestingsystem.service.impl.SchoolServiceImpl;
import com.cqnu.harunasandrivingtestingsystem.utils.ResultUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

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

    private Logger logger = LoggerFactory.getLogger(SchoolController.class);

    @Resource
    private SchoolServiceImpl schoolService;

    @PostMapping("/login")
    public String login(){

        return null;
    }

    @PostMapping("/signUp")
    public Result signUp(String email, String schoolName, String password, String enrollTelephone, String verifyCode,
                         String companyName, String corporateName, String corporateTelephone, String socialCreditCode, Date startDate,
                         String district, String detailLocation,@RequestParam("image") MultipartFile[] files){

        if (StringUtils.isEmpty(email) || StringUtils.isEmpty(schoolName) || StringUtils.isEmpty(password) || StringUtils.isEmpty(enrollTelephone) ||
            StringUtils.isEmpty(verifyCode) || StringUtils.isEmpty(companyName) || StringUtils.isEmpty(corporateName) ||
            StringUtils.isEmpty(corporateTelephone) ||
            StringUtils.isEmpty(socialCreditCode) || startDate == null || StringUtils.isEmpty(district) || StringUtils.isEmpty(detailLocation) ||
            files.length == 0){
            logger.error("email: " + email + " schoolName: " + schoolName + " password: " + password + "enrollTelephone: " + enrollTelephone
                            + " verifyCode: " + verifyCode + " companyName: " + companyName + " corporateName: " + corporateName
                            + " corporateTelephone: " + corporateTelephone
                            + " socialCreditCode: " + socialCreditCode + " startDate: " + startDate + " district: " + district
                            + " detailLocation: " + detailLocation + " files: " + files);
            return ResultUtil.failure(600,"参数错误");
        }
        if (files.length != 3){
            return ResultUtil.failure(600,"文件上传失败");
        }
        List<String> filesList = schoolService.uploadImage(files);

        if(schoolService.signUp(email,schoolName,password,enrollTelephone,companyName,corporateName,
                corporateTelephone,socialCreditCode,
                startDate,district,detailLocation,filesList) == 1){
            return ResultUtil.success();
        }
        return ResultUtil.failure(603,"注册失败");
    }


}
