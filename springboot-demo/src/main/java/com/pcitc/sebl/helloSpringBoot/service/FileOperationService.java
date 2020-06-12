package com.pcitc.sebl.helloSpringBoot.service;

import com.pcitc.sebl.helloSpringBoot.entity.SeblTaskFile;
import com.pcitc.sebl.helloSpringBoot.util.BusinessException;
import com.pcitc.sebl.helloSpringBoot.util.RetResult;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.OutputStream;
import java.util.List;


public interface FileOperationService {

	RetResult<SeblTaskFile> singleFileUpload(MultipartFile file) throws BusinessException;
	
	RetResult<List<SeblTaskFile>> mutilFileUpload(HttpServletRequest request);
	
	public SeblTaskFile getTaskFileById(String id) throws BusinessException;
	
	void downloadFile(HttpServletResponse response, String id);
	
	void download(OutputStream os,  String fileAddress);
	
	RetResult<String> deleteFile(String fileId);
	
	public List<SeblTaskFile> queryTaskFileByContactId( String contactId);
}

