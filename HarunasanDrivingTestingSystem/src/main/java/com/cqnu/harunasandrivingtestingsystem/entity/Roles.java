package com.cqnu.harunasandrivingtestingsystem.entity;


public class Roles {
    private Integer id;

    private String name;

    private String alias;

    public Roles(Integer id, String name, String alias) {
        this.id = id;
        this.name = name;
        this.alias = alias;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias == null ? null : alias.trim();
    }
}