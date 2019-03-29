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

    /**
     * 根据题目id查询错题
     * @param questionsOneId 题目id
     * @return
     */
    Integer selectUserIdByQoId(Integer questionsOneId);

    /**
     * 根据题目id，用户id查询错题
     * @param questionsOneId 题目id
     * @param userId 用户id
     * @return
     */
    Integer selectUserIdByQoIdAndUserId(@Param("questionsOneId") Integer questionsOneId, @Param("userId") Integer userId);

    int updateByPrimaryKeySelective(MistakesCollectionOne record);

    int updateByPrimaryKey(MistakesCollectionOne record);

    /**
     * 根据用户id，题目id 删除错题
     * @param userId 用户id
     * @param questionsId 题目id
     * @return
     */
    int deleteByUserIdAndQuestionId(@Param("userId") Integer userId, @Param("questionsId") Integer questionsId);

}