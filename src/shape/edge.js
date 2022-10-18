
import { Vector3 } from "../math/vector.js";
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
         //Fix: edgeLength * edgeLength 是不是等于edge.length()不开平方？
         let r = ap1.dot(edge) / edge.sqrLength();
         if(r < 0) {
            return ap1.length();
         }else if(r > 1) {
            return ap2.length();
         }else {
            //Fix: 1. 同上，ap1Length的开平方又平方问题
            //Fix: 2. edgeLength * r * edgeLength * r可以化简
            return Math.sqrt(ap1.sqrLength()- r *  ap1.dot(edge))
         }
    }
    // 两条线段的交点
    edgeIntersect(dege){

    }
}

//Fix: 测试代码单独放在一个函数中，不要直接放在文件中
let edge1 = new Edge(new Vector3(0,1,2), new Vector3(2, 3 ,3));
console.log(edge1.distanceToPoint(new Vector3(0,2,1)), '点到线段的最短距离');