package com.cqnu.harunasandrivingtestingsystem.entity.VO;

import com.cqnu.harunasandrivingtestingsystem.entity.Enroll;

import java.time.LocalDateTime;

/**
 * @author LiAixing
 * @version 1.0
 * @className EnrollSL
 * @description TODO
 * @date 2019/3/28 23:27
 **/
public class EnrollSL extends Enroll {


    private String courseName;

    public EnrollSL(Integer enrollId, Integer courseId, Integer userId, LocalDateTime enrollDateTime, String userName, String userTelephone, String courseName) {
        super(enrollId, courseId, userId, enrollDateTime, userName, userTelephone);
        this.courseName = courseName;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }
}
