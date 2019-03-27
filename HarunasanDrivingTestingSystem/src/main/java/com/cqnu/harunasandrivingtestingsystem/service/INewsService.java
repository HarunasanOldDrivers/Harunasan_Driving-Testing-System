package com.cqnu.harunasandrivingtestingsystem.service;

import com.cqnu.harunasandrivingtestingsystem.entity.School;

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
}
