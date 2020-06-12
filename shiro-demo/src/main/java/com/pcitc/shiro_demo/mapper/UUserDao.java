package com.pcitc.shiro_demo.mapper;

import com.pcitc.shiro_demo.entity.UUser;

public interface UUserDao {

    UUser selectAllByName(String username);
}
