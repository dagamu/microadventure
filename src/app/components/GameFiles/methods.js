import devStools from './devStools.js'

const Victor = require('victor')

export default {
	
            draw: function(ctx){

                ctx.fillStyle = this.RGBAToHexA(20)
                ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);


                this.myCell.show();
                if (!this.pause) {
                    this.myCell.update(this.mouse.x,this.mouse.y, this.myCell)
                }


                this.foods.map(this.showFood)
                this.virus.map(this.showVirus)

                ctx.fillStyle = 'gray';
                ctx.fillRect(10,this.canvas.height-20,100,10)

                ctx.fillStyle = 'red';
                ctx.fillRect(10,this.canvas.height-20,this.myCell.life,10)

                this.devStools(ctx);
            },
            showFood: function(food){

                    food.x += this.canvas.width / 2 -  this.myCell.pos.x;
                    food.y += this.canvas.height / 2 -  this.myCell.pos.y;


                    this.canvas.ctx.fillStyle = this.RGBAToHexA(food.c.r, food.c.g, food.c.b);
                    this.ellipse(food.x, food.y, food.r, this.canvas.ctx);
                    this.canvas.ctx.fillStyle = this.RGBAToHexA(255)
                    //ctx.fillText('(' + Math.floor(food.x) + ' , ' + Math.floor(food.y) + ')', food.x, food.y - 10);

                    if(this.circlesCollision( food.x, food.y, food.r,
                                                this.canvas.width / 2,
                                                this.canvas.height / 2,
                                                this.myCell.r - 5  )){
                        this.foods.splice( this.foods.indexOf(food), 1)
                        this.addFood()
                        this.myCell.exp++
                        this.myCell.lastFood = food.type
                        this.exComunication()

                        if(food.type == 'Lipido'){
                            this.myCell.r += 0.5
                        } else if(food.type == 'Carbohidrato'){
                            this.myCell.vel += 0.02
                        } else if (food.type == 'Proteina'){
                            this.myCell.res += 1
                        }
                    }

                    food.x -= this.canvas.width / 2 -  this.myCell.pos.x;
                    food.y -= this.canvas.height / 2 -  this.myCell.pos.y;


            },
            showVirus: function(virus){

                    virus.x += this.canvas.width / 2 -  this.myCell.pos.x;
                    virus.y += this.canvas.height / 2 -  this.myCell.pos.y;


                    this.canvas.ctx.fillStyle = this.RGBAToHexA(255, 0, 0);
                    this.canvas.ctx.fillRect(virus.x, virus.y, virus.d, virus.d);
                    this.canvas.ctx.fillStyle = this.RGBAToHexA(255)
                    //ctx.fillText('(' + Math.floor(food.x) + ' , ' + Math.floor(food.y) + ')', food.x, food.y - 10);

                    var otherVirus = this.virus[Math.floor(Math.random() * this.virus.length)]

                    var dCell = new Victor(this.myCell.pos.y - virus.x, this.myCell.pos.y - virus.y)
                    
                    var dstLimits = []
                    var limitsPoints = [this.canvas.width / 2 - this.myCell.pos.x,
                                        this.canvas.height / 2 - this.myCell.pos.y,
                                        this.canvas.width*2,
                                        this.canvas.height*2]

                     /* for (var i = 1; i <= 4; i++) {
                        if(!i==4){
                            //this.dstLimits.push(this.dstPointLine(virus.x,virus.y, limitsPoints[i] , limitsPoints[i+1]))
                        }else{
                            //this.dstLimits.push(this.dstPointLine(virus.x,virus.y, limitsPoints[i] , limitsPoints[0]))
                        }
                    } */


                    if(this.circleRectCollision( this.canvas.width / 2,
                                                    this.canvas.height / 2,
                                                    this.myCell.r - 5,
                                                    virus.x,
                                                    virus.y,
                                                    virus.d,
                                                    virus.d)){
                        this.virus.splice( this.virus.indexOf(virus), 1)
                        this.myCell.life -= 10 / this.myCell.res
                    }

                    virus.x -= this.canvas.width / 2 -  this.myCell.pos.x;
                    virus.y -= this.canvas.height / 2 -  this.myCell.pos.y;


                },
            keyCheck: function(e) {

                if ((e.keyCode == 114  || e.keyCode == 114) && e.ctrlKey) {
                    this.dev = !this.dev
                }
                if( e.keyCode == 80){

                    this.pause = !this.pause
                }
            },
            mouseCheck: function(e){
                if (e.which == 5 ) {
                    this.dev = !this.dev
                }
            },
            dblHandle: function(e){
                if(e.which == 1){
                    this.pause = !this.pause
                }
            },
            exComunication: function(myCell){
                var cellEncoded = {
                    x: Math.floor(this.myCell.pos.x),
                    y: Math.floor(this.myCell.pos.y),
                    r: Math.floor(this.myCell.r),
                    lastFood: this.myCell.lastFood

                }
                this.$store.commit('updateCell', cellEncoded ) 
            },
            moveMouse: function(e){

                var canvasPosition =  this.canvas.obj.getBoundingClientRect()

                this.mouse.x = e.clientX - canvasPosition.left
                this.mouse.y = e.clientY - canvasPosition.top


            },
            addFood: function(num = 1){
                for (var i = num - 1; i >= 0; i--) {
                    var type = this.constData.typesFood[Math.floor(Math.random() * this.constData.typesFood.length)]

                    this.foods.push({
                        x: Math.floor(Math.random() * this.canvas.width * 2),
                        y: Math.floor(Math.random() * this.canvas.height * 2),
                        r: 5,
                        type,
                        c: this.constData.colorsFood[type]
                    })
                }
            },
            addVirus: function(num = 1){
                for (var i = num - 1; i >= 0; i--) {
                    this.virus.push({
                        x: Math.floor(Math.random() * this.canvas.width * 2),
                        y: Math.floor(Math.random() * this.canvas.height * 2),
                        d: 25,
                        dir: new Victor(1,1)
                    })
                }
            },
            ellipse: function (x, y, r, ctx){

                ctx.beginPath();
                ctx.arc(x,y,r,0,Math.PI*2,true)
                ctx.fill()
            },
            circlesCollision: function(x1,y1,r1,x2,y2,r2){

                var d = Math.sqrt( (x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2) );

                if ( d < r1 + r2 ) {
                    return true
                } else {
                    return false
                }
            },
            circleRectCollision: function(cx,cy,cr,rx,ry,rw,rh){

                var testX = cx;
                var testY = cy;

                if(cx < rx){
                    testX = rx
                } else if (cx > rx + rw){
                    testX = rx +rw
                }

                if(cy < ry){
                    testY = ry
                } else if( cy > ry + rh){
                    testY = ry + rh
                }

                var distX = cx - testX;
                var distY = cy - testY;
                var dist = Math.sqrt( (distX*distX) + (distY*distY) )

                if(dist <= cr){
                    return true
                }else{
                    return false
                }


                
            },
            RGBAToHexA: function(r,g = r ,b = r,a = 1) {
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
            },
            resize: function(){

                this.canvas.width = this.canvasContainer.clientWidth;0
                this.canvas.height = this.canvas.width / 2

                this.canvas.obj.width = this.canvas.width
                this.canvas.obj.height = this.canvas.height
            },
            devStools
        
}