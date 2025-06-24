// tab
$(function () {
	if($('.tmenu').length || $('.tcont').length) {
		$('.tcont').hide();
		$('.tcont.on').show();
		$('.tmenu li').click(function () {
			let tabId = $(this).attr('id');
			let selTabId = $('.tmenu li[id="' + tabId + '"], .tcont[data-tab="' + tabId + '"]');
			$(this).closest('.tab').find('.tmenu li, .tcont').not('.tmenu li.on').removeClass('on');
			selTabId.addClass('on').fadeIn();
			selTabId.siblings('.tcont').hide();
			selTabId.siblings().removeClass('on');
		});
	}
	// guide 코드미러 열고닫기
	$(".code_close").click(function () {
		var code = $(this).siblings().children('.t_code');
		
		if ($(this).hasClass('on')) {
					$(this).removeClass('on');
			code.height(0);
		} else{
				$(this).addClass('on');
				code.height('auto');
		}
	});
});