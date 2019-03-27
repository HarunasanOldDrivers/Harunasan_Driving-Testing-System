package com.cqnu.harunasandrivingtestingsystem.entity.VO;

/**
 * @author LiAixing
 * @version 1.0
 * @className CourseVO
 * @description TODO
 * @date 2019/3/27 0:33
 **/
public class CourseVO {

    private Integer courseId;

    private Integer schoolId;

    private String schoolName;

    private String courseDescribe;

    private String courseName;

    private Integer count;

    private Integer coursePrice;

    public CourseVO(){}

    public CourseVO(Integer courseId, Integer schoolId, String schoolName, String courseDescribe, String courseName, Integer count, Integer coursePrice) {
        this.courseId = courseId;
        this.schoolId = schoolId;
        this.schoolName = schoolName;
        this.courseDescribe = courseDescribe;
        this.courseName = courseName;
        this.count = count;
        this.coursePrice = coursePrice;
    }

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
        this.courseDescribe = courseDescribe;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
    }

    public Integer getCoursePrice() {
        return coursePrice;
    }

    public void setCoursePrice(Integer coursePrice) {
        this.coursePrice = coursePrice;
    }
}
