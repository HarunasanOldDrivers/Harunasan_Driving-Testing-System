package com.cqnu.harunasandrivingtestingsystem.entity;

import java.util.Date;

public class News {
    private Integer newsId;

    private Integer newsType;

    private String newsTitle;

    private String newsImage;

    private String newsVideo;

    private String newsAuthor;

    private Date newsEditTime;

    private String newsContent;

    public Integer getNewsId() {
        return newsId;
    }

    public void setNewsId(Integer newsId) {
        this.newsId = newsId;
    }

    public Integer getNewsType() {
        return newsType;
    }

    public void setNewsType(Integer newsType) {
        this.newsType = newsType;
    }

    public String getNewsTitle() {
        return newsTitle;
    }

    public void setNewsTitle(String newsTitle) {
        this.newsTitle = newsTitle == null ? null : newsTitle.trim();
    }

    public String getNewsImage() {
        return newsImage;
    }

    public void setNewsImage(String newsImage) {
        this.newsImage = newsImage == null ? null : newsImage.trim();
    }

    public String getNewsVideo() {
        return newsVideo;
    }

    public void setNewsVideo(String newsVideo) {
        this.newsVideo = newsVideo == null ? null : newsVideo.trim();
    }

    public String getNewsAuthor() {
        return newsAuthor;
    }

    public void setNewsAuthor(String newsAuthor) {
        this.newsAuthor = newsAuthor == null ? null : newsAuthor.trim();
    }

    public Date getNewsEditTime() {
        return newsEditTime;
    }

    public void setNewsEditTime(Date newsEditTime) {
        this.newsEditTime = newsEditTime;
    }

    public String getNewsContent() {
        return newsContent;
    }

    public void setNewsContent(String newsContent) {
        this.newsContent = newsContent == null ? null : newsContent.trim();
    }
}