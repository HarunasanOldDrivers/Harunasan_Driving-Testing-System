package com.cqnu.harunasandrivingtestingsystem.service;

import com.cqnu.harunasandrivingtestingsystem.entity.School;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.EnrollSL;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.PageInfo;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.SchoolVO;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
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

    /**
     * 通过邮箱登录
     * @param email 邮箱
     * @param password 密码
     * @return  登录成功/失败 （true/false)
     */
    boolean loginByEmail(String email, String password);

    /**
     * 检查驾校是否通过审核
     * @param email 邮箱
     * @return
     */
    boolean checkAuditing(String email);

    /**
     * 获取驾校账号是否冻结
     * @param email 邮箱
     * @return
     */
    boolean isEnable(String email);

    /**
     * 通过邮箱获取学校id
     * @param email 邮箱
     * @return
     */
    Integer getIdByEmail(String email);

    /**
     * 获取学校名称
     * @param email 邮箱
     * @return
     */
    String getSchoolNameByEmail(String email);

    /**
     * 获取验证码
     * @param telephone 手机号
     * @return  返回验证码
     */
    String verifyCode(String telephone);

    /**
     * 验证验证码
     * @param telephone 手机号
     * @param verifyCode    验证码
     * @return  验证通过返回true 失败返回false
     */
    boolean verification(String telephone, String verifyCode);

    /**
     * 上传文件
     * @param files
     * @return  文件访问链接
     */
    List<String> uploadImage(MultipartFile[] files);

    /**
     * 驾校注册
     * @param email 邮箱
     * @param schoolName    驾校名称
     * @param password  密码
     * @param enrollTelephone   报名电话
     * @param companyName   驾校公司名称
     * @param corporateName 法人姓名
     * @param corporateTelephone    法人电话
     * @param socialCreditCode  社会信用代码
     * @param startDate 驾校成立日期
     * @param district  所在地区
     * @param detailLocation    详细地址
     * @param files 相关资质文件
     * @return
     */
    int signUp(String email, String schoolName, String password, String enrollTelephone,
               String companyName, String corporateName, String corporateTelephone, String socialCreditCode, Date startDate,
               String district, String detailLocation,List<String> files);

    /**
     * 获取驾校信息
     * @param username  驾校id
     * @return  返回驾校信息
     */
    SchoolVO getProfile(Integer username);

    /**
     * 修改报名电话
     * @param schoolId  驾校Id
     * @param newTel    新报名电话
     * @return
     */
    boolean alterTel(Integer schoolId, String newTel);

    /**
     * 修改驾校简介
     * @param schoolId  驾校Id
     * @param newDec    新驾校简介
     * @return
     */
    boolean alterDescribe(Integer schoolId, String newDec);

    /**
     * 修改首页图片
     * @param schoolId  驾校Id
     * @param fileurl   图片路径
     * @return
     */
    boolean alterIcon(Integer schoolId, String fileurl);

    /**
     * 查询报名
     * @param studentName   学生姓名
     * @param timeBefore    报名时间左区间
     * @param timeAfter     报名时间右区间
     * @param courseId      课程Id
     * @return  List<Enroll>
     */
    PageInfo<EnrollSL> selectEnroll(String studentName, LocalDateTime timeBefore, LocalDateTime timeAfter,
                                    Integer courseId, Integer pageNum, Integer pageSize);

    /**
     * 查询报名
     * @param studentName   学生姓名
     * @param timeBefore    报名时间左区间
     * @param timeAfter     报名时间右区间
     * @return  List<Enroll>
     */
    PageInfo<EnrollSL> selectAllEnroll(String studentName, LocalDateTime timeBefore, LocalDateTime timeAfter, Integer pageNum, Integer pageSize);

    /**
     * 查询所有驾校
     * @return
     */
    List<School> selectAllSchool();

    /**
     * 查询待审核的驾校
     * @return
     */
    List<School> selectAuditingSchool();
}
