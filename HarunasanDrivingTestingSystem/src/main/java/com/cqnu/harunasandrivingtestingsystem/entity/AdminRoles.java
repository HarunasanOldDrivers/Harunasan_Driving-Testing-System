package com.cqnu.harunasandrivingtestingsystem.entity;

public class AdminRoles {
    private Integer id;

    private Integer aid;

    private Integer rid;

    public AdminRoles() {
    }

    public AdminRoles(Integer id, Integer rid) {
        this.id = id;
        this.rid = rid;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getAid() {
        return aid;
    }

    public void setAid(Integer aid) {
        this.aid = aid;
    }

    public Integer getRid() {
        return rid;
    }

    public void setRid(Integer rid) {
        this.rid = rid;
    }
}