const win = new WindowManager();
const gui = new GuiController(win);
const ssm = win.ssm;
const sprite_folder = "./Spritesheets/";

win.clearWindow("red");

// ssm.load(sprite_folder + "RedRidingHoodMovement.png", "RedRidingHoodMovement", 34, 34, 1, 8);
// ssm.load(sprite_folder + "RedRidingHoodAttack.png", "RedRidingHoodAttack", 46, 34, 4, 2);
// var char = new CharacterController(win, "RedRidingHoodMovement", "RedRidingHoodAttack");
ssm.load(sprite_folder + "SciGuyMovement.png", "SciGuyMovement", 34, 34, 4, 3);
ssm.load(sprite_folder + "SciGuyAttack.png", "SciGuyAttack", 34, 34, 4, 2);
var char = new CharacterController(win, "SciGuyMovement", "SciGuyAttack");
ssm.load(sprite_folder + "bow_test.png", "bow", 34, 34, 1, 1);
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
    ssm.drawSprite("bow",0,win.player_space_width+25,600);
    ssm.drawSprite("bow",0,win.player_space_width+25+50,600);
    ssm.drawSprite("bow",0,win.player_space_width+25+100,600);
    ssm.drawSprite("bow",0,win.player_space_width+25+150,600);
}
