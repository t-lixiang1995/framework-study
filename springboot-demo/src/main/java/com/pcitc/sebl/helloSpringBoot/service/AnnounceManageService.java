package com.pcitc.sebl.helloSpringBoot.service;

import com.github.pagehelper.PageInfo;
import com.pcitc.sebl.helloSpringBoot.entity.AnnounceManage;
import com.pcitc.sebl.helloSpringBoot.entity.AnnounceManageQuery;
import com.pcitc.sebl.helloSpringBoot.util.BusinessException;
import com.pcitc.sebl.helloSpringBoot.util.IBasePage;

import java.util.List;
import java.util.Map;


/**
 *类描述：  公告管理接口类
 * pcitc
 */
public interface AnnounceManageService {
	
	AnnounceManage insertAnnounce(AnnounceManage announceManage)  throws BusinessException;
	
	String deleteAnnounce(String pkId)  throws BusinessException;
	
	AnnounceManage editAnnounce(AnnounceManage announceManage)  throws BusinessException;
	
	AnnounceManage editExtendsAnnounce(AnnounceManage announceManage)  throws BusinessException;
	
	AnnounceManage publishAnnounce(AnnounceManage announceManage)  throws BusinessException;
	
	PageInfo<AnnounceManage> findQueryList(IBasePage param)  throws BusinessException;
	
	List<AnnounceManage> findQueryListNoPage() throws BusinessException;
	
	PageInfo<AnnounceManage> findPublishQueryList(IBasePage param)  throws BusinessException;
	
	AnnounceManage findAnnounceById(String pkId)  throws BusinessException;
	
	PageInfo<AnnounceManage> findAnnounceByOthers(AnnounceManageQuery announceManageQuery)  throws BusinessException;
	
	List<Map<String,Object>> getCategoryDetails(String flag)  throws BusinessException;
	
	List<AnnounceManage> getLookThroughTop5()  throws BusinessException;
	
	List<AnnounceManage> getAppendixDownloadTop5()  throws BusinessException;
	
	String deleteAnnounceList(AnnounceManageQuery announceManageQuery) throws BusinessException;
	
	List<Map<String,Object>> findCategory()  throws BusinessException;
	
	List<Map<String,Object>> findChildCategory(Integer categoryID)  throws BusinessException;
	
	List<Map<String,Object>> findVagueCategory(String category) throws BusinessException;

	List<Map<String,Object>> findVagueChildCategory(String childCategory,Integer categoryID) throws BusinessException;
	
	String batchTopping(AnnounceManageQuery announceManageQuery) throws BusinessException;
	
	PageInfo<AnnounceManage> findAnnounceByCatagory(Integer categoryID, String flag,Integer currPage,Integer pageSize)  throws BusinessException;
}
