package com.cqnu.harunasandrivingtestingsystem.service.impl;

import com.cqnu.harunasandrivingtestingsystem.entity.MistakesCollectionOne;
import com.cqnu.harunasandrivingtestingsystem.entity.QuestionsOne;
import com.cqnu.harunasandrivingtestingsystem.mapper.MistakesCollectionOneMapper;
import com.cqnu.harunasandrivingtestingsystem.mapper.QuestionsOneMapper;
import com.cqnu.harunasandrivingtestingsystem.service.IQuestionsService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

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

    @Resource
    private MistakesCollectionOneMapper mistakesCollectionOneMapper;

    @Override
    public List<QuestionsOne> getQuestions(){
        return questionsOneMapper.getAll();
    }

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
        return questionsOneMapper.selectByOrderWithChapter(id , chapter);
    }

    @Override
    public QuestionsOne randomTrainByChapter(String chapter) {
        return questionsOneMapper.selectByRandomWithChapter(chapter);
    }

    @Override
    public QuestionsOne orderTrainByDifficulty(int id, int difficulty) {
        return questionsOneMapper.selectByOrderWithDifficulty(id,difficulty);
    }

    @Override
    public QuestionsOne randomTrainByDifficulty(int difficulty) {
        return questionsOneMapper.selectByRandomWithDifficulty(difficulty);
    }

    @Override
    public QuestionsOne orderTrainByKnowledge(int id, String knowledge) {
        return questionsOneMapper.selectByOrderWithKnowledge(id,knowledge);
    }

    @Override
    public QuestionsOne randomTrainByKnowledge(String knowledge) {
        return questionsOneMapper.selectByRandomWithKnowledge(knowledge);
    }

    @Override
    public QuestionsOne orderTrainByType(int id, String type) {
        return questionsOneMapper.selectByOrderWithType(id, type);
    }

    @Override
    public QuestionsOne randomTrainByType(String type) {
        return questionsOneMapper.selectByRandomWithType(type);
    }

    @Override
    public QuestionsOne orderTrainByImage(int id) {
        return questionsOneMapper.selectByOrderWithImage(id);
    }

    @Override
    public QuestionsOne randomTrainByImage() {
        return questionsOneMapper.selectByRandomWithImage();
    }

    @Override
    public QuestionsOne orderTrainByWord(int id) {
        return questionsOneMapper.selectByOrderWithWord(id);
    }

    @Override
    public QuestionsOne randomTrainByWord() {
        return questionsOneMapper.selectByRandomWithWord();
    }

    @Override
    public int getCount() {
        return questionsOneMapper.getCount();
    }

    @Override
    public int getCountByChapter(String chapter) {
        return questionsOneMapper.getCountByChapter(chapter);
    }

    @Override
    public int getCountByDifficulty(Integer difficulty) {
        return questionsOneMapper.getCountByDifficulty(difficulty);
    }

    @Override
    public int getCountByKnowledge(String knowledge) {
        return questionsOneMapper.getCountByKnowledge(knowledge);
    }

    @Override
    public int getCountByType(String type) {
        return questionsOneMapper.getCountByType(type);
    }

    @Override
    public int getCountByImage() {
        return questionsOneMapper.getCountByImage();
    }

    @Override
    public int getCountByWord() {
        return questionsOneMapper.getCountByWord();
    }

    @Override
    public String judge(int id, String answer) {
        if (answer == null){
            return "false";
        }
        QuestionsOne questionsOne = questionsOneMapper.selectByPrimaryKey(id);
        if (questionsOne == null){
            return "false";
        }
        if (answer.equals(questionsOne.getQoAnswer())){
            return "true";
        }
        return questionsOne.getQoAnswer();
    }

    @Override
    public int addMistake(Integer username, Integer qoid){
        MistakesCollectionOne mistakesCollectionOne = new MistakesCollectionOne();
        mistakesCollectionOne.setUserId(username);
        mistakesCollectionOne.setQuestionsId(qoid);
        if(username.equals(mistakesCollectionOneMapper.selectUserIdByQoId(qoid))){
            return 2;
        }
        return mistakesCollectionOneMapper.insertSelective(mistakesCollectionOne);
    }

    @Override
    public List<QuestionsOne> getPaper(){
        return questionsOneMapper.getPaper();
    }
}
