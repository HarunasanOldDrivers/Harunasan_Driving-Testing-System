package com.cqnu.harunasandrivingtestingsystem.service;

import com.cqnu.harunasandrivingtestingsystem.entity.VO.AdminFE;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.AdminInfo;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.PageInfo;

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
     * @param role 管理员角色
     */
    int createAdmin(String name, String password, String phone, Integer role);

    /**
     * 禁用管理员账号
     * @param id
     * @return
     */
    int banAdmin(int id, Integer status);

    /**
     * 删除管理员账号
     * @param id
     * @return
     */
    int deleteAdmin(int id);

    boolean loginById(int id, String password);

    boolean loginByTelephone(String telephone, String password);

    AdminFE getInfo(Integer username);

    PageInfo<AdminInfo> getList(Integer pageNum, Integer pageSize);

    boolean audit(Integer schoolId, Integer status, String text);

    PageInfo<AdminInfo> search(Integer pageNum, Integer pageSize, String adminName, Integer roleId);


    public int updateAdmin(Integer adminId, String adminName, String adminTel, Integer roleId);


}
