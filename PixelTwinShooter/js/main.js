const win = new WindowManager();
const sock = new SocketHandler();
const gui = new GuiController(win);
const ssm = win.ssm;
const sprite_folder = "/spritesheets/";

win.clearWindow("red");

// ssm.load(sprite_folder + "RedRidingHoodMovement.png", "RedRidingHoodMovement", 34, 34, 1, 8);
// ssm.load(sprite_folder + "RedRidingHoodAttack.png", "RedRidingHoodAttack", 46, 34, 4, 2);
// var char = new CharacterController(win, "RedRidingHoodMovement", "RedRidingHoodAttack");
ssm.load(sprite_folder + "SciGuyMovement.png", "SciGuyMovement", 34, 34, 4, 3);
ssm.load(sprite_folder + "SciGuyAttack.png", "SciGuyAttack", 34, 34, 4, 2);
var char = new CharacterController(win, "SciGuyMovement", "SciGuyAttack");
ssm.load(sprite_folder + "bow_test.png", "bow", 34, 34, 1, 1);
ssm.whenFinishedLoading = initGame;

sock.send('message');
sock.emit('player_pos_update', {x:0,y:0});
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
