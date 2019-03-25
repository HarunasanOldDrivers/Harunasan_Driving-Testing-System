package com.cqnu.harunasandrivingtestingsystem.service.impl;

import com.cqnu.harunasandrivingtestingsystem.entity.Administrator;
import com.cqnu.harunasandrivingtestingsystem.mapper.AdministratorMapper;
import com.cqnu.harunasandrivingtestingsystem.service.IAdminService;
import com.cqnu.harunasandrivingtestingsystem.utils.Password2Hash;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author LiAixing
 * @version 1.0
 * @className AdminServiceImpl
 * @description TODO
 * @date 2019/3/5 18:22
 **/
@Service
public class AdminServiceImpl implements IAdminService {

    Logger logger = LoggerFactory.getLogger(AdminServiceImpl.class);


    @Resource
    AdministratorMapper administratorMapper;

    @Override
    public int createAdmin(String name, String password, String phone) {
        Administrator administrator = new Administrator();
        administrator.setAdminName(name);
        administrator.setAdminPassword(Password2Hash.sha256CryptWithSalt(password,name));
        administrator.setAdminPhone(phone);
        return administratorMapper.insertSelective(administrator);
    }

    @Override
    public int banAdmin(int id) {
        return 0;
    }

    @Override
    public int deleteAdmin(int id) {
        return 0;
    }

    @Override
    public boolean loginById(int id, String password) {
        Administrator administrator = administratorMapper.selectByPrimaryKey(id);
        if (administrator == null){
            logger.info("Administrator not find");
            throw new UsernameNotFoundException(String.format("No administrator found with id '%s'.", id));
        } else if (administrator.getAdminPassword().equals(Password2Hash.sha256CryptWithSalt(password, String.valueOf(administrator.getAdminName())))){
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean loginByTelephone(String telephone, String password) {
        return false;
    }

    @Override
    public Administrator getInfo(Integer username){
        return administratorMapper.selectByPrimaryKey(username);
    };
}
