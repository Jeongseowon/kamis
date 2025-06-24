// lnb
$(document).ready(function(){
    $(".btn_lnb_toggle").click(function(){
      $('.content').toggleClass('menu_open');
      $('.content').toggleClass('responsive');
      $('#lnb').toggleClass('open');
      if ($("#lnb").hasClass("open")) {
        $(this).html("메뉴<br>닫기");
      }else{
        $(this).html("메뉴<br>열기");
      }
    });

    $("#lnb li.on").children("ul").show();
    $("#lnb li.has_sub > a").click(function() {
      if ($(this).parent().hasClass("on")) {
        $(this).parent().removeClass("on");
        $("#lnb li ul").stop().slideUp(200);
      } else {
        $("#lnb>ul>li").removeClass("on");
        $("#lnb li ul").stop().slideUp(200);
        $(this).parent().addClass("on")
        $(this).next("ul").stop().slideDown(200);
      }
      return false;
    })
  });

// calendar
$(function() {
	setCheck();
	changeChk();
	fncDate("OneDate");

  $(".search_type1 .btn_detail").click(function() {
    if ($(this).hasClass("on")) {
      $(".search_type1 .btn_detail").removeClass("on")
      $(".search_type1 .btn_detail").html('상세검색 열기<i class="xi-angle-down-min"></i>');
      $(this).siblings(".js-srchDet").stop().slideUp(200);
    } else {
      $(".search_type1 .btn_detail").removeClass("on")
      $(".search_type1 .btn_detail").html('상세검색 닫기<i class="xi-angle-up-min"></i>');
      $(this).siblings(".js-srchDet").stop().slideUp(200);
      $(this).addClass("on")
      $(this).siblings(".js-srchDet").stop().slideDown(200)
    }
    return false;
  });

  $(".search_type2 .btn_detail_search").click(function() {
    if ($(this).hasClass("on")) {
      $(".search_type2 .btn_detail_search").removeClass("on");
      $(".search_type2 .btn_detail_search").html("<i class='xi-search'></i>");
      $(".info_txt").show();
      $(this).parents().siblings(".js-srchDet").stop().slideUp(200);
    } else {
      $(".search_type2 .btn_detail_search").removeClass("on");
      $(".search_type2 .btn_detail_search").html("<i class='xi-close'></i>");
      $(".info_txt").hide();
      $(this).parents().siblings(".js-srchDet").stop().slideUp(200);
      $(this).addClass("on")
      $(this).parents().siblings(".js-srchDet").stop().slideDown(200)
    }
    return false;
  });

  $(".md_tit .btn_bookmark").click(function() {
    $(this).toggleClass("on");
  });
	
	$('table .tbl_sort .btn_sort').click(function() {
		$(this).siblings(".tbl_sort .sort_list").toggleClass("active");
		$(this).toggleClass("active");
	});

	
// 특수 검색조건 (select 안에 tree)
$(".slide_select .slide_text").click(function() {
	$(".slide_select .treemenu_box").slideToggle(150);
	$(this).toggleClass("slide");
});


// 특수 검색조건 (option에 checkbox가 있는 select)
var mutliSelect=$(".mutliSelect .multi_show");
var html='';

$(".mutliSelect .multi_text").click(function() {
	$(".mutliSelect .multi_option").slideToggle(150);
	$(this).toggleClass("slide");
});

$('.mutliSelect input[type="checkbox"]').click(function() {
	if($(this).is(':checked')){
		$(".multi_default").hide();
		html=`<span class="multi_${this.id}">${this.value}</span>`
		mutliSelect.append(html); //클릭한 checkbox의 값을 select에 출력
	}
	else{
		$(`span.multi_${this.id}`).remove();
	}

	if ($('.multi_show').children().length===0){ //check된 것이 없다면 기본 텍스트로 변경
		$(".multi_default").show();
	}
});
// custom formatting example
$('.count-number').data('countToOptions', {
	formatter: function (value, options) {
		return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
	}
});
// start all the timers
$('.timer').each(count);  
});

$.fn.countTo = function (options) {
		options = options || {};
		return $(this).each(function () {
			// set options for current element
			var settings = $.extend({}, $.fn.countTo.defaults, {
				from:            $(this).data('from'),
				to:              $(this).data('to'),
				speed:           $(this).data('speed'),
				refreshInterval: $(this).data('refresh-interval'),
				decimals:        $(this).data('decimals')
			}, options);
			// how many times to update the value, and how much to increment the value on each update
			var loops = Math.ceil(settings.speed / settings.refreshInterval),
				increment = (settings.to - settings.from) / loops;
			// references & variables that will change with each update
			var self = this,
				$self = $(this),
				loopCount = 0,
				value = settings.from,
				data = $self.data('countTo') || {};
			$self.data('countTo', data);
			
			// if an existing interval can be found, clear it first
			if (data.interval) {
				clearInterval(data.interval);
			}
			data.interval = setInterval(updateTimer, settings.refreshInterval);
			
			// initialize the element with the starting value
			render(value);
			
			function updateTimer() {
				value += increment;
				loopCount++;
				
				render(value);
				
				if (typeof(settings.onUpdate) == 'function') {
					settings.onUpdate.call(self, value);
				}
				
				if (loopCount >= loops) {
					// remove the interval
					$self.removeData('countTo');
					clearInterval(data.interval);
					value = settings.to;
					
					if (typeof(settings.onComplete) == 'function') {
						settings.onComplete.call(self, value);
					}
				}
			}
			
			function render(value) {
				var formattedValue = settings.formatter.call(self, value, settings);
				$self.html(formattedValue);
			}
		});
	};

	$.fn.countTo.defaults = {
		from: 0,               // the number the element should start at
		to: 0,                 // the number the element should end at
		speed: 1000,           // how long it should take to count between the target numbers
		refreshInterval: 1,  // how often the element should be updated
		decimals: 0,           // the number of decimal places to show(소수점 자리수 수정하고 싶으면 여기를 수정)
		formatter: formatter,  // handler for formatting the value before rendering
		onUpdate: null,        // callback method for every time the element is updated
		onComplete: null       // callback method for when the element finishes updating
	};
	function formatter(value, settings) {
		return value.toFixed(settings.decimals);
	}


  
  function count(options) {
	var $this = $(this);
	options = $.extend({}, options || {}, $this.data('countToOptions') || {});
	$this.countTo(options);
  }


// SMS (체크박스가 있는 트리)
var setting = {
	check: {
		enable: true,
		chkDisabledInherit : false  //체크박스 disable기능
	},
	data: {
		simpleData: {
			enable: true
		}
	},
  };
	//트리메뉴 구성
	//상태옵션
	//open:true - 열려있는 상태옵션, checked:true - 체크되어있는 상태옵션, chkDisabled:true - 체크막아져있는 상태옵션
	//메뉴 구성방법 및 예시
	//맨 상위 메뉴는 id:한자리수 pID:0  ex) id:2, pId:0
	//2차 메뉴는 id: 1차 메뉴id+ 2차메뉴순차수 pId: 1차 메뉴id ex) id:21, pId:2
	//3차 메뉴는 id: 2차 메뉴id + 3차메뉴순차수 pId : 2차메뉴id ex) id:211, pId:21
	var zNodesFst = [
		{ id:1, pId:0, name:'본사', open:true},{ id:11, pId:1, name:'전략기획본부(직할)', checked:true},{ id:11, pId:1, name:'경영성과향상TF', checked:true},{ id:11, pId:1, name:'기획처', open:true},{ id:111, pId:11, name:'경영기획부', checked:true},{ id:112, pId:11, name:'전략혁신부', checked:true},{ id:113, pId:11, name:'경영평가부', checked:true},{ id:114, pId:11, name:'광업등록사무소', checked:true},{ id:115, pId:11, name:'전기위원회', checked:true},{ id:116, pId:11, 
			name:'경제자유구역기획단', checked:true},{ id:117, pId:11, name:'윤리준법부', checked:true},{ id:118, pId:11, name:'품질경영부', checked:true},
			{ id:12, pId:1, name:'인사노무처', open:true},{ id:21, pId:12, name:'인사부', open:true},{ id:211, pId:12, name:'노사복지부', checked:true},{ id:212, pId:12, name:'급여부', checked:true},{ id:213, pId:12, name:'인재개발부', checked:true},
			{ id:2, pId:0, name:'서울지역본부', open:true},
			{ id:2, pId:0, name:'인천지역본부', open:true},
			{ id:2, pId:0, name:'경기지역본부', open:true},
			{ id:2, pId:0, name:'강원지역본부', open:true},
			{ id:2, pId:0, name:'대전지역본부', open:true},
			{ id:2, pId:0, name:'광주전남지역본부', open:true},
			{ id:2, pId:0, name:'대구지역본부', open:true},
			{ id:2, pId:0, name:'부산울산지역본부', open:true},
			{ id:2, pId:0, name:'경기북부지역사업처', open:true},
			{ id:2, pId:0, name:'충북지역사업처', open:true},
			{ id:2, pId:0, name:'전북지역사업처', open:true},
			{ id:2, pId:0, name:'경북지역사업처', open:true},
			{ id:2, pId:0, name:'경남지역사업처', open:true},
			{ id:2, pId:0, name:'제주지역사업처', open:true},
	];
  
	var code;
	function setCheck() {
		var zTree = $.fn.zTree.getZTreeObj("tree_list"),
		type = { "Y":"ps", "N":"ps"}; //체크가 부모 자식노드간의 연결이 되어있게 설정하는 옵션
	}
	function showCode(str) {
		if (!code) code = $("#code");
		code.empty();
		code.append("<li>"+str+"</li>");
	}
	function changeChk(){
		//클릭시 아이콘색깔 변화(변형 추가소스) - 기본css로 쓸 경우 필요없음
		$('.checkbox_true_full').prev().addClass('check');
		$('.chk').click('on',function(){
			setTimeout(function(){
				if($('.chk').is('.checkbox_true_full, .checkbox_true_full_focus')){
					$('.checkbox_true_full').prev().addClass('check');
					$('.checkbox_true_full_focus').prev().addClass('check');
				}
			},100);
			if($(this).is('.checkbox_true_full, .checkbox_true_full_focus')){
				setTimeout(function(){
					if($('.chk').is('.checkbox_true_part')){
						$('.checkbox_true_part').prev().removeClass('check');
					}
				},100);
				$(this).prev().removeClass('check');
				$(this).siblings('ul').find('.check').removeClass('check');
			}else if($(this).is('.checkbox_true_part, .checkbox_true_part_focus')){
				$(this).siblings('ul').find('.check').removeClass('check');
			}
		});
	}

