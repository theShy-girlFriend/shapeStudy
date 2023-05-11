// 2维向量
export class Vector2 {
    constructor(x, y){
        this.x = x || 0;
        this.y = y || 0;
    }
     // 向量加法
     add(v) {
        let x = this.x + v.x;
        let y = this.y + v.y;
        return new Vector2(x, y)
    }
    // 向量减法
    sub(v) {
        let x = this.x - v.x;
        let y = this.y - v.y;
        return new Vector3(x, y)
    }
}
// 3维向量
export class Vector3 {

    constructor(x,y,z){
        this.x = x || 0; // x坐标
        this.y = y || 0; // y坐标
        this.z = z || 0; // z坐标
    }

    static zero = new Vector3(0, 0, 0);
    static one = new Vector3(1, 1, 1);
    static up = new Vector3(0, 1, 0);
    static right = new Vector3(1, 0, 0);
    static forward = new Vector3(0, 0, 1);

    // 向量加法
    add(v) {
        let x = this.x + v.x;
        let y = this.y + v.y;
        let z = this.z + v.z;
        return new Vector3(x, y, z)
    }
    // 向量减法
    sub(v) {
        let x = this.x - v.x;
        let y = this.y - v.y;
        let z = this.z - v.z;
        return new Vector3(x, y, z)
    }
    // 向量间的距离
    distanceTo(v) {
        let x = this.x - v.x;
        let y = this.y - v.y;
        let z = this.z - v.z;
        return Math.sqrt(x * x + y * y +  z * z);
    }
    // 向量和标量乘法
    multiplyScalar(num) {
        let x = this.x * num;
        let y = this.y * num;
        let z = this.z * num;
        return new Vector3(x, y, z);
    }
    // 点乘
    dot(v) {
        let x = this.x * v.x;
        let y = this.y * v.y;
        let z = this.z * v.z;
        return x+y+z;
    }
    // 叉乘
    cross(v) {
        let x = this.y * v.z - this.z * v.y;
        let y = this.z * v.x - this.x * v.z;
        let z = this.x * v.y - this.y * v.x;
        return new Vector3(x, y, z)
    }
    // 2d向量叉乘
    cross2D(v) {
        let result = this.x * v.y - this.y * v.x;
        return result
    }
    // 向量取反
    negate() {
        let x = -this.x;
        let y = -this.y;
        let z = -this.z;
        return new Vector3(x, y, z)
    }
    // 向量长度
    length() {
        return Math.sqrt(this.sqrLength());
    }
    //Fix: 浮点型数值和0的判定: 减0等于没减，化简
    // 是否为零向量
    isZero() {
        if(Math.abs(this.x) < 1e-5 && Math.abs(this.y) < 1e-5 && Math.abs(this.z) < 1e-5) return true;
        else return false;
    }
    // 单位向量
    normalize() {
        let length = this.length();
        let x = this.x / length;
        let y = this.y / length;
        let z = this.z / length;
        return new Vector3(x, y, z)
    }
    // 获取向量弧度
    angle(v) {
       let angle = Math.acos(this.dot(v) / (this.length() * v.length()));
       return angle; 
    }
    // 向量长度的平方
    sqrLength() {
        return this.x * this.x + this.y * this.y +  this.z * this.z; 
    }

}
// 4维向量
export class Vector4 {
    constructor(x,y,z, w){
        this.x = x || 0; // x坐标
        this.y = y || 0; // y坐标
        this.z = z || 0; // z坐标
        this.w = w || 0; // w坐标
    }

}
// 顶点信息类
export class Vertex {
    constructor(position, uv, color) {
        this.position = position;
        this.uv = uv;
        this.color = color;
    }
}
//Fixed: 测试代码单独放在一个函数中，不要直接放在文件中
function testV3() {
    let testV3 = new Vector3(0, 2, 0);
    console.log(testV3, '创建向量');
    console.log(testV3.isZero(), '零向量');
    console.log(testV3.length(), '向量长度')
    console.log(testV3.negate(), '向量取反');
    console.log(testV3.normalize(), '单位向量');
    console.log(testV3.add(new Vector3(0, 0, 0)), '向量加法');
    console.log(testV3.sub(new Vector3(0, 0, 0)), '向量减法');
    console.log(testV3.multiplyScalar(2), '向量与标量乘法');
    console.log(testV3.dot(new Vector3(0, 0, 0)), '向量点乘');
    console.log(testV3.cross(new Vector3(0, 0, 0)), '向量叉乘');
    console.log(testV3.angle(new Vector3(1, 0, 0)), '向量间的角度');
} 

