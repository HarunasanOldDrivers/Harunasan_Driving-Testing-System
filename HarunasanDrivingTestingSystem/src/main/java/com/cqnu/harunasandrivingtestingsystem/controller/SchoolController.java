package com.cqnu.harunasandrivingtestingsystem.controller;

import com.cqnu.harunasandrivingtestingsystem.entity.Enroll;
import com.cqnu.harunasandrivingtestingsystem.entity.Result;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.CourseVO;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.EnrollSL;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.PageInfo;
import com.cqnu.harunasandrivingtestingsystem.security.JwtTokenUtil;
import com.cqnu.harunasandrivingtestingsystem.security.UserDetailsServiceImpl;
import com.cqnu.harunasandrivingtestingsystem.service.ICourseService;
import com.cqnu.harunasandrivingtestingsystem.service.ISchoolService;
import com.cqnu.harunasandrivingtestingsystem.utils.ResultUtil;
import com.cqnu.harunasandrivingtestingsystem.utils.SendSMS;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.qcloudsms.SmsSingleSenderResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

/**
 * @author LiAixing
 * @version 1.0
 * @className SchoolController
 * @description 驾校Controller
 * @date 2019/3/14 3:10
 **/
@RestController
@RequestMapping("/api/school")
public class SchoolController {

    private Logger logger = LoggerFactory.getLogger(SchoolController.class);

    @Autowired
    private SendSMS sendSMS;

    @Resource
    private ISchoolService schoolService;

    @Autowired
    private ICourseService courseService;

    /**
     * 辅助操作 token 的工具类
     */
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Resource
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private HttpServletRequest request;

    /**
     * json web token 在请求头的名字
     */
    @Value("${jwt.header}")
    private String tokenHeader;

    /**
     * 登录
     * @param email 登录邮箱
     * @param password  登录密码
     * @return  code: 200 成功  返回token
     *          code: 408 失败
     */
    @PostMapping("/login")
    public Result login(String email, String password){
        Map<String, String> map = new HashMap<String, String>(16);
        if (schoolService.loginByEmail(email,password)){
            if (!schoolService.checkAuditing(email)){
                return ResultUtil.failure(408,"账号正在审核中或未通过审核");
            }
            if (!schoolService.checkAuditing(email)){
                return ResultUtil.failure(408,"您的账号已被冻结,请联系管理员");
            }
            map.put("token",jwtTokenUtil.generateToken(userDetailsService.loadUserByUsername(String.valueOf(schoolService.getIdByEmail(email)),"School"),"School"));
            map.put("schoolName",schoolService.getSchoolNameByEmail(email));
            return ResultUtil.success(map);
        }

        return ResultUtil.failure(408,"登录失败");
    }

    /**
     * 验证验证码
     * @param telephone 手机号
     * @param verifyCode 验证码
     * @return  code: 408 验证码错误或失效
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
     * @param telephone 接收验证码的手机号
     * @return 响应参数
     *     "result": 0,   错误码，0 表示成功(计费依据)，非 0 表示失败
     *     "errmsg": "OK",  错误消息，result 非 0 时的具体错误信息
     *     "ext": "",   用户的 session 内容，腾讯 server 回包中会原样返回
     *     "fee": 1,    短信计费的条数
     *     "sid": "xxxxxxx"     本次发送标识 id，标识一次短信下发记录
     */
    @GetMapping("/sendSMS")
    public SmsSingleSenderResult sendSMS(String telephone){
        // 根据手机号生成验证码并添加到缓存
        String verifyCode = schoolService.verifyCode(telephone);
        // 向目标手机号发送验证码短信

        // 发送成功
        return sendSMS.sendSMS(telephone, verifyCode);
    }

    /**
     * 驾校注册
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
     *          code : 601 驾校已存在
     *          code : 200 注册成功
     *          code : 603 注册失败
     */
    @PostMapping("/signUp")
    public Result signUp(String email, String schoolName, String password, String enrollTelephone,
                         String companyName, String corporateName, String corporateTelephone, String socialCreditCode, Date startDate,
                         String district, String detailLocation,@RequestParam("image") MultipartFile[] files){

        // 非空验证
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
        // 检校文件
        if (files.length != 3){
            return ResultUtil.failure(600,"文件上传失败");
        }
        String schoolNameDB = schoolService.getSchoolNameByEmail(email);
        if (StringUtils.isEmpty(schoolNameDB) && schoolName.equals(schoolNameDB)){
            return ResultUtil.failure(601, "驾校已存在");
        }
        List<String> filesList = schoolService.uploadImage(files);

        if(schoolService.signUp(email,schoolName,password,enrollTelephone,companyName,corporateName,
                corporateTelephone,socialCreditCode,
                startDate,district,detailLocation,filesList) == 1){
            return ResultUtil.success();
        }
        return ResultUtil.failure(603,"注册失败");
    }

    /**
     * 获取驾校信息
     * @return
     * 需要权限:School
     */
    @GetMapping("/profile")
    @PreAuthorize("hasRole('School')")
    public Result getProfile(){
        String authToken = request.getHeader(this.tokenHeader);
        String username = this.jwtTokenUtil.getUsernameFromToken(authToken);
        return ResultUtil.success(schoolService.getProfile(Integer.valueOf(username)));
    }

    /**
     * 修改报名电话
     * @param newTel    新报名电话
     * @return  code: 200 成功
     *          code: 605 修改报名电话失败
     * 需要权限:School
     */
    @PostMapping("/alterTel")
    @PreAuthorize("hasRole('School')")
    public Result alterTel(String newTel){
        String authToken = request.getHeader(this.tokenHeader);
        String username = this.jwtTokenUtil.getUsernameFromToken(authToken);
        if (schoolService.alterTel(Integer.valueOf(username), newTel)){
            return ResultUtil.success();
        }
        return ResultUtil.failure(605, "修改报名电话失败");
    }

    /**
     * 修改驾校简介
     * @param newDec  新简介
     * @return
     * 需要权限:School
     */
    @PostMapping("/alterDescribe")
    @PreAuthorize("hasRole('School')")
    public Result alterDescribe(String newDec){
        String authToken = request.getHeader(this.tokenHeader);
        String username = this.jwtTokenUtil.getUsernameFromToken(authToken);
        if (schoolService.alterDescribe(Integer.valueOf(username), newDec)){
            return ResultUtil.success();
        }
        return ResultUtil.failure(606, "修改报名电话失败");
    }

    /**
     * 修改首页图片
     * @param files 首页图片
     * @return
     * 需要权限:School
     */
    @PostMapping("/alterIcon")
    @PreAuthorize("hasRole('School')")
    public Result alterIcon(@RequestParam("image") MultipartFile[] files){
        String authToken = request.getHeader(this.tokenHeader);
        String username = this.jwtTokenUtil.getUsernameFromToken(authToken);
        if (files == null || files.length != 1){
            return ResultUtil.failure(600,"文件上传失败");
        }
        List<String> filesList = schoolService.uploadImage(files);
        if (filesList == null){
            return ResultUtil.failure(600,"文件上传失败");
        }
        logger.warn(filesList.get(0));
        if (schoolService.alterIcon(Integer.valueOf(username),filesList.get(0))){
            return ResultUtil.success();
        }
        return ResultUtil.failure(607, "修改首页图片失败");
    }


    /**
     * 添加课程
     * @param courseName    课程名称
     * @param describe  课程描述
     * @param price 课程价格
     * @return  code: 200 成功
     *          code: 604 添加课程失败
     * 需要权限:School
     */
    @PostMapping("/addCourse")
    @PreAuthorize("hasRole('School')")
    public Result addCourse(String courseName, String describe, Integer price){
        String authToken = request.getHeader(this.tokenHeader);
        String username = this.jwtTokenUtil.getUsernameFromToken(authToken);
        return courseService.addCourse(Integer.valueOf(username),courseName,describe,price)
                ? ResultUtil.success()
                : ResultUtil.failure(604,"添加课程失败");
    }

    /**
     * 下架课程
     * @param courseId  课程Id
     * @return  code: 200 成功
     *          code: 620 查无此课
     *          code: 621 下架课程失败
     * 需要权限:School
     */
    @PostMapping("/closeCourse")
    @PreAuthorize("hasAnyRole('School')")
    public Result closeCourse(Integer courseId){
        String authToken = request.getHeader(this.tokenHeader);
        String username = this.jwtTokenUtil.getUsernameFromToken(authToken);
        if (courseService.findCourse(courseId) == null | !Integer.valueOf(username).equals(courseService.findCourse(courseId).getSchoolId())){
            return ResultUtil.failure(620,"查无此课");
        }
        return courseService.closeCourse(courseId)?ResultUtil.success():ResultUtil.failure(621,"下架课程失败");
    }

    /**
     * 获取课程列表
     * @param pageNo  当前页码
     * @param pageSize  分页大小
     * @return
     * 需要权限:School
     */
    @GetMapping("/getCourse")
    @PreAuthorize("hasAnyRole('School')")
    public PageInfo<CourseVO> getCourse(@RequestParam(defaultValue = "1") Integer pageNo, @RequestParam(defaultValue = "5") Integer pageSize){
        String authToken = request.getHeader(this.tokenHeader);
        String username = this.jwtTokenUtil.getUsernameFromToken(authToken);
        return courseService.getCourse(Integer.valueOf(username), pageNo, pageSize);
    }

    /**
     * 查找报名
     * @param pageNo    当前页
     * @param pageSize  分页大小
     * @param studentName   学生姓名
     * @param enrollDate    报名时间
     * @param courseId  课程Id
     * @return  PageInfo<Enroll>
     *          code : 600 参数错误
     * 需要权限:School
     */
    @GetMapping("/selectEnroll")
    @PreAuthorize("hasAnyRole('School')")
    public PageInfo<EnrollSL> selectEnroll(@RequestParam(defaultValue = "1") Integer pageNo, @RequestParam(defaultValue = "5") Integer pageSize,
                                           String studentName, String enrollDate, Integer courseId){
        String authToken = request.getHeader(this.tokenHeader);
        String username = this.jwtTokenUtil.getUsernameFromToken(authToken);
        logger.warn("studentName: " + studentName + "enrollDate: " + enrollDate + "courseId: " + courseId);
        LocalDateTime localDateTimeBefore;
        LocalDateTime localDateTimeAfter;
        if (StringUtils.isEmpty(enrollDate)){
            localDateTimeBefore = LocalDateTime.of(2000,1,1,0,0,0);
            localDateTimeAfter = LocalDateTime.of(3000,1,1,0,0,0);
        } else {
            LocalDate localDate = LocalDate.parse(enrollDate, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            localDateTimeBefore = localDate.atTime(0, 0, 0);
            localDateTimeAfter = localDateTimeBefore.plusDays(1);
        }
        if (courseId == null){
            return schoolService.selectAllEnroll(studentName,localDateTimeBefore, localDateTimeAfter, pageNo, pageSize);
        }
        return schoolService.selectEnroll(studentName,localDateTimeBefore, localDateTimeAfter, courseId, pageNo, pageSize);
    }

    /**
     * 获取课程名称
     * @return  { "courseId" : courseId, "courseName" : courseName}
     * 需要权限:School
     */
    @GetMapping("/courseName")
    @PreAuthorize("hasAnyRole('School')")
    public Result getCourseName(){
        String authToken = request.getHeader(this.tokenHeader);
        String username = this.jwtTokenUtil.getUsernameFromToken(authToken);
        List<Map> list = new ArrayList<>(10);
        for (CourseVO course : courseService.getCourse(Integer.valueOf(username))){
            Map map = new HashMap(16);
            map.put("courseId", course.getCourseId());
            map.put("courseName", course.getCourseName());
            list.add(map);
        }
        return ResultUtil.success(list);
    }
}
