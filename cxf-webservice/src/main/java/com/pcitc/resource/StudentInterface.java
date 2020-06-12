package com.pcitc.resource;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.pcitc.entity.Student;
import com.pcitc.entity.Students;

/**
 * @author： liguobin 
 * @Description： 
 * @时间： 2018-3-7 下午3:59:15 
 * @version： V1.0
 * 
 */
@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
public interface StudentInterface {

	/**
	 * @param id
	 * @return
	 */
	@GET
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	@Path("/getone/{id:[0-9]{0,10}}") // 限制id只能是0~9的数组 不超过10位
	public Student getStudent(@PathParam("id") Integer id);

	/**
	 * 查找多个学生
	 * 
	 * @param ids
	 * @return
	 */

	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	@Path("/getmany/{ids}")
	public Students getAllStudent(@PathParam("ids") String ids);
}
