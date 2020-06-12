package com.pcitc.sqlSession;
/**
 * 读取与解析配置信息，并返回处理后的Environment
 * @author pcitc
 *
 */

import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import com.pcitc.config.Function;
import com.pcitc.config.MapperBean;

public class MyConfiguration {

	private static ClassLoader loader = ClassLoader.getSystemClassLoader();
	/**
	 * 读取xml信息并处理
	 */
	public Connection build(String resource){
		try {
			InputStream stream = loader.getResourceAsStream(resource);
			SAXReader reader = new SAXReader();
			Document document = reader.read(stream);
			Element root = document.getRootElement();
			return evalDataSource(root);
		} catch (Exception e) {
			throw new RuntimeException("error pccured while evaling xml" + resource);
		}
	}
	
	private Connection evalDataSource(Element node) throws ClassNotFoundException{
		if(!node.getName().equals("database")){
			throw new RuntimeException("root should be <database>");
		}
		String driverClassName = null;
		String url = null;
		String username = null;
		String password = null;
		//获取节点属性
		for (Object item : node.elements("property")) {
			Element i = (Element)item;
			String value = getValue(i);
			String name = i.attributeValue("name");
			if(value==null || name==null){
				throw new RuntimeException("[database]:<property> should contain value and name");
			}
			//赋值
			switch (name) {
			case "url" : url = value;break;
			case "username" : username = value;break;
			case "password" : password = value;break;
			case "driverClassName" : driverClassName = value;break;
			default:
				throw new RuntimeException("[database]:<property> unknown name");
			}
		}
		
		Class.forName(driverClassName);
		Connection connection = null;
		try {
			//建立数据库连接
			connection = DriverManager.getConnection(url, username, password);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return connection;
	}
	
	//获取property属性的值，如果有value，则读取，未设置value则读取内容
	private String getValue(Element node){
		return node.hasContent() ? node.getText() : node.attributeValue("value");
	}
	
	@SuppressWarnings("rawtypes")
	public MapperBean readMapper(String path){
		MapperBean mapper = new MapperBean();
		try {
			InputStream stream = loader.getResourceAsStream(path);
			SAXReader reader = new SAXReader();
			Document document = reader.read(stream);
			Element root = document.getRootElement();
			mapper.setInterfaceName(root.attributeValue("namespace").trim());  //把mapper节点的nameSpace存为接口名
			List<Function> list = new ArrayList<Function>();                   //用来存储方法的list
			for (Iterator rootIter = root.elementIterator();rootIter.hasNext();) {//遍历根节点下面所有节点
				Function fun = new Function();
				Element e = (Element)rootIter.next();
				String sqltype = e.getName().trim();
				String resultType = e.attributeValue("resultType").trim();
				String funcName = e.attributeValue("id").trim();
				String sql = e.getText().trim();
				fun.setSqltype(sqltype);
				fun.setFuncName(funcName);
				Object newInstance = null;
				try {
					newInstance = Class.forName(resultType).newInstance();
				} catch (InstantiationException e1) {
					e1.printStackTrace();
				}
				catch (IllegalAccessException e1) {
					e1.printStackTrace();
				}
				catch (ClassNotFoundException e1) {
					e1.printStackTrace();
				}
				fun.setResultType(newInstance);
				fun.setSql(sql);
				list.add(fun);
			}
			mapper.setList(list);
			
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		return mapper;
	}
}
