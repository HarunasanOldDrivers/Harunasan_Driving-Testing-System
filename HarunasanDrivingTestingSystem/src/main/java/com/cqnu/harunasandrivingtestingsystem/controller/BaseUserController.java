package com.cqnu.harunasandrivingtestingsystem.controller;

import com.alibaba.fastjson.JSON;
import com.cqnu.harunasandrivingtestingsystem.entity.Result;
import com.cqnu.harunasandrivingtestingsystem.entity.User;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.CourseVO;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.EnrollVO;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.PageInfo;
import com.cqnu.harunasandrivingtestingsystem.security.JwtTokenUtil;
import com.cqnu.harunasandrivingtestingsystem.security.UserDetailsServiceImpl;
import com.cqnu.harunasandrivingtestingsystem.service.IBaseUserService;
import com.cqnu.harunasandrivingtestingsystem.utils.*;
import com.github.pagehelper.PageHelper;
import com.github.qcloudsms.SmsSingleSenderResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.FileNotFoundException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

/**
 * @author LiAixing
 * @version 1.0
 * @className BaseUserController
 * @description TODO
 * @date 2019/2/14 19:02
 **/


@RestController
@RequestMapping("/api/user")
public class BaseUserController {

    Logger logger = LoggerFactory.getLogger(BaseUserController.class);

    @Autowired
    private SendSMS sendSMS;

    @Resource
    private IBaseUserService baseUserService;

    @Resource
    private UserDetailsServiceImpl userDetailsService;

    /**
     * 辅助操作 token 的工具类
     */
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
//            map.put("VeriftyCode",verifyCode);
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
    public Result signUp(String telephone, String password, String nickname,
                         String mail, String verifyCode) {

        logger.info("password" + password);
        Map map = new HashMap(16);
        if (telephone == null || password == null || nickname == null || mail == null || verifyCode == null){
            return ResultUtil.failure(408,"参数错误");
        }
        if (baseUserService.telephoneHaveExist(telephone)){
            return ResultUtil.failure(408,"用户名已存在");
        }
        else if (!baseUserService.verification(telephone,verifyCode)){
            return ResultUtil.failure(408,"验证码错误或失效");
        }
        else {
            try {
                logger.info("New User:" + URLDecoder.decode(nickname,"UTF-8"));
                baseUserService.signUp(telephone,URLDecoder.decode(nickname,"UTF-8"),password,mail);
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            return ResultUtil.success();
        }

    }

    /**
     * 用户登录
     * @param username  用户名，对于User来说是手机号
     * @param password  密码
     * @return  登录成功后返回token
     */
    @PostMapping("/login")
    public Result login(String username,String password){
        Map<String, String> map = new HashMap<String, String>(16);
        if (baseUserService.loginByTelephone(username,password)){
            map.put("token",jwtTokenUtil.generateToken(userDetailsService.loadUserByUsername(String.valueOf(baseUserService.getIdByTelephone(username)),"User"),"User"));
            map.put("nickname",baseUserService.getNickNameByTelephone(username));
            return ResultUtil.success(map);
        }
        return ResultUtil.failure(408,"登录失败");
    }


    /**
     * 个人信息
     * @return
     */
    @GetMapping("/profile")
    @PreAuthorize("hasRole('User')")
    public User getProfile(){
        String authToken = request.getHeader(this.tokenHeader);
        String username = this.jwtTokenUtil.getUsernameFromToken(authToken);
        return baseUserService.getProfile(Integer.parseInt(username));
    }

    /**
     * 获取报名课程
     * @param pageNo  当前页
     * @param pageSize  分页大小
     * @return
     */
    @GetMapping("/courses")
    @PreAuthorize("hasRole('User')")
    public PageInfo<EnrollVO> getCourses(@RequestParam(defaultValue = "1") Integer pageNo, @RequestParam(defaultValue = "10") Integer pageSize){
        String authToken = request.getHeader(this.tokenHeader);
        String username = this.jwtTokenUtil.getUsernameFromToken(authToken);
        PageHelper.startPage(pageNo,pageSize);
        return new PageInfo<>(baseUserService.getEnroll(Integer.parseInt(username)));
    }

    /**
     * 验证验证码
     * @param telephone 手机号
     * @param verifyCode 验证码
     * @return
     */
    @PostMapping("/validate")
    public Result validate(String telephone,String verifyCode){
        if (baseUserService.verification(telephone,verifyCode)){
            return ResultUtil.success();
        }
        return ResultUtil.failure(408, "验证码错误或失效");
    }

    /**
     * 修改密码
     * @param oldPassword   旧密码
     * @param newPassword   新密码
     * @return
     */
    @PostMapping("/alterPassword")
    @PreAuthorize("hasRole('User')")
    public Result alterPassword(String oldPassword, String newPassword ,String verifyCode){
        String authToken = request.getHeader(this.tokenHeader);
        String username = this.jwtTokenUtil.getUsernameFromToken(authToken);
        User user = baseUserService.getProfile(Integer.valueOf(username));
        if(validate(user.getUserTelphone(),verifyCode).getCode() == 408){
            return ResultUtil.failure(408, "验证码错误或失效");
        }
        if (baseUserService.oldPasswordIsCorrect(Integer.parseInt(username),oldPassword)){
            return ResultUtil.failure(408,"密码不正确");
        }
        int msg = baseUserService.alterPassword(Integer.parseInt(username),newPassword);
        if (msg == 1){
            return ResultUtil.success();
        } else {
            return ResultUtil.failure(409,"修改密码失败");
        }
    }

    /**
     * 忘记密码
     * @param newPassword 新密码
     * @return
     */
    @PostMapping("/forgotPassword")
    @PreAuthorize("hasRole('User')")
    public Result forgotPassword(String newPassword){
        String authToken = request.getHeader(this.tokenHeader);
        String username = this.jwtTokenUtil.getUsernameFromToken(authToken);
        int msg = baseUserService.alterPassword(Integer.parseInt(username),username);
        if (msg == 1){
            return ResultUtil.success();
        } else {
            return ResultUtil.failure(409,"修改密码失败");
        }
    }

//    @GetMapping("/getEnroll")
//    public

    @PostMapping("/enroll")
    @PreAuthorize("hasRole('User')")
    public Result enroll(Integer courseId, String username, String telephone){
        String authToken = request.getHeader(this.tokenHeader);
        String userId = this.jwtTokenUtil.getUsernameFromToken(authToken);
        if (StringUtils.isEmpty(authToken) || StringUtils.isEmpty(userId)){
            return ResultUtil.failure(510,"未登录");
        }
        if (courseId == null || StringUtils.isEmpty(username) || StringUtils.isEmpty(telephone)){
            return ResultUtil.failure(600,"参数错误");
        }
        return baseUserService.enroll(Integer.valueOf(userId), courseId, username, telephone)
                ? ResultUtil.success() : ResultUtil.failure(620,"报名失败");
    }


//    @PreAuthorize("hasAnyAuthority('ORIGIN')")
//    @PostMapping("/db")
//    public void db() throws FileNotFoundException {
//        json2DB.add2DB(json2DB.readFile("classpath:json/DataSubject1.json"));
//        json2DB.add2DB2(json2DB.readFile("classpath:json/DataSubject4.json"));
//    }


}
