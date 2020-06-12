package com.pcitc.order;

import com.pcitc.api.ProudctUpdateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

/**
 * TODO..
 *
 * @author : pcitc
 */

@RestController
public class OrderController {

    private static final List<OrderInfo> list = new ArrayList<OrderInfo>();
//
    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private ProudctUpdateService proudctUpdateService;


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

            // 调用服务提供者（如果这边用注册中心的服务名，则需要使用@LoadBalanced注册Bean）
            //String result = restTemplate.getForObject("http://product-service/updateProduct/" + productName + "/" + num, String.class);
            // 调用服务提供者（如果这边直接使用地址，则不需要使用@LoadBalanced注解）
            //String result = restTemplate.getForObject("http://localhost:8072/updateProduct/" + productName + "/" + num, String.class);
            // 使用Feign调用客户端API
            String result = proudctUpdateService.updateProduct(productName, num);
            return result;
        }
        return null;
    }
}
