package com.pcitc.sebl.helloSpringBoot;

import com.pcitc.sebl.helloSpringBoot.constant.SmccConst;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller
@SpringBootApplication
@EnableAspectJAutoProxy(exposeProxy = true)
@ComponentScan(value = SmccConst.BASH_PACKAGE)
@MapperScan(SmccConst.BASH_PACKAGE + ".mapper")
public class HelloSpringBootApplication {

	public static void main(String[] args) {
		SpringApplication.run(HelloSpringBootApplication.class, args);
	}

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String HelloSpring (){
		return "index";
	}
}
