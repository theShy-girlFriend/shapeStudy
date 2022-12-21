# 实验3：实现Graphics类中的光栅化绘制三角形功能
> 需要实现的类：
## 1. Vector4/Vector2 四维向量类/二维向量类
``` js
class Vector4{
    float x;
    float y;
    float z;
    float w;
}
class Vector2{
    float x;
    float y;
}
```
## 2. Vertex 顶点信息类
``` js
class Vertex{
    // 顶点位置
    Vector4 position;
    // UV坐标
    Vector2 uv;
    // 顶点色
    Color color;
    // ...(需要再补充其他数据)
}
```

> 需要实现的方法：
## 3. Graphics的drawTriangle接口
> 这里认为vertices中的顶点已经变换到屏幕空间内，是一个2D的点，以下实现暂不考虑深度测试、透明度测试、模板测试、透明度混合，直接覆盖绘制即可

``` js
// vertices是一个顶点列表：List<Vertex>类型；vertexIndics是一个顶点索引列表：List<int>类型，长度必须是3的整数倍（一个三角形由3个顶点构成）
void drawTriangle(vertices, vertexIndics);

```

# 完成要求：
> 1. 绘制点请使用Graphics类中的`setPixel(x, y, color)`接口
> 2. 代码写在main.js中的render函数中，里面有标明start和end的区域
> 3. 使用上面完成的drawTriangle()接口绘制一个三角形在屏幕区域上，颜色自己决定
> 4. 进阶：三角形可以顺时针旋转

## 参考资料
+ 3D数学基础第一版：
  + 14章三角网格-索引三角网格
  