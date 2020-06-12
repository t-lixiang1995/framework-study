package com.pcitc.springcloudribbondemo;

import java.io.Serializable;

/**
 * TODO..
 *
 * @author : pcitc
 */

public class OrderInfo implements Serializable {
    private String productName;
    private Integer num;

    public OrderInfo(String productName, Integer num) {
        this.productName = productName;
        this.num = num;
    }

    public OrderInfo() {

    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Integer getNum() {
        return num;
    }

    public void setNum(Integer num) {
        this.num = num;
    }
}
