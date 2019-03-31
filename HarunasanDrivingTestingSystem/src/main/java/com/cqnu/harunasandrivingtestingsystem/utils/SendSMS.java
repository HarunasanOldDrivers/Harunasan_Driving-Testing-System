package com.cqnu.harunasandrivingtestingsystem.utils;

import com.github.qcloudsms.SmsSingleSender;
import com.github.qcloudsms.SmsSingleSenderResult;
import com.github.qcloudsms.httpclient.HTTPException;
import org.json.JSONException;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * @author LiAixing
 * @version 1.0
 * @className SendSMS
 * @description TODO
 * @date 2019/2/16 16:30
 **/
@Component
public class SendSMS {
    /**
     * appid
     * 1400开头
     */
    public static int appid = 1400182868;

    /**
     * 短信应用SDK AppKey
     */
    public  static String appkey = "d70cbea690cea67c07ffa262c5a7cb7c";

    /**
     *  需要发送短信的手机号码
     */
    private static String[] phoneNumbers = null;

    /**
     * 短信模板ID，需要在短信应用中申请
     */
    private static int templateId = 276283;


    /**
     * 签名
     * NOTE: 这里的签名"虚数时间"只是一个示例，真实的签名需要在短信控制台中申请，另外签名参数使用的是`签名内容`，而不是`签名ID`
     */
    private static String smsSign = "虚数时间";

    public SmsSingleSenderResult sendSMS(String telphone, String verifyCode){

//        phoneNumbers[0] = telphone;

        try {
            //数组具体的元素个数和模板中变量个数必须一致，例如事例中templateId:5678对应一个变量，参数数组中元素个数也必须是一个
            String[] params = {verifyCode,"5"};
            SmsSingleSender ssender = new SmsSingleSender(appid, appkey);
            // 签名参数未提供或者为空时，会使用默认签名发送短信
            SmsSingleSenderResult result = ssender.sendWithParam("86", telphone,
                    templateId, params, smsSign, "", "");
            return result;
        } catch (HTTPException e) {
            // HTTP响应码错误
            e.printStackTrace();
        } catch (JSONException e) {
            // json解析错误
            e.printStackTrace();
        } catch (IOException e) {
            // 网络IO错误
            e.printStackTrace();
        }
        return null;
    }

    public SmsSingleSenderResult sendSMSAudit(String telphone, String schoolName, String text){

//        phoneNumbers[0] = telphone;

        try {
            //数组具体的元素个数和模板中变量个数必须一致，例如事例中templateId:5678对应一个变量，参数数组中元素个数也必须是一个
            String[] params = {schoolName,text};
            SmsSingleSender ssender = new SmsSingleSender(appid, appkey);
            // 签名参数未提供或者为空时，会使用默认签名发送短信
            SmsSingleSenderResult result = ssender.sendWithParam("86", telphone,
                    304273, params, smsSign, "", "");
            return result;
        } catch (HTTPException e) {
            // HTTP响应码错误
            e.printStackTrace();
        } catch (JSONException e) {
            // json解析错误
            e.printStackTrace();
        } catch (IOException e) {
            // 网络IO错误
            e.printStackTrace();
        }
        return null;
    }
    public SmsSingleSenderResult sendSMSAudit2(String telphone, String schoolName){

//        phoneNumbers[0] = telphone;

        try {
            //数组具体的元素个数和模板中变量个数必须一致，例如事例中templateId:5678对应一个变量，参数数组中元素个数也必须是一个
            String[] params = {schoolName};
            SmsSingleSender ssender = new SmsSingleSender(appid, appkey);
            // 签名参数未提供或者为空时，会使用默认签名发送短信
            SmsSingleSenderResult result = ssender.sendWithParam("86", telphone,
                    305362, params, smsSign, "", "");
            return result;
        } catch (HTTPException e) {
            // HTTP响应码错误
            e.printStackTrace();
        } catch (JSONException e) {
            // json解析错误
            e.printStackTrace();
        } catch (IOException e) {
            // 网络IO错误
            e.printStackTrace();
        }
        return null;
    }


    public static void main(String[] args) {
//        SmsSingleSenderResult result = new SendSMS().sendSMS("18523191495","123456");


    }
}
