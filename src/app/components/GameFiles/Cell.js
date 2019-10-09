const Victor = require('victor')


export default function Cell(canvas){

	var width = canvas.width;
	var height = canvas.height;

	var ctx = canvas.getContext('2d');

	var ellipse = function (x, y, r){

	    x = width / 2;
	    y = height / 2;

		ctx.beginPath();
        ctx.arc(x,y,r,0,Math.PI*2,true)
        ctx.fill()
    }

	function RGBAToHexA(r,g,b,a) {
	  r = r.toString(16);
	  g = g.toString(16);
	  b = b.toString(16);
	  a = Math.round(a * 255).toString(16);

	  if (r.length == 1)
	    r = "0" + r;
	  if (g.length == 1)
	    g = "0" + g;
	  if (b.length == 1)
	    b = "0" + b;
	  if (a.length == 1)
	    a = "0" + a;

	  return "#" + r + g + b + a;
	}


	this.pos = new Victor(width/2,height/2)
	this.r = width / 12;
	this.vel = 1;
	this.dir;
	this.exp = 0;
	this.lastFood = '';
	this.res = 1;
	this.life = 100

	this.color = {};

	this.update = function(mouseX, mouseY){

		width = canvas.width;
		height = canvas.height;

		this.dir = new Victor(mouseX - width / 2,mouseY - height / 2);
		this.dir = this.dir.normalize();
		this.dir.multiply(new Victor(3,3));

		var result = this.dir.multiply(new Victor(this.vel,this.vel));

		ctx.fillStyle = '#ff0000';

		ctx.beginPath();
	    ctx.moveTo(this.pos.x, this.pos.y);
	    ctx.lineTo(result.x, result.y);
	    ctx.closePath();
	    ctx.fill();

		this.pos.add(this.dir.multiply(new Victor(this.vel,this.vel)));
		
	};
	this.show = function(){
		ctx.stroke = 'white';
		ellipse(this.pos.x, this.pos.y ,this.r);
		ctx.fillStyle =  RGBAToHexA(this.color.r, this.color.g, this.color.b, 1);
		ellipse(this.pos.x, this.pos.y ,this.r - 5);

		//ctx.fillText('(' + Math.floor(this.pos.x) + ' , ' + Math.floor(this.pos.y) + ')', this.pos.x, this.pos.y - this.r - 10);

	};


}