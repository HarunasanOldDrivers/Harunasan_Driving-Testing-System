package com.cqnu.harunasandrivingtestingsystem.controller;

import com.cqnu.harunasandrivingtestingsystem.entity.MistakesCollectionOne;
import com.cqnu.harunasandrivingtestingsystem.exception.GlobalException;
import com.cqnu.harunasandrivingtestingsystem.entity.QuestionsOne;
import com.cqnu.harunasandrivingtestingsystem.entity.Result;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.PageInfo;
import com.cqnu.harunasandrivingtestingsystem.security.JwtTokenUtil;
import com.cqnu.harunasandrivingtestingsystem.service.impl.QuestionsOneServiceImpl;
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
 * @description TODO
 * @date 2019/3/15 1:19
 **/

@RestController
@RequestMapping("/api/train/one")
public class TrainOneController {

    private Logger logger = LoggerFactory.getLogger(TrainOneController.class);

    private final String STATUS_JUDGE_TRUE = "true";
    private final String STATUS_JUDGE_FALSE = "false";

    @Resource
    private QuestionsOneServiceImpl questionsService;

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


    @GetMapping("/random")
    public QuestionsOne randomTrain(){
        return questionsService.randomTrain();
    }

    @GetMapping("/order")
    public QuestionsOne orderTrain(int id) {  return questionsService.orderTrain(id);}

    @GetMapping("/orderChapter")
    public QuestionsOne orderChapter(int id, String chapter) throws UnsupportedEncodingException {
        return questionsService.orderTrainByChapter(id, URLDecoder.decode(chapter,"UTF-8"));
    }

    @GetMapping("/randomChapter")
    public QuestionsOne randomChapter(String chapter) throws UnsupportedEncodingException {
        return questionsService.randomTrainByChapter(URLDecoder.decode(chapter,"UTF-8"));
    }

    @GetMapping("/orderDifficulty")
    public QuestionsOne orderDifficulty(Integer id, Integer difficulty) {
        return questionsService.orderTrainByDifficulty(id, difficulty);
    }

    @GetMapping("/randomDifficulty")
    public QuestionsOne randomDifficulty(Integer difficulty) {
        return questionsService.randomTrainByDifficulty(difficulty);
    }

    @GetMapping("/orderKnowledge")
    public QuestionsOne orderKnowledge(Integer id,String knowledge) throws UnsupportedEncodingException {
        return questionsService.orderTrainByKnowledge(id,URLDecoder.decode(knowledge,"UTF-8"));
    }

    @GetMapping("/randomKnowledge")
    public QuestionsOne randomKnowledge(String knowledge) throws UnsupportedEncodingException {
        return questionsService.randomTrainByKnowledge(URLDecoder.decode(knowledge,"UTF-8"));
    }

    /**
     *
     * @param id 顺序id
     * @param type  judge,single,multi
     * @return
     * @throws UnsupportedEncodingException
     */
    @GetMapping("/orderType")
    public QuestionsOne orderType(Integer id,String type) throws UnsupportedEncodingException {
        return questionsService.orderTrainByType(id,URLDecoder.decode(type,"UTF-8"));
    }

    @GetMapping("/randomType")
    public QuestionsOne randomType(String type) throws UnsupportedEncodingException {
        return questionsService.randomTrainByType(URLDecoder.decode(type,"UTF-8"));
    }

    @GetMapping("/orderImage")
    public QuestionsOne orderImage(Integer id) {
        return questionsService.orderTrainByImage(id);
    }

    @GetMapping("/randomImage")
    public QuestionsOne randomImage()  {
        return questionsService.randomTrainByImage();
    }

    @GetMapping("/orderWord")
    public QuestionsOne orderWord(Integer id) {
        return questionsService.orderTrainByWord(id);
    }

    @GetMapping("/randomWord")
    public QuestionsOne randomWord()  {
        return questionsService.randomTrainByWord();
    }

    @GetMapping("/getCount")
    public int getCount(){
        return questionsService.getCount();
    }

    @GetMapping("/getCountByChapter")
    public int getCountByChapter(String chapter){
        return questionsService.getCountByChapter(chapter);
    }

    @GetMapping("/getCountByDifficulty")
    public int getCountByDifficulty(Integer difficulty){
        return questionsService.getCountByDifficulty(difficulty);
    }

    @GetMapping("/getCountByKnowledge")
    public int getCountByKnowledge(String knowledge){
        return questionsService.getCountByKnowledge(knowledge);
    }

    @GetMapping("/getCountByType")
    public int getCountByType(String type){
        return questionsService.getCountByType(type);
    }

    @GetMapping("/getCountByImage")
    public int getCountByImage(){
        return questionsService.getCountByImage();
    }


    @GetMapping("/getCountByWord")
    public int getCountByWord(){
        return questionsService.getCountByWord();
    }

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

    @GetMapping("/questions")
    public PageInfo<QuestionsOne> getQuestions(@RequestParam(defaultValue = "1") int pageNo, @RequestParam(defaultValue = "10") int pageSize){
        PageHelper.startPage(pageNo,pageSize);
        PageInfo<QuestionsOne> pageInfo = new PageInfo<>(questionsService.getQuestions());
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
    public QuestionsOne getOrderMistake(@RequestParam(defaultValue = "1") Integer id){
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
    public QuestionsOne getRandomMistake(){
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
    @PreAuthorize("hasRole('User')")
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
    public PageInfo<QuestionsOne> getMistakes(@RequestParam(defaultValue = "1") int pageNo, @RequestParam(defaultValue = "5") int pageSize){
        String authToken = request.getHeader(this.tokenHeader);
        String username = this.tokenUtils.getUsernameFromToken(authToken);
        if (StringUtils.isEmpty(authToken) || StringUtils.isEmpty(username)){
            throw new GlobalException("510","请登录后操作");
        }
        PageHelper.startPage(pageNo,pageSize);
        PageInfo<QuestionsOne> pageInfo = new PageInfo<>(questionsService.getMistakes(Integer.valueOf(username)));
        return pageInfo;
    }
}
