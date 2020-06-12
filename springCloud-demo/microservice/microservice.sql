/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80011
Source Host           : localhost:3306
Source Database       : microservice

Target Server Type    : MYSQL
Target Server Version : 80011
File Encoding         : 65001

Date: 2019-07-01 11:26:38
*/
create database microservice;
SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `t_user`
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `id` bigint(50) NOT NULL COMMENT '序号',
  `name` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '名称',
  `username` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '用户名',
  `age` smallint(20) DEFAULT NULL COMMENT '年龄',
  `balance` decimal(50,0) DEFAULT NULL COMMENT '差额',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES ('1', '张三', 'zhangsan', '16', '5000');
INSERT INTO `t_user` VALUES ('2', '李四', 'lisi', '20', '34000');
INSERT INTO `t_user` VALUES ('3', '尤', 'you', '21', '435');
