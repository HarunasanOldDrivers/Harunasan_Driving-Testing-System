package com.cqnu.harunasandrivingtestingsystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
public class HarunasandrivingtestingsystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(HarunasandrivingtestingsystemApplication.class, args);
    }
}
