package com.cqnu.harunasandrivingtestingsystem.entity.VO;

import java.util.Date;

/**
 * @author LiAixing
 * @version 1.0
 * @className NewsVO
 * @description TODO
 * @date 2019/3/29 21:05
 **/
public class NewsVO {

    private Integer newsType;

    private String newsTitle;

    private String newsAuthor;

    private String newsContent;

    public NewsVO(Integer newsType, String newsTitle, String newsAuthor, String newsContent) {
        this.newsType = newsType;
        this.newsTitle = newsTitle;
        this.newsAuthor = newsAuthor;
        this.newsContent = newsContent;
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
        this.newsTitle = newsTitle;
    }

    public String getNewsAuthor() {
        return newsAuthor;
    }

    public void setNewsAuthor(String newsAuthor) {
        this.newsAuthor = newsAuthor;
    }

    public String getNewsContent() {
        return newsContent;
    }

    public void setNewsContent(String newsContent) {
        this.newsContent = newsContent;
    }

    public NewsVO() {
    }
}
