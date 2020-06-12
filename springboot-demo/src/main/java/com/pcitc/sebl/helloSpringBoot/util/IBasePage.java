package com.pcitc.sebl.helloSpringBoot.util;

/**
 * 基础分页信息
 * pcitc
 */
public class IBasePage {
	//总记录数
    private long totalCount;
    //每页记录数 初始默认记录数 10
    private int pageSize = 10;
    //总页数
    private int totalPage;
    //当前页数 初始默认页数 1
    private int currPage = 1;
    
	public long getTotalCount() {
		return totalCount;
	}
	public void setTotalCount(long totalCount) {
		this.totalCount = totalCount;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	public int getTotalPage() {
		return totalPage;
	}
	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}
	public int getCurrPage() {
		return currPage;
	}
	public void setCurrPage(int currPage) {
		this.currPage = currPage;
	}

	@Override
	public String toString() {
		return "IBasePage{" +
				"totalCount=" + totalCount +
				", pageSize=" + pageSize +
				", totalPage=" + totalPage +
				", currPage=" + currPage +
				'}';
	}
}
