package com.pcitc.sqlSession;

public interface Executor {

	<T> T query(String statement,Object parameter);
 }
