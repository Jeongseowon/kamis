/**** 기본 요소 js ****/

// a javascript:void(0);
$(function() {
  $(".selectbox").each(function() {
    var $this = $(this);
    var firstVal = $this.find(".option.default").text();
    if ($this.hasClass("disabled")) {
      $this.find(".selected").click(function() {
        return false;
      })
    } else {
      $this.find(".selected").text(firstVal);
      $this.find(".selected").click(function() {
        $(".selectoptions").slideUp(100);
        if (!$this.find(".selectoptions").is(":visible")) {
          $this.find(".selectoptions").slideDown(100);
          $this.addClass("on")
        } else {
          $this.find(".selectoptions").slideUp(100);
          $this.removeClass("on")
        }
        return false;
      })
      $this.find(".option").click(function() {
        val = $(this).text();
        $this.find(".selected").text(val);
        $this.find(".selectoptions").slideUp(100);
        $this.find(".selected").removeClass("on")
        $this.find(".option").removeClass("on")
        $(this).addClass("on")
        $this.removeClass("on")
        return false;
      })
    }
  });

  $("#file").on('change', function() {
    var fileName = $("#file").val();
    $(".upload-name").val(fileName);
  });
  
  $('#js-popup-bg').click(function() {
    $('.js-popup').hide();
    $(this).hide();
  });

// 메인 팝업
  $(".main_pop").draggable();
  $(".main_pop .close").click(function() {
    $(this).closest(".main_pop").hide();
    return false;
  });

// faq
  $(".ac_btn a").click(function() {
    if ($(this).parents('dl').hasClass("on")) {
      $(".faq_list dl").removeClass("on");
      $(".ac_cont").stop().slideUp(200);
    } else {
      $(".faq_list dl").removeClass("on");
      $(".ac_cont").stop().slideUp(200);
      $(this).parents('dl').addClass("on").children(".ac_cont").stop().slideDown(200);
    }
    return false;
  });

// reply
  $('.js-reReply').click(function() {
   $(this).parents('.reply_box').siblings('.re_reply').toggle();
  });  
// sms box
  $(".sms_scl").each(function() {
    $(this).mCustomScrollbar({
      callbacks: {
        onInit: function() {
          if ($(this).find(".mCSB_container").hasClass("mCS_y_hidden")) {} else {
            $(this).parent(".sms_box").addClass("scroll");
          }
        }
      }
    });
  });

// code
  $('.code_basic .code_rewrite').click(function() {
    $(this).parents('tr').find('.code_basic').hide();
    $(this).parents('tr').find('.code_correct').show();
    $('.code_correct button').click(function() {
      $(this).parents("tr").find('.code_correct').hide();
      $(this).parents("tr").find('.code_basic').show();
      return false;
    });
  });

  // search detail
  $(".search_basic.detail .btn_detail").click(function() {
    if ($(this).hasClass("on")) {
      $(".search_basic.detail .btn_detail").removeClass("on")
      $(".search_basic.detail .btn_detail").html('상세검색 열기<i class="xi-angle-down-min"></i>');
      $(".js-srchDet").stop().slideUp(200);
    } else {
      $(".search_basic.detail .btn_detail").removeClass("on")
      $(".search_basic.detail .btn_detail").html('상세검색 닫기<i class="xi-angle-down-min"></i>');
      $(".js-srchDet").stop().slideUp(200);
      $(this).addClass("on")
      $(this).siblings(".js-srchDet").stop().slideDown(200)
    }
    return false;
  });
  //message box
  $('.msg_box .btn_close').click(function() {
    $(this).parent().hide();
    return false;
  });
  // startsWith func
  String.prototype.startsWith = function(str) {
    if (this.length < str.length) return false;
    return this.indexOf(str) == 0;
  }
  // endsWith func
  String.prototype.endsWith = function(str) {
    if (this.length < str.length) return false;
    return this.lastIndexOf(str) + str.length == this.length;
  }

  // space (margin, padding, width, height, font-size)
  let mar_ = $("[class*='mar_']");
  if (mar_.length) {
    $('body').find(mar_).each(function() {
      let _this = $(this);
      let _mar = _this.attr('class').split(' ');
      for (var i = 0; i < _mar.length; i++) {
        let position = '';
        let arr = _mar[i].split('');
        let sliceArr = _mar[i].slice(5);
        let num = sliceArr.replace(/[^0-9,_]/g, '');
        let underbar = sliceArr.replace(/[^_]/g, '');
        if (_mar[i].startsWith('mar_') == true || _mar[i].startsWith('mar_') && (_mar[i].endsWith('p') || _mar[i].endsWith('rem'))) {
          if (underbar) {
            num = sliceArr.replace('_', '.');
          }
          num = num.replace(/[^0-9,.]/g, '');
          position = arr[4] === 't' ? 'margin-top' : arr[4] === 'r' ? 'margin-right' : arr[4] === 'b' ? 'margin-bottom' : arr[4] === 'l' ? 'margin-left' : '';
          let unit = _mar[i].startsWith('mar') === true && _mar[i].endsWith('p') ? '%' : _mar[i].startsWith('mar') === true && _mar[i].endsWith('rem') ? 'rem' : 'px';
          _this.css(position, num + unit);
        }
      }
    });
  }

  let pad_ = $("[class*='pad_']");
  if (pad_.length) {
    $('body').find(pad_).each(function() {
      let _this = $(this);
      let _pad = _this.attr('class').split(' ');
      for (var i = 0; i < _pad.length; i++) {
        let position = '';
        let arr = _pad[i].split('');
        let sliceArr = _pad[i].slice(5);
        let num = sliceArr.replace(/[^0-9,_]/g, '');
        let underbar = sliceArr.replace(/[^_]/g, '');
        if (_pad[i].startsWith('pad_') == true || _pad[i].startsWith('pad_') && (_pad[i].endsWith('p') || _pad[i].endsWith('rem'))) {
          if (underbar) {
            num = sliceArr.replace('_', '.');
          }
          num = num.replace(/[^0-9,.]/g, '');
          position = arr[4] === 't' ? 'padding-top' : arr[4] === 'r' ? 'padding-right' : arr[4] === 'b' ? 'padding-bottom' : arr[4] === 'l' ? 'padding-left' : '';
          let unit = _pad[i].startsWith('pad') === true && _pad[i].endsWith('p') ? '%' : _pad[i].startsWith('pad') === true && _pad[i].endsWith('rem') ? 'rem' : 'px';
          _this.css(position, num + unit);
        }
      }
    });
  }

  let w = $("[class*='w']");
  if (w.length) {
    $('body').find(w).each(function() {
      let _this = $(this);
      let _w = _this.attr('class').split(' ');
      for (var i = 0; i < _w.length; i++) {
        let num = _w[i].replace(/[^0-9,_]/g, '');
        let underbar = _w[i].replace(/[^_]/g, '');
        if (_w[i].startsWith('w') == true || _w[i].startsWith('w') && (_w[i].endsWith('p') || _w[i].endsWith('rem'))) {
          if (underbar) num = num.replace('_', '.');
          let unit = _w[i].startsWith('w') === true && _w[i].endsWith('p') ? '%' : _w[i].startsWith('w') === true && _w[i].endsWith('rem') ? 'rem' : 'px';
          _this.css('width', num + unit);
        }
      }
    });
  }

  let ht = $("[class*='ht']");
  if (ht.length) {
    $('body').find(ht).each(function() {
      let _this = $(this);
      let _ht = _this.attr('class').split(' ');
      for (var i = 0; i < _ht.length; i++) {
        let num = _ht[i].replace(/[^0-9,_]/g, '');
        let underbar = _ht[i].replace(/[^_]/g, '');
        if (_ht[i].startsWith('ht') == true || _ht[i].startsWith('ht') && (_ht[i].endsWith('p') || _ht[i].endsWith('rem'))) {
          if (underbar) num = num.replace('_', '.');
          let unit = _ht[i].startsWith('ht') === true && _ht[i].endsWith('p') ? '%' : _ht[i].startsWith('ht') === true && _ht[i].endsWith('rem') ? 'rem' : 'px';
          _this.css('height', num + unit);
        }
      }
    });
  }

  let fs = $("[class*='fs']");
  if (fs.length) {
    $('body').find(fs).each(function() {
      let _this = $(this);
      let _fs = _this.attr('class').split(' ');
      for (var i = 0; i < _fs.length; i++) {
        let num = _fs[i].replace(/[^0-9,_]/g, '');
        let underbar = _fs[i].replace(/[^_]/g, '');
        if (_fs[i].startsWith('fs') == true || _fs[i].startsWith('fs') && (_fs[i].endsWith('p') || _fs[i].endsWith('rem'))) {
          if (underbar) num = num.replace('_', '.');
          let unit = _fs[i].startsWith('fs') === true && _fs[i].endsWith('p') ? '%' : _fs[i].startsWith('fs') === true && _fs[i].endsWith('rem') ? 'rem' : 'px';
          _this.css('font-size', num + unit);
        }
      }
    });
  }
});
/** popup **/
// popup
function view_show(popName) {
  let left = ($(window).width() - $("#display_view" + popName).width()) / 2;
  let top = ($(window).height() - $("#display_view" + popName).height()) / 2;
  $("#js-popup-bg").show();
  $("#display_view" + popName).css({
    'position': 'fixed',
    'left': left,
    'top': top,
    'z-index': 5500
  }).show();
  return false;
}


