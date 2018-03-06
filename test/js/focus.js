//轮播滚动 升级版
var move=function(timer){
	var idx=0;//第几张照片

	/**1.复制视口图片************************************/
	$('#adv1 li').eq(0).clone().appendTo($('#adv1'));
	var lis=$('#adv1 li');

	var WIDTH=parseInt($('#adv').css('width'));
	$('#adv1').css('width',WIDTH*lis.length)

	/**2.添加小按钮************************************/
	for(var i=1,btns=[];i<lis.length;i++){//创建5个小按钮存入数组btns
		btns.push('<li class="coordNum">'+i+'</li>');
	}
	$('#adv').append($('<ul id="coord"></ul>').append(btns.join('')));//把创建的按钮放入HTML，Ok,反过来看就好~
	$(".coordNum").eq(idx).addClass("hover");//给指定按钮添加样式

	/**3.a图片滚动************************************/
	var speed=0;
	var moveLeft=function(){
		idx++;
		if(idx<lis.length-1){
			$('#adv1').animate({left:-WIDTH*idx},600);
		}else{
			idx=0;
			$('#adv1').animate({
				left:-WIDTH*idx//显示clone出来的最后一张;
			},4);
		}
		$(".coordNum").eq(idx).addClass("hover").siblings().removeClass("hover");//给指定按钮添加样式
	}
	var t=setInterval(moveLeft,timer);
	/**4.b鼠标事件************************************/
	$('#adv').hover(function(){
		clearInterval(t);
		// t=null;
	},function(){
		t=setInterval(moveLeft,timer);
	})
	/**5.c点击查看************************************/
		/* 点击切换到上一张按钮功能 */
	$('#prev').click(function(){
		if(idx>0){
			idx--;
			$('#adv1').animate({left:-WIDTH*idx},600);
		}else{
			//当idx=0,点击按钮时;
			idx=lis.length-2;//把角标切换到第五个元素(clone除外的最后一个元素)
			$('#adv1').css('left',-WIDTH*(lis.length-1));//设置adv1.left位置,(显示clone元素)
			$('#adv1').animate({//又进入正常循环中
				left:-WIDTH*(lis.length-2)
			},600)
		}
		$(".coordNum").eq(idx).addClass("hover").siblings().removeClass("hover");
	});

	/* 点击切换到下一张按钮功能 */
	$("#next").click(function(){
		moveLeft();
	});
	/**6.d手动查看图片************************************/
	$('#coord li').mouseover(function(){//这里还不清楚的看前面的轮播案例
		idx=$('#coord li').index(this);
		$('#adv1').animate({left:-WIDTH*idx},600);
		$('.coordNum').eq(idx).addClass('hover').siblings().removeClass('hover');
		console.log(idx);
	})

}