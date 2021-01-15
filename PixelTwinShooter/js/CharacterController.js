class CharacterController {

    #key_states = {"KeyS": false,
               "KeyD": false,
               "KeyA": false,
               "KeyW": false};

    #mousedown = false;
    #position = { real: { moving: {x: undefined, y: undefined},
                          attacking: {x: undefined, y: undefined}},
                  centered: {x: undefined, y: undefined}
                };
    #x_centering_offset_moving;
    #y_centering_offset_moving;
    #x_centering_offset_attacking;
    #y_centering_offset_attacking;
    #mouse_zoning = {slope: undefined, top_b: undefined, bottom_b: undefined};

    #_scale;

    #_win;
    #_moving_name;
    #_attacking_name;

    #_animation_profile;

    constructor(window_manager, moving_name, attacking_name, x=0, y=0, scale=0) {
        this.#_win = window_manager;
        this.#_moving_name = moving_name;
        this.#_attacking_name = attacking_name;
        if(this.#_moving_name == "SciGuyMovement") {
            this.#_animation_profile = SciGuyAnimProfile;
        }else if(this.#_moving_name == "RedRidingHoodMovement"){
            this.#_animation_profile = RedRidingHoodAnimProfile;
        }else{
            throw new Error("NO ANIM PROFILE");
        }
        if(!scale){
            scale = this.#_win.scale;
        }
        this.#_scale = scale;
        this.#x_centering_offset_moving = this.#_win.ssm.getSheet(this.#_moving_name).width*this.#_scale/2;
        this.#y_centering_offset_moving = this.#_win.ssm.getSheet(this.#_moving_name).height*this.#_win.scale/2;
        this.#x_centering_offset_attacking = this.#_win.ssm.getSheet(this.#_attacking_name).width*this.#_scale/2;
        this.#y_centering_offset_attacking = this.#_win.ssm.getSheet(this.#_attacking_name).height*this.#_win.scale/2
        if(!x && !y) {
            x = this.#_win.player_space_width/2;
            y = this.#_win.player_space_height/2;
        }
        this.x = x;
        this.y = y;
        this.#mouse_zoning.slope = this.#_win.player_space_height/this.#_win.player_space_width;
        this.#mouse_zoning.top_b = this.#position.centered.y - this.#mouse_zoning.slope * this.#position.centered.x;
        this.#mouse_zoning.bottom_b = this.#position.centered.y + this.#mouse_zoning.slope * this.#position.centered.x - this.#_win.player_space_height;
        this.updateAnimation = this.updateAnimation.bind(this);
        ssm.defineAnimationLoop(this.#_moving_name,0,0);
        ssm.defineAnimationLoop(this.#_attacking_name,0,0);
        window.addEventListener("keydown", this.updateAnimation);
        window.addEventListener("keyup", this.updateAnimation);
        window.addEventListener("mousedown", this.updateAnimation);
        window.addEventListener("mousemove", this.updateAnimation);
        window.addEventListener("mouseup", this.updateAnimation);
    }

    get real_x_moving() {
        return this.#position.real.moving.x;
    }

    get real_y_moving() {
        return this.#position.real.moving.y;
    }

    get real_x_attacking() {
        return this.#position.real.attacking.x;
    }

    get real_y_attacking() {
        return this.#position.real.attacking.y;
    }

    get centered_x() {
        return this.#position.centered.x;
    }

    get centered_y() {
        return this.#position.centered.y;
    }

    get x() {
        return this.#position.centered.x;
    }

    get y() {
        return this.#position.centered.y;
    }

    set x(x) {
        this.#position.centered.x = x;
        this.#position.real.moving.x = x - this.#x_centering_offset_moving;
        this.#position.real.attacking.x = x - this.#x_centering_offset_attacking;
    }

    set y(y) {
        this.#position.centered.y = y;
        this.#position.real.moving.y = y - this.#y_centering_offset_moving;
        this.#position.real.attacking.y = y - this.#y_centering_offset_attacking;
    }

    set scale(s) {
        this.#_scale = s;
    }

    get scale() {
        return this.#_scale;
    }

    draw() {
        if(this.#mousedown) {
            this.#_win.ssm.drawNext(this.#_attacking_name, this.#position.real.attacking.x, this.#position.real.attacking.y, this.#_scale);
        } else {
            this.#_win.ssm.drawNext(this.#_moving_name, this.#position.real.moving.x, this.#position.real.moving.y, this.#_scale);
        }
        if(this.#_win.debug) {
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
            ctx.restore();
        }
    }

    #_zone = undefined;
    updateAnimation(event) {
        if(event.type == "mousedown") {
            this.#mousedown = true;
            this.#_zone = this.#findMouseZone(this.#_win.mouseToCanvas({x: event.clientX, y: event.clientY}));
            this.#_win.ssm.defineAnimationLoop(this.#_attacking_name, this.#_animation_profile.attack_animations[this.#_zone].start, this.#_animation_profile.attack_animations[this.#_zone].stop);
            return;
        }
        if(this.#mousedown) {
            if(event.type == "mousemove") {
                var mp = this.#_win.mouseToCanvas({x: event.clientX, y: event.clientY});
                var zone = this.#findMouseZone(mp);
                if(zone != this.#_zone) {
                    this.#_win.ssm.defineAnimationLoop(this.#_attacking_name, this.#_animation_profile.attack_animations[zone].start, this.#_animation_profile.attack_animations[zone].stop);
                    this.#_zone = zone;
                }
            }else if(Object.keys(this.#key_states).includes(event.code)){
                this.#key_states[event.code] = event.type == "keydown";
                return;
            }else if(event.type == "mouseup") {
                this.#mousedown = false;
                for (state in this.#key_states){
                    if(this.#key_states[state]){
                        this.#_win.ssm.defineAnimationLoop(this.#_moving_name, this.#_animation_profile.move_animations[state].start, this.#_animation_profile.move_animations[state].stop);
                        return;
                    }
                }
                this.#_win.ssm.defineAnimationLoop(this.#_moving_name, this.#_animation_profile.idle_animations[this.#_zone].start, this.#_animation_profile.idle_animations[this.#_zone].stop);
                return;
            }
        }
        if(event.type == "mousemove" || event.type == "mouseup" || !Object.keys(this.#key_states).includes(event.code)){
            return;
        }
        var state = event.type == "keydown";
        if(state && !this.#key_states[event.code]) {
            this.#_win.ssm.defineAnimationLoop(this.#_moving_name, this.#_animation_profile.move_animations[event.code].start,
                                                                   this.#_animation_profile.move_animations[event.code].stop);
            this.#key_states[event.code] = state;
        }else if(!state) {
            this.#key_states[event.code] = state;
            for (var st in this.#key_states){
                if(this.#key_states[st]){
                    this.#_win.ssm.defineAnimationLoop(this.#_moving_name, this.#_animation_profile.move_animations[st].start,
                                                                           this.#_animation_profile.move_animations[st].stop);
                    return;
                }
            }
            this.#_win.ssm.defineAnimationLoop(this.#_moving_name, this.#_animation_profile.idle_animations[event.code].start,
                                                                   this.#_animation_profile.idle_animations[event.code].start);
        }
    }

    #findMouseZone(mp) {
        //If we are exactly on the player return zone 0 (right)
        if(mp.x == this.#position.centered_x && mp.y == this.#position.centered_y){
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
        return this.#mouse_zoning.slope*x + this.#mouse_zoning.top_b;
    }

    #bottomZoningLine(x) {
        return this.#_win.player_space_height - this.#mouse_zoning.slope*x + this.#mouse_zoning.bottom_b;
    }
}
