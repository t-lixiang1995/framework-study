package com.pcitc.sebl.helloSpringBoot.service.serviceImpl;

import com.alibaba.druid.util.StringUtils;
import com.pcitc.sebl.helloSpringBoot.constant.SmccConst;
import com.pcitc.sebl.helloSpringBoot.entity.SeblTaskFile;
import com.pcitc.sebl.helloSpringBoot.mapper.FileOperationMapper;
import com.pcitc.sebl.helloSpringBoot.service.FileOperationService;
import com.pcitc.sebl.helloSpringBoot.util.BusinessException;
import com.pcitc.sebl.helloSpringBoot.util.RetResult;
import com.pcitc.sebl.helloSpringBoot.util.RetResultUtil;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class FileOperationServiceImpl implements FileOperationService {

	@Autowired
	private FileOperationMapper fileOperationMapper;
	/**
	 * @方法描述: 单文件上传
	 * @创建人 pcitc
	 */
	@Override
	public RetResult<SeblTaskFile> singleFileUpload( MultipartFile file) {
		//ChannelTest test = new ChannelTest();
		RetResult<SeblTaskFile> retResult = null;
		if (file.isEmpty()) {
			retResult = RetResultUtil.error();
			retResult.setMsg("上传文件不能为空");
			return retResult;
		}
		File targetDir = new File(SmccConst.FILE_ADDRESS + File.separator + file.getOriginalFilename());
		try {
			copyFileByIO(file,targetDir);
			
		} catch ( Exception e) {
			e.printStackTrace();
		}
		String uuid  =  UUID.randomUUID().toString();
		// 增加数据库文件记录操作
		 SeblTaskFile seblFile = new SeblTaskFile();
		seblFile.setContactId(uuid);
		seblFile.setFileName(file.getOriginalFilename());
		seblFile.setCreationTime(new Date(System.currentTimeMillis()));
		seblFile.setFileAddress(SmccConst.FILE_ADDRESS + file.getOriginalFilename());
		fileOperationMapper.uploadFileInsert(seblFile);
		retResult = RetResultUtil.ok(seblFile);
		return retResult;
	}
	/**
	 * @方法描述: 多文件上传
	 * @创建人 pcitc
	 */
	@Override
	public RetResult<List<SeblTaskFile>> mutilFileUpload(HttpServletRequest request) {
		RetResult<List<SeblTaskFile>> retResult = null;
		List<MultipartFile> files = ((MultipartHttpServletRequest) request).getFiles("file");
		if (CollectionUtils.isEmpty(files)) {
			retResult = RetResultUtil.error();
			retResult.setMsg("上传文件不能为空");
			return retResult;
		}
		List<SeblTaskFile> seblFileList=new ArrayList<SeblTaskFile>();
		File targetDir = new File(SmccConst.FILE_ADDRESS);
		String uuid  =  UUID.randomUUID().toString();
		for ( MultipartFile file : files) {
			if (!file.isEmpty()) {
				try {
					copyFileByIO(file , targetDir);
				} catch ( Exception e) {
					e.printStackTrace();
				}
				// 增加数据库文件记录操作
				 SeblTaskFile seblFile = new SeblTaskFile();
				seblFile.setContactId(uuid);
				seblFile.setFileName(file.getOriginalFilename());
				seblFile.setCreationTime(new Date(System.currentTimeMillis()));
				seblFile.setFileAddress(targetDir + file.getOriginalFilename());
				fileOperationMapper.uploadFileInsert(seblFile);
				seblFileList.add(seblFile);
			} 
		}
		retResult = RetResultUtil.ok(seblFileList);
		return retResult;
	}
	/**
	 * 下载文件
	 * @param os
	 * @param fileAddress
	 * @return
	 * @throws BusinessException
	 */
	@Override
	public void downloadFile(HttpServletResponse response, String id) {
		SeblTaskFile taskFile = getTaskFileById(id);
	    if (taskFile != null) {
	      String fileName = taskFile.getFileName();
	      try {
	        ByteArrayOutputStream byteArrayOutputStream = null;
	        try{
	          byteArrayOutputStream = new ByteArrayOutputStream();
	          download(byteArrayOutputStream, taskFile.getFileAddress());
	          fileName = new String(taskFile.getFileName().getBytes("GB2312"), "ISO_8859_1");
	          response.setCharacterEncoding("utf-8");
	          response.setContentType("multipart/form-data");
	          // 设置文件名
	          response.addHeader("Content-Disposition", "attachment;fileName=" + fileName);
	        //修正 Excel在“xxx.xlsx”中发现不可读取的内容。是否恢复此工作薄的内容？如果信任此工作簿的来源，请点击"是"
	          response.setHeader("Content-Length", String.valueOf(byteArrayOutputStream.size()));
	          response.getOutputStream().write(byteArrayOutputStream.toByteArray());
	        }finally {
	          if (byteArrayOutputStream != null){
	            byteArrayOutputStream.close();
	          }
	        }
	      } catch (IOException e) {
	        // TODO Auto-generated catch block
	        e.printStackTrace();
	      }

	    }  
	    else{
	    	throw(new BusinessException("文件不存在",1));
		}
	}
	/**
	 * 根据文件id获取文件
	 * @param id
	 * @return
	 * @throws BusinessException
	 */
	@Override
	public SeblTaskFile getTaskFileById(String id) throws BusinessException{
		return fileOperationMapper.seblFileGetById(id);
	}
	/**
	 * 文件删除
	 * @param id
	 * @throws BusinessException
	 */
	@Override
	public RetResult<String> deleteFile( String fileId) {
		RetResult<String> retResult = null;
		String deleteFile = delete(fileId);
		if (deleteFile.equals(SmccConst.RESULT_SUCCESS)) {
			retResult = RetResultUtil.ok();
		} else {
			retResult = RetResultUtil.error();
			retResult.setMsg("文件不存在");
		}
		return retResult;
	}
	/**
	 * 通过contactId获取文件集合
	 * @param contactId
	 * @throws BusinessException
	 */
	@Override
	public List<SeblTaskFile> queryTaskFileByContactId( String contactId) {
		if (StringUtils.isEmpty(contactId)) {
			return null;
		}
		return fileOperationMapper.queryTaskFileByContactId(contactId);
	}
	
	/**
	 * 文件下载操作
	 */
	@Override
	public void download(OutputStream os,  String fileAddress) {
		File file = new File(fileAddress);	
		try {
			InputStream ins = new FileInputStream(file);
			byte[] b = new byte[1024];
			int len;
			while((len=ins.read(b))>0){
				os.write(b, 0, len);
			}
			os.flush();
			os.close();
			ins.close();
		} catch ( Exception e) {
			e.printStackTrace();
		}
	}
	/**
	 * 文件删除操作
	 */
	String delete( String fileId) {
		SeblTaskFile taskFile = fileOperationMapper.seblFileGetById(fileId);
		if (taskFile != null) {
			try {
				File fileTemp = new File(taskFile.getFileAddress());
				if(fileTemp.exists()){
					fileTemp.delete();
				}
			} catch ( Exception e) {
				e.printStackTrace();
			}
		} else {
			return SmccConst.RESULT_FAIL;
		}
		// 删除文件表数据
		fileOperationMapper.deleteTaskFile(fileId);
		return SmccConst.RESULT_SUCCESS;
	}
	public boolean copyFileByIO(MultipartFile srcFile, File targetDir) throws IOException {
		InputStream fis = srcFile.getInputStream();
        FileOutputStream fos = new FileOutputStream(targetDir);
        byte[] bytes = new byte[1024 * 1024];
        int length = -1;
        while ((length = fis.read(bytes)) != -1) {
            fos.write(bytes, 0, length);
        }
        fis.close();
        fos.close();
        return true;
    }
}
