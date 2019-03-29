package com.cqnu.harunasandrivingtestingsystem.mapper;

import com.cqnu.harunasandrivingtestingsystem.entity.Roles;

import java.util.List;

public interface RolesMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Roles record);

    int insertSelective(Roles record);

    Roles selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Roles record);

    int updateByPrimaryKey(Roles record);

    /**
     * 根据管理员id 查询角色
     * @param id
     * @return
     */
    List<Roles> selectByAdministratorId(Integer id);

    /**
     * 根据用户id 查询角色
     * @param id
     * @return
     */
    List<Roles> selectByUserId(Integer id);

    /**
     * 根据驾校d 查询角色
     * @param id
     * @return
     */
    List<Roles> selectBySchoolId(Integer id);

}