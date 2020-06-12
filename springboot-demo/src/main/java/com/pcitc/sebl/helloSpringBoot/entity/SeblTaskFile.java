package com.pcitc.sebl.helloSpringBoot.entity;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

public class SeblTaskFile implements java.io.Serializable{

    /**
     * 编号       db_column: id 
     */	
	
	private java.lang.String id;
	/**
	 * 关联编号 db_column: contact_id
	 */
	private String contactId;
    /**
     * 文件名       db_column: file_name 
     */	
	
	private java.lang.String fileName;
    /**
     * 文件地址       db_column: file_address 
     */	
	
	private java.lang.String fileAddress;
    /**
     * 创建时间       db_column: creation_time 
     */	
	
	private java.util.Date creationTime;
	//columns END

	public SeblTaskFile(){
	}
	
	public String getContactId() {
		return contactId;
	}

	public void setContactId(String contactId) {
		this.contactId = contactId;
	}

	public SeblTaskFile(java.lang.String id){
		this.id=id;
	}

	public java.lang.String getId() {
		return id;
	}

	public void setId(java.lang.String id) {
		this.id = id;
	}

	public java.lang.String getFileName() {
		return fileName;
	}

	public void setFileName(java.lang.String fileName) {
		this.fileName = fileName;
	}

	public java.lang.String getFileAddress() {
		return fileAddress;
	}

	public void setFileAddress(java.lang.String fileAddress) {
		this.fileAddress = fileAddress;
	}

	public java.util.Date getCreationTime() {
		return creationTime;
	}

	public void setCreationTime(java.util.Date creationTime) {
		this.creationTime = creationTime;
	}
	@Override
	public String toString() {
		return new ToStringBuilder(this,ToStringStyle.MULTI_LINE_STYLE)
			.append("Id",getId())
			.append("FileName",getFileName())
			.append("FileAddress",getFileAddress())
			.append("CreationTime",getCreationTime())
			.toString();
	}
	@Override
	public int hashCode() {
		return new HashCodeBuilder()
			.append(getId())
			.toHashCode();
	}
	@Override
	public boolean equals(Object obj) {
		if(obj instanceof SeblTaskFile == false){
			return false;
		} 
		if(this == obj){
			return true;
		} 
		SeblTaskFile other = (SeblTaskFile)obj;
		return new EqualsBuilder()
			.append(getId(),other.getId())
			.isEquals();
	}
}
