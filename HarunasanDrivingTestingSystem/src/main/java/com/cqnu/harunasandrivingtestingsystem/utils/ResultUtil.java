package com.cqnu.harunasandrivingtestingsystem.utils;

import com.cqnu.harunasandrivingtestingsystem.entity.Result;
import org.springframework.stereotype.Component;

/**
 * @author LiAixing
 * @version 1.0
 * @className ResultUtil
 * @description 通用结果返回类
 * @date 2019/3/20 15:48
 **/
@Component
public class ResultUtil {


    public static Result success(Object object){
        Result result = new Result();
        result.setCode(200);
        result.setMsg("成功");
        result.setData(object);
        return result;
    }

    public static Result success(){
        Result result = new Result();
        result.setCode(200);
        result.setMsg("成功");
        return result;
    }

    public static Result failure(Integer code, String msg){
        Result result = new Result();
        result.setCode(code);
        result.setMsg(msg);
        return result;
    }
}
