package com.cqnu.harunasandrivingtestingsystem.entity;

public class Course {
    private Integer courseId;

    private Integer schoolId;

    private String courseDescribe;

    private String courseName;

    private Integer coursePrice;

    private Integer courseIsEnable;

    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }

    public Integer getSchoolId() {
        return schoolId;
    }

    public void setSchoolId(Integer schoolId) {
        this.schoolId = schoolId;
    }

    public String getCourseDescribe() {
        return courseDescribe;
    }

    public void setCourseDescribe(String courseDescribe) {
        this.courseDescribe = courseDescribe == null ? null : courseDescribe.trim();
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName == null ? null : courseName.trim();
    }

    public Integer getCoursePrice() {
        return coursePrice;
    }

    public void setCoursePrice(Integer coursePrice) {
        this.coursePrice = coursePrice;
    }

    public Integer getCourseIsEnable() {
        return courseIsEnable;
    }

    public void setCourseIsEnable(Integer courseIsEnable) {
        this.courseIsEnable = courseIsEnable;
    }
}