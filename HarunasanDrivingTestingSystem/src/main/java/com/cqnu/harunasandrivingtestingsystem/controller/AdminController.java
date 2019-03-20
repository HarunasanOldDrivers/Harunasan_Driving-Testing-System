package com.cqnu.harunasandrivingtestingsystem.controller;

import com.cqnu.harunasandrivingtestingsystem.service.IAdminService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    @PostMapping("/createAdmin")
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
    public Map banAdmin(@PathVariable int id){
        Map map = new HashMap();
        int result = 0;



        return map;
    }
}
