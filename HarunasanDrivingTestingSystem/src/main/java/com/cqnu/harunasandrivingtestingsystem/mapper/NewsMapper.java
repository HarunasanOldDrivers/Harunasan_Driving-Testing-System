package com.cqnu.harunasandrivingtestingsystem.mapper;

import com.cqnu.harunasandrivingtestingsystem.entity.News;

import java.util.List;

public interface NewsMapper {
    int deleteByPrimaryKey(Integer newsId);

    int insert(News record);

    int insertSelective(News record);

    News selectByPrimaryKey(Integer newsId);

    int updateByPrimaryKeySelective(News record);

    int updateByPrimaryKeyWithBLOBs(News record);

    int updateByPrimaryKey(News record);

    /**
     * 根据类型查询所有资讯
     * @param type
     * @return
     */
    List<News> selectByType(Integer type);

    /**
     * 查询所有资讯
     * @return
     */
    List<News> selectAll();
}