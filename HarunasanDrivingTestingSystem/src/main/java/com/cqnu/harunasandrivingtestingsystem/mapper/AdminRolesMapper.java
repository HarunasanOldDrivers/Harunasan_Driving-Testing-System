package com.cqnu.harunasandrivingtestingsystem.mapper;

import com.cqnu.harunasandrivingtestingsystem.entity.AdminRoles;

public interface AdminRolesMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(AdminRoles record);

    int insertSelective(AdminRoles record);

    AdminRoles selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(AdminRoles record);

    int updateByPrimaryKey(AdminRoles record);

    /**
     * 根据管理员id查询管理员/角色关系
     * @param adminId 管理员id
     * @return
     */
    AdminRoles selectByAdminId(Integer adminId);
}