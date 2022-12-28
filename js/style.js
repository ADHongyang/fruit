function rem_vw(){
	var dpr,rem,scale;
	var docEl=document.documentElement;
	var fontEl=document.createElement('style');
	var metaEl=document.querySelector("meta[name='viewport']");
	
	rem=docEl.clientWidth/10;
//	console.log(rem);
	// 动态写入样式
	fontEl.innerHTML = 'html{font-size:' + rem + 'px !important;}';
	docEl.firstElementChild.appendChild(fontEl);
}	
rem_vw();
$(window).resize(function(){
	rem_vw();
});

/*点击弹出游戏规则*/
$('.rule_btn').click(function(){
	$(".mask_1").css("display","block");
	$(".mask_1_1").css("display","block");
	alert("点击了")
})

/*点击关闭游戏规则*/
$(".rule_btn_sure").on("click",function(){
	$(".mask").css("display","none");
	$(".mask-1").css("display","none");
})