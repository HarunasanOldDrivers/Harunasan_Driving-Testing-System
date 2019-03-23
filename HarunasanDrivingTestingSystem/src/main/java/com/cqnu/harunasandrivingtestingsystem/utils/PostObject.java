package com.cqnu.harunasandrivingtestingsystem.utils;

import com.aliyun.oss.common.auth.ServiceSignature;
import com.aliyun.oss.common.utils.BinaryUtil;
import com.aliyun.oss.internal.OSSUtils;

import com.aliyun.oss.model.Callback;
import org.apache.commons.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.activation.MimetypesFileTypeMap;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.*;

@Component
public class PostObject {
    Logger logger = LoggerFactory.getLogger(PostObject.class);
    // 上传文件
    private String postFileName = "";

    // Endpoint以杭州为例，其它Region请按实际情况填写。
    @Value("${oss.ossEndpoint}")
    private String ossEndpoint;

    // 阿里云主账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM账号进行API访问或日常运维，请登录 https://ram.console.aliyun.com 创建RAM账号。
    @Value("${oss.ossAccessId}")
    private String ossAccessId;

    @Value("${oss.ossAccessKey}")
    private String ossAccessKey;

    // 存储空间名称
    @Value("${oss.bucket}")
    private String bucket;

    // 文件名称
    private String objectName = "";

    /**
     * 表单上传
     * @throws Exception
     * @return String url
     */
    public String PostObject(String fileLocalPath,String fileName) throws Exception {

        String url = "";

        String filepath = fileLocalPath;
        objectName = fileName;
        String urlStr = ossEndpoint.replace("https://", "https://"+bucket+"."); // 提交表单的URL为bucket域名

        LinkedHashMap<String, String> textMap = new LinkedHashMap<String, String>();
        // key
        String objectName = this.objectName;
        textMap.put("key", objectName);
        // Content-Disposition
        //textMap.put("Content-Disposition", "attachment;filename="+filepath);
        // OSSAccessKeyId
        textMap.put("OSSAccessKeyId", ossAccessId);
        // policy
        String policy = "{\"expiration\": \"2120-01-01T12:00:00.000Z\",\"conditions\": [[\"content-length-range\", 0, 104857600]]}";
        String encodePolicy = java.util.Base64.getEncoder().encodeToString(policy.getBytes());
//        logger.info(encodePolicy);
        textMap.put("policy", encodePolicy);
        // Signature
        String signaturecom = com.aliyun.oss.common.auth.ServiceSignature.create().computeSignature(ossAccessKey, encodePolicy);
//        logger.info(signaturecom);
        textMap.put("Signature", signaturecom);

        Map<String, String> fileMap = new HashMap<String, String>();
        fileMap.put("file", filepath);

        String ret = formUpload(urlStr, textMap, fileMap);
//        logger.info("[" + bucket + "] post_object:" + objectName);
//        logger.info("urlStr:"+urlStr);
//        logger.info("post reponse:" + ret);
        return url;

    }

    private String formUpload(String urlStr, Map<String, String> textMap, Map<String, String> fileMap) throws Exception {
        String res = "";
        HttpURLConnection conn = null;
        String BOUNDARY = "9431149156168";
        try {
            URL url = new URL(urlStr);
//            logger.info("url:"+url);
            conn = (HttpURLConnection) url.openConnection();
            conn.setConnectTimeout(5000);
            conn.setReadTimeout(30000);
            conn.setDoOutput(true);
            conn.setDoInput(true);
            conn.setRequestMethod("POST");
            conn.setRequestProperty("User-Agent",
                    "Mozilla/5.0 (Windows; U; Windows NT 6.1; zh-CN; rv:1.9.2.6)");
            conn.setRequestProperty("Content-Type",
                    "multipart/form-data; boundary=" + BOUNDARY);

            OutputStream out = new DataOutputStream(conn.getOutputStream());
            // text
            if (textMap != null) {
                StringBuffer strBuf = new StringBuffer();
                Iterator iter = textMap.entrySet().iterator();
                int i = 0;
                while (iter.hasNext()) {
                    Map.Entry entry = (Map.Entry) iter.next();
                    String inputName = (String) entry.getKey();
                    String inputValue = (String) entry.getValue();
                    if (inputValue == null) {
                        continue;
                    }
                    if (i == 0) {
                        strBuf.append("--").append(BOUNDARY).append(
                                "\r\n");
                        strBuf.append("Content-Disposition: form-data; name=\""
                                + inputName + "\"\r\n\r\n");
                        strBuf.append(inputValue);
                    } else {
                        strBuf.append("\r\n").append("--").append(BOUNDARY).append(
                                "\r\n");
                        strBuf.append("Content-Disposition: form-data; name=\""
                                + inputName + "\"\r\n\r\n");

                        strBuf.append(inputValue);
                    }

                    i++;
                }
                out.write(strBuf.toString().getBytes());
            }

            // file
            if (fileMap != null) {
                Iterator iter = fileMap.entrySet().iterator();
                while (iter.hasNext()) {
                    Map.Entry entry = (Map.Entry) iter.next();
                    String inputName = (String) entry.getKey();
                    String inputValue = (String) entry.getValue();
                    if (inputValue == null) {
                        continue;
                    }
                    File file = new File(inputValue);
                    String filename = file.getName();
//                    String contentType = new MimetypesFileTypeMap().getContentType(file);
                    String contentType = "image";
                    if (contentType == null || contentType.equals("")) {
                        contentType = "image";
                    }

                    StringBuffer strBuf = new StringBuffer();
                    strBuf.append("\r\n").append("--").append(BOUNDARY).append(
                            "\r\n");
                    strBuf.append("Content-Disposition: form-data; name=\""
                            + inputName + "\"; filename=\"" + filename
                            + "\"\r\n");

                    strBuf.append("Content-Type: " + contentType + "\r\n\r\n");
//                    logger.info(contentType);
                    out.write(strBuf.toString().getBytes());

                    DataInputStream in = new DataInputStream(new FileInputStream(file));
                    int bytes = 0;
                    byte[] bufferOut = new byte[1024];
                    while ((bytes = in.read(bufferOut)) != -1) {
                        out.write(bufferOut, 0, bytes);
                    }
                    in.close();
                }
                StringBuffer strBuf = new StringBuffer();
                out.write(strBuf.toString().getBytes());
            }

            byte[] endData = ("\r\n--" + BOUNDARY + "--\r\n").getBytes();
            out.write(endData);
            out.flush();
            out.close();

            // 读取返回数据
            StringBuffer strBuf = new StringBuffer();
            BufferedReader reader = new BufferedReader(new InputStreamReader(
                    conn.getInputStream()));
            String line = null;
            while ((line = reader.readLine()) != null) {
                strBuf.append(line).append("\n");
            }
            res = strBuf.toString();
            reader.close();
            reader = null;
        } catch (Exception e) {
            logger.error("发送POST请求出错: " + urlStr);
            logger.error(e.getMessage());
            throw e;
        } finally {
            if (conn != null) {
                conn.disconnect();
                conn = null;
            }
        }
        return res;
    }

    public String getUUID(){
        return UUID.randomUUID().toString().replace("-","");
    }

//    public static void main(String[] args) throws Exception {
//        PostObjectSample ossPostObject = new PostObjectSample();
//        ossPostObject.PostObject();
//    }
}
