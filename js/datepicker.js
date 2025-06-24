
$(function () {
    fncDate("searchStartDate", "searchEndDate");
    fncTimeDate("searchStartTime", "searchEndTime");
    fncMonth("monthpicker");
});
/*** * datepicker * ***/
var fncDate = function () {
  var nowUrl = $(location).attr("href"); // 현재 URL 가져오기
  var setDate = arguments;
  var getId;
  var fmt = "yy-mm-dd";

  switch (setDate.length) {
      case 1:
          getId = "#" + setDate[0];
          break;
      case 2:
          if (setDate[1] != "") {
              getId = "#" + setDate[0] + ", #" + setDate[1];
              break;
          } else {
              getId = "#" + setDate[0];
              break;
          }
      case 3:
          if (setDate[1] != "") {
              getId = "#" + setDate[0] + ", #" + setDate[1];
              fmt = setDate[2];
              break;
          } else {
              getId = "#" + setDate[0];
              fmt = setDate[2];
              break;
          }
  }

  var gubun = "";
  var arg = getId.split(",");
  var dates = $(getId).datepicker({
      changeMonth: true,
      changeYear: true,
      showOn: "button",
      buttonImage: "images/icon/calendar.svg",
      buttonImageOnly: true,
      dateFormat: fmt,
      onSelect: function (selectedDate) {
          var selDate = new Date(selectedDate);
          var selYear = selDate.getFullYear();
          var selMonth = ("0" + (selDate.getMonth() + 1)).slice(-2);
          var option = this.id == setDate[0] ? "minDate" : "maxDate",
              instance = $(this).data("datepicker"),
              date = fmt == "yy-mm" ? new Date(instance.selectedYear, instance.selectedMonth, 1) : $.datepicker.parseDate($.datepicker._defaults.dateFormat, selectedDate, instance.settings);

          $(this).trigger("change");

          if (setDate[0].indexOf("schEtc") > -1 || setDate[0].indexOf("searchStartDate") > -1) {
              gubun = $("#schEtc09").val();
          } else {
              gubun = $(arg[0].slice(0, -1) + 9).val(); // ex) 시작일자 ID가 certDescFrmSchEtc06 일 때 certDescFrmSchEtc09 로 변경
          }

          if (nullCheck(gubun) || gubun == 6) {
              // gubun이 null이거나 기간선택일 때 => 시작일 이전 날짜, 종료일 이후 날짜 비활성화
              dates.not(this).datepicker("option", option, date);
          } else {
              dates.datepicker("option", "minDate", null);
              dates.datepicker("option", "maxDate", null);
          }

          if (gubun == 1) {
              // 일
              $(arg[0]).val(selectedDate);
              $(arg[1]).val(selectedDate);
          } else if (gubun == 2) {
              // 주
              var dayOfWeek = selDate.getDay();
              var stDate = new Date(selectedDate);
              var endDate = new Date(selectedDate);
              stDate.setDate(selDate.getDate() - dayOfWeek);
              endDate.setDate(selDate.getDate() + (6 - dayOfWeek));
              $(arg[0]).val(stDate.getFullYear() + "-" + ("0" + (stDate.getMonth() + 1)).slice(-2) + "-" + ("0" + stDate.getDate()).slice(-2));
              $(arg[1]).val(endDate.getFullYear() + "-" + ("0" + (endDate.getMonth() + 1)).slice(-2) + "-" + ("0" + endDate.getDate()).slice(-2));
          } else if (gubun == 3) {
              // 월
              var monthDate = new Date(selYear, selMonth, 0);
              var lastDay = monthDate.getDate();
              $(arg[0]).val(selYear + "-" + selMonth + "-" + "01");
              $(arg[1]).val(selYear + "-" + selMonth + "-" + lastDay);
          } else if (gubun == 4) {
              // 분기
              var lastDayOfQuarter = getLastDayOfQuarter(selYear, selMonth);
              $(arg[0]).val(lastDayOfQuarter.year + "-" + lastDayOfQuarter.strtMonth + "-" + "01");
              $(arg[1]).val(lastDayOfQuarter.year + "-" + lastDayOfQuarter.endMonth + "-" + lastDayOfQuarter.day);
          } else if (gubun == 5) {
              // 년
              $(arg[0]).val(selYear + "-" + "01" + "-" + "01");
              $(arg[1]).val(selYear + "-" + "12" + "-" + "31");
          }
      },
  });

  if (nowUrl.indexOf("Form.do") < 0) {
      // Form.do 포함일 때만 실행
      fncInputDate(arg[0], arg[1]);
  }
};

/*** * datepicker + month * ***/
var fncMonth = function () {
  var setDate = arguments;
  var getId;
  var fmt = "yy-mm";
  switch (setDate.length) {
      case 1:
          getId = "#" + setDate[0];
          break;
      case 2:
          if (setDate[1] != "") {
              getId = "#" + setDate[0] + ", #" + setDate[1];
              break;
          } else {
              getId = "#" + setDate[0];
              break;
          }
      case 3:
          if (setDate[1] != "") {
              getId = "#" + setDate[0] + ", #" + setDate[1];
              fmt = setDate[2];
              break;
          } else {
              getId = "#" + setDate[0];
              fmt = setDate[2];
              break;
          }
  }

  $(getId).monthpicker({
      monthNamesShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
      changeMonth: true,
      changeYear: true,
      showOn: "button",
      //buttonImage: "images/icon/calendar.svg",
      //buttonImageOnly: true,
      dateFormat: fmt,
  });
};
/*** * datepicker + time * ***/
var fncTimeDate = function (id) {
  var setDate = arguments;
  var getId = "#" + id;
  var dataType = $(getId).data("type");
  var timeFormat;
  switch (setDate.length) {
      case 1:
          getId = "#" + setDate[0];
          break;
      case 2:
          if (setDate[1] != "") {
              getId = "#" + setDate[0] + ", #" + setDate[1];
              break;
          } else {
              getId = "#" + setDate[0];
              break;
          }
      case 3:
          if (setDate[1] != "") {
              getId = "#" + setDate[0] + ", #" + setDate[1];
              fmt = setDate[2];
              break;
          } else {
              getId = "#" + setDate[0];
              fmt = setDate[2];
              break;
          }
  }
  switch (dataType) {
      case "hh":
          timeFormat = "hh:00";
          $(getId).attr("placeholder", "yyyy-mm-dd hh:mm");
          break;
      case "hhmm":
          timeFormat = "hh:mm";
          $(getId).attr("placeholder", "yyyy-mm-dd hh:mm");
          break;
      case "hhmmss":
          timeFormat = "hh:mm:ss";
          $(getId).attr("placeholder", "yyyy-mm-dd hh:mm:ss");
          break;
      default:
          timeFormat = "hh:mm:ss"; // 기본값
          $(getId).attr("placeholder", "yyyy-mm-dd hh:mm:ss");
  }
  var fmt1 = "yy-mm-dd";

  var dates = $(getId).datetimepicker({
      changeMonth: true,
      changeYear: true,
      showOn: "button",
      buttonImage: "images/icon/calendar.svg",
      buttonImageOnly: true,
      onSelect: function (selectedDate) {
          var option = this.id == setDate[0] ? "minDate" : "maxDate",
              instance = $(this).data("datepicker"),
              date = fmt1 == "yy-mm" ? new Date(instance.selectedYear, instance.selectedMonth, 1) : $.datepicker.parseDate($.datepicker._defaults.dateFormat, selectedDate, instance.settings);
          dates.not(this).datepicker("option", option, date);
          $(this).trigger("change");
      },
      dateFormat: fmt1,
      timeFormat: timeFormat,
      controlType: "select", // 시간 선택을 select로 설정
      oneLine: true, // 한 줄에 날짜와 시간을 표시
      timeOnlyTitle: "Choose Time", // 시간 선택 창의 제목
      timeText: "시간선택", // 시간 라벨
      hourText: "시", // 시 라벨
      minuteText: "분", // 분 라벨
      secondText: "초", // 초 라벨
      currentText: "현재시간", // 현재 시간으로 설정 버튼
      closeText: "확인", // 닫기 버튼
      showTimepicker: true,
  });
};

// 날짜 직접 입력(자동 하이픈 추가)
function fncInputDate(stDate, endDate) {
  $(stDate + "," + endDate)
      .attr("readonly", false)
      .attr("maxlength", 10);

  $(stDate + "," + endDate).on({
      input: function (event) {
          var val = this.value.replace(/-/g, "");
          var nowCursor = this.selectionStart; // 현재 커서 위치
          var inputType = event.originalEvent.inputType;
          var result = "";

          if (val.length >= 8) {
              result = val.substring(0, 4) + "-" + val.substring(4, 6) + "-" + val.substring(6, 8);
          } else {
              result = val;
          }
          this.value = result;

          var cursorDiff = 0;

          if (nowCursor > 4 && nowCursor <= 6) {
              cursorDiff = 1;
          } else if (nowCursor > 6) {
              cursorDiff = 2;
          }

          if (inputType == "deleteContentBackward" || inputType == "deleteContentForward") {
              cursorDiff = 0;
          }
          this.setSelectionRange(nowCursor + cursorDiff, nowCursor + cursorDiff);
      },
      focus: function () {
          var val = this.value.replace(/-/g, "");
          this.value = val;
      },
      blur: function () {
          var val = this.value.replace(/-/g, "");
          var result = "";
          if (val.length == 8) {
              result = val.substring(0, 4) + "-" + val.substring(4, 6) + "-" + val.substring(6, 8);
          } else {
              result = val;
          }
          this.value = result;
          //fncValiDate(stDate,endDate);
      },
  });
}