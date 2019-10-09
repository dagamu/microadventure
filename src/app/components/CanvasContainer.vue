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
import methods from './GameFiles/methods.js'

const Victor = require('victor')

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
var typesFood = ['Lipido', 'Carbohidrato', 'Proteina'];
var colorsFood = {
        Lipido: {
            r:255,
            g:255,
            b:255
        },
        Carbohidrato: {
            r: 3,
            g:155,
            b: 229
        },
        Proteina:{
            r: 211,
            g:47,
            b: 47
          }
}

export default {    
        data(){
            return {
                dev: false,
                pause: false,
                canvas: {
                        width: 0,
                        height: 0,
                        obj: '',
                        ctx: ''
                },
                canvasContainer: '',
                myCell: '',
                mouse: new Victor(),
                foods: [],
                virus: [],
                constData: {
                    colors,
                    typesFood,
                    colorsFood
                }
            }
        },
        mounted: function () {
            this.canvasContainer = document.getElementById('cContainer');
            this.canvas.obj = document.getElementById('canvas');
            var ctx = this.canvas.obj.getContext('2d');
            this.canvas.ctx = this.canvas.obj.getContext('2d');

            this.canvas.obj.width = this.canvasContainer.clientWidth
            this.canvas.obj.height = this.canvas.obj.width / 2

            this.myCell = new Cell(this.canvas.obj);



            this.myCell.color = colors[Math.floor(Math.random() * colors.length)]

            ctx.font = "12px Arial";


            var FPS = 20;

            var draw = this.draw
            var exComunication = this.exComunication

            // Main loop
            setInterval(function() {
                draw(ctx)
            },1000/FPS);

            setInterval(function() {
                exComunication(this.myCell);
            },1000);

            this.canvas.width = this.canvasContainer.clientWidth;
            this.canvas.height =  this.canvasContainer.clientWidth / 2;
      

            this.addFood(80)
            this.addVirus(10)

            var cnv = this.canvas.obj

            window.addEventListener('resize', this.resize)

            var keyCheck = this.keyCheck
            var mouseCheck = this.mouseCheck
            var dblHandle = this.dblHandle

            document.addEventListener('keydown', keyCheck);
            document.addEventListener('mousedown', mouseCheck);
            document.addEventListener('dblclick', dblHandle);
            

             this.canvas.obj.addEventListener('mousemove', this.moveMouse , false);


        },
        methods
    }


</script>

