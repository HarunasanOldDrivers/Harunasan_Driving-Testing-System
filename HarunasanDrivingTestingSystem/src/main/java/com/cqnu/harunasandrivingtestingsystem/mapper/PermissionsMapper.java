package com.cqnu.harunasandrivingtestingsystem.mapper;

import com.cqnu.harunasandrivingtestingsystem.entity.Permissions;

import java.util.List;

public interface PermissionsMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Permissions record);

    int insertSelective(Permissions record);

    Permissions selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Permissions record);

    int updateByPrimaryKey(Permissions record);

    /**
     * 根据管理员id 查询权限
     * @param id
     * @return
     */
    List<Permissions> selectByAdministratorId(Integer id);

    /**
     * 根据用户id 查询权限
     * @param id
     * @return
     */
    List<Permissions> selectByUserId(Integer id);

    /**
     * 根据驾校id 查询权限
     * @param id
     * @return
     */
    List<Permissions> selectBySchoolId(Integer id);
}