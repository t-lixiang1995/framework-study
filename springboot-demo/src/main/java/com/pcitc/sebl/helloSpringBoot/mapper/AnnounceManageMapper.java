package com.pcitc.sebl.helloSpringBoot.mapper;

import com.pcitc.sebl.helloSpringBoot.entity.AnnounceManage;
import com.pcitc.sebl.helloSpringBoot.entity.AnnounceManageQuery;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;
/**
 * 类描述:  公告管理映射类
 * 创建人:  pcitc
 */
public interface AnnounceManageMapper {
	
	public Integer insert(AnnounceManage announcemanage);
	
	public Integer deleteByPrimaryKey(@Param("pkId") String pkId);

	public Integer updateByPrimaryKeySelective(AnnounceManage announcemanage);
	
	AnnounceManage selectByPrimaryKey(@Param("pkId") String pkId);
	
	List<AnnounceManage> selectQueryList();
	
	List<AnnounceManage> selectPublishQueryList();
	
	List<AnnounceManage> selectBySysname(@Param("sysname") String sysname);
	
	List<AnnounceManage> selectByOthers(AnnounceManageQuery announceManageQuery);
	
	List<Map<String,Object>> getCategoryDetails(@Param("flag") String flag);
	
	List<AnnounceManage> getLookThroughTop5();
	
	List<AnnounceManage> getAppendixDownloadTop5();
	
	public Integer deleteAnnounceList(AnnounceManageQuery announceManageQuery);
	
	List<Map<String,Object>> findCategory();
	
	List<Map<String,Object>> findChildCategory(@Param("categoryID") Integer categoryID);
	
	List<Map<String,Object>> findVagueCategory(@Param("category") String category);
	
	List<Map<String,Object>> findVagueChildCategory(Map<String,Object> map);
	
	public Integer batchTopping(AnnounceManageQuery announceManageQuery);
	
	List<AnnounceManage> findAnnounceByCatagory(Map<String,Object> map);
}
