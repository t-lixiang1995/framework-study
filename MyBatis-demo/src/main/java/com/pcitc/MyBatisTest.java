package com.pcitc;

import com.pcitc.bean.User;
import com.pcitc.mapper.UserMapper;
import com.pcitc.sqlSession.MySqlsession;

public class MyBatisTest {

	public static void main(String[] args){
		MySqlsession mySqlsession = new MySqlsession();
		UserMapper mapper = mySqlsession.getMapper(UserMapper.class);
		User user = mapper.getUserById("1");
		System.out.println(user.toString());				
	}
}
