package com.cqnu.harunasandrivingtestingsystem.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

/**
 * @author LiAixing
 * @version 1.0
 * @className BaseUserDetails
 * @description TODO
 * @date 2019/3/17 14:48
 **/
public class BaseUserDetails implements UserDetails {

    private int id;

    private int isEnable;


    public BaseUserDetails(int id, int isEnable){
        this.id = id;
        this.isEnable = isEnable;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return String.valueOf(this.id);
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return this.isEnable == 1;
    }
}
