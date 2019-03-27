package com.cqnu.harunasandrivingtestingsystem.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;

/**
 * @author LiAixing
 */

public class School{

    /**
     * 驾校Id
     */
    private Integer schoolId;

    /**
     * 公司法人姓名
     */
    private String schoolCorporateName;

    /**
     * 公司法人电话
     */
    private String schoolCorporateTel;

    /**
     * 密码
     */
    @JsonIgnore
    private String schoolPassword;

    /**
     * 驾校邮箱
     */
    private String schoolEmail;

    /**
     * 驾校名称
     */
    private String schoolName;

    /**
     * 驾校公司名称
     */
    private String schoolCompanyName;

    /**
     * 驾校认证状态
     */
    private Byte schoolAuthenticationStatus;

    /**
     * 法人身份证图片
     */
    private String schoolCardId;

    /**
     * 报名电话
     */
    private String schoolEnrollTelphone;

    /**
     * 起始价
     */
    private Integer schoolStartPrice;

    /**
     * 营业执照
     */
    private String schoolBusinessLicense;

    /**
     * 驾校信息管理授权书
     */
    private String schoolCertificationLicense;

    /**
     * 社会信用代码
     */
    private String schoolSocialCreditCode;

    /**
     * 所属省
     */
    private String schoolProvince;

    /**
     * 所在城市
     */
    private String schoolCity;

    /**
     * 所在地区
     */
    private String schoolArea;

    /**
     * 详细地址
     */
    private String schoolDetailAddress;

    /**
     * 驾校创建时间
     */
    private Date schoolStartTime;

    /**
     * 审核通过时间
     */
    private Date schoolPassTime;

    /**
     * 口碑
     */
    private Double schoolPublicPraise;

    /**
     * 账号注册时间
     */
    private Date schoolRegDate;

    /**
     * 账号状态
     */
    private Integer schoolEnable;

    /**
     * 驾校描述
     */
    private String schoolIntroduction;

    /**
     * 首页图片
     */
    private String schoolIcon;

    public String getSchoolIcon() {
        return schoolIcon;
    }

    public void setSchoolIcon(String schoolIcon) {
        this.schoolIcon = schoolIcon;
    }

    public Integer getSchoolId() {
        return schoolId;
    }

    public void setSchoolId(Integer schoolId) {
        this.schoolId = schoolId;
    }

    public String getSchoolCorporateName() {
        return schoolCorporateName;
    }

    public void setSchoolCorporateName(String schoolCorporateName) {
        this.schoolCorporateName = schoolCorporateName == null ? null : schoolCorporateName.trim();
    }

    public String getSchoolCorporateTel() {
        return schoolCorporateTel;
    }

    public void setSchoolCorporateTel(String schoolCorporateTel) {
        this.schoolCorporateTel = schoolCorporateTel;
    }

    public String getSchoolPassword() {
        return schoolPassword;
    }

    public void setSchoolPassword(String schoolPassword) {
        this.schoolPassword = schoolPassword == null ? null : schoolPassword.trim();
    }

    public String getSchoolEmail() {
        return schoolEmail;
    }

    public void setSchoolEmail(String schoolEmail) {
        this.schoolEmail = schoolEmail == null ? null : schoolEmail.trim();
    }

    public String getSchoolName() {
        return schoolName;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName == null ? null : schoolName.trim();
    }

    public String getSchoolCompanyName() {
        return schoolCompanyName;
    }

    public void setSchoolCompanyName(String schoolCompanyName) {
        this.schoolCompanyName = schoolCompanyName == null ? null : schoolCompanyName.trim();
    }

    public Byte getSchoolAuthenticationStatus() {
        return schoolAuthenticationStatus;
    }

    public void setSchoolAuthenticationStatus(Byte schoolAuthenticationStatus) {
        this.schoolAuthenticationStatus = schoolAuthenticationStatus;
    }

    public String getSchoolCardId() {
        return schoolCardId;
    }

    public void setSchoolCardId(String schoolCardId) {
        this.schoolCardId = schoolCardId == null ? null : schoolCardId.trim();
    }

    public String getSchoolEnrollTelphone() {
        return schoolEnrollTelphone;
    }

    public void setSchoolEnrollTelphone(String schoolEnrollTelphone) {
        this.schoolEnrollTelphone = schoolEnrollTelphone == null ? null : schoolEnrollTelphone.trim();
    }

    public Integer getSchoolStartPrice() {
        return schoolStartPrice;
    }

    public void setSchoolStartPrice(Integer schoolStartPrice) {
        this.schoolStartPrice = schoolStartPrice;
    }

    public String getSchoolBusinessLicense() {
        return schoolBusinessLicense;
    }

    public void setSchoolBusinessLicense(String schoolBusinessLicense) {
        this.schoolBusinessLicense = schoolBusinessLicense == null ? null : schoolBusinessLicense.trim();
    }

    public String getSchoolCertificationLicense() {
        return schoolCertificationLicense;
    }

    public void setSchoolCertificationLicense(String schoolCertificationLicense) {
        this.schoolCertificationLicense = schoolCertificationLicense == null ? null : schoolCertificationLicense.trim();
    }

    public String getSchoolSocialCreditCode() {
        return schoolSocialCreditCode;
    }

    public void setSchoolSocialCreditCode(String schoolSocialCreditCode) {
        this.schoolSocialCreditCode = schoolSocialCreditCode == null ? null : schoolSocialCreditCode.trim();
    }

    public String getSchoolProvince() {
        return schoolProvince;
    }

    public void setSchoolProvince(String schoolProvince) {
        this.schoolProvince = schoolProvince == null ? null : schoolProvince.trim();
    }

    public String getSchoolCity() {
        return schoolCity;
    }

    public void setSchoolCity(String schoolCity) {
        this.schoolCity = schoolCity == null ? null : schoolCity.trim();
    }

    public String getSchoolArea() {
        return schoolArea;
    }

    public void setSchoolArea(String schoolArea) {
        this.schoolArea = schoolArea == null ? null : schoolArea.trim();
    }

    public String getSchoolDetailAddress() {
        return schoolDetailAddress;
    }

    public void setSchoolDetailAddress(String schoolDetailAddress) {
        this.schoolDetailAddress = schoolDetailAddress == null ? null : schoolDetailAddress.trim();
    }

    public Date getSchoolStartTime() {
        return schoolStartTime;
    }

    public void setSchoolStartTime(Date schoolStartTime) {
        this.schoolStartTime = schoolStartTime;
    }

    public Date getSchoolPassTime() {
        return schoolPassTime;
    }

    public void setSchoolPassTime(Date schoolPassTime) {
        this.schoolPassTime = schoolPassTime;
    }

    public Double getSchoolPublicPraise() {
        return schoolPublicPraise;
    }

    public void setSchoolPublicPraise(Double schoolPublicPraise) {
        this.schoolPublicPraise = schoolPublicPraise;
    }

    public Date getSchoolRegDate() {
        return schoolRegDate;
    }

    public void setSchoolRegDate(Date schoolRegDate) {
        this.schoolRegDate = schoolRegDate;
    }

    public Integer getSchoolEnable() {
        return schoolEnable;
    }

    public void setSchoolEnable(Integer schoolEnable) {
        this.schoolEnable = schoolEnable;
    }

    public String getSchoolIntroduction() {
        return schoolIntroduction;
    }

    public void setSchoolIntroduction(String schoolIntroduction) {
        this.schoolIntroduction = schoolIntroduction == null ? null : schoolIntroduction.trim();
    }

}