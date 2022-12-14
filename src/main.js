
import { Color } from "./comm/color.js";
import { Graphics, ClearFlag } from "./core/graphics.js"
import { Vector3 } from "./math/vector.js";
import { testTriangle } from "./shape/triangle.js";
import { testMatrix4x4 } from "./math/matrix4x4.js";

let fps_interval, starttime, now, last, elapsed, dt;
let canvas, context, graphics;
const radius = 300;
let degree = 0;

window.onload = (e) => {

    canvas = document.getElementById("main_canvas");
    context = canvas.getContext("2d", {willReadFrequently: true});
    graphics = new Graphics(context);

    init({fps: 120});
    testMatrix4x4();
}

function init(args) {
    const fps = args.fps || 60;
    fps_interval = 1000.0 / fps;
    last = Date.now();
    starttime = last;
    frame_loop()
}

function frame_loop(){
    requestAnimationFrame(frame_loop);
    now = Date.now();
    elapsed = now - last;

    if(elapsed < fps_interval){
        return;
    }

    last = now - elapsed % fps_interval;
    render(elapsed / 1000.0)
}

function render(dt) {
    graphics.clear(ClearFlag.Background, "white");
    ///////////////////////在这里写绘制图形的逻辑-begin////////////////////////
    
    degree += dt * 20;
    let r = degree * Math.PI / 180.0;
    let s = Math.sin(r);
    let c = Math.cos(r);

    let center = new Vector3(400, 300);
    let p1 = center.add(new Vector3(c * radius, s * radius, 0));

    // graphics.DDALine(center, p1, Color.black);
    graphics.bresenhamLine(center, p1, Color.black);
    // graphics.bresenhamLine(new Vector3(0, 0, 0), new Vector3(100, 50, 0) , Color.black);
    // graphics.DDALine(p1, p2, Color.black);

    ///////////////////////在这里写绘制图形的逻辑-end////////////////////////
    graphics.submitFrameBuffer();
}
