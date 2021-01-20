class MapManager {

	#_win;
	#_deli;
	#triangles;
	#points;

	#pullin = {width: 0.9, height: 0.9};

	constructor(win) {
		this.#_win = win;
	}

	get points() {
		return this.#points;
	}

	drawTriangles() {
		var ctx = this.#_win.context;
		ctx.save();
		ctx.strokeStyle = "black";
		for (var i = 0; i < this.#triangles.length; i+=3) {
			ctx.beginPath();
			ctx.moveTo(this.#points[this.#triangles[i]][0], this.#points[this.#triangles[i]][1]);
			ctx.lineTo(this.#points[this.#triangles[i+1]][0], this.#points[this.#triangles[i+1]][1]);
			ctx.lineTo(this.#points[this.#triangles[i+2]][0], this.#points[this.#triangles[i+2]][1]);
			ctx.lineTo(this.#points[this.#triangles[i]][0], this.#points[this.#triangles[i]][1]);
			ctx.stroke();
		}
		ctx.restore();
	}

	drawPoints(sSize=5) {
		var ctx = this.#_win.context;
		ctx.save();
		ctx.fillStyle = "#ff0000";
		for (var i = 0; i < this.#points.length; i++) {
			ctx.fillRect(this.#points[i][0], this.#points[i][1], sSize, sSize);
		}
		ctx.restore();
	}

	randomize(npoints=100) {
		var width = this.#_win.width;
		var height = this.#_win.height;
		this.#points = [];
		for (var i = 0; i < npoints; i++){
			this.#points.push([Math.round(Math.random()*width), Math.round(Math.random()*height)]);
		}
		this.#_deli = Delaunator.from(this.#points);
		this.#triangles = this.#_deli.triangles;
	}
}
