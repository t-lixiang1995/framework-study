package com.pcitc.product;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

/**
 * 
 * @author pcitc
 */
@RestController
public class ProductController {

    // 定义一个库存集合
    private static final Map<String, Integer> productMap = new HashMap<String, Integer>();
    
	@GetMapping("/updateProduct/{productName}/{num}")
	public String updateProduct(@PathVariable("productName") String productName,@PathVariable("num") Integer num) {
		if(productName != null && !productName.isEmpty()){
            productMap.put(productName, (productMap.get(productName) == null ? 0: productMap.get(productName))-num);
            System.out.println("修改库存：productName-"+productName+", num-"+num);
        }
        return "修改库存成功, "+productName+" 剩下 "+productMap.get(productName);
	}
}
