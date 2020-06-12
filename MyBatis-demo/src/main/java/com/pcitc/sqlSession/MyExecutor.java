package com.pcitc.sqlSession;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.pcitc.bean.User;

public class MyExecutor implements Executor{

	private MyConfiguration xmlConfiguration = new MyConfiguration();
	
	@Override
	public <T> T query(String sql, Object parameter) {
		Connection connection = getConnection();
		ResultSet set = null;
		PreparedStatement pre = null;
		try {
			pre = connection.prepareStatement(sql);
			//设置参数
			pre.setString(1, parameter.toString());
			set = pre.executeQuery();
			User user = new User();
			//遍历结果集
			while (set.next()) {
				user.setId(set.getString(1));
				user.setUsername(set.getString(2));
				user.setPassword(set.getString(3));
			}
			return (T) user;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		finally {
			try {
				if(set!=null){
					set.close();
				}
				if(pre!=null){
					pre.close();
				}
				if(connection!=null){
					connection.close();
				}
			} catch (Exception e2) {
				e2.printStackTrace();
			}
		}
		return null;
	}
	
	public Connection getConnection(){
		try {
			Connection connection = xmlConfiguration.build("config.xml");
			return connection;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

}
