package com.cqnu.harunasandrivingtestingsystem.service.impl;

import com.cqnu.harunasandrivingtestingsystem.entity.School;
import com.cqnu.harunasandrivingtestingsystem.mapper.SchoolMapper;
import com.cqnu.harunasandrivingtestingsystem.service.INewsService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
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

    @Override
    public List<School> searchSchool(String schoolName, String area, Integer minPrice, Integer maxPrice){
        return  schoolMapper.searchSchools(schoolName,area,minPrice,maxPrice);
    }
}
