package com.cqnu.harunasandrivingtestingsystem.controller;

import com.cqnu.harunasandrivingtestingsystem.entity.QuestionsOne;
import com.cqnu.harunasandrivingtestingsystem.entity.Result;
import com.cqnu.harunasandrivingtestingsystem.entity.VO.PageInfo;
import com.cqnu.harunasandrivingtestingsystem.security.JwtTokenUtil;
import com.cqnu.harunasandrivingtestingsystem.service.impl.QuestionsFourServiceImpl;
import com.cqnu.harunasandrivingtestingsystem.service.impl.QuestionsOneServiceImpl;
import com.cqnu.harunasandrivingtestingsystem.utils.ResultUtil;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
    private QuestionsOneServiceImpl questionsOneService;

    @Resource
    QuestionsFourServiceImpl questionsFourService;

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
        return questionsOneService.randomTrain();
    }

    @GetMapping("/order")
    public QuestionsOne orderTrain(int id) {  return questionsOneService.orderTrain(id);}

    @GetMapping("/orderChapter")
    public QuestionsOne orderChapter(int id, String chapter) throws UnsupportedEncodingException {
        return questionsOneService.orderTrainByChapter(id, URLDecoder.decode(chapter,"UTF-8"));
    }

    @GetMapping("/randomChapter")
    public QuestionsOne randomChapter(String chapter) throws UnsupportedEncodingException {
        return questionsOneService.randomTrainByChapter(URLDecoder.decode(chapter,"UTF-8"));
    }

    @GetMapping("/orderDifficulty")
    public QuestionsOne orderDifficulty(int id, int difficulty) {
        return questionsOneService.orderTrainByDifficulty(id, difficulty);
    }

    @GetMapping("/randomDifficulty")
    public QuestionsOne randomDifficulty(int difficulty) {
        return questionsOneService.randomTrainByDifficulty(difficulty);
    }

    @GetMapping("/orderKnowledge")
    public QuestionsOne orderKnowledge(int id,String knowledge) throws UnsupportedEncodingException {
        return questionsOneService.orderTrainByKnowledge(id,URLDecoder.decode(knowledge,"UTF-8"));
    }

    @GetMapping("/randomKnowledge")
    public QuestionsOne randomKnowledge(String knowledge) throws UnsupportedEncodingException {
        return questionsOneService.randomTrainByKnowledge(URLDecoder.decode(knowledge,"UTF-8"));
    }

    @GetMapping("/orderType")
    public QuestionsOne orderType(int id,String type) throws UnsupportedEncodingException {
        return questionsOneService.orderTrainByType(id,URLDecoder.decode(type,"UTF-8"));
    }

    @GetMapping("/randomType")
    public QuestionsOne randomType(String type) throws UnsupportedEncodingException {
        return questionsOneService.randomTrainByType(URLDecoder.decode(type,"UTF-8"));
    }

    @GetMapping("/orderImage")
    public QuestionsOne orderImage(int id) {
        return questionsOneService.orderTrainByImage(id);
    }

    @GetMapping("/randomImage")
    public QuestionsOne randomImage()  {
        return questionsOneService.randomTrainByImage();
    }

    @GetMapping("/orderWord")
    public QuestionsOne orderWord(int id) {
        return questionsOneService.orderTrainByWord(id);
    }

    @GetMapping("/randomWord")
    public QuestionsOne randomWord()  {
        return questionsOneService.randomTrainByWord();
    }

    @GetMapping("/getCount")
    public int getCount(){
        return questionsOneService.getCount();
    }

    @GetMapping("/getCountByChapter")
    public int getCountByChapter(String chapter){
        return questionsOneService.getCountByChapter(chapter);
    }

    @GetMapping("/getCountByDifficulty")
    public int getCountByDifficulty(Integer difficulty){
        return questionsOneService.getCountByDifficulty(difficulty);
    }

    @GetMapping("/getCountByKnowledge")
    public int getCountByKnowledge(String knowledge){
        return questionsOneService.getCountByKnowledge(knowledge);
    }

    @GetMapping("/getCountByType")
    public int getCountByType(String type){
        return questionsOneService.getCountByType(type);
    }

    @GetMapping("/getCountByImage")
    public int getCountByImage(){
        return questionsOneService.getCountByImage();
    }


    @GetMapping("/getCountByWord")
    public int getCountByWord(){
        return questionsOneService.getCountByWord();
    }

    @PostMapping("/judgeSingle")
    public Result judgeSingle(int qoId, String answer){
        String authToken = request.getHeader(this.tokenHeader);
        String username = this.tokenUtils.getUsernameFromToken(authToken);
        if (StringUtils.isEmpty(authToken) || StringUtils.isEmpty(username)){
            return ResultUtil.failure(510,"请登录后操作");
        }
        logger.info("autoToken: " + authToken + "username: " + username);
        String end = questionsOneService.judge(qoId,answer);
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
        PageInfo<QuestionsOne> pageInfo = new PageInfo<>(questionsOneService.getQuestions());
        return pageInfo;
    }

    @PostMapping("/addMistake")
    public Result addMistake(Integer id){
        String authToken = request.getHeader(this.tokenHeader);
        String username = this.tokenUtils.getUsernameFromToken(authToken);
        if (StringUtils.isEmpty(authToken) || StringUtils.isEmpty(username)){
            return ResultUtil.failure(510,"请登录后操作");
        }
        int result = questionsOneService.addMistake(Integer.valueOf(username),id);
        switch (result){
            case 1: return ResultUtil.success();
            case 2: return ResultUtil.failure(511,"错题已存在");
            default: return ResultUtil.failure(510,"插入错题集失败");
        }
    }

}
