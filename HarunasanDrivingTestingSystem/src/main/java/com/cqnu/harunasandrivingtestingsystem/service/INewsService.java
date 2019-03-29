package com.cqnu.harunasandrivingtestingsystem.service;

import com.cqnu.harunasandrivingtestingsystem.entity.News;
import com.cqnu.harunasandrivingtestingsystem.entity.School;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.CourseVO;
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


    List<School> searchSchool(String schoolName, String area, Integer minPrice, Integer maxPrice);

    SchoolVO getSchool(Integer schoolId);

    PageInfo<CourseVO> getRecommend(Integer pageNo, Integer pageSize);

    List<News> getAbstract(Integer type);

    News getArticle(Integer id);
}
