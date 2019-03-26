package com.cqnu.harunasandrivingtestingsystem.mapper;

import com.cqnu.harunasandrivingtestingsystem.entity.Enroll;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface EnrollMapper {
    int deleteByPrimaryKey(Integer enrollId);

    int insert(Enroll record);

    int insertSelective(Enroll record);

    Enroll selectByPrimaryKey(Integer enrollId);

    int updateByPrimaryKeySelective(Enroll record);

    int updateByPrimaryKey(Enroll record);

    int selectCountByCourseId(Integer courseId);

    Enroll selectByUserIdAndCourseId(@Param("userId") Integer userId, @Param("courseId") Integer courseId);

    List<Enroll> selectByStudentNameAndEnrollDateAndCourseName(@Param("studentName") String studentName,
                                                               @Param("enrollDateBefore") LocalDateTime enrollDateBefore,
                                                               @Param("enrollDateAfter") LocalDateTime enrollDateAfter,
                                                               @Param("courseId") Integer courseId);
}