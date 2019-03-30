package com.cqnu.harunasandrivingtestingsystem.utils;

import static org.apache.commons.codec.binary.Base64.encodeBase64String;
import static org.apache.commons.codec.digest.Sha2Crypt.sha256Crypt;

/**
 * @author LiAixing
 * @version 1.0
 * @className Password2Hash
 * @description TODO encode password by sha256 with account which has been encode by Base64 as salt
 * @date 2019/2/14 19:09
 **/
public class Password2Hash {

    public static String sha256CryptWithSalt(String password, String account){

        byte[] plaintext = password.getBytes();
        // 以sha256算法进行加盐加密
        return sha256Crypt(plaintext,"$5$"+encodeBase64String(account.getBytes()));
    }

}
