// INIT SVG FOR EVERYBODY POLYFILL
svg4everybody();

// INIT FASTCLICK LIBRARY FOR TOUCH DEVICES
$(function() {
    FastClick.attach(document.body);
});


// IMPORT CSS BREAKPOINTS
var breakpoint = {};
breakpoint.refreshValue = function () {
    this.value = window.getComputedStyle(
        document.querySelector('body'), ':before'
    ).getPropertyValue('content').replace(/['"]+/g, '');
};
$(window).resize(function () {
    breakpoint.refreshValue();
}).resize();


// WHEN TO FIRE RESIZE FUNCTIONS
var w = 0;
var h = 0;
$(document).ready( function(){
    w = $(window).width();
    h = $(window).height();
    breakpoint.refreshValue();
    onResize();
    onResizeX();
    onResizeY();
});
$(window).resize(function(){
    if( w != $( window ).width() ){
        onResize();
        onResizeX();
        w = $( window ).width();
    }
    if( (h + 100) < $( window ).height() || (h - 100) > $( window ).height() ){
        onResize();
        onResizeY();
        h = $( window ).height();
    }
});


// ON READY & RESIZE
function onResize() {
    var winWidth = $(window).width();
    var winHeight = $(window).height();

    $('.directory, .split-page__half, .fullscreen-bg').css({
        'height': winHeight
    });

    $('.menu-left, .menu-right').css({
        'width': winHeight
    });

    $('.gallery__slides').css({
        'height': winHeight - 160
    });
}


// ON READY AND RESIZE ON X AXIS
function onResizeX(){

    // Simulate bg size cover
    if( $('.cover').length ){
        simulateCoverImg();
    }
}


// ON READY AND RESIZE ON Y AXIS
function onResizeY(){

}


// ON READY
$(document).ready(function(){

    // INIT PRELOADER
    preloader();

    // MENU BEHAVIOR
    $('#menu-expander, a[href="#open-menu"]').click(function(e){
        e.preventDefault();
        $('#menu-expander .hamburger').toggleClass('active');
        $('.fullscreen-menu').toggleClass('active');
        $('.menu').toggleClass('nav-is-active');
    });

    // POPUP WINDOWS
    $('.open-popup').click(function(e){
        e.preventDefault();
        var popup = $(this).attr('href');
        $(popup).toggleClass('active');
        $('.menu').toggleClass('force-black');
    });

    $('.popup-window__close').click(function(e){
        e.preventDefault();
        $(this).parent('.popup-window').toggleClass('active');
        $('.menu').toggleClass('force-black');
    });

    // DIRECTORY
    $('.directory__nav a').mouseenter(function(){
        var activeItem = $(this).data('bg');
        var target = $('.directory__bg #' + activeItem);

        $('.directory__bg div').not(target).removeClass('active');
        target.addClass('active');
    });
    $('.directory__nav').mouseenter(function(){
        $('.menu, .featured-page').addClass('is-white');
        $('.directory__bg').css('opacity','1');
    });
    $('.directory__nav').mouseleave(function(){
        $('.menu, .featured-page').removeClass('is-white');
        $('.directory__bg div').removeClass('active');
        $('.directory__bg').css('opacity','0');
    });


    // SERIES
    $('.product-line').mouseenter(function(){
        $('.product-line').not(this).addClass('opaque');
    });

    $('.product-line').mouseleave(function(){
        $('.product-line').removeClass('opaque');
    });


    // SCROLL DOWN
    $('.fullscreen-bg__caption').click(function(e){
        e.preventDefault();
        $('html,body').animate({scrollTop:$('.page').offset().top}, 800);
    });


    // SPECS
    if ($('.specs__expander').length || $('.specs__order').length) {
      $('.specs__expander').click(function(){
        $(this).parents('.specs').find('.specs__details').slideToggle(300).toggleClass('expanded');
      });

      $('.specs .specs__order').click(function(e){
        e.preventDefault();

        var obj1 = $(this).parents('.specs');
        var obj2 = $('#order');

        var tit1 = '' + obj1.find('.specs__body .specs__title').html();
        var tit2 = '' + obj1.find('.specs__subtitle').html();
        var pic1 = '' + obj1.find('.specs__img').html();
        tit1 = (tit1 != undefined && tit1 != 'undefined' && tit1 != "") ? tit1 : "";
        tit2 = (tit2 != undefined && tit2 != 'undefined' && tit2 != "") ? tit2 : "";
        pic1 = (pic1 != undefined && pic1 != 'undefined' && pic1 != "") ? pic1 : "";

        obj2.find('.order__specs .specs__title').html(tit1);
        obj2.find('.order__specs .specs__subtitle').html(tit2);
        obj2.find('.order__specs .specs__img').html(pic1);

        obj2.addClass('active');
        $('.menu').toggleClass('force-black');
      });

      $("#order form.order__form button[type='submit']").removeAttr('disabled');
      $('#order form.order__form').submit(function(event) {
        $("#order form.order__form button[type='submit']").removeAttr('disabled');
        event.preventDefault();

        var out = true;

        var obj1 = $(this).find('input[name="name"]');
        var val1 = obj1.val();

        var obj2 = $(this).find('input[name="email"]');
        var val2 = obj2.val();

        obj1.removeClass("error");
        obj2.removeClass("error");

        if (val1 == '' || val1 == undefined) {
      		out = false;
      		obj1.addClass("error");
      	};

        if (val2 == '' || val2 == undefined) {
      		out = false;
      		obj2.addClass("error");
      	} else {
          if (!validateEmail(val2)) {
            out = false;
            obj2.addClass("error");
          }
        };

        if (out) {
          $("#order form.order__form button[type='submit']").attr('disabled','disabled');

          var u = window.location.href;
          var prod = $('#order .specs__body .specs__title').html();
          prod = prod.replace('<span>', '');
          prod = prod.replace('</span>', ' - ');
          prod = prod.replace(/\r?\n/g, '');
          var val3 = $(this).find('input[name="phone"]').val();
          var val4 = $(this).find('input[name="message"]').val();

          var url = "/AspService/_service_LightingBomma_01.asp?senddata=1";

          $.ajax({
            method: "POST",
            url: url,
            dataType: "text",
            data: { u: u, pr: prod, f1: val1, f2: val2, f3: val3, f4: val4 }
          }).done(function(data) {

            /*var arr = data.split('|');
            var err = (arr[0] == 'ok') ? false : true;

            if (err){
            } else {
              $('.popup-window__close').trigger('click');
            }*/
            $('.popup-window__close').trigger('click');

          }).always(function() {
            $("#order form.order__form button[type='submit']").removeAttr('disabled');
          });
        }

      });
    }

    // OPEN GALLERY
    $('.open-gallery').click(function(e){
        e.preventDefault();
        var target = $(this).attr('href');

        $(target).toggleClass('active');
        $('.menu').toggleClass('force-black');
    });
    // CLOSE GALLERY
    $('.gallery__close').click(function(e){
        e.preventDefault();
        $(this).parent('.gallery').toggleClass('active');
        $('.menu').toggleClass('force-black');
    });


    // GALLERY INIT
    if( $('.gallery').length ){
        var gallery = $('.gallery__slides');

        // hide navigation when not enough slides
        gallery.on('resized.owl.carousel initialize.owl.carousel', function() {
           var totalSlides = $(this).find('img').length;
           var galleryNav = $(this).siblings('.gallery__nav');

           if( totalSlides <= 2 ){
               galleryNav.hide();
           } else{
               galleryNav.show();
           }
        });

        gallery.on('initialized.owl.carousel', function() {
            $(this).removeClass('loading');
        });

        // init carousel
        gallery.owlCarousel({
            items: 3,
            margin: 50,
            dots: false,
            nav: false,
            autoWidth: true,
            loop: true,
            responsive: {
                1:{
                    margin: 10
                },
                940:{
                    margin: 50
                }
            }
        });

        // Go to the previous item
        $('.gallery__nav .prev').click(function(e) {
            e.preventDefault();
            $(this).parent().siblings(gallery).trigger('prev.owl.carousel');
        });
        // Go to the next item
        $('.gallery__nav .next').click(function(e) {
            e.preventDefault();
            $(this).parent().siblings(gallery).trigger('next.owl.carousel');
        });
    }


    // MENU COLOR ON SCROLL
    if( $('.fullscreen-bg, .split-page[class*="c-"]').length ){
        $('.menu').addClass('is-white');
        menuColor();
    }

    function menuColor(){
        if( $('.fullscreen-bg').length ){
            var st = $(window).scrollTop();
            var menu = $('.menu');
            var customClass = 'is-white';

            var offsetTop = $('.fullscreen-bg').offset().top;
            var offsetBottom = $('.fullscreen-bg').offset().top + $('.fullscreen-bg').height();

            if( st > offsetBottom - 200 ){
                 menu.removeClass(customClass);
            } else{
                menu.addClass(customClass);
            }
        }
    }

    $(window).scroll(function(){
        if( $('.fullscreen-bg').length ){
            menuColor();

            // zoom out
            var st = $(window).scrollTop();
            var introHeight = $('.fullscreen-bg').height();
            var opacity = 1 - st/(introHeight);
            var scale = 1 - st/2/(introHeight);
            $('.fullscreen-bg__inner').css({'opacity':opacity, 'transform':'scale('+ scale +')'});
        }
    });

});


// PRELOADER
function preloader(){
    if( $('#preloader').length ){
        var w = 0;
        var interval = setInterval(function() {
            if(document.readyState === 'complete'){
                w = 100;
                $('#preloader-progress span').css('width', w + '%');
                clearInterval(interval);
                setTimeout(function(){
                    $('.preloader').addClass('loaded');
                }, 500);
            }
            if( w <= 90 ){
                w = w + 5;
                $('#preloader-progress span').css('width', w + '%');
            }
        }, 500);
    }
}


// LAZYSIZES - fire coverImg function before unveiling img
$(document).on('lazybeforeunveil', function(){
    simulateCoverImg();
});

// SIMULATE COVER IMG
function simulateCoverImg() {
    $('.cover').each(function(){
        var container = $(this),
            el = $(this).find('img'),
            containerWidth = container.width(),
            containerHeight = container.height(),
            containerRatio = containerWidth / containerHeight,
            img = new Image();

        img.src = el.data('src') !== undefined ? el.data('src') : el.attr('src');

        img.onload = function(){
            var imgWidth = el.width(),
                imgHeight = el.height(),
                imgRatio = imgWidth / imgHeight;

            if( containerRatio > imgRatio ){
                el.css({'width':'100%','height':'auto'});
            } else{
                el.css({'width':'auto','height':'100%'});
            }
        };
    });
}

function validateEmail(email) {
	var re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i;

	return re.test(email);
}
