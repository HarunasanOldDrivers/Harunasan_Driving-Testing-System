package com.cqnu.harunasandrivingtestingsystem.entity.VO;

import com.cqnu.harunasandrivingtestingsystem.entity.Administrator;
import com.cqnu.harunasandrivingtestingsystem.entity.Roles;

import java.util.Date;
import java.util.Set;

/**
 * @author LiAixing
 * @version 1.0
 * @className AdminFE
 * @description TODO
 * @date 2019/3/26 17:44
 **/
public class AdminFE {

    // 账号
    private Integer uid;

    private String avatar;

    private String nickname;

    private String telephone;

    private Set<Roles> roles;

    private Set<MenuFE> menus;

    public Administrator toSysAdmin() {
        Administrator administrator = new Administrator();
        administrator.setId(this.uid);
        administrator.setAdminName(this.nickname);
        administrator.setAdminPhone(this.telephone);
        return administrator;
    }

    public AdminFE(Integer uid, String avatar, String nickname, String telephone, Set<Roles> roles, Set<MenuFE> menus) {
        this.uid = uid;
        this.avatar = avatar;
        this.nickname = nickname;
        this.telephone = telephone;
        this.roles = roles;
        this.menus = menus;
    }

    public AdminFE(Integer uid, String avatar, String nickname, String telephone) {
        this.uid = uid;
        this.avatar = avatar;
        this.nickname = nickname;
        this.telephone = telephone;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public Set<Roles> getRoles() {
        return roles;
    }

    public void setRoles(Set<Roles> roles) {
        this.roles = roles;
    }

    public Set<MenuFE> getMenus() {
        return menus;
    }

    public void setMenus(Set<MenuFE> menus) {
        this.menus = menus;
    }
}
