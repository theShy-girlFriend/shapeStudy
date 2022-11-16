import { Vector3 } from "../math/vector.js";

// 矩阵
class Matrix4x4 {
    constructor(arr) {
        this.val = arr;
    }
    // 单位矩阵
    static identity() {
        return new Matrix4x4([
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ])
    }
    // 矩阵相乘
    mul(M4) {
        let result = []
        let length = M4.val[0].length;
        M4.val.forEach((element, index) => {
            let valArray = []  
            for(let i = 0; i < length; i++){
                let sum = 0;
                element.forEach((val,valIndex) =>{
                    sum+= val * this.val[valIndex][i]      
                })
                valArray.push(sum)
            }
            result.push(valArray) 
        })
        return new Matrix4x4(result);
    }

    // 矩阵与向量相乘
    mulV3(v3) {
        let v3Arr = [v3.x, v3.y, v3.z, 0]
        let result = []
        this.val.forEach(element => {
            let sum = 0;
            element.forEach((val, index) =>{
                sum += val * v3Arr[index];
            })
            result.push(sum)
        })
        return new Vector3(result[0] ? result[0] : 0,  result[1]? result[1] : 0,  result[2]? result[2] : 0);
    }

    // 与标量相乘
    mulS(s) {
       let result = []
       this.val.forEach(element => {
            let valArray = [];
            element.forEach(val => {
                valArray.push(val * s)
            })
            result.push(valArray)
        });
        return new Matrix4x4(result);
    }

    // 矩阵平移
    translate(v3) {
        let result = [];
        let translateData = [v3.x, v3.y, v3.z, 0];
        this.val.forEach((element,index) => {
            let sum = [].concat(element);
            sum[index] = sum[index] + translateData[index];
            result.push(sum)
        })
        return new Matrix4x4(result);
    }

    // 转置矩阵
    transpose() {
        let result = [];
        let length = this.val[0].length
        for(let i = 0; i < length; i++){
            let valArray = [];
            this.val.forEach(item =>{
                valArray.push(item[i])
            })
            result.push(valArray)
        }   
         return new Matrix4x4(result);
    }
}

// 矩阵测试代码
export function testMatrix4x4() {
    let test = new Matrix4x4([[-3, 5], [0, 0.5]]);
    let test1 = new Matrix4x4([[3], [-1], [4]])
    console.log(Matrix4x4.identity())
    console.log(test.mulS(2))
    console.log(test.mulV3(new Vector3(2, 3, 4)))
    console.log(test.mul(new Matrix4x4([[-7, 4], [2, 6]])), '矩阵乘法')
    console.log(test1.mul(new Matrix4x4([[-2, 0, 3], [0, 7, -4], [3, -6, 2]])), '乘法2')
    console.log(test.transpose())
}