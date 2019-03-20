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
     * 科目四
     * 图片题顺序练习
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
     * @return Questions
     */
    Questions orderTrainByWord(int id);

    /**
     * 文字题随机练习
     * @return Questions
     */
    Questions randomTrainByWord();


}
