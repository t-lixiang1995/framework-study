package com.pcitc.api;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * TODO : Feign客户端  -- 指向哪个服务呢？
 *
 * @author:pcitc
 */
public interface ProductService {

    @GetMapping("/updateProduct/{productName}/{num}")
    public String updateProduct(@PathVariable("productName") String productName, @PathVariable("num") Integer num) ;
}
