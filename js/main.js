!(function () {
    var res = {
        "code": 0,
        "msg": "成功",
        "data": {
            "3": {
                "bucket_price": 98.4,
                "big_bucket": 123,
                "small_bucket": 123,
                "content": "促销激情已在你餐厅蔓延开来，你已看清未来的方向......"
            },
            "4": {
                "zone_sort": 12,
                "zone_percent": 87,
                "content": "你霸气又潇洒，每一次努力都离目标更近了一步！"
            },
            "5": {
                "week_percent": 98,
                "content": "请再接再厉！"
            },
            "6": {
                "reward": 456456,
                "reward_cnt": 456456,
                "content": "都说你和厉害果然名不虚传！我们为你点赞，期待你下周的精彩表现！"
            }
        }
    };

    $('.enter_btn').on('click', function () {
        $('.login').addClass('show')
    })

    $('.close_btn').on('click', function () {
        $('.login').removeClass('show')
    })

    $('.login_btn').on('click', function () {
        getData()
    })

    $('.re_btn').on('click', function () {
        swiper.slideTo(0, 100);
    })

    $('html').one('touchstart',function(){
        var myVideo = document.querySelectorAll('audio')[0];
        myVideo.play();
    })

    function init() {
        setTimeout(function () {
            $('.entry').addClass('active');
        }, 200)
    }
    init()

    var beginTime = 2000;
    var endTime = 4;
    var addJinbiTimer;
    var swiper


    function initSwiper() {
        $('.entry_wrap').addClass('hidden');
        $('.main_swiper').addClass('show');
        swiper = new Swiper('.main_swiper', {
            direction: 'vertical',
            mousewheelControl: true,
            freeModeSticky : true,
            onInit: function (swiper) {
                var index = swiper.activeIndex;
                $('#page_' + index).addClass('active');
                setTimeout(function () {
                    $('#page_' + index).find('.sub_item').addClass('show')
                }, 1000)
                setTimeout(function () {
                    $('#page_' + index).find('.sub_item').addClass('show2')
                }, 2000)

            },
            onTransitionEnd: function (swiper) {
                var index = swiper.activeIndex;
                $('.page_item').removeClass('active');
                $('.page_item').find('.sub_item').removeClass('show')
                $('.page_item').find('.sub_item').removeClass('show2')
                $('.baifen').removeClass('active_1');
                $('.jinbi_all').removeClass('show');
                $('#page_' + index).addClass('active');
                setTimeout(function () {
                    $('#page_' + index).find('.sub_item').addClass('show')
                }, 1000)
                setTimeout(function () {
                    $('#page_' + index).find('.sub_item').addClass('show2')
                }, 2000)
                if(index == 2){
                    initJinbi();
                    backward();
                }else{
                    clearTimeout(backwardTimer);
                    clearTimeout(addJinbiTimer);
                    endTime = 4;
                }
            }
        });
    }

    //倒数计时
    var backwardTimer;
    var backward = function(){
        endTime--;
        if(endTime <= 0){
            clearTimeout(addJinbiTimer);
            clearTimeout(backwardTimer);
            $('.baifen').addClass('active_1');
            $('.jinbi_all').addClass('show');
            return;
        }
        backwardTimer = setTimeout(backward,1000);
    }


    function initJinbi() {
        var win = (parseInt($(".couten").css("width"))) - 50;
        $(".couten").css("height", $(document).height());
        $("li").css({});

        var del = function(){
            nums++;
            $(".li" + nums).remove();
            setTimeout(del,200)
        }

        var add = function() {
            var hb = parseInt(Math.random() * (4 - 1) + 1);
            var Wh = parseInt(Math.random() * 8 + 20);
            var Left = parseInt(Math.random() * (60 - 0) + 60);
            var rot = (parseInt(Math.random() * (45 - (-45)) - 45)) + "deg";

            num++;
            $(".couten").append("<li class='li" + num + "' ><a href='javascript:;'><img src='img/jinbi_" + hb + ".png'></a></li>");
            $(".li" + num).css({
                "left": Left,
            });
            $(".li" + num + " a img").css({
                "width": Wh,
                "transform": "rotate(" + rot + ")",
                "-webkit-transform": "rotate(" + rot + ")",
                "-ms-transform": "rotate(" + rot + ")", /* Internet Explorer */
                "-moz-transform": "rotate(" + rot + ")", /* Firefox */
                "-webkit-transform": "rotate(" + rot + ")",/* Safari 和 Chrome */
                "-o-transform": "rotate(" + rot + ")" /* Opera */
            });
            $(".li" + num).animate({'top':340},2000,function(){
                //删掉已经显示的红包
                this.remove()
            });
            addJinbiTimer = setTimeout(add,200)
        }

        //增加红包
        var num = 0;
        add()
    }

    function getData() {
        var id = $('.input').val()
        if(id != ''){
            let url = 'http://kfc.it2048.cn/v0/get-shop-info?id=' + id
            $.ajax({
                url: url,
                type: 'get',
                method: 'get',
                dataType: 'json',
                success: function (res) {
                    if(res.code === 0){
                        initSwiper();
                        setData(res.data);
                    }else{
                        $('.err').addClass('show')
                        setTimeout(function () {
                            $('.err').removeClass('show')
                        }, 2000)
                    }
                },
                error: function (res) {
                    alert(res.msg)
                }
            });

            // initSwiper();
            // setData(res.data);

        }else{
            $('.err').addClass('show')
            setTimeout(function () {
                $('.err').removeClass('show')
            }, 2000)
        }
    }

    function setData(data) {
        var page_3 = data['3'],
            page_4 = data['4'],
            page_5 = data['5'],
            page_6 = data['6'];
        $('#bucket_price_big').html(page_3.bucket_price + '元');
        $('#bucket_price').html(page_3.bucket_price);
        $('#big_bucket').html(page_3.big_bucket);
        $('#small_bucket').html(page_3.small_bucket);
        $('#page3_content').html(page_3.content);

        $('#zone_sort_big').html('第' + page_4.zone_sort + '名');
        $('#zone_sort').html(page_4.zone_sort);
        $('#zone_percent').html(page_4.zone_percent);
        $('#page4_content').html(page_4.content);


        var percent = page_5.week_percent;
        var src_percent;
        $('#week_percent').html(percent);
        $('#page5_content').html(page_5.content);
        if(percent > 0 && percent <= 30){
            src_percent = 25
        }else if(percent > 30 && percent <= 70){
            src_percent = 50
        }else if(percent > 70 && percent <= 100){
            src_percent = 75
        }else if(percent > 100){
            src_percent = 100
        }
        $('#percent_img').attr('src', './img/jinbi_' + src_percent + '.png')

        $('#reward_big').html(page_6.reward + '元');
        $('#reward').html(page_6.reward);
        $('#reward_cnt').html(page_6.reward_cnt);
        $('#page6_content').html(page_6.content);

    }

    function param2json (str) {
        var json = {};
        if (/^[0-9]*$/.test(str)) {
            json.city = str;
            return json
        } else {
            var strArr = str.split('&');

            if (strArr.length > 0) {
                for (var i = 0; i < strArr.length; i++) {
                    var item = strArr[i].split('=');
                    var key = item[0];
                    var value = item[1];
                    json[key] = value;
                }
                return json
            } else {
                return false
            }
        }
    }


})()

function playPause() {
    var myVideo = document.querySelectorAll('audio')[0];
    var music_btn = document.getElementById('music_btn');
    if (myVideo.paused){
        myVideo.play();
        $('.music_btn').addClass('border_anim');
        musicStatus = true;
    }
    else{
        myVideo.pause();
        $('.music_btn').removeClass('border_anim');
        musicStatus = false;
    }
}