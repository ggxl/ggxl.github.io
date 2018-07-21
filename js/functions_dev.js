// variables
var $window = $(window), gardenCtx, gardenCanvas, $garden, garden;
var clientWidth = $(window).width();
var clientHeight = $(window).height();

$(function () {
    // setup garden
	$loveHeart = $("#loveHeart");
	$loveHeart.width(($("body").width()-$(".left-col").width())/2);
	$loveHeart.height($loveHeart.width());
	var offsetX = $loveHeart.width() / 2;
	var offsetY = $loveHeart.height() / 2 - 55;
    $garden = $("#garden");
    gardenCanvas = $garden[0];
	gardenCanvas.width = $("#loveHeart").width();
    gardenCanvas.height = $("#loveHeart").height()
    gardenCtx = gardenCanvas.getContext("2d");
    gardenCtx.globalCompositeOperation = "lighter";
    garden = new Garden(gardenCtx, gardenCanvas);
	
	// $("#content").css("width", $loveHeart.width() + $("#code").width());
	// $("#content").css("height", Math.max($loveHeart.height(), $("#code").height()));
	// $("#content").css("margin-top", Math.max(($window.height() - $("#content").height()) / 2, 10));
	// $("#content").css("margin-left", Math.max(($window.width() - $("#content").width()) / 2, 10));

    // renderLoop
    setInterval(function () {
        garden.render();
    }, Garden.options.growSpeed);
});

$(window).resize(function() {
    var newWidth = $(window).width();
    var newHeight = $(window).height();
    if (newWidth != clientWidth && newHeight != clientHeight) {
        location.replace(location);
    }
});

function getHeartPoint(angle) {
	var t = angle / Math.PI;
	var x = 19.5 * (16 * Math.pow(Math.sin(t), 3));
	var y = - 20 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
	return new Array(offsetX + x, offsetY + y);
}

//开始画心
function startHeartAnimation() {
	var interval = 50;
	var angle = 10;
	var heart = new Array();
	var animationTimer = setInterval(function () {
		var bloom = getHeartPoint(angle);
		var draw = true;
		for (var i = 0; i < heart.length; i++) {
			var p = heart[i];
			var distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
			if (distance < Garden.options.bloomRadius.max * 1.3) {
				draw = false;
				break;
			}
		}
		if (draw) {
			heart.push(bloom);
			garden.createRandomBloom(bloom[0], bloom[1]);
		}
		if (angle >= 30) {
			clearInterval(animationTimer);
			showMessages();
		} else {
			angle += 0.2;
		}
	}, interval);
}
var tellTimer;
//代码文本输出
/*(function($) {
	$.fn.typewriter = function() {
		this.each(function() {
			var $ele = $(this),
                str = $ele.html(),//html代码 作为字符串变量保存
                progress = 0;
			$ele.html('');
			var timer = setInterval(function() {
				var current = str.substr(progress, 1);
				if (current == '<') {//如果是html的开始标签
					progress = str.indexOf('>', progress) + 1;//从progress开始往后查找“>”第一个结束标签的位置+1
                    //目的为了一次性输出一个完整的html标签
				} else {//字符串索引+1
					progress++;
				}
                $ele.scrollTop($ele.find(">div").height());
				$ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));//截取字符串 放在code元素中。每隔一次出现"_"模拟打字的效果
				if (progress >= str.length) {//输出完以后清除定时器。 整个代码输出效果完成。
					clearInterval(timer);
                    $("#code").css("overflow","auto");
                    setTimeout(function () {
                        startHeartAnimation();//开始画心！
                    }, 10);
                    $ele.scrollTop($ele.find(">div").height());
                    tellTimer = setInterval(tellTime,1000);
				}

			}, 75);
		});
		return this;
	};
})(jQuery);*/

//计算相识了多久
function timeElapse(date){
	var current = Date();
	var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
	var days = Math.floor(seconds / (3600 * 24));
	seconds = seconds % (3600 * 24);
	var hours = Math.floor(seconds / 3600);
	if (hours < 10) {
		hours = "0" + hours;
	}
	seconds = seconds % 3600;
	var minutes = Math.floor(seconds / 60);
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	seconds = seconds % 60;
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	var result = "<span class=\"digit\">" + days + "</span> days <span class=\"digit\">" + hours + "</span> hours <span class=\"digit\">" + minutes + "</span> minutes <span class=\"digit\">" + seconds + "</span> seconds";
	$("#elapseClock").html(result);
}

function tellTime(){
    var now = new Date();
    var now2 = new Date();
    now2.setHours(22);
    now2.setMinutes(30);
    now2.setSeconds(0);
    if(now.getTime()>now2.getTime()){
        $("#code").html("<span style='font-size: 42px;color: red'>睡觉！！</span>").css("text-align","center");
        clearInterval(tellTimer);
    }
    var result = "<span>" + now.getFullYear() + "</span> 年 " +
        "<span>" + (now.getMonth()+1) + "</span> 月" +
        " <span>" + now.getDate() + "</span> 日" +
        " <span>" + now.getHours() + "</span> 点"+
        " <span>" + now.getMinutes() + "</span> 分"+
        " <span>" + now.getSeconds() + "</span> 秒";
    $("#TellTime").html(result);
}

function showMessages() {
	adjustWordsPosition();
	$('#messages').fadeIn(5000, function() {
		showLoveU();
	});
}
//定义心型中的文字位置
function adjustWordsPosition() {
	$('#words').css("position", "absolute");
	$('#words').css("top", $("#garden").position().top + 150);
	$('#words').css("left", $("#garden").position().left + 70);
}
//定义输出代码的位置：相对一心形垂直居中
function adjustCodePosition() {
	$('#code').css("margin-top", ($("#garden").height() - $("#code").height()) / 2);
}

function showLoveU() {
	$('#loveu').fadeIn(3000);
}