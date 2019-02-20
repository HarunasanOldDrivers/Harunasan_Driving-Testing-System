package com.cqnu.harunasandrivingtestingsystem.index.controller;

import com.cqnu.harunasandrivingtestingsystem.index.controller.User;

import java.util.List;

public interface IUserDao {
    public List<User> queryUserByName(String name);

    public User selectUserById(int id);

    public void add();

    public void del(int id);

    public void alter(int id);

}
