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

    /**
     * 根据课程id查询报名数
     * @param courseId
     * @return
     */
    int selectCountByCourseId(Integer courseId);

    /**
     * 根据用户id，课程id查询报名
     * @param userId 用户id
     * @param courseId 课程id
     * @return
     */
    Enroll selectByUserIdAndCourseId(@Param("userId") Integer userId, @Param("courseId") Integer courseId);

    /**
     * 根据用户姓名，报名时间查询报名情况
     * @param studentName 用户姓名
     * @param enrollDateBefore 注册时间上限
     * @param enrollDateAfter 注册时间下限
     * @param courseId 课程ID
     * @return
     */
    List<Enroll> selectByStudentNameAndEnrollDateAndCourseName(@Param("studentName") String studentName,
                                                               @Param("enrollDateBefore") LocalDateTime enrollDateBefore,
                                                               @Param("enrollDateAfter") LocalDateTime enrollDateAfter,
                                                               @Param("courseId") Integer courseId);

    /**
     * 根据用户姓名，注册时间查询所有报名信息
     * @param studentName 用户姓名
     * @param enrollDateBefore 注册时间上限
     * @param enrollDateAfter 注册时间下限
     * @return
     */
    List<Enroll> selectAll(@Param("studentName") String studentName,
                           @Param("enrollDateBefore") LocalDateTime enrollDateBefore,
                           @Param("enrollDateAfter") LocalDateTime enrollDateAfter);

    /**
     * 根据用户id 查询报名信息
     * @param userId 用户id
     * @return
     */
    List<Enroll> selectByStudentId(Integer userId);
}