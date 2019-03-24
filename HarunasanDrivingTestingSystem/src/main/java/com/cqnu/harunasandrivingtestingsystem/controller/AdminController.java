package com.cqnu.harunasandrivingtestingsystem.controller;

import com.alibaba.fastjson.JSON;
import com.cqnu.harunasandrivingtestingsystem.entity.Result;
import com.cqnu.harunasandrivingtestingsystem.security.JwtTokenUtil;
import com.cqnu.harunasandrivingtestingsystem.security.UserDetailsServiceImpl;
import com.cqnu.harunasandrivingtestingsystem.service.IAdminService;
import com.cqnu.harunasandrivingtestingsystem.utils.ResultUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

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

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @PostMapping("/createAdmin")
    @PreAuthorize("hasAuthority('Admin:Create')")
    public Map createAdmin(String name, String password, String phone){
        Map map = new HashMap();
        int result = 0;
        try {
            logger.info("New Administrator:" + URLDecoder.decode(name,"UTF-8"));
            result = adminService.createAdmin(URLDecoder.decode(name,"UTF-8"),password,phone);

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        map.put("result",result);
        return null;
    }

    @PostMapping("/banAdmin/{id}")
    @PreAuthorize("hasRole('Admin_root')")
    public Result banAdmin(@PathVariable int id){

        return ResultUtil.success();
    }

    @PostMapping("/login")
    public String login(@RequestBody Map map) {
        Map<String, String> map2 = new HashMap<String, String>(16);
        String username = (String) map.get("username");
        String password = (String) map.get("password");
        logger.info(username + password);
        if (adminService.loginById(Integer.parseInt(username), password)) {
            map2.put("token", jwtTokenUtil.generateToken(userDetailsService.loadUserByUsername(String.valueOf(username), "Administrator"), "Administrator"));
            return JSON.toJSONString(map2);
        }
            return JSON.toJSONString(ResultUtil.failure(408, "登录失败"));
    }

//    @GetMapping("/info")
//    public

    @PostMapping("/auditing")
    public Result auditing(){
        return ResultUtil.success();
    }


}
