class MapManager {

	#_win;
	#_deli;
	#_path = {deli: undefined, voronoi: undefined};
	#_voronoi;
	#_margin_bleed = -15;

	constructor(win, radius=50) {
		this.#_win = win;
		this.randomize(radius);
		this.relaxe(6);
	}

	get points() {
		return this.#_deli.points;
	}

	get halfedges() {
		return this.#_deli.halfedges;
	}

	get triangles() {
		return this.#_deli.triangles;
	}

	get number_of_cells() {
		return this.#_deli.points.length/2;
	}

	relaxe(times_to_relax=1) {
		for(let n =0; n < times_to_relax; n++) {
			for (var i = 0; i < this.number_of_cells; i++) {
				const cell = this.#_voronoi.cellPolygon(i);
				var x_sum = 0;
				var y_sum = 0;
				for (var j = 0; j < cell.length; j++) {
					x_sum += cell[j][0];
					y_sum += cell[j][1];
				}
				this.#_deli.points[i*2] = Math.round(x_sum/cell.length);
				this.#_deli.points[i*2+1] = Math.round(y_sum/cell.length);
			}
			this.#_deli.update();
			this.#_voronoi.update();
		}
		this.#_path.deli = new Path2D(this.#_deli.render());
		this.#_path.voronoi = new Path2D(this.#_voronoi.render());
	}

	drawUnderCell(x, y) {
		if(x > this.#_win.width || x < 0 || y > this.#_win.height || y < 0) {
			this.#_win.clearWindow("white");
			this.drawTriangles();
			this.drawCells();
			this.drawPoints();
			return;
		}
		this.#_win.clearWindow("white");
		var point = this.#_deli.find(x, y);
		var ctx = this.#_win.context;
		ctx.save();
		ctx.fillStyle = "#0000ff";
		ctx.beginPath();
		ctx.arc(this.points[point*2], this.points[point*2+1], 4, 0, Math.PI * 2);
		ctx.fill();
		ctx.fillStyle = "#00ff00";
		var n = this.#_deli.neighbors(point);
		for ( var i of n ) {
			ctx.beginPath();
			ctx.arc(this.points[i*2], this.points[i*2+1], 4, 0, Math.PI * 2);
			ctx.fill();
		}
		var p = this.#_voronoi.cellPolygon(point);
		ctx.fillStyle = "#00ffdc7a";
		ctx.beginPath();
		if(p.length > 0) {
			ctx.moveTo(p[0][0], p[0][1]);
		}
		for (var i = 1; i < p.length; i++) {
			ctx.lineTo(p[i][0],p[i][1]);
		}
		if(p.length > 0) {
			ctx.lineTo(p[0][0], p[0][1]);
			ctx.fill();
		}
		this.drawTriangles();
		this.drawCells();
		this.drawPoints();
		ctx.restore();
	}

	drawTriangles() {
		var ctx = this.#_win.context;
		ctx.save();
		ctx.strokeStyle = "black";
		ctx.stroke(this.#_path.deli);
		ctx.restore();
	}

	drawCells() {
		var ctx = this.#_win.context;
		ctx.save();
		ctx.strokeStyle = "red";
		ctx.stroke(this.#_path.voronoi);
		ctx.restore();

	}

	drawPoints(rad=2) {
		var ctx = this.#_win.context;
		ctx.save();
		ctx.fillStyle = "#ff0000";
		for (var i = 0; i < this.points.length; i+=2) {
			ctx.beginPath();
			ctx.arc(this.points[i], this.points[i+1], rad, 0, Math.PI * 2);
			ctx.fill();
		}
		ctx.restore();
	}

	randomize(radius=50) {
		var randomizer = poissonDiscSampler(this.#_win.width+this.#_margin_bleed, this.#_win.height+this.#_margin_bleed, radius)
		var width = this.#_win.width;
		var height = this.#_win.height;
		const a = [];
		var rando = undefined;
		outerloop: while(1){
			do{
				rando = randomizer.next().value;
				if(rando == undefined) {break outerloop;}
				rando = rando["add"];
			}while(rando == undefined)
			if(rando[0] > this.#_win.width + this.#_margin_bleed/2 ||
			   rando[0] < -this.#_margin_bleed/2 ||
		   	   rando[1] > this.#_win.height + this.#_margin_bleed/2 ||
		       rando[1] < -this.#_margin_bleed/2) {
				   continue;
			   }
			a.push([Math.round(rando[0])-this.#_margin_bleed/2, Math.round(rando[1])-this.#_margin_bleed/2]);
		}
		this.#_deli = d3.Delaunay.from(a);
		this.#_voronoi = this.#_deli.voronoi([0,0,this.#_win.width, this.#_win.height]);
		this.#_path.deli = new Path2D(this.#_deli.render());
		this.#_path.voronoi = new Path2D(this.#_voronoi.render());
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
