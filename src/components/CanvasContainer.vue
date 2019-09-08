<template>
    <div class="card">
        <div class="card-content iframeContainer">
            <!-- <vue-p5 v-on="{setup, draw}" id="canvasContainer" style="width:100%;height:100%"></vue-p5> -->
            <iframe width="750" height="440" src="https://editor.p5js.org/Dagamu110/embed/igodaxxUK"  frameborder="0" allowfullscreen></iframe>
        </div>
    </div>
</template>
<script>
import Cell from './GameFiles/Cell.js'

var canvasContainer;
var sk;

var cell;

var CSize;


export default {    
    methods:{

        setup(sk){

            canvasContainer = document.querySelector('#canvasContainer')
            sk.canvas.style = "width:95%; max-height: 550px; display:block; margin:auto";

            

            this.windowResized(sk);

            cell = new Cell(sk);

            CSize = [
                 { canvasWidth: sk.canvas.clientWidth, canvasHeight: sk.canvas.clienHeight }, 
                 {  canvasWidth: sk.canvas.clientWidth, canvasHeight: sk.canvas.clientHeight }
            ];

            console.log(sk)

        },
        draw(sk){

            sk.background(150);
            // cell.show();

            CSize[0].canvasWidth = CSize[1].canvasWidth;
            CSize[0].canvasHeight = CSize[1].canvasHeight;

            CSize[1].canvasWidth = sk.canvas.clientWidth;
            CSize[1].canvasHeight = sk.canvas.clientHeight;

            // console.table(CSize)

            if( CSize[0].canvasWidth != CSize[1].canvasWidth || CSize[0].canvasHeight != CSize[1].canvasHeight ){
                this.windowResized(sk)
            }

           


        },
        windowResized(sk){

            var s = getComputedStyle(sk.canvas);
            var w = s.width;
            var h = s.height;

            sk.width =  w.split('px')[0];
            sk.height = h.split('px')[0];

            sk.canvas.removeAttribute('width');
            sk.canvas.removeAttribute('height');
            
             
        }


    }
};


</script>
<style scoped lang="css">
    .iframeContainer{
        position: relative;
        padding-bottom: 56.25%;
        height: 0;
        overflow: hidden;
    }

    .iframeContainer iframe{
        position: absolute;
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>
