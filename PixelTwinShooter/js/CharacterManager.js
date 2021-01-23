class CharacterManager {
    #_char_list;
    #_id_list;
    #_win;
    #player;
    constructor(win) {
        this.#_win = win;
        this.#_char_list = {};
    }

    get player() {
        return this.#player;
    }

    getCharacter(id) {
        return this.#_char_list[id];
    }

    addPlayerCharacter(socket, player_class, id, x=0, y=0, scale=0) {
        this.#_char_list[id] = new CharacterController(this.#_win, socket, player_class, id, x, y, scale);
        this.#player = this.#_char_list[id];
    }

    addNetworkCharacter(player_class, id, x=0, y=0, scale=0) {
        if(Object.keys(this.#_char_list).includes(id)){
            return;
        }
        this.#_char_list[id] = new NetworkCharacterController(this.#_win, player_class, id, x, y, scale);
        return this.#_char_list[id];
    }

    updateNetworkCharactorPosition(id, last_state, pos){
        this.#_char_list[id].updateAnimationAndPosition(last_state, pos);
    }

    removeNetworkCharacter(id) {
        delete this.#_char_list[id];
    }

    get relativePlayerPosition() {
        return this.#_win.relativeToCamera(this.#player.pos);
    }

    drawAllCharacters(id) {
        const np = this.relativePlayerPosition;
        var keys = Object.keys(this.#_char_list);
        for(var i = 0; i < keys.length; i++) {
            if(keys[i] != id){
                this.#_char_list[keys[i]].draw(np);
            }
        }
        this.#_char_list[id].draw();
    }
}
