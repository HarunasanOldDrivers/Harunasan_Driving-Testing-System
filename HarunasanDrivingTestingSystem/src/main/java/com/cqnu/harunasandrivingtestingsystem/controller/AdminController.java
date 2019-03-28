package com.cqnu.harunasandrivingtestingsystem.controller;

import com.alibaba.fastjson.JSON;
import com.cqnu.harunasandrivingtestingsystem.entity.Administrator;
import com.cqnu.harunasandrivingtestingsystem.entity.Result;
import com.cqnu.harunasandrivingtestingsystem.entity.Roles;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.AdminFE;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.AdminInfo;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.MenuFE;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.PageInfo;
import com.cqnu.harunasandrivingtestingsystem.security.JwtTokenUtil;
import com.cqnu.harunasandrivingtestingsystem.security.UserDetailsServiceImpl;
import com.cqnu.harunasandrivingtestingsystem.service.IAdminService;
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
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * @author LiAixing
 * @version 1.0
 * @className AdminController
 * @description TODO
 * @date 2019/2/23 3:54
 **/

@RestController
@RequestMapping("api/admin")
public class AdminController {

    private final Logger logger = LoggerFactory.getLogger(AdminController.class);

    @Resource
    private IAdminService adminService;

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
    @Value("${jwt.admin_header}")
    private String tokenHeader;

    @PostMapping("/createAdmin")
    @PreAuthorize("hasAuthority('Admin:Create')")
    public Result createAdmin(String name, String password, String phone){
        try {
            logger.info("New Administrator:" + URLDecoder.decode(name,"UTF-8"));
            adminService.createAdmin(URLDecoder.decode(name,"UTF-8"),password,phone);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return ResultUtil.success();
    }

    @PostMapping("/banAdmin")
    @PreAuthorize("hasRole('Admin_root')")
    public Result banAdmin(Integer id, Integer status){

        return ResultUtil.success();
    }

    @PostMapping("/login")
    public Result login(@RequestBody Map map) {
        Map<String, String> map2 = new HashMap<String, String>(16);
        String username = (String) map.get("username");
        String password = (String) map.get("password");
        if (adminService.loginById(Integer.parseInt(username), password)) {
            return ResultUtil.success(jwtTokenUtil.generateToken(userDetailsService.loadUserByUsername(String.valueOf(username), "Administrator"), "Administrator"));
        }
            return ResultUtil.failure(408,"登录失败");
    }

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

    @PostMapping("/audit")
    @PreAuthorize("hasAuthority('Admin:Audit')")
    public Result audit(){
        return ResultUtil.success();
    }

    /**
     * 获取管理员列表
     * @param pageNo  当前页
     * @param pageSize  分页大小
     * @return PageInfo<Administrator>
     */
    @GetMapping("/list")
    @PreAuthorize("hasRole('Admin_root')")
    public PageInfo<AdminInfo> getList(@RequestParam(defaultValue = "1") Integer pageNo, @RequestParam(defaultValue = "10") Integer pageSize){
        return adminService.getList(pageNo,pageSize);
    }
}
