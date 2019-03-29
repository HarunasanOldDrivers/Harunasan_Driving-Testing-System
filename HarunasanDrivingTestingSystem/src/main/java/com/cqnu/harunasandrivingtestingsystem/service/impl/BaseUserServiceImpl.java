package com.cqnu.harunasandrivingtestingsystem.service.impl;

import com.cqnu.harunasandrivingtestingsystem.entity.Course;
import com.cqnu.harunasandrivingtestingsystem.entity.Enroll;
import com.cqnu.harunasandrivingtestingsystem.entity.School;
import com.cqnu.harunasandrivingtestingsystem.entity.User;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.CourseVO;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.EnrollVO;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.PageInfo;
import com.cqnu.harunasandrivingtestingsystem.mapper.CourseMapper;
import com.cqnu.harunasandrivingtestingsystem.mapper.EnrollMapper;
import com.cqnu.harunasandrivingtestingsystem.mapper.SchoolMapper;
import com.cqnu.harunasandrivingtestingsystem.mapper.UserMapper;
import com.cqnu.harunasandrivingtestingsystem.service.IBaseUserService;
import com.cqnu.harunasandrivingtestingsystem.utils.Password2Hash;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.concurrent.TimeUnit;

/**
 * @author LiAixing
 * @version 1.0
 * @className BaseUserServiceImpl
 * @description TODO
 * @date 2019/2/15 2:08
 **/
@Service
public class BaseUserServiceImpl implements IBaseUserService {

    Logger logger = LoggerFactory.getLogger(BaseUserServiceImpl.class);

    @Autowired
    private RedisTemplate redisTemplate;

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @Resource
    private UserMapper userMapper;

    @Resource
    private EnrollMapper enrollMapper;

    @Resource
    private CourseMapper courseMapper;

    @Resource
    private SchoolMapper schoolMapper;

    @Override
    public int signUp(String telephone, String nickname, String password, String email) {
        User user = new User();
        user.setUserTelphone(telephone);
        user.setUserNickname(nickname);
        user.setUserEmail(email);
        user.setUserPassword(Password2Hash.sha256CryptWithSalt(password, String.valueOf(LocalDateTime.now())));
        logger.info(String.valueOf(LocalDateTime.now()));
//        logger.info("password:" + Password2Hash.sha256CryptWithSalt(password, String.valueOf(LocalDateTime.now())));
        user.setUserRegDate(LocalDateTime.now());
        return userMapper.insertSelective(user);
    }

    @Override
    public boolean loginByTelephone(String telephone, String password) {
        User user = userMapper.selectByTelphone(telephone);
        if (user == null){
            logger.info("User not find");
//            throw new UsernameNotFoundException(String.format("No user found with telephone '%s'.", telephone));
            return false;
        } else if (user.getUserPassword().equals(Password2Hash.sha256CryptWithSalt(password, String.valueOf(user.getUserRegDate())))){
            logger.info(String.valueOf(user.getUserRegDate()));
            return true;
        } else {
            return false;
        }
    }

    @Override
    public int getIdByTelephone(String telephone) {
        User user = userMapper.selectByTelphone(telephone);
        if (user == null){
            logger.info("User not find");
            throw new UsernameNotFoundException(String.format("No user found with telephone '%s'.", telephone));
        }
        return user.getUserId();
    }

    @Override
    public String verifyCode(String telephone) {
        String verifyCode = String.valueOf((new Random()).nextInt(899999) + 100000);
        stringRedisTemplate.opsForValue().set("telephone:" + telephone, verifyCode,5, TimeUnit.MINUTES);
        logger.info("verifyCode: " + verifyCode);
        return verifyCode;
    }

    @Override
    public boolean verification(String telephone, String verifyCode) {
        return verifyCode.equals(stringRedisTemplate.opsForValue().get("telephone:" + telephone));
    }

    @Override
    public boolean telephoneHaveExist(String telephone) {
        return (userMapper.selectByTelphone(telephone)!=null);
    }

    @Override
    public boolean oldPasswordIsCorrect(Integer id, String oldPassword) {
        User user = userMapper.selectByPrimaryKey(id);
        if (user == null){
            logger.info("User not find");
            throw new UsernameNotFoundException(String.format("No user found with id '%s'.", id));
        }
        return oldPassword.equals(user.getUserPassword());
    }

    @Override
    public int alterPassword(Integer id, String newPassword) {
        User user = userMapper.selectByPrimaryKey(id);
        user.setUserId(id);
        user.setUserPassword(Password2Hash.sha256CryptWithSalt(newPassword, String.valueOf(user.getUserRegDate())));
        return userMapper.updateByPrimaryKeySelective(user);
    }

    @Override
    public User getProfile(Integer id) {
        return userMapper.selectByPrimaryKey(id);
    }

    @Override
    public String getNickNameByTelephone(String telephone) {
        return userMapper.selectByTelphone(telephone).getUserNickname();
    }

    @Override
    public boolean enroll(Integer userId, Integer courseId, String username, String telephone){
        if(courseMapper.selectByPrimaryKey(courseId).getCourseIsEnable() == 0 || enrollMapper.selectByUserIdAndCourseId(userId, courseId) != null){
            return false;
        }
        Enroll enroll = new Enroll(courseId, userId, LocalDateTime.now(), username, telephone);
        return enrollMapper.insertSelective(enroll) == 1;
    }

    @Override
    public PageInfo<EnrollVO> getEnroll(Integer username, Integer pageNo, Integer pageSize){
        Page page = PageHelper.startPage(pageNo,pageSize);
        List<Enroll> enrollList = enrollMapper.selectByStudentId(username);
        PageInfo<EnrollVO> pageInfo = new PageInfo<>(page);
        List<EnrollVO> enrollVOList = new ArrayList<>();
        for (Enroll enroll : enrollList){
            EnrollVO enrollVO = new EnrollVO();
            Course course = courseMapper.selectByPrimaryKey(enroll.getCourseId());
            School school = schoolMapper.selectByPrimaryKey(course.getSchoolId());
            enrollVO.setCourseId(enroll.getCourseId());
            enrollVO.setEnrollId(enroll.getEnrollId());
            enrollVO.setCourseDescribe(course.getCourseDescribe());
            enrollVO.setCourseName(course.getCourseName());
            enrollVO.setCoursePrice(course.getCoursePrice());
            enrollVO.setSchoolId(course.getSchoolId());
            enrollVO.setSchoolName(school.getSchoolName());
            enrollVO.setSchoolAddress(school.getSchoolArea() + " " + school.getSchoolDetailAddress());
            enrollVO.setSchoolTel(school.getSchoolEnrollTelphone());
            enrollVOList.add(enrollVO);
        }
        pageInfo.setList(enrollVOList);
        return pageInfo;
    }

    @Override
    public List<User> getUserList() {
        return userMapper.selectAll();
    }
}
