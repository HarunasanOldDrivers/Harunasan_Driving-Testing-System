package com.cqnu.harunasandrivingtestingsystem.controller;

import com.cqnu.harunasandrivingtestingsystem.entity.QuestionsOne;
import com.cqnu.harunasandrivingtestingsystem.exception.GlobalException;
import com.cqnu.harunasandrivingtestingsystem.entity.QuestionsFour;
import com.cqnu.harunasandrivingtestingsystem.entity.Result;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.PageInfo;
import com.cqnu.harunasandrivingtestingsystem.security.JwtTokenUtil;
import com.cqnu.harunasandrivingtestingsystem.service.impl.QuestionsFourServiceImpl;
import com.cqnu.harunasandrivingtestingsystem.utils.ResultUtil;
import com.github.pagehelper.PageHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

/**
 * @author LiAixing
 * @version 1.0
 * @className TrainController
 * @description 科目四练习Controller
 * @date 2019/3/15 1:19
 **/

@RestController
@RequestMapping("/api/train/four")
public class TrainFourController {

    private Logger logger = LoggerFactory.getLogger(TrainFourController.class);

    private final String STATUS_JUDGE_TRUE = "true";
    private final String STATUS_JUDGE_FALSE = "false";

    @Resource
    private QuestionsFourServiceImpl questionsService;

    @Autowired
    private HttpServletRequest request;

    /**
     * json web token 在请求头的名字
     */
    @Value("${jwt.header}")
    private String tokenHeader;

    /**
     * 辅助操作 token 的工具类
     */
    @Autowired
    private JwtTokenUtil tokenUtils;

    /**
     * 随机获取一道题
     * @return
     */
    @GetMapping("/random")
    public QuestionsFour randomTrain(){
        return questionsService.randomTrain();
    }

    /**
     * 随机获取一道题
     * @return
     */
    @GetMapping("/order")
    public QuestionsFour orderTrain(int id) {  return questionsService.orderTrain(id);}


    /**
     * 按章节顺序获取题目
     * @param id 序号
     * @param chapter 章节
     * @return
     * @throws UnsupportedEncodingException
     */
    @GetMapping("/orderChapter")
    public QuestionsFour orderChapter(int id, String chapter) throws UnsupportedEncodingException {
        return questionsService.orderTrainByChapter(id, URLDecoder.decode(chapter,"UTF-8"));
    }

    /**
     * 按章节随机获取题目
     * @param chapter 章节
     * @return
     * @throws UnsupportedEncodingException
     */
    @GetMapping("/randomChapter")
    public QuestionsFour randomChapter(String chapter) throws UnsupportedEncodingException {
        return questionsService.randomTrainByChapter(URLDecoder.decode(chapter,"UTF-8"));
    }

    /**
     * 按难度顺序获取题目
     * @param id 序号
     * @param difficulty 难度
     * @return
     */
    @GetMapping("/orderDifficulty")
    public QuestionsFour orderDifficulty(Integer id, Integer difficulty) {
        return questionsService.orderTrainByDifficulty(id, difficulty);
    }

    /**
     * 按难度随机获取题目
     * @param difficulty 难度
     * @return
     */
    @GetMapping("/randomDifficulty")
    public QuestionsFour randomDifficulty(Integer difficulty) {
        return questionsService.randomTrainByDifficulty(difficulty);
    }

    /**
     * 按知识点顺序获取题目
     * @param id 序号
     * @param knowledge 知识点
     * @return
     */
    @GetMapping("/orderKnowledge")
    public QuestionsFour orderKnowledge(Integer id,String knowledge) throws UnsupportedEncodingException {
        return questionsService.orderTrainByKnowledge(id,URLDecoder.decode(knowledge,"UTF-8"));
    }

    /**
     * 按知识点顺序获取题目
     * @param knowledge 知识点
     * @return
     */
    @GetMapping("/randomKnowledge")
    public QuestionsFour randomKnowledge(String knowledge) throws UnsupportedEncodingException {
        return questionsService.randomTrainByKnowledge(URLDecoder.decode(knowledge,"UTF-8"));
    }

    /**
     * 按类型顺序获取题目
     * @param id 顺序id
     * @param type  judge,single,multi
     * @return
     * @throws UnsupportedEncodingException
     */
    @GetMapping("/orderType")
    public QuestionsFour orderType(Integer id,String type) throws UnsupportedEncodingException {
        return questionsService.orderTrainByType(id,URLDecoder.decode(type,"UTF-8"));
    }

    /**
     * 按类型随机获取题目
     * @param type  judge,single,multi
     * @return
     * @throws UnsupportedEncodingException
     */
    @GetMapping("/randomType")
    public QuestionsFour randomType(String type) throws UnsupportedEncodingException {
        return questionsService.randomTrainByType(URLDecoder.decode(type,"UTF-8"));
    }

    /**
     * 顺序获取图片题
     * @param id 序号
     * @return
     */
    @GetMapping("/orderImage")
    public QuestionsFour orderImage(Integer id) {
        return questionsService.orderTrainByImage(id);
    }

    /**
     * 随机获取图片题
     * @return
     */
    @GetMapping("/randomImage")
    public QuestionsFour randomImage()  {
        return questionsService.randomTrainByImage();
    }

    /**
     * 顺序获取文字题
     * @param id 序号
     * @return
     */
    @GetMapping("/orderWord")
    public QuestionsFour orderWord(Integer id) {
        return questionsService.orderTrainByWord(id);
    }

    /**
     * 随机获取文字题
     * @return
     */
    @GetMapping("/randomWord")
    public QuestionsFour randomWord()  {
        return questionsService.randomTrainByWord();
    }

    /**
     * 题目总数
     * @return
     */
    @GetMapping("/getCount")
    public int getCount(){
        return questionsService.getCount();
    }
    /**
     * 按章节获取题目数
     * @param chapter 章节
     * @return
     */
    @GetMapping("/getCountByChapter")
    public int getCountByChapter(String chapter){
        return questionsService.getCountByChapter(chapter);
    }

    /**
     * 按难度获取题目数
     * @param difficulty 难度
     * @return
     */
    @GetMapping("/getCountByDifficulty")
    public int getCountByDifficulty(Integer difficulty){
        return questionsService.getCountByDifficulty(difficulty);
    }

    /**
     * 按知识点获取题目数
     * @param knowledge 知识点
     * @return
     */
    @GetMapping("/getCountByKnowledge")
    public int getCountByKnowledge(String knowledge){
        return questionsService.getCountByKnowledge(knowledge);
    }

    /**
     * 按类型获取题目数
     * @param type 类型
     * @return
     */
    @GetMapping("/getCountByType")
    public int getCountByType(String type){
        return questionsService.getCountByType(type);
    }

    /**
     * 获取图片题总数
     * @return
     */
    @GetMapping("/getCountByImage")
    public int getCountByImage(){
        return questionsService.getCountByImage();
    }


    /**
     * 获取文字题总数
     * @return
     */
    @GetMapping("/getCountByWord")
    public int getCountByWord(){
        return questionsService.getCountByWord();
    }

    /**
     * 单选判断对错
     * @param qoId 题目id
     * @param answer 回答
     * @return
     */
    @PostMapping("/judgeSingle")
    public Result judgeSingle(Integer qoId, String answer){
        String authToken = request.getHeader(this.tokenHeader);
        String username = this.tokenUtils.getUsernameFromToken(authToken);
        if (StringUtils.isEmpty(authToken) || StringUtils.isEmpty(username)){
            return ResultUtil.failure(510,"请登录后操作");
        }
        logger.info("autoToken: " + authToken + "username: " + username);
        String end = questionsService.judge(qoId,answer);
        if (STATUS_JUDGE_TRUE.equals(end)){
            return ResultUtil.success();
        } else if (STATUS_JUDGE_FALSE.equals(end)){
            return ResultUtil.failure(600,"参数错误");
        } else {

            return ResultUtil.failure(601,end);
        }

    }

    /**
     * 获取所有题目
     * @param pageNo  当前页
     * @param pageSize  分页大小
     * @return
     */
    @GetMapping("/questions")
    public PageInfo<QuestionsFour> getQuestions(@RequestParam(defaultValue = "1") int pageNo, @RequestParam(defaultValue = "10") int pageSize){
        PageHelper.startPage(pageNo,pageSize);
        PageInfo<QuestionsFour> pageInfo = new PageInfo<>(questionsService.getQuestions());
        return pageInfo;
    }

    /**
     * 添加错题集
     * @param id 题目id
     * @return  code: 200   成功
     *          code: 510   请登录
     *          code: 511   错题已存在
     *          code: 512   插入错题集失败
     */
    @PreAuthorize("hasRole('User')")
    @PostMapping("/addMistake")
    public Result addMistake(Integer id){
        String authToken = request.getHeader(this.tokenHeader);
        String username = this.tokenUtils.getUsernameFromToken(authToken);
        if (StringUtils.isEmpty(authToken) || StringUtils.isEmpty(username)){
            return ResultUtil.failure(510,"请登录后操作");
        }
        int result = questionsService.addMistake(Integer.valueOf(username),id);
        switch (result){
            case 1: return ResultUtil.success();
            case 2: return ResultUtil.failure(511,"错题已存在");
            default: return ResultUtil.failure(512,"插入错题集失败");
        }
    }

    /**
     * 顺序获取错题
     * @param id  当前题目序号
     * @return
     */
    @PreAuthorize("hasRole('User')")
    @GetMapping("/getOrderMistake")
    public QuestionsFour getOrderMistake(@RequestParam(defaultValue = "1") Integer id){
        String authToken = request.getHeader(this.tokenHeader);
        String username = this.tokenUtils.getUsernameFromToken(authToken);
        if (StringUtils.isEmpty(authToken) || StringUtils.isEmpty(username)){
            throw new GlobalException("未登录");
        }
        return questionsService.orderMistake(id, Integer.valueOf(username));
    }

    /**
     * 随机获取错题
     * @return
     */
    @PreAuthorize("hasRole('User')")
    @GetMapping("/getRandomMistake")
    public QuestionsFour getRandomMistake(){
        String authToken = request.getHeader(this.tokenHeader);
        String username = this.tokenUtils.getUsernameFromToken(authToken);
        if (StringUtils.isEmpty(authToken) || StringUtils.isEmpty(username)){
            throw new GlobalException("未登录");
        }
        return questionsService.randomMistake(Integer.valueOf(username));
    }

    /**
     * 删除错题
     * @param id 错题的题目id
     * @return  code: 200 成功
     *          code: 510 请登录后操作
     *          code: 513 删除错题失败
     */
    @PreAuthorize("hasAnyRole('User')")
    @PostMapping("/deleteMistake")
    public Result deleteMistake(Integer id){
        String authToken = request.getHeader(this.tokenHeader);
        String username = this.tokenUtils.getUsernameFromToken(authToken);
        if (StringUtils.isEmpty(authToken) || StringUtils.isEmpty(username)){
            return ResultUtil.failure(510,"请登录后操作");
        }
        return questionsService.deleteMistake(Integer.valueOf(username),id) == 1?ResultUtil.success():ResultUtil.failure(513,"删除错题失败");
    }

    /**
     * 获取错题集
     * @param pageNo    当前分页
     * @param pageSize  分页大小
     * @return
     */
    @GetMapping("/mistakes")
    @PreAuthorize("hasRole('User')")
    public PageInfo<QuestionsFour> getMistakes(@RequestParam(defaultValue = "1") Integer pageNo, @RequestParam(defaultValue = "3") Integer pageSize){
        String authToken = request.getHeader(this.tokenHeader);
        String username = this.tokenUtils.getUsernameFromToken(authToken);
        if (StringUtils.isEmpty(authToken) || StringUtils.isEmpty(username)){
            throw new GlobalException("510","请登录后操作");
        }
        PageHelper.startPage(pageNo,pageSize);
        PageInfo<QuestionsFour> pageInfo = new PageInfo<>(questionsService.getMistakes(Integer.valueOf(username)));
        return pageInfo;
    }
}
