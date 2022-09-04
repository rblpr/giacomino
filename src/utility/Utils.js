class Utils {

    constructor() { }

    checkCollision(a, b) {
        if(a.fixedPoint && b.fixedPoint) return;

        if (a.type == Types.circle && b.type == Types.circle) {
            let distance = dist(a.pos.x, a.pos.y, b.pos.x, b.pos.y);
            return (distance <= a.radius + b.radius);
        } else if (a.type == Types.rect && b.type == Types.circle) {
            return this.intersects_cs(b, a);
        } else if (b.type == Types.rect && a.type == Types.circle) {
            return this.intersects_cs(a, b);
        } else if(a.type == Types.rect && b.type == Types.rect){
            return this.intersects_cc(a,b)
        }
    }

    popBaloon(baloon) {
        console.log(baloon)
        baloon.mask = 2;
        baloon.color = color(200);
        universe.agents = universe.agents.filter(a => a != baloon);
        nbaloons--;
    }



    collide(a, b) {

        if((a.id == 1 && b.type == Types.circle && b.id == 0)) {
            this.popBaloon(a);
            return;
        } else if(b.id == 1 && a.type == Types.circle && a.id == 0){
            this.popBaloon(b);
            return;
        }

        let v1 = a.v;
        let v2 = b.v;
        let t1 = a.v.heading();
        let t2 = b.v.heading();
        let m1 = a.m;
        let m2 = b.m;
        let p = p5.Vector.sub(b.pos, a.pos).heading()

        if(b.type == Types.rect && a.type == Types.circle) {
            let ax = a.pos.x;
            let ay = a.pos.y;
            let bx = b.pos.x;
            let by = b.pos.y;
            
            if(ax < bx - b.radius / 2 && ay > by - b.h/2 && ay < by + b.h/2){
                p = 0;
            }else if(ax > bx + b.radius / 2 && ay > by - b.h/2 && ay < by + b.h/2) {
                p = Math.PI;
            }else {
                p = Math.PI / 2
            }  
        } else if(a.type == Types.rect && b.type == Types.circle) {
            let ax = a.pos.x;
            let ay = a.pos.y;
            let bx = b.pos.x;
            let by = b.pos.y;
            
            if(bx < ax - a.radius / 2 && by > ay - a.h/2 && by < ay + a.h/2){
                p = 0;
            }else if(bx > ax + a.radius / 2 && by > ay - a.h/2 && by < ay + a.h/2) {
                p = Math.PI;
            }else {
                p = Math.PI / 2
            }  
        } else if(a.type == Types.rect && b.type == Types.rect) {
            
        }
        clog("phi: ", degrees(p))

        //let first = v1.mag() * Math.cos(t1 - p) * (m1 - m2) + 2 * m2 * v2.mag() * Math.cos(t2 - p);
        let first = sol.sum( sol.mul(sol.mul(v1.mag(), (m1 - m2)), Math.cos(t1 - p)), 2 * sol.mul(sol.mul(m2, v2.mag()), Math.cos(t2 - p)))
        let second = sol.mul(v1.mag(), Math.sin(t1 - p));
        //let v1x = first * Math.cos(p) / (m1 + m2) + second * Math.cos(p + Math.PI / 2);
        let v1x = sol.sum( sol.div(sol.mul(first, Math.cos(p)), (m1 + m2)), sol.mul(second, Math.cos(p + Math.PI / 2)));
        //let v1y = first * Math.sin(p) / (m1 + m2) + second * Math.sin(p + Math.PI / 2);
        let v1y = sol.sum( sol.div(sol.mul(first, Math.sin(p)), (m1 + m2)), sol.mul(second, Math.sin(p + Math.PI / 2)))
        a.v = createVector(v1x, v1y);
        a.v.setMag(a.v.mag() * (1 - universe.att))

        //first = v2.mag() * Math.cos(t2 - p) * (m2 - m1) + 2 * m1 * v1.mag() * Math.cos(t1 - p);
        first = sol.sum( sol.mul(sol.mul(v2.mag(), (m2 - m1)), Math.cos(t2 - p)), 2 * sol.mul(sol.mul(m1, v1.mag()), Math.cos(t1 - p)));
        second = sol.mul(v2.mag(), Math.sin(t2 - p));
        //let v2x = first * Math.cos(p) / (m2 + m1) + second * Math.cos(p + Math.PI / 2);
        let v2x = sol.sum( sol.div(sol.mul(first, Math.cos(p)), (m1 + m2)), sol.mul(second, Math.cos(p + Math.PI / 2)));
        //let v2y = first * Math.sin(p) / (m2 + m1) + second * Math.sin(p + Math.PI / 2);
        let v2y = sol.sum( sol.div(sol.mul(first, Math.sin(p)), (m1 + m2)), sol.mul(second, Math.sin(p + Math.PI / 2)));
        b.v = createVector(v2x, v2y);
        b.v.setMag(b.v.mag() * (1 - universe.att))


    }

    intersects_cs(circle, rect) {
        let circleDistance = {};
        circleDistance.x = abs(circle.pos.x - rect.pos.x);
        circleDistance.y = abs(circle.pos.y - rect.pos.y);

        if (circleDistance.x > (rect.radius / 2 + circle.radius)) { return false; }
        if (circleDistance.y > (rect.h / 2 + circle.radius)) { return false; }

        if (circleDistance.x <= (rect.radius / 2)) { return true; }
        if (circleDistance.y <= (rect.h / 2)) { return true; }

        let cornerDistance_sq = Math.pow(circleDistance.x - rect.radius / 2, 2) +
            Math.pow(circleDistance.y - rect.h / 2, 2);

        return (cornerDistance_sq <= Math.pow(circle.r, 2));
    }

    intersects_cc(r1, r2) {
        return !(r1.x - r1.radius > r2.x + r2.radius ||
            r1.x + r1.radius < r2.x - r2.radius ||
            r1.y - r1.h > r2.y + r2.h ||
            r1.y + r1.h < r2.y - r2.h
        )
      }

}

