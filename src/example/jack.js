let fac;
let universe;
let sol;

const steps = 40;
let nbaloons = 0;

function setup() {
    let c = createCanvas(400, 400);
    c.parent(select("#canvasdiv"))

    universe = new Universe(1 / steps, 0);
    sol = new Solver();
    fac = new AgentFactory();

    let ag = fac.setPos(200 + random(-3, 3), 25).setMass(100).setGeometry(Types.circle, 6).setOptions({ mask: 1, fixedPoint: false, color: 20 }).create();
    //let ag = fac.setPos(225, 25).setMass(100).setGeometry(Types.circle, 6).setOptions({ mask: 1, fixedPoint: false }).create();
    universe.addAgent(ag)
    fac.reset();
    universe.addForce(new Force(cv(0, 0.1), 1));

    pioli();
    walls();

    for(let i = 0; i < 14; i++) {
        nbaloons++;
        let col = color(random(255),random(255),random(255))
        let a = fac.setPos(i*25 + 35, 370).setMass(100).setGeometry(Types.circle, round(random(6,12))).setOptions({ mask: 1, fixedPoint: false, color: col }).create();
        a.id = 1;
        universe.addAgent(a);
        fac.reset();
    }
}

function draw() {
    background(200)

    for (let i = 0; i < steps; i++) {
        universe.step();
    }
    universe.draw();

    checkLevel(universe.agents[0]);
    if(nbaloons == 0) {
        restart();
    }
}

function restart() {
    universe.clearAgents();
    setup();
}

let prevLvl = 0;
let lvl = 0;
let videos = ["lvl1.mp4","lvl2.mp4","lvl3.mp4","lvl4.mp4","lvl5.mp4", "lvl6.mp4"]
function checkLevel(a) {
    if(a.pos.y < 100) {
        lvl = 0;
    } else if(a.pos.y < 160){
        lvl = 1;
    }else if(a.pos.y < 220){
        lvl = 2;
    }else if(a.pos.y < 280){
        lvl = 3;
    }else if(a.pos.y < 340){
        lvl = 4;
    }else if(a.pos.y < 340){
        lvl = 4;
    }else if(a.pos.y < 400){
        lvl = 5;
    } 

    if(lvl != prevLvl) {
        changeVideo();
        prevLvl = lvl;
    }

}

function changeVideo() {
    let dir = "src/videos/" + videos[lvl];
    document.querySelector("#videodiv").innerHTML = `
        <video width="400" height="240" autoplay loop>
        <source src="${dir}" type="video/mp4">
    </video>
    `
    
}