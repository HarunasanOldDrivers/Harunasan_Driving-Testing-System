package com.cqnu.harunasandrivingtestingsystem.security.handler;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author LiAixing
 * @version 1.0
 * @className MyAccessDeniedHandler
 * @description TODO
 * @date 2019/3/22 4:07
 **/
@Component
public class MyAccessDeniedHandler implements AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AccessDeniedException e) throws IOException, ServletException {
        //返回json形式的错误信息
        httpServletResponse.setCharacterEncoding("UTF-8");
        httpServletResponse.setContentType("application/json");

        httpServletResponse.getWriter().println("{\"code\":403,\"message\":\"小弟弟，你没有权限访问呀！\",\"data\":\"\"}");
        httpServletResponse.getWriter().flush();
    }
}
