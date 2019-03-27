package com.cqnu.harunasandrivingtestingsystem.service;

import com.cqnu.harunasandrivingtestingsystem.entity.Course;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.CourseVO;

import java.util.List;

/**
 * @author LiAixing
 * @version 1.0
 * @className ICourseService
 * @description TODO
 * @date 2019/3/26 21:29
 **/
public interface ICourseService {

    /**
     * 添加课程
     * @param username  驾校id
     * @param courseName    课程名称
     * @param courseDescribe    课程描述
     * @param price 课程价格
     * @return  添加成功返回true  失败返回false
     */
    boolean addCourse(Integer username, String courseName, String courseDescribe, Integer price);

    /**
     * 下架课程
     * @param courseId  课程ID
     * @return
     */
    boolean closeCourse(Integer courseId);

    /**
     * 搜索课程
     * @param courseId 课程Id
     * @return
     */
    Course findCourse(Integer courseId);

    /**
     * 获取课程列表( 驾校
     * @param username  驾校ID
     * @return
     */
    List<CourseVO> getCourse(Integer username);
}
