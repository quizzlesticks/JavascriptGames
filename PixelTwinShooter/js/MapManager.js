class MapManager {

	#_win;
	#_deli;
	#voroni;
	#points;
	#_randomizer;
	#_margin_bleed = 100;

	constructor(win) {
		this.#_win = win;
	}

	get points() {
		return this.#points;
	}

	get halfedges() {
		return this.#_deli.halfedges;
	}

	get triangles() {
		return this.#_deli.triangles;
	}

	triangleOfEdge(e) {
		return Math.floor(e/3);
	}

	startingEdgeOfTriangle(e) {
		return Math.floor(e/3)*3;
	}

	edgesOfTriangle(t) {
		t = triangleOfEdge(t);
		return [3*t, 3*t+1, 3*t+2];
	}

	nextHalfedge(e) {
		return (e%3===2) ? e-2 : e+1;
	}

	prevHalfedge(e) {
		return (e%3===0) ? e+2 : e-1;
	}

	drawTwoTriangles() {
		var ctx = this.#_win.context;
		ctx.save();
		ctx.strokeStyle ="black";
		ctx.beginPath();
		ctx.moveTo(this.points[this.triangles[0]][0], this.#points[this.triangles[0]][1]);
		ctx.lineTo(this.points[this.triangles[1]][0], this.#points[this.triangles[1]][1]);
		ctx.stroke();
		ctx.strokeStyle = "black";
		ctx.beginPath();
		ctx.moveTo(this.points[this.triangles[1]][0], this.#points[this.triangles[1]][1]);
		ctx.lineTo(this.points[this.triangles[2]][0], this.#points[this.triangles[2]][1]);
		ctx.lineTo(this.points[this.triangles[0]][0], this.#points[this.triangles[0]][1]);
		ctx.stroke();
		var halfedge = this.startingEdgeOfTriangle(this.#_deli.halfedges[0]);
		ctx.strokeStyle ="black";
		ctx.beginPath();
		ctx.moveTo(this.points[this.triangles[halfedge]][0], this.#points[this.triangles[halfedge]][1]);
		ctx.lineTo(this.points[this.triangles[halfedge+1]][0], this.#points[this.triangles[halfedge+1]][1]);
		ctx.lineTo(this.points[this.triangles[halfedge+2]][0], this.#points[this.triangles[halfedge+2]][1]);
		ctx.stroke();
		ctx.strokeStyle ="red";
		ctx.beginPath();
		ctx.moveTo(this.#points[this.triangles[halfedge+2]][0], this.#points[this.triangles[halfedge+2]][1]);
		ctx.lineTo(this.#points[this.triangles[halfedge]][0], this.#points[this.triangles[halfedge]][1]);
		ctx.stroke();
		ctx.fillStyle = "#00ffff";
		ctx.beginPath();
		ctx.arc(this.#points[this.triangles[this.#_deli.halfedges[0]]][0], this.#points[this.triangles[this.#_deli.halfedges[0]]][1], 6, 0, Math.PI*2);
		ctx.fill();
		ctx.fillStyle = "#00ff00";
		ctx.beginPath();
		ctx.arc(this.#points[this.triangles[halfedge]][0], this.#points[this.triangles[halfedge]][1], 3, 0, Math.PI*2);
		ctx.arc(this.#points[this.triangles[halfedge+2]][0], this.#points[this.triangles[halfedge+2]][1], 3, 0, Math.PI*2);
		ctx.fill();
		ctx.font = "12px Helvetica";
		ctx.textAlign = "center";
		ctx.fillStyle = "#000000";
		ctx.beginPath();
		ctx.fillText("S",this.#points[this.triangles[0]][0], this.#points[this.triangles[0]][1]);
		ctx.fillText("E",this.#points[this.triangles[1]][0], this.#points[this.triangles[1]][1]);
		//ctx.arc(this.#points[this.triangles[0]][0], this.#points[this.triangles[0]][1], 2, 0, Math.PI*2);
		//ctx.arc(this.#points[this.triangles[2]][0], this.#points[this.triangles[2]][1], 2, 0, Math.PI*2);
		ctx.fill();
		ctx.restore();
	}

	drawTriangles() {
		var ctx = this.#_win.context;
		ctx.save();
		ctx.strokeStyle = "black";
		for (var i = 0; i < this.triangles.length; i++) {
			if(i > this.halfedges[i]) {
				if(this.halfedges[i] == 0) { ctx.strokeStyle = "red";}
				const p = this.#points[this.triangles[i]];
				const q = this.#points[this.triangles[this.nextHalfedge(i)]];
				ctx.beginPath();
				ctx.moveTo(p[0], p[1]);
				ctx.lineTo(q[0], q[1]);
				ctx.stroke();
				if(this.halfedges[i] == 0) { ctx.strokeStyle = "black";}
			}
		}
		ctx.restore();
	}

	drawPoints(rad=2) {
		var ctx = this.#_win.context;
		ctx.save();
		ctx.fillStyle = "#ff0000";
		for (var i = 0; i < this.#points.length; i++) {
			ctx.beginPath();
			ctx.arc(this.#points[i][0], this.#points[i][1], rad, 0, Math.PI * 2);
			ctx.fill();
		}
		ctx.restore();
	}

	randomize(radius) {
		this.#_randomizer = poissonDiscSampler(this.#_win.width+this.#_margin_bleed, this.#_win.height+this.#_margin_bleed, radius);
		var width = this.#_win.width;
		var height = this.#_win.height;
		this.#points = [];
		var rando = undefined;
		outerloop: while(1){
			do{
				rando = this.#_randomizer.next().value;
				if(rando == undefined) {break outerloop;}
				rando = rando["add"];
			}while(rando == undefined)
			if(rando[0] > this.#_win.width + this.#_margin_bleed/2 ||
			   rando[0] < -this.#_margin_bleed/2 ||
		   	   rando[1] > this.#_win.height + this.#_margin_bleed/2 ||
		       rando[1] < -this.#_margin_bleed/2) {
				   continue;
			   }
			this.#points.push([Math.round(rando[0])-this.#_margin_bleed/2, Math.round(rando[1])-this.#_margin_bleed/2]);
		}
		this.#_deli = Delaunator.from(this.#points);
	}
}

function* poissonDiscSampler(width, height, radius) {
	const k = 4; // maximum number of samples before rejection
	const radius2 = radius * radius;
	const cellSize = radius * Math.SQRT1_2;
	const gridWidth = Math.ceil(width / cellSize);
	const gridHeight = Math.ceil(height / cellSize);
	const grid = new Array(gridWidth * gridHeight);
	const queue = [];

	// Pick the first sample.
	yield {add: sample(width / 2 , height / 2, null)};

	// Pick a random existing sample from the queue.
	pick: while (queue.length) {
		const i = Math.random() * queue.length | 0;
		const parent = queue[i];
		const seed = Math.random();
		const epsilon = 0.0000001;

		// Make a new candidate.
		for (let j = 0; j < k; ++j) {
			const a = 2 * Math.PI * (seed + 1.0*j/k);
			const r = radius + epsilon;
			const x = parent[0] + r * Math.cos(a);
			const y = parent[1] + r * Math.sin(a);

			// Accept candidates that are inside the allowed extent
			// and farther than 2 * radius to all existing samples.
			if (0 <= x && x < width && 0 <= y && y < height && far(x, y)) {
				yield {add: sample(x, y), parent};
				continue pick;
			}
		}

		// If none of k candidates were accepted, remove it from the queue.
		const r = queue.pop();
		if (i < queue.length) queue[i] = r;
		yield {remove: parent};
	}

	function far(x, y) {
		const i = x / cellSize | 0;
		const j = y / cellSize | 0;
		const i0 = Math.max(i - 2, 0);
		const j0 = Math.max(j - 2, 0);
		const i1 = Math.min(i + 3, gridWidth);
		const j1 = Math.min(j + 3, gridHeight);
		for (let j = j0; j < j1; ++j) {
		  const o = j * gridWidth;
		  for (let i = i0; i < i1; ++i) {
		    const s = grid[o + i];
		    if (s) {
		      const dx = s[0] - x;
		      const dy = s[1] - y;
		      if (dx * dx + dy * dy < radius2) return false;
		    }
		  }
		}
		return true;
	}

	function sample(x, y, parent) {
		const s = grid[gridWidth * (y / cellSize | 0) + (x / cellSize | 0)] = [x, y];
		queue.push(s);
		return s;
	}
}
