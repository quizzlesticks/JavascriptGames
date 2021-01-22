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

    set debug(d) {
        this.#_debug = d;
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

// class MapManager {
//     #_ssm;
//     #maps_features = {loaded: undefined, width: undefined, height: undefined, rows: undefined, cols: undefined};
//     #scale = 2;
//
//     constructor(ssm) {
//         this.#_ssm = ssm;
//     }
//
//     get num_maps_loaded() {
//         return this.#maps_features.loaded;
//     }
//
//     getFactors(num, root=-1) {
//         const isEven = num % 2 === 0;
//         let inc = isEven ? 1 : 2;
//         let factors = [1, num];
//         if(root==-1) {
//             root = Math.sqrt(num);
//         }
//         for (let curFactor = isEven ? 2 : 3; curFactor <= root; curFactor += inc) {
//             if (num % curFactor !== 0) continue;
//             factors.push(curFactor);
//             let compliment = num / curFactor;
//             if (compliment !== curFactor) factors.push(compliment);
//         }
//         return factors;
//     }
//
//     //Determine the best layout for the maps by running factor on the #of maps loaded
//     //perfect roots take precedent
//     //followed by the factor pair with the lowest sum
//     //followed finally by (??? might not be true not gonna do a proof to find out) prime pair since they will be only other option
//     decideBestLayout(num_maps_loaded) {
//         const root = Math.sqrt(num_maps_loaded);
//         if(root == Math.floor(root)){
//             return {rows: root, cols: root};
//         } else {
//             var factors = this.getFactors(num_maps_loaded);
//             //the way the factors are returned the factor pair at the back of the list has the lowest sum
//             //roots are returned funny (only included once, not paired) but we already accounted for those
//             //length-1 is the larger number and will be given
//             return {rows: factors[factors.length-2], cols: factors[factors].length-1};
//         }
//     }
//
//     set maps_features(f) {
//         this.#maps_features.loaded = f.loaded;
//         this.#maps_features.width = f.width;
//         this.#maps_features.height = f.height;
//         var best_layout = this.decideBestLayout(f.loaded);
//         this.#maps_features.rows = best_layout.rows;
//         this.#maps_features.cols = best_layout.cols;
//     }
//
//     draw(player_pos, camera_pos) {
//         //find which index the player is inside
//         var col = Math.floor(player_pos.x/(this.#maps_features.width*this.#scale));
//         //console.log(this.#maps_features.height);
//         var row = Math.floor(player_pos.y/(this.#maps_features.height*this.#scale));
//         //console.log({diff: this.#maps_features.height*this.#scale - player_pos.y, y: player_pos.y, height: this.#maps_features.height*this.#scale});
//         var index = row*this.#maps_features.cols + col;
//         //console.log({row: row, col: col});
//         var offset_x = camera_pos.x - player_pos.x;
//         var offset_y = camera_pos.y - player_pos.y;
//         this.#_ssm.drawSprite("Map" + index, 0, col*this.#maps_features.width*this.#scale+offset_x, row*this.#scale*this.#maps_features.height+offset_y, this.#scale)
//         //Top Left Corner
//         if(row == 0 && col == 0) {
//             var ncol = col+1;
//             var nrow = row;
//             index = nrow*this.#maps_features.cols + (ncol);
//             this.#_ssm.drawSprite("Map" + index, 0, ncol*this.#maps_features.width*this.#scale+offset_x, nrow*this.#scale*this.#maps_features.height+offset_y, this.#scale)
//             ncol = col+1;
//             nrow = row+1;
//             index = nrow*this.#maps_features.cols + (ncol);
//             this.#_ssm.drawSprite("Map" + index, 0, ncol*this.#maps_features.width*this.#scale+offset_x, nrow*this.#scale*this.#maps_features.height+offset_y, this.#scale)
//             ncol = col;
//             nrow = row+1;
//             index = nrow*this.#maps_features.cols + (ncol);
//             this.#_ssm.drawSprite("Map" + index, 0, ncol*this.#maps_features.width*this.#scale+offset_x, nrow*this.#scale*this.#maps_features.height+offset_y, this.#scale)
//         }
//         //Bottom Left
//         else if (row == this.#maps_features.rows - 1 && col == 0) {
//             var ncol = col+1;
//             var nrow = row;
//             index = nrow*this.#maps_features.cols + (ncol);
//             this.#_ssm.drawSprite("Map" + index, 0, ncol*this.#maps_features.width*this.#scale+offset_x, nrow*this.#scale*this.#maps_features.height+offset_y, this.#scale)
//             ncol = col+1;
//             nrow = row-1;
//             index = nrow*this.#maps_features.cols + (ncol);
//             this.#_ssm.drawSprite("Map" + index, 0, ncol*this.#maps_features.width*this.#scale+offset_x, nrow*this.#scale*this.#maps_features.height+offset_y, this.#scale)
//             ncol = col;
//             nrow = row-1;
//             index = nrow*this.#maps_features.cols + (ncol);
//             this.#_ssm.drawSprite("Map" + index, 0, ncol*this.#maps_features.width*this.#scale+offset_x, nrow*this.#scale*this.#maps_features.height+offset_y, this.#scale)
//         }
//         //Top Right
//         else if (row == 0 && col == this.#maps_features.cols -1) {
//             var ncol = col-1;
//             var nrow = row;
//             index = nrow*this.#maps_features.cols + (ncol);
//             this.#_ssm.drawSprite("Map" + index, 0, ncol*this.#maps_features.width*this.#scale+offset_x, nrow*this.#scale*this.#maps_features.height+offset_y, this.#scale)
//             ncol = col-1;
//             nrow = row+1;
//             index = nrow*this.#maps_features.cols + (ncol);
//             this.#_ssm.drawSprite("Map" + index, 0, ncol*this.#maps_features.width*this.#scale+offset_x, nrow*this.#scale*this.#maps_features.height+offset_y, this.#scale)
//             ncol = col;
//             nrow = row+1;
//             index = nrow*this.#maps_features.cols + (ncol);
//             this.#_ssm.drawSprite("Map" + index, 0, ncol*this.#maps_features.width*this.#scale+offset_x, nrow*this.#scale*this.#maps_features.height+offset_y, this.#scale)
//         }
//         //Bottom Right
//         else if (row == this.#maps_features.rows - 1 && col == this.#maps_features.cols - 1) {
//             var ncol = col-1;
//             var nrow = row;
//             index = nrow*this.#maps_features.cols + (ncol);
//             this.#_ssm.drawSprite("Map" + index, 0, ncol*this.#maps_features.width*this.#scale+offset_x, nrow*this.#scale*this.#maps_features.height+offset_y, this.#scale)
//             ncol = col-1;
//             nrow = row-1;
//             index = nrow*this.#maps_features.cols + (ncol);
//             this.#_ssm.drawSprite("Map" + index, 0, ncol*this.#maps_features.width*this.#scale+offset_x, nrow*this.#scale*this.#maps_features.height+offset_y, this.#scale)
//             ncol = col;
//             nrow = row-1;
//             index = nrow*this.#maps_features.cols + (ncol);
//             this.#_ssm.drawSprite("Map" + index, 0, ncol*this.#maps_features.width*this.#scale+offset_x, nrow*this.#scale*this.#maps_features.height+offset_y, this.#scale)
//         }
//         //Left Wall
//         else if (col == 0) {
//             var ncol = col;
//             var nrow = row-1;
//             index = nrow*this.#maps_features.cols + (ncol);
//             this.#_ssm.drawSprite("Map" + index, 0, ncol*this.#maps_features.width*this.#scale+offset_x, nrow*this.#scale*this.#maps_features.height+offset_y, this.#scale)
//             ncol = col+1;
//             nrow = row-1;
//             index = nrow*this.#maps_features.cols + (ncol);
//             this.#_ssm.drawSprite("Map" + index, 0, ncol*this.#maps_features.width*this.#scale+offset_x, nrow*this.#scale*this.#maps_features.height+offset_y, this.#scale)
//             ncol = col+1;
//             nrow = row;
//             index = nrow*this.#maps_features.cols + (ncol);
//             this.#_ssm.drawSprite("Map" + index, 0, ncol*this.#maps_features.width*this.#scale+offset_x, nrow*this.#scale*this.#maps_features.height+offset_y, this.#scale)
//             ncol = col+1;
//             nrow = row+1;
//             index = nrow*this.#maps_features.cols + (ncol);
//             this.#_ssm.drawSprite("Map" + index, 0, ncol*this.#maps_features.width*this.#scale+offset_x, nrow*this.#scale*this.#maps_features.height+offset_y, this.#scale)
//             ncol = col;
//             nrow = row-1;
//             index = nrow*this.#maps_features.cols + (ncol);
//             this.#_ssm.drawSprite("Map" + index, 0, ncol*this.#maps_features.width*this.#scale+offset_x, nrow*this.#scale*this.#maps_features.height+offset_y, this.#scale)
//         }
//         //Right Wall
//         else if (col == this.#maps_features.cols - 1) {
//             var ncol = col;
//             var nrow = row-1;
//             index = nrow*this.#maps_features.cols + (ncol);
//             this.#_ssm.drawSprite("Map" + index, 0, ncol*this.#maps_features.width*this.#scale+offset_x, nrow*this.#scale*this.#maps_features.height+offset_y, this.#scale)
//             ncol = col-1;
//             nrow = row-1;
//             index = nrow*this.#maps_features.cols + (ncol);
//             this.#_ssm.drawSprite("Map" + index, 0, ncol*this.#maps_features.width*this.#scale+offset_x, nrow*this.#scale*this.#maps_features.height+offset_y, this.#scale)
//             ncol = col-1;
//             nrow = row;
//             index = nrow*this.#maps_features.cols + (ncol);
//             this.#_ssm.drawSprite("Map" + index, 0, ncol*this.#maps_features.width*this.#scale+offset_x, nrow*this.#scale*this.#maps_features.height+offset_y, this.#scale)
//             ncol = col-1;
//             nrow = row+1;
//             index = nrow*this.#maps_features.cols + (ncol);
//             this.#_ssm.drawSprite("Map" + index, 0, ncol*this.#maps_features.width*this.#scale+offset_x, nrow*this.#scale*this.#maps_features.height+offset_y, this.#scale)
//             ncol = col;
//             nrow = row-1;
//             index = nrow*this.#maps_features.cols + (ncol);
//             this.#_ssm.drawSprite("Map" + index, 0, ncol*this.#maps_features.width*this.#scale+offset_x, nrow*this.#scale*this.#maps_features.height+offset_y, this.#scale)
//         }
//         //Top Wall
//         else if (row == 0) {
//             var ncol = col-1;
//             var nrow = row;
//             index = nrow*this.#maps_features.cols + (ncol);
//             this.#_ssm.drawSprite("Map" + index, 0, ncol*this.#maps_features.width*this.#scale+offset_x, nrow*this.#scale*this.#maps_features.height+offset_y, this.#scale)
//             ncol = col-1;
//             nrow = row+1;
//             index = nrow*this.#maps_features.cols + (ncol);
//             this.#_ssm.drawSprite("Map" + index, 0, ncol*this.#maps_features.width*this.#scale+offset_x, nrow*this.#scale*this.#maps_features.height+offset_y, this.#scale)
//             ncol = col;
//             nrow = row+1;
//             index = nrow*this.#maps_features.cols + (ncol);
//             this.#_ssm.drawSprite("Map" + index, 0, ncol*this.#maps_features.width*this.#scale+offset_x, nrow*this.#scale*this.#maps_features.height+offset_y, this.#scale)
//             ncol = col+1;
//             nrow = row+1;
//             index = nrow*this.#maps_features.cols + (ncol);
//             this.#_ssm.drawSprite("Map" + index, 0, ncol*this.#maps_features.width*this.#scale+offset_x, nrow*this.#scale*this.#maps_features.height+offset_y, this.#scale)
//             ncol = col+1;
//             nrow = row;
//             index = nrow*this.#maps_features.cols + (ncol);
//             this.#_ssm.drawSprite("Map" + index, 0, ncol*this.#maps_features.width*this.#scale+offset_x, nrow*this.#scale*this.#maps_features.height+offset_y, this.#scale)
//         }
//         //Bottom Wall
//         else if (row == this.#maps_features.rows - 1) {
//             var ncol = col-1;
//             var nrow = row;
//             index = nrow*this.#maps_features.cols + (ncol);
//             this.#_ssm.drawSprite("Map" + index, 0, ncol*this.#maps_features.width*this.#scale+offset_x, nrow*this.#scale*this.#maps_features.height+offset_y, this.#scale)
//             ncol = col-1;
//             nrow = row-1;
//             index = nrow*this.#maps_features.cols + (ncol);
//             this.#_ssm.drawSprite("Map" + index, 0, ncol*this.#maps_features.width*this.#scale+offset_x, nrow*this.#scale*this.#maps_features.height+offset_y, this.#scale)
//             ncol = col;
//             nrow = row-1;
//             index = nrow*this.#maps_features.cols + (ncol);
//             this.#_ssm.drawSprite("Map" + index, 0, ncol*this.#maps_features.width*this.#scale+offset_x, nrow*this.#scale*this.#maps_features.height+offset_y, this.#scale)
//             ncol = col+1;
//             nrow = row-1;
//             index = nrow*this.#maps_features.cols + (ncol);
//             this.#_ssm.drawSprite("Map" + index, 0, ncol*this.#maps_features.width*this.#scale+offset_x, nrow*this.#scale*this.#maps_features.height+offset_y, this.#scale)
//             ncol = col+1;
//             nrow = row;
//             index = nrow*this.#maps_features.cols + (ncol);
//             this.#_ssm.drawSprite("Map" + index, 0, ncol*this.#maps_features.width*this.#scale+offset_x, nrow*this.#scale*this.#maps_features.height+offset_y, this.#scale)
//         }
//         else {
//             var ncol = col-1;
//             var nrow = row-1;
//             index = nrow*this.#maps_features.cols + (ncol);
//             this.#_ssm.drawSprite("Map" + index, 0, ncol*this.#maps_features.width*this.#scale+offset_x, nrow*this.#scale*this.#maps_features.height+offset_y, this.#scale)
//             ncol = col;
//             nrow = row-1;
//             index = nrow*this.#maps_features.cols + (ncol);
//             this.#_ssm.drawSprite("Map" + index, 0, ncol*this.#maps_features.width*this.#scale+offset_x, nrow*this.#scale*this.#maps_features.height+offset_y, this.#scale)
//             ncol = col+1;
//             nrow = row-1;
//             index = nrow*this.#maps_features.cols + (ncol);
//             this.#_ssm.drawSprite("Map" + index, 0, ncol*this.#maps_features.width*this.#scale+offset_x, nrow*this.#scale*this.#maps_features.height+offset_y, this.#scale)
//             ncol = col+1;
//             nrow = row;
//             index = nrow*this.#maps_features.cols + (ncol);
//             this.#_ssm.drawSprite("Map" + index, 0, ncol*this.#maps_features.width*this.#scale+offset_x, nrow*this.#scale*this.#maps_features.height+offset_y, this.#scale)
//             ncol = col+1;
//             nrow = row+1;
//             index = nrow*this.#maps_features.cols + (ncol);
//             this.#_ssm.drawSprite("Map" + index, 0, ncol*this.#maps_features.width*this.#scale+offset_x, nrow*this.#scale*this.#maps_features.height+offset_y, this.#scale)
//             ncol = col;
//             nrow = row+1;
//             index = nrow*this.#maps_features.cols + (ncol);
//             this.#_ssm.drawSprite("Map" + index, 0, ncol*this.#maps_features.width*this.#scale+offset_x, nrow*this.#scale*this.#maps_features.height+offset_y, this.#scale)
//             ncol = col-1;
//             nrow = row+1;
//             index = nrow*this.#maps_features.cols + (ncol);
//             this.#_ssm.drawSprite("Map" + index, 0, ncol*this.#maps_features.width*this.#scale+offset_x, nrow*this.#scale*this.#maps_features.height+offset_y, this.#scale)
//             ncol = col-1;
//             nrow = row;
//             index = nrow*this.#maps_features.cols + (ncol);
//             this.#_ssm.drawSprite("Map" + index, 0, ncol*this.#maps_features.width*this.#scale+offset_x, nrow*this.#scale*this.#maps_features.height+offset_y, this.#scale)
//         }
//     }
//
//     loadAllMaps(){
//         var xhttp = new XMLHttpRequest();
//         xhttp.ssm = this.#_ssm;
//         xhttp.map = this;
//         xhttp.onreadystatechange = function() {
//             if(this.readyState == 4 && this.status == 200) {
//                 var map_urls = this.responseText.match(/\B\/Map\/Map\d+.png/gm);
//                 var height = Number(this.responseText.match(/height=\d+/)[0].slice(7));
//                 var width = Number(this.responseText.match(/width=\d+/)[0].slice(6));
//                 for (var i = 0; i < map_urls.length; i++) {
//                     //filename, id, width, height, rows, cols
//                     this.ssm.load(map_urls[i], map_urls[i].slice(5,-4),width, height, 1, 1);
//                 }
//                 this.map.maps_features = {loaded: map_urls.length, width: width, height: height};
//             } else if(this.readyState == 4 && this.status == 403){
//                 throw new Error("Couldn't load map cache; Forbidden");
//             } else if(this.readyState == 4 && this.status == 404){
//                 throw new Error("Couldn't load map cache; Not found");
//             }
//         };
//         xhttp.open("GET", "/Map", true);
//         xhttp.send();
//     }
// }
