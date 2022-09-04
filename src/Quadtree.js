class Quad {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    contains(agent) {
        let point = agent.pos;
        return point.x > this.x - this.w &&
            point.x < this.x + this.w &&
            point.y > this.y - this.h &&
            point.y < this.y + this.h;
    }

    intersects(range) {
        return !(range.x - range.w > this.x + this.w ||
            range.x + range.w < this.x - this.w ||
            range.y - range.h > this.y + this.h ||
            range.y + range.h < this.y - this.h
        )
    }
}

class Quadtree {
    constructor(boundary, n) {
        this.boundary = boundary;
        this.capacity = n;
        this.agents = [];
        this.divided = false;
    }


    insert(agent) {

        if (!this.boundary.contains(agent)) return;


        if (this.agents.length < this.capacity) {
            this.agents.push(agent)
        } else {
            if (!this.divided) {
                this.subdivide();
            }

            this.northeast.insert(agent);
            this.northwest.insert(agent);
            this.southeast.insert(agent);
            this.southwest.insert(agent);

        }
    }

    subdivide() {
        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.w;
        let h = this.boundary.h;

        let ne = new Quad(x + w / 2, y - h / 2, w / 2, h / 2);
        let nw = new Quad(x - w / 2, y - h / 2, w / 2, h / 2);
        let se = new Quad(x + w / 2, y + h / 2, w / 2, h / 2);
        let sw = new Quad(x - w / 2, y + h / 2, w / 2, h / 2);

        this.northwest = new Quadtree(nw, 4);
        this.northeast = new Quadtree(ne, 4);
        this.southwest = new Quadtree(sw, 4);
        this.southeast = new Quadtree(se, 4);

        this.divided = true;

    }

    query(range, found) {
        if (!this.boundary.intersects(range)) {
            return;
        } else {
            for (let a of this.agents) {
                if (range.contains(a)) {
                    found.push(a)
                }
            }
            if (this.divided) {
                this.northeast.query(range, found);
                this.northwest.query(range, found);
                this.southeast.query(range, found);
                this.southwest.query(range, found);
            }

            return found;
        }
    }

    show() {
        stroke(255);
        rectMode(CENTER)
        noFill();
        rect(this.boundary.x, this.boundary.y, this.boundary.w * 2, this.boundary.h * 2);
        if (this.divided) {
            this.northeast.show();
            this.northwest.show();
            this.southeast.show();
            this.southwest.show();

        }

        //this.agents.forEach(a => a.show())
    }

    count() {
        if (!this.divided) {
            return this.agents.length;
        } else {
            return this.agents.length +
                this.northeast.count() + this.northwest.count() +
                this.southeast.count() + this.southwest.count()
        }
    }

    clear() {
        this.agents = [];
        this.divided = false;
        this.northeast= null;
        this.northwest= null;
        this.southeast= null;
        this.southwest= null;
    }
}
