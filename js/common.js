$(function () {
    $('#resources').on('change', function() {
        var selectedValue = $(this).val();
        if (selectedValue) {
            $('.layer').slideUp(); // 모든 레이어 숨기기
            $('#rs0' + selectedValue).slideDown(); // 선택된 값에 해당하는 레이어만 표시
        } else {
            $('.layer').slideUp(); // 선택된 값이 없으면 모든 레이어 숨기기
        }
    });

    var wp = $("#wrapper");
    var hd = $("#header");
    var g = hd.find("#gnb");

    $(window).scroll(function () {
        if ($(document).scrollTop() > 0) {
            wp.addClass("scroll");
        } else {
            wp.removeClass("scroll");
        }
    });
    g.on("mouseenter,focusin", function () {
        hd.addClass("open");
    });
    g.on("mouseleave,focusout", function () {
        hd.removeClass("open");
    });

    $(".dp01.active > li").eq(0).addClass("on");
    $(".dp01 > li > a").each(function () {
        if ($(this).siblings("ul.dp02").length > 0) {
            $(this).parent().addClass("off");
        }
    });

    $(".dp01 > li > a")
        .off()
        .on("click", function (e) {
            e.preventDefault();
            var $this = $(this);
            var $dp02 = $this.closest("li").find(".dp02");
            if ($dp02.length >= 1) {
                e.preventDefault();
                if ($this.parent("li").hasClass("on")) {
                    $dp02.slideUp(300);
                    $this.parent("li").removeClass("on");
                } else {
                    $(".dp01 > li").removeClass("on");
                    $(".dp02").slideUp(300).removeClass("on");

                    $dp02.slideDown(300);
                    $this.parent("li").addClass("on");
                }
            }
        });

    $("#FoldOpen").on("click", function (e) {
        if (!$(this).hasClass("on")) {
            e.preventDefault();
            $(this).addClass("on");
            $("aside").animate({ left: "-3.4rem" }, 100, "swing");
            $("#container").addClass("flow");
        } else {
            $(this).removeClass("on");
            $("aside").animate({ left: 0 }, 100, "swing");
            $("#container").removeClass("flow");
        }
    });

    $(".siteMap").click(function (e) {
        e.stopPropagation();
        $("#siteMap").animate({ right: "0px" }, 300, "swing").after('<div class="maskBg"></div>');
    });
    $("#siteMap")
        .find(".close")
        .click(function () {
            $("#siteMap").animate({ right: "-100%" }, 300, "swing");
            $(".maskBg").remove();
        });

    $(".bookMark").click(function (e) {
        $(this).toggleClass("on");
    });

    const Swiper01 = new Swiper(".btnSlider", {
        slidesPerView: "auto",
        grabCursor: true,
        /*loop: true,*/
        preventLinksPropagation: true,
        preventClicks: true,
        preventClicksPropagation: false,
        observer: true,
        observeParents: true,
        watchSlidesProgress: true,
        navigation: {
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
        },
        lazy: {
            loadPrevNext: true,
        },
        on: {
            click: function (swiper, event) {
                // Get the clicked slide
                const clickedSlide = event.target.closest(".swiper-slide");
                if (clickedSlide) {
                    swiper.slides.forEach((slide) => {
                        slide.classList.remove("active");
                    });
                    clickedSlide.classList.add("active");
                }
            },
        },
    });
});
