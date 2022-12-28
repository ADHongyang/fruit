var Csg = {}

Csg.fire = function() {
	if(!Csg.restknife || !Csg.ifpass) return;//没刀了
	Csg.fireAfter();//下面的刀减掉
	Csg.ifpass = true;
	Csg.restknife--;
	Csg.fired = true;//刀已出鞘
	
	if(Csg.stage != 3) {
		//计算下一帧刀会和水果上的刀相撞吗？其实就是计算那时的水果上的刀离0度有几度
		Csg.rollingKnifeCol.forEach(function(item, index) {
			var dax = Csg.addAngel(da, Csg.stage);
//			console.log(dax)
			var angel = item[0] + dax * 180 / Math.PI;
			if(Math.abs(angel%360) < 11 || Math.abs(angel%360) > 349) 
			{//失败
				Csg.ifpass = false;
				setTimeout(function() {
					Csg.failAfter();
				},500)
				return ;
				console.log('失败了还继续')
			}else {//成功
	//			console.log('成功')
				
			}
		});
		
		if(!Csg.restknife && Csg.ifpass) {
			setTimeout(function() {
				Csg.successAfter();
			},500)
		}
	}else {
		Csg.firetime++;
		if(Csg.firetime < Csg.limitfire) {//normal
			Csg.dax = Csg.addAngel(da, Csg.stage);
			Csg.rollingKnifeCol.forEach(function(item, index) {
		//		console.log(Csg.dax)
				var angel = item[0] + Csg.dax * 180 / Math.PI;
				if(Math.abs(angel%360) < 11 || Math.abs(angel%360) > 349) 
				{//失败
					Csg.ifpass = false;
					setTimeout(function() {
						Csg.failAfter();
					},500)
				}else {//成功
		//			console.log('成功')
					
				}
			});
			if(!Csg.restknife && Csg.ifpass) {
				setTimeout(function() {
					Csg.successAfter();
				},500)
			}
//			console.log(Csg.dax)
		}else {
			//gohome
			var min = 1000,max = 1, index2 = 0, index3 = 0, indexX;
			Csg.rollingKnifeCol.forEach(function(item, index) {
				var item1 = Math.abs((item[0]+da* 180 / Math.PI)%360);
//				console.log(item)
				if(item1 < min) {
					min = item1;
					index2 = index;
				}
				if(item1 > max) {
					max = item1;
					index3 = index;
				}
//				Csg.dax = Csg.addAngel(da, Csg.stage);
//				var angel = item[0] + Csg.dax * 180 / Math.PI;
//				if(Math.abs(angel%360) < 11 || Math.abs(angel%360) > 349) 
//				{
//					Csg.ifpass = false;
//				}else {
//				}
			});
			
			indexX = (360-Csg.rollingKnifeCol[index3][0]) > Csg.rollingKnifeCol[index2][0] ? index2 : index3;
			var whichknife = Csg.rollingKnifeCol[indexX];
			var abs = (whichknife[0]+da* 180 / Math.PI)%360;
			console.log(whichknife,da* 180 / Math.PI,abs)
			//靠近360或靠近0
			if((360-Math.abs(abs)) > Math.abs(abs)) {//靠近0
				if(abs / Math.abs(abs) == 1) {//正数
					Csg.dax = da - abs*Math.PI/180;
				}else {
					Csg.dax = da - abs*Math.PI/180;
				}
			}else {//靠近360
				if(abs / Math.abs(abs) == 1)  {//正数
					Csg.dax = da + (360-Math.abs(abs))*Math.PI/180;
				}else {
					Csg.dax = da - (360-Math.abs(abs))*Math.PI/180;
				}
			}
//			console.log(whichknife)
//			console.log(da)
//			console.log(Csg.dax)
//			Csg.dax = -((360-Math.abs(whichknife[0])) > Math.abs(whichknife[0]) ?  whichknife[0] : (360-whichknife[0]));
//			console.log(Csg.dax)
			Csg.ifpass = false;
			setTimeout(function() {
				Csg.failAfter();
			},500)
		}
	}
}
var page,ctx;
//获取canvas标签
page = document.getElementById("page");
ctx = page.getContext("2d");
page.addEventListener('touchstart', function() {
//	console.log(1)
	Csg.fire();
});

Csg.render = function() {
//	console.log(2)
	ctx.clearRect(0,0,Csg.rem*10,Csg.rem*20);
	
	Csg.rollingKnifeCol.forEach(function(item, index) {
//		console.log(item[0])
		Csg.util.drawimg(1, 0, 3*Csg.rem, Csg.knifeimg.width, Csg.knifeimg.height, item[0]*(Math.PI/180)+da);
		//果汁
		if(item[1]) {
			Csg.util.drawjuice(0, 1.9*Csg.rem, item[0]*(Math.PI/180)+da, item[1], item[2]);
			item[1]--;
		}
	});
	if(Csg.restknife) {//如果还有刀没用
		Csg.util.drawimg(1, 0, 5.5*Csg.rem, Csg.knifeimg.width, Csg.knifeimg.height, 0);
	}
	
	//失败+下一帧布尔值，这个判断要放在下面那个if(Csg.fired)上面
	if(!Csg.ifpass && Csg.failNexttick) {
		Csg.failAni();
	}
	
	if(Csg.fired) {//
		Csg.fired = false;
		Csg.util.drawimg(1, 0, 4.2*Csg.rem, Csg.knifeimg.width, Csg.knifeimg.height, 0);
		//处理下一帧的成功或失败的动画
		if(Csg.ifpass) {//成功，添加到rollingKnifeCol里面
			var arr = [];
			if(Csg.stage != 3) {
				var dax = -Csg.addAngel(da, Csg.stage);
//				console.log(dax)	
				var angel = dax * 180 / Math.PI;
				
			}else {
				var angel = -Csg.dax * 180 / Math.PI;
				Csg.is3fire = true;
			}
			//[[-0.5,20],[0.3,10],[-0.1,35],[0.4,16]]
			var arr1 = [];
			for(var p = 1; p<=4; p++) {
				var arr2 = [],x,y;
				if(p%2) {
					x = Math.random()*0.5*(-1)
				}else {
					x = Math.random()*0.5
				}
				y = Math.random()*40;
				arr2.push(x,y);
				arr1.push(arr2);
			}
			arr.push(angel, 25, arr1);
			Csg.rollingKnifeCol.push(arr);
		}else {
			if(Csg.stage == 3) {
				Csg.is3fire = true;
			}
			//触发失败动画
//			console.log(1)
			Csg.failNexttick = true;
		}
	}
	
	Csg.util.drawimg(2, 0, 0, Csg.fruitimg.width, Csg.fruitimg.height,da);
}
Csg.failAni = function() {
	Csg.util.drawimg2(Csg.failpx, Csg.failpy, Csg.knifeimg.width, Csg.knifeimg.height, Csg.failrotate);
	Csg.failrotate = (Csg.failrotate * 180 / Math.PI + 8) / 180 * Math.PI;
	Csg.failpy = Csg.failpy + 22
}
var da = 0;//转速 
var v = 30;
var result;
//
Csg.addAngel = function(x, type) {
	var type = type || 1;
	
	
	if(type == 1){
		return (x*500+25)/500;
	}else if(type == 2) {
		return (x*500-25)/500;
	}else if(type == 3) {
		if(Csg.is3fire) {
			Csg.is3fire = false;
			v = (Csg.dax - result - da) * 500;
			return Csg.dax;
		}
		if(Math.abs(v)>50) {
			v = v/Math.abs(v)*50
		}else if(Math.abs(v) < 5) {
			v = v/Math.abs(v)*(-1)*40
		}
		v = v+(Math.random()*4-2);
		result = (x*500+v)/500;
		return result;
	}
}
Csg.update = function() {
	
//	console.log(da)
	Csg.render();
	da = Csg.addAngel(da, Csg.stage);
	Csg.timer = window.requestAnimationFrame(Csg.update);
}
Csg.catchimg = function() {
	var bg = document.getElementById('firststage');
	bg.style.background = "url(img/bg"+Csg.stage+".png) 0 0/100% 100% no-repeat";
	
	Csg.fruitimg =  document.createElement("canvas");
	Csg.fruitimg.width = 4.7*Csg.rem;
    Csg.fruitimg.height = 4.7*Csg.rem;
    var ctx1 = Csg.fruitimg.getContext("2d");
    var roundImg1 = new Image();
    var imgsrc1 = "./img/fruit"+Csg.stage+".png";
    roundImg1.src = imgsrc1;
    roundImg1.onload = function() {
		ctx1.save();
    	ctx1.drawImage(roundImg1,0,0,Csg.fruitimg.width,Csg.fruitimg.height);
		ctx1.restore()
    }
    
    Csg.knifeimg =  document.createElement("canvas");
	Csg.knifeimg.width = 0.64*Csg.rem;
    Csg.knifeimg.height = 2*Csg.rem;
    var ctx2 = Csg.knifeimg.getContext("2d");
    var roundImg2 = new Image();
    var imgsrc2 = "./img/knife.png";
    roundImg2.src = imgsrc2;
    roundImg2.onload = function() {
		ctx2.save();
    	ctx2.drawImage(roundImg2,0,0,Csg.knifeimg.width,Csg.knifeimg.height);
		ctx2.restore()
    }  
    
    Csg.juiceimg =  document.createElement("canvas");
	Csg.juiceimg.width = 3.36*Csg.rem;
    Csg.juiceimg.height = 1.77*Csg.rem;
    var ctx3 = Csg.juiceimg.getContext("2d");
    var roundImg3 = new Image();
    var imgsrc3 = "./img/juice"+Csg.stage+".png";
    roundImg3.src = imgsrc3;
    roundImg3.onload = function() {
		ctx3.save();
    	ctx3.drawImage(roundImg3,0,0,Csg.juiceimg.width,Csg.juiceimg.height);
		ctx3.restore()
    }
    
//  Csg.juiceimg1 =  document.createElement("canvas");
//	Csg.juiceimg1.width = 0.42*Csg.rem;
//  Csg.juiceimg1.height = 0.46*Csg.rem;
//  var ctx4 = Csg.juiceimg1.getContext("2d");
//  var roundImg4 = new Image();
//  var imgsrc4 = "./img/juice"+Csg.stage+".png";
//  roundImg4.src = imgsrc4;
//  roundImg4.onload = function() {
//		ctx4.save();
//  	ctx4.drawImage(roundImg4,0,0,Csg.juiceimg1.width,Csg.juiceimg1.height);
//		ctx4.restore()
//  }
//  console.log('Csg.rem:'+Csg.rem)
    Csg.paint('juiceimg1', 0.42*Csg.rem, 0.46*Csg.rem);
    Csg.paint('juiceimg2', 0.42*Csg.rem, 0.46*Csg.rem);
    Csg.paint('juiceimg3', 0.15*Csg.rem, 0.29*Csg.rem);
    Csg.paint('juiceimg4', 0.15*Csg.rem, 0.29*Csg.rem);
}
Csg.paint = function(name, width, height) {
	Csg[name] =  document.createElement("canvas");
	Csg[name].width = width;
    Csg[name].height = height;
    var ctx4 = Csg[name].getContext("2d");
    var roundImg4 = new Image();
    var imgsrc4 = "./img/juice"+Csg.stage+"-"+name.slice(name.length-1,name.length)+".png";
    roundImg4.src = imgsrc4;
    roundImg4.onload = function() {
		ctx4.save();
    	ctx4.drawImage(roundImg4,0,0,Csg[name].width,Csg[name].height);
		ctx4.restore()
    }
//  console.log(ctx4)
}
Csg.util = {
	drawimg: function(type,px,py,width,height,rotate) {
		var type = type || 1, rotate = rotate || 0;
		if(type == 1) {
			type = 'knifeimg'
		}else if(type == 2) {
			type = 'fruitimg'
		}
		ctx.save();
    	ctx.translate(Csg.px, Csg.py);
    	ctx.rotate(rotate);
    	ctx.drawImage(Csg[type],-(width / 2) + px,-(height / 2) + py,width,height);
		ctx.restore()
	},
	drawimg2: function(px,py,width,height,rotate) {
		var rotate = rotate || 0, type = 'knifeimg';
		ctx.save();
    	ctx.translate(px, py);
    	ctx.rotate(rotate);
    	ctx.drawImage(Csg[type],-(width / 2),-(height / 2),width,height);
		ctx.restore()
	},
	drawjuice: function(px,py,rotate,time,pointcol) {//time是放大倍数
//		console.log(time)
		if(!time) return;
		var rotate = rotate || 0;
//		 time = (25 - time)*0.03 + 0.40
//		console.log(time)
		ctx.save();
    	ctx.translate(Csg.px, Csg.py);
//  	ctx.rotate(rotate);
		var timer = (25 - time) *0.3, y = py + pointcol[0][1]*timer, x = px + pointcol[0][0]*pointcol[0][1]*timer;
//		console.log(x,y)
    	ctx.drawImage(Csg['juiceimg1'],-(Csg['juiceimg1'].width / 2) + x,-(Csg['juiceimg1'].height / 2) + y,Csg['juiceimg1'].width,Csg['juiceimg1'].height);
    	
    	var timer = (25 - time) *0.3, y = py + pointcol[1][1]*timer, x = px + pointcol[1][0]*pointcol[1][1]*timer;
    	ctx.drawImage(Csg['juiceimg2'],-(Csg['juiceimg2'].width / 2) + x,-(Csg['juiceimg2'].height / 2) + y,Csg['juiceimg2'].width,Csg['juiceimg2'].height);
    	
    	var timer = (25 - time) *0.3, y = py + pointcol[2][1]*timer, x = px + pointcol[2][0]*pointcol[2][1]*timer;
    	ctx.drawImage(Csg['juiceimg3'],-(Csg['juiceimg3'].width / 2) + x,-(Csg['juiceimg3'].height / 2) + y,Csg['juiceimg3'].width,Csg['juiceimg3'].height);
    	
    	var timer = (25 - time) *0.3, y = py + pointcol[3][1]*timer, x = px + pointcol[3][0]*pointcol[3][1]*timer;
    	ctx.drawImage(Csg['juiceimg4'],-(Csg['juiceimg4'].width / 2) + x,-(Csg['juiceimg4'].height / 2) + y,Csg['juiceimg4'].width,Csg['juiceimg4'].height);
		ctx.restore()
		
	}
}
//初始化
Csg.init = function(obj) {
	cancelAnimationFrame(Csg.timer)
	var initData = {
		stage: 3,//第一局
		restknife: 12,//总共几把刀
		fireAfter: function() {},//发射后的事件回调
		letguo: false,
		failAfter: function() {console.log('fail')},
		successAfter: function() {},
	};
	
	var initData = jQuery.extend({},initData,obj)
	Csg.stage = initData.stage;
	Csg.fireAfter = initData.fireAfter;
	Csg.failAfter = initData.failAfter;
	Csg.successAfter = initData.successAfter;
	//总共几把刀可以射
	Csg.restknife = initData.restknife;
	Csg.is3fire = false;//是否是第三关的开火
	Csg.firetime = 0;
	Csg.letguo = initData.letguo;
	if(Csg.letguo) {
		Csg.limitfire = 1000;
	}else {
//		Csg.limitfire = 2;
		Csg.limitfire = Math.ceil(9+Math.random()*3);//10-12	
	}
	//获取屏幕宽高
	Csg.width = document.body.scrollWidth || document.documentElement.scrollWidth;
    Csg.height = document.body.scrollHeight || document.documentElement.scrollHeight;
   	Csg.rem = Csg.width / 10 * (1000 / Csg.width);    
	//旋转中心
	Csg.px = Csg.rem * 5; 
	Csg.py = Csg.rem * 5.5;
	//失败动画的刀的位置位置,旋转角度
	Csg.failpx = Csg.px;
	Csg.failpy = Csg.py + 3.3*Csg.rem;
	Csg.failrotate = 0;
	
	Csg.ifpass = true;
	Csg.failNexttick = false;
	
	Csg.fired = false;//是否已发射
	
	//开始时插在水果上的到的数量的集合
	Csg.KnifeCol = [
		[0, 360],
		[2, 180],
		[3, 120]
	];
	
	
	var initknife = [].concat(Csg.KnifeCol[Csg.stage-1]);
	//旋转的刀的集合,第1个元素是角度，第二个元素是喷果汁动画的帧数
	Csg.rollingKnifeCol = [];
	for(var a=0; a<initknife[0]; a++){
		var angel = initknife[1]*a, arr = [];
		arr.push(angel, 0);//帧数20
		Csg.rollingKnifeCol.push(arr);
	}
	Csg.catchimg();
	Csg.update();
//	window.requestAnimationFrame(Csg.update);
}

//Csg.init();
