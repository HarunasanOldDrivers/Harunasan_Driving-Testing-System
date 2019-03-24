package com.cqnu.harunasandrivingtestingsystem.mapper;

import com.cqnu.harunasandrivingtestingsystem.entity.QuestionsFour;
import com.cqnu.harunasandrivingtestingsystem.entity.QuestionsFour;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionsFourMapper {
    int deleteByPrimaryKey(Integer qoId);

    int insert(QuestionsFour record);

    int insertSelective(QuestionsFour record);

    QuestionsFour selectByPrimaryKey(Integer qoId);

    int updateByPrimaryKeySelective(QuestionsFour record);

    int updateByPrimaryKey(QuestionsFour record);

    List<QuestionsFour> getPaper();

    /**
     * 获取所有题目
     * @return
     */
    List<QuestionsFour> getAll();

    /**
     * 获取题目总数
     * @return  题目总数
     */
    int getCount();

    /**
     * 获取某章节题目数
     * @param chapter  章节名称
     * @return  题目数
     */
    int getCountByChapter (String chapter);

    /**
     * 获取某难度题目数
     * @param difficulty  题目难度
     * @return  题目数
     */
    int getCountByDifficulty(Integer difficulty);

    /**
     * 获取某知识点题目数
     * @param knowledge  知识点
     * @return  题目数
     */
    int getCountByKnowledge(String knowledge);

    /**
     * 获取某类型题目数
     * @param type  题目类型
     * @return  题目数
     */
    int getCountByType(String type);

    /**
     * 获取图片题题目数
     * @return 题目数
     */
    int getCountByImage();

    /**
     * 获取文字题题目数
     * @return 题目数
     */
    int getCountByWord();



    /**
     * 随机查一题
     * @return  QuestionsFour
     */
    QuestionsFour selectByRandom();

    /**
     * 根据章节顺序获取题目
     * @param id    题目ID
     * @param chapter   章节名
     * @return  QuestionsFour
     */
    QuestionsFour selectByOrderWithChapter(@Param("qoId") Integer id, @Param("qoChapter") String chapter);

    /**
     * 根据章节随机获取题目
     * @param chapter   章节名
     * @return  QuestionsFour
     */
    QuestionsFour selectByRandomWithChapter(String chapter);

    /**
     * 根据难度顺序获取题目
     * @param id    题目id
     * @param difficulty    难度
     * @return  QuestionsFour
     */
    QuestionsFour selectByOrderWithDifficulty(@Param("qoId") Integer id,@Param("qoDifficulty") Integer difficulty);

    /**
     * 根据难度随机获取题目
     * @param difficulty  难度
     * @return  QuestionsFour
     */
    QuestionsFour selectByRandomWithDifficulty(Integer difficulty);

    /**
     * 根据知识点顺序获取题目
     * @param id  题目id
     * @param knowledge  知识点
     * @return  QuestionsFour
     */
    QuestionsFour selectByOrderWithKnowledge(@Param("qoId") Integer id, @Param("qoKnowledge") String knowledge);

    /**
     * 根据知识点随机获取题目
     * @param knowledge  知识点
     * @return  QuestionsFour
     */
    QuestionsFour selectByRandomWithKnowledge(String knowledge);

    /**
     * 根据题目类型顺序获取题目
     * @param id  题目id
     * @param type  题目类型
     * @return  QuestionsFour
     */
    QuestionsFour selectByOrderWithType(@Param("qoId") Integer id, @Param("qoType") String type);

    /**
     * 根据题目类型随机获取题目
     * @param type  题目类型
     * @return  QuestionsFour
     */
    QuestionsFour selectByRandomWithType(String type);

    /**
     * 顺序获取图片题
     * @param id  题目id
     * @return  QuestionsFour
     */
    QuestionsFour selectByOrderWithImage(Integer id);

    /**
     * 随机获取图片题
     * @return  QuestionsFour
     */
    QuestionsFour selectByRandomWithImage();

    /**
     * 顺序获取文字题
     * @param id  题目id
     * @return  QuestionsFour
     */
    QuestionsFour selectByOrderWithWord(Integer id);

    /**
     * 随机获取题目题
     * @return  QuestionsFour
     */
    QuestionsFour selectByRandomWithWord();

    /**
     * 顺序获取错题
     * @param id    题目id
     * @param userId    用户id
     * @return
     */
    QuestionsFour getOrderMistake(@Param("id") Integer id, @Param("userId") Integer userId);

    /**
     * 随机获取错题   
     * @param userId    题目id
     * @return
     */
    QuestionsFour getRandomMistake(Integer userId);
}