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
}