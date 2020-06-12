package com.pcitc.health;

import org.springframework.boot.actuate.health.AbstractHealthIndicator;
import org.springframework.boot.actuate.health.Health;

/**
 * 自定义健康指标
 *
 * @author : pcitc
 */

public class MyHealthIndicator extends AbstractHealthIndicator {
    @Override
    protected void doHealthCheck(Health.Builder builder) throws Exception {
        //自定义一些健康检查的机制
        System.out.println("自定义健康检查 MyHealthIndicator");
        builder.down().withDetail("This is MyHealthIndicator","just so so!");
    }
}
