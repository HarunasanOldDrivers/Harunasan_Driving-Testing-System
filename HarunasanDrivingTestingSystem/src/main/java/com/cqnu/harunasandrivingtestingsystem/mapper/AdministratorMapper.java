package com.cqnu.harunasandrivingtestingsystem.mapper;

import com.cqnu.harunasandrivingtestingsystem.entity.Administrator;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdministratorMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Administrator record);

    int insertSelective(Administrator record);

    Administrator selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Administrator record);

    int updateByPrimaryKey(Administrator record);

    /**
     * 查询所有管理员
     * @return
     */
    List<Administrator> selectAll();

    /**
     * 根据管理员姓名和权限id查询管理员
     * @param adminName 管理员姓名
     * @param roleId 权限id
     * @return
     */
    List<Administrator> selectByRoleAndName(@Param("adminName") String adminName, @Param("roleId") Integer roleId);

    /**
     * 根据管理员姓名查询
     * @param adminName 管理员姓名
     * @return
     */
    List<Administrator> selectByName(String adminName);

    Administrator selectByString(String adminName);

    boolean createNews();
}