const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 800;

const sprite_folder = "./Spritesheets/";
const github_link = "https://raw.githubusercontent.com/quizzlesticks/JavascriptGames/master/PixelTwinShooter/Spritesheets/";

ctx.fillStyle = "red";
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.imageSmoothingEnabled = false;

var ssm = new SpriteSheetManager(ctx);
ssm.load(sprite_folder + "Sprite-0001.png", "player", 44, 44, 1, 2);
ssm.defineAnimationLoop("player", 0, 1);
ssm.load(sprite_folder + "green.png", "green", 64,72,4,3);
ssm.defineAnimationLoop("green", 0, 11);
ssm.load(sprite_folder + "PlayerAttack01.png", "knight", 32,32,1,6);
ssm.defineAnimationLoop("knight", 0, 5);
ssm.load(sprite_folder + "bow_test.png", "bow", 34,34,1,1);
ssm.whenFinishedLoading = initGame;

ctx.fillStyle = "red";

function initGame() {
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    setInterval(drawBoiLoop, 250);
}

function drawBoiLoop() {
    window.requestAnimationFrame(animate);
}

function animate() {
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ssm.drawNext("player",10,10,64,64);
    ssm.drawNext("green",100,100, 64, 64);
    ssm.drawNext("knight",500,400,200,200)
    ssm.drawSprite("bow",0,300,400);
}
