package com.pcitc.sebl.helloSpringBoot.controller;

import com.pcitc.sebl.helloSpringBoot.entity.SeblTaskFile;
import com.pcitc.sebl.helloSpringBoot.service.FileOperationService;
import com.pcitc.sebl.helloSpringBoot.util.BusinessException;
import com.pcitc.sebl.helloSpringBoot.util.RetResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 *
 * 类描述：   文件操作控制类
 * 创建人：   pcitc
 */
@RestController
@RequestMapping("/sebl")
@Api(tags ={"文件操作的基础api"})
public class FileOperationController {
	@Autowired
	private FileOperationService fileOperationService;
	/**
	 * 单文件上传
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws BusinessException
	 */	
	@ApiOperation(value = "单文件上传", notes = "单文件上传")
	@RequestMapping(value = "/seblfile/fileSingleUpload", method = RequestMethod.POST)
	public RetResult<SeblTaskFile> fileSingleUpload(@RequestParam("file") MultipartFile file) throws BusinessException {

		return fileOperationService.singleFileUpload(file);
	}
	/**
	 * 多文件上传
	 * 
	 * @param request
	 * @return
	 * @throws BusinessException
	 */
	@ApiOperation(value = "多文件上传", notes = "多文件上传")
	@RequestMapping(value = "/seblfile/fileMutilUpload", method = RequestMethod.POST)	
	public RetResult<List<SeblTaskFile>> fileMutilUpload(HttpServletRequest request) throws BusinessException {
		
		return fileOperationService.mutilFileUpload(request);
	}	
	/**
	 * 文件下载
	 * 
	 * @param response
	 * @param id          
	 * @return
	 * @throws BusinessException
	 */	
	@ApiOperation(value = "文件下载", notes = "文件下载")
	@RequestMapping(value = "/seblfile/downMongoFile", method = RequestMethod.GET)
	public void downloadFile(HttpServletResponse response, String id) throws BusinessException {

		fileOperationService.downloadFile(response, id);
	}
	/**
	 * 文件删除
	 * @param id
	 * @return
	 * @throws BusinessException
	 */
	@ApiOperation(value = "文件删除", notes = "文件删除")
	@RequestMapping(value = "/seblfile/deleteMongoFile", method = RequestMethod.GET)
	public RetResult<String> fileDelete(@RequestParam("fileId") String fileId) throws BusinessException {
		
		return fileOperationService.deleteFile(fileId);
	}
}
