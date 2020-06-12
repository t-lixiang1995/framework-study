package com.pcitc.api;

import org.springframework.cloud.netflix.feign.FeignClient;

@FeignClient(name="product-service")   //这里的名字要和被调用服务在注册中心注册的服务名一致
public interface ProudctUpdateService extends  ProductService {

}
