package com.pcitc.serviceImpl;

import java.util.ArrayList;

import javax.jws.WebService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.pcitc.dao.StudentDao;
import com.pcitc.entity.Student;
import com.pcitc.entity.Students;
import com.pcitc.service.StudentService;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

/**
 * 实现webservice接口，对外暴露 soap
 * 
 * @author： liguobin 
 * @Description： 
 * @时间： 2018-3-7 下午3:43:06 
 * @version： V1.0
 * 
 */
@Component//由Spring管理
@WebService(endpointInterface = "com.pcitc.service.StudentService") // webservice接口的全类名
public class StudentServiceImpl implements StudentService {

	/**
	 * 注入spring bean
	 */
	@Autowired
	private StudentDao studentDao;

	@Override
	public Student getStudent(Integer id) {
		return studentDao.getStudentById(id);
	}
	@Override
	public Student getStudent1(Integer id,String username) {
		return studentDao.getStudentById1(id);
	}

	/**
	 * 没有测试正确性，不是本文重点
	 */
	@Override
	public Students getAllStudent(String ids) {
		Students students = new Students(new ArrayList<Student>());
		// 得到json对象
		JSONObject json = JSONObject.parseObject(ids);
		// 获取对象的id列表
		JSONArray sid = json.getJSONArray("id");

		for (int i = 0; i < sid.size(); i++) {
			Integer s = sid.getInteger(0);
			if (s != null) {
				students.getStudents().add(studentDao.getStudentById(s));
			} else {
				continue;
			}
		}
		return students;

	}

}
