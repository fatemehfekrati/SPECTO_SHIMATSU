 

//fixed-nav
$(document).on("scroll",function(){
	if($(document).scrollTop()>20){ 
		$("header").removeClass("large").addClass("small");
	}
	else{
		$("header").removeClass("small").addClass("large");
	}
});


//search
 $(function(){
     $(".attr-nav").each(function(){  
                $(".search", this).on("click", function(e){
                    e.preventDefault();
                    $(".top-search").slideToggle();
                });
            });
            $(".input-group-addon.close-search").on("click", function(){
                $(".top-search").slideUp();
            })
  })

$(function( ) {
	setInterval(function(){
		if($(".animated-circles").hasClass("animated")){
			$(".animated-circles").removeClass("animated");
		}else{
			$(".animated-circles").addClass('animated');
		}
	},3000);
});
//back-top
$(function(){
	$(window).scroll(function(){
		var _top = $(window).scrollTop();
		if(_top>300){
			$('.back_top').fadeIn(600);
		}else{
			$('.back_top').fadeOut(600);
		}
	});
	$(".back_top").click(function(){
		$("html,body").animate({scrollTop:0},500);
	});
});

//select
$(function(){
    $("._select").each(function(){
        var s=$(this);
        var z=parseInt(s.css("z-index"));
        var dt=$(this).children("dt");
        var dd=$(this).children("dd");
        var _show=function(){dd.slideDown(200);dt.addClass("cur");dd.addClass("open");s.css("z-index",z+1);};   //展开效果
        var _hide=function(){dd.slideUp(200);dt.removeClass("cur");dd.removeClass("open");s.css("z-index",z);};    //关闭效果
        dt.click(function(){dd.is(":hidden")?_show():_hide();});
        dd.find("a").click(function(){dt.html($(this).html());_hide();});     //选择效果（如需要传值，可自定义参数，在此处返回对应的“value”值 ）
        $("body").click(function(i){ !$(i.target).parents("._select").first().is(s) ? _hide():"";});
    })
})


 $(document).ready(function() {
                    //Horizontal Tab
                    $('#parentHorizontalTab02').easyResponsiveTabs({
                        type: 'default', //Types: default, vertical, accordion
                        width: 'auto', //auto or any width like 600px
                        fit: true, // 100% fit in a container
                        tabidentify: 'hor_1', // The tab groups identifier
                        activate: function(event) { // Callback function if tab is switched
                            var $tab = $(this);
                            var $info = $('#nested-tabInfo');
                            var $name = $('span', $info);
                            $name.text($tab.text());
                            $info.show();
                            }
                        });
            
                    });

 //fixed inquiry
$(document).ready(function(){

    $("#floatShow").bind("click",function(){
	
        $("#onlineService").animate({
            height:"show", 
            opacity:"show"
        }, "normal" ,function(){
            $("#onlineService").show();
        });
		
        $("#floatShow").attr("style","display:none");
        $("#floatHide").attr("style","display:block");
		
        return false;
    });
	
    $("#floatHide").bind("click",function(){
	
        $("#onlineService").animate({
            height:"hide", 
            opacity:"hide"
        }, "normal" ,function(){
            $("#onlineService").hide();
        });
		
        $("#floatShow").attr("style","display:block");
        $("#floatHide").attr("style","display:none");
		
        return false;
    });
  
});


 
// fixed service
$(function() {
	$(".online_section").hover(function() {
		$(".online_section").css("right", "0");
		$(".online_section .online_code").css('height', '160px');
	}, function() {
		$(".online_section").css("right", "-220px");
		$(".online_section .online_code").css('height', '40px');
	});
});

 
 $(function(){
	$('.autoplay1').slick({
		infinite: true,
		speed: 1500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		rows:1,
		autoplaySpeed:3000,
		pauseOnHover:true,
		dots:true,
		responsive: [
		{
		  breakpoint:1260,
		  settings: {
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed:3000,
			dots:true,
		  }
		},
		{
		  breakpoint:480,
		  settings: {
			slidesToShow:1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed:3000,
			dots:true,
		  }
		},
	]
	})
})


$(function(){
	$('.autoplay4').slick({
		infinite: true,
		speed: 1500,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed:3000,
		pauseOnHover:true,
		dots:true,
		responsive: [
		{
		  breakpoint: 992,
		  settings: {
		    slidesToShow:3,
		    slidesToScroll: 1,
		    autoplay: true,
		    autoplaySpeed:3000,
	        infinite: true,
		    dots:true,
			}
		},
		{
		  breakpoint:768,
		  settings: {
			slidesToShow: 2,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed:3000,
			dots:true,
		  }
		},
		{
		  breakpoint: 440,
		  settings: {
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed:3000,
			dots:true,
		  }
		}
	]
	})
})
 
 $(function(){
	$('.autoplay3').slick({
		infinite: true,
		speed: 1500,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed:3000,
		pauseOnHover:true,
		dots:true,
		responsive: [
		{
		  breakpoint: 1199,
		  settings: {
		    slidesToShow:3,
		    slidesToScroll: 1,
		    autoplay: true,
		    autoplaySpeed:3000,
	        infinite: true,
		    dots:true,
			}
		},	
		{
		  breakpoint: 992,
		  settings: {
		    slidesToShow:3,
		    slidesToScroll: 1,
		    autoplay: true,
		    autoplaySpeed:3000,
	        infinite: true,
		    dots:true,
			}
		},
		{
		  breakpoint:768,
		  settings: {
			slidesToShow: 2,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed:3000,
			dots:true,
		  }
		},
		
		{
		  breakpoint: 370,
		  settings: {
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed:3000,
			dots:true,
		  }
		}
	]
	})
})
 $(function(){
	$('.autoplay7').slick({
		infinite: true,
		speed: 1500,
		slidesToShow: 7,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed:3000,
		pauseOnHover:true,
		dots:true,
		responsive: [
		{
		  breakpoint: 1299,
		  settings: {
		    slidesToShow:6,
		    slidesToScroll: 1,
		    autoplay: true,
		    autoplaySpeed:3000,
	        infinite: true,
		    dots:true,
			}
		},	
		{
		  breakpoint: 992,
		  settings: {
		    slidesToShow:5,
		    slidesToScroll: 1,
		    autoplay: true,
		    autoplaySpeed:3000,
	        infinite: true,
		    dots:true,
			}
		},
		{
		  breakpoint:768,
		  settings: {
			slidesToShow: 4,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed:3000,
			dots:true,
		  }
		},
		{
		  breakpoint: 500,
		  settings: {
			slidesToShow: 3,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed:3000,
			dots:true,
		  }
		} 
	]
	})
}) 
  
    //categories tab
 $(document).ready(function () {
        $(".cate_img ul li").hover(function () {
            $(".cate_img ul li").removeClass("current");
            $i = $(this).index();
            $(this).addClass("current");
            top1 = -$i * 536;
            $(".cate_ul ul").stop(true, false).animate({"top": top1},0);
        });
    });

 


 
 
 