var windowWidth = (window.innerWidth ); // вся ширина окна
var documentWidth = (document.documentElement.clientWidth ); // ширина минус прокрутка
var documentHeight = (document.documentElement.clientHeight ); // ширина минус прокрутка



$(window).on("load", function () {
    // $('.slider').fadeIn(3000);
});

$(function () {
    var hamburger = "<div class='c-hamburger'><span></span><span></span><span></span></div>";

    $('#fp-nav').prepend(hamburger);

    var elem = $('.main'),
        pos = elem.offset(),
        elem_left = pos.left,
        elem_top = pos.top,
        elem_width = elem.width(),
        elem_height = elem.height(),
        x_center,
        y_center;


    $('.main').mousemove(function(e){

        x_center = ( elem_width / 2 ) - ( e.pageX - elem_left );
        y_center = ( elem_height / 2 ) - ( e.pageY - elem_top );

        $('.parallax').each(function(){

            var speed = $(this).attr('data-speed'),
                xPos = Math.round(-1*x_center/20*speed),
                yPos = Math.round(y_center/20*speed);

            if (yPos < 0)
                yPos = -2*speed;

            $(this).css('transform', 'translate3d('+xPos+'px, '+yPos+'px, 0px)');

        });

    });



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


