package com.pcitc.sebl.helloSpringBoot.entity;

import java.util.Date;
/**
 *
 * 类描述：   安全公告实体类
 * 创建人：   pcitc
 */
public class AnnounceManage {
    private String pkId;                                      //主键

    private String noticename;                                //公告名称

    private Integer noticechildcategoryid;                    //类别关联字段(子)

    private Integer noticeparentcategoryid;                   //类别关联字段(父)

    private Date publishdate;                                 //发布日期

    private String publisher;                                 //发布人

    private Date expiredate;                                  //过期日期

    private String keyword;                                   //关键字

    private Integer viewcount;                                //浏览次数

    private Integer downloadcount;                            //下载次数

    private String attach1filename;                           //附件1文件名

    private String attach2filename;                           //附件2文件名

    private String attach3filename;                           //附件3文件名

    private Integer top;                                      //是否置顶(0 不置顶        1 置顶 )

    private Integer keepshow;                                 //永不过期(0 过期     1 永不过期)

    private Integer level;                                    //重要程度(1-低 2-中 3-高)

    private String fileid1;                                   //附件id1

    private String fileid2;                                   //附件id2

    private String fileid3;                                   //附件id3

    private byte[] content;                                   //公告内容（二进制编码）
    
    private Date createTime;                                  //创建时间
    
    private String createUId;                                 //创建人统一身份账号
    
    private String createUName;                               //创建人名称
    
    private String updateUId;                                 //更新人统一身份账号
    
    private String updateUName;                               //更新人名称
    
    private Date updateTime;                                  //更新时间
    
    private Integer dataStatus;                               //数据状态（0 未发布 1已发布）
    
    private String encoder;                                   //公告内容字符串
    
    private String bulletinAbstract;                          //公告摘要
    
    private String fkContactId;                               //附件关联id
    
    private String publishingUnit;                            //发布单位
    
    private String childCategoryName;                         //子类别名称
    
    private String CategoryName;                              //父类别名称
    
    private boolean overdue;                                  //(true为过期，false为未过期)
    
    private String attach1fileadress;                         //附件1地址
    
    private String attach2fileadress;                         //附件2地址
    
    private String attach3fileadress;                         //附件3地址

	public String getChildCategoryName() {
		return childCategoryName;
	}

	public void setChildCategoryName(String childCategoryName) {
		this.childCategoryName = childCategoryName;
	}

	public String getCategoryName() {
		return CategoryName;
	}

	public void setCategoryName(String categoryName) {
		CategoryName = categoryName;
	}

	public String getBulletinAbstract() {
		return bulletinAbstract;
	}

	public void setBulletinAbstract(String bulletinAbstract) {
		this.bulletinAbstract = bulletinAbstract;
	}

	public String getFkContactId() {
		return fkContactId;
	}

	public void setFkContactId(String fkContactId) {
		this.fkContactId = fkContactId;
	}

	public String getEncoder() {
		return encoder;
	}

	public void setEncoder(String encoder) {
		this.encoder = encoder;
	}

	public Integer getDataStatus() {
		return dataStatus;
	}

	public void setDataStatus(Integer dataStatus) {
		this.dataStatus = dataStatus;
	}

	public String getCreateUId() {
		return createUId;
	}

	public void setCreateUId(String createUId) {
		this.createUId = createUId;
	}

	public String getCreateUName() {
		return createUName;
	}

	public void setCreateUName(String createUName) {
		this.createUName = createUName;
	}

	public String getUpdateUId() {
		return updateUId;
	}

	public void setUpdateUId(String updateUId) {
		this.updateUId = updateUId;
	}

	public String getUpdateUName() {
		return updateUName;
	}

	public void setUpdateUName(String updateUName) {
		this.updateUName = updateUName;
	}

    public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public String getPkId() {
		return pkId;
	}

	public void setPkId(String pkId) {
		this.pkId = pkId;
	}

	public String getNoticename() {
        return noticename;
    }

    public void setNoticename(String noticename) {
        this.noticename = noticename == null ? null : noticename.trim();
    }

    public Integer getNoticechildcategoryid() {
        return noticechildcategoryid;
    }

    public void setNoticechildcategoryid(Integer noticechildcategoryid) {
        this.noticechildcategoryid = noticechildcategoryid;
    }

    public Integer getNoticeparentcategoryid() {
        return noticeparentcategoryid;
    }

    public void setNoticeparentcategoryid(Integer noticeparentcategoryid) {
        this.noticeparentcategoryid = noticeparentcategoryid;
    }

    public Date getPublishdate() {
        return publishdate;
    }

    public void setPublishdate(Date publishdate) {
        this.publishdate = publishdate;
    }

    public String getPublisher() {
		return publisher;
	}

	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}

	public String getPublishingUnit() {
		return publishingUnit;
	}

	public void setPublishingUnit(String publishingUnit) {
		this.publishingUnit = publishingUnit;
	}

	public Date getExpiredate() {
        return expiredate;
    }

    public void setExpiredate(Date expiredate) {
        this.expiredate = expiredate;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword == null ? null : keyword.trim();
    }

    public Integer getViewcount() {
        return viewcount;
    }

    public void setViewcount(Integer viewcount) {
        this.viewcount = viewcount;
    }

    public Integer getDownloadcount() {
        return downloadcount;
    }

    public void setDownloadcount(Integer downloadcount) {
        this.downloadcount = downloadcount;
    }

    public String getAttach1filename() {
        return attach1filename;
    }

    public void setAttach1filename(String attach1filename) {
        this.attach1filename = attach1filename == null ? null : attach1filename.trim();
    }

    public String getAttach2filename() {
        return attach2filename;
    }

    public void setAttach2filename(String attach2filename) {
        this.attach2filename = attach2filename == null ? null : attach2filename.trim();
    }

    public String getAttach3filename() {
        return attach3filename;
    }

    public void setAttach3filename(String attach3filename) {
        this.attach3filename = attach3filename == null ? null : attach3filename.trim();
    }

    public Integer getTop() {
        return top;
    }

    public void setTop(Integer top) {
        this.top = top;
    }

    public Integer getKeepshow() {
        return keepshow;
    }

    public void setKeepshow(Integer keepshow) {
        this.keepshow = keepshow;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public String getFileid1() {
		return fileid1;
	}

	public void setFileid1(String fileid1) {
		this.fileid1 = fileid1;
	}

	public String getFileid2() {
		return fileid2;
	}

	public void setFileid2(String fileid2) {
		this.fileid2 = fileid2;
	}

	public String getFileid3() {
		return fileid3;
	}

	public void setFileid3(String fileid3) {
		this.fileid3 = fileid3;
	}

	public byte[] getContent() {
        return content;
    }

    public void setContent(byte[] content) {
        this.content = content;
    }

	public boolean isOverdue() {
		return overdue;
	}

	public void setOverdue(boolean overdue) {
		this.overdue = overdue;
	}

	public String getAttach1fileadress() {
		return attach1fileadress;
	}

	public void setAttach1fileadress(String attach1fileadress) {
		this.attach1fileadress = attach1fileadress;
	}

	public String getAttach2fileadress() {
		return attach2fileadress;
	}

	public void setAttach2fileadress(String attach2fileadress) {
		this.attach2fileadress = attach2fileadress;
	}

	public String getAttach3fileadress() {
		return attach3fileadress;
	}

	public void setAttach3fileadress(String attach3fileadress) {
		this.attach3fileadress = attach3fileadress;
	}
    
}