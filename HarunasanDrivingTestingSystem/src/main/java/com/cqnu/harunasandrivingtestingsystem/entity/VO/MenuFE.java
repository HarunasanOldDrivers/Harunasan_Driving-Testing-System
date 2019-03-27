package com.cqnu.harunasandrivingtestingsystem.entity.VO;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

/**
 * @author LiAixing
 * @version 1.0
 * @className MenuFE
 * @description TODO
 * @date 2019/3/26 18:28
 **/
public class MenuFE {

    private Integer pid;

    private String resources;

    private String title;

    @JsonIgnore
    private List<MenuFE> children;

    public MenuFE() {
    }

    public MenuFE(Integer pid, String resources, String title) {
        this.pid = pid;
        this.resources = resources;
        this.title = title;
    }

    public Integer getPid() {
        return pid;
    }

    public void setPid(Integer pid) {
        this.pid = pid;
    }

    public String getResources() {
        return resources;
    }

    public void setResources(String resources) {
        this.resources = resources;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<MenuFE> getChildren() {
        return children;
    }

    public void setChildren(List<MenuFE> children) {
        this.children = children;
    }
}
