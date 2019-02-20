package com.cqnu.harunasandrivingtestingsystem.index.controller;

import com.cqnu.harunasandrivingtestingsystem.index.controller.User;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.Reader;
import java.util.Date;
import java.util.List;

/**
 * Author： fanyafeng
 * Data： 16/10/11 14:58
 * Email: fanyafeng@live.cn
 */
public class UserTest {
    private static SqlSessionFactory sqlSessionFactory;
    private static Reader reader;

    static {
        try {
            reader = Resources.getResourceAsReader("Configuration.xml");
            sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        SqlSession sqlSession = sqlSessionFactory.openSession();
        try {
//            User user = (User) sqlSession.selectOne("com.cqnu.harunasandrivingtestingsystem.index.controller.IUserDao.selectUserById", 2);
//            System.out.println(user.getAddress() + user.getSex() + user.getBirthday());
//            System.out.println(user.getId() + user.getUsername());
//
//
            List<User> userList = sqlSession.selectOne("com.cqnu.harunasandrivingtestingsystem.index.controller.IUserDao.queryUserByName", "%李咏%");

              for(int i=0;i<userList.size();i++){
                  System.out.println(userList.get(i).toString());
              }


            User user = new User();
            user.setId(100);
            user.setBirthday(new Date());
            user.setUsername("李宁");
            user.setSex("女");
            user.setAddress("家里蹲");
            int isAdd = sqlSession.insert("com.cqnu.harunasandrivingtestingsystem.index.controller.dao.IUserDao.add", user);
            sqlSession.commit();//不要忘记
        } finally {
            sqlSession.close();
        }
    }


}
