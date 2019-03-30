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

    /**
     * 登录
     * @param id 管理员Id
     * @param password 密码
     * @return
     */
    boolean loginById(int id, String password);

    /**
     * 获取管理员信息
     * @param username 管理员Id
     * @return
     */
    AdminFE getInfo(Integer username);

    /**
     * 获取管理员列表
     * @param pageNum  当前页
     * @param pageSize  分页大小
     * @return
     */
    PageInfo<AdminInfo> getList(Integer pageNum, Integer pageSize);

    /**
     * 审核驾校
     * @param schoolId  驾校Id
     * @param status  驾校状态(1：审核通过，2：审核未通过)
     * @param text 未通过原因
     * @return
     */
    boolean audit(Integer schoolId, Integer status, String text);

    /**
     * 搜索管理员
     * @param pageNum 当前页
     * @param pageSize 分页大小
     * @param adminName 管理员姓名
     * @param roleId 角色Id
     * @return
     */
    PageInfo<AdminInfo> search(Integer pageNum, Integer pageSize, String adminName, Integer roleId);

    /**
     * 修改管理员信息
     * @param adminId 管理员Id
     * @param adminName 管理员姓名
     * @param adminTel 管理员电话
     * @param roleId 角色id
     * @return
     */
    int updateAdmin(Integer adminId, String adminName, String adminTel, Integer roleId, String newPassword);


}
