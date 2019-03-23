package com.cqnu.harunasandrivingtestingsystem.service.impl;

import com.cqnu.harunasandrivingtestingsystem.entity.School;
import com.cqnu.harunasandrivingtestingsystem.mapper.SchoolMapper;
import com.cqnu.harunasandrivingtestingsystem.service.ISchoolService;
import com.cqnu.harunasandrivingtestingsystem.utils.FileUtil;
import com.cqnu.harunasandrivingtestingsystem.utils.Password2Hash;
import com.cqnu.harunasandrivingtestingsystem.utils.PostObject;
import com.cqnu.harunasandrivingtestingsystem.utils.UrlUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author LiAixing
 * @version 1.0
 * @className SchoolServiceImpl
 * @description TODO
 * @date 2019/3/20 15:23
 **/
@Service
public class SchoolServiceImpl implements ISchoolService {

    Logger logger = LoggerFactory.getLogger(SchoolServiceImpl.class);

    @Autowired
    private PostObject postObject;

    @Autowired
    private UrlUtil urlUtil;

    @Resource
    private SchoolMapper schoolMapper;

    @Override
    public String login(String telephone, String password) {
        int schoolId = schoolMapper.selectIdByTelephone(telephone);
        if (schoolId == 0){
            return null;
        }
        password = Password2Hash.sha256CryptWithSalt(password, telephone);


        return null;
    }

    @Override
    public List<String> uploadImage(MultipartFile[] files) {
        String filePath = "D:\\文档\\毕设\\Harunasan_Driving-Testing-System\\HarunasanDrivingTestingSystem\\src\\main\\resources\\upload\\";
        String fileName = "";
        List<String> urlList = new ArrayList<>();

        String uploadedFileName = Arrays.stream(files).map(x -> x.getOriginalFilename())
                .filter(x -> !StringUtils.isEmpty(x)).collect(Collectors.joining(" , "));
        if (StringUtils.isEmpty(uploadedFileName)) {
            System.out.println("文件上传失败,文件为空");
        }
        List<String> paths = new ArrayList<>();
        try {
            paths =  FileUtil.saveUploadFiles(Arrays.asList(files),filePath);
            //生成文件夹名
            String folderName = "school/seniority";
            logger.info("folderName: " + folderName);
            for(String path : paths){
                //获取文件名
                fileName = path.replace(filePath,"");
                logger.info("fileName: " + fileName);
                postObject.PostObject(path,folderName+"/"+fileName);
            }
            urlList = urlUtil.getUrls(paths);
        } catch (IOException e) {
            e.printStackTrace();
            logger.error("IO 异常");
        }catch (Exception e){
            e.printStackTrace();
        }
        return urlList;
    }

    @Override
    public int signUp(String email, String schoolName, String password, String enrollTelephone, String companyName, String corporateName,
                      String corporateTelephone, String socialCreditCode, Date startDate, String district,
                      String detailLocation, List<String> files) {
        School school = new School();
        school.setSchoolEmail(email);
        school.setSchoolName(schoolName);
        school.setSchoolPassword(Password2Hash.sha256CryptWithSalt(password,email));
        school.setSchoolEnrollTelphone(enrollTelephone);
        school.setSchoolCompanyName(companyName);
        school.setSchoolCorporateName(corporateName);
        school.setSchoolCorporateTel(corporateTelephone);
        school.setSchoolSocialCreditCode(socialCreditCode);
        school.setSchoolStartTime(startDate);
        school.setSchoolArea(district);
        school.setSchoolDetailAddress(detailLocation);
        school.setSchoolCardId(files.get(0));
        school.setSchoolCertificationLicense(files.get(1));
        school.setSchoolBusinessLicense(files.get(2));

        return schoolMapper.insertSelective(school);
    }
}
