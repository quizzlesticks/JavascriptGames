const win = new WindowManager();
const sock = io('http://192.168.1.7:8080');
const gui = new ItemGui(win);
const cm = new CharacterManager(win);
const ssm = win.ssm;
const map = new MapManager(ssm);

ssm.loadAllCharacterClasses(AnimationProfiles);
map.loadAllMaps();
const char_select = new CharSelectGui(win, charSelected);

char_select.start();

function charSelected(){
    cm.addPlayerCharacter(sock, char_select.selected_char, sock.id);
    sock.emit('player_selected', {char_select: char_select.selected_char, pos: cm.player.pos, last_state: {state: "idle", key: "KeyS"}});
    ssm.load("/Spritesheets/bow_test.png", "bow", 34, 34, 1, 1);
    ssm.whenFinishedLoading = initGame;
    delete char_select;
}

var game_initialized = false;

function initGame() {
    game_initialized = true;
    window.requestAnimationFrame(animate);
}

function animate() {
    //just to see where the map tiling fails
    win.clearWindow("#ff0000");
    map.draw(cm.player.pos, cm.player.camerapos);
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
    if(game_initialized){
        cm.updateNetworkCharactorPosition(data.id, data.last_state, data.pos);
    }
}
