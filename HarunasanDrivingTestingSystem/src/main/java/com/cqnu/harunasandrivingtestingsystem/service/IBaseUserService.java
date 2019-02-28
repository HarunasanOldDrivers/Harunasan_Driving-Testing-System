package com.cqnu.harunasandrivingtestingsystem.service;

/**
 * @author LiAixing
 * @version 1.0
 * @interfaceName IBaseUserService
 * @description TODO
 * @date 2019/2/14 21:18
 **/
public interface IBaseUserService {

    public void register(String telphone, String nickname, String password, String email);

    public void login();

    public void verifyCode(String telphone);
}
