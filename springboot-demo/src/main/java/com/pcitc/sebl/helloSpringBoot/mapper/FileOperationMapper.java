package com.pcitc.sebl.helloSpringBoot.mapper;

import com.pcitc.sebl.helloSpringBoot.entity.SeblTaskFile;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface FileOperationMapper {
 
	 public Integer uploadFileInsert(SeblTaskFile seblFile);
	 
	 public SeblTaskFile seblFileGetById(@Param("fileId") String fileId);
	 
	 public Integer deleteTaskFile(@Param("fileId") String fileId);
	 
	 List<SeblTaskFile> queryTaskFileByContactId(@Param("contactId") String contactId);
}
