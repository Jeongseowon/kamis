function includehtml() {
    let allElements = document.querySelectorAll(".includeJs");
    Array.prototype.forEach.call(allElements, function (el) {
        let includeHtml = el.dataset.includeHtml;
        if (includeHtml) {
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    //console.log('success', includeHtml);
                    el.outerHTML = this.responseText;
                }
            };
            xhttp.open("GET", includeHtml, false);
            xhttp.send();
        }
    });
}
includehtml();

$(function () {
    $("a").each(function () {
        // link
        if (!$(this).attr("href")) {
            $(this).attr("href", "javascript:void(0);");
        }
    });

    $(".btnTop").click(function () {
        $("html,body").animate({ scrollTop: 0 }, "500");
    });

    winSizeSet();

    accordion.init();
    tooltip.init();
    waiAriaTab();
});

/* ** 윈도우 사이즈 체크 (반응형) ** */
let winSize;
function winSizeSet() {
    const brekpoint = 1024;
    if (window.innerWidth >= brekpoint) {
        winSize = "pc";
        $("#container").removeClass("flow");
        $("aside").css("left", "0");
        $("#FoldOpen").removeClass("on");
    } else {
        winSize = "mob";
        $("#container").addClass("flow");
        $("aside").css("left", "-3.4rem");
        $("#FoldOpen").addClass("on");
    }
}
$(window).resize(function () {
    winSizeSet();
});

/*** * accordion * ***/
const $accordionBtn = document.querySelectorAll(".accordBtn");
const accordion = {
    init: () => {
        accordion.expand();
    },
    expand: () => {
        $accordionBtn.forEach((e) => {
            const $wrapper = e.closest(".accordion");
            const $wrapAll = $wrapper.querySelectorAll(".accordItem");
            const $wrap = e.closest(".accordItem");

            e.addEventListener("click", () => {
                if (!$wrap.classList.contains("active")) {
                    $wrapAll.forEach((ele) => {
                        ele.classList.remove("active");
                        ele.querySelector(".accordBtn").classList.remove("active");
                    });

                    $wrap.classList.add("active");
                    e.classList.add("active");
                } else {
                    $wrap.classList.remove("active");
                    e.classList.remove("active");
                }
            });
        });
    },
};

/*** * modal * ***/
const modals = document.querySelectorAll(".mdOpen");
const body = document.querySelector("body");

modals.forEach((modal) => {
    modal.addEventListener("click", (event) => {
        const targetId = modal.getAttribute("data-target");
        const targetModal = document.getElementById(targetId);
        const dialog = targetModal.querySelector(".mdContent");

        modal.classList.add("opened");
        modal.setAttribute("tabindex", "-1");
        targetModal.classList.add("shown", "in");
        body.classList.add("scrollNo");
        targetModal.setAttribute("aria-hidden", "false");

        setTimeout(() => dialog.focus(), 350);
        setTimeout(() => targetModal.classList.add("in"), 150);
    });
});

const closeTriggers = document.querySelectorAll(".mdClose");
closeTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
        const id = trigger.closest(".modal").getAttribute("id");
        const targetModal = document.getElementById(id);
        modalClose(targetModal);
    });

    trigger.addEventListener("keydown", (event) => {
        if (trigger.classList.contains("close")) {
            const keyCode = event.keyCode || event.which;
            if (!event.shiftKey && keyCode === 9) {
                trigger.closest(".mdContent").focus();
                event.preventDefault();
            }
        }
    });
});

function modalClose(modal) {
    const dialog = modal.querySelector(".mdContent");
    const openedModals = document.querySelectorAll(".modal.in:not(.sample)");
    const openedLen = openedModals.length;

    if (openedLen < 2) {
        body.classList.remove("scrollNo");
    }

    modal.setAttribute("aria-hidden", "true");
    modal.classList.remove("in", "shown");
    dialog.removeAttribute("tabindex");

    const triggerBtn = document.querySelector(".opened");
    if (triggerBtn) {
        triggerBtn.focus();
        triggerBtn.setAttribute("tabindex", "0");
        triggerBtn.classList.remove("opened");
    }
}

/*** * tooltip * ***/
const tooltip = {
    init: () => {
        tooltip.tooltipEvent();
    },
    tooltipEvent: () => {
        const _toolBtns = document.querySelectorAll(".toolTip .toolBtn");

        _toolBtns.forEach(($toolBtn) => {
            const _span = document.createElement("span");
            const _txt = document.createTextNode("열기");

            _span.classList.add("sr-only");
            _span.appendChild(_txt);

            $toolBtn.innerHTML = "";
            $toolBtn.appendChild(_span);

            $toolBtn.addEventListener("click", ($el) => {
                const $parent = $toolBtn.closest(".toolTip");
                const $closeBtn = $parent.querySelector(".toolCl");
                const $cnt = $parent.querySelector(".toolIn");
                const $srTxt = $el.target.querySelector(".sr-only");
                if ($cnt.style.display !== "block") {
                    $cnt.style.display = "block";
                    //$cnt.style.opacity = "1";
                    $cnt.setAttribute("tabindex", 0);
                    $srTxt.textContent = "닫기";
                    tooltip.tooltipResize($parent, $cnt);
                }
                $closeBtn.addEventListener("click", () => {
                    $srTxt.textContent = "열기";
                    $cnt.style.display = "";
                    //$cnt.style.opacity = "";
                    $cnt.removeAttribute("tabindex");
                    $toolBtn.focus();
                    tooltip.tooltipResize($parent, $cnt);
                });

                window.addEventListener("resize", () => {
                    tooltip.tooltipResize($parent, $cnt);
                });
            });
        });
    },
    tooltipResize: ($parent, $cnt) => {
        if (winSize === "mob") {
            tooltip.tooltipMob($parent, $cnt);
        } else {
            tooltip.tooltipPc($cnt);
        }
        window.addEventListener("resize", () => {
            if (winSize === "mob") {
                tooltip.tooltipMob($cnt);
            } else {
                tooltip.tooltipPc($cnt);
            }
        });
    },
    tooltipMob: ($parent, $cnt) => {
        const _offsetL = $parent.offsetLeft - 16;
        const _width = document.body.clientWidth;
        const _offsetR = _width - ($parent.clientWidth + _offsetL) - 32;
        if ($cnt) {
            $cnt.style.left = `-${_offsetL}px`;
            $cnt.style.right = `-${_offsetR}px`;
        }
    },
    tooltipPc: ($cnt) => {
        $cnt.style.left = "";
        $cnt.style.right = "";
    },
};
/*** * wai-aria tab ui (+custom) * ***/
var waiAriaTab = function () {
    const tabs = document.querySelectorAll('[role="tab"]');
    const tabLists = document.querySelectorAll('[role="tablist"]');
    tabs.forEach((tab) => {
        if (tab.getAttribute("aria-selected") == "true") {
            document.querySelector(`[aria-controls="${tab.getAttribute("aria-controls")}"]`).classList.add("on");
            document.querySelector(`#${tab.getAttribute("aria-controls")}`).classList.add("on");
        } else {
            document.querySelector(`#${tab.getAttribute("aria-controls")}`).style.display = "none";
        }

        if (tab.getAttribute("aria-selected") == "true") {
            tab.tabIndex = 0;
        } else {
            tab.tabIndex = -1;
        }
        tab.addEventListener("click", (e) => {
            const parent = tab.parentNode.tagName === "LI" ? tab.parentNode.parentNode : tab.parentNode;
            const panelWrap = document.querySelector(`#${tab.getAttribute("aria-controls")}`).parentNode;
            parent.querySelectorAll('[aria-selected="true"]').forEach((t) => {
                t.setAttribute("aria-selected", false);
                t.classList.remove("on");
                t.tabIndex = -1;
            });
            tab.setAttribute("aria-selected", true);
            tab.classList.add("on");
            tab.tabIndex = 0;
            panelWrap.querySelectorAll(':scope > [role="tabpanel"]').forEach((p) => (p.style.display = "none"));
            panelWrap.querySelectorAll(':scope > [role="tabpanel"]').forEach((p) => p.classList.remove("on"));
            panelWrap.querySelector(`#${tab.getAttribute("aria-controls")}`).style.display = "revert";
            panelWrap.querySelector(`#${tab.getAttribute("aria-controls")}`).classList.add("on");
            e.preventDefault();
        });
    });
    tabLists.forEach((tabList) => {
        tabList.addEventListener("keydown", (e) => {
            const parent = tabList.parentNode.tagName === "LI" ? tabList.parentNode.parentNode : tabList.parentNode;
            const innerTabs = parent.querySelectorAll('[role="tab"]');
            let tabFocus = 0;
            for (let i = 0; i < innerTabs.length; i++) {
                if (innerTabs[i].getAttribute("aria-selected") == "true") {
                    tabFocus = i;
                }
            }
            if (e.keyCode === 39 || e.keyCode === 37 || e.keyCode === 36 || e.keyCode === 35) {
                innerTabs[tabFocus].tabIndex = -1;
                if (e.keyCode === 39) {
                    // right
                    tabFocus++;
                    if (tabFocus >= innerTabs.length) {
                        tabFocus = 0;
                    }
                } else if (e.keyCode === 37) {
                    // left
                    tabFocus--;
                    if (tabFocus < 0) {
                        tabFocus = innerTabs.length - 1;
                    }
                } else if (e.keyCode === 36) {
                    // home
                    tabFocus = 0;
                } else if (e.keyCode === 35) {
                    // end
                    tabFocus = innerTabs.length - 1;
                }
                innerTabs[tabFocus].tabIndex = 0;
                innerTabs[tabFocus].click();
                innerTabs[tabFocus].focus();
                e.preventDefault();
            }
        });
    });
};

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

    // select custom
    const selectButton = $(".selectButton");
    const optionsList = $(".selectOptions");

    selectButton.on("click", function () {
        optionsList.toggleClass("show");
    });

    optionsList.on("click", "li", function () {
        const selectedValue = $(this).data("value");
        selectButton.text($(this).text());
        optionsList.removeClass("show");
        console.log("Selected Value:", selectedValue);
    });

    $(document).on("click", function (e) {
        if (!$(e.target).closest(".customSelect").length) {
            optionsList.removeClass("show");
        }
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

