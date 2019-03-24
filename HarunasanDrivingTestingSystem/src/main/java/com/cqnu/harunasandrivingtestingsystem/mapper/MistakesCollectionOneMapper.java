package com.cqnu.harunasandrivingtestingsystem.mapper;

import com.cqnu.harunasandrivingtestingsystem.entity.MistakesCollectionOne;

public interface MistakesCollectionOneMapper {
    int deleteByPrimaryKey(Integer mistakesId);

    int insert(MistakesCollectionOne record);

    int insertSelective(MistakesCollectionOne record);

    MistakesCollectionOne selectByPrimaryKey(Integer mistakesId);

    Integer selectUserIdByQoId(Integer questionsOneId);

    int updateByPrimaryKeySelective(MistakesCollectionOne record);

    int updateByPrimaryKey(MistakesCollectionOne record);
}