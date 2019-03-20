package com.cqnu.harunasandrivingtestingsystem.service;

/**
 * @author LiAixing
 * @version 1.0
 * @interfaceName IBaseUserService
 * @description TODO
 * @date 2019/2/14 21:18
 **/
public interface IBaseUserService {

    int signUp(String telephone, String nickname, String password, String email);

    boolean loginByTelephone(String telephone, String password);

    /**
     *
     * @param telephone
     * @return
     */
    String verifyCode(String telephone);

    boolean verification(String telephone, String verifyCode);

    boolean telephoneHavaExsit(String telephone);
}
