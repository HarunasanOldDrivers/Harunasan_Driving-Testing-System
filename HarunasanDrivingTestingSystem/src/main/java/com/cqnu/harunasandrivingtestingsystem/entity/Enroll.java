package com.cqnu.harunasandrivingtestingsystem.entity;

import java.util.Date;

public class Enroll {
    private Integer enrollId;

    private Integer courseId;

    private Integer userId;

    private Date enrollDateTime;

    public Integer getEnrollId() {
        return enrollId;
    }

    public void setEnrollId(Integer enrollId) {
        this.enrollId = enrollId;
    }

    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Date getEnrollDateTime() {
        return enrollDateTime;
    }

    public void setEnrollDateTime(Date enrollDateTime) {
        this.enrollDateTime = enrollDateTime;
    }
}