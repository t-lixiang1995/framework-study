package com.pcitc.resource;

import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import com.pcitc.entity.Student;
import com.pcitc.entity.Students;
import com.pcitc.service.StudentService;

@Path("/")
public class StudentInterfaceImpl implements StudentInterface {

	@Autowired
	private StudentService studentService;

	// 获取json
	@Override
	@GET
	@Path("/getjson/{id:[0-9]{0,10}}")
	@Produces({ MediaType.APPLICATION_JSON })
	public Student getStudent(@PathParam("id") Integer id) {
		return studentService.getStudent(id);
	}

	// 获取xml
		@GET
		@Path("/getxml/{id}/{username}")
		@Produces({ MediaType.APPLICATION_XML })
		public Student getStudent1(@PathParam("id") Integer id,@PathParam("username") String username) {
			return studentService.getStudent1(id,username);
		}
		
	// 获取xml
	@POST
	@Path("/getxml/{id}/{username}")
	@Produces({ MediaType.APPLICATION_XML })
	@Consumes(MediaType.APPLICATION_XML)
	public Student getStudent2(@PathParam("id") Integer id,@PathParam("username") String username) {
		return studentService.getStudent1(id,username);
	}

	/**
	 * 返回students集合，此方法没有测试，参数是一个json对象，该对象包含一个name为id的数组
	 */
	@Override
	@GET
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	@Path("/getmany/{ids}")
	public Students getAllStudent(@PathParam("ids") String ids) {
		Students students = new Students(new ArrayList<Student>());
		// 得到json对象
		JSONObject json = JSONObject.parseObject(ids);
		// 获取对象的id列表
		JSONArray sid = json.getJSONArray("id");

		for (int i = 0; i < sid.size(); i++) {
			Integer s = sid.getInteger(0);
			if (s != null) {
				students.getStudents().add(studentService.getStudent(s));
			} else {
				continue;
			}
		}
		return students;

	}

}
