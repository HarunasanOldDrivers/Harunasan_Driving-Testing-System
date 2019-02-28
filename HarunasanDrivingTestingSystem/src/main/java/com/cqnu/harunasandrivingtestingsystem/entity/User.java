package com.cqnu.harunasandrivingtestingsystem.entity;

import java.util.Date;

public class User {
    private Integer userId;

    private String userTelphone;

    private String userPassword;

    private String userNickname;

    private String userEmail;

    private Date userEnrollTime;

    private String userNormalPosition;

    private Date userRegDate;

    private Integer userEnable;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUserTelphone() {
        return userTelphone;
    }

    public void setUserTelphone(String userTelphone) {
        this.userTelphone = userTelphone == null ? null : userTelphone.trim();
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword == null ? null : userPassword.trim();
    }

    public String getUserNickname() {
        return userNickname;
    }

    public void setUserNickname(String userNickname) {
        this.userNickname = userNickname == null ? null : userNickname.trim();
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail == null ? null : userEmail.trim();
    }

    public Date getUserEnrollTime() {
        return userEnrollTime;
    }

    public void setUserEnrollTime(Date userEnrollTime) {
        this.userEnrollTime = userEnrollTime;
    }

    public String getUserNormalPosition() {
        return userNormalPosition;
    }

    public void setUserNormalPosition(String userNormalPosition) {
        this.userNormalPosition = userNormalPosition == null ? null : userNormalPosition.trim();
    }

    public Date getUserRegDate() {
        return userRegDate;
    }

    public void setUserRegDate(Date userRegDate) {
        this.userRegDate = userRegDate;
    }

    public Integer getUserEnable() {
        return userEnable;
    }

    public void setUserEnable(Integer userEnable) {
        this.userEnable = userEnable;
    }
}