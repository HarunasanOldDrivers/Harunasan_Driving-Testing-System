package com.cqnu.harunasandrivingtestingsystem.entity.VO;

import com.cqnu.harunasandrivingtestingsystem.entity.Administrator;

/**
 * @author LiAixing
 * @version 1.0
 * @className AdminInfo
 * @description TODO
 * @date 2019/3/26 3:18
 **/
public class AdminInfo extends Administrator {

    private String roleName;

    public AdminInfo() {
    }

    public AdminInfo(Integer id, String adminName, String adminPassword, String adminPhone, Integer enable, String roleName) {
        super(id, adminName, adminPassword, adminPhone, enable);
        this.roleName = roleName;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }
}
