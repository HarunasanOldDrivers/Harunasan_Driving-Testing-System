package com.cqnu.harunasandrivingtestingsystem.security;

import com.cqnu.harunasandrivingtestingsystem.entity.Permissions;
import com.cqnu.harunasandrivingtestingsystem.entity.Roles;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

/**
 * @author LiAixing
 * @version 1.0
 * @className BaseUserDetails
 * @description TODO
 * @date 2019/3/17 14:48
 **/
public class BaseUserDetails implements UserDetails {

    Logger logger = LoggerFactory.getLogger(BaseUserDetails.class);

    private int id;

    private int isEnable;

    // 用户角色列表
    private List<Roles> rolesList = null;

    // 用户权限列表
    private List<Permissions> permissoinsList = null;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getIsEnable() {
        return isEnable;
    }

    public void setIsEnable(int isEnable) {
        this.isEnable = isEnable;
    }

    public List<Roles> getRolesList() {
        return rolesList;
    }

    public void setRolesList(List<Roles> rolesList) {
        this.rolesList = rolesList;
    }

    public List<Permissions> getPermissoinsList() {
        return permissoinsList;
    }

    public void setPermissoinsList(List<Permissions> permissoinsList) {
        this.permissoinsList = permissoinsList;
    }

    public BaseUserDetails(int id, int isEnable, List<Roles> rolesList, List<Permissions> permissoinsList){
        this.id = id;
        this.isEnable = isEnable;
        this.rolesList = rolesList;
        this.permissoinsList = permissoinsList;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        StringBuilder authoritiesBuilder = new StringBuilder();
        List<Roles> tempRolesList = this.getRolesList();
        if (null != tempRolesList) {
            for (Roles roles : tempRolesList) {
                authoritiesBuilder.append(",").append(roles.getAlias());
            }
        }
        List<Permissions> tempPermissionsList = this.getPermissoinsList();
        if (null != tempPermissionsList) {
            for (Permissions permissions : tempPermissionsList) {
                authoritiesBuilder.append(",").append(permissions.getAlias());
            }
        }
        String authoritiesStr = "";
        if(authoritiesBuilder.length()>0) {
            authoritiesStr = authoritiesBuilder.deleteCharAt(0).toString();
        }
        logger.info("UserDetails getAuthorities [authoritiesStr={} ", authoritiesStr);
        return AuthorityUtils.commaSeparatedStringToAuthorityList(authoritiesStr);
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
