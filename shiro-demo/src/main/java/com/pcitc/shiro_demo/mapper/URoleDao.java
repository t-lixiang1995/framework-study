package com.pcitc.shiro_demo.mapper;

import com.pcitc.shiro_demo.entity.URole;

import java.util.List;

public interface URoleDao {

    List<URole> findRoleByUid(Integer Uid);
}
