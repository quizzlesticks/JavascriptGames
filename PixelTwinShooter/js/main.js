const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 750;

const sprite_folder = "./Spritesheets/";

ctx.fillStyle = "red";
ctx.fillRect(0,0,canvas.width,canvas.height);

var ssm = new SpriteSheetManager(ctx);
ssm.load(sprite_folder + "Sprite-0001.png", "player", 44, 44, 1, 2);
ssm.defineAnimationLoop("player", 0, 1);
ssm.load(sprite_folder + "green.png", "green", 64,72,4,3);
ssm.defineAnimationLoop("green", 0, 11);
ssm.whenFinishedLoading = initGame;

function initGame() {
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    setInterval(drawBoiLoop, 250);
}

function drawBoiLoop() {
    window.requestAnimationFrame(animate);
}

function animate() {
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ssm.drawNext("player",10,10);
    ssm.drawNext("green",100,100);
}
