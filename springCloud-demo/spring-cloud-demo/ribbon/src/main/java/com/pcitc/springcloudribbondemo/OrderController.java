package com.pcitc.springcloudribbondemo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

/**
 * TODO..
 *
 * @author : pcitc
 */

@RestController
public class OrderController {

    private static final List<OrderInfo> list = new ArrayList<OrderInfo>();

    @Autowired
    private RestTemplate restTemplate;

    /***
     * 下单接口 --  调用服务提供者provider /updateProduct 接口
     * @param productName
     * @param num
     * @return
     */
    @GetMapping("/order/{productName}/{num}")
    public String order(@PathVariable("productName") String productName, @PathVariable("num") Integer num){

        if(productName != null && !productName.isEmpty()){

            list.add(new OrderInfo(productName, num));

            // 调用服务提供者
            String result = restTemplate.getForObject("http://eureka-provider/updateProduct/" + productName + "/" + num, String.class);
            return result;
        }
        
        String result = restTemplate.getForObject("http://log-provider/logs", String.class);
        return null;
    }
}
