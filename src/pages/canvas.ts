import "../styles/common.scss"
import "../styles/canvas.scss"

const canvas = document.querySelector('#canvas-1') as HTMLCanvasElement;
canvas.width=300;
canvas.height=300;
const c = canvas.getContext('2d') as CanvasRenderingContext2D;
c.beginPath();
c.arc(100, 100, 30, 0, Math.PI * 2, false);
c.fill();

function fallingBalls(){
    const canvas = document.querySelector('#canvas-2') as HTMLCanvasElement;
    const c = canvas.getContext('2d') as CanvasRenderingContext2D;
    canvas.width = 300;
    canvas.height = 300;
    const balls:{x:number,y:number,radius:number,color:string,velocity:{x:number,y:number}}[] = [];
    const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];
    const gravity = 1;
    const friction = 0.99;
    for(let i=0;i<20;i++){
        balls.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 30,
            color: colors[Math.floor(Math.random() * colors.length)],
            velocity: {
                x: (Math.random() - 0.5) * 4,
                y: 1
            }
        })
    }
    function animate(){
        c.clearRect(0, 0, canvas.width, canvas.height);
        for(let i=0;i<balls.length;i++){
            c.beginPath();
            c.arc(balls[i].x, balls[i].y, balls[i].radius, 0, Math.PI * 2, false);
            c.fillStyle = balls[i].color;
            c.fill();
            if(balls[i].y + balls[i].radius + balls[i].velocity.y > canvas.height){
                balls[i].velocity.y = -balls[i].velocity.y * friction;
            } else {
                balls[i].velocity.y += gravity;
            }
            if(balls[i].x + balls[i].radius + balls[i].velocity.x > canvas.width || balls[i].x - balls[i].radius + balls[i].velocity.x < 0){
                balls[i].velocity.x = -balls[i].velocity.x;
            }
            balls[i].x += balls[i].velocity.x;
            balls[i].y += balls[i].velocity.y;
        }
        requestAnimationFrame(animate);
    }
    animate();
}fallingBalls();

function collisionBalls(){
    const canvas = document.querySelector('#canvas-3') as HTMLCanvasElement;
    const c = canvas.getContext('2d') as CanvasRenderingContext2D;
    canvas.width = 300;
    canvas.height = 300;
    const balls:{x:number,y:number,radius:number,color:string,velocity:{x:number,y:number}}[] = [];
    const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];
    const gravity = 1;
    const friction = 0.99;
    for(let i=0;i<20;i++){
        balls.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 30,
            color: colors[Math.floor(Math.random() * colors.length)],
            velocity: {
                x: (Math.random() - 0.5) * 4,
                y: (Math.random() - 0.5) * 4
            }
        })
    }
    function animate(){
        c.clearRect(0, 0, canvas.width, canvas.height);
        for(let i=0;i<balls.length;i++){
            c.beginPath();
            c.arc(balls[i].x, balls[i].y, balls[i].radius, 0, Math.PI * 2, false);
            c.fillStyle = balls[i].color;
            c.fill();
            for(let j=0;j<balls.length;j++){
                if(i !== j){
                    const dx = balls[i].x - balls[j].x;
                    const dy = balls[i].y - balls[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if(distance < balls[i].radius + balls[j].radius){
                        balls[i].velocity.x = -balls[i].velocity.x;
                        balls[i].velocity.y = -balls[i].velocity.y;
                        balls[j].velocity.x = -balls[j].velocity.x;
                        balls[j].velocity.y = -balls[j].velocity.y;
                    }
                }
            }
            if(balls[i].y + balls[i].radius + balls[i].velocity.y > canvas.height || balls[i].y - balls[i].radius + balls[i].velocity.y < 0){
                balls[i].velocity.y = -balls[i].velocity.y;
            }
            if(balls[i].x + balls[i].radius + balls[i].velocity.x > canvas.width || balls[i].x - balls[i].radius + balls[i].velocity.x < 0){
                balls[i].velocity.x = -balls[i].velocity.x;
            }
            balls[i].x += balls[i].velocity.x;
            balls[i].y += balls[i].velocity.y;
        }
        requestAnimationFrame(animate);
    }
    animate();
}collisionBalls();