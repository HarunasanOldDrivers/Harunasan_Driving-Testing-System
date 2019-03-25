package com.cqnu.harunasandrivingtestingsystem.mapper;

import com.cqnu.harunasandrivingtestingsystem.entity.MistakesCollectionOne;
import com.cqnu.harunasandrivingtestingsystem.entity.QuestionsOne;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface MistakesCollectionOneMapper {

    int deleteByPrimaryKey(Integer mistakesId);

    int insert(MistakesCollectionOne record);

    int insertSelective(MistakesCollectionOne record);

    MistakesCollectionOne selectByPrimaryKey(Integer mistakesId);

    Integer selectUserIdByQoId(Integer questionsOneId);

    int updateByPrimaryKeySelective(MistakesCollectionOne record);

    int updateByPrimaryKey(MistakesCollectionOne record);

    int deleteByUserIdAndQuestionId(@Param("userId") Integer userId, @Param("questionsId") Integer questionsId);

}