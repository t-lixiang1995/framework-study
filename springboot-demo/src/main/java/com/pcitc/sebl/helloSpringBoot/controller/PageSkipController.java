package com.pcitc.sebl.helloSpringBoot.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
/**
 *
 * 类描述：   页面跳转控制类
 * 创建人：   pcitc
 */
@Controller
public class PageSkipController {
	
	@RequestMapping(value = "/securityBulletin/securityBulletinList", method = RequestMethod.GET)
    public String mainPage() {
      return "safetyBulletin/survey";
    }
	

	@RequestMapping(value = "/securityBulletin/bulletinList", method = RequestMethod.GET)
    public ModelAndView bulletinList(@RequestParam("categoryID") Integer categoryID, @RequestParam("flag") String flag) {
		ModelAndView view = new ModelAndView();
		view.addObject("categoryID", categoryID);
		view.addObject("flag", flag);
		view.setViewName("safetyBulletin/bulletinList");
		return view;
    }
	
	@RequestMapping(value = "/securityBulletin/managementList", method = RequestMethod.GET)
    public String managementList() {
		return "safetyBulletin/managementList";
    }
	
	
	@RequestMapping(value = "/securityBulletin/editorialBulletin", method = RequestMethod.GET)
    public ModelAndView editorialBulletin(@RequestParam("pkId") String pkId) {
		ModelAndView view = new ModelAndView();
		view.addObject("pkId", pkId);
		view.setViewName("safetyBulletin/editorialBulletin");
		return view;
    }
	
	@RequestMapping(value = "/securityBulletin/newAnnouncement", method = RequestMethod.GET)
    public String newAnnouncement() {
      return "safetyBulletin/newAnnouncement";
    }
	
	@RequestMapping(value = "/hello", method = RequestMethod.GET)
    public String hello() {
      return "hello";
    }
	
	@RequestMapping(value = "/inputTest", method = RequestMethod.GET)
    public String inputTest() {
      return "inputTest";
    }
	
	@RequestMapping(value = "/securityBulletin/managementDetails", method = RequestMethod.GET)
    public ModelAndView managementDetails(@RequestParam("pkId") String pkId) {
		ModelAndView view = new ModelAndView();
		view.addObject("pkId", pkId);
		view.setViewName("safetyBulletin/managementDetails");
		return view;
    }

	@RequestMapping(value = "/securityBulletin/announcementDetails", method = RequestMethod.GET)
    public ModelAndView announcementDetails(@RequestParam("pkId") String pkId) {
		ModelAndView view = new ModelAndView();
		view.addObject("pkId", pkId);
		view.setViewName("safetyBulletin/announcementDetails");
		return view;
    } 

}
