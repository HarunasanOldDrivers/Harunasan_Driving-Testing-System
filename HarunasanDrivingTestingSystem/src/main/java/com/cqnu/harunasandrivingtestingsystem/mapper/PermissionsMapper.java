package com.cqnu.harunasandrivingtestingsystem.mapper;

import com.cqnu.harunasandrivingtestingsystem.entity.Permissions;

public interface PermissionsMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Permissions record);

    int insertSelective(Permissions record);

    Permissions selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Permissions record);

    int updateByPrimaryKey(Permissions record);
}