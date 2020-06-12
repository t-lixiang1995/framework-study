package com.pcitc.sqlSession;

import java.lang.reflect.Proxy;

public class MySqlsession {

	private Executor executor = new MyExecutor();
	private MyConfiguration myConfiguration = new MyConfiguration();
	
	public <T> T selectOne(String statement,Object parameter){
		return executor.query(statement, parameter);
	}
	
	@SuppressWarnings("unchecked")
	public <T> T getMapper(Class<T> clas){
		//动态代理
		return (T)Proxy.newProxyInstance(clas.getClassLoader(),new Class[]{clas}, new
				MyMapperProxy(myConfiguration,this));
	}
}
