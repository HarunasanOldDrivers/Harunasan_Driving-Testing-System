package com.cqnu.harunasandrivingtestingsystem.service.impl;

import com.cqnu.harunasandrivingtestingsystem.entity.Course;
import com.cqnu.harunasandrivingtestingsystem.entity.School;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.CourseVO;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.PageInfo;
import com.cqnu.harunasandrivingtestingsystem.mapper.CourseMapper;
import com.cqnu.harunasandrivingtestingsystem.mapper.EnrollMapper;
import com.cqnu.harunasandrivingtestingsystem.mapper.SchoolMapper;
import com.cqnu.harunasandrivingtestingsystem.service.ICourseService;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * @author LiAixing
 * @version 1.0
 * @className CourseServiceImpl
 * @description TODO
 * @date 2019/3/26 21:29
 **/
@Service
public class CourseServiceImpl implements ICourseService {

    Logger logger = LoggerFactory.getLogger(CourseServiceImpl.class);

    @Resource
    private CourseMapper courseMapper;

    @Resource
    private SchoolMapper schoolMapper;

    @Resource
    private EnrollMapper enrollMapper;

    @Override
    public boolean addCourse(Integer username, String courseName, String courseDescribe, Integer price){
        Course course = new Course();
        course.setCourseName(courseName);
        course.setCourseDescribe(courseDescribe);
        course.setSchoolId(username);
        course.setCoursePrice(price);
        if( 1 == courseMapper.insertSelective(course)){
            School school = schoolMapper.selectByPrimaryKey(username);
            school.setSchoolStartPrice(courseMapper.selectBySchoolIdOrderByPrice(username).getCoursePrice());
            schoolMapper.updateByPrimaryKeySelective(school);
            return true;
        }
        return false;
    }

    @Override
    public boolean closeCourse(Integer courseId){
        Course course = courseMapper.selectByPrimaryKey(courseId);
        if (course == null){
            return false;
        }
        course.setCourseIsEnable(0);
        if (courseMapper.updateByPrimaryKeySelective(course) == 1){
            School school = schoolMapper.selectByPrimaryKey(course.getSchoolId());
            school.setSchoolStartPrice(courseMapper.selectBySchoolIdOrderByPrice(course.getSchoolId()).getCoursePrice());
            schoolMapper.updateByPrimaryKeySelective(school);
            return true;
        }
        return false;
    }

    @Override
    public Course findCourse(Integer courseId){
        return courseMapper.selectByPrimaryKey(courseId);
    }

    @Override
    public PageInfo<CourseVO> getCourse(Integer username, Integer pageNo, Integer pageSize){
        Page page = PageHelper.startPage(pageNo,pageSize);
        List<Course> list = courseMapper.selectBySchoolId(username);
        PageInfo<CourseVO> pageInfo = new PageInfo<>(page);
        School school = schoolMapper.selectByPrimaryKey(username);
        List<CourseVO> result = new ArrayList<CourseVO>();
        for (Course item : list){
            result.add(new CourseVO(item.getCourseId(), item.getSchoolId(), school.getSchoolName(), item.getCourseDescribe(),
                    item.getCourseName(),enrollMapper.selectCountByCourseId(item.getCourseId()), item.getCoursePrice()));
        }
        pageInfo.setList(result);
        return pageInfo;
    }

    @Override
    public List<CourseVO> getCourse(Integer username){
        List<Course> list = courseMapper.selectBySchoolId(username);
        School school = schoolMapper.selectByPrimaryKey(username);
        List<CourseVO> result = new ArrayList<CourseVO>();
        for (Course item : list){
            result.add(new CourseVO(item.getCourseId(), item.getSchoolId(), school.getSchoolName(), item.getCourseDescribe(),
                    item.getCourseName(),enrollMapper.selectCountByCourseId(item.getCourseId()), item.getCoursePrice()));
        }
        return result;
    }
}
