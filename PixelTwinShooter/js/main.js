const win = new WindowManager();
win.debug = true;
Math.seedrandom("troy");
const sock = io();
const gui = new ItemGui(win);
const cm = new CharacterManager(win);
const ssm = win.ssm;
const map = new MapManager(win);


map.render();
var map_image;
createImageBitmap(win.canvas).then(assignMapImage);

function assignMapImage(img) {
    map_image = img;
    game_initialized += 1
}

ssm.loadAllCharacterClasses(AnimationProfiles);
const char_select = new CharSelectGui(win, charSelected);
char_select.start();

function charSelected(){
    cm.addPlayerCharacter(sock, char_select.selected_char, sock.id);
    sock.emit('player_selected', {char_select: char_select.selected_char, pos: cm.player.pos, last_state: {state: "idle", key: "KeyS"}});
    ssm.load("/Spritesheets/bow_test.png", "bow", 34, 34, 1, 1);
    ssm.whenFinishedLoading = initGame;
}

const game_start = 2;
var game_initialized = 0;

function initGame() {
    game_initialized += 1;
}

window.requestAnimationFrame(animate);

function animate() {
    //just to see where the map tiling fails
    if(game_initialized != game_start) {
        window.requestAnimationFrame(animate);
        return;
    }
    var p = cm.player.pos;
    var cp = cm.player.camerapos;
    var np = {x: cp.x - p.x, y: cp.y - p.y};
    win.context.drawImage(map_image, 0,0, win.width, win.height, np.x*128,np.y*128, win.width*128, win.height*128);
    cm.drawAllCharacters(sock.id);
    gui.draw();
    ssm.drawSprite("bow",0,win.player_space_width+25,600);
    ssm.drawSprite("bow",0,win.player_space_width+25+50,600);
    ssm.drawSprite("bow",0,win.player_space_width+25+100,600);
    ssm.drawSprite("bow",0,win.player_space_width+25+150,600);
    window.requestAnimationFrame(animate);
}

sock.on('player_selected', newNetworkCharactor);
sock.on('player_left', deleteNetworkCharactor);
sock.on('player_move', updateNetworkCharactor);

function newNetworkCharactor(data){
    var keys = Object.keys(data);
    var cur;
    for(var i = 0; i < keys.length; i++) {
        if(keys[i] != sock.id) {
            cur = data[keys[i]];
            cm.addNetworkCharacter(cur.char_select, cur.id);
            cm.updateNetworkCharactorPosition(cur.id, cur.last_state, cur.pos);
        }
    }
}

function deleteNetworkCharactor(data){
    cm.removeNetworkCharacter(data);
}

function updateNetworkCharactor(data){
    if(game_initialized == game_start){
        cm.updateNetworkCharactorPosition(data.id, data.last_state, data.pos);
    }
}
