package com.cqnu.harunasandrivingtestingsystem.entity;

/**
 * @author LiAixing
 * @version 1.0
 * @className Result
 * @description TODO
 * @date 2019/3/20 17:45
 **/
public class Result {
    private Integer code;
    private String msg;
    private Object data;

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
