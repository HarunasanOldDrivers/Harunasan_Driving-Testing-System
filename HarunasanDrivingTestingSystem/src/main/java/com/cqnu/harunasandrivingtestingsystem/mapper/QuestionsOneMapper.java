package com.cqnu.harunasandrivingtestingsystem.mapper;

import com.cqnu.harunasandrivingtestingsystem.entity.QuestionsOne;

public interface QuestionsOneMapper {
    int deleteByPrimaryKey(Integer qoId);

    int insert(QuestionsOne record);

    int insertSelective(QuestionsOne record);

    QuestionsOne selectByPrimaryKey(Integer qoId);

    int updateByPrimaryKeySelective(QuestionsOne record);

    int updateByPrimaryKey(QuestionsOne record);

    /**
     * 随机查一题
     * @return  QueestionOne
     */
    QuestionsOne selectByRandom();

    QuestionsOne selectByRandomWithChapter(String chapter);


}