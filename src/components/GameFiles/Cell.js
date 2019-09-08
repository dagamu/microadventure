export default function Cell(sk) {

	this.pos = [50,50];
	this.r = 10;

	this.dir = [0,0];

	this.udpate = function (){
		this.pos[0] += this.dir[0];
		this.pos[1] += this.dir[1];
	};

	this.show = function (){
		sk.ellipse( this.pos[0], this.pos[1], this.r);
	};

}