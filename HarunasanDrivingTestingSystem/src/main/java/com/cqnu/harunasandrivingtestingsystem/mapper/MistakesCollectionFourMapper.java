package com.cqnu.harunasandrivingtestingsystem.mapper;

import com.cqnu.harunasandrivingtestingsystem.entity.MistakesCollectionFour;

public interface MistakesCollectionFourMapper {
    int deleteByPrimaryKey(Integer mistakesId);

    int insert(MistakesCollectionFour record);

    int insertSelective(MistakesCollectionFour record);

    MistakesCollectionFour selectByPrimaryKey(Integer mistakesId);

    int updateByPrimaryKeySelective(MistakesCollectionFour record);

    int updateByPrimaryKey(MistakesCollectionFour record);
}