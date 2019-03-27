package com.cqnu.harunasandrivingtestingsystem.mapper;

import com.cqnu.harunasandrivingtestingsystem.entity.MistakesCollectionFour;
import org.apache.ibatis.annotations.Param;

public interface MistakesCollectionFourMapper {

    int deleteByPrimaryKey(Integer mistakesId);

    int insert(MistakesCollectionFour record);

    int insertSelective(MistakesCollectionFour record);

    MistakesCollectionFour selectByPrimaryKey(Integer mistakesId);

    Integer selectUserIdByQoId(Integer questionsFourId);

    Integer selectUserIdByQoIdAndUserId(@Param("questionsOneId") Integer questionsOneId, @Param("userId") Integer userId);

    int updateByPrimaryKeySelective(MistakesCollectionFour record);

    int updateByPrimaryKey(MistakesCollectionFour record);

    int deleteByUserIdAndQuestionId(@Param("userId") Integer userId, @Param("questionsId") Integer questionsId);
}