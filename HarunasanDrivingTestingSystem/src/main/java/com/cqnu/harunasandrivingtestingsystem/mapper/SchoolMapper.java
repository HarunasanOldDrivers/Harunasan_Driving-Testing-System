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

    /**
     * 根据邮箱查找驾校
     * @param email
     * @return
     */
    School selectIdByEmail(String email);

    /**
     * 根据邮箱查找驾校名称
     * @param email
     * @return
     */
    String selectSchoolNameByEmail(String email);

    /**
     * 根据 驾校名称，地区，价格区间查找驾校
     * @param schoolName
     * @param area
     * @param minPrice
     * @param maxPrice
     * @return
     */
    List<School> searchSchools(@Param("schoolName") String schoolName, @Param("area") String area,
                               @Param("minPrice") Integer minPrice, @Param("maxPrice") Integer maxPrice);

    /**
     * 查找所有驾校
     * @return
     */
    List<School> selectAll();

    /**
     * 查找待审核驾校
     * @return
     */
    List<School> selectAuditing();
}