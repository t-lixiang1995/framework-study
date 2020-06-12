package com.pcitc.shiro_demo.service.impl;

import com.pcitc.shiro_demo.entity.UPermission;
import com.pcitc.shiro_demo.entity.URole;
import com.pcitc.shiro_demo.mapper.UPermissionDao;
import com.pcitc.shiro_demo.mapper.URoleDao;
import com.pcitc.shiro_demo.service.UPermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
@Service
@Transactional
public class UPermissionServiceImpl implements UPermissionService {

    @Autowired
    private URoleDao uRoleDao;
    @Autowired
    private UPermissionDao uPermissionDao;

    @Override
    public List<UPermission> findPermissionByUid(Integer Uid){
        List<UPermission> permissionList = new ArrayList<UPermission>();
        List<URole> roleList = uRoleDao.findRoleByUid(Uid);
        for (URole uRole : roleList) {
            List<UPermission> rolePermission = uPermissionDao.findPermissionByRid(uRole.getId());
            permissionList.addAll(rolePermission);
        }
        return permissionList;
    }
}
