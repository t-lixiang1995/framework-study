package com.pcitc.sebl.helloSpringBoot.util;

import com.alibaba.fastjson.JSON;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.Serializable;

/**
 * 视图层返回对象，包括返回的状态码、消息、返回对象
 * pcitc
 */

public class RetResult<T> implements Serializable {

    private static final Logger log = LoggerFactory.getLogger(RetResult.class);

    private int code;

    private String msg;

    private T data;

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public void setCode(RetCodeMsg retCodeMsg) {
        this.code = retCodeMsg.getCode();
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public void setMsg(RetCodeMsg retCodeMsg) {
        this.msg = retCodeMsg.getMsg();
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return JSON.toJSONString(this);
    }

    /**
     * 视图返回对象的构建对象
     * @param <T>
     */
    public static class Builder<T> {

        private RetResult<T> targer;

        public Builder() {
            this.targer = new RetResult<T>();
        }

        public Builder<T> code(int code) {
            targer.code = code;
            return this;
        }

        public Builder<T> msg(String msg) {
            targer.msg = msg;
            return this;
        }

        public Builder<T> data(T data) {
            targer.data = data;
            return this;
        }

        /**
         * 构建默认的成功返回消息体(返回对象为空)
         * @return
         */
        public Builder<T> ok() {
            targer.code = RetCodeMsg.SUCCESS.getCode();
            targer.msg = RetCodeMsg.SUCCESS.getMsg();
            return this;
        }

        /**
         * 构建默认的成功返回消息体(包含返回对象)
         * @param data
         * @return
         */
        public Builder<T> ok(T data) {
            targer.code = RetCodeMsg.SUCCESS.getCode();
            targer.msg = RetCodeMsg.SUCCESS.getMsg();
            targer.data = data;
            return this;
        }

        /**
         * 构建默认的错误返回消息体(返回对象为空)
         * @return
         */
        public Builder<T> error() {
            targer.code = RetCodeMsg.ERROR.getCode();
            targer.msg = RetCodeMsg.ERROR.getMsg();
            return this;
        }

        /**
         * 构建默认的错误返回消息体(包含返回对象)
         * @return
         */
        public Builder<T> error(T data) {
            targer.code = RetCodeMsg.ERROR.getCode();
            targer.msg = RetCodeMsg.ERROR.getMsg();
            targer.data = data;
            return this;
        }

        /**
         * 构建已知的错误类型下返回消息体(返回对象为空)
         * @return
         */
        public Builder<T> remark(RetCodeMsg retCodeMsg) {
            targer.code = retCodeMsg.getCode();
            targer.msg = retCodeMsg.getMsg();
            return this;
        }


        /**
         * 构建已知的错误类型下返回消息体(包含返回对象)
         * @return
         */
        public Builder<T> remark(RetCodeMsg retCodeMsg,T data) {
            targer.code = retCodeMsg.getCode();
            targer.msg = retCodeMsg.getMsg();
            targer.data = data;
            return this;
        }

        /**
         * 构建已知的错误类型下返回消息体(返回对象为空)
         * @return
         */
        public Builder<T> remark(int code, String  msg) {
            targer.code = code;
            targer.msg = msg;
            return this;
        }


        /**
         * 构建已知的错误类型下返回消息体(包含返回对象)
         * @return
         */
        public Builder<T> remark(int code, String  msg,T data) {
            targer.code = code;
            targer.msg = msg;
            targer.data = data;
            return this;
        }

        public RetResult<T> build() {
            return targer;
        }

    }
}
