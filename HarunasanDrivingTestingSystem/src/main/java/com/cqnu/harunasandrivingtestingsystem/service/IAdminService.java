package com.cqnu.harunasandrivingtestingsystem.service;

import com.cqnu.harunasandrivingtestingsystem.entity.VO.AdminFE;

/**
 * @author LiAixing
 * @version 1.0
 * @className IAdminService
 * @description TODO
 * @date 2019/3/5 18:04
 **/

public interface IAdminService {
    /**
     * 创建管理员账号
     * @param name  管理员姓名
     * @param password  密码
     * @param phone 管理员电话号码
     */
    public int createAdmin(String name, String password, String phone);

    /**
     * 禁用管理员账号
     * @param id
     * @return
     */
    public int banAdmin(int id);

    /**
     * 删除管理员账号
     * @param id
     * @return
     */
    public int deleteAdmin(int id);

    boolean loginById(int id, String password);

    boolean loginByTelephone(String telephone, String password);

    AdminFE getInfo(Integer username);


//    public int updateAdmin()


}
