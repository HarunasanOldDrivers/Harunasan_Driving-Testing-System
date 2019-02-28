package com.cqnu.harunasandrivingtestingsystem.mapper;

import com.cqnu.harunasandrivingtestingsystem.entity.SchoolRoles;

public interface SchoolRolesMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(SchoolRoles record);

    int insertSelective(SchoolRoles record);

    SchoolRoles selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(SchoolRoles record);

    int updateByPrimaryKey(SchoolRoles record);
}