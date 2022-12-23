
// -------------------------------------------- Version [v.4.2] -------------------------------------------- 

var t = "00:00:00";
function Squ(col, x, y, sX, sY, siz) {
	ctx.beginPath();
	ctx.lineWidth = siz ? siz : 1;
	ctx.strokeStyle = col;
	ctx.rect(x, y, sX, sY);
	ctx.stroke();
}
function Fill(a, b, c, d, e){ctx.fillStyle = a;ctx.fillRect(b, c, d, e)} // col, x, y, wi, he
function Fill_ou(a, b, c, d, e, ou_col, alpha, siz){
	ctx.globalAlpha = alpha ? alpha : 1;
	Fill(a, b, c, d, e);
	Squ(ou_col, b, c, d-1, e-1, siz);
	alpha ? ctx.globalAlpha = 1: false;
} // col, x, y, wi, he
function Circ(col, x, y, siz, alpha){
	ctx.beginPath();
	ctx.arc(x, y, siz, 0, 2*Math.PI);
	ctx.strokeStyle="#000";
	ctx.globalAlpha = alpha ? alpha : 1;
	ctx.stroke();
	ctx.fillStyle=col;ctx.fill();
}
function Circ_ou(col, x, y, siz, ou_col, alpha){
	Circ(ou_col, x, y, siz, alpha);
	Circ(col, x, y, siz-1, alpha);
}
function Txt(col, txt, x, y, siz){ctx.fillStyle=col;ctx.font="30px arial";ctx.font = siz;ctx.fillText(txt, x, y)}
function Txt_(col, txt, x, y, col_, txt_, x_, y_, siz){ctx.fillStyle=col;ctx.font="30px arial";ctx.font = siz;ctx.fillText(txt, x, y);ctx.fillStyle=col_;ctx.font = siz;ctx.fillText(txt_, x_, y_)}

function rd(min, max, precyzja) { // liczby -5, 3 sprowadzic do 1, 9, i juz, działa
	var rNum = Math.floor(Math.random()*max)+min;
	if(precyzja) while(rNum > max) rNum = Math.floor(Math.random()*max)+min;
	return rNum
} // new rd() cant rd(0, 1) do naprawy... kiedyś.. 

function rd_color() {var letters='0123456789ABCDEF';var color='#';for (var i=0;i<6;i++) {color += letters[rd(0,15)];}return color}
function time_h_m_s() {if(t=="00:00:00") {var s=0;m=0+"0";h=0+"0"}s++;if(s<=9)s="0"+s;if(s>=60){s=0;m++;if(s==0)s="00";if(m<=9)m="0"+m;if(m>=60){m=0;	h++;if(h<=9) h="0"+h;if(h>=24) h+=76;}}t=h+":"+m+":"+s;}
//setInterval(time_h_m_s, 1000);
function Txt_ou(col, text, x, y, siz, ou_siz, opacity){ctx.font=siz;ctx.globalAlpha=opacity?opacity:1;ctx.strokeStyle='black';ctx.lineWidth=ou_siz?ou_siz:3;ctx.strokeText(text,x,y);ctx.fillStyle=col;ctx.fillText(text,x,y);ctx.globalAlpha=1;}
function Colision(e1, e2, doIt, EL) {if((e1.x+e1.sizX>=e2.x && e1.x<=e2.x+e2.sizX)&&(e1.y+e1.sizY>=e2.y && e1.y<=e2.y+e2.sizY)) {doIt(EL)}}
function copyToClipboard(text) {var dummy = document.createElement("textarea");document.body.appendChild(dummy);dummy.value = text;dummy.select();document.execCommand("copy");document.body.removeChild(dummy);} //copyToClipboard('hello world');
function getMousePos(canvas,evt){var rect=canvas.getBoundingClientRect();return{x:evt.clientX-rect.left,y:evt.clientY-rect.top,sizX:.001,sizY:.001, siz:.001}}
function chance(Lm,Re){/* Lm = Liczba Możliwości ; Re = Ilość Powtórzeń */sum = 0;if(Re>0){for(var i=1;i<=Re;i++){sum=(Lm**(i+1))+sum;}sum += Lm;}else sum=Lm;console.log("1:"+sum.toLocaleString());return sum}

var fTx_iter = -1; // -1 = 0
var fTx = [];
function ftx_add(col, txt, x, y, anim, spd, opacity, siz) {
	fTx_iter++; // ++
	fTx[fTx_iter] = {
		id: fTx_iter, 										//ID
		col: col,		txt: txt,			x: x,		y: y,  // color, txt, x, y
		anim: anim*2, 										// anim czyli czas animacji - dając 100 spada do 0 z predkoscią fps
		spd: spd/2,
		opacity: opacity ? opacity : 1,
		siz: siz ? siz : "20px segoe ui",
		
	};
}
//ftx_add("#fff", "TEST", 200, 200, 30, 1);

function f_text() {
	for(var i=0; i<=fTx_iter; i++) {
		if(fTx[i].anim > 0) {
			SPD = fTx[i].spd + fTx[i].spd * fTx[i].anim *.005;
			if(fTx[i].anim > 2) { // txt w gore
				fTx[i].y -= SPD;
				fTx[i].x += SPD/25;
			} else { //txt lekko w dół 
				fTx[i].y += SPD;
			}
			
			fTx[i].opacity >= .1 ? fTx[i].opacity -= .015 : 1;  // Zamien to na Fade_spd
			fTx[i].anim--;
			
			Txt_ou(fTx[i].col, fTx[i].txt, fTx[i].x, fTx[i].y, fTx[i].siz, 3, fTx[i].opacity);
		}
	}
}

//f_text.prototype.constructor();


function Img(IMG_source, x, y, sizX, sizY) {
	ctx.drawImage(
		IMG_source,
		x, y, sizX ? sizX : IMG_source.width, sizY ? sizY : IMG_source.height
	);
}

function Colision_circ(e1, e2, doIt) { // [x, y, siz]
	var dx = e1.x - e2.x;
	var dy = e1.y - e2.y;
	var distance = Math.sqrt(dx * dx + dy * dy);
	
	if (distance < e1.siz + e2.siz) doIt()
}



// to FIX TIME


/*
Log:
 - [21.04.2019] Fixed rd() function ver. 2
 - [21.04.2019] Fixed rd() function ver. 2.1
 - [04.05.2019] Added Txt_ou() function ver. 2.2
 - [06.05.2019] Added Fill_ou() function ver. 2.3
 - [07.05.2019] Added Colision() function ver. 2.5
 - [??.06.2019] Added copyToClipboard() function ver. 2.7
 - [22.06.2019] Moved getMousePos() function ver. 2.8
 - [02.07.2019] Added chance() function ver. 2.9
 - [20.07.2019] Added f_text() function ver. 3.1
 - [08.10.2019] Fixed rd() function ver. 3.2
 - [06.02.2020] Added Img() function ver. 3.3
 - [08.02.2020] Added Colision_circ() function ver. 3.4
 - [08.02.2020] Added "range" to getMousePos() function ver. 3.4
 - [10.02.2020] Added "alpha" to Fill_ou() function ver. 3.5
 - [10.02.2020] Added Squ() function ver. 3.6
 - [10.02.2020] Changed Fill_ou() function ver. 3.7
 - [01.04.2020] Fixed Fill_ou() function ver. 3.8
 - [18.06.2020] Added Circ_ou() function ver. 3.9
 - [02.04.2021] Added EL in Colision function ver. 4.0
 - [09.04.2021] Edited values in Fill_ou function ver. 4.1
 - [09.04.2021] Added siz in Fill_ou function ver. 4.2


 
 
 
*/