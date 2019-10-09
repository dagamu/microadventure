const Victor = require('victor')

export default function devStools(ctx){
                if(this.dev){


                    //Games Limits
                    ctx.strokeStyle = 'red'
                    ctx.strokeRect(  this.canvas.width / 2 - this.myCell.pos.x,
                                        this.canvas.height / 2 - this.myCell.pos.y,
                                        this.canvas.width*2,
                                        this.canvas.height*2 )


                    //Direction Visualizton
                    var dMosueCell = this.mouse
                                            .clone()
                                            .subtract(new Victor( this.canvas.width/2, this.canvas.height/2))
                                            .normalize()
                                            .multiply(new Victor(this.myCell.r + 10, this.myCell.r + 5))
                                            .add(new Victor( this.canvas.width/2, this.canvas.height/2))

                     ctx.fillRect(dMosueCell.x, dMosueCell.y ,5,5)      



                    //Scale

                    var scl = 8

                    ctx.font = '12px Liberation Mono'
                    ctx.fillStyle = this.RGBAToHexA(255)


                    //Texto Escala
                    ctx.fillText('(1:'+ scl + ')',   this.canvas.width - 37 ,  this.canvas.height -  this.canvas.height * 2 / 7 - 5)

                    
                    //Map

                    var mapX = this.canvas.width -  this.canvas.width * 2 / scl;
                    var mapY = this.canvas.height -  this.canvas.height * 2 / scl;

                    ctx.strokeStyle = 'red'
                    ctx.strokeRect(  mapX,
                                        mapY,
                                        this.canvas.width * 2 / scl ,
                                        this.canvas.height * 2 / scl )


                    //Cell
                    ctx.fillStyle = this.RGBAToHexA(this.myCell.color.r, this.myCell.color.g, this.myCell.color.b)
                    ctx.fillRect( mapX  + this.myCell.pos.x / scl - this.myCell.r / scl ,
                                    mapY  + (this.myCell.pos.y - this.myCell.r) / scl,
                                    this.myCell.r * 2/scl,
                                    this.myCell.r * 2/scl
                                    )


                    //Cell Vision
                    ctx.strokeStyle = 'blue';
                    ctx.strokeRect( mapX + (this.myCell.pos.x -  this.canvas.width/2)/scl,
                                    mapY + (this.myCell.pos.y -  this.canvas.height/2)/scl,
                                     this.canvas.width/scl,
                                     this.canvas.height/scl
                                    )

                    //Virus
                    var showDevVirus =  function(virus){
                        ctx.fillRect( mapX  + virus.x / scl,
                                    mapY  + virus.y / scl,
                                    virus.d / scl,
                                    virus.d / scl
                                    )
                    }

                    ctx.fillStyle = 'pink'
                    this.virus.map(showDevVirus)


                    //Foods
                    var showDevFoods =  function(food){
                        ctx.fillRect( mapX  + food.x / scl,
                                    mapY  + food.y / scl,
                                    1,
                                    1
                                    )
                    }

                    ctx.fillStyle = this.RGBAToHexA(200)
                    this.foods.map(showDevFoods)



                    ctx.fillStyle = this.RGBAToHexA(255)

                    //LEFT

                    ctx.fillText( 'x: ' + Math.floor(this.myCell.pos.x), 10,20)
                    ctx.fillText( 'y: ' + Math.floor(this.myCell.pos.y), 10,35)

                    ctx.fillText( 'dir: ' + -this.myCell.dir.angleDeg().toFixed(2) + '°', 100, 20)

                    ctx.fillText( 'pause: ' + this.pause, 10,60)

                    ctx.fillText( 'Mouse: ', 10,90)
                    ctx.fillText( 'x: ' + this.mouse.x, 60,100)
                    ctx.fillText( 'y: ' + this.mouse.y, 60,115)

                    //RIGHT

                    ctx.fillText( 'Canvas Dimension: ' +  this.canvas.width + ' / ' +  this.canvas.height,  this.canvas.width - 200, 20)
                    ctx.fillText( 'Game Dimension: ' +  this.canvas.width * 2 + ' / ' +  this.canvas.height * 2,  this.canvas.width - 193, 35)

                    //BOTTOM RIGHT

                    ctx.font = '20px Noise Machine'
                    ctx.fillText('DGM',   this.canvas.width -  this.canvas.width * 2 / scl - 45,  this.canvas.height - 5)

                    



                    

                }
            }