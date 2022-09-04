let universe;
let sol;
let fac;


let steps = 25;

let colls = 0;

let debugMode = 1;

function setup() {
    console.clear();
    createCanvas(800, 500)
    //createCanvas(floor(windowWidth - 30), floor(windowHeight - 30));
    background(220);
    sol = new Solver();
    fac = new AgentFactory();
    universe = new Universe(1 / steps, 0.01);


    let ag1 = fac.setPos(width / 2 - 50, height / 2 - 10).setVel(3, 0).setMass(20).setGeometry(Types.circle, 20).setOptions({ mask: 1, fixedPoint: false }).create();
    universe.addAgent(ag1);
    fac.reset();

    let ag2 = fac.setPos(width / 2 + 80, height / 2 - 10).setVel(0, 0).setMass(20).setGeometry(Types.circle, 20).setOptions({ mask: 1, fixedPoint: false }).create();
    universe.addAgent(ag2);
    fac.reset();

    universe.addForce(new Force(cv(0, 0.3), 1));
    walls();

    debuginit(width + 20, 20, 16);

    for (let i = 0; i < 100; i++) {
        let a = fac.setPos(random(20, width - 20), random(20, height - 20)).setMass(random(5, 10)).setVel(random(-1, 1), random(-1, 1)).setGeometry(Types.circle, 4).setOptions({ mask: 1, fixedPoint: false, color: color(random(255), 100, 200) }).create();
        if (universe.agents.filter(b => ut.checkCollision(a, b)).length == 0)
            universe.addAgent(a);
        fac.reset();
    }

}



function draw() {
    background(220);


    for (let i = 0; i < 1 / universe.dt; i++) {
        universe.step();
    }
    universe.draw();

    if (debugMode != 0) {
        if (frameCount % 20 == 1)
            updateDebug();
        universe.qt.show();
    } else {
        hideDebug();
    }
    //noLoop();

}
