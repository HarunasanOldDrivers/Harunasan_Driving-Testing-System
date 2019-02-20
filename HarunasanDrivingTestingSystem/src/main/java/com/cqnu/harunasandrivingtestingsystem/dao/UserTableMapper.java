package com.cqnu.harunasandrivingtestingsystem.dao;

import com.cqnu.harunasandrivingtestingsystem.entity.UserTable;

public interface UserTableMapper {
    int deleteByPrimaryKey(Integer userId);

    int insert(UserTable record);

    int insertSelective(UserTable record);

    UserTable selectByPrimaryKey(Integer userId);

    int updateByPrimaryKeySelective(UserTable record);
//==！
    int updateByPrimaryKey(UserTable record);
}