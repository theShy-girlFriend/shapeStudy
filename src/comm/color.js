/**
 * 表示颜色， 每个分量0-1范围
 */
export class Color{
    constructor(r, g, b, a=1){
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    static white = new Color(1, 1, 1);
    static black = new Color(0, 0, 0);
    static red = new Color(1, 0, 0);
    static green = new Color(0, 1, 0);
    static blue = new Color(0, 0, 1);
    static yellow = new Color(1, 1, 0);
}