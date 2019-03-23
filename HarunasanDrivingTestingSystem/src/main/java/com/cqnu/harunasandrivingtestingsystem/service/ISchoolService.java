package com.cqnu.harunasandrivingtestingsystem.service;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
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

    String login(String username, String password);

    List<String> uploadImage(MultipartFile[] files);

    int signUp(String email, String schoolName, String password, String enrollTelephone,
               String companyName, String corporateName, String corporateTelephone, String socialCreditCode, Date startDate,
               String district, String detailLocation,List<String> files);
}
