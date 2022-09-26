
import { Vector3 } from "./vector.js";
// 边
class Edge {
    // 顶点
    constructor(p1, p2){
        this.p1 = p1;
        this.p2 = p2;
    }
    // 点到边的最短距离
    /**
     * 判断投影与线段长度比
     * 0<r<1 最近的点为垂足
     * >1 p2
     *  ≤ 0 p1
     */
    distanceToPoint(point){
         let ap1 = point.sub(this.p1);
         let edge = this.p2.sub(this.p1);
         let ap2 = point.sub(this.p2);
         let edgeLength = edge.length();
         let r = ap1.dot(edge) / (edgeLength * edgeLength);
         if(r < 0) {
            return ap1.length();
         }else if(r > 1) {
            return ap2.length();
         }else {
            let ap1Length = ap1.length();
            return Math.sqrt(ap1Length * ap1Length - edgeLength * r * edgeLength * r)
         }
    }
    // 两条线段的交点
    edgeIntersect(dege){

    }
}

let edge1 = new Edge(new Vector3(0,1,2), new Vector3(2, 3 ,3));
console.log(edge1.distanceToPoint(new Vector3(0,2,1)), '点到线段的最短距离');