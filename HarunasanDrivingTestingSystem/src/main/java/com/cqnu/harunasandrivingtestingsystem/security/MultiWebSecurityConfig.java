package com.cqnu.harunasandrivingtestingsystem.security;

/**
 * @author LiAixing
 * @version 1.0
 * @className MultiWebSecurityConfig
 * @description TODO
 * @date 2019/2/23 18:07
 **/

//@EnableWebSecurity
//@EnableGlobalMethodSecurity(prePostEnabled = true)
public class MultiWebSecurityConfig{

//
//    @Configuration
//    @Order(1)
//    public static class AdminWebSecurityConfig extends WebSecurityConfigurerAdapter{
//
//
//
//        @Bean
//        public AuthenticationTokenFilter authenticationTokenFilterBean() throws Exception {
//            AuthenticationTokenFilter adminAuthenticationTokenFilter = new AuthenticationTokenFilter();
//            adminAuthenticationTokenFilter.setAuthenticationManager(authenticationManagerBean());
//            return adminAuthenticationTokenFilter;
//        }
//
//
//
//        @Override
//        protected void configure(HttpSecurity httpSecurity) throws Exception {
//
//
//            httpSecurity.csrf().disable().
//                    sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                    .and()
//                    .authorizeRequests()
//                    .antMatchers("/druid/**").permitAll()
//                    .antMatchers("/api/**").permitAll()
//                    // 把不需要认证的接口暴露出去。登录，刷新token，
//                    .antMatchers("/auth/**").permitAll()
//                    .anyRequest().authenticated()
//                    .and().headers().cacheControl();
//            httpSecurity
//                    .addFilterBefore(authenticationTokenFilterBean(), UsernamePasswordAuthenticationFilter.class);
////                    .addFilterBefore(new AuthenticationTokenFilter(){{
////                        setAuthenticationManager(authenticationManagerBean());
////                    }}, UsernamePasswordAuthenticationFilter.class);
//            // 这块是配置跨域请求的
//            // ExpressionUrlAuthorizationConfigurer<HttpSecurity>.ExpressionInterceptUrlRegistry registry = httpSecurity.authorizeRequests();
//            //让Spring security放行所有preflight request
////        registry.requestMatchers(CorsUtils::isPreFlightRequest).permitAll();
//        }
//
//    }
//
//    @Configuration
//    @Order(2)
//    public static class UserWebSecurityConfig extends WebSecurityConfigurerAdapter{
//
//        /**
//         * 注册 token 转换拦截器为 bean
//         * 如果客户端传来了 token ，那么通过拦截器解析 token 赋予用户权限
//         *
//         * @return
//         * @throws Exception
//         */
////
////        @Bean
////        public UserAuthenticationTokenFilter authenticationTokenFilterBean() throws Exception {
////            UserAuthenticationTokenFilter userAuthenticationTokenFilter = new UserAuthenticationTokenFilter();
////            userAuthenticationTokenFilter.setAuthenticationManager(authenticationManagerBean());
////            return userAuthenticationTokenFilter;
////        }
//
//        @Override
//        protected void configure(HttpSecurity httpSecurity) throws Exception {
//            httpSecurity.csrf().disable().
//                    sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                    .and()
//                    .authorizeRequests()
//                    .antMatchers(HttpMethod.POST, "/**").permitAll()
////                .antMatchers("/druid/**").permitAll()
//                    .antMatchers("/api/**").permitAll()
//                    // 把不需要认证的接口暴露出去。登录，刷新token，
//                    .antMatchers("/auth/**").permitAll()
//                    .anyRequest().authenticated()
//                    .and()
//                    .formLogin().loginPage("/api/user/login").permitAll().and()
//                    .logout()
//                    .clearAuthentication(true)
//                    .and().headers().cacheControl();
//
////            httpSecurity
////                    .addFilterBefore(authenticationTokenFilterBean(), UsernamePasswordAuthenticationFilter.class);
//
//            // 注入我们刚才写好的 jwt过滤器
////        httpSecurity.addFilterBefore(jwtAuthenticationTokenFilter, UsernamePasswordAuthenticationFilter.class);
//
//
//            // 这块是配置跨域请求的
//            // ExpressionUrlAuthorizationConfigurer<HttpSecurity>.ExpressionInterceptUrlRegistry registry = httpSecurity.authorizeRequests();
//            //让Spring security放行所有preflight request
////        registry.requestMatchers(CorsUtils::isPreFlightRequest).permitAll();
//        }
//
//    }

}
