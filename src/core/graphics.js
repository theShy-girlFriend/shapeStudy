
export const ClearFlag = {
    Background : 0b1,
    Depth : 0b10,
    Stencil: 0b100
}

export class Graphics{
    constructor(context){
        this.ctx = context;
        this.canvas = context.canvas;
        this.canvas.willReadFrequently = true;
        this.frameBufferDirty = true;
        this.size = {
            width: this.canvas.width,
            height: this.canvas.height
        }
        this.frameBuffer = this.ctx.getImageData(0, 0, this.size.width, this.size.height);
    }

    setPixel(x, y, color){
        // this.frameBuffer
    }

    getPixel(x, y, color){

    }

    setFrameBufferDirty(){
        this.frameBufferDirty = true;
    }

    clear(clear_flag, value){
        if ( clear_flag | ClearFlag.Background){
            this.ctx.save()
            this.ctx.fillStyle = value;
            this.ctx.fillRect(0, 0, this.size.width, this.size.height);
            this.ctx.restore();
        }
    }

    updateFrameBufferToCtx(){
        this.ctx.putImageData(this.frameBuffer, 0, 0);
    }

    updateFrameBufferFromCtx(){
        if (this.frameBufferDirty){
            this.frameBuffer = this.ctx.getImageData(0, 0, this.size.width, this.size.height);
            this.frameBufferDirty = false;
        }
    }
}