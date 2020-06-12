package com.pcitc.sebl.helloSpringBoot.util;

/**
 * 复制EnumResult的状态类型
 * pcitc
 */

public enum RetCodeMsg {
    UNKONW_ERROR(-1,"未知错误"),

    SUCCESS(0,"成功"),

    ERROR(1,"失败"),

    UNKONW_PK_ERROR(2,"主键数据遗失"),

    UNKONW_BACK_PK_ERROR(3,"返回主键数据异常"),

    UNKONW_REQUEST_OBJ_ERROR(4,"请求对象错误"),

    LINKEDID_ERROR(5,"应用关联编码异常"),

    DELETE_STATUS_ERROR(6,"当前状态不可删除"),

    HAS_CHILD_CHECK_STATUS_ERROR(7,"含有子节点待审数据!");

    private int code;
    private String msg;

    RetCodeMsg(int code,String msg) {
        this.code = code;
        this.msg = msg;
    }


    public Integer getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }
}
