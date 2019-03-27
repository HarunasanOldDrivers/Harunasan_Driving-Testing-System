package com.cqnu.harunasandrivingtestingsystem.service.impl;

import com.cqnu.harunasandrivingtestingsystem.entity.Course;
import com.cqnu.harunasandrivingtestingsystem.entity.School;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.CourseVO;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.SchoolVO;
import com.cqnu.harunasandrivingtestingsystem.mapper.CourseMapper;
import com.cqnu.harunasandrivingtestingsystem.mapper.EnrollMapper;
import com.cqnu.harunasandrivingtestingsystem.mapper.SchoolMapper;
import com.cqnu.harunasandrivingtestingsystem.service.INewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * @author LiAixing
 * @version 1.0
 * @className NewsServiceImpl
 * @description TODO
 * @date 2019/3/26 3:14
 **/
@Service
public class NewsServiceImpl implements INewsService {

    @Resource
    private SchoolMapper schoolMapper;

    @Resource
    private CourseMapper courseMapper;

    @Resource
    private EnrollMapper enrollMapper;
    @Override
    public List<School> searchSchool(String schoolName, String area, Integer minPrice, Integer maxPrice){
        return  schoolMapper.searchSchools(schoolName,area,minPrice,maxPrice);
    }

    @Override
    public SchoolVO getSchool(Integer schoolId){
        SchoolVO schoolVO = new SchoolVO();
        School school = schoolMapper.selectByPrimaryKey(schoolId);
        if (school == null){
            return schoolVO;
        }
        schoolVO.setSchoolId(school.getSchoolId());
        schoolVO.setSchoolEnrollTelephone(school.getSchoolEnrollTelphone());
        schoolVO.setSchoolCorporateName(school.getSchoolCorporateName());
        schoolVO.setSchoolCorporateTel(school.getSchoolCorporateTel());
        schoolVO.setSchoolName(school.getSchoolName());
        schoolVO.setSchoolCompanyName(school.getSchoolCompanyName());
        schoolVO.setSchoolStartTime(school.getSchoolStartTime());
        schoolVO.setSchoolPublicPraise(school.getSchoolPublicPraise());
        schoolVO.setSchoolIntroduction(school.getSchoolIntroduction());
        schoolVO.setSchoolIcon(school.getSchoolIcon());
        schoolVO.setAddress(school.getSchoolArea()+" " + school.getSchoolDetailAddress());
        schoolVO.setSchoolCourses(courseMapper.selectBySchoolId(schoolId));
        return  schoolVO;
    }

    @Override
    public List<CourseVO> getRecommend() {
        List<Course> courses = courseMapper.selectAll();
        List<CourseVO> courseVOS = new ArrayList<>(10);
        for (Course course: courses){
            School school = schoolMapper.selectByPrimaryKey(course.getSchoolId());
            CourseVO courseVO = new CourseVO(course.getCourseId(), course.getSchoolId(), school.getSchoolName(), course.getCourseDescribe(),
                    course.getCourseName(),enrollMapper.selectCountByCourseId(course.getCourseId()));
            courseVOS.add(courseVO);
        }
        return courseVOS;
    }
}
