package com.cqnu.harunasandrivingtestingsystem;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

// @SpringBootApplication(exclude = DataSourceAutoConfiguration.class)  // 标注一个主程序类，说明这是一个主程序
@SpringBootApplication
@MapperScan("com.cqnu.harunasandrivingtestingsystem.mapper")
public class HarunasandrivingtestingsystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(HarunasandrivingtestingsystemApplication.class, args);


    }
}
