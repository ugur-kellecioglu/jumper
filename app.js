const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight

function drawRoad(){
    ctx.fillStyle = "green"
    ctx.fillRect(0, canvas.height/2+ 100, canvas.width, 300)
}
class Player{
    constructor(x, y, height, width){
        this.x = x
        this.y = y
        this.height = height
        this.width = width
    }

    draw(){
        ctx.fillStyle = "black"
        ctx.clearRect(0,0, canvas.width, canvas.height)
        ctx.fillRect(this.x,this.y,this.width, this.height)
    }

    jump(){
        if(this.y >= canvas.height/2 -80){
            gsap.to(this,{
                y: this.y - 80
            })
        }
        /*
        if(this.y === canvas.height/2){
            gsap.to(this,{
                y: this.y - 80
            })
        }
        else{
            gsap.to(this,{
                y: this.y -100
            })
        }
        setTimeout(() => {
            if(this.y  < canvas.height/2){
                gsap.to(this,{
                    y: canvas.height/2
                })
            }
        }, 1000);
        */
        
    }
    land(){
        if(this.y  < canvas.height/2){
            gsap.to(this,{
                y: canvas.height/2
            })
        }
    }
}
const player = new Player(100, canvas.height/2, 100, 100)

class Obstacle{
    constructor(x, y, height, width, color){
        this.x = x
        this.y = y
        this.height = height
        this.width = width
        this.color = color
    }

    draw(){
        
        ctx.fillStyle = "hsl("+this.color+")"
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    update(){
        this.x -= 10
    }
}
var obstacles = []
setInterval(() => {
    let color = Math.random()*256
    let w = Math.floor((Math.random()*(50-20)+20))
    let h = Math.floor((Math.random()*(50-20)+20))
    let obsHeight = (player.height-h+(canvas.height/2))
    obstacles.push(new Obstacle(canvas.width, obsHeight, h, w, (color+', 100%, 50%')))
}, 1000);

let scoreEl = document.getElementById('score')
let score = 0
function animate(){
    requestAnimationFrame(animate)

    player.draw()
    drawRoad()
    obstacles.forEach((obstacle) =>{
        obstacle.draw()
        obstacle.update()
    })
   
    obstacles.forEach((obstacle, index) => {
        if(obstacle.x < 0){
            obstacles.splice(index,1)
            score++
            scoreEl.innerHTML = score
        }
    })
}

animate()

document.addEventListener('keydown', (e) => {
    if(e.key === " "){
        player.jump()
    }
})
document.addEventListener('keyup', (e) =>{
    if(e.key === " "){
        player.land()
    }
})