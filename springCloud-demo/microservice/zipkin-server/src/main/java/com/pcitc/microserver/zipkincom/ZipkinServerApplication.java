package com.pcitc.microserver.zipkincom;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.sleuth.zipkin.stream.EnableZipkinStreamServer;
//import zipkin2.server.internal.EnableZipkinServer;

@SpringBootApplication
//@EnableZipkinServer          数据采集方式----http拦截
@EnableZipkinStreamServer     //数据采集方式----数据上报到MQ,Stream方式
public class ZipkinServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ZipkinServerApplication.class, args);
    }

}
