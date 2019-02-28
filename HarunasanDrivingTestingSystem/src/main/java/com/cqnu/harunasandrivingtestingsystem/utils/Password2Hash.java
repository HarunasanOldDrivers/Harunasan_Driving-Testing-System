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
        return sha256Crypt(plaintext,"$5$"+encodeBase64String(account.getBytes()));
    }

//    public static void main(String[] args) {
//        System.out.println(sha256CryptWithSalt("123456","10000001"));
//    }
}
