package com.cqnu.harunasandrivingtestingsystem.mapper;

import com.cqnu.harunasandrivingtestingsystem.entity.MistakesCollectionOne;

public interface MistakesCollectionOneMapper {
    int deleteByPrimaryKey(Integer mistakesId);

    int insert(MistakesCollectionOne record);

    int insertSelective(MistakesCollectionOne record);

    MistakesCollectionOne selectByPrimaryKey(Integer mistakesId);

    int updateByPrimaryKeySelective(MistakesCollectionOne record);

    int updateByPrimaryKey(MistakesCollectionOne record);
}