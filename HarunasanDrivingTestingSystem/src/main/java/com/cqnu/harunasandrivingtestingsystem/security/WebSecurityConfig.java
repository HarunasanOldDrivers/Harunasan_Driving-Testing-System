package com.cqnu.harunasandrivingtestingsystem.security;

import com.cqnu.harunasandrivingtestingsystem.security.filter.AuthenticationTokenFilter;
import com.cqnu.harunasandrivingtestingsystem.security.handler.EntryPointUnauthorizedHandler;
import com.cqnu.harunasandrivingtestingsystem.security.handler.MyAccessDeniedHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * @author LiAixing
 * @version 1.0
 * @className WebSecurityConfig
 * @description TODO
 * @date 2019/3/20 11:11
 **/

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    /**
     * 注册 401 处理器
     */
    @Autowired
    private EntryPointUnauthorizedHandler unauthorizedHandler;

    /**
     * 注册 403 处理器
     */
    @Autowired
    private MyAccessDeniedHandler accessDeniedHandler;


    @Bean
    public AuthenticationTokenFilter authenticationTokenFilterBean() throws Exception {
        AuthenticationTokenFilter authenticationTokenFilter = new AuthenticationTokenFilter();
        authenticationTokenFilter.setAuthenticationManager(authenticationManagerBean());
        return authenticationTokenFilter;
    }



    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {


        httpSecurity.csrf().disable().
                sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                .and()
//                .formLogin()
//                .loginPage("/index").permitAll()
                .and()
                .authorizeRequests()
                .antMatchers("/index").permitAll()
                .antMatchers("/nav").permitAll()
//                .antMatchers("/druid/**").hasRole("User")
                .antMatchers("/**").permitAll()
//                .antMatchers("/druid/**").hasRole("Admin_root")
//                .antMatchers("/druid/**").permitAll()
                .antMatchers("/api/**").permitAll()
                // 把不需要认证的接口暴露出去。登录，刷新token，
                .antMatchers("/auth/**").permitAll()
                .anyRequest().authenticated()

                .and().headers().cacheControl();
        httpSecurity
                .addFilterBefore(authenticationTokenFilterBean(), UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling()
                // 添加 token 无效或者没有携带 token 时的处理
                .authenticationEntryPoint(this.unauthorizedHandler)
                // 添加无权限时的处理
                .accessDeniedHandler(this.accessDeniedHandler);

        // 这块是配置跨域请求的
        // ExpressionUrlAuthorizationConfigurer<HttpSecurity>.ExpressionInterceptUrlRegistry registry = httpSecurity.authorizeRequests();
        //让Spring security放行所有preflight request
//        registry.requestMatchers(CorsUtils::isPreFlightRequest).permitAll();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        //解决静态资源被拦截的问题
        web.ignoring().antMatchers("/static/**")
                .antMatchers("/js/**")
                .antMatchers("/images/**")
                .antMatchers("/css/**")
                .antMatchers("/fonts/**");
    }
}
