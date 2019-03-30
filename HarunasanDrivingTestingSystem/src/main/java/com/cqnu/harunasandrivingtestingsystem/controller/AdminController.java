package com.cqnu.harunasandrivingtestingsystem.controller;

import com.alibaba.fastjson.JSON;
import com.cqnu.harunasandrivingtestingsystem.entity.*;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.*;
import com.cqnu.harunasandrivingtestingsystem.mapper.AdministratorMapper;
import com.cqnu.harunasandrivingtestingsystem.security.JwtTokenUtil;
import com.cqnu.harunasandrivingtestingsystem.security.UserDetailsServiceImpl;
import com.cqnu.harunasandrivingtestingsystem.service.IAdminService;
import com.cqnu.harunasandrivingtestingsystem.service.IBaseUserService;
import com.cqnu.harunasandrivingtestingsystem.service.INewsService;
import com.cqnu.harunasandrivingtestingsystem.service.ISchoolService;
import com.cqnu.harunasandrivingtestingsystem.service.impl.NewsServiceImpl;
import com.cqnu.harunasandrivingtestingsystem.utils.Json2DB;
import com.cqnu.harunasandrivingtestingsystem.utils.ResultUtil;
import com.github.pagehelper.PageHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.*;

/**
 * @author LiAixing
 * @version 1.0
 * @className AdminController
 * @description 管理员Controller
 * @date 2019/2/23 3:54
 **/

@RestController
@RequestMapping("api/admin")
public class AdminController {

    private final Logger logger = LoggerFactory.getLogger(AdminController.class);

    @Resource
    private IAdminService adminService;

    @Resource
    private ISchoolService schoolService;

    @Resource
    private IBaseUserService baseUserService;

    @Resource
    private UserDetailsServiceImpl userDetailsService;

    @Resource
    private INewsService newsService;

    @Resource
    private AdministratorMapper administratorMapper;

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
    @Value("${jwt.admin_header}")
    private String tokenHeader;

    /**
     * 创建管理员
     * @param map  json对象，用map接收
     * @return
     */
    @PostMapping("/createAdmin")
    @PreAuthorize("hasAuthority('Admin:Create')")
    public Result createAdmin(@RequestBody Map map){
        String name = (String)map.get("name");
        String password = (String)map.get("password");
        String phone = (String)map.get("phone");
        Integer role = (Integer) map.get("role");
        return adminService.createAdmin(name,password,phone,role) ==1 ? ResultUtil.success() :ResultUtil.failure(800,"创建失败");
    }

    /**
     * 改变账号状态
     * @param map json对象
     * @return
     */
    @PostMapping("/banAdmin")
    @PreAuthorize("hasRole('Admin_root')")
    public Result banAdmin(@RequestBody Map map){
        Integer id = (Integer) map.get("id");
        Integer status = (Integer) map.get("status");
        if (adminService.banAdmin(id,status) == 1) {
            return ResultUtil.success();
        }
        return ResultUtil.failure(800,"失败");
    }

    /**
     * 管理员登录
     * @param map json对象
     * @return
     */
    @PostMapping("/login")
    public Result login(@RequestBody Map map) {
        String username = (String) map.get("username");
        String password = (String) map.get("password");
        Administrator administrator = administratorMapper.selectByPrimaryKey(Integer.valueOf(username));
        if (administrator.getEnable() != 1){
            return ResultUtil.failure(452,"账号被冻结");
        }
        if (adminService.loginById(Integer.parseInt(username), password)) {
            return ResultUtil.success(jwtTokenUtil.generateToken(userDetailsService.loadUserByUsername(String.valueOf(username), "Administrator"), "Administrator"));
        }
            return ResultUtil.failure(408,"登录失败");
    }

    /**
     * 获取管理员信息
     * @return
     */
    @GetMapping("/info")
    @PreAuthorize("hasAuthority('Admin:Base')")
    public Result getInfo(){
        String authToken = request.getHeader(this.tokenHeader);
        String username = this.jwtTokenUtil.getUsernameFromToken(authToken);
        if (StringUtils.isEmpty(authToken) || StringUtils.isEmpty(username)){
            return ResultUtil.failure(510,"未登录");
        }
        AdminFE adminFE = adminService.getInfo(Integer.valueOf(username));
        return ResultUtil.success(adminFE);
    }

    /**
     * 审核驾校
     * schoolId  驾校Id
     * status  状态码 { 1:未通过, 2:通过}
     * text 未通过原因
     * @return
     */
    @PostMapping("/audit")
    @PreAuthorize("hasAuthority('Admin:Audit')")
    public Result audit(@RequestBody Map map){
        Integer schoolId = (Integer)map.get("schoolId");
        Integer status = (Integer)map.get("status");
        String text = (String)map.get("text");
        if (schoolId == null || status == null){
            return ResultUtil.failure(600,"参数错误");
        }
        if ( status != 1 & status != 2 ){
            return ResultUtil.failure(600,"参数错误");
        }
        if (adminService.audit(schoolId, status, text)) {
            return ResultUtil.success();
        } else {
            return ResultUtil.failure(1000,"审核失败");
        }
    }

    /**
     * 获取管理员列表
     * @param pageNo  当前页
     * @param pageSize  分页大小
     * @return PageInfo<Administrator>
     */
    @GetMapping("/list")
    @PreAuthorize("hasRole('Admin_root')")
    public PageInfo<AdminInfo> getList(@RequestParam(defaultValue = "1") Integer pageNo, @RequestParam(defaultValue = "5") Integer pageSize){
        return adminService.getList(pageNo,pageSize);
    }

    /**
     * 搜索管理员
     * @param pageNo  当前页
     * @param pageSize  分页大小
     * @param adminName  管理员姓名
     * @param roleId  角色Id
     * @return
     */
    @GetMapping("/search")
    @PreAuthorize("hasRole('Admin_root')")
    public PageInfo<AdminInfo> search(@RequestParam(defaultValue = "1") Integer pageNo, @RequestParam(defaultValue = "5") Integer pageSize,
                                       String adminName, Integer roleId){
        if (roleId == null & StringUtils.isEmpty(adminName)){
            return getList(pageNo,pageSize);
        }
        return adminService.search(pageNo,pageSize,adminName,roleId);
    }

    /**
     * 编辑管理员
     * @param map
     * @return
     */
    @PostMapping("/edit")
    @PreAuthorize("hasRole('Admin_root')")
    public Result edit(@RequestBody Map map){
        Integer adminId = (Integer) map.get("adminId");
        String roleIdCash = (String) map.get("roleId");
        String newPassword = (String) map.get("password");
        logger.warn(newPassword);
        Integer roleId;
        if (roleIdCash.length()>1){
            roleId = null;
        } else {
            roleId = Integer.valueOf(roleIdCash);
        }
        String adminName = (String) map.get("adminName");
        String adminTel = (String) map.get("adminTel");
        logger.warn("adminId"+adminId+"adminName"+adminName+"adminTel"+adminTel+"roleId"+roleId);
        int result = adminService.updateAdmin(adminId, adminName, adminTel, roleId, newPassword);
        logger.warn(String.valueOf(result));
        if (result == 2){
            return ResultUtil.success();
        } else {
            return ResultUtil.failure(1100,"修改失败");
        }
    }

    /**
     * 获取所有驾校
     * @return
     */
    @GetMapping("/schoolList")
    @PreAuthorize("hasAnyRole('Admin_root','Admin_school')")
    public PageInfo<School> getSchoolList(@RequestParam(defaultValue = "1") Integer pageNo, @RequestParam(defaultValue = "10") Integer pageSize){
        PageHelper.startPage(pageNo,pageSize);
        return new PageInfo<>(schoolService.selectAllSchool());
    }

    /**
     * 获取待审核驾校
     */
    @GetMapping("/auditingSchoolList")
    @PreAuthorize("hasAnyRole('Admin_root','Admin_school')")
    public PageInfo<School> getAuditingSchoolList(@RequestParam(defaultValue = "1") Integer pageNo, @RequestParam(defaultValue = "10") Integer pageSize){
        PageHelper.startPage(pageNo,pageSize);
        return new PageInfo<>(schoolService.selectAuditingSchool());
    }

    /**
     * 获取所有用户
     */
    @GetMapping("/userList")
    @PreAuthorize("hasAnyRole('Admin_root','Admin_user')")
    public PageInfo<User> getUserList(@RequestParam(defaultValue = "1") Integer pageNo, @RequestParam(defaultValue = "10") Integer pageSize){
        PageHelper.startPage(pageNo,pageSize);
        return new PageInfo<>(baseUserService.getUserList());
    }

    /**
     * 获取所有文章
     * @param pageNo 当前页
     * @param pageSize 分页大小
     * @return
     */
    @GetMapping("/newsList")
    @PreAuthorize("hasAnyRole('Admin_root','Admin_news')")
    public PageInfo<News> getNewsList(@RequestParam(defaultValue = "1") Integer pageNo, @RequestParam(defaultValue = "10") Integer pageSize) {
        PageHelper.startPage(pageNo, pageSize);
        return new PageInfo<>(newsService.getNewsList());
    }

    /**
     * 获取指定文章
     * @param id 文章id
     * @return
     */
    @GetMapping("/news/{id}")
    @PreAuthorize("hasAnyRole('Admin_root','Admin_news')")
    public News getNews(@PathVariable Integer id){
        return newsService.getArticle(id);
    }

    /**
     * 创建资讯
     * @param newsVO
     * @return
     */
    @PostMapping("/createNews")
    @PreAuthorize("hasAnyRole('Admin_root','Admin_news')")
    public Result createNews(@RequestBody NewsVO newsVO){
        if (newsVO == null){
            return ResultUtil.failure(2000,"参数错误");
        }
        return ResultUtil.success();
    }

    /**
     * 编辑资讯
     * @param newsVO
     * @return
     */
    @PostMapping("/editNews")
    @PreAuthorize("hasAnyRole('Admin_root','Admin_news')")
    public Result editNews(@RequestBody NewsVO newsVO){
        return ResultUtil.success();
    }
}
