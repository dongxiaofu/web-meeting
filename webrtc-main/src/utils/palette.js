/**
 * Created by wyw on 2019/3/28.
 */
class Palette {
    constructor(canvas, {drawType = 'line', paint, imgDataInit, inputElement, drawColor = 'rgba(19, 206, 102, 1)', lineWidth = 5, sides = 3, allowCallback, moveCallback}) {
        this.canvas = canvas;
        this.width = canvas.width; // 宽
        this.height = canvas.height; // 高
        this.paint = paint;
        this.isClickCanvas = false; // 是否点击canvas内部
        this.isMoveCanvas = false; // 鼠标是否有移动
        this.imgData = []; // 存储上一次的图像，用于撤回
        this.imgDataInit = imgDataInit;
        this.index = 0; // 记录当前显示的是第几帧
        this.x = 0; // 鼠标按下时的 x 坐标
        this.y = 0; // 鼠标按下时的 y 坐标
        this.last = [this.x, this.y]; // 鼠标按下及每次移动后的坐标
        this.drawType = drawType; // 绘制形状
        this.drawColor = drawColor; // 绘制颜色
        this.lineWidth = lineWidth; // 线条宽度
        this.sides = sides; // 多边形边数

        this.inputElement = inputElement;
        // this.rectTxt = {
        //     x: 20,
        //     y: 20,
        //     width: 150,
        //     height: 50
        // };
        this.rectTxt = {
            x: 180,
            y: 200,
            width: 150,
            height: 50
        };
        this.mouseDownTxt = false;
        this.deltaX = 0;
        this.deltaY = 0;
        this.toolText = 'hello';
        this.textX = 0;
        this.textY = 0;
        //
        // this.onkeyupCallback = function () {
        //
        // };

        this.bindMouseKeyup = function () {
        }
        this.bindDbClick = function () {
        }


        this.allowCallback = allowCallback || function () {
        }; // 允许操作的回调
        this.moveCallback = moveCallback || function () {
        }; // 鼠标移动的回调
        this.bindMousemove = function () {
        }; // 解决 eventlistener 不能bind
        this.bindMousedown = function () {
        }; // 解决 eventlistener 不能bind
        this.bindMouseup = function () {
        }; // 解决 eventlistener 不能bind
        this.init();
    }

    init() {
        // 文字工具 start
        const inputEle = this.inputElement;
        // this.canvas.ondblclick = function (e) {
        //     inputEle.setAttribute('style', `left:${e.clientX}px;top:${e.clientY}px;display:block`);
        //     inputEle.focus();
        // }
        // 文字工具 end

        this.imgData.push(this.imgDataInit)
        this.paint.fillStyle = '#fff';
        this.paint.clearRect(0, 0, this.width, this.height);
        this.paint.putImageData(this.imgDataInit, 0, 0);

        this.index = this.imgData.length - 1; // 储存完后将 index 重置为 imgData 最后一位
        console.log('this.imgDataInit start')
        console.log(this.index)
        console.log('this.imgDataInit end')
        this.paint.fillStyle = '#fff';
        // this.paint.fillRect(0, 0, this.width, this.height);
        // this.gatherImage();
        this.bindMousemove = this.onmousemove.bind(this); // 解决 eventlistener 不能bind
        this.bindMousedown = this.onmousedown.bind(this);
        this.bindMouseup = this.onmouseup.bind(this);
        this.canvas.addEventListener('mousedown', this.bindMousedown);
        document.addEventListener('mouseup', this.bindMouseup);

        this.bindMouseKeyup = this.onkeyup.bind(this);
        this.inputElement.addEventListener('keyup', this.bindMouseKeyup);

        this.bindDbClick = this.ondblclick.bind(this);
        this.canvas.addEventListener('dblclick', this.bindDbClick);
    }

    onmousedown(e) { // 鼠标按下
        this.isClickCanvas = true;
        this.x = e.offsetX;
        this.y = e.offsetY;
        this.last = [this.x, this.y];

        let rect = this.rectTxt;
        this.deltaX = e.clientX - rect.x;
        this.deltaY = e.clientY - rect.y;
        this.mouseDownTxt = true;

        this.canvas.addEventListener('mousemove', this.bindMousemove);
    }

    gatherImage() { // 采集图像
        this.imgData = this.imgData.slice(0, this.index + 1); // 每次鼠标抬起时，将储存的imgdata截取至index处
        let imgData = this.paint.getImageData(0, 0, this.width, this.height);
        this.imgData.push(imgData);
        this.index = this.imgData.length - 1; // 储存完后将 index 重置为 imgData 最后一位
        console.log('this.imgDataInit2 start')
        console.log(this.index)
        console.log('this.imgDataInit2 end')
        this.allowCallback(this.index > 0, this.index < this.imgData.length - 1);
    }

    reSetImage() { // 重置为上一帧
        this.paint.clearRect(0, 0, this.width, this.height);
        if (this.imgData.length >= 1) {
            this.paint.putImageData(this.imgData[this.index], 0, 0);
        }
    }

    onmousemove(e) { // 鼠标移动
        this.isMoveCanvas = true;
        let endx = e.offsetX;
        let endy = e.offsetY;
        let clientX = e.clientX;
        let clientY = e.clientY;
        let width = endx - this.x;
        let height = endy - this.y;
        let now = [endx, endy]; // 当前移动到的位置
        switch (this.drawType) {
            case 'line' : {
                let params = [this.last, now, this.lineWidth, this.drawColor];
                this.moveCallback('line', ...params);
                this.line(...params);
            }
                break;
            case 'rect' : {
                let params = [this.x, this.y, width, height, this.lineWidth, this.drawColor];
                this.moveCallback('rect', ...params);
                this.rect(...params);
            }
                break;
            case 'polygon' : {
                let params = [this.x, this.y, this.sides, width, height, this.lineWidth, this.drawColor];
                this.moveCallback('polygon', ...params);
                this.polygon(...params);
            }
                break;
            case 'arc' : {
                let params = [this.x, this.y, width, height, this.lineWidth, this.drawColor];
                this.moveCallback('arc', ...params);
                this.arc(...params);
            }
                break;
            case 'eraser' : {
                let params = [endx, endy, this.width, this.height, this.lineWidth];
                this.moveCallback('eraser', ...params);
                this.eraser(...params);
            }
            case 'txt' : {
                let params = [clientX, clientY, this.width, this.height, this.lineWidth];
                this.moveCallback('txt', ...params);
                this.txt(...params);
            }
                break;
        }
    }

    onmouseup() { // 鼠标抬起
        if (this.isClickCanvas) {
            this.isClickCanvas = false;
            this.canvas.removeEventListener('mousemove', this.bindMousemove);
            if (this.isMoveCanvas) { // 鼠标没有移动不保存
                this.isMoveCanvas = false;
                this.moveCallback('gatherImage');
                this.gatherImage();
            }
        }
    }

    line(last, now, lineWidth, drawColor) { // 绘制线性
        this.paint.beginPath();
        this.paint.lineCap = "round"; // 设定线条与线条间接合处的样式
        this.paint.lineJoin = "round";
        this.paint.lineWidth = lineWidth;
        this.paint.strokeStyle = drawColor;
        this.paint.moveTo(last[0], last[1]);
        this.paint.lineTo(now[0], now[1]);
        this.paint.closePath();
        this.paint.stroke(); // 进行绘制
        this.last = now;
    }

    rect(x, y, width, height, lineWidth, drawColor) { // 绘制矩形
        this.reSetImage();
        this.paint.lineWidth = lineWidth;
        this.paint.strokeStyle = drawColor;
        this.paint.strokeRect(x, y, width, height);
    }

    polygon(x, y, sides, width, height, lineWidth, drawColor) { // 绘制多边形
        this.reSetImage();
        let n = sides;
        let ran = 360 / n;
        let rn = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
        this.paint.beginPath();
        this.paint.strokeStyle = drawColor;
        this.paint.lineWidth = lineWidth;
        for (let i = 0; i < n; i++) {
            this.paint.lineTo(x + Math.sin((i * ran + 45) * Math.PI / 180) * rn, y + Math.cos((i * ran + 45) * Math.PI / 180) * rn);
        }
        this.paint.closePath();
        this.paint.stroke();
    }

    arc(x, y, width, height, lineWidth, drawColor) { // 绘制圆形
        this.reSetImage();
        this.paint.beginPath();
        this.paint.lineWidth = lineWidth;
        let r = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
        this.paint.arc(x, y, r, 0, Math.PI * 2, false);
        this.paint.strokeStyle = drawColor;
        this.paint.closePath();
        this.paint.stroke();
    }

    eraser(endx, endy, width, height, lineWidth) { // 橡皮擦
        this.paint.save();
        this.paint.beginPath();
        this.paint.arc(endx, endy, lineWidth / 2, 0, 2 * Math.PI);
        this.paint.closePath();
        this.paint.clip();
        this.paint.clearRect(0, 0, width, height);
        this.paint.fillStyle = '#fff';
        this.paint.fillRect(0, 0, width, height);
        this.paint.restore();
    }

    cancel() { // 撤回
        if (--this.index < 0) {
            this.index = 0;
            return;
        }
        this.allowCallback(this.index > 0, this.index < this.imgData.length - 1);
        this.paint.putImageData(this.imgData[this.index], 0, 0);
    }

    go() { // 前进
        if (++this.index > this.imgData.length - 1) {
            this.index = this.imgData.length - 1;
            return;
        }
        this.allowCallback(this.index > 0, this.index < this.imgData.length - 1);
        this.paint.putImageData(this.imgData[this.index], 0, 0);
    }

    clear() { // 清屏
        this.imgData = [];
        this.paint.clearRect(0, 0, this.width, this.height);
        this.paint.fillStyle = '#fff';
        this.paint.fillRect(0, 0, this.width, this.height);
        this.gatherImage();
    }

    changeWay({type, color, lineWidth, sides}) { // 绘制条件
        this.drawType = type !== 'color' && type || this.drawType; // 绘制形状
        this.drawColor = color || this.drawColor; // 绘制颜色
        this.lineWidth = lineWidth || this.lineWidth; // 线宽
        this.sides = sides || this.sides; // 边数
    }

    destroy() {
        this.clear();
        this.canvas.removeEventListener('mousedown', this.bindMousedown);
        document.removeEventListener('mouseup', this.bindMouseup);
        this.canvas = null;
        this.paint = null;
    }

    txt(endx, endy) { // 文字
        let deltaX = this.deltaX;
        let deltaY = this.deltaY;
        let rect = this.rectTxt

        const judgeW = this.width - rect.width, judgeH = this.height - rect.height;

        if (this.mouseDownTxt) {
            /** 相减即可获得矩形左边界与canvas左边界之间的长度 */
            let dx = endx - deltaX;
            let dy = endy - deltaY;
            if (dx < 0) {
                dx = 0;
            } else if (dx > judgeW) {
                dx = judgeW;
            }
            if (dy < 0) {
                dy = 0;
            } else if (dy > judgeH) {
                dy = judgeH;
            }
            rect.x = dx;
            rect.y = dy;
            this.txtStrokeRect()
        }
    }

    /** 清除指定区域 */
    txtClearRect() {
        this.paint.clearRect(0, 0, this.width, this.height)
    }

    /** 画矩形 */
    txtStrokeRect(e) {
        /** 设置文字和边框样式 */
        this.paint.font = "16px Arial";
        this.paint.fillStyle = "#fff";
        /** 设置为 center 时，文字段的中心会在 fillText的 x 点 */
        this.paint.textAlign = 'center';
        this.paint.lineWidth = '2';
        this.paint.strokeStyle = '#fff';

        let text = this.toolText
        let rect = this.rectTxt

        this.reSetImage();
        // this.txtClearRect()

        /** 这里如果不调用 beginPath 历史的矩形会重新被绘制 */
        this.paint.beginPath()

        let clientX = this.textX
        let clientY = this.textY
        this.paint.rect(clientX, clientY, rect.width, rect.height)
        this.paint.stroke();
        // 设置字体内容，以及在画布上的位置
        this.paint.fillText(text, clientX + 70, clientY + 30);
    }

    onkeyup(e) {
        const inputEle = this.inputElement;
        if (e.keyCode === 13) {
            this.toolText = inputEle.value;
            this.txtStrokeRect(e)
            inputEle.setAttribute('style', `display:none`)
        }
    }


    ondblclick(e) {
        this.textX = e.clientX;
        this.textY = e.clientY;

        let inputEle = this.inputElement;
        inputEle.setAttribute('style', `left:${e.clientX - 100}px;top:${e.clientY - 100}px;display:block`);
        inputEle.focus();
        //
        // alert(this.textX);
        // alert(this.textY);
    }
}

export {
    Palette
}
