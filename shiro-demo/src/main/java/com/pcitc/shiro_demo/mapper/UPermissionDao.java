package com.pcitc.shiro_demo.mapper;

import com.pcitc.shiro_demo.entity.UPermission;

import java.util.List;

public interface UPermissionDao {

    List<UPermission> findPermissionByRid(Integer Rid);
}
