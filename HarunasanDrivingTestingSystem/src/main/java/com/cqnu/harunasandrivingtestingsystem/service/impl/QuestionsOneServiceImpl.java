package com.cqnu.harunasandrivingtestingsystem.service.impl;

import com.cqnu.harunasandrivingtestingsystem.entity.QuestionsOne;
import com.cqnu.harunasandrivingtestingsystem.mapper.QuestionsOneMapper;
import com.cqnu.harunasandrivingtestingsystem.service.IQuestionsService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author LiAixing
 * @version 1.0
 * @className QuestionsOneServiceImpl
 * @description TODO
 * @date 2019/3/15 2:32
 **/
@Service
public class QuestionsOneServiceImpl implements IQuestionsService {

    @Resource
    private QuestionsOneMapper questionsOneMapper;

    @Override
    public QuestionsOne orderTrain(int id) {
        return questionsOneMapper.selectByPrimaryKey(id);
    }

    @Override
    public QuestionsOne randomTrain() {
        return questionsOneMapper.selectByRandom();
    }

    @Override
    public QuestionsOne orderTrainByChapter(int id, String chapter) {
        return null;
    }

    @Override
    public QuestionsOne randomTrainByChapter(String chapter) {
        return null;
    }

    @Override
    public QuestionsOne orderTrainByDifficulty(int id, int difficulty) {
        return null;
    }

    @Override
    public QuestionsOne randomTrainByDifficulty(int difficulty) {
        return null;
    }

    @Override
    public QuestionsOne orderTrainByKnowledge(int id, String knowledge) {
        return null;
    }

    @Override
    public QuestionsOne randomTrainByKnowledge(String knowledge) {
        return null;
    }

    @Override
    public QuestionsOne orderTrainByType(int id, String type) {
        return null;
    }

    @Override
    public QuestionsOne randomTrainByType(String type) {
        return null;
    }

    @Override
    public QuestionsOne orderTrainByImage(int id) {
        return null;
    }

    @Override
    public QuestionsOne randomTrainByImage() {
        return null;
    }

    @Override
    public QuestionsOne orderTrainByWord(int id) {
        return null;
    }

    @Override
    public QuestionsOne randomTrainByWord() {
        return null;
    }
}
