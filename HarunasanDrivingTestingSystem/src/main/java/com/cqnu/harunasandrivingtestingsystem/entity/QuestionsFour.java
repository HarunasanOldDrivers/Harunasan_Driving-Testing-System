package com.cqnu.harunasandrivingtestingsystem.entity;

public class QuestionsFour extends Questions{
    private Integer qoId;

    private String qoType;

    private String qoTitle;

    private String qoOptionA;

    private String qoOptionB;

    private String qoOptionC;

    private String qoOptionD;

    private String qoAnswer;

    private String qoVideo;

    private String qoImage;

    private String qoDescription;

    private Integer qoDifficulty;

    private String qoKnowledge;

    private String qoChapter;

    public Integer getQoId() {
        return qoId;
    }

    public void setQoId(Integer qoId) {
        this.qoId = qoId;
    }

    public String getQoType() {
        return qoType;
    }

    public void setQoType(String qoType) {
        this.qoType = qoType == null ? null : qoType.trim();
    }

    public String getQoTitle() {
        return qoTitle;
    }

    public void setQoTitle(String qoTitle) {
        this.qoTitle = qoTitle == null ? null : qoTitle.trim();
    }

    public String getQoOptionA() {
        return qoOptionA;
    }

    public void setQoOptionA(String qoOptionA) {
        this.qoOptionA = qoOptionA == null ? null : qoOptionA.trim();
    }

    public String getQoOptionB() {
        return qoOptionB;
    }

    public void setQoOptionB(String qoOptionB) {
        this.qoOptionB = qoOptionB == null ? null : qoOptionB.trim();
    }

    public String getQoOptionC() {
        return qoOptionC;
    }

    public void setQoOptionC(String qoOptionC) {
        this.qoOptionC = qoOptionC == null ? null : qoOptionC.trim();
    }

    public String getQoOptionD() {
        return qoOptionD;
    }

    public void setQoOptionD(String qoOptionD) {
        this.qoOptionD = qoOptionD == null ? null : qoOptionD.trim();
    }

    public String getQoAnswer() {
        return qoAnswer;
    }

    public void setQoAnswer(String qoAnswer) {
        this.qoAnswer = qoAnswer == null ? null : qoAnswer.trim();
    }

    public String getQoVideo() {
        return qoVideo;
    }

    public void setQoVideo(String qoVideo) {
        this.qoVideo = qoVideo == null ? null : qoVideo.trim();
    }

    public String getQoImage() {
        return qoImage;
    }

    public void setQoImage(String qoImage) {
        this.qoImage = qoImage == null ? null : qoImage.trim();
    }

    public String getQoDescription() {
        return qoDescription;
    }

    public void setQoDescription(String qoDescription) {
        this.qoDescription = qoDescription == null ? null : qoDescription.trim();
    }

    public Integer getQoDifficulty() {
        return qoDifficulty;
    }

    public void setQoDifficulty(Integer qoDifficulty) {
        this.qoDifficulty = qoDifficulty;
    }

    public String getQoKnowledge() {
        return qoKnowledge;
    }

    public void setQoKnowledge(String qoKnowledge) {
        this.qoKnowledge = qoKnowledge == null ? null : qoKnowledge.trim();
    }

    public String getQoChapter() {
        return qoChapter;
    }

    public void setQoChapter(String qoChapter) {
        this.qoChapter = qoChapter == null ? null : qoChapter.trim();
    }
}