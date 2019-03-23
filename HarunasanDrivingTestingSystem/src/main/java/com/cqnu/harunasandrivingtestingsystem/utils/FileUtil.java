package com.cqnu.harunasandrivingtestingsystem.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class FileUtil {

    static Logger logger = LoggerFactory.getLogger(FileUtil.class);
    /**
     *文件上传工具类服务方法
     * @param  * @param file
     * @param filePath
     * @param fileName
     * @return
     */
    public static void uploadFile(byte[] file,String filePath,String fileName)throws Exception{
        File targetFile = new File(filePath);
        if(!targetFile.exists()){
            targetFile.mkdirs();
        }
        FileOutputStream out = new FileOutputStream(filePath+fileName);
        out.write(file);
        out.flush();
        out.close();

    }

    /**
     *获取文件后缀名
     * @param  * @param fileName
     * @return String
     */
    public static String getSuffix(String fileName){
        return fileName.substring(fileName.lastIndexOf("."));
    }
    /**
     *生成新的文件名
     * @param  * @param fileOriginName 源文件名
     * @return
     */
    public static String getFileName(String fileOriginName){
        return getUUID() + getSuffix(fileOriginName);
    }
    /**
     *生成文件名
     * @param  * @param
     * @return
     */
    public static String getUUID(){
        return UUID.randomUUID().toString().replace("-","");
    }

    /**
     * 删除临时文件
     * @param filePath
     */
    public static void deleteFile(String filePath){
        File targetFile = new File(filePath);

        if(targetFile.isFile()){
            targetFile.delete();
            logger.info("文件删除成功");
            return;
        }

        String [] list = targetFile.list();
        for (int i = 0; i < list.length; i++) {
            deleteFile(filePath+File.separator+list[i]);
        }
        //targetFile.delete();
        return;
    }
    /**
     * 上传多个文件
     */
    public static List<String> saveUploadFiles(List<MultipartFile> files,String uploadPath) throws IOException{

        List<String> paths=new ArrayList<>();


        for (MultipartFile file : files) {
            if (file.isEmpty()) {
                continue;
            }
            byte[] bytes = file.getBytes();
            String fileLocalName = getFileName(file.getOriginalFilename());
            Path path = Paths.get(uploadPath + fileLocalName);

            //保存上传文件的访问路径
            paths.add(uploadPath + fileLocalName);
            Files.write(path, bytes);
        }
        return paths;
    }

}

