package com.pcitc.service;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.pcitc.entity.Student;
import com.pcitc.entity.Students;

/**
 * @description WebService接口定义 soap
 * @author liguobin
 * 
 */
@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML }) // 返回类型
@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML }) // 请求类型
@WebService
public interface StudentService {

	/**
	 * 查找一个学生
	 * 
	 * @param id
	 * @return
	 */
	@WebMethod
	public Student getStudent(@WebParam(name = "id") Integer id);
	/**
	 * 查找一个学生
	 * 
	 * @param id
	 * @return
	 */
	@WebMethod
	public Student getStudent1(@WebParam(name = "id") Integer id,@WebParam(name = "username") String username);

	/**
	 * 查找多个学生
	 * 
	 * @param ids
	 * @return
	 */
	@WebMethod
	public Students getAllStudent(@WebParam(name = "ids") String ids);

}
