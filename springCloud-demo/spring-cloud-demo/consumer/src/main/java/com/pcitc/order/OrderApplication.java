package com.pcitc.order;

import com.pcitc.health.MyHealthIndicator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.context.refresh.ContextRefresher;
import org.springframework.cloud.netflix.feign.EnableFeignClients;
import org.springframework.cloud.netflix.hystrix.EnableHystrix;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

import java.util.Set;

@SpringBootApplication
@EnableDiscoveryClient
//@EnableFeignClients(clients = {ProductService.class})
@EnableFeignClients(basePackages = {"com.pcitc.api"})
public class OrderApplication {

	@Autowired
	private ContextRefresher contextRefresher;

	public static void main(String[] args) {
		SpringApplication.run(OrderApplication.class, args);
	}

	@Bean
	//@LoadBalanced
	public RestTemplate restTemplate(){
		return new RestTemplate();
	}

	/**
	 * 定时刷新config配置信息
	 * 启动5秒之后，每3秒执行一次刷新配置信息
	 */
//	@Scheduled(fixedRate = 3000, initialDelay = 5000)
	public void doRefresh(){
		Set<String> keys = contextRefresher.refresh();
		for (String key: keys){
			System.out.printf(Thread.currentThread()+": 配置信息更新了，key[%s] \n", key);
		}
	}

	@Bean
	public HealthIndicator healthIndicator(){
		return new MyHealthIndicator();
	}
}
