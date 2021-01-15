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
ssm.load(sprite_folder + "RedRidingHoodMovement.png", "player", 34, 34, 1, 8);
ssm.defineAnimationLoop("player", 0, 7);
var char = new CharacterController(window, ssm, "player");
ssm.whenFinishedLoading = initGame;

ctx.fillStyle = "red";

function initGame() {
    ctx.fillStyle = "#00aa00";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    setInterval(drawBoiLoop, 250);
}

function drawBoiLoop() {
    window.requestAnimationFrame(animate);
}

function animate() {
    ctx.fillStyle = "#005500";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ssm.drawNext("player",canvas.width/2-34/2,canvas.height/2-34/2,1.5);
}
