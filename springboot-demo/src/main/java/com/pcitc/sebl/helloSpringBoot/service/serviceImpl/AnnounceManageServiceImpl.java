package com.pcitc.sebl.helloSpringBoot.service.serviceImpl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.pcitc.sebl.helloSpringBoot.entity.AnnounceManage;
import com.pcitc.sebl.helloSpringBoot.entity.AnnounceManageQuery;
import com.pcitc.sebl.helloSpringBoot.mapper.AnnounceManageMapper;
import com.pcitc.sebl.helloSpringBoot.service.AnnounceManageService;
import com.pcitc.sebl.helloSpringBoot.util.BusinessException;
import com.pcitc.sebl.helloSpringBoot.util.IBasePage;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.UnsupportedEncodingException;
import java.util.*;


/**
 *类描述：   公告管理业务层
 *创建人：   pcitc
 */
@Service
@Transactional
public class AnnounceManageServiceImpl implements AnnounceManageService {
	
	@Autowired
	private AnnounceManageMapper announceManageMapper;
	/** 
	 *方法描述: 插入记录并返回
	 *参数:    @param announceManage 目录实体
	 *创建人:  pcitc
	 */
	@Override
	public AnnounceManage insertAnnounce(AnnounceManage announceManage)  throws BusinessException{

		String uuid  =  UUID.randomUUID().toString();
		announceManage.setPkId(uuid);
		announceManage.setCreateTime(new Date());
		announceManage.setDataStatus(0);
		announceManage.setTop(0);
		if(announceManage.getEncoder()!=null){
			try {
				final byte[] textByte = (announceManage.getEncoder()).getBytes("UTF-8");
				announceManage.setContent(textByte);
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		announceManageMapper.insert(announceManage);
		return announceManage;
	}
	/** 
	 *方法描述: 删除记录
	 *参数:    @param id 
	 *创建人:  pcitc
	 */
	@Override
	public String deleteAnnounce(String pkId)  throws BusinessException{
		Integer result=announceManageMapper.deleteByPrimaryKey(pkId);
		return String.valueOf(result);
	}
	/** 
	 *方法描述: 修改记录
	 *参数:    @param announceManage 目录实体
	 *创建人:  pcitc
	 */
	@Override
	public AnnounceManage editAnnounce(AnnounceManage announceManage)  throws BusinessException{
		
		announceManage.setUpdateTime(new Date());
		if(announceManage.getEncoder()!=null){
			try {
				final byte[] textByte = (announceManage.getEncoder()).getBytes("UTF-8");
				announceManage.setContent(textByte);
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		announceManageMapper.updateByPrimaryKeySelective(announceManage);
		return announceManage;
	}
	/** 
	 *方法描述: 修改记录(对外)
	 *参数:    @param announceManage 目录实体
	 *创建人:  pcitc
	 */
	@Override
	public AnnounceManage editExtendsAnnounce(AnnounceManage announceManage)  throws BusinessException{

		if(announceManage.getEncoder()!=null){
			try {
				final byte[] textByte = (announceManage.getEncoder()).getBytes("UTF-8");
				announceManage.setContent(textByte);
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		announceManageMapper.updateByPrimaryKeySelective(announceManage);
		return announceManage;
	}
	/** 
	 *方法描述: 发布公告
	 *参数:    @param announceManage 目录实体
	 *创建人:  pcitc
	 */
	@Override
	public AnnounceManage publishAnnounce(AnnounceManage announceManage)  throws BusinessException{
		
				announceManage.setPublishdate(new Date());
				announceManage.setDataStatus(1);
				if(announceManage.getEncoder()!=null){
					try {
						final byte[] textByte = (announceManage.getEncoder()).getBytes("UTF-8");
						announceManage.setContent(textByte);
					} catch (UnsupportedEncodingException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
				announceManageMapper.updateByPrimaryKeySelective(announceManage);
				return announceManage;
	}
	/** 
	 *方法描述: 查询列表记录
	 *创建人:  pcitc
	 */
	@Override
	public PageInfo<AnnounceManage> findQueryList(IBasePage param)  throws BusinessException{
		
		PageHelper.startPage(param.getCurrPage(), param.getPageSize(),true);
		List<AnnounceManage> list=announceManageMapper.selectQueryList();
		Date date = new Date(System.currentTimeMillis());
		if(CollectionUtils.isNotEmpty(list)){
			for (AnnounceManage announceManage : list) {
				if(announceManage.getKeepshow()==0 && (announceManage.getExpiredate().getTime())<(date.getTime())){
					announceManage.setOverdue(true);
				}
				else{
					announceManage.setOverdue(false);
				}
			}	
		}					
		PageInfo<AnnounceManage> page=new PageInfo<>(list);
		return page;
	}
	/** 
	 *方法描述: 查询列表记录(无分页)
	 *创建人:  pcitc
	 */
	@Override
	public List<AnnounceManage> findQueryListNoPage() throws BusinessException{
		List<AnnounceManage> list=announceManageMapper.selectQueryList();
		Date date = new Date(System.currentTimeMillis());
		if(CollectionUtils.isNotEmpty(list)){
			for (AnnounceManage announceManage : list) {
				if(announceManage.getKeepshow()==0 && (announceManage.getExpiredate().getTime())<(date.getTime())){
					announceManage.setOverdue(true);
				}
				else{
					announceManage.setOverdue(false);
				}
			}	
		}
		return list;
	}
	/** 
	 *方法描述: 查询列表记录(已发布)
	 *创建人:  pcitc
	 */
	@Override
	public PageInfo<AnnounceManage> findPublishQueryList(IBasePage param)  throws BusinessException{

		PageHelper.startPage(param.getCurrPage(), param.getPageSize(),true);
		List<AnnounceManage> list=announceManageMapper.selectPublishQueryList();
		Date date = new Date(System.currentTimeMillis());
		if(CollectionUtils.isNotEmpty(list)){
			for (AnnounceManage announceManage : list) {
				if(announceManage.getKeepshow()==0 && (announceManage.getExpiredate().getTime())<(date.getTime())){
					announceManage.setOverdue(true);
				}
				else{
					announceManage.setOverdue(false);
				}
			}
		}
		PageInfo<AnnounceManage> page=new PageInfo<>(list);
		return page;
	}
	/** 
	 *方法描述: 查询一条记录（通过id）
	 *参数:    @param 
	 *创建人:  pcitc
	 */
	@Override
	public AnnounceManage findAnnounceById(String pkId)  throws BusinessException{
		AnnounceManage announceManage= announceManageMapper.selectByPrimaryKey(pkId);
		try {
			announceManage.setEncoder(new String(announceManage.getContent(),"UTF-8"));
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		Date date = new Date(System.currentTimeMillis());
		if(announceManage.getKeepshow()==0 && (announceManage.getExpiredate().getTime())<(date.getTime())){
			announceManage.setOverdue(true);
		}
		else{
			announceManage.setOverdue(false);
		}
		return announceManage;
	}
	/** 
	 *方法描述: 查询一条记录（通过组合条件）
	 *参数:    @param announceManageQuery 组合条件实体
	 *创建人:  pcitc
	 */
	@Override
	public PageInfo<AnnounceManage> findAnnounceByOthers(AnnounceManageQuery announceManageQuery)  throws BusinessException{
		
		PageHelper.startPage(announceManageQuery.getCurrPage(), announceManageQuery.getPageSize(),true);
		List<AnnounceManage> list=  announceManageMapper.selectByOthers(announceManageQuery);
		Date date = new Date(System.currentTimeMillis());
		if(CollectionUtils.isNotEmpty(list)){
			for (AnnounceManage announceManage : list) {
				if(announceManage.getKeepshow()==0 && (announceManage.getExpiredate().getTime())<(date.getTime())){
					announceManage.setOverdue(true);
				}
				else{
					announceManage.setOverdue(false);
				}
			}	
		}
		PageInfo<AnnounceManage> page=new PageInfo<>(list);
		return page;
	}
	/** 
	 *方法描述: 通过类别id查询记录
	 *参数:   @param categoryID
	 *参数:   @param flag
	 *创建人:  pcitc
	 */
	@Override
	public PageInfo<AnnounceManage> findAnnounceByCatagory(Integer categoryID, String flag,Integer currPage,Integer pageSize)  throws BusinessException{
		if(currPage == null){
			currPage =1;
			pageSize =10;
		}
		Map<String,Object> map=new HashMap<String,Object>();
		map.put("flag", flag);
		map.put("categoryID", categoryID);
		PageHelper.startPage(currPage, pageSize,true);
		List<AnnounceManage> list=  announceManageMapper.findAnnounceByCatagory(map);
		Date date = new Date(System.currentTimeMillis());
		if(CollectionUtils.isNotEmpty(list)){
			for (AnnounceManage announceManage : list) {
				if(announceManage.getKeepshow()==0 && (announceManage.getExpiredate().getTime())<(date.getTime())){
					announceManage.setOverdue(true);
				}
				else{
					announceManage.setOverdue(false);
				}
			}	
		}
		PageInfo<AnnounceManage> page=new PageInfo<>(list);
		return page;
	}
	/** 
	 *方法描述: 安全公告类别详情
	 *创建人:  pcitc
	 */
	@Override
	public List<Map<String,Object>> getCategoryDetails(String flag)  throws BusinessException{
		return announceManageMapper.getCategoryDetails(flag);
	}
	/** 
	 *方法描述: 浏览次数TOP5详情
	 *创建人:  pcitc
	 */
	@Override
	public List<AnnounceManage> getLookThroughTop5()  throws BusinessException{
		return announceManageMapper.getLookThroughTop5();
	}
	/** 
	 *方法描述: 附件下载TOP5详情
	 *创建人:  pcitc
	 */
	@Override
	public List<AnnounceManage> getAppendixDownloadTop5()  throws BusinessException{
		return announceManageMapper.getAppendixDownloadTop5();
	}
	/** 
	 *方法描述: 批量删除
	 *创建人:  pcitc
	 */
	@Override
	public String deleteAnnounceList(AnnounceManageQuery announceManageQuery) throws BusinessException{
		Integer data=announceManageMapper.deleteAnnounceList(announceManageQuery);
		return String.valueOf(data);
	}
	/** 
	 *方法描述: 查询所有类别
	 *创建人:  pcitc
	 */
	@Override
	public List<Map<String,Object>> findCategory()  throws BusinessException{
		return announceManageMapper.findCategory();
	}
	/** 
	 *方法描述: 查询所有子类别
	 *创建人:  pcitc
	 */
	@Override
	public List<Map<String,Object>> findChildCategory(Integer categoryID)  throws BusinessException{
		return announceManageMapper.findChildCategory(categoryID);
	}
	/** 
	 *方法描述: 通过输入模糊查询类别
	 *创建人:  pcitc
	 */
	@Override
	public List<Map<String,Object>> findVagueCategory(String category)  throws BusinessException{
		return announceManageMapper.findVagueCategory(category);
	}
	/** 
	 *方法描述: 通过输入模糊查询子类别
	 *创建人:  pcitc
	 */
	@Override
	public List<Map<String,Object>> findVagueChildCategory(String childCategory,Integer categoryID)  throws BusinessException{
		Map<String,Object> map=new HashMap<String,Object>();
		map.put("childCategory", childCategory);
		map.put("CategoryID", categoryID);
		return announceManageMapper.findVagueChildCategory(map);
	}
	/** 
	 *方法描述: 批量置顶与取消
	 *创建人:  pcitc
	 */
	@Override
	public String batchTopping(AnnounceManageQuery announceManageQuery) throws BusinessException{
		Integer data=announceManageMapper.batchTopping(announceManageQuery);
		return String.valueOf(data);
	}
}
