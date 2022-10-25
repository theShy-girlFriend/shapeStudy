# 实验2：实现一个Edge类和Triangle类，包含以下功能
## Edge类

``` js
// 点到线段的最短距离
float distanceToPoint(Vector3 v);

// 求两条边的交点
Vector3 edgeIntersect(Edge e);

```


## Triangle类
+ 存储结构：x, y, z三个分量
```js
// 求周长
float perimeter();

// 求面积
float area();

// 一个3D点是否位于三角形内(暂时不做)
bool isContainPoint(Vector3 p);

// 一个2D点是否位于2D三角形内（三角形和点均忽略z分量，只判定w分量）
bool isContainPoint2D(Vector3 p);

// 获取三角形的AABB包围盒，结果暂时存储在长度为2的数组中
List<Vector3> getBoundingBox();

// 获取三角形内一个点的重心坐标，结果存储在长度为3的数组中
List<float> getBarycentric(Vector3 p);

```

## 参考资料
+ 三角形重心坐标： https://www.scratchapixel.com/lessons/3d-basic-rendering/ray-tracing-rendering-a-triangle/barycentric-coordinates
+ 3D点是否位于三角形内：https://gdbooks.gitbooks.io/3dcollisions/content/Chapter4/point_in_triangle.html