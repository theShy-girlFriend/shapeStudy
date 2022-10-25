# 实验3：实现一个矩阵类Matrix4x4
## Matrix4x4类

``` js

// 返回一个单位矩阵
static Matrix4x4 identity();

// 实现矩阵乘法
Matrix4x4 mul(Matrix4x4 m);

// 实现矩阵和4维向量的乘法
Vector4 mulV4(Vector4 v);

// 实现矩阵和3维向量的乘法 (默认第4维为0)
Vector3 mulV3(Vector3 v);

// 实现矩阵和标量乘
Matrix4x4 mulS(float s);

// 实现矩阵缩放(三个维度缩放不同)
Matrix4x4 scaleV3(Vector3 scale);

// 实现缩放矩阵（统一缩放）
Matrix4x4 scale(float scale);

// 实现旋转矩阵 axis: 旋转轴, radians: 旋转角度（弧度）
Matrix4x4 rotate(Vector3 axis, float radians);

// 实现平移矩阵
Matrix4x4 translate(Vector3 offset);

// 实现转置矩阵
Matrix4x4 transpose();

// 实现逆矩阵 (如果不存在，返回自身)
Matrix4x4 inverse();


```

## 参考资料
+ 3D游戏与计算机图形学中的数学方法(第三版).pdf 中的第3章——矩阵（pdf书放在/doc/book中）
+ 矩阵是否有逆（判定其行列式是否非0）： https://www.mathsisfun.com/algebra/matrix-determinant.html
+ 求逆（如果是正交矩阵，逆=转置）：https://www.mathsisfun.com/algebra/matrix-inverse-minors-cofactors-adjugate.html