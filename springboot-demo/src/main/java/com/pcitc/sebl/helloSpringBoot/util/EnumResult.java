package com.pcitc.sebl.helloSpringBoot.util;

/**
 * 枚举业务逻辑异常返回结果
 * pcitc
 */
public enum EnumResult {
	UNKONW_ERROR(-1, "未知错误"), SUCCESS(0, "成功"), ERROR(1, "失败"), UNKONW_PK_ERROR(2, "主键数据遗失"), UNKONW_BACK_PK_ERROR(3,
			"返回主键数据异常"), UNKONW_REQUEST_OBJ_ERROR(4, "请求对象错误"), LINKEDID_ERROR(5, "应用关联编码异常"), DELETE_STATUS_ERROR(6,
					"当前状态不可删除"), HAS_CHILD_CHECK_STATUS_ERROR(7, "含有子节点待审数据!"), VALID_PERMISSION_ERROR(8,
							"你没有此操作权限!"), COLUMN_IS_NULL(9,
									"必填字段为空!"), COLUMN_IS_TO_LONG(10, "字符长度过长!"), FILE_IS_ERROR(11, "文件错误");

	private Integer code;
	private String msg;

	EnumResult(final Integer code, final String msg) {
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
