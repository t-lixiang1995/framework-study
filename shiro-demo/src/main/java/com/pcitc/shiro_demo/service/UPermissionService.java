package com.pcitc.shiro_demo.service;

import com.pcitc.shiro_demo.entity.UPermission;

import java.util.List;

public interface UPermissionService {

    List<UPermission> findPermissionByUid(Integer Uid);
}
