package com.cqnu.harunasandrivingtestingsystem.mapper;

import com.cqnu.harunasandrivingtestingsystem.entity.QuestionsFour;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionsFourMapper {
    int deleteByPrimaryKey(Integer qoId);

    int insert(QuestionsFour record);

    int insertSelective(QuestionsFour record);

    QuestionsFour selectByPrimaryKey(Integer qoId);

    int updateByPrimaryKeySelective(QuestionsFour record);

    int updateByPrimaryKey(QuestionsFour record);
}