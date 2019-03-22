package com.cqnu.harunasandrivingtestingsystem.service;

import com.cqnu.harunasandrivingtestingsystem.entity.Questions;
import com.cqnu.harunasandrivingtestingsystem.entity.Questions;
import com.cqnu.harunasandrivingtestingsystem.entity.QuestionsOne;

/**
 * @author LiAixing
 * @version 1.0
 * @interfaceName IQuestionFourService
 * @description TODO
 * @date 2019/3/15 1:43
 **/
public interface IQuestionsService {

    /**
     * 普通顺序练习
     * @return Questions
     */
    Questions orderTrain(int id);

    /**
     * 普通随机练习
     * @return Questions
     */
    Questions randomTrain();

    /**
     * 按章节顺序练习
     * @param id 题号
     * @param chapter  章节名
     * @return Questions
     */
    Questions orderTrainByChapter(int id, String chapter);

    /**
     * 按章节随机练习
     * @param chapter  章节名
     * @return Questions
     */
    Questions randomTrainByChapter(String chapter);


    /**
     * 按难度顺序练习
     * @param id 题号
     * @param difficulty 难度
     * @return Questions
     */
    Questions orderTrainByDifficulty(int id, int difficulty);

    /**
     * 按难度随机练习
     * @param difficulty 难度
     * @return Questions
     */
    Questions randomTrainByDifficulty(int difficulty);

    /**
     * 按知识点顺序练习
     * @param id 题号
     * @param knowledge 知识点
     * @return Questions
     */
    Questions orderTrainByKnowledge(int id, String knowledge);

    /**
     * 按知识点随机练习
     * @param knowledge 知识点
     * @return Questions
     */
    Questions randomTrainByKnowledge(String knowledge);

    /**
     * 按类型顺序练习
     * @param id 题号
     * @param type 类型
     * @return Questions
     */
    Questions orderTrainByType(int id, String type);

    /**
     * 按类型随机练习
     * @param type 类型
     * @return Questions
     */
    Questions randomTrainByType(String type);

    /**
     * 图片题顺序练习
     * @param id 题号
     * @return Questions
     */
    Questions orderTrainByImage(int id);

    /**
     * 图片题随机练习
     * @return Questions
     */
    Questions randomTrainByImage();

    /**
     * 文字题顺序练习
     * @param id 题号
     * @return Questions
     */
    Questions orderTrainByWord(int id);

    /**
     * 文字题随机练习
     * @return Questions
     */
    Questions randomTrainByWord();

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
     *
     * @param id
     * @param answer
     * @return
     */
    String judge(int id, String answer);
}
