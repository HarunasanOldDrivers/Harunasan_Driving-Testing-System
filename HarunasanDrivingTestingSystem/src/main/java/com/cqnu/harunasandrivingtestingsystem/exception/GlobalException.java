package com.cqnu.harunasandrivingtestingsystem.exception;

/**
 * @author LiAixing
 * @version 1.0
 * @className GlobalException
 * @description TODO
 * @date 2019/3/25 1:57
 **/
public class GlobalException extends RuntimeException {

    private static final long serialVersionUID = -3252487353460384838L;

    private String exceptionCode;

    private String exceptionMsg;

    public GlobalException() {
        super();
    }

    public GlobalException(String message) {
        super(message);
        exceptionMsg = message;
    }

    public GlobalException(String retCd, String msgDes) {
        super();
        this.exceptionCode = retCd;
        this.exceptionMsg = msgDes;
    }

    public String getRetCd() {
        return exceptionCode;
    }

    public String getMsgDes() {
        return exceptionMsg;
    }

}
