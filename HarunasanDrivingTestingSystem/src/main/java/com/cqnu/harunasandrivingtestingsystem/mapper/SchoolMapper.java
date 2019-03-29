package com.cqnu.harunasandrivingtestingsystem.mapper;

import com.cqnu.harunasandrivingtestingsystem.entity.School;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface SchoolMapper {
    int deleteByPrimaryKey(Integer schoolId);

    int insert(School record);

    int insertSelective(School record);

    School selectByPrimaryKey(Integer schoolId);

    int updateByPrimaryKeySelective(School record);

    int updateByPrimaryKeyWithBLOBs(School record);

    int updateByPrimaryKey(School record);

    School selectIdByEmail(String telephone);

    String selectSchoolNameByEmail(String email);

    List<School> searchSchools(@Param("schoolName") String school, @Param("area") String area,
                               @Param("minPrice") Integer minPrice, @Param("maxPrice") Integer maxPrice);

    List<School> selectAll();

    List<School> selectAuditing();
}