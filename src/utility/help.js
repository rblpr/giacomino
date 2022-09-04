function cv(x, y) {
    return createVector(x, y)
}

function clog(...data) {
    if(debugMode != 2) return;
    console.log(...data)
}

function walls() {
    let l = 10;
    for(let i = 0; i < width / l / 2; i++) {
        let s =  fac.setPos(l/2 + i * l * 2, height - l / 2).setGeometry(Types.rect, l, l).setOptions({ mask: 1, fixedPoint: true, color: 155 }).create()
        universe.addAgent(s);
        fac.reset();


        let n =  fac.setPos(l/2 + i * l * 2,l / 2).setGeometry(Types.rect, l, l).setOptions({ mask: 1, fixedPoint: true, color: 155 }).create()
        universe.addAgent(n);
        fac.reset();
    }

    for(let i = 0; i < height / l / 2; i++) {

        let w =  fac.setPos(l / 2, l/2 + i * l * 2 - 2).setGeometry(Types.rect, l, l).setOptions({ mask: 1, fixedPoint: true, color: 155 }).create()
        universe.addAgent(w);
        fac.reset();

        let e =  fac.setPos(width - l / 2, l/2 + i * l * 2 - 2).setGeometry(Types.rect, l, l).setOptions({ mask: 1, fixedPoint: true, color: 155 }).create()
        universe.addAgent(e);
        fac.reset();

    }


}

/* function mousePressed() {
    let ag1 = fac.setPos(mouseX, mouseY).setVel(0, 0).setMass(5).setGeometry(Types.sphere, 8).setOptions({ mask: 1, fixedPoint: false, color: color(random(255), random(255), random(255)) }).create();
    universe.addAgent(ag1);
    fac.reset();
} */

function pioli() {


    for (let i = -5; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            let c = fac.setPos(width/2 + i*50, height / 4 + j * 60).setGeometry(Types.circle, 16).setOptions({ mask: 1, fixedPoint: true }).create();
            universe.addAgent(c);
            fac.reset();
        }
    }
}

let fps;
let nagents;
let nfixedagents;
let quadcount;
let friction;
let forces;
let time;
function debuginit(x, y, spacing) {
    fps = createP();
    fps.position(x,y);
    nagents = createP();
    nagents.position(x,y+spacing);
    nfixedagents = createP();
    nfixedagents.position(x, y + spacing*2);
    quadcount = createP();
    quadcount.position(x, y + spacing*3)

    friction = createP();
    friction.position(x, y + spacing*4);
    forces = createP();
    forces.position(x, y + spacing*5);
    time = createP();
    time.position(x, y + spacing * 6);

}

function updateDebug(){
    fps.html("fps: " + floor(frameRate()));
    nagents.html("# moving agents: " + universe.agents.filter(a => !a.fixedPoint).length);
    nfixedagents.html("# fixed agents: " + universe.agents.filter(a => a.fixedPoint).length);
    quadcount.html("quad count: " + universe.qt.count());
    friction.html("friction: " + universe.att * 100 + "%")
    forces.html("# forces: " + universe.forces.length)
    time.html("t = " + floor(universe.time) + "; dt = " + universe.dt)
}

function hideDebug() {
    fps.html("");
    nagents.html("");
    nfixedagents.html("");
    quadcount.html("");
    friction.html("" )
    forces.html("")
    time.html("")
}

function debug(mode) {
    debugMode = mode;
}