(function ($) {
    "use strict";
    var confer_window = $(window);
    confer_window.on("load", function () {
        $("#preloader").fadeOut("1000", function () {
            $(this).remove();
        });
    });
    if ($.fn.classyNav) {
        $("#conferNav").classyNav();
    }
    if ($.fn.owlCarousel) {
        var welcomeSlider = $(".welcome-slides");
        welcomeSlider.owlCarousel({ items: 1, loop: true, autoplay: false, smartSpeed: 1000, autoplayTimeout: 10000, nav: true, navText: ['<i class="zmdi zmdi-chevron-left"></i>', '<i class="zmdi zmdi-chevron-right"></i>'] });
        welcomeSlider.on("translate.owl.carousel", function () {
            var layer = $("[data-animation]");
            layer.each(function () {
                var anim_name = $(this).data("animation");
                $(this)
                    .removeClass("animated " + anim_name)
                    .css("opacity", "0");
            });
        });
        $("[data-delay]").each(function () {
            var anim_del = $(this).data("delay");
            $(this).css("animation-delay", anim_del);
        });
        $("[data-duration]").each(function () {
            var anim_dur = $(this).data("duration");
            $(this).css("animation-duration", anim_dur);
        });
        welcomeSlider.on("translated.owl.carousel", function () {
            var layer = welcomeSlider.find(".owl-item.active").find("[data-animation]");
            layer.each(function () {
                var anim_name = $(this).data("animation");
                $(this)
                    .addClass("animated " + anim_name)
                    .css("opacity", "1");
            });
        });
    }
    $("#scrollDown").on("click", function () {
        $("html, body").animate({ scrollTop: $("#about").offset().top - 75 }, 800);
    });
    if ($.fn.owlCarousel) {
        var clientArea = $(".client-area");
        clientArea.owlCarousel({
            items: 2,
            loop: true,
            autoplay: true,
            smartSpeed: 1000,
            margin: 40,
            autoplayTimeout: 7000,
            nav: true,
            navText: ['<i class="zmdi zmdi-chevron-left"></i>', '<i class="zmdi zmdi-chevron-right"></i>'],
            responsive: { 0: { items: 1 }, 576: { items: 2, margin: 15 }, 992: { margin: 20 }, 1200: { margin: 40 } },
        });
    }
    if ($.fn.imagesLoaded) {
        $(".confer-portfolio").imagesLoaded(function () {
            $(".portfolio-menu").on("click", "button", function () {
                var filterValue = $(this).attr("data-filter");
                $grid.isotope({ filter: filterValue });
            });
            var $grid = $(".confer-portfolio").isotope({ itemSelector: ".single_gallery_item", percentPosition: true, masonry: { columnWidth: ".single_gallery_item" } });
        });
    }
    if ($.fn.counterUp) {
        $(".counter").counterUp({ delay: 10, time: 2000 });
    }
    $(".portfolio-menu button.btn").on("click", function () {
        $(".portfolio-menu button.btn").removeClass("active");
        $(this).addClass("active");
    });
    $(".search-btn").on("click", function () {
        $(".search-form").toggleClass("search-form-active");
    });
    confer_window.on("scroll", function () {
        if (confer_window.scrollTop() > 0) {
            $(".header-area").addClass("sticky");
        } else {
            $(".header-area").removeClass("sticky");
        }
    });
    if ($.fn.magnificPopup) {
        $(".video-play-btn").magnificPopup({ type: "iframe" });
        $(".portfolio-img").magnificPopup({ type: "image", gallery: { enabled: true, preload: [0, 2], navigateByImgClick: true, tPrev: "Previous", tNext: "Next" } });
        $(".single-gallery-item").magnificPopup({ type: "image", gallery: { enabled: true, preload: [0, 2], navigateByImgClick: true, tPrev: "Previous", tNext: "Next" } });
    }
    if ($.fn.tooltip) {
        $('[data-toggle="tooltip"]').tooltip();
    }
    if (confer_window.width() > 767) {
        new WOW().init();
    }
    if ($.fn.jarallax) {
        $(".jarallax").jarallax({ speed: 0.5 });
    }
    if ($.fn.countdown) {
        $("#clock").countdown("2021/05/13", function (event) {
            $(this).html(event.strftime("<div>%m <span>Months</span></div> <div>%d <span>Days</span></div> <div>%H <span>Hours</span></div> <div>%M <span>Minutes</span></div> <div>%S <span>Seconds</span></div>"));
        });
    }
    if ($.fn.scrollUp) {
        confer_window.scrollUp({ scrollSpeed: 1000, scrollText: '<i class="zmdi zmdi-chevron-up"></i>' });
    }
    $('a[href="#"]').on("click", function ($) {
        $.preventDefault();
    });
    /*
    var pricingTable = $(".single-ticket-pricing-table");
    pricingTable.on("mouseenter", function () {
        pricingTable.removeClass("active");
        $(this).addClass("active");
    });
    */
    $(".gotoIngressos").on("click", function () {
        $("html, body").animate({ scrollTop: $("#ingressos").offset().top - 75 }, 800);
    });
})(jQuery);
