package com.cqnu.harunasandrivingtestingsystem.mapper;

import com.cqnu.harunasandrivingtestingsystem.entity.Course;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CourseMapper {
    int deleteByPrimaryKey(Integer courseId);

    int insert(Course record);

    int insertSelective(Course record);

    Course selectByPrimaryKey(Integer courseId);

    int updateByPrimaryKeySelective(Course record);

    int updateByPrimaryKey(Course record);

    /**
     * 根据驾校id查询课程
     * @param schoolId 驾校id
     * @return
     */
    Course selectBySchoolIdOrderByPrice(Integer schoolId);

    /**
     * 根据驾校id查询所有课程
     * @param schoolId 驾校id
     * @return
     */
    List<Course> selectBySchoolId(Integer schoolId);

    /**
     * 查询所有课程
     * @return
     */
    List<Course> selectAll();
}