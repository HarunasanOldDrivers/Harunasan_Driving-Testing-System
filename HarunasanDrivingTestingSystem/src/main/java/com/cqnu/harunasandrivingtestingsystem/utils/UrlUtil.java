package com.cqnu.harunasandrivingtestingsystem.utils;

import com.aliyun.oss.OSSClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;

import java.net.URL;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
public class UrlUtil {

    @Value("${oss.ossEndpoint}")
    private String endpoint;

    @Value("${oss.ossAccessId}")
    private String accessKeyId;

    @Value("${oss.ossAccessKey}")
    private String accessKeySecret;

    @Value("${oss.bucket}")
    private String bucketName;

    @Value("${oss.cachePath}")
    private String cachePath;

    public String getUrl(String fileName){

        String url = "";
        OSSClient ossClient = new OSSClient(endpoint,accessKeyId,accessKeySecret);
        Date expiration = new Date(2020, 11, 17);
        URL url0 = ossClient.generatePresignedUrl(bucketName, fileName, expiration);
       // String url = url0.toString();
       // String s = "s";
        url = url0.toString();
        return url;
    }

    public List<String> getUrls(List<String> paths){
        List<String> urlList = new ArrayList<>();

        String filePath = cachePath;
        String fileName = "";
        String url = "";

        for(String path : paths){
            //获取文件名
            fileName = path.replace(filePath,"");
            url = getUrl("school/seniority/" + fileName);
            urlList.add(url);
            FileUtil.deleteFile(path);
        }

        return urlList;
    }
}
