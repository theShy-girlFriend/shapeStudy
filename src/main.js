
import { Graphics, ClearFlag } from "./core/graphics.js"

let fps_interval, starttime, now, last, elapsed, dt;
let canvas, context, graphics;

window.onload = (e) => {

    canvas = document.getElementById("main_canvas");
    context = canvas.getContext("2d");
    graphics = new Graphics(context);

    console.log("hello world", e);

    render()
    init({fps: 60});
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
    graphics.clear(ClearFlag.Background, "black");
    
}
