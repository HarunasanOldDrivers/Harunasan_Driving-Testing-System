package com.cqnu.harunasandrivingtestingsystem.service;

import com.cqnu.harunasandrivingtestingsystem.entity.News;
import com.cqnu.harunasandrivingtestingsystem.entity.School;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.CourseVO;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.NewsVO;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.PageInfo;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.SchoolVO;

import java.util.List;

/**
 * @author LiAixing
 * @version 1.0
 * @interfaceName INewsService
 * @description TODO
 * @date 2019/3/26 3:14
 **/
public interface INewsService {


    /**
     * 搜索驾校
     * @param schoolName 驾校名称
     * @param area 驾校地区
     * @param minPrice 驾校最低价格下限
     * @param maxPrice 驾校最低价格上限
     * @return
     */
    List<School> searchSchool(String schoolName, String area, Integer minPrice, Integer maxPrice);

    /**
     * 获取驾校信息
     * @param schoolId 驾校Id
     * @return
     */
    SchoolVO getSchool(Integer schoolId);

    /**
     * 课程推荐
     * @param pageNo 当前页
     * @param pageSize  分页大小
     * @return
     */
    PageInfo<CourseVO> getRecommend(Integer pageNo, Integer pageSize);

    /**
     * 获取资讯列表
     * @param type 类型{0,1,2}{学车动态，理论学习，学车视频}
     * @return
     */
    List<News> getAbstract(Integer type);

    /**
     * 获取资讯详情
     * @param id 资讯id
     * @return
     */
    News getArticle(Integer id);

    /**
     * 获取资讯列表
     * @return
     */
    List<News> getNewsList();

    /**
     * 创建资讯
     * @param newsVO
     * @return
     */
    boolean createNews(NewsVO newsVO);
}
