package com.cqnu.harunasandrivingtestingsystem.service.impl;

import com.cqnu.harunasandrivingtestingsystem.entity.*;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.AdminFE;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.AdminInfo;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.MenuFE;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.PageInfo;
import com.cqnu.harunasandrivingtestingsystem.mapper.*;
import com.cqnu.harunasandrivingtestingsystem.service.IAdminService;
import com.cqnu.harunasandrivingtestingsystem.utils.Password2Hash;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
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
    public boolean audit(Integer schoolId, Integer status){
        School school = schoolMapper.selectByPrimaryKey(schoolId);
        if (school == null){
            logger.warn("School not found: ");
            throw new UsernameNotFoundException("School not found");
        }
        school.setSchoolAuthenticationStatus((byte)status.intValue());
        return schoolMapper.updateByPrimaryKeySelective(school) == 1;
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
    public int updateAdmin(Integer adminId, String adminName, String adminTel, Integer roleId) {
        Administrator administrator = administratorMapper.selectByPrimaryKey(adminId);
        AdminRoles adminRoles = adminRolesMapper.selectByAdminId(adminId);
        logger.warn(String.valueOf(administrator == null));
        logger.warn(String.valueOf(adminRoles == null));
        if (administrator == null || adminRoles == null){
            return 0;
        }
        administrator.setAdminName(adminName);
        administrator.setAdminPhone(adminTel);
        adminRoles.setRid(roleId);
        return administratorMapper.updateByPrimaryKeySelective(administrator) + adminRolesMapper.updateByPrimaryKeySelective(adminRoles);
    }
}
