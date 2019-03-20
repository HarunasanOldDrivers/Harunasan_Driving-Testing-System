package com.cqnu.harunasandrivingtestingsystem.service.impl;

import com.cqnu.harunasandrivingtestingsystem.entity.User;
import com.cqnu.harunasandrivingtestingsystem.mapper.UserMapper;
import com.cqnu.harunasandrivingtestingsystem.service.IBaseUserService;
import com.cqnu.harunasandrivingtestingsystem.utils.Password2Hash;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.Random;
import java.util.concurrent.TimeUnit;

/**
 * @author LiAixing
 * @version 1.0
 * @className BaseUserServiceImpl
 * @description TODO
 * @date 2019/2/15 2:08
 **/
@Service
public class BaseUserServiceImpl implements IBaseUserService {

    Logger logger = LoggerFactory.getLogger(BaseUserServiceImpl.class);

    @Autowired
    private RedisTemplate redisTemplate;

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @Resource
    private UserMapper userMapper;



    @Override
    public int signUp(String telephone, String nickname, String password, String email) {
        User user = new User();
        user.setUserTelphone(telephone);
        user.setUserNickname(nickname);
        user.setUserEmail(email);
        user.setUserPassword(Password2Hash.sha256CryptWithSalt(password, String.valueOf(LocalDateTime.now())));
        logger.info("password:" + Password2Hash.sha256CryptWithSalt(password, String.valueOf(LocalDateTime.now())));
        user.setUserRegDate(LocalDateTime.now());
        return userMapper.insertSelective(user);
    }

    @Override
    public boolean loginByTelephone(String telephone, String password) {
        User user = userMapper.selectByTelphone(telephone);
        if (user == null){
            logger.info("User not find");
            return false;
        } else if (user.getUserPassword().equals(Password2Hash.sha256CryptWithSalt(password, String.valueOf(user.getUserRegDate())))){
            return true;
        } else {
            return false;
        }

    }

    @Override
    public String verifyCode(String telephone) {
        String verifyCode = String.valueOf((new Random()).nextInt(899999) + 100000);
        stringRedisTemplate.opsForValue().set("telephone:" + telephone, verifyCode,5, TimeUnit.MINUTES);
        logger.info("verifyCode: " + verifyCode);
        return verifyCode;
    }

    @Override
    public boolean verification(String telephone, String verifyCode) {
        return verifyCode.equals(stringRedisTemplate.opsForValue().get("telephone:" + telephone));
    }

    @Override
    public boolean telephoneHavaExsit(String telephone) {
        return (userMapper.selectByTelphone(telephone)!=null);
    }

}