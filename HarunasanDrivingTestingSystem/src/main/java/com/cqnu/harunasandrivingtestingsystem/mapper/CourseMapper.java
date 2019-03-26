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

    Course selectBySchoolIdOrderByPrice(Integer schoolId);

    List<Course> selectBySchoolId(Integer schoolId);
}