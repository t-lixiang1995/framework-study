package com.pcitc.sqlSession;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.util.List;

import com.pcitc.config.Function;
import com.pcitc.config.MapperBean;

public class MyMapperProxy implements InvocationHandler{

	private MySqlsession mySqlsession;
	private MyConfiguration myConfiguration;
	
	public MyMapperProxy(MyConfiguration myConfiguration,MySqlsession mySqlsession){
		this.myConfiguration = myConfiguration;
		this.mySqlsession = mySqlsession;
	}

	@Override
	public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
		MapperBean readMapper = myConfiguration.readMapper("UserMapper.xml");
		//是否是xml文件对应的接口
		if(!method.getDeclaringClass().getName().equals(readMapper.getInterfaceName())){
			return null;
		}
		List<Function> list = readMapper.getList();
		if(list.size()!=0 || list!=null){
			for(Function function: list){
				if(method.getName().equals(function.getFuncName())){
					return mySqlsession.selectOne(function.getSql(), String.valueOf(args[0]));
				}
			}
		}
		return null;
	}
}
