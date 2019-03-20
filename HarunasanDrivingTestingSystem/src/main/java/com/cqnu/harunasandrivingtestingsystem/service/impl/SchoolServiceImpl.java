package com.cqnu.harunasandrivingtestingsystem.service.impl;

import com.cqnu.harunasandrivingtestingsystem.entity.School;
import com.cqnu.harunasandrivingtestingsystem.mapper.SchoolMapper;
import com.cqnu.harunasandrivingtestingsystem.service.ISchoolService;
import com.cqnu.harunasandrivingtestingsystem.utils.Password2Hash;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author LiAixing
 * @version 1.0
 * @className SchoolServiceImpl
 * @description TODO
 * @date 2019/3/20 15:23
 **/
@Service
public class SchoolServiceImpl implements ISchoolService {

    @Resource
    private SchoolMapper schoolMapper;

    @Override
    public String login(String telephone, String password) {
        int schoolId = schoolMapper.selectIdByTelephone(telephone);
        if (schoolId == 0){
            return null;
        }
        password = Password2Hash.sha256CryptWithSalt(password, telephone);


        return null;
    }
}
