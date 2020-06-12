package com.pcitc.sebl.helloSpringBoot.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 视图层返回对象的工具类，调用返回对象构建类
 * pcitc
 */

public class RetResultUtil {

    private static final Logger log = LoggerFactory.getLogger(RetResultUtil.class);

    /**
     * 构建默认的成功返回消息体(返回对象为空)
     * @return
     */
    public static <T> RetResult<T> ok() {
        return new RetResult.Builder<T>().ok().build();
    }

    /**
     * 构建默认的成功返回消息体(包含返回对象)
     * @param data
     * @return
     */
    public static <T> RetResult<T> ok(T data) {
        return new RetResult.Builder<T>().ok(data).build();
    }

    /**
     * 构建默认的错误返回消息体(返回对象为空)
     * @return
     */
    public static <T> RetResult<T> error() {
         return new RetResult.Builder<T>().error().build();
    }

    /**
     * 构建默认的错误返回消息体(包含返回对象)
     * @return
     */
    public static <T> RetResult<T> error(T data) {
        return new RetResult.Builder<T>().error(data).build();
    }

    /**
     * 构建已知的错误类型下返回消息体(返回对象为空)
     * @return
     */
    public static <T> RetResult<T> remark(RetCodeMsg retCodeMsg) {
        return new RetResult.Builder<T>().remark(retCodeMsg).build();
    }


    /**
     * 构建已知的错误类型下返回消息体(包含返回对象)
     * @return
     */
    public static <T> RetResult<T> remark(RetCodeMsg retCodeMsg, T data) {
        return new RetResult.Builder<T>().remark(retCodeMsg,data).build();
    }

    /**
     * 构建未知的错误类型下返回消息体(包含返回对象)
     * @return
     */
    public static <T> RetResult<T> remark(int code, String  msg) {
        return new RetResult.Builder<T>().remark(code,msg).build();
    }

    /**
     * 构建未知的错误类型下返回消息体(包含返回对象)
     * @return
     */
    public static <T> RetResult<T> remark(int code, String  msg, T data) {
        return new RetResult.Builder<T>().remark(code,msg,data).build();
    }

}
