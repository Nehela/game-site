document.addEventListener('DOMContentLoaded', () => {
    var cvs = document.getElementById("snake");
    var ctx = cvs.getContext("2d");
    //console.log(cvs);

    const grid = 32;

    var ground = document.getElementById("img");

    const foodImg = new Image();
    foodImg.src = "assets/img/grapes.png";


    let dead = new Audio();
    let eat = new Audio();
    let leftRight = new Audio();
    let upDown = new Audio();

    dead.src = "assets/img/Dead.mp3";
    eat.src = "assets/img/Eat.mp3";
    upDown.src = "assets/img/Up and Down.mp3";
    leftRight.src = "assets/img/Left and Right.mp3";
   




    let snake = [];

    snake[0] = { 
        x : 9 * grid,
        y : 10 * grid
    };

    let food = {
        x : Math.floor(Math.random()*17+1)*grid,
        y :  Math.floor(Math.random()*15+3)*grid,
    }

    let score=0;
    let d;
    document.addEventListener("keydown",(e)=>{
        let k = e.keyCode;
        if(k === 37 && d!="right"){
            d="left";
            leftRight.play();
        }else if(k == 38 && d!="down"){
            d="up";
            upDown.play();
        }else if(k == 39 && d!="left"){
            d="right";
            leftRight.play();
        }else if(k == 40 && d!="up"){
            d="down";
            upDown.play();
        }
            console.log(d);
    })

    function gameOver(){
        if(confirm("Game Over\nDo you want to restart ?")){
            location.reload();
        }
    }


    function collision(head,array){
        for(let i = 0; i < array.length; i++){
            if(head.x == array[i].x && head.y == array[i].y){
                return true;
            }
        }
        return false;
    }

    function draw(){
        ctx.drawImage(ground,0,0);
        for(let i =0; i < snake.length ; i++){
            ctx.fillStyle = (i ===0)? "#9c0872" : "black";
            ctx.fillRect(snake[i].x,snake[i].y,grid,grid);

            ctx.strokeStyle ="white";
            ctx.strokeRect(snake[i].x,snake[i].y,grid,grid);
        }

        ctx.drawImage(foodImg,food.x,food.y);

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if(d=="left") snakeX -= grid;
        if(d=="up") snakeY -= grid;
        if(d=="right") snakeX += grid;
        if(d=="down") snakeY += grid;

        if(snakeX == food.x && snakeY== food.y){ 
            score++;
            eat.play();
            food = {
                x : Math.floor(Math.random()*17+1)*grid,
                y :  Math.floor(Math.random()*15+3)*grid,
            }        
        }else{
            snake.pop();
        }
        let newpos ={
            x : snakeX,
            y : snakeY
        }
        if(snakeX < grid || snakeX > 17 * grid || snakeY < 3* grid|| snakeY > 17*grid || collision(newpos,snake)){
            clearInterval(game);
            dead.play();
            gameOver();
        }
        
        snake.unshift(newpos);

    ctx.fillStyle = "white";
    ctx.font = "45px roboto";
    ctx.fillText(score,2.5*grid,1.6*grid);
    
    }

    var game = setInterval(draw,100);

 
})