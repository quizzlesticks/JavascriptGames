class GuiController {
    #_win;
    
    constructor(win) {
        this.#_win = win;
    }

    draw() {
        var ctx = this.#_win.context;
        ctx.save();
        ctx.fillStyle = "#524848d4";
        ctx.fillRect(this.#_win.width - this.#_win.gui_width, 0, this.#_win.gui_width, this.#_win.height);
        ctx.restore();
    }
}
