package com.cqnu.harunasandrivingtestingsystem.service.impl;

import com.cqnu.harunasandrivingtestingsystem.entity.*;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.AdminFE;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.AdminInfo;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.MenuFE;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.PageInfo;
import com.cqnu.harunasandrivingtestingsystem.mapper.*;
import com.cqnu.harunasandrivingtestingsystem.service.IAdminService;
import com.cqnu.harunasandrivingtestingsystem.utils.Password2Hash;
import com.cqnu.harunasandrivingtestingsystem.utils.SendSMS;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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

    private static final String AUDIT_REASON = "信息不完整";

    @Resource
    private AdministratorMapper administratorMapper;

    @Resource
    private PermissionsMapper permissionsMapper;

    @Resource
    private RolesMapper rolesMapper;

    @Resource
    private SchoolMapper schoolMapper;

    @Resource
    private AdminRolesMapper adminRolesMapper;

    @Resource
    private UserMapper userMapper;

    @Autowired
    private SendSMS sendSMS;

    @Override
    public int createAdmin(String name, String password, String phone, Integer role) {
        Administrator administrator = new Administrator();
        administrator.setAdminName(name);
        // 对密码进行加密
        administrator.setAdminPassword(Password2Hash.sha256CryptWithSalt(password,name));
        String pwd = Password2Hash.sha256CryptWithSalt(password,name);
        administrator.setAdminPhone(phone);
        if (administratorMapper.insertSelective(administrator) == 1){
            Administrator administrator1 = administratorMapper.selectByString(pwd);
            AdminRoles adminRoles = new AdminRoles(administrator1.getId(), role);
            return adminRolesMapper.insertSelective(adminRoles);
        }
        return 0;

    }

    @Override
    public int banAdmin(int id, Integer status) {
        Administrator administrator = administratorMapper.selectByPrimaryKey(id);
        administrator.setEnable(status);
        return administratorMapper.updateByPrimaryKeySelective(administrator);
    }

    @Override
    public int banSchool(int id, Integer status) {
        School school= schoolMapper.selectByPrimaryKey(id);
        school.setSchoolEnable(status);
        return schoolMapper.updateByPrimaryKeySelective(school);
    }

    @Override
    public int banUser(int id, Integer status) {
        User user = userMapper.selectByPrimaryKey(id);
        user.setUserEnable(status);
        return userMapper.updateByPrimaryKeySelective(user);
    }

    @Override
    public int deleteAdmin(int id) {
        return administratorMapper.deleteByPrimaryKey(id);
    }

    @Override
    public boolean loginById(int id, String password) {
        Administrator administrator = administratorMapper.selectByPrimaryKey(id);
        if (administrator == null){
            logger.info("Administrator not find");
            return false;
        } else if (administrator.getAdminPassword().equals(Password2Hash.sha256CryptWithSalt(password, String.valueOf(administrator.getAdminName())))){
            return true;
        } else {
            return false;
        }
    }

    @Override
    public AdminFE getInfo(Integer username){
        Administrator administrator = administratorMapper.selectByPrimaryKey(username);
        List<Permissions> permissionsList = permissionsMapper.selectByAdministratorId(username);
        List<Roles> rolesList = rolesMapper.selectByAdministratorId(username);
        AdminFE adminFE = new AdminFE(administrator.getId(),null, administrator.getAdminName(), administrator.getAdminPhone());
        List<MenuFE> menus = new ArrayList<>();
        for (Permissions permissions : permissionsList){
            if (permissions.getAlias().startsWith("Admin:")){
                continue;
            }
            MenuFE menuFE = new MenuFE(permissions.getId(),permissions.getAlias(),permissions.getName());
            menus.add(menuFE);
        }
        adminFE.setMenus(menus);
        adminFE.setRoles(rolesList);
        logger.info("menus:" + String.valueOf(menus.isEmpty()));
        logger.info("roles:" + String.valueOf(rolesList.isEmpty()));

        return adminFE;
    }

    @Override
    public PageInfo<AdminInfo> getList(Integer pageNum, Integer pageSize) {
        Page page = PageHelper.startPage(pageNum, pageSize);
        List<Administrator> administratorList = administratorMapper.selectAll();
        PageInfo<AdminInfo> pageInfo = new PageInfo<>(page);
        List<AdminInfo> adminInfoList = new ArrayList<>();
        for (Administrator administrator : administratorList){
            AdminInfo adminInfo = new AdminInfo(administrator.getId(), administrator.getAdminName(), administrator.getAdminPassword(), administrator.getAdminPhone(), administrator.getEnable(), rolesMapper.selectByAdministratorId(administrator.getId()).get(0).getName());
            adminInfoList.add(adminInfo);
        }
        pageInfo.setList(adminInfoList);

        return  pageInfo;
    }

    @Override
    public boolean audit(Integer schoolId, Integer status, String text){
        School school = schoolMapper.selectByPrimaryKey(schoolId);
        if (school == null){
            logger.warn("School not found: ");
            return false;
        }
        school.setSchoolAuthenticationStatus((byte)status.intValue());
        school.setSchoolPassTime(new Date());
        if (status == 2){
            if(schoolMapper.deleteByPrimaryKey(schoolId) == 1){
                if (StringUtils.isEmpty(text)){
                    sendSMS.sendSMSAudit(school.getSchoolCorporateTel(),school.getSchoolName(),AUDIT_REASON);
                }
                sendSMS.sendSMSAudit(school.getSchoolCorporateTel(),school.getSchoolName(),text);
                return true;
            }
            return false;
        } else if ( schoolMapper.updateByPrimaryKeySelective(school) == 1){
            sendSMS.sendSMSAudit2(school.getSchoolCorporateTel(),school.getSchoolName());
            return true;
        }
        return false;
    }

    @Override
    public PageInfo<AdminInfo> search(Integer pageNum, Integer pageSize, String adminName, Integer roleId){
        Page page = PageHelper.startPage(pageNum, pageSize);
        List<Administrator> administratorList;
        if (roleId != null) {
            administratorList = administratorMapper.selectByRoleAndName(adminName, roleId);
        }else {
            administratorList = administratorMapper.selectByName(adminName);
        }
        PageInfo<AdminInfo> pageInfo = new PageInfo<>(page);
        List<AdminInfo> adminInfoList = new ArrayList<>();
        for (Administrator administrator : administratorList){
            AdminInfo adminInfo = new AdminInfo(administrator.getId(), administrator.getAdminName(), administrator.getAdminPassword(), administrator.getAdminPhone(), administrator.getEnable(), rolesMapper.selectByAdministratorId(administrator.getId()).get(0).getName());
            adminInfoList.add(adminInfo);
        }
        pageInfo.setList(adminInfoList);

        return  pageInfo;
    }

    @Override
    public PageInfo<School> searchSchool(Integer pageNum, Integer pageSize, String schoolName){
        Page page = PageHelper.startPage(pageNum, pageSize);
        List<School> schoolList = schoolMapper.selectBySchoolName(schoolName);
        PageInfo<School> pageInfo = new PageInfo<>(page);
        pageInfo.setList(schoolList);

        return  pageInfo;
    }

    @Override
    public PageInfo<School> searchAudtingSchool(Integer pageNum, Integer pageSize, String schoolName){
        Page page = PageHelper.startPage(pageNum, pageSize);
        List<School> schoolList = schoolMapper.selectAuditingBySchoolName(schoolName);
        PageInfo<School> pageInfo = new PageInfo<>(page);
        pageInfo.setList(schoolList);

        return  pageInfo;
    }

    @Override
    public PageInfo<User> searchUser(Integer pageNum, Integer pageSize, String userName){
        Page page = PageHelper.startPage(pageNum, pageSize);
        List<User> userList = userMapper.selectByName(userName);
        PageInfo<User> pageInfo = new PageInfo<>(page);
        pageInfo.setList(userList);

        return  pageInfo;
    }

    @Override
    public int updateAdmin(Integer adminId, String adminName, String adminTel, Integer roleId, String newPassword) {
        Administrator administrator = administratorMapper.selectByPrimaryKey(adminId);
        AdminRoles adminRoles = adminRolesMapper.selectByAdminId(adminId);
        logger.warn(String.valueOf(administrator == null));
        logger.warn(String.valueOf(adminRoles == null));
        if (administrator == null || adminRoles == null){
            return 0;
        }
        administrator.setAdminName(adminName);
        administrator.setAdminPhone(adminTel);
        if (!StringUtils.isEmpty(newPassword)) {
            administrator.setAdminPassword(Password2Hash.sha256CryptWithSalt(newPassword, administrator.getAdminName()));
        }
        adminRoles.setRid(roleId);
        return administratorMapper.updateByPrimaryKeySelective(administrator) + adminRolesMapper.updateByPrimaryKeySelective(adminRoles);
    }
}
