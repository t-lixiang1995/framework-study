package com.pcitc.sebl.helloSpringBoot.entity;

import com.pcitc.sebl.helloSpringBoot.util.IBasePage;

import java.util.Date;
import java.util.List;

/**
 * 类描述:  公告信息组合条件实体类
 * 创建人:  pcitc
 */
public class AnnounceManageQuery extends IBasePage {
	
	private String noticeName;                                 //公告名称
	
	private String keepShow;                                   //永不过期(0 过期     1 永不过期)
	
	private String keyword;                                    //关键字
	
	private String noticeChildCategoryID;                      //类别关联字段(子)
	
	private String noticeParentCategoryID;                     //类别关联字段(父)
	
	private Date publishDate1;                                 //发布日期1
	
	private Date publishDate2;                                 //发布日期2
	
	private Integer top;                                       //是否置顶(0 不置顶        1 置顶 )
	
	private List<String> idList;                               //主键list
	
	private Integer dataStatus;                                //数据状态（0 未发布 1已发布）
	
	private String flag;                                       //标识
	
	public Integer getDataStatus() {
		return dataStatus;
	}

	public void setDataStatus(Integer dataStatus) {
		this.dataStatus = dataStatus;
	}

	public Integer getTop() {
		return top;
	}

	public void setTop(Integer top) {
		this.top = top;
	}

	public List<String> getIdList() {
		return idList;
	}

	public void setIdList(List<String> idList) {
		this.idList = idList;
	}

	public String getNoticeName() {
		return noticeName;
	}

	public void setNoticeName(String noticeName) {
		this.noticeName = noticeName;
	}

	public String getKeepShow() {
		return keepShow;
	}

	public void setKeepShow(String keepShow) {
		this.keepShow = keepShow;
	}

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	public String getNoticeChildCategoryID() {
		return noticeChildCategoryID;
	}

	public void setNoticeChildCategoryID(String noticeChildCategoryID) {
		this.noticeChildCategoryID = noticeChildCategoryID;
	}

	public String getNoticeParentCategoryID() {
		return noticeParentCategoryID;
	}

	public void setNoticeParentCategoryID(String noticeParentCategoryID) {
		this.noticeParentCategoryID = noticeParentCategoryID;
	}

	public Date getPublishDate1() {
		return publishDate1;
	}

	public void setPublishDate1(Date publishDate1) {
		this.publishDate1 = publishDate1;
	}

	public Date getPublishDate2() {
		return publishDate2;
	}

	public void setPublishDate2(Date publishDate2) {
		this.publishDate2 = publishDate2;
	}

	public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

}
