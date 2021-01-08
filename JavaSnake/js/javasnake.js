const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d");

canvas.height = 400;
canvas.width = 1220;

const settings = {
	game_speed: 500,
	width: 20,
	snake_color: "#0000FF"
};

class piece {
	constructor(x,y) {
		this.x = x;
		this.y = y;
	}
	
	draw(prev_body) {
		this.x = prev_body.x;
		this.y = prev_body.y;
		context.fillStyle = settings.snake_color;
		context.fillRect(this.x,this.y,settings.width,settings.width);
	}
}

const player = {
	x: 0,
	y: 0,
	up: false,
	down: false,
	left: false,
	right: true,
	snake_body: [new piece(-20,0)],
	space_flag: false,
	keyListener: function(event) {
		switch(event.code) {
			case "ArrowUp":
				player.up = true;
				player.down = false;
				player.left = false;
				player.right = false;
				break;
			case "ArrowDown":
				player.up = false;
				player.down = true;
				player.left = false;
				player.right = false;
				break;
			case "ArrowLeft":
				player.up = false;
				player.down = false;
				player.left = true;
				player.right = false;
				break;
			case "ArrowRight":
				player.up = false;
				player.down = false;
				player.left = false;
				player.right = true;
				break;
			case "Space":
				player.space_flag = true;
				break;
		}
	},
	draw: function() {
		if(player.space_flag){
			player.space_flag = false;
			player.snake_body.push(new piece(0,0));
		}
		let new_x = player.snake_body[0].x;
		let new_y = player.snake_body[0].y;
		if(player.up){
			new_y = player.snake_body[0].y - settings.width;
		} else if(player.down){
			new_y = player.snake_body[0].y + settings.width;
		} else if(player.right){
			new_x = player.snake_body[0].x + settings.width;
		} else {
			new_x = player.snake_body[0].x - settings.width;
		}
		for (let i = player.snake_body.length - 1; i>0; i--) {
			player.snake_body[i].draw(player.snake_body[i-1]);
			if(player.snake_body[i].x == new_x && player.snake_body[i].y == new_y)
			{
				window.close();
			}
		}
		player.snake_body[0].draw({x: new_x, y: new_y});
	}
};


let prev_time;
const loop = function(time) {
	if (prev_time === undefined)
		prev_time = time;
	if(time - prev_time > settings.game_speed)
	{
		drawBoard();
		player.draw();
		prev_time = time;
	}
	window.requestAnimationFrame(loop);
};

const drawBoard = function() {
	context.fillStyle = "#201A23";
	context.fillRect(0,0,canvas.width,canvas.height);
	for (let i=0; i<=canvas.height/settings.width;i++) {
		context.beginPath();
		context.strokeStyle = 'white';
		if(i==0) {
			context.moveTo(0,settings.width*i+1);
			context.lineTo(canvas.width,settings.width*i+1);
		} else if(i==canvas.height/settings.width) {
			context.moveTo(0,settings.width*i-1);
			context.lineTo(canvas.width,settings.width*i-1);
		} else {
			context.moveTo(0,settings.width*i);
			context.lineTo(canvas.width,settings.width*i);
		}
		context.stroke();
	}
	for (let i=0; i<=canvas.width/settings.width;i++) {
		context.beginPath();
		context.strokeStyle = 'white';
		if(i==0) {
			context.moveTo(settings.width*i+1,0);
			context.lineTo(settings.width*i+1,canvas.height);
		} else if(i==canvas.width/settings.width) {
			context.moveTo(settings.width*i-1,0);
			context.lineTo(settings.width*i-1,canvas.height);
		} else {
			context.moveTo(settings.width*i,0);
			context.lineTo(settings.width*i,canvas.height);
		}
		context.stroke();
	}
};
drawBoard();
player.draw();
window.addEventListener("keydown", player.keyListener);
window.requestAnimationFrame(loop);
