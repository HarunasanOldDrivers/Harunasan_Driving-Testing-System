package com.cqnu.harunasandrivingtestingsystem.security;

import com.cqnu.harunasandrivingtestingsystem.entity.*;
import com.cqnu.harunasandrivingtestingsystem.mapper.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

import static com.alibaba.druid.sql.ast.SQLPartitionValue.Operator.List;

/**
 * @author LiAixing
 * @version 1.0
 * @className UserDetailsServiceImpl
 * @description TODO
 * @date 2019/3/17 14:39
 **/
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    Logger logger = LoggerFactory.getLogger(UserDetailsServiceImpl.class);

    private String typeAdministrator = "Administrator";
    private String typeUser = "User";
    private String typeSchool = "School";

    @Resource
    private UserMapper userMapper;

    @Resource
    private AdministratorMapper administratorMapper;

    @Resource
    private SchoolMapper schoolMapper;

    @Resource
    private RolesMapper rolesMapper;

    @Resource
    private PermissionsMapper permissionsMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return null;
    }

    /**
     * 获取 userDetail
     * @param username
     * @return
     * @throws UsernameNotFoundException
     */
    public UserDetails loadUserByUsername(String username,String type) throws UsernameNotFoundException {

        if (typeAdministrator.equals(type)){
            Administrator administrator = this.administratorMapper.selectByPrimaryKey(Integer.valueOf(username));
            if (administrator == null) {
                logger.info("No administrator found");
                throw new UsernameNotFoundException(String.format("No administrator found with username '%s'.", username));
            } else {
                logger.info("Finded administrator");
                return new BaseUserDetails(administrator.getId(), administrator.getEnable(),
                        rolesMapper.selectByAdministratorId(Integer.valueOf(username)),
                        permissionsMapper.selectByAdministratorId(Integer.valueOf(username)));
            }
        } else if (typeUser.equals(type)){
//            User user = this.userMapper.selectByTelphone(username);
            User user = this.userMapper.selectByPrimaryKey(Integer.valueOf(username));
            if (user == null) {
                logger.info("No user found");
                throw new UsernameNotFoundException(String.format("No user found with username '%s'.", username));
            } else {
                logger.info("Finded user");
                return new BaseUserDetails(user.getUserId(), user.getUserEnable(),
                        rolesMapper.selectByUserId(Integer.valueOf(username)),
                        permissionsMapper.selectByUserId(Integer.valueOf(username)));
            }
        } else if (typeSchool.equals(type)){
            School school = this.schoolMapper.selectByPrimaryKey(Integer.valueOf(username));
            if (school == null) {
                logger.info("No school found");
                throw new UsernameNotFoundException(String.format("No school found with username '%s'.", username));
            } else {
                logger.info("Finded school");
                return new BaseUserDetails(school.getSchoolId(), school.getSchoolEnable(),
                        rolesMapper.selectBySchoolId(Integer.valueOf(username)),
                        permissionsMapper.selectBySchoolId(Integer.valueOf(username)));
            }
        } else {
            logger.info("User type error");
            throw new UsernameNotFoundException(String.format("No user found with username '%s'.", username));
        }

    }


}

