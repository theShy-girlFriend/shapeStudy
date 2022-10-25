// 矩阵
class Matrix4x4 {
    constructor(arr) {
        this.val = arr;
    }
    // 单位矩阵
    static identity() {
        return [
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1]
        ]
    }
    // 矩阵相乘
    mul(Matrix4x4) {
        let result = []
        Matrix4x4.val.forEach((element,index) =>{
            let valArray = []
            let sum = 0;
            element.forEach((val, valIndex) =>{
                sum+= val * this.val[valIndex][index];
            })
            valArray.push(sum)
            result.push(valArray)      
        })
        return result;
    }

    // 矩阵与向量相乘
    mulV3(v3) {
        let v3Arr = [v3.x, v3.y, v3.z, 0]
        let result = []
        this.val.forEach(element => {
            let valArray = []
            let sum = 0;
            element.forEach((val, index) =>{
                sum += val * v3Arr[index];
            })
            valArray.push(sum)
            result.push(valArray)
        })
        return result;
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
        return result;
    }
}

// 矩阵测试代码
export function testMatrix4x4() {
    let test = new Matrix4x4([[1,2,2,3]]);
    console.log(Matrix4x4.identity())
    console.log(test.mulS(2))
    console.log(test.mulV3({x: 2, y: 3, z: 4}))
    console.log(test.mul([[2], [5], [5], [3]]))
}