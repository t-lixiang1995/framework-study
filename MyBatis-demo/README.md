MyBatis简单实现
=================================
#流程
* 读取存储连接信息的config.xml
* 连接数据库
* 通过动态代理执行读取UserMapper.xml文件，读取sql语句
* 执行sql语句