package com.cqnu.harunasandrivingtestingsystem.entity.VO;

import com.cqnu.harunasandrivingtestingsystem.entity.Course;

import java.util.Date;
import java.util.List;

/**
 * @author LiAixing
 * @version 1.0
 * @className SchoolVO
 * @description TODO
 * @date 2019/3/26 3:15
 **/
public class SchoolVO {

    /**
     * 驾校Id
     */
    private Integer schoolId;

    /**
     * 报名电话
     */
    private String schoolEnrollTelephone;

    /**
     * 公司法人姓名
     */
    private String schoolCorporateName;

    /**
     * 公司法人电话
     */
    private String schoolCorporateTel;

    /**
     * 驾校名称
     */
    private String schoolName;

    /**
     * 驾校公司名称
     */
    private String schoolCompanyName;

    /**
     * 驾校创建时间
     */
    private Date schoolStartTime;

    /**
     * 口碑
     */
    private Double schoolPublicPraise;

    /**
     * 驾校描述
     */
    private String schoolIntroduction;

    /**
     * 首页图片
     */
    private String schoolIcon;

    /**
     * 省市县详细地址
     */
    private String address;

    /**
     * 驾校开设课程
     */
    private List<Course> schoolCourses;


    public SchoolVO(Integer schoolId, String schoolEnrollTelephone, String schoolCorporateName, String schoolCorporateTel, String schoolName, String schoolCompanyName, Date schoolStartTime, Double schoolPublicPraise, String schoolIntroduction, String schoolIcon, String Address, List<Course> schoolCourses) {
        this.schoolId = schoolId;
        this.schoolEnrollTelephone = schoolEnrollTelephone;
        this.schoolCorporateName = schoolCorporateName;
        this.schoolCorporateTel = schoolCorporateTel;
        this.schoolName = schoolName;
        this.schoolCompanyName = schoolCompanyName;
        this.schoolStartTime = schoolStartTime;
        this.schoolPublicPraise = schoolPublicPraise;
        this.schoolIntroduction = schoolIntroduction;
        this.schoolIcon = schoolIcon;
        this.address = Address;
        this.schoolCourses = schoolCourses;
    }

    public SchoolVO() {
    }

    public Integer getSchoolId() {
        return schoolId;
    }

    public void setSchoolId(Integer schoolId) {
        this.schoolId = schoolId;
    }

    public String getSchoolEnrollTelephone() {
        return schoolEnrollTelephone;
    }

    public void setSchoolEnrollTelephone(String schoolEnrollTelephone) {
        this.schoolEnrollTelephone = schoolEnrollTelephone;
    }

    public String getSchoolCorporateName() {
        return schoolCorporateName;
    }

    public void setSchoolCorporateName(String schoolCorporateName) {
        this.schoolCorporateName = schoolCorporateName;
    }

    public String getSchoolCorporateTel() {
        return schoolCorporateTel;
    }

    public void setSchoolCorporateTel(String schoolCorporateTel) {
        this.schoolCorporateTel = schoolCorporateTel;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
    }

    public String getSchoolCompanyName() {
        return schoolCompanyName;
    }

    public void setSchoolCompanyName(String schoolCompanyName) {
        this.schoolCompanyName = schoolCompanyName;
    }

    public Date getSchoolStartTime() {
        return schoolStartTime;
    }

    public void setSchoolStartTime(Date schoolStartTime) {
        this.schoolStartTime = schoolStartTime;
    }

    public Double getSchoolPublicPraise() {
        return schoolPublicPraise;
    }

    public void setSchoolPublicPraise(Double schoolPublicPraise) {
        this.schoolPublicPraise = schoolPublicPraise;
    }

    public String getSchoolIntroduction() {
        return schoolIntroduction;
    }

    public void setSchoolIntroduction(String schoolIntroduction) {
        this.schoolIntroduction = schoolIntroduction;
    }

    public String getSchoolIcon() {
        return schoolIcon;
    }

    public void setSchoolIcon(String schoolIcon) {
        this.schoolIcon = schoolIcon;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String Address) {
        this.address = Address;
    }

    public List<Course> getSchoolCourses() {
        return schoolCourses;
    }

    public void setSchoolCourses(List<Course> schoolCourses) {
        this.schoolCourses = schoolCourses;
    }
}
