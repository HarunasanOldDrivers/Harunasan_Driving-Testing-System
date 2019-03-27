package com.cqnu.harunasandrivingtestingsystem.controller;

import com.cqnu.harunasandrivingtestingsystem.entity.Course;
import com.cqnu.harunasandrivingtestingsystem.entity.Result;
import com.cqnu.harunasandrivingtestingsystem.entity.School;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.CourseVO;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.PageInfo;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.SchoolVO;
import com.cqnu.harunasandrivingtestingsystem.exception.GlobalException;
import com.cqnu.harunasandrivingtestingsystem.service.INewsService;
import com.cqnu.harunasandrivingtestingsystem.utils.ResultUtil;
import com.github.pagehelper.PageHelper;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author LiAixing
 * @version 1.0
 * @className NewsController
 * @description TODO
 * @date 2019/3/23 4:03
 **/
@RestController
@RequestMapping("/api/news")
public class NewsController {

    @Resource
    private INewsService newsService;

    /**
     * 搜索驾校
     * @param pageNo  当前页
     * @param pageSize  分页大小
     * @param schoolName  学校名称
     * @param area  学校所在地区
     * @param price  课程价格
     * @return  PageInfo<School>
     */
    @GetMapping("/search")
    public PageInfo<School> search(@RequestParam(defaultValue = "1") int pageNo, @RequestParam(defaultValue = "5") int pageSize,
                                   String schoolName, String area, String price){
        String []prices = price.split("-");
        PageHelper.startPage(pageNo,pageSize);
        return new PageInfo<>(newsService.searchSchool(schoolName,area,Integer.valueOf(prices[0]),Integer.valueOf(prices[1])));
    }

    /**
     * 获得指定驾校详情
     * @param schoolId  驾校Id
     * @return
     */
    @GetMapping("/school/{schoolId}")
    public Result getSchoolProfile(@PathVariable Integer schoolId){
        if (schoolId == null){
            return ResultUtil.failure(404,"未找到该驾校");
        }
        SchoolVO schoolVO = newsService.getSchool(schoolId);
        if (StringUtils.isEmpty(schoolVO.getSchoolName())){
            return ResultUtil.failure(404,"未找到该驾校");
        }
        return  ResultUtil.success(schoolVO);
    }

    /**
     * 课程推荐
     * @param pageNo  当前页
     * @param pageSize  分页大小
     * @return
     */
    @GetMapping("/recommend")
    public PageInfo<CourseVO> getRecommend(@RequestParam(defaultValue = "1") Integer pageNo, @RequestParam(defaultValue = "10") Integer pageSize){
        PageHelper.startPage(pageNo, pageSize);
        return new PageInfo<>(newsService.getRecommend());
    }
}
