package com.cqnu.harunasandrivingtestingsystem.service.impl;

import com.cqnu.harunasandrivingtestingsystem.entity.MistakesCollectionFour;
import com.cqnu.harunasandrivingtestingsystem.entity.QuestionsFour;
import com.cqnu.harunasandrivingtestingsystem.mapper.MistakesCollectionFourMapper;
import com.cqnu.harunasandrivingtestingsystem.mapper.QuestionsFourMapper;
import com.cqnu.harunasandrivingtestingsystem.service.IQuestionsService;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author LiAixing
 * @version 1.0
 * @className QuestionsFourServiceImpl
 * @description TODO
 * @date 2019/3/15 2:29
 **/
@Service
public class QuestionsFourServiceImpl implements IQuestionsService {

    @Resource
    private QuestionsFourMapper questionsFourMapper;

    @Resource
    private MistakesCollectionFourMapper mistakesCollectionFourMapper;

    /**
     * 获取所有题目
     * @return
     */
    public List<QuestionsFour> getQuestions(){
        return questionsFourMapper.getAll();
    }

    /**
     * 修改题目
     * @param questionsFour
     * @return
     */
    public boolean updateQuestions(QuestionsFour questionsFour){
        return questionsFourMapper.updateByPrimaryKeySelective(questionsFour) == 1;
    }

    @Override
    public QuestionsFour orderTrain(Integer id) {
        return questionsFourMapper.selectByPrimaryKey(id);
    }

    @Override
    public QuestionsFour randomTrain() {
        return questionsFourMapper.selectByRandom();
    }

    @Override
    public QuestionsFour orderTrainByChapter(Integer id, String chapter) {
        return questionsFourMapper.selectByOrderWithChapter(id , chapter);
    }

    @Override
    public QuestionsFour randomTrainByChapter(String chapter) {
        return questionsFourMapper.selectByRandomWithChapter(chapter);
    }

    @Override
    public QuestionsFour orderTrainByDifficulty(Integer id, Integer difficulty) {
        return questionsFourMapper.selectByOrderWithDifficulty(id,difficulty);
    }

    @Override
    public QuestionsFour randomTrainByDifficulty(Integer difficulty) {
        return questionsFourMapper.selectByRandomWithDifficulty(difficulty);
    }

    @Override
    public QuestionsFour orderTrainByKnowledge(Integer id, String knowledge) {
        return questionsFourMapper.selectByOrderWithKnowledge(id,knowledge);
    }

    @Override
    public QuestionsFour randomTrainByKnowledge(String knowledge) {
        return questionsFourMapper.selectByRandomWithKnowledge(knowledge);
    }

    @Override
    public QuestionsFour orderTrainByType(Integer id, String type) {
        return questionsFourMapper.selectByOrderWithType(id, type);
    }

    @Override
    public QuestionsFour randomTrainByType(String type) {
        return questionsFourMapper.selectByRandomWithType(type);
    }

    @Override
    public QuestionsFour orderTrainByImage(Integer id) {
        return questionsFourMapper.selectByOrderWithImage(id);
    }

    @Override
    public QuestionsFour randomTrainByImage() {
        return questionsFourMapper.selectByRandomWithImage();
    }

    @Override
    public QuestionsFour orderTrainByWord(Integer id) {
        return questionsFourMapper.selectByOrderWithWord(id);
    }

    @Override
    public QuestionsFour randomTrainByWord() {
        return questionsFourMapper.selectByRandomWithWord();
    }

    @Override
    public int getCount() {
        return questionsFourMapper.getCount();
    }

    @Override
    public int getCountByChapter(String chapter) {
        return questionsFourMapper.getCountByChapter(chapter);
    }

    @Override
    public int getCountByDifficulty(Integer difficulty) {
        return questionsFourMapper.getCountByDifficulty(difficulty);
    }

    @Override
    public int getCountByKnowledge(String knowledge) {
        return questionsFourMapper.getCountByKnowledge(knowledge);
    }

    @Override
    public int getCountByType(String type) {
        return questionsFourMapper.getCountByType(type);
    }

    @Override
    public int getCountByImage() {
        return questionsFourMapper.getCountByImage();
    }

    @Override
    public int getCountByWord() {
        return questionsFourMapper.getCountByWord();
    }

    @Override
    public String judge(Integer id, String answer) {
        if (answer == null){
            return "false";
        }
        QuestionsFour questionsOne = questionsFourMapper.selectByPrimaryKey(id);
        if (questionsOne == null){
            return "false";
        }
        if (answer.equals(questionsOne.getQoAnswer())){
            return "true";
        }
        return questionsOne.getQoAnswer();
    }

    @Override
    public int addMistake(Integer username, Integer qoId){
        MistakesCollectionFour mistakesCollectionFour = new MistakesCollectionFour();
        mistakesCollectionFour.setUserId(username);
        mistakesCollectionFour.setQuestionsId(qoId);
        if(mistakesCollectionFourMapper.selectUserIdByQoIdAndUserId(qoId,username) != null){
            return 2;
        }
        return mistakesCollectionFourMapper.insertSelective(mistakesCollectionFour);
    }

    @Override
    public int deleteMistake(Integer username, Integer qoId){
        return mistakesCollectionFourMapper.deleteByUserIdAndQuestionId(username, qoId);
    }

    @Override
    public QuestionsFour orderMistake(@RequestParam(defaultValue = "1") Integer id, Integer username){
        return questionsFourMapper.getOrderMistake(id, username);
    }

    @Override
    public QuestionsFour randomMistake(Integer username){
        return questionsFourMapper.getRandomMistake(username);
    }

    public List<QuestionsFour> getPaper(){
        return questionsFourMapper.getPaper();
    }

    public List<QuestionsFour>  getMistakes(Integer username){return questionsFourMapper.getAllMistakes(username);}
}
