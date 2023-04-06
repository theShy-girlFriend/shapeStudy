import { Color } from "../comm/color.js";
import { Vector3 } from "../math/vector.js";
import { Triangle } from "../shape/triangle.js";

export const ClearFlag = {
    Background: 0b1,
    Depth: 0b10,
    Stencil: 0b100
}

export class Graphics {
    constructor(context) {
        this.ctx = context;
        this.canvas = context.canvas;
        this.frameBufferDirty = true;
        this.size = {
            width: this.canvas.width,
            height: this.canvas.height
        }
        this.frameBuffer = this.ctx.getImageData(0, 0, this.size.width, this.size.height);
    }

    /**
     * DDA直线算法
     * @param {a坐标} a 
     * @param {b坐标} b 
     */
    DDALine(a, b, color) {
        let ax = a.x, ay = a.y, bx = b.x, by = b.y;
        let dx = b.x - a.x;
        let dy = b.y - a.y;

        let k = dy / dx;
        if (Math.abs(k) < 1){
            let y = a.y;
            if( a.x > b.x){
                ax = b.x; bx = a.x; y = b.y;
            }
            for (let x = ax; x <= bx; x++) {
                this.setPixel(x, Math.trunc(y + 0.5), color);
                y += k;
            }
        }else{
            let x = a.x;
            if( a.y > b.y){
                ay = b.y; by = a.y; x = b.x;
            }
            const k2 = 1.0 / k;
            for (let y = ay; y <= by; y++){
                this.setPixel(Math.trunc(x + 0.5), y, color);
                x += k2;
            }
        }
    }

    /**
     * Bresenham直线算法
     * @param {a坐标} a 
     * @param {b坐标} b 
     * @param {颜色} color 
     */
    bresenhamLine(a, b, color){
        let ax = a.x, ay = a.y, bx = b.x, by = b.y;
        let dx = b.x - a.x;
        let dy = b.y - a.y;
        let sign = Math.sign(dx * dy);
        let adx = Math.abs(dx);
        let ady = Math.abs(dy);

        // 斜率绝对值小于1
        if (ady < adx){
            // 斜率小于1
            if (a.x > b.x){
                ax = b.x;  bx = a.x; ay = b.y; by = a.y;
            }
            if (sign < 0)
            {
                let y = by;
                let e = -adx;
                for(let x = bx; x >= ax; x--) {
                    this.setPixel(x, y, color);
                    e += 2 * ady;
                    if(e >= 0){
                        y++;
                        e -= 2 * adx;
                    }
                }
            }else{
                let y = ay;
                let e = -adx;
                for(let x = ax; x <= bx; x++) {
                    this.setPixel(x, y, color);
                    e += 2 * ady;
                    if(e >= 0){
                        y++;
                        e -= 2 * adx;
                    }
                }
            }
        }else{
            if( a.y > b.y){
                ax = b.x;  bx = a.x; ay = b.y; by = a.y;
            }
            if (sign > 0){
                let x = ax;
                let e = -ady;
                for(let y = ay; y <= by; y++){
                    this.setPixel(x, y, color);
                    e += 2 * adx;
                    if ( e >= 0){
                        x++;
                        e -= 2 * ady;
                    }
                }
            }else{
                let x = bx;
                let e = -ady;
                for(let y = by; y >= ay; y--){
                    this.setPixel(x, y, color);
                    e += 2 * adx;
                    if ( e >= 0){
                        x++;
                        e -= 2 * ady;
                    }
                }
            }
        }
    }
    // 画三角形
    drawTriangles(vertices,vertexIndics){
        let ponit1 = vertices[0].position;
        let ponit2 = vertices[1].position;
        let ponit3 = vertices[2].position;
        let triangle = new Triangle(new Vector3(ponit1.x, ponit1.y, ponit1.z), new Vector3(ponit2.x,ponit2.y,ponit2.z), new Vector3(ponit3.x, ponit3.y, ponit3.z));
        let box = triangle.getBoundingBox();
        let minVector = box[0];
        let maxVector = box[1];
        for(let x = minVector.x; x < maxVector.x; x++) {
            for(let y = minVector.y; y < maxVector.y; y++) {
                if(triangle.isContainPoint2D(new Vector3(x,y,0))){
                    this.setPixel(x, y, Color.red);
                }
            }
        }
    
    }

    getFrameData(x, y) {
        x = Math.trunc(x);
        y = Math.trunc(y);
        if (!this.isPixelCoordValid(x, y)) {
            return -1;
        }
        this.updateFrameBufferFromCtx();
        const i = y * this.size.width * 4 + x * 4;
        return [this.frameBuffer.data[i], this.frameBuffer.data[i + 1], this.frameBuffer.data[i + 2], this.frameBuffer.data[i + 3]];
    }

    setFrameData(x, y, v) {
        x = Math.trunc(x);
        y = Math.trunc(y);
        if (!this.isPixelCoordValid(x, y)) {
            return;
        }
        const i = y * this.size.width * 4 + x * 4;
        this.frameBuffer.data[i] = v.r * 255;
        this.frameBuffer.data[i + 1] = v.g * 255;
        this.frameBuffer.data[i + 2] = v.b * 255;
        this.frameBuffer.data[i + 3] = v.a * 255;
    }


    setPixel(x, y, color) {
        if (!(color instanceof Color)) {
            throw "color必须是Color类的实例";
        }

        this.setFrameData(x, y, color);
    }


    getPixel(x, y) {
        return this.getFrameData(x, y);
    }

    isPixelCoordValid(x, y) {
        return !(x < 0 || x >= this.size.width || y < 0 || y >= this.size.height);
    }

    setFrameBufferDirty() {
        this.frameBufferDirty = true;
    }

    clear(clear_flag, value) {
        if (clear_flag | ClearFlag.Background) {
            this.ctx.save()
            this.ctx.fillStyle = value;
            this.ctx.fillRect(0, 0, this.size.width, this.size.height);
            this.ctx.restore();
            this.setFrameBufferDirty();
            this.updateFrameBufferFromCtx();
        }
    }

    submitFrameBuffer() {
        this.ctx.putImageData(this.frameBuffer, 0, 0);
    }

    updateFrameBufferFromCtx() {
        if (this.frameBufferDirty) {
            this.frameBuffer = this.ctx.getImageData(0, 0, this.size.width, this.size.height);
            this.frameBufferDirty = false;
        }
    }
}