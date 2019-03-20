package com.cqnu.harunasandrivingtestingsystem.controller;

import com.alibaba.fastjson.JSON;
import com.cqnu.harunasandrivingtestingsystem.entity.Result;
import com.cqnu.harunasandrivingtestingsystem.entity.User;
import com.cqnu.harunasandrivingtestingsystem.security.JwtTokenUtil;
import com.cqnu.harunasandrivingtestingsystem.security.UserDetailsServiceImpl;
import com.cqnu.harunasandrivingtestingsystem.service.IBaseUserService;
import com.cqnu.harunasandrivingtestingsystem.service.impl.BaseUserServiceImpl;
import com.cqnu.harunasandrivingtestingsystem.utils.*;
import com.github.qcloudsms.SmsSingleSenderResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import java.io.FileNotFoundException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

/**
 * @author LiAixing
 * @version 1.0
 * @className BaseUserController
 * @description TODO
 * @date 2019/2/14 19:02
 **/


@RestController
@RequestMapping("api/user")
public class BaseUserController {

    Logger logger = LoggerFactory.getLogger(BaseUserController.class);

    @Autowired
    private SendSMS sendSMS;

    @Resource
    private IBaseUserService baseUserService;

    @Resource
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private Json2DB json2DB;

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
    public Map sendSMS(String telephone){
        Map map = new HashMap(16);
        // 根据手机号生成验证码并添加到缓存
        String verifyCode = baseUserService.verifyCode(telephone);
        // 向目标手机号发送验证码短信
        SmsSingleSenderResult result = sendSMS.sendSMS(telephone, verifyCode);
        // 发送成功
        if (result.result == 0){
            map.put("result",result.result);
            map.put("VeriftyCode",verifyCode);
            return map;
        }

        map.put("result",result.result);
        map.put("errmsg",result.errMsg);
        map.put("ext",result.ext);
        map.put("fee",result.fee);

        return map;
    }

    /**
     * 普通用户注册
     * @param telephone 手机号
     * @param password  密码
     * @param nickname  昵称
     * @param mail  邮箱
     * @param verifyCode   验证码
     * @return
     */
    @PostMapping("/signUp")
    public Result signUp(String telephone, String password, String nickname, String mail, String verifyCode)  {
        Map map = new HashMap(16);
        int result = 0;
        if (baseUserService.telephoneHavaExsit(telephone)){
            return ResultUtil.failure(408,"用户名已存在");
        } else if (!baseUserService.verification(telephone,verifyCode)){
            return ResultUtil.failure(408,"验证码错误或失效");
        } else {
            try {
                logger.info("New User:" + URLDecoder.decode(nickname,"UTF-8"));
                result = baseUserService.signUp(telephone,URLDecoder.decode(nickname,"UTF-8"),password,mail);
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            return ResultUtil.success();
        }

    }

    /**
     *
     * @param username  用户名，对于User来说是手机号
     * @param password  密码
     * @return  登录成功后返回token
     */
    @GetMapping("/login")
    public String login(String username,String password){
        if (baseUserService.loginByTelephone(username,password)){
            return jwtTokenUtil.generateToken(userDetailsService.loadUserByUsername(username,"User"),"User");
        }
        return JSON.toJSONString(ResultUtil.failure(408,"登录失败"));
    }



    @GetMapping("/profile/{id}")
    public User getProfile(@PathVariable int id){
        return null;
    }

    @PostMapping("/alterPassword")
    public Result alterPassword(String oldPassword, String newPassword){
        String authToken = request.getHeader(this.tokenHeader);
        String username = this.tokenUtils.getUsernameFromToken(authToken);
        logger.info("userId: " + username);
        return ResultUtil.success();
    }


    @PreAuthorize("hasAnyAuthority(ORIGIN)")
    @PostMapping("/db")
    public void db() throws FileNotFoundException {
//        json2DB.add2DB(json2DB.readFile("classpath:json/DataSubject1.json"));
        json2DB.add2DB2(json2DB.readFile("classpath:json/DataSubject4.json"));
    }


}
