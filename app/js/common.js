$(document).ready(function(){

    /**
     * mobile-mnu customization
     */
    var mmenu = $('#mobile-mnu');
    var menuLogo = mmenu.data("logo");
    var $mmenu = mmenu.mmenu({
        navbars: [{
            content: [ "<img src=" + menuLogo + " class=\"img-responsive mm-logo\" alt=\"alt\"/>" ],
            height: 3
        }],
        "pageScroll": true,

        "navbar": {
            "title" : "",
        },
        "extensions": [
            "theme-dark",
            "pagedim-black",
            "position-front",
            "fx-listitems-slide",
        ],
    }, {
        offCanvas: {
            pageSelector: "#page-container"
        },
    });

    var mmenuBtn = $("#mmenu-btn");
    var API = $mmenu.data("mmenu");

    mmenuBtn.click(function() {
        API.open();
        $(this).addClass('is-active')
    });


    API.bind( "close:start", function() {
        setTimeout(function() {
            mmenuBtn.removeClass( "is-active" );
        }, 300);
    });
    /**
     * end mobile-mnu customization
     */

    $('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    });

    $('.intro-slider').owlCarousel({
        loop:true,
        nav: true,
        items: 1,
        margin: 30,
        dots: false,
        autoHeight: false,
        autoplay: true,
        autoplayTimeout: 7000,
        navText: ["", ""],
        autoplaySpeed: 600,
        navSpeed: 600
        // animateIn: "fadeIn",
        // animateOut: "fadeOut",
    });

    $('.cat-slider').owlCarousel({
        loop:true,
        nav: true,
        margin: 20,
        dots: false,
        autoHeight: false,
        navText: ["", ""],
        responsive : {
            0 : {
                items: 1
            },
            481 : {
                items: 2
            },
            992 : {
                items: 3
            }
        }
    });

    $('.kitchens-slider').owlCarousel({
        loop:true,
        nav: false,
        dots: false,
        autoHeight: true,
        navText: ["", ""],
        // center: true,
        merge:true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 6000,
        autoplaySpeed: 600,
        responsive : {
            0 : {
                items: 1
            },
            481 : {
                items: 2
            },
            768 : {
                items: 3
            },
            992 : {
                items: 4
            }
        }
    });

    $('.product-slider').owlCarousel({
        loop:false,
        nav:false,
        autoHeight: true,
        items: 1,
        thumbs: true,
        dots: true,
        thumbsPrerendered: true,
        thumbItemClass: 'product-nav',
        animateIn: "fadeIn",
        animateOut: "fadeOut",
    });

    $('.views-slider').slick({
        dots: false,
        infinite: true,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>'
    });

    var element = document.querySelector( '.main-mnu' );

    var droppy = new Droppy( element, {
        parentSelector: 'li',
        dropdownSelector: 'li > ul',
        triggerSelector: 'a'
    } );

    $('.gallery').photoswipe();
    $('.serts-wrap').photoswipe();
    $('.kitchens-slider').photoswipe();
    $('.product-slider').photoswipe();

    $('.preloader').fadeOut();

    function heightses() {
        if ($(window).width()>480) {
            $('.cat-item-chars').height('auto').equalHeights();
        }

        $('.step-item-title').height('auto').equalHeights();
    }

    $(window).resize(function() {
        heightses();
    });

    heightses();


    /** FORMS START */
    var uPhone = $('.user-phone');
    uPhone.mask("9 999 999 99 99",{autoclear: false});

    $.validate({
        form : '.contact-form',
        scrollToTopOnError: false
    });

    $(function() {
        $(".btn-popup").magnificPopup({
            type: "inline",
            fixedContentPos: !1,
            fixedBgPos: !0,
            overflowY: "auto",
            closeBtnInside: !0,
            preloader: !1,
            midClick: !0,
            removalDelay: 300,
            mainClass: "my-mfp-zoom-in"
        })
    });

    // $("form").click(function() {
    //     var th = $(this);
    //     th.find(".btn").prop("disabled", "disabled").addClass("disabled");
    //
    //     if (th.hasClass('cart-form')) {
    //         $('#cart .cart-item').each(function () {
    //             var name = $(this).find('.cart-item-title').text();
    //             console.log(name);
    //         })
    //     };
    // });

    //E-mail Ajax Send
    $("form").submit(function() { //Change
        var th = $(this);
        th.find(".btn").prop("disabled", "disabled").addClass("disabled");

        if (th.hasClass('cart-form')) {
            var k = 1;
          $('#cart .cart-item').each(function () {
            var name = $(this).find('.cart-item-title').text().replace("\"", '&#171;').replace("\"", '&#187;');;
            var code = $(this).find('.cart-item-code').text();

            $('#cart-form').append('<input type="hidden" name="Название и код кухни '+k+'" value="'+name+' ['+code+']">');
            k++;

          })
        };




        $.ajax({
            type: "POST",
            url: "/mail.php", //Change
            data: th.serialize()
        }).done(function() {

            $.magnificPopup.open({
                items: {
                    src: '#popup-greeting'
                },
                type: 'inline',

                fixedContentPos: false,
                fixedBgPos: true,

                overflowY: 'auto',

                closeBtnInside: true,
                preloader: false,

                midClick: true,
                removalDelay: 300,
                mainClass: 'my-mfp-zoom-request'
            }, 0);


            setTimeout(function() {
                th.find(".btn").removeAttr('disabled').removeClass("disabled");
                th.trigger("reset");
                $.magnificPopup.close();
            }, 3000);
        });
        return false;
    });
    /** FORMS END*/



    function loadScript(url, callback){
        var script = document.createElement("script");

        if (script.readyState){  // IE
            script.onreadystatechange = function(){
                if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {  // Другие браузеры
            script.onload = function(){
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }


    function initMap() {
        ymaps.ready(function(){
            var mapId = $('#map'),
                attitude = mapId.data("att"),
                longtitude = mapId.data("long"),
                zoom = mapId.data("zoom"),
                marker = mapId.data("marker"),
                map = new ymaps.Map("map", {
                    center: [attitude, longtitude],
                    controls: ['zoomControl'],
                    zoom: zoom
                }),

                myPlacemark = new ymaps.Placemark(map.getCenter(), {}, {
                    // Опции.
                    // Необходимо указать данный тип макета.
                    iconLayout: 'default#image',
                    // Своё изображение иконки метки.
                    iconImageHref: marker,
                    // Размеры метки.
                    iconImageSize: [26, 42],
                });

            map.geoObjects.add(myPlacemark);
        });
    }

    if( $('#map').length )         // use this if you are using id to check
    {
        setTimeout(function(){
            loadScript("https://api-maps.yandex.ru/2.1/?apikey=e470b388-a1d0-4edf-acdc-34b4bc5bedee&lang=ru_RU&loadByRequire=1", function(){
                initMap();
            });
        }, 2000);
    }


});
