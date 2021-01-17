const win = new WindowManager();
const sock = new SocketHandler();
const gui = new ItemGui(win);
const ssm = win.ssm;

var char;
ssm.loadAllCharacterClasses(AnimationProfiles);
const char_select = new CharSelectGui(win, charSelected);

char_select.start();
//sock.send('message');
//sock.emit('player_pos_update', {x:0,y:0});

function charSelected(){
    char = new CharacterController(win, char_select.selected_char, sock.id);
    ssm.load("/Spritesheets/bow_test.png", "bow", 34, 34, 1, 1);
    ssm.whenFinishedLoading = initGame;
    delete char_select;
}

function initGame() {
    setInterval(animate, 250);
}

function animate() {
    win.clearWindow("#00aa00");
    char.draw();
    gui.draw();
    //ssm.drawSprite("bow",0,win.player_space_width+25,600);
    //ssm.drawSprite("bow",0,win.player_space_width+25+50,600);
    //ssm.drawSprite("bow",0,win.player_space_width+25+100,600);
    //ssm.drawSprite("bow",0,win.player_space_width+25+150,600);
}
