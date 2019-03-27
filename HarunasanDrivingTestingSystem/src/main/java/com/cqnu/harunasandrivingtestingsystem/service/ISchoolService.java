package com.cqnu.harunasandrivingtestingsystem.service;

import com.cqnu.harunasandrivingtestingsystem.entity.School;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

/**
 * @author LiAixing
 * @version 1.0
 * @className ISchoolService
 * @description TODO
 * @date 2019/3/20 15:22
 **/
public interface ISchoolService {

    boolean loginByEmail(String email, String password);

    Integer getIdByEmail(String email);

    String getSchoolNameByEmail(String email);

    String verifyCode(String telephone);

    boolean verification(String telephone, String verifyCode);

    List<String> uploadImage(MultipartFile[] files);

    int signUp(String email, String schoolName, String password, String enrollTelephone,
               String companyName, String corporateName, String corporateTelephone, String socialCreditCode, Date startDate,
               String district, String detailLocation,List<String> files);

    School getProfile(Integer username);

    boolean addCourse(Integer username, String courseName, String courseDescribe, Integer price);
}
