<template>
    <div class="card">
        <div class="card-content iframeContainer" style="padding: 0" id="cContainer">
            <!-- /<iframe  src="https://editor.p5js.org/Dagamu110/embed/igodaxxUK"  frameborder="0" allowfullscreen style="width: 100%"></iframe> -->
            <canvas id="canvas"></canvas>
        </div>
    </div>
</template>
<script>
import Cell from './GameFiles/Cell.js'
const Victor = require('victor')


var myCell;
var foods;
var width;
var height;

var mouseX = 0;
var mouseY = 0;


var colors = [ 
  {
    r: 211,
    g:47,
    b: 47
  },
  {
    r: 3,
    g:155,
    b: 229
  },
  {
    r: 255,
    g:143,
    b: 0
  },
  {
    r: 124,
    g:179,
    b: 66
  }
  
]
var typesCell = ['Lipido', 'Carbohidrato', 'Proteina'];

export default {    
        data(){
            return {
                dev: false,
                pause: false
            }
        },
        mounted: function () {
            var container = document.getElementById('cContainer');
            var canvas = document.getElementById('canvas');
            var ctx = canvas.getContext('2d');

            canvas.width = container.clientWidth
            canvas.height = canvas.width / 2

            myCell = new Cell(canvas);

            foods = [];


            myCell.color = colors[Math.floor(Math.random() * colors.length)]

            ctx.font = "12px Arial";


            var FPS = 20;

            var draw = this.draw
            var exComunication = this.exComunication

            // Main loop
            setInterval(function() {
                draw(ctx);
            },1000/FPS);

            setInterval(function() {
                exComunication(myCell);
            },1000);


            var resize = function(){
                width = canvas.width;
                height = canvas.height;
            }
            resize()

            this.addFood(80)

            var moveMouse = function(e){

                var canvasPosition = canvas.getBoundingClientRect()

                mouseX = e.clientX - canvasPosition.left
                mouseY = e.clientY - canvasPosition.top

            }


            window.addEventListener('resize', resize)

            var keyCheck = this.keyCheck
            var mouseCheck = this.mouseCheck
            var dblHandle = this.dblHandle

            document.addEventListener('keydown', keyCheck);
            document.addEventListener('mousedown', mouseCheck);
            document.addEventListener('dblclick', dblHandle);
            

            canvas.addEventListener('mousemove', moveMouse , false);

        },
        methods: {
            draw: function(ctx){

                ctx.fillStyle = this.RGBAToHexA(20)
                ctx.fillRect(0, 0, width, height);


                myCell.show();
                if (!this.pause) {
                    myCell.update(mouseX,mouseY)
                }

                this.devStools(ctx);

                var RGBAToHexA = this.RGBAToHexA;
                var ellipse = this.ellipse;
                var addFood = this.addFood;
                var circlesCollision = this.circlesCollision;



                foods.map(function(food){


                    food.x += width / 2 - myCell.pos.x;
                    food.y += width / 2 - myCell.pos.y;


                    ctx.fillStyle = RGBAToHexA(food.c.r, food.c.g, food.c.b);
                    ellipse(food.x, food.y, food.r, ctx);
                    ctx.fillStyle = RGBAToHexA(255)
                    //ctx.fillText('(' + Math.floor(food.x) + ' , ' + Math.floor(food.y) + ')', food.x, food.y - 10);

                    if(circlesCollision( food.x, food.y, food.r, width / 2, height / 2, myCell.r - 5)){
                        foods.splice( foods.indexOf(food), 1)
                        addFood()
                        myCell.exp++
                    }

                    food.x -= width / 2 - myCell.pos.x;
                    food.y -= width / 2 - myCell.pos.y;


                })

            },
            devStools: function(ctx){
                if(this.dev){
                    ctx.strokeStyle = 'red'
                    ctx.strokeRect( width / 2 - myCell.pos.x, height / 2 - myCell.pos.y, width*2, height*2 )

                    var dMosueCell = new Victor(mouseX,mouseY)
                                                    .subtract(new Victor(width/2,height/2))
                                                    .normalize()
                                                    .multiply(new Victor(myCell.r + 10, myCell.r + 5))
                                                    .add(new Victor(width/2,height/2))

                     ctx.fillRect(dMosueCell.x, dMosueCell.y ,5,5)                               

                    //Scale

                    var scl = 8

                    ctx.font = '12px Liberation Mono'
                    ctx.fillStyle = this.RGBAToHexA(255)

                    ctx.fillText('(1:'+ scl + ')',  width - 37 , height - height * 2 / 7 - 5)

                    ctx.strokeStyle = 'red'
                    ctx.strokeRect( width - width * 2 / scl, height - height * 2 / 7 ,width * 2 / scl , height * 2 / 7 )

                    ctx.fillStyle = this.RGBAToHexA(myCell.color.r, myCell.color.g, myCell.color.b)
                    ctx.fillRect( (width - width * 2 / scl)  + myCell.pos.x / scl - myCell.r / scl / 2,
                                    (height - height * 2 / scl)  + (myCell.pos.y - myCell.r * 3) / scl,
                                    myCell.r/scl,
                                    myCell.r/scl
                                    )

                    ctx.strokeStyle = 'blue';
                    ctx.strokeRect( (width - width * 2 / scl) + (myCell.pos.x - width/2)/scl,
                                    (height - height * 2 / scl) + (myCell.pos.y - height/2)/scl - myCell.r*2/scl,
                                    width/scl,
                                    height/scl
                                    )

                    var RGBAToHexA = this.RGBAToHexA

                    foods.map(function(food){
                        ctx.fillStyle = RGBAToHexA(200)
                        ctx.fillRect( (width - width * 2 / scl)  + food.x / scl,
                                    (height - height * 2 / scl)  + food.y / scl,
                                    1,
                                    1
                                    )
                    })



                    ctx.fillStyle = this.RGBAToHexA(255)

                    //LEFT

                    ctx.fillText( 'x: ' + Math.floor(myCell.pos.x), 10,20)
                    ctx.fillText( 'y: ' + Math.floor(myCell.pos.y), 10,35)

                    ctx.fillText( 'dir: ' + -myCell.dir.angleDeg().toFixed(2) + '°', 100, 20)

                    ctx.fillText( 'pause: ' + this.pause, 10,60)

                    ctx.fillText( 'Mouse: ', 10,90)
                    ctx.fillText( 'x: ' + mouseX, 60,100)
                    ctx.fillText( 'y: ' + mouseY, 60,115)

                    //RIGHT

                    ctx.fillText( 'Canvas Dimension: ' + width + ' / ' + height, width - 200, 20)
                    ctx.fillText( 'Game Dimension: ' + width * 2 + ' / ' + height * 2, width - 193, 35)

                    //BOTTOM RIGHT

                    ctx.font = '20px Noise Machine'
                    ctx.fillText('DGM',  width - width * 2 / scl - 45, height - 5)

                    




                }
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
                console.log(e.which)
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
                    x: Math.floor(myCell.pos.x),
                    y: Math.floor(myCell.pos.y),
                    r: Math.floor(myCell.r)
                }
                this.$store.commit('updateCell', cellEncoded ) 
            },
            addFood: function(num = 1){
                for (var i = num - 1; i >= 0; i--) {
                    foods.push({
                        x: Math.floor(Math.random() * width * 2),
                        y: Math.floor(Math.random() * height * 2),
                        r: 5,
                        type: typesCell[Math.floor(Math.random() * typesCell.length)],
                        c: colors[Math.floor(Math.random() * colors.length)]
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
            }
        }
    }


</script>

