class AgentFactory{
    constructor(agent){
        this.agent = agent || new Agent();
        this.created = false;
    }

    setPos(x, y) {
        if(this.created) this.reset();
        this.agent.pos = cv(x,y);
        this.agent.prevpos.push(cv(x,y))
        return new AgentFactory(this.agent);
    }

    setVel(x, y) {
        if(this.created) this.reset();
        this.agent.v = cv(x,y);
        return new AgentFactory(this.agent);
    }

    setMass(m) {
        if(this.created) this.reset();
        this.agent.m = m;
        return new AgentFactory(this.agent);
    }

    setGeometry(type, radius, height) {
        if(this.created) this.reset();
        this.agent.type = type;
        this.agent.radius = radius;
        if(type == Types.rect) {
            this.agent.h = height * 2;
            this.agent.radius *= 2
        }
        return new AgentFactory(this.agent);
    }

    setOptions(options) {
        if(this.created) this.reset();
        this.agent.mask = options.mask;
        this.agent.fixedPoint = options.fixedPoint;
        if(options.fixedPoint) {
            this.agent.m = Number.MAX_SAFE_INTEGER
        }
        this.agent.col = options.color || color(255,100,0)
        return new AgentFactory(this.agent);
    }

    create() {
        //this.created = true;
        return this.agent;
    }

    reset() {
        this.agent = new Agent();
        this.created = false;
    }


}