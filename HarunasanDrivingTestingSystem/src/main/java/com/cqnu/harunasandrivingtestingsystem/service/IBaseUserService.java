package com.cqnu.harunasandrivingtestingsystem.service;

import com.cqnu.harunasandrivingtestingsystem.entity.User;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.EnrollVO;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.PageInfo;

import java.util.List;

/**
 * @author LiAixing
 * @version 1.0
 * @interfaceName IBaseUserService
 * @description TODO
 * @date 2019/2/14 21:18
 **/
public interface IBaseUserService {

    /**
     * 普通用户注册
     * @param telephone 电话号码
     * @param nickname 昵称
     * @param password 密码
     * @param email 邮箱
     * @return
     */
    int signUp(String telephone, String nickname, String password, String email);

    /**
     * 登录
     * @param telephone 电话
     * @param password 密码
     * @return
     */
    boolean loginByTelephone(String telephone, String password);

    /**
     * 根据电话号码获取用户Id
     * @param telephone 电话号码
     * @return 用户id
     */
    int getIdByTelephone(String telephone);

    /**
     * 生成验证码并放入缓存
     * @param telephone 电话号码
     * @return
     */
    String verifyCode(String telephone);

    /**
     * 验证验证码
     * @param telephone 电话号码
     * @param verifyCode 验证码
     * @return
     */
    boolean verification(String telephone, String verifyCode);

    /**
     * 检测电话号码是否已经注册过
     * @param telephone 电话号码
     * @return
     */
    boolean telephoneHaveExist(String telephone);

    /**
     * 检测旧密码是否正确
     * @param id 用户id
     * @param oldPassword 密码
     * @return
     */
    boolean oldPasswordIsCorrect(Integer id,String oldPassword);

    /**
     * 修改密码
     * @param id 用户id
     * @param newPassword 新密码
     * @return
     */
    int alterPassword(Integer id, String newPassword);

    /**
     * 获取用户个人资料
     * @param id 用户id
     * @return
     */
    User getProfile(Integer id);

    /**
     * 根据电话号码获取昵称
     * @param telephone 电话号码
     * @return
     */
    String getNickNameByTelephone(String telephone);

    /**
     * 报名
     * @param userId 用户id
     * @param courseId 课程id
     * @param username 报名人姓名
     * @param telephone 报名人电话
     * @return
     */
    boolean enroll(Integer userId, Integer courseId, String username, String telephone);

    /**
     * 获取用户报名信息
     * @param username 用户id
     * @param pageNo 当前页
     * @param pageSize 分页大小
     * @return
     */
    PageInfo<EnrollVO> getEnroll(Integer username, Integer pageNo, Integer pageSize);

    /**
     * 获取用户列表
     * @return
     */
    List<User> getUserList();
}
