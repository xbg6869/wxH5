$(function() {
    var lotteryPage =$('#lotteryPage');
    var lotteryBtn = $('#lotteryBtn');
    var lotteryBg = $('#lotteryBg');
    var rotateFunc = function(awards, angle, text) {
        //awards:奖项，angle:奖项对应的角度
        lotteryBg.stopRotate();
        lotteryBg.rotate({
            angle: 0,
            duration: 10000,
            animateTo: angle + 2880,
            //angle是图片上各奖项对应的角度，1440是我要让指针旋转4圈。所以最后的结束的角度就是这样子^^
            callback: function() {
                if(text == 0){
                    location.hash = '#failPage';
                }else {
                    checkInfoExists();
                }
            }
        });
    };

    lotteryBtn.rotate({
        bind: {
            touchstart: function() {
                //这个随机可以通过后端返回的数据替代
                $.ajax({
                    url:'/lottery',
                    method:'get',
                    dataType:'text',
                    success:function (result) {
                        var num = Number(result);
                            showResult(num);

                    }
                });
                function showResult(data) {
                    if(data == 'undefined'){
                        data=0;
                    }
                    switch (data) {
                        case 2://亚马孙电子礼品卡
                            rotateFunc(4, 140, 4);
                            break;
                        case 1://3M口罩
                            rotateFunc(6, 30, 6);
                            break;
                        case 0:
                            var angle = [67,80,190,202];
                            angle = angle[Math.floor(Math.random() * angle.length)]
                            rotateFunc(0, angle, 0);
                            break;
                    }
                }
            }
        }
    });


    function checkInfoExists() {
        $.ajax({
            type: 'get',
            url: 'checkInfoExists',
            dataType: 'text',
            success: function (result) {
                if(result=='false') {
                    setTimeout(function () {
                        location.hash = '#infoPage1';
                    }, 200);
                } else {
                    setTimeout(function () {
                        location.hash = '#winPage';
                    }, 200);
                }
            }
        });
    }
})