import { Vector3 } from "./vector.js";

// 三角形
class Triangle {
    constructor(edge1, edge2, edge3){
        this.edge1 = this.edge1.sub(this.edge2); // 边1
        this.edge2 = this.edge1.sub(this.edge3); // 边2
        this.edge3 = this.edge2.sub(this.edge3); // 边3
        if(this.edge1.add(this.edge2) !== this.edge3){
            return 'not a triangle'
        }
    }
    // 周长
    perimeter() {
        let edge1Length = this.edge1.length(); // 边1的长
        let edge2Length = this.edge2.length(); // 边2的长
        let edge3Length = this.edge3.length(); // 边3的长
        return edge1Length + edge2Length + edge3Length;
    }
    // 面积 --海伦公式(p为周长的一半)
    // s = √p(p - a)(p - b)(p - c)
    area() {
        let p = this.perimeter() / 2;
        let s = Math.sqrt(p * (p - this.edge1.length())*(p - this.edge2.length())*(p - this.edge3.length()))
        return s;
    }
}