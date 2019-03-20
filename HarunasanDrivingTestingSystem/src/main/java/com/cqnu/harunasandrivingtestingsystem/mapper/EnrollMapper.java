package com.cqnu.harunasandrivingtestingsystem.mapper;

import com.cqnu.harunasandrivingtestingsystem.entity.Enroll;

public interface EnrollMapper {
    int deleteByPrimaryKey(Integer enrollId);

    int insert(Enroll record);

    int insertSelective(Enroll record);

    Enroll selectByPrimaryKey(Integer enrollId);

    int updateByPrimaryKeySelective(Enroll record);

    int updateByPrimaryKey(Enroll record);
}