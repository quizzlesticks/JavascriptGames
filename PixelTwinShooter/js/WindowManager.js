class WindowManager {
    #_canvas;
    #_context;
    #_height;
    #_width;
    #_gui_width;
    #_ssm;
    #_smoothing;
    #_default_scale = 2;
    #_debug = false;
    #_spritefolder = "/Spritesheets";

    constructor(width=1000, height=800, gui_width=250, smoothing=false) {
        this.#_canvas = document.getElementById('canvas');
        this.#_context = this.#_canvas.getContext("2d");
        this.resizeWindow(width, height);
        this.#_gui_width = gui_width;
        this.#_ssm = new SpriteSheetManager(this.#_context);
        this.smoothing = smoothing;
    }

    resizeWindow(width,height){
        this.#_width = width;
        this.#_height = height;
        this.#_canvas.width = width;
        this.#_canvas.height = height;
    }

    clearWindow(color="black"){
        this.#_context.save();
        this.#_context.fillStyle = color;
        this.#_context.fillRect(0,0,canvas.width,canvas.height);
        this.#_context.restore();
    }

    get spritefolder() {
        return this.#_spritefolder;
    }

    get debug() {
        return this.#_debug;
    }

    set scale(s = 2) {
        this.#_default_scale = s;
    }

    get scale() {
        return this.#_default_scale;
    }

    get canvas() {
        return this.#_canvas;
    }

    get context() {
        return this.#_context;
    }

    get ssm() {
        return this.#_ssm;
    }

    get width() {
        return this.#_width;
    }

    get height() {
        return this.#_height;
    }

    set smoothing(s) {
        this.#_smoothing = s;
        this.#_context.imageSmoothingEnabled = s;
    }

    get smoothing() {
        return this.#_smoothing;
    }

    get player_space_width() {
        return this.#_width - this.#_gui_width;
    }

    get player_space_height() {
        return this.#_height;
    }

    get gui_width() {
        return this.#_gui_width;
    }

    mouseToCanvas(pos) {
        var rect = this.#_canvas.getBoundingClientRect();
        return {x: pos.x - rect.left, y: pos.y - rect.top};
    }
}
