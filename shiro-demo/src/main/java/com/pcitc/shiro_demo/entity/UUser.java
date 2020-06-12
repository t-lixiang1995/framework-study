package com.pcitc.shiro_demo.entity;

import java.util.List;

public class UUser {

    private Integer id;

    private String nickname;

    private String pswd;

    private List<String> roleStrlist;

    private List<String> perminsStrlist;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public List<String> getRoleStrlist() {
        return roleStrlist;
    }

    public void setRoleStrlist(List<String> roleStrlist) {
        this.roleStrlist = roleStrlist;
    }

    public List<String> getPerminsStrlist() {
        return perminsStrlist;
    }

    public void setPerminsStrlist(List<String> perminsStrlist) {
        this.perminsStrlist = perminsStrlist;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getPswd() {
        return pswd;
    }

    public void setPswd(String pswd) {
        this.pswd = pswd;
    }
}
