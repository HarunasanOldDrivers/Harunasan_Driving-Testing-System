package com.cqnu.harunasandrivingtestingsystem.service;

import com.cqnu.harunasandrivingtestingsystem.entity.User;

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

    int getIdByTelephone(String telephone);
    /**
     *
     * @param telephone
     * @return
     */
    String verifyCode(String telephone);

    boolean verification(String telephone, String verifyCode);

    boolean telephoneHaveExist(String telephone);

    boolean oldPasswordIsCorrect(int id,String oldPassword);

    int alterPassword(int id, String newPassword);

    User getProfile(int id);

    String getNickNameByTelephone(String telephone);

}
