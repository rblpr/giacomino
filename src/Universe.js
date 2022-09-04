let ut = new Utils();


class Universe {

    constructor(dt, att) {
        this.agents = [];
        this.forces = [];
        this.dt = dt;
        this.time = 0;
        this.att = att;

        let boundary = new Quad(width / 2, height / 2, width / 2, height / 2);
        this.qt = new Quadtree(boundary, 4);
        this.qtrange = 40;
    }

    addAgent(agent) {
        this.agents.push(agent);
    }

    removeAgent(agent) {
        this.agents.slice(this.agents.indexOf(agent), 1);
    }

    clearAgents() {
        this.agents = [];
    }

    addForce(force) {
        this.forces.push(force);
    }

    removeForce(force) {
        this.forces.slice(this.forces.indexOf(force), 1);
    }

    clearForce() {
        this.forces = [];
    }

    draw() {
        this.agents.forEach(a => a.show())
    }

    step() {
        this.time += this.dt;

        if (frameCount % 2 == 0) {
            this.qt.clear();
            for (let a of this.agents) {
                this.qt.insert(a);
            }
        }

        this.agents.forEach(a => {

            let collForces = this.forces.filter(f => f.mask == a.mask);
            collForces.forEach(f => a.applyForce(f, this.dt));

            let range = new Quad(a.pos.x, a.pos.y, this.qtrange, this.qtrange);
            let near = [];
            this.qt.query(range, near);

            let collFlag = false;
            near.filter(b => b.mask == a.mask && b != a).forEach(b => {
                if (ut.checkCollision(a, b)) {
                    ut.collide(b, a)

                    //while(ut.checkCollision(a,b)){
                    //a.stepback();
                    b.stepback();
                    //}
                    collFlag = true;
                }
            });
            a.colliding = collFlag;

            a.update(this.dt);


        })
    }
}