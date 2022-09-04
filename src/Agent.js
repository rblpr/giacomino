class Agent {

    constructor() {
        this.pos = cv(0, 0);
        this.v = cv(0, 0);
        this.a = cv(0, 0);
        this.m = 0;
        this.type = null;
        this.radius = 0;
        this.h = 0;
        this.mask = 0;
        this.fixedPoint = false;
        this.col = color(255, 100, 0)

        this.prevpos = [];

        this.colliding = false;
        this.id = 0;
    }

    show() {
        push();
        if (this.type === Types.circle) {
            stroke(0);
            strokeWeight(1);
            fill(this.col);
            translate(this.pos.x, this.pos.y)
            ellipse(0, 0, this.radius * 2);
        } else if (this.type === Types.rect) {
            rectMode(CENTER)
            stroke(0);
            strokeWeight(1);
            fill(this.col);
            translate(this.pos.x, this.pos.y)
            rect(0, 0, this.radius, this.h);
            ellipse(0, 0, 4,4)
        } else if(this.id === 1) {
            stroke(0);
            strokeWeight(1);
            fill(this.col);
            translate(this.pos.x, this.pos.y)
            ellipse(0, 0, this.radius * 2);
        }

        pop();
    }

    update(dt) {
        if (this.fixedPoint) {
            this.v.mult(0);
        }

        this.prevpos.pop();
        this.prevpos.push(cv(this.pos.x, this.pos.y))
        this.pos.add(p5.Vector.mult(this.v, dt));
        this.a.mult(0);
    }

    applyForce(f, dt) {
        if (this.fixedPoint) return;

        this.a.add(f.force());
        this.v.add(this.a.mult(dt));

    }

    stepback() {
        if(this.fixedPoint) return;
        if (this.prevpos.length == 0) {
            console.log(this)
            throw new Error("Stepback error")
        }
        let last = this.prevpos[this.prevpos.length - 1];
        //if(last.x != this.pos.x || last.y != this.pos.y)
            this.pos.set(last);
        if (!this.colliding) this.prevpos.push(cv(this.pos.x, this.pos.y))

    }
}