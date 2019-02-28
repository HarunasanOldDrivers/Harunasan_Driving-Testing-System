package com.cqnu.harunasandrivingtestingsystem.controller;

import com.cqnu.harunasandrivingtestingsystem.utils.SendSMS;
import com.github.qcloudsms.SmsSingleSenderResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

/**
 * @author LiAixing
 * @version 1.0
 * @className BaseUserController
 * @description TODO
 * @date 2019/2/14 19:02
 **/


@RestController
@RequestMapping("api/user")
public class BaseUserController {

    @Autowired
    private SendSMS sendSMS;

    /**
     * 发送验证码
     * @param phone
     * @return 响应参数
     *     "result": 0,   错误码，0 表示成功(计费依据)，非 0 表示失败
     *     "errmsg": "OK",  错误消息，result 非 0 时的具体错误信息
     *     "ext": "",   用户的 session 内容，腾讯 server 回包中会原样返回
     *     "fee": 1,    短信计费的条数
     *     "sid": "xxxxxxx"     本次发送标识 id，标识一次短信下发记录
     */
    @GetMapping("/sendSMS")
    public Map sendSMS(String phone){
        Map map = new HashMap();
        String verifyCode = String.valueOf((new Random()).nextInt(899999) + 100000);
        SmsSingleSenderResult result = sendSMS.sendSMS(phone, verifyCode);
        // 发送成功
        if (result.result == 0){
            map.put("result",result.result);
            map.put("VeriftyCode",verifyCode);
            return map;
        }

        map.put("result",result.result);
        map.put("errmsg",result.errMsg);
        map.put("ext",result.ext);
        map.put("fee",result.fee);

        return map;
    }


}
