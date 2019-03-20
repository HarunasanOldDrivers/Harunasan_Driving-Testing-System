package com.cqnu.harunasandrivingtestingsystem;

import com.cqnu.harunasandrivingtestingsystem.utils.RedisUtils;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

/**
 * @author LiAixing
 * @version 1.0
 * @className RedisTest
 * @description TODO
 * @date 2019/3/12 2:21
 **/


public class RedisTest {


    @Resource
    private RedisUtils redisUtils;

    public void add(){
        redisUtils.set("123456","123456",10000);
    }

    public static void main(String[] args) {

    }
}
