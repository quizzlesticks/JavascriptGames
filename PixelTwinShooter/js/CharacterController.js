class CharacterController {
    #states = {"KeyS": false,
               "KeyD": false,
               "KeyA": false,
               "KeyW": false};

    #animations = {"KeyS": {start: 0, stop: 1},
                   "KeyD": {start: 2, stop: 3},
                   "KeyA": {start: 4, stop: 5},
                   "KeyW": {start: 6, stop: 7}};

    #_ssm;
    #_name;

    constructor(window, ssm, name) {
        this.#_ssm = ssm;
        this.#_name = name;
        this.updateMovement = this.updateMovement.bind(this);
        ssm.defineAnimationLoop(name,0,0);
        window.addEventListener("keydown", this.updateMovement);
        window.addEventListener("keyup", this.updateMovement);
    }

    updateMovement(keyEvent) {
        var code = keyEvent.code;
        if(!Object.keys(this.#states).includes(code)){
            return;
        }
        var state = keyEvent.type == "keydown";
        if(state && !this.#states[keyEvent.code]) {
            this.#_ssm.defineAnimationLoop(this.#_name, this.#animations[keyEvent.code].start, this.#animations[keyEvent.code].stop);
            this.#states[keyEvent.code] = state;
        }else if(!state) {
            this.#states[keyEvent.code] = state;
            for (state in this.#states){
                if(this.#states[state]){
                    this.#_ssm.defineAnimationLoop(this.#_name, this.#animations[state].start, this.#animations[state].stop);
                    return;
                }
            }
            this.#_ssm.defineAnimationLoop(this.#_name, this.#animations[keyEvent.code].start, this.#animations[keyEvent.code].start);
        }
    }
}
