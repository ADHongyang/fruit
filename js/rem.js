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
})