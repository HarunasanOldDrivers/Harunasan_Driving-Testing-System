package com.cqnu.harunasandrivingtestingsystem.entity.VO;

/**
 * @author LiAixing
 * @version 1.0
 * @className UserCoursesVO
 * @description TODO
 * @date 2019/3/27 16:57
 **/
public class EnrollVO {

    /**
     * 报名ID
     */
    private Integer enrollId;

    /**
     * 课程ID
     */
    private Integer courseId;

    /**
     * 驾校ID
     */
    private Integer schoolId;

    /**
     * 驾校名称
     */
    private String schoolName;

    /**
     * 课程描述
     */
    private String courseDescribe;

    /**
     * 课程名称
     */
    private String courseName;

    /**
     * 驾校电话
     */
    private String schoolTel;

    /**
     * 驾校详细地址
     */
    private String schoolAddress;

    private Integer coursePrice;

    public EnrollVO(Integer enrollId, Integer courseId, Integer schoolId, String schoolName, String courseDescribe, String courseName, String schoolTel, String schoolAddress, Integer coursePrice) {
        this.enrollId = enrollId;
        this.courseId = courseId;
        this.schoolId = schoolId;
        this.schoolName = schoolName;
        this.courseDescribe = courseDescribe;
        this.courseName = courseName;
        this.schoolTel = schoolTel;
        this.schoolAddress = schoolAddress;
        this.coursePrice = coursePrice;
    }

    public EnrollVO() {
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

    public String getSchoolName() {
        return schoolName;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
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

    public String getSchoolTel() {
        return schoolTel;
    }

    public void setSchoolTel(String schoolTel) {
        this.schoolTel = schoolTel;
    }

    public String getSchoolAddress() {
        return schoolAddress;
    }

    public void setSchoolAddress(String schoolAddress) {
        this.schoolAddress = schoolAddress;
    }

    public Integer getEnrollId() {
        return enrollId;
    }

    public void setEnrollId(Integer enrollId) {
        this.enrollId = enrollId;
    }

    public Integer getCoursePrice() {
        return coursePrice;
    }

    public void setCoursePrice(Integer coursePrice) {
        this.coursePrice = coursePrice;
    }
}
