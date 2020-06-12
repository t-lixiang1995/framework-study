(function($){

$.fn.disappear=function(opt){
  var defaults={hide:false,speed:1500,text:'',fn:function(){}},
      options=$.extend(defaults,opt),
      windowWidth=$(window).width(),
      windowHeight=$(window).height(),
      popupWidth=$(this).width(),
      popupHeight=$(this).height(),
      halfWidth=windowWidth/2-popupWidth/2,
      halfHeight=windowHeight/2-popupHeight/2,
      that=$(this);
      that.css({"left":halfWidth,"top":halfHeight});
      that.children().children("span").text(options.text)
      that.show(0);
      if(options.hide){
          setTimeout(function(){
             that.hide(0,options.fn);
          },options.speed)
      }
}

$.fn.Ztpopup=function(opt){
   var defaults={speed:200,backd:"#000",callBack:function(){}},
       options=$.extend(defaults,opt),
       windowWidth=$(window).width(),
       windowHeight=$(window).height(),
       popupWidth=$(this).width(),
       popupHeight=$(this).height(),
       halfWidth=windowWidth/2-popupWidth/2,
       halfHeight=windowHeight/2-popupHeight/2,
       popupMark="<div class='mdw-popup-mark'></div>",
       that=$(this);
       $("body").append(popupMark);
       $(".mdw-popup-mark").css({width:windowWidth,height:windowHeight,background:options.backd});
       that.css({"left":halfWidth,"top":halfHeight});
       that.show(0,options.callBack);
       $(window).resize(function(){
            var windowWidth=$(window).width(),
                windowHeight=$(window).height(),
                popupWidth=that.width(),
                popupHeight=that.height(),
                halfWidth=windowWidth/2-popupWidth/2,
                halfHeight=windowHeight/2-popupHeight/2;
                that.css({"left":halfWidth,"top":halfHeight});
                $(".mdw-popup-mark").css({width:windowWidth,height:windowHeight});
        })
}



$.fn.Ztreturn=function(){
    $(this).click(function(){
       $("html,body").animate({
            "scrollTop": 0
        }, 300)
    })
}





$.fn.ZtPictureSlide=function(opt){
   var defaults={speed:30},
       options=$.extend(defaults,opt),
       ulHtml=$(this).children('ul'),
       ulLiOne=ulHtml.children('li').eq(0),
       ulLiOneWidth=ulLiOne.outerWidth(true),
       counter=0,
       timeOut=null,
       spa = -2;
       ulHtml.append(ulHtml.html())
       var ulLiLength=ulHtml.children('li').length;
       ulHtml.width(ulLiOneWidth*ulLiLength);
       var  move=function(){
          if(parseInt(ulHtml.css("left"))<-ulHtml.width()/2){
               ulHtml.css("left",0)
          }
          if(parseInt(ulHtml.css("left"))>0){
              ulHtml.css("left",-ulHtml.width()/2)
          }
          ulHtml.css("left","-="+spa)     
        }
        timeOut=setInterval(move,options.speed)
        $(this).mouseenter(function(){
            clearInterval(timeOut)
        })
        $(this).mouseleave(function(){
            timeOut=setInterval(move,options.speed)
        })

        $(".pictureSlideLeft").click(function(){
             spa=2
        })

        $(".pictureSlideRight").click(function(){
             spa=-2
        })
}


$.fn.ZtSeamlessSlide=function(opt){
   var defaults={speed:2000},
       options=$.extend(defaults,opt),
       ulHtml=$(this).children('ul'),
       ulLiOne=ulHtml.children('li').eq(0),
       ulLiOneWidth=ulLiOne.outerWidth(true),
       counter=ulLiOneWidth,
       timeOut=null;
       ulHtml.append(ulHtml.html())
       var ulLiLength=ulHtml.children('li').length;
       ulHtml.width(ulLiOneWidth*ulLiLength);
         var moveRun=function(){
              if(parseInt(ulHtml.css("left"))<=-ulHtml.width()/2){
                   ulHtml.css("left",0)
              }
              if(parseInt(ulHtml.css("left"))>=0){
                ulHtml.css("left",-ulHtml.width()/2)
              }

              ulHtml.stop().animate({left:"+="+counter},200);
         }
        timeOut=setInterval(moveRun,options.speed);
         
         $(".relevantDataImg").mouseenter(function(){
              clearInterval(timeOut);
         })

         $(".relevantDataImg").mouseleave(function(){
              timeOut=setInterval(moveRun,options.speed);
         })

        $(".pictureSlideLeft").click(function(){
             clearInterval(timeOut); 
              if(parseInt(ulHtml.css("left"))<=-ulHtml.width()/2){
                   ulHtml.css("left",0);
              }
              ulHtml.stop().animate({left:"-="+counter},200);
        })
        $(".pictureSlideRight").click(function(){
            clearInterval(timeOut);
            counter=ulLiOneWidth;
            moveRun();
        })      
}


$.fn.ZtPictureDisplay=function(opt){
	var defaults={speed:4000},
        options=$.extend(defaults,opt),
        that=$(this),
        timeOut=null,
        thisUlHtml=that.children("ul").children("li"),
        thisBox=this.children(".mdw-carousel-box")
        thisOlHtml=thisBox.children("ol"),
        counter=0,
        i=0,
        olLiHtml="",
        thisOlHtmlOne="",
        thisOlHtmlLength="";
        
        for(;i<thisUlHtml.length;i++){
        	olLiHtml+="<li></li>"
        }
        thisOlHtml.html(olLiHtml);
        thisOlHtmlOne=thisOlHtml.children('li').eq(0).outerWidth(true);
        thisOlHtmlLength=thisOlHtml.children('li').length;
        thisOlHtml.width((thisOlHtmlOne+4)*thisOlHtmlLength+50);
        thisOlHtml.css({marginLeft:thisBox.width()/2-thisOlHtml.width()/2})
        
        thisUlHtml.eq(0).css({"flter":"Alpha(Opacity=100)","z-index":2,"opacity":1})
        thisOlHtml.children().eq(0).addClass('mdw-carousel-white');
        thisOlHtml.on("click","li",function(){
        	 var index=$(this).index();
        	     counter=index;
        	     $(this).addClass("mdw-carousel-white").siblings().removeClass("mdw-carousel-white");
        	     thisUlHtml.eq(index).animate({"opacity":1},500).css({"flter":"Alpha(Opacity=100)","z-index":2}).siblings().animate({"opacity":0},500).css({"flter":"Alpha(Opacity=0)","z-index":1})
        })
        
         var motionRight=function(){
         	 if(counter==thisUlHtml.length-1){
         	 	 counter=0;
         	 }else{
         	 	 counter++;
         	 }
         	 thisUlHtml.eq(counter).animate({"opacity":1},500).css({"flter":"Alpha(Opacity=100)","z-index":2}).siblings().animate({"opacity":0},500).css({"flter":"Alpha(Opacity=0)","z-index":1})
             thisOlHtml.children().eq(counter).addClass("mdw-carousel-white").siblings().removeClass("mdw-carousel-white")
         }
         var motionLeft=function(){
         	 if(counter==0){
         	 	 counter=thisUlHtml.length-1;
         	 }else{
         	 	 counter--;
         	 }
         	 thisUlHtml.eq(counter).animate({"opacity":1},500).css({"flter":"Alpha(Opacity=100)","z-index":2}).siblings().animate({"opacity":0},500).css({"flter":"Alpha(Opacity=0)","z-index":1})
             thisOlHtml.children().eq(counter).addClass("mdw-carousel-white").siblings().removeClass("mdw-carousel-white")
         }
        
        timeOut=setInterval(motionRight,options.speed);
        that.hover(function(){
                clearInterval(timeOut);
                $(".mdw-carousel-box div").fadeIn();
                 thisOlHtml.children("li").addClass("mdw-carousel-expand")
            },function(){
                clearInterval(timeOut);
                timeOut=setInterval(motionRight,options.speed);
                $(".mdw-carousel-box div").fadeOut();
                thisOlHtml.children("li").removeClass("mdw-carousel-expand")
            })
        $(".mdw-carousel-right").on("click",motionRight);
        $(".mdw-carousel-left").on("click",motionLeft);
}




$.fn.Ztstack=function(opt){
	 var defaults={speed:4000},
	     options=$.extend(defaults,opt),
	     counter=0,
	     timeOut=null,
	     thiswidth=$(this).width(),
	     thisUlHtml=$(this).children("ul").children("li");
	     thisUlHtml.eq(0).addClass("mdw-stack-regression")
	   
         var motionRight=function(){
             if(counter==thisUlHtml.length-1){
                 counter=0;
             }else{
                 counter++;
             }
         thisUlHtml.eq(counter).css("z-index",5).siblings().css("z-index",3).end().animate({"left":0},500,function(){
          $(this).siblings().css("left",thiswidth)})
        
           }
	    
	     timeOut=setInterval(motionRight,options.speed);
	     $(this).hover(function(){
                clearInterval(timeOut);
            },function(){
                 timeOut=setInterval(motionRight,options.speed);
            })
}



$.fn.Ztrandom=function(opt){
  var  defaults = {digital:10,timeover:2000,num:100},
       options = $.extend(defaults,opt),
       timeOut,
       i,
       size=$(this).length,
       numberArr=[],
       that=$(this);
       timeOut=setInterval(function(){
         for(i=0;i<size;i++){
               numberArr[i]=Math.ceil(Math.random()*options.digital) 
         }
         that.each(function(i){
               $(this).text(numberArr[i])
         })
       },options.num)
      setTimeout(function(){
        clearInterval(timeOut)
      },options.timeover)  
}



$.fn.ZtCarousel=function(opt){
   var defaults={speed:4000},
       options=$.extend(defaults,opt),
       ulHtml=$(this).children('ul'),
       ulLiOne=ulHtml.children('li').eq(0),
       ulLiOneWidth=ulLiOne.outerWidth(true),
       olHtml=$(this).children('.mdw-flip-box').children('ol'),
       olLiHtml="",
       i=0,
       counter=0,
       timeOut=null;
       ulHtml.append(ulLiOne.clone())
       var ulLiLength=ulHtml.children('li').length;
       ulHtml.width(ulLiOneWidth*ulLiLength);
      
       for(;i<ulLiLength-1;i++){
        olLiHtml+="<li></li>"
       }
       olHtml.html(olLiHtml)
       olHtml.children().eq(0).addClass('mdw-flip-white');
       olHtml.on("click","li",function(){
               var index=$(this).index();
               counter=index;
               $(this).addClass("mdw-flip-white").siblings().removeClass("mdw-flip-white");
               ulHtml.animate({left:-(index*ulLiOneWidth)},500);
        })
      
         var motionRight=function(){
             counter++;
             if(counter==ulLiLength-1){
                olHtml.children("li").eq(0).addClass("mdw-flip-white").siblings().removeClass("mdw-flip-white");
              }
              olHtml.children("li").eq(counter).addClass("mdw-flip-white").siblings().removeClass("mdw-flip-white");
              ulHtml.animate({left:-(counter*ulLiOneWidth)},500,function(){
                    if(counter==ulLiLength-1){
                       ulHtml.css({left:0});
                       counter=0
                    }
              });    
         }
         var motionLeft=function(){
              if(counter==0){
                 ulHtml.css({left:-(ulLiLength-1)*ulLiOneWidth});
                 counter=ulLiLength-2;
              }else{
                counter--;
              }
              olHtml.children("li").eq(counter).addClass("mdw-flip-white").siblings().removeClass("mdw-flip-white");
              ulHtml.animate({left:-(counter*ulLiOneWidth)})

         }
       
        timeOut=setInterval(motionRight,options.speed);
        $(this).hover(function(){
                clearInterval(timeOut);
                $(".mdw-flip-box div").show();
            },function(){
                timeOut=setInterval(motionRight,options.speed);
                $(".mdw-flip-box div").hide();
            })
        $(".mdw-flip-right").click(motionRight);
        $(".mdw-flip-left").click(motionLeft)
}





$.fn.ZtSlideMark=function(){

     return this.each(function(){
     
       $(this).on("mouseenter","li",function(e){
        var Width=$(this).width(),
        Height=$(this).height(),
        pageX=e.pageX,
        pageY=e.pageY,
        OffsetTop=$(this).offset().top,
          OffsetLeft=$(this).offset().left,
          coordinateX=pageX-OffsetLeft,
          coordinateY=pageY-OffsetTop;
      if(coordinateX<10){
       $(this).children(".mark").css({left:-100+"%",top:0}).stop().animate({left:0})
      }else if(coordinateX>Width-10){
         $(this).children(".mark").css({left:100+"%",top:0}).stop().animate({left:0})
      }else if(coordinateY<10){
        $(this).children(".mark").css({top:-100+"%",left:0}).stop().animate({top:0})
      }else if(coordinateY>Height-10){
        $(this).children(".mark").css({top:100+"%",left:0}).stop().animate({top:0})
      }
       })
  

  
   $(this).on("mouseleave","li",function(e) {
    var Width=$(this).width(),
        Height=$(this).height(),
        pageX=e.pageX,
        pageY=e.pageY,
        OffsetTop=$(this).offset().top,
          OffsetLeft=$(this).offset().left,
          coordinateX=pageX-OffsetLeft,
          coordinateY=pageY-OffsetTop;
      if(coordinateX<10){
       $(this).children(".mark").stop().animate({left:-100+"%",top:0})
      }else if(coordinateX>Width-10){
          $(this).children(".mark").stop().animate({left:100+"%",top:0})
      }else if(coordinateY<10){
         $(this).children(".mark").stop().animate({top:-100+"%",left:0})
      }else if(coordinateY>Height-10){
         $(this).children(".mark").stop().animate({top:100+"%",left:0})
      }
 })
   
     })
}


}(jQuery))