package com.pcitc.sebl.helloSpringBoot.controller;

import com.github.pagehelper.PageInfo;
import com.pcitc.sebl.helloSpringBoot.entity.AnnounceManage;
import com.pcitc.sebl.helloSpringBoot.entity.AnnounceManageQuery;
import com.pcitc.sebl.helloSpringBoot.service.AnnounceManageService;
import com.pcitc.sebl.helloSpringBoot.util.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


/**
 *
 * 类描述：   公告管理控制类
 * 创建人：   pcitc
 */

@RestController
@RequestMapping("/AnnounceManage")
@Api(tags ={"安全公告的基础api"})
public class AnnounceManageController {

	private static final Logger LOGGER = LoggerFactory.getLogger(AnnounceManageController.class);
	@Autowired
	AnnounceManageService announceManageService;
	
	/**
	 * 插入一条公告并返回
	 * @param announceManage
	 * @throws BusinessException
	 */
	@ApiOperation(value = "插入一条公告", notes = "插入一条公告")
	@RequestMapping(value = "/insertAnnounce", method = RequestMethod.POST)
	public RetResult<AnnounceManage> insertAnnounce(@RequestBody AnnounceManage announceManage)  throws BusinessException{
		AnnounceManage page= announceManageService.insertAnnounce(announceManage);
		return RetResultUtil.ok(page);
	}
	/**
	 * 删除
	 * @param id
	 * @throws BusinessException
	 */
	@ApiOperation(value = "删除一条公告", notes = "删除一条公告")
	@RequestMapping(value = "/deleteAnnounce", method = RequestMethod.GET)
	public RetResult<String> deleteAnnounce(@RequestParam("pkId")  String pkId)  throws BusinessException{
		String page= announceManageService.deleteAnnounce(pkId);
		return RetResultUtil.ok(page);
	}
	/**
	 * 修改
	 * @param announceManage
	 * @throws BusinessException
	 */
	@ApiOperation(value = "修改一条公告", notes = "修改一条公告")
	@RequestMapping(value = "/editAnnounce", method = RequestMethod.POST)
	public RetResult<AnnounceManage> editAnnounce(@RequestBody AnnounceManage announceManage)  throws BusinessException{
		AnnounceManage page= announceManageService.editAnnounce(announceManage);
		return RetResultUtil.ok(page);
	}
	/**
	 * 发布公告
	 * @param announceManage
	 * @throws BusinessException
	 */
	@ApiOperation(value = "发布公告", notes = "发布公告")
	@RequestMapping(value = "/publishAnnounce", method = RequestMethod.POST)
	public RetResult<AnnounceManage> publishAnnounce(@RequestBody AnnounceManage announceManage)  throws BusinessException{
		AnnounceManage page= announceManageService.publishAnnounce(announceManage);
		return RetResultUtil.ok(page);
	}
	/**
	 * 查询列表
	 * @return
	 * @throws BusinessException
	 */
	@ApiOperation(value = "查询列表", notes = "查询列表")
	@RequestMapping(value = "/findQueryList", method = RequestMethod.POST)
	public RetResult<PageUtil> findQueryList(@RequestBody IBasePage param)  throws BusinessException{
		
		PageInfo<AnnounceManage> page=announceManageService.findQueryList(param);
		PageUtil pageUtil=new PageUtil(page);
		return RetResultUtil.ok(pageUtil);
	}
	/**
	 * 查询列表(已发布)
	 * @return
	 * @throws BusinessException
	 */
	@ApiOperation(value = "查询列表(已发布)", notes = "查询列表(已发布)")
	@RequestMapping(value = "/findPublishQueryList", method = RequestMethod.POST)
	public RetResult<PageUtil> findPublishQueryList(@RequestBody IBasePage param)  throws BusinessException{	
		
		PageInfo<AnnounceManage> page=announceManageService.findPublishQueryList(param);
		PageUtil pageUtil=new PageUtil(page);
		return RetResultUtil.ok(pageUtil);
	}
	/**
	 * 通过id查询记录
	 * @param id
	 * @return
	 * @throws BusinessException
	 */
	@ApiOperation(value = "通过id查询记录", notes = "通过id查询记录")
	@RequestMapping(value = "/findAnnounceById", method = RequestMethod.GET)
	public RetResult<AnnounceManage> findAnnounceById(@RequestParam("pkId") String pkId)  throws BusinessException{
		
		AnnounceManage page = announceManageService.findAnnounceById(pkId);
		return RetResultUtil.ok(page);
	}
	/**
	 * 通过组合条件查询记录
	 * @param announceManageQuery
	 * @return
	 * @throws BusinessException
	 */
	@ApiOperation(value = "通过组合条件查询记录", notes = "通过组合条件查询记录")
	@RequestMapping(value = "/findAnnounceByOthers", method = RequestMethod.POST)
	public RetResult<PageUtil> findAnnounceByOthers(@RequestBody AnnounceManageQuery announceManageQuery)  throws BusinessException{
		
		PageInfo<AnnounceManage> page = announceManageService.findAnnounceByOthers(announceManageQuery);
		PageUtil pageUtil=new PageUtil(page);
		return RetResultUtil.ok(pageUtil);
	}
	/**
	 * 安全公告类别详情
	 * @return
	 * @throws BusinessException
	 */
	@ApiOperation(value = "安全公告类别详情", notes = "安全公告类别详情")
	@RequestMapping(value = "/getCategoryDetails", method = RequestMethod.GET)
	public RetResult<List<Map<String,Object>>> getCategoryDetails(@RequestParam(value="flag",required=false) String flag)  throws BusinessException{
		
		List<Map<String,Object>> page = announceManageService.getCategoryDetails(flag);
		return RetResultUtil.ok(page);
	} 
	/**
	 * 浏览次数TOP5详情
	 * @return
	 * @throws BusinessException
	 */
	@ApiOperation(value = "浏览次数TOP5详情", notes = "浏览次数TOP5详情")
	@RequestMapping(value = "/getLookThroughTop5", method = RequestMethod.GET)
	public RetResult<List<AnnounceManage>> getLookThroughTop5()  throws BusinessException{
		List<AnnounceManage> page = announceManageService.getLookThroughTop5();
		return RetResultUtil.ok(page);
	}
	/**
	 * 附件下载TOP5详情
	 * @return
	 * @throws BusinessException
	 */
	@ApiOperation(value = "附件下载TOP5详情", notes = "附件下载TOP5详情")
	@RequestMapping(value = "/getAppendixDownloadTop5", method = RequestMethod.GET)
	public RetResult<List<AnnounceManage>> getAppendixDownloadTop5()  throws BusinessException{
		List<AnnounceManage> page = announceManageService.getAppendixDownloadTop5();
		return RetResultUtil.ok(page);
	}
	/**
	 * 批量删除
	 * @return
	 * @throws BusinessException
	 */
	@ApiOperation(value = "批量删除", notes = "批量删除")
	@RequestMapping(value = "/deleteAnnounceList", method = RequestMethod.POST)
	public RetResult<String> deleteAnnounceList(@RequestBody AnnounceManageQuery announceManageQuery)  throws BusinessException{
		String page = announceManageService.deleteAnnounceList(announceManageQuery);
		return RetResultUtil.ok(page);
	}
	/**
	 * 查询所有类别
	 * @return
	 * @throws BusinessException
	 */
	@ApiOperation(value = "查询所有类别", notes = "查询所有类别")
	@RequestMapping(value = "/findCategory", method = RequestMethod.GET)
	public RetResult<List<Map<String,Object>>> findCategory()  throws BusinessException{
		List<Map<String,Object>> page = announceManageService.findCategory();
		return RetResultUtil.ok(page);
	}  
	/**
	 * 查询所有子类别
	 * @return
	 * @throws BusinessException
	 */
	@ApiOperation(value = "查询所有子类别", notes = "查询所有子类别")
	@RequestMapping(value = "/findChildCategory", method = RequestMethod.GET)
	public RetResult<List<Map<String,Object>>> findChildCategory(@RequestParam("categoryID") Integer categoryID)  throws BusinessException{
		List<Map<String,Object>> page = announceManageService.findChildCategory(categoryID);
		return RetResultUtil.ok(page);
	}  
	/**
	 * 通过输入模糊查询类别
	 * @return
	 * @throws BusinessException
	 */
	@ApiOperation(value = "通过输入模糊查询类别", notes = "通过输入模糊查询类别")
	@RequestMapping(value = "/findVagueCategory", method = RequestMethod.GET)
	public RetResult<List<Map<String,Object>>> findVagueCategory(@RequestParam("category") String category)  throws BusinessException{
		List<Map<String,Object>> page = announceManageService.findVagueCategory(category);
		return RetResultUtil.ok(page);
	}
	/**
	 * 通过输入模糊查询子类别
	 * @return
	 * @throws BusinessException
	 */
	@ApiOperation(value = "通过输入模糊查询子类别", notes = "通过输入模糊查询子类别")
	@RequestMapping(value = "/findVagueChildCategory", method = RequestMethod.GET)
	public RetResult<List<Map<String,Object>>> findVagueChildCategory(@RequestParam("childCategory") String childCategory,@RequestParam("categoryID") Integer categoryID)  throws BusinessException{
		List<Map<String,Object>> page = announceManageService.findVagueChildCategory(childCategory,categoryID);
		return RetResultUtil.ok(page);
	}
	/**
	 * 批量置顶与取消
	 * @return
	 * @throws BusinessException
	 */
	@ApiOperation(value = "批量置顶与取消", notes = "批量置顶与取消")
	@RequestMapping(value = "/batchTopping", method = RequestMethod.POST)
	public RetResult<String> batchTopping(@RequestBody AnnounceManageQuery announceManageQuery)  throws BusinessException{
		String page = announceManageService.batchTopping(announceManageQuery);
		return RetResultUtil.ok(page);
	}
	/**
	 * 通过类别编码查公告信息
	 * @return
	 * @throws BusinessException
	 */
	@ApiOperation(value = "通过类别编码查公告信息", notes = "通过类别编码查公告信息")
	@RequestMapping(value = "/findAnnounceByCatagory", method = RequestMethod.GET)
	public RetResult<PageUtil> findAnnounceByCatagory(@RequestParam(value="categoryID",required=false) Integer categoryID,@RequestParam(value="flag",required=false) String flag,@RequestParam(value="currPage",required=false) Integer currPage,@RequestParam(value="pageSize",required=false) Integer pageSize)  throws BusinessException{
		PageInfo<AnnounceManage> page = announceManageService.findAnnounceByCatagory(categoryID,flag,currPage,pageSize);
		PageUtil pageUtil=new PageUtil(page);
		return RetResultUtil.ok(pageUtil);
	}
}
