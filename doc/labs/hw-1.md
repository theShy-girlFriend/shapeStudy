# 实验一：实现一个Vector3类，包含以下功能
``` js
// 向量加法
Vector3 add(Vector3 v);

// 向量减法
Vector3 sub(Vector3 v);

// 两点距离
float Distance(Vector3 v);

// 标量乘法
Vector3 mulScalar(float s);

// 点乘
float dot(Vector3 v);

// 叉乘
Vector3 cross(Vector3 v);

// 向量取反
Vector3 negative();

// 向量长度
float magnitude();

// 平方长度
float sqrMagnitude();

// 是否为0
bool isZero();

// 标准化
Vector3 normalize();

// 获取两向量夹角: 弧度即可
float angle(v);
```