package com.cqnu.harunasandrivingtestingsystem.controller;

import com.alibaba.fastjson.JSON;
import com.cqnu.harunasandrivingtestingsystem.entity.Result;
import com.cqnu.harunasandrivingtestingsystem.entity.School;
import com.cqnu.harunasandrivingtestingsystem.security.JwtTokenUtil;
import com.cqnu.harunasandrivingtestingsystem.security.UserDetailsServiceImpl;
import com.cqnu.harunasandrivingtestingsystem.service.impl.SchoolServiceImpl;
import com.cqnu.harunasandrivingtestingsystem.utils.ResultUtil;
import com.cqnu.harunasandrivingtestingsystem.utils.SendSMS;
import com.github.qcloudsms.SmsSingleSenderResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.time.LocalDate;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @Autowired
    private SendSMS sendSMS;

    @Resource
    private SchoolServiceImpl schoolService;

    /**
     * 辅助操作 token 的工具类
     */
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Resource
    private UserDetailsServiceImpl userDetailsService;

    /**
     *
     * @param email
     * @param password
     * @return
     */
    @PostMapping("/login")
    public String login(String email, String password){
        Map<String, String> map = new HashMap<String, String>(16);
        if (schoolService.loginByEmail(email,password)){
            map.put("token",jwtTokenUtil.generateToken(userDetailsService.loadUserByUsername(String.valueOf(schoolService.getIdByEmail(email)),"School"),"School"));
            map.put("schoolName",schoolService.getSchoolNameByEmail(email));
            return JSON.toJSONString(map);
        }
        return JSON.toJSONString(ResultUtil.failure(408,"登录失败"));
    }

    /**
     * 验证验证码
     * @param telephone 手机号
     * @param verifyCode 验证码
     * @return  408
     */
    @PostMapping("/validate")
    public Result validate(String telephone,String verifyCode){
        if (schoolService.verification(telephone,verifyCode)){
            return ResultUtil.success();
        }
        return ResultUtil.failure(408, "验证码错误或失效");
    }

    /**
     * 发送验证码
     * @param telephone
     * @return 响应参数
     *     "result": 0,   错误码，0 表示成功(计费依据)，非 0 表示失败
     *     "errmsg": "OK",  错误消息，result 非 0 时的具体错误信息
     *     "ext": "",   用户的 session 内容，腾讯 server 回包中会原样返回
     *     "fee": 1,    短信计费的条数
     *     "sid": "xxxxxxx"     本次发送标识 id，标识一次短信下发记录
     */
    @GetMapping("/sendSMS")
    public SmsSingleSenderResult sendSMS(String telephone){
        Map map = new HashMap(16);
        // 根据手机号生成验证码并添加到缓存
        String verifyCode = schoolService.verifyCode(telephone);
        // 向目标手机号发送验证码短信
        SmsSingleSenderResult result = sendSMS.sendSMS(telephone, verifyCode);
        // 发送成功

        return result;
    }

    /**
     *
     * @param email 邮箱
     * @param schoolName    驾校名称
     * @param password  密码
     * @param enrollTelephone   报名电话
     * @param companyName   驾校公司名称
     * @param corporateName 法人姓名
     * @param corporateTelephone    法人电话
     * @param socialCreditCode  社会信用代码
     * @param startDate 驾校成立日期
     * @param district  驾校所在地区
     * @param detailLocation    驾校详细地址
     * @param files 上传文件
     * @return  code : 600 参数错误
     *          code : 200 注册成功
     *          code : 603 注册失败
     */
    @PostMapping("/signUp")
    public Result signUp(String email, String schoolName, String password, String enrollTelephone,
                         String companyName, String corporateName, String corporateTelephone, String socialCreditCode, Date startDate,
                         String district, String detailLocation,@RequestParam("image") MultipartFile[] files){


        if (StringUtils.isEmpty(email) || StringUtils.isEmpty(schoolName) || StringUtils.isEmpty(password) || StringUtils.isEmpty(enrollTelephone) ||
            StringUtils.isEmpty(companyName) || StringUtils.isEmpty(corporateName) ||
            StringUtils.isEmpty(corporateTelephone) ||
            StringUtils.isEmpty(socialCreditCode) || startDate == null || StringUtils.isEmpty(district) || StringUtils.isEmpty(detailLocation) ||
            files.length == 0){
            logger.error("email: " + email + " schoolName: " + schoolName + " password: " + password + "enrollTelephone: " + enrollTelephone
                            + " companyName: " + companyName + " corporateName: " + corporateName
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
