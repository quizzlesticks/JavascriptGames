class SpriteSheet {
    constructor(filename, width, height, rows, cols, callback) {
        this._width = width;
        this._height =  height;
        this._cols = cols;
        this._rows = rows;
        this._img = new Image();
        this._img.src = filename;
        this._img.onload = callback;
    }

    get img() {
        return this._img;
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    get cols() {
        return this._cols;
    }
    get rows() {
        return this._rows;
    }
}

class SpriteSheetManager {
    #loaded_count = 0;
    #loading_count = 0;
    #finished_loading = false;
    #finished_new_loading = false;
    #throwaway_callback = true;
    constructor(ctx, throwaway_callback = true) {
        this.SpriteSheetList = new Map();
        this.imgLoaded = this.imgLoaded.bind(this);
        this.ctx = ctx;
        this.#throwaway_callback = throwaway_callback;
    }

    imgLoaded() {
        this.#loaded_count += 1;
        if(this.#loaded_count == this.#loading_count) {
            this.#finished_loading = true;
            if(this.callback) {
                this.callback();
                if(this.#throwaway_callback) {
                    this.callback = undefined;
                }
            }
        }
    }

    load(filename, name, width, height, rows, cols) {
        this.#finished_loading = false;
        this.#loading_count += 1;
        this.SpriteSheetList[name] = {sheet: new SpriteSheet(filename, width, height, rows, cols, this.imgLoaded), startIndex: 0, curIndex: 0, endIndex: 0};
    }

    getSheet(name) {
        return this.SpriteSheetList[name].sheet;
    }

    drawSprite(name, index, dx, dy, dWidth = 0, dHeight = 0) {
        var cur = this.SpriteSheetList[name].sheet;
        if(index >= cur.cols*cur.rows){
            throw new Error("Requested unobtainable sprite.");
        }
        if(!dWidth){
            dWidth = cur.width;
        }
        if(!dHeight){
            dHeight = cur.height;
        }
        this.ctx.drawImage(cur.img, (index%cur.cols)*cur.width, Math.floor(index/cur.cols)*cur.height, cur.width, cur.height, dx, dy, dWidth, dHeight);
    }

    defineAnimationLoop(name, start, end, currentIndex=-1) {
        if(currentIndex == -1) {
            currentIndex = start;
        }
        this.SpriteSheetList[name].startIndex = start;
        this.SpriteSheetList[name].curIndex = currentIndex;
        this.SpriteSheetList[name].endIndex = end;
    }

    drawNext(name, dx, dy, dWidth=0, dHeight=0) {
        var cur = this.SpriteSheetList[name];
        this.drawSprite(name, cur.curIndex, dx, dy, dWidth, dHeight);
        cur.curIndex += 1;
        if(cur.curIndex > cur.endIndex){
            cur.curIndex = cur.startIndex;
        }
    }

    drawPrev(name, dx, dy, dWidth=0, dHeight=0) {
        var cur = this.SpriteSheetList[name];
        this.drawSprite(name, cur.curIndex, dx, dy, dWidth, dHeight);
        cur.curIndex -= 1;
        if(cur.curIndex < cur.startIndex){
            cur.curIndex = cur.endIndex;
        }
    }

    set whenFinishedLoading(callback) {
        this.callback = callback;
        if(this.#finished_loading) {
            this.callback();
            if(this.#throwaway_callback){
                this.callback = undefined;
            }
        }
    }
}
