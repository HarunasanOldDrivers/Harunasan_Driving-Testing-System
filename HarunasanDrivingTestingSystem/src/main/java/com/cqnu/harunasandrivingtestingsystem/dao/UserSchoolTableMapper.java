package com.cqnu.harunasandrivingtestingsystem.dao;

import com.cqnu.harunasandrivingtestingsystem.entity.UserSchoolTable;

public interface UserSchoolTableMapper {
    int deleteByPrimaryKey(Integer schoolId);

    int insert(UserSchoolTable record);

    int insertSelective(UserSchoolTable record);

    UserSchoolTable selectByPrimaryKey(Integer schoolId);

    int updateByPrimaryKeySelective(UserSchoolTable record);

    int updateByPrimaryKeyWithBLOBs(UserSchoolTable record);

    int updateByPrimaryKey(UserSchoolTable record);
}