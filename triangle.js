import { Vector3 } from "./vector.js";

// 三角形
class Triangle {
    constructor(point1, point2, point3){
        this.point1 = point1; // 顶点1
        this.point2 = point2; // 顶点2
        this.point3 = point3; // 顶点3
        
        let edge1 = this.point1.sub(this.point2); // 边1
        let edge2 = this.point1.sub(this.point3); // 边2
        let edge3 = this.point2.sub(this.point3); // 边3
        if(edge1.add(edge2) !== edge3){
            throw new Error('not a triangle');
        }
        
        // 判断是否共线
        if(edge1.cross(edge2).length() === 0 || edge1.cross(edge3).length() === 0 || edge2.cross(edge3).length() === 0){
            throw new Error('not a triangle');
        }
    }
    // 周长
    perimeter() {
        let edge1Length = this.point1.distanceTo(this.point2); // 边1的长
        let edge2Length = this.point1.distanceTo(this.point3); // 边2的长
        let edge3Length = this.point2.distanceTo(this.point3); // 边3的长
        return edge1Length + edge2Length + edge3Length;
    }
    // 面积 --海伦公式(p为周长的一半)
    // s = √p(p - a)(p - b)(p - c)
    area() {
        let s = this.point1.sub(this.point2).cross(this.point1.sub(this.point3)).length() / 2;
        return s;
    }
    // 判断点是否在三角形内
    // 点与顶点构成的向量，进行叉乘，同号则在同一方向
    isContainPoint(vector) {

    }
    // 三角形包围盒
    getBoundingBox() {
        let xMax = Math.max(this.point1.x, this.point2.x, this.point3.x);
        let yMax = Math.max(this.point1.y, this.point2.y, this.point3.y);
        let zMax = Math.max(this.point1.z, this.point2.z, this.point3.z);
        let pMax = new Vector3(xMax, yMax, zMax)

        let xMin = Math.min(this.point1.x, this.point2.x, this.point3.x);
        let yMin = Math.min(this.point1.y, this.point2.y, this.point3.y);
        let zMin =  Math.min(this.point1.z, this.point2.z, this.point3.z);
        let pMin = new Vector3(xMin, yMin, zMin)
        let s = pMax.sub(pMin);

        let pLeftTop = new Vector3(xMin, yMin + s.y, zMin);
        let pRightBottom = new Vector3(xMax + s.x, yMax, zMax)

        return [pMin, pLeftTop, pMax, pRightBottom]
    }

    // 获取点p对应的重心坐标
    getBarycentric(p) {
        let s = this.area() * 2;
        console.log(s)
        let u = (p.sub(this.point1)).cross(this.point1.sub(this.point2)).length() / s;
        let v = p.sub(this.point2).cross(this.point2.sub(this.point3)).length() / s;
        let w = (p.sub(this.point3)).cross(this.point1.sub(this.point3)).length() / s;
        return [u,v,w]
    }
}

let testTriangle = new Triangle(new Vector3(0,0,0), new Vector3(3,0,0), new Vector3(0,4,0));
let edge1=testTriangle.point1.sub(testTriangle.point2);
let edge2 = testTriangle.point1.sub(testTriangle.point3);
console.log(testTriangle.area(), '三角形面积');

console.log(testTriangle.getBarycentric(new Vector3(1.5,0.5,0)), '重心坐标');
console.log(testTriangle.getBarycentric(new Vector3(1.5,0.5,0)), '重心坐标');
console.log(testTriangle.getBoundingBox(), '包围盒');
let test = new Triangle(new Vector3(0,0,1), new Vector3(0,0,2), new Vector3(0,0,3))
console.log(test)