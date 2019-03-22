package com.cqnu.harunasandrivingtestingsystem.entity;

public class MistakesCollectionFour {
    private Integer mistakesId;

    private Integer userId;

    private Integer questionsId;

    private String wrongAnswer;

    public Integer getMistakesId() {
        return mistakesId;
    }

    public void setMistakesId(Integer mistakesId) {
        this.mistakesId = mistakesId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getQuestionsId() {
        return questionsId;
    }

    public void setQuestionsId(Integer questionsId) {
        this.questionsId = questionsId;
    }

    public String getWrongAnswer() {
        return wrongAnswer;
    }

    public void setWrongAnswer(String wrongAnswer) {
        this.wrongAnswer = wrongAnswer == null ? null : wrongAnswer.trim();
    }
}