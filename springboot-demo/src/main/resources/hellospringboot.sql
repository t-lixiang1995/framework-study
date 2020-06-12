/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80011
Source Host           : localhost:3306
Source Database       : hellospringboot

Target Server Type    : MYSQL
Target Server Version : 80011
File Encoding         : 65001

Date: 2019-06-13 15:03:39
*/
create database hellospringboot;
SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `t_sebl_task_file`
-- ----------------------------
DROP TABLE IF EXISTS `t_sebl_task_file`;
CREATE TABLE `t_sebl_task_file` (
  `id` varchar(50) NOT NULL COMMENT '编号',
  `contact_id` varchar(50) NOT NULL COMMENT '关联编号',
  `file_name` varchar(300) NOT NULL COMMENT '文件名',
  `file_address` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '閺傚洣娆㈤崷鏉挎絻',
  `creation_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='安全公告文件表';

-- ----------------------------
-- Table structure for `t_snp_com_noticecategory`
-- ----------------------------
DROP TABLE IF EXISTS `t_snp_com_noticecategory`;
CREATE TABLE `t_snp_com_noticecategory` (
  `noteCategoryID` int(11) NOT NULL AUTO_INCREMENT COMMENT '类别ID',
  `noteCategoryName` varchar(300) DEFAULT NULL COMMENT '类别名称',
  `parentID` int(11) DEFAULT NULL COMMENT '父节点ID',
  PRIMARY KEY (`noteCategoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COMMENT='安全公告类别表';

-- ----------------------------
-- Records of t_snp_com_noticecategory
-- ----------------------------
INSERT INTO `t_snp_com_noticecategory` VALUES ('1', '制度规范', '0');
INSERT INTO `t_snp_com_noticecategory` VALUES ('2', '通知公告', '0');
INSERT INTO `t_snp_com_noticecategory` VALUES ('3', '预警信息', '0');
INSERT INTO `t_snp_com_noticecategory` VALUES ('4', '其它', '0');
INSERT INTO `t_snp_com_noticecategory` VALUES ('5', '安全方针政策', '1');
INSERT INTO `t_snp_com_noticecategory` VALUES ('6', '安全管理制度', '1');
INSERT INTO `t_snp_com_noticecategory` VALUES ('7', '技术标准/规范', '1');
INSERT INTO `t_snp_com_noticecategory` VALUES ('8', '表单', '1');
INSERT INTO `t_snp_com_noticecategory` VALUES ('9', '其它', '1');
INSERT INTO `t_snp_com_noticecategory` VALUES ('10', '其它', '2');
INSERT INTO `t_snp_com_noticecategory` VALUES ('11', '其它', '3');
INSERT INTO `t_snp_com_noticecategory` VALUES ('12', '其它', '4');

-- ----------------------------
-- Table structure for `t_snp_com_securitynotice`
-- ----------------------------
DROP TABLE IF EXISTS `t_snp_com_securitynotice`;
CREATE TABLE `t_snp_com_securitynotice` (
  `pkId` varchar(50) NOT NULL COMMENT '公告id(主键)',
  `noticeName` varchar(300) DEFAULT NULL COMMENT '公告名称',
  `noticeChildCategoryID` int(11) DEFAULT NULL COMMENT '类别关联字段',
  `noticeParentCategoryID` int(11) DEFAULT NULL COMMENT '类别关联字段',
  `publishDate` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '发布日期',
  `publisher` varchar(50) DEFAULT NULL COMMENT '发布人',
  `expireDate` datetime DEFAULT NULL COMMENT '过期日期',
  `keyword` varchar(300) DEFAULT NULL COMMENT '关键字',
  `content` mediumblob COMMENT '公告内容',
  `viewCount` int(11) DEFAULT NULL COMMENT '浏览次数',
  `downloadCount` int(11) DEFAULT NULL COMMENT '下载次数',
  `attach1FileName` varchar(300) DEFAULT NULL COMMENT '附件1文件名',
  `attach2FileName` varchar(300) DEFAULT NULL COMMENT '附件2文件名',
  `attach3FileName` varchar(300) DEFAULT NULL COMMENT '附件3文件名',
  `top` int(11) DEFAULT NULL COMMENT '是否置顶\n            0 不置顶\n            1 置顶 ',
  `keepShow` int(11) DEFAULT NULL COMMENT '永不过期\n            0 过期\n            1 永不过期',
  `level` int(1) DEFAULT NULL COMMENT '重要程度 1-低 2-中 3-高',
  `fileId1` varchar(50) DEFAULT NULL COMMENT '附件id1',
  `fileId2` varchar(50) DEFAULT NULL COMMENT '附件id2',
  `fileId3` varchar(50) DEFAULT NULL COMMENT '附件id3',
  `create_Time` datetime DEFAULT NULL COMMENT '创建时间',
  `create_UId` varchar(50) DEFAULT NULL COMMENT '创建人统一身份账号',
  `create_UName` varchar(50) DEFAULT NULL COMMENT '创建人名称',
  `update_UId` varchar(50) DEFAULT NULL COMMENT '更新人统一身份账号',
  `update_UName` varchar(50) DEFAULT NULL COMMENT '更新人名称',
  `update_Time` datetime DEFAULT NULL COMMENT '更新时间',
  `dataStatus` tinyint(4) DEFAULT NULL COMMENT '数据状态（0 未发布 1已发布）',
  `bulletin_abstract` varchar(300) DEFAULT NULL COMMENT '公告摘要',
  `fk_contact_id` varchar(50) DEFAULT NULL COMMENT '附件关联id',
  `publishing_unit` varchar(50) DEFAULT NULL COMMENT '发布单位',
  `attach1FileAddress` varchar(200) DEFAULT NULL COMMENT '附件1地址',
  `attach2FileAddress` varchar(200) DEFAULT NULL COMMENT '附件2地址',
  `attach3FileAddress` varchar(200) DEFAULT NULL COMMENT '附件3地址',
  PRIMARY KEY (`pkId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='安全公告表';