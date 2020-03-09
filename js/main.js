var windowWidth = (window.innerWidth ); // вся ширина окна
var documentWidth = (document.documentElement.clientWidth ); // ширина минус прокрутка
var documentHeight = (document.documentElement.clientHeight ); // ширина минус прокрутка


$(window).on("load", function () {
    // $('.slider').fadeIn(3000);
});

$(function () {

    var main = $('.main');


    // main.onepage_scroll({
    //     sectionContainer: "section",     // sectionContainer accepts any kind of selector in case you don't want to use section
    //     easing: "ease-in-out",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
    //                                      // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
    //     animationTime: 500,             // AnimationTime let you define how long each section takes to animate
    //     pagination: true,                // You can either show or hide the pagination. Toggle true for show, false for hide.
    //     updateURL: false,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
    //     beforeMove: function(index) {},  // This option accepts a callback function. The function will be called before the page moves.
    //     afterMove: function(index) {},   // This option accepts a callback function. The function will be called after the page moves.
    //     loop: false,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
    //     keyboard: true,                  // You can activate the keyboard controls
    //     responsiveFallback: false,        // You can fallback to normal page scroll by defining the width of the browser in which
    //     // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
    //     // the browser's width is less than 600, the fallback will kick in.
    //     direction: "vertical"            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".
    // });
    //
    // $('.main-page__scroll').on('click', function(){
    //     main.moveDown();
    // });




    // var changeWindow = function(){
    //     $('.section').css({
    //         'height': documentHeight
    //     });
    // };
    // changeWindow();
    //
    //
    // $(window).resize(function(){
    //     changeWindow();
    // });


    //кнопка вверх
    function backToTop (btnElem, parentElem){
        var offset = 300,
            offset_opacity = 1200,
            scroll_top_duration = 700,
            $back_to_top = $(btnElem);
        // кнопка назад
        $(window).scroll(function(){
            ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
            if( $(this).scrollTop() > offset_opacity ) {
                $back_to_top.addClass('cd-fade-out');
            }
        });

        $back_to_top.on('click', function(event){
            event.preventDefault();
            $(parentElem).animate({
                    scrollTop: 0
                }, scroll_top_duration
            );
        });
    }

    backToTop('.footer-bottom__scrollup', 'body,html');

    /*------------------------------*/
    /*------------------------------*/
    /*------------------------------*/

    var $html = $('html');
    var $header = $('.header-layout');
    /*функция показа модального окна*/
    function showPopup(icon, popup) {
        $(document).on('click', icon, function (e) {

            e.preventDefault();
            $(popup).addClass('is-visible');
            $('.mfp-bg').addClass('is-visible');


            $html.addClass('blocked');
            // $('body').addClass('blocked');

            var widthScroll = windowWidth - documentWidth;
            console.log('widthScroll: ' + widthScroll);
            if(windowWidth > documentWidth){
                $html.css({
                    'margin-right': widthScroll
                });
                $header.css({
                    'padding-right': widthScroll
                });
                // $('.mfp-wrap').css({
                //     'overflow-y':'scroll'
                // });
                // console.log('Есть полоса прокрутки');
            }else {
                // console.log('Нет полосы прокрутки');
            }
        });
    }

    $(document).on('click', '.js-popup-close', function (e) {
        e.preventDefault();
        $(this).parents('.mfp-wrap').removeClass('is-visible');
        $('.mfp-bg').removeClass('is-visible');
        $html.css({
            'margin-right':'0'
        }).removeClass('blocked');

        $header.css({
            'padding-right': '0'
        });

        var parentModal = $(this).parents('.mfp-wrap');
        if(parentModal.data('save')){
            onPopupClose(parentModal);
        }
    });

    showPopup("#profile", '.popup-auth');
    showPopup("#registration", '.popup-reg');

    $('.mfp-content-bg').on('click', function(e){
        e.preventDefault();
        $(this).parents('.mfp-wrap').removeClass('is-visible');
        $('.mfp-bg').removeClass('is-visible');
        $html.css({
            'margin-right':'0'
        }).removeClass('blocked');
        $('.wrapper').removeClass('fixed-input');
        $('.header.sticky').css({
            // 'right':'0'
        });
        // console.log('hide popup');

        $header.css({
            'padding-right': '0'
        });

        var parentModal = $(this).parents('.mfp-wrap');
        if(parentModal.data('save')){
            onPopupClose(parentModal);
        }
    });

    $(".popup-bg").click(function (e) {
        e.preventDefault();
        $('.popup').parents().removeClass('is-visible');
        // $('.fixed-overlay').removeClass('is-visible');
        $('html').removeClass('body-popup');
    });

});