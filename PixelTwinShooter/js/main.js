const win = new WindowManager();
const gui = new GuiController(win);
const ssm = win.ssm;
const sprite_folder = "./Spritesheets/";

win.clearWindow("red");

ssm.load(sprite_folder + "RedRidingHoodMovement.png", "player_moving", 34, 34, 1, 8);
ssm.load(sprite_folder + "RedRidingHoodAttack.png", "player_attack", 46, 34, 4, 2);
var char = new CharacterController(win, "player_moving", "player_attack");
ssm.whenFinishedLoading = initGame;

function initGame() {
    setInterval(loop, 250);
}

function loop() {
    window.requestAnimationFrame(animate);
}

function animate() {
    win.clearWindow("#00aa00");
    char.draw();
    gui.draw();
}
