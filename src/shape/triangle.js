import { Vector3 } from "../math/vector.js";

// 三角形
class Triangle {
    constructor(point1, point2, point3){
        this.point1 = point1; // 顶点1
        this.point2 = point2; // 顶点2
        this.point3 = point3; // 顶点3
        
        let edge1 = this.point1.sub(this.point2); // 边1
        let edge2 = this.point1.sub(this.point3); // 边2
        let edge3 = this.point2.sub(this.point3); // 边3
        
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

    //Fix: 下面计算方式有误，没看到计算法相相关的代码，最终结果也不对
    // 判断点是否在三角形内
    // 点与顶点构成的向量的法向量，法向量在同一侧则在三角形内
    isContainPoint(point) {
        let a = this.point1.sub(point);
        let b = this.point2.sub(point);
        let c = this.point3.sub(point);
        let u = a.cross(b);
        let v = b.cross(c);
        let w = c.cross(a);
        if(u.dot(v) < 0) {
            return false;
        }
        if(u.dot(w) < 0) {
            return false;
        }
        return true;
    }

    //Fix: 直接用叉乘来判定，减少计算量，使用重心坐标的做法计算量太大
    // 判定一个2D的点是否在2D三角形内（只考虑三角形的xy坐标和v的xy坐标）
    isContainPoint2D(point){
        let edge0 = this.point1.sub(this.point2);
        let edge1 = this.point1.sub(this.point3);
        let edge2 = this.point1.sub(point);
        let dot00 = edge0.dot(edge0);
        let dot01 = edge0.dot(edge1);
        let dot11 = edge1.dot(edge1);
        let dot12 = edge1.dot(edge2);
        let dot02 = edge2.dot(edge0);
        let u = (dot02 * dot11 -dot12 * dot01) / (dot00 * dot11 - dot01 * dot01)
        let v= (dot12 * dot00 - dot02 * dot01) / (dot11 * dot00 - dot01 * dot01);
        if(u < 0 || v < 0 || u + v > 1){
            return false;
        }else {
            return true;
        }
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

        //Fixed: 包围盒仅需要两个点就可表示, pLeftTop和pRightBottom计算多余
        return [pMin,  pMax]
    }

    // 获取点p对应的重心坐标
    getBarycentric(p) {
        let s = (this.point1.sub(this.point2).cross(this.point1.sub(this.point3)));
        //Fixed: 1. this.point3.sub(this.point1).cross(this.point3.sub(this.point2))重复计算两次，不必要的消耗，考虑缓存起来
        //Fixed: 2. 下面的表达式是不是等于this.point3.sub(this.point1).cross(this.point3.sub(this.point2)).normalize() ?
        let n = (this.point3.sub(this.point1).cross(this.point3.sub(this.point2))).normalize();
        let sDot = s.dot(n);
        //Fixed: s.dot(n)重复计算多次，考虑缓存起来
        let u = (this.point1.sub(p)).cross(this.point2.sub(this.point1)).dot(n) / sDot;
        let v = this.point2.sub(p).cross(this.point3.sub(this.point2)).dot(n) / sDot;
        let w = (this.point3.sub(p)).cross(this.point1.sub(this.point3)).dot(n) / sDot;
        let sum = u + v + w;
        let testNum = (num) => {
            if(num > 1 || num < 0) {
                return true;
            }else {
                return false;
            }
        }
        if(sum !== 1 || testNum(u) || testNum(v) || testNum(w)){
            throw new Error('重心坐标不成立')
        }
        //Fixed: 没有判定u,v,w的有效性，u+v+w必须等于1，且u,v,w必须同时位于[0, 1]区间内
        return [u,v,w];
    }
}
//Fixed: 测试代码单独放在一个函数中，不要直接放在文件中
export function testTriangle() {
    let testTriangle = new Triangle(new Vector3(0,0,0), new Vector3(3,0,0), new Vector3(0,4,0));
    let edge1=testTriangle.point1.sub(testTriangle.point2);
    let edge2 = testTriangle.point1.sub(testTriangle.point3);
    console.log(testTriangle.area(), '三角形面积');
    
    console.log(testTriangle.getBarycentric(new Vector3(1.5,0.5,0)), '重心坐标');
    console.log(testTriangle.isContainPoint2D(new Vector3(2,0.5,0)), '测试点是否在三角形内部')
    // console.log(testTriangle.isContainPoint(new Vector3(0.5,0.5, 0.1)), '测试点是否在三角形内部')
    console.log(testTriangle.getBoundingBox(), '包围盒');
    let test = new Triangle(new Vector3(0,0,1), new Vector3(0,0,2), new Vector3(0,0,3))
    console.log(test)
}

//Fix: 不要在类文件里面调用测试代码，容易造成log混乱
testTriangle();