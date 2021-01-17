class CharacterController{
    #_key_states = {"KeyS": false,
               "KeyD": false,
               "KeyA": false,
               "KeyW": false};

    #_mousedown = false;
    #pos = {x: undefined, y: undefined};

    #_mouse_zoning = {slope: undefined, top_b: undefined, bottom_b: undefined};

    #_win;

    #_animator;

    constructor(window_manager, player_class, id, x=0, y=0, scale=0) {
        this.#_win = window_manager;
        if(!x && !y) {
            x = this.#_win.player_space_width/2;
            y = this.#_win.player_space_height/2;
        }
        this.#_animator = new CharacterAnimatable(window_manager, player_class, x, y);
        this.x = x;
        this.y = y;
        this.#_mouse_zoning.slope = this.#_win.player_space_height/this.#_win.player_space_width;
        this.#_mouse_zoning.top_b = this.#pos.y - this.#_mouse_zoning.slope * this.#pos.x;
        this.#_mouse_zoning.bottom_b = this.#pos.y + this.#_mouse_zoning.slope * this.#pos.x - this.#_win.player_space_height;
        this.updateAnimation = this.updateAnimation.bind(this);
        window.addEventListener("keydown", this.updateAnimation);
        window.addEventListener("keyup", this.updateAnimation);
        window.addEventListener("mousedown", this.updateAnimation);
        window.addEventListener("mousemove", this.updateAnimation);
        window.addEventListener("mouseup", this.updateAnimation);
    }

    get x() {
        return this.#pos.x;
    }

    get y() {
        return this.#pos.y;
    }

    get pos() {
        return this.#pos;
    }

    set x(x) {
        this.#pos.x = x;
        this.#_animator.x = x;
    }

    set y(y) {
        this.#pos.y = y;
        this.#_animator.y = y;
    }

    set pos(p) {
        this.#pos = p;
        this.#_animator.pos = p;
    }

    draw() {
        this.#_animator.draw();
        if(this.#_win.debug) {
            //intersecting lines on player
            var ctx = this.#_win.context;
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = "#ff0000";
            ctx.moveTo(0,this.#topZoningLine(0));
            ctx.lineTo(this.#_win.player_space_width, this.#topZoningLine(this.#_win.player_space_width));
            ctx.stroke();
            ctx.beginPath();
            ctx.strokeStyle = "#ffffff";
            ctx.moveTo(0,this.#bottomZoningLine(0));
            ctx.lineTo(this.#_win.player_space_width, this.#bottomZoningLine(this.#_win.player_space_width));
            ctx.stroke();
            //shows keys
            ctx.beginPath();
            ctx.strokeStyle = "white";
            ctx.fillStyle = "black";
            ctx.strokeRect(70, 10, 50, 50);
            if(this.#_key_states["KeyW"])
                ctx.fillRect(70, 10, 50, 50);
            ctx.strokeRect(10, 70, 50, 50);
            if(this.#_key_states["KeyA"])
                ctx.fillRect(10, 70, 50, 50);
            ctx.strokeRect(70, 70, 50, 50);
            if(this.#_key_states["KeyS"])
                ctx.fillRect(70, 70, 50, 50);
            ctx.strokeRect(130, 70, 50, 50);
            if(this.#_key_states["KeyD"])
                ctx.fillRect(130, 70, 50, 50);
            ctx.restore();
        }
    }

    #_zone = undefined;
    updateAnimation(event) {
        if(event.type == "keydown" && this.#_key_states[event.code]){
            return;
        }
        if(event.type == "mousedown") {
            this.#_mousedown = true;
            this.#_zone = this.#findMouseZone(this.#_win.mouseToCanvas({x: event.clientX, y: event.clientY}));
            this.#_animator.animate("attack", this.#_zone);
            return;
        }
        if(this.#_mousedown) {
            if(event.type == "mousemove") {
                var mp = this.#_win.mouseToCanvas({x: event.clientX, y: event.clientY});
                var zone = this.#findMouseZone(mp);
                if(zone != this.#_zone) {
                    this.#_animator.animate("attack", zone);
                    this.#_zone = zone;
                }
            }else if(Object.keys(this.#_key_states).includes(event.code)){
                this.#_key_states[event.code] = event.type == "keydown";
                return;
            }else if(event.type == "mouseup") {
                this.#_mousedown = false;
                for (state in this.#_key_states){
                    if(this.#_key_states[state]){
                        this.#_animator.animate("move", state);
                        return;
                    }
                }
                this.#_animator.animate("idle", this.#_zone);
                return;
            }
        }
        if(event.type == "mousemove" || event.type == "mouseup" || !Object.keys(this.#_key_states).includes(event.code)){
            return;
        }
        var state = event.type == "keydown";
        if(state && !this.#_key_states[event.code]) {
            this.#_animator.animate("move", event.code);
            this.#_key_states[event.code] = state;
        }else if(!state) {
            this.#_key_states[event.code] = state;
            for (var st in this.#_key_states){
                if(this.#_key_states[st]){
                    this.#_animator.animate("move", st);
                    return;
                }
            }
            this.#_animator.animate("idle", event.code);
        }
    }

    #findMouseZone(mp) {
        //If we are exactly on the player return zone 0 (right)
        if(mp.x == this.x && mp.y == this.y){
            return "KeyD";
        }
        //If we are under the top line (positive for canvas, in standard cartesian this is the one with negative slope and we are 'under' it)
        if(mp.y >= this.#topZoningLine(mp.x)) {
            //then we are in either zone 2 or 3
            //If we are under the bottom line
            if(mp.y >= this.#bottomZoningLine(mp.x)) {
                //We are in zone 3
                return "KeyS";
            } else {
                //Otherwise we must be in zone 2
                return "KeyA";
            }
        } else {
            //Otherwise we are in either zone 0 or 1
            //If we are under the bottom line
            if(mp.y >= this.#bottomZoningLine(mp.x)) {
                //We are in zone 0
                return "KeyD";
            } else {
                //Otherwise we are in zone 1
                return "KeyW";
            }
        }
    }

    #topZoningLine(x) {
        return this.#_mouse_zoning.slope*x + this.#_mouse_zoning.top_b;
    }

    #bottomZoningLine(x) {
        return this.#_win.player_space_height - this.#_mouse_zoning.slope*x + this.#_mouse_zoning.bottom_b;
    }
}
