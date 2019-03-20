package com.cqnu.harunasandrivingtestingsystem.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Date;

/**
 * @author LiAixing
 */
public class User {

    private Integer userId;

    private String userTelphone;

    @JsonIgnore
    private String userPassword;

    private String userNickname;

    private String userEmail;

    private Date userEnrollTime;

    private String userNormalPosition;

    private LocalDateTime userRegDate;

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

    public LocalDateTime getUserRegDate() {
        return userRegDate;
    }

    public void setUserRegDate(LocalDateTime userRegDate) {
        this.userRegDate = userRegDate;
    }

    public Integer getUserEnable() {
        return userEnable;
    }

    public void setUserEnable(Integer userEnable) {
        this.userEnable = userEnable;
    }
}