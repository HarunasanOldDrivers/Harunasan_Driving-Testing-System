package com.cqnu.harunasandrivingtestingsystem.entity;

import java.time.LocalDateTime;
import java.util.Date;

public class Enroll {
    private Integer enrollId;

    private Integer courseId;

    private Integer userId;

    private LocalDateTime enrollDateTime;

    private String userName;

    private String userTelephone;

    public Enroll() {
    }

    public Enroll(Integer courseId, Integer userId, LocalDateTime enrollDateTime, String userName, String userTelephone) {
        this.courseId = courseId;
        this.userId = userId;
        this.enrollDateTime = enrollDateTime;
        this.userName = userName;
        this.userTelephone = userTelephone;
    }

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

    public LocalDateTime getEnrollDateTime() {
        return enrollDateTime;
    }

    public void setEnrollDateTime(LocalDateTime enrollDateTime) {
        this.enrollDateTime = enrollDateTime;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserTelephone() {
        return userTelephone;
    }

    public void setUserTelephone(String userTelephone) {
        this.userTelephone = userTelephone;
    }
}