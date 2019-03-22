package com.cqnu.harunasandrivingtestingsystem.service.impl;

import com.cqnu.harunasandrivingtestingsystem.entity.QuestionsFour;
import com.cqnu.harunasandrivingtestingsystem.service.IQuestionsService;
import org.springframework.stereotype.Service;

/**
 * @author LiAixing
 * @version 1.0
 * @className QuestionsFourServiceImpl
 * @description TODO
 * @date 2019/3/15 2:29
 **/
@Service
public class QuestionsFourServiceImpl implements IQuestionsService {
    @Override
    public QuestionsFour orderTrain(int id) {
        return null;
    }

    @Override
    public QuestionsFour randomTrain() {
        return null;
    }

    @Override
    public QuestionsFour orderTrainByChapter(int id, String chapter) {
        return null;
    }

    @Override
    public QuestionsFour randomTrainByChapter(String chapter) {
        return null;
    }

    @Override
    public QuestionsFour orderTrainByDifficulty(int id, int difficulty) {
        return null;
    }

    @Override
    public QuestionsFour randomTrainByDifficulty(int difficulty) {
        return null;
    }

    @Override
    public QuestionsFour orderTrainByKnowledge(int id, String knowledge) {
        return null;
    }

    @Override
    public QuestionsFour randomTrainByKnowledge(String knowledge) {
        return null;
    }

    @Override
    public QuestionsFour orderTrainByType(int id, String type) {
        return null;
    }

    @Override
    public QuestionsFour randomTrainByType(String type) {
        return null;
    }

    @Override
    public QuestionsFour orderTrainByImage(int id) {
        return null;
    }

    @Override
    public QuestionsFour randomTrainByImage() {
        return null;
    }

    @Override
    public QuestionsFour orderTrainByWord(int id) {
        return null;
    }

    @Override
    public QuestionsFour randomTrainByWord() {
        return null;
    }

    @Override
    public int getCount() {
        return 0;
    }

    @Override
    public int getCountByChapter(String chapter) {
        return 0;
    }

    @Override
    public int getCountByDifficulty(Integer difficulty) {
        return 0;
    }

    @Override
    public int getCountByKnowledge(String knowledge) {
        return 0;
    }

    @Override
    public int getCountByType(String type) {
        return 0;
    }

    @Override
    public int getCountByImage() {
        return 0;
    }

    @Override
    public int getCountByWord() {
        return 0;
    }

    @Override
    public String judge(int id, String answer) {
        return null;
    }
}
