package com.cqnu.harunasandrivingtestingsystem.utils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.cqnu.harunasandrivingtestingsystem.entity.QuestionsFour;
import com.cqnu.harunasandrivingtestingsystem.entity.QuestionsOne;
import com.cqnu.harunasandrivingtestingsystem.mapper.QuestionsFourMapper;
import com.cqnu.harunasandrivingtestingsystem.mapper.QuestionsOneMapper;
import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;

import javax.annotation.Resource;
import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * @author LiAixing
 * @version 1.0
 * @className Json2DB
 * @description TODO
 * @date 2019/3/13 1:44
 **/
@Component
public class Json2DB {

    @Resource
    private QuestionsOneMapper questionsOneMapper;

    @Resource
    private QuestionsFourMapper questionsFourMapper;

    private List<String> chapters1 = new ArrayList<String>(){{
        add("道路交通安全法律、法规和规章");
        add("交通信号");
        add("安全行车、文明驾驶基础知识");
        add("机动车驾驶操作相关基础知识");
    }
    };

    private List<String> chapters2 = new ArrayList<String>(){{
        add("违法行为综合判断与案例分析");
        add("安全行车常识");
        add("常见交通标志、标线和交通手势辨识");
        add("驾驶职业道德和文明驾驶常识");
        add("恶劣气候和复杂道路条件下驾驶常识");
        add("紧急情况下避险常识");
        add("交通事故救护及常见危化品处置常识");
    }
    };

    private List<String> knowledges = new ArrayList<String>(){{
        add("时间题");
        add("速度题");
        add("距离题");
        add("罚款题");
        add("记分题");
        add("标志题");
        add("标线题");
        add("手势题");
        add("信号灯");
        add("灯光题");
        add("仪表题");
        add("装置题");
        add("路况题");
        add("酒驾题");
        add("动画题");
        add("情景题");
    }};


    /**
     *
     * @param path  classpath:json/DataSubject1.json
     * @return
     * @throws FileNotFoundException
     */
    public JSONArray readFile(String path) throws FileNotFoundException {
        File file = ResourceUtils.getFile(path);

        if(!file.exists()||file.isDirectory()) {
            throw new FileNotFoundException();
        }

        StringBuilder sb = new StringBuilder();
        try {
            InputStreamReader read = new InputStreamReader(new FileInputStream(file),"UTF-8");
            BufferedReader bufferedReader = new BufferedReader(read);
            String lineTxt = null;
            while ((lineTxt = bufferedReader.readLine()) != null) {
                sb.append(lineTxt);
            }
            bufferedReader.close();
            read.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        JSONArray arrays = JSONArray.parseArray(sb.toString().trim());
        return arrays;
    }

    public String getFromList(List<String> list){
        return list.get(new Random().nextInt(list.size()));
    }

    public void add2DB(JSONArray jsonArray){

        for (int i = 0; i < jsonArray.size(); i++){
            QuestionsOne questionsOne = new QuestionsOne();
            questionsOne.setQoType(jsonArray.getJSONObject(i).getString("type"));
            questionsOne.setQoTitle(jsonArray.getJSONObject(i).getString("title"));
            questionsOne.setQoOptionA(jsonArray.getJSONObject(i).getString("a"));
            questionsOne.setQoOptionB(jsonArray.getJSONObject(i).getString("b"));
            questionsOne.setQoOptionC(jsonArray.getJSONObject(i).getString("c"));
            questionsOne.setQoOptionD(jsonArray.getJSONObject(i).getString("d"));
            questionsOne.setQoAnswer(jsonArray.getJSONObject(i).getString("answer"));
            questionsOne.setQoImage(jsonArray.getJSONObject(i).getString("image"));
            questionsOne.setQoVideo(jsonArray.getJSONObject(i).getString("video"));
            questionsOne.setQoDescription(jsonArray.getJSONObject(i).getString("description"));
            questionsOne.setQoDifficultty((new Random().nextInt(5)+1));
            questionsOne.setQoKnowledge(getFromList(knowledges));
            questionsOne.setQoChapter(getFromList(chapters1));

            questionsOneMapper.insertSelective(questionsOne);
        }

    }


 @SuppressWarnings("Duplicates")
 public void add2DB2(JSONArray jsonArray){

        for (int i = 0; i < jsonArray.size(); i++){
            QuestionsFour questionsFour = new QuestionsFour();
            questionsFour.setQoType(jsonArray.getJSONObject(i).getString("type"));
            questionsFour.setQoTitle(jsonArray.getJSONObject(i).getString("title"));
            questionsFour.setQoOptionA(jsonArray.getJSONObject(i).getString("a"));
            questionsFour.setQoOptionB(jsonArray.getJSONObject(i).getString("b"));
            questionsFour.setQoOptionC(jsonArray.getJSONObject(i).getString("c"));
            questionsFour.setQoOptionD(jsonArray.getJSONObject(i).getString("d"));
            questionsFour.setQoAnswer(jsonArray.getJSONObject(i).getString("answer"));
            questionsFour.setQoImage(jsonArray.getJSONObject(i).getString("image"));
            questionsFour.setQoVideo(jsonArray.getJSONObject(i).getString("video"));
            questionsFour.setQoDescription(jsonArray.getJSONObject(i).getString("description"));
            questionsFour.setQoDifficulty((new Random().nextInt(5)+1));
            questionsFour.setQoKnowledge(getFromList(knowledges));
            questionsFour.setQoChapter(getFromList(chapters2));

            questionsFourMapper.insertSelective(questionsFour);
        }

    }




    public static void main(String[] args) throws FileNotFoundException {
//        add2DB(readFile());
//        System.out.println(getFromList(chapters1));
    }
}
