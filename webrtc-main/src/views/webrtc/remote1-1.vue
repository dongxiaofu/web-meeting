<template>
    <div class="remote1"
         v-loading="loading"
         :element-loading-text="loadingText"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)"
    >
        <div class="shade" v-if="!isJoin">
            <div class="input-container">
                <input type="text" v-model="account" placeholder="请输入你的昵称" @keyup.enter="join">
                <button @click="join">确定</button>
            </div>
        </div>
        <div class="userList">
            <h5>在线用户：{{userList.length}}</h5>
            <p v-for="v in userList" :key="v.account">
                {{v.account}}
                <i v-if="v.account === account || v.account === isCall">
                    {{v.account === account ? 'me' : ''}}
                    {{v.account === isCall ? 'calling' : ''}}
                </i>
                <span @click="apply(v.account)"
                      v-if="v.account !== account && v.account !== isCall">呼叫 {{v.account}}</span>
            </p>
        </div>
        <div class="video-container" v-show="isToPeer">
            <div>
                <video src="" id="rtcA" controls autoplay></video>
                <h5>{{account}}</h5>
                <button @click="hangup">hangup</button>
            </div>
            <div>
                <video src="" id="rtcB" controls autoplay></video>
                <h5>{{isCall}}</h5>
            </div>
        </div>

        <!--画板 start-->
        <div class="demo">
            <div class="rtcBox">
                <ul>
                    <li v-for="v in handleList" :key="v.type">
                        <el-color-picker v-model="color" show-alpha v-if="v.type === 'color'" @change="colorChange"
                                         :disabled="allowHangup"></el-color-picker>
                        <button :disabled="v.type === 'cancel' ? allowHangup || allowCancel:
                            v.type === 'go' ? allowHangup || allowGo
                            :allowHangup"
                                @click="handleClick(v)"
                                v-if="!['color', 'lineWidth', 'polygon'].includes(v.type)"
                                :class="{active: currHandle === v.type}"
                        >
                            {{v.name}}
                        </button>
                        <el-popover
                                placement="top"
                                width="400"
                                trigger="click"
                                v-if="v.type === 'polygon'"
                        >
                            <el-input-number v-model="sides" controls-position="right" @change="sidesChange" :min="3"
                                             :max="10"></el-input-number>
                            <button slot="reference" :disabled="allowHangup" @click="handleClick(v)"
                                    :class="{active: currHandle === v.type}">{{v.name}}
                            </button>
                        </el-popover>
                        <el-popover
                                placement="top"
                                width="400"
                                trigger="click"
                                v-if="v.type === 'lineWidth'"
                        >
                            <el-slider v-model="lineWidth" :max=20 @change="lineWidthChange"></el-slider>
                            <button slot="reference" :disabled="allowHangup">{{v.name}} <i>{{lineWidth + 'px'}}</i>
                            </button>
                        </el-popover>
                    </li>
                </ul>
                <div>
                    <canvas width="400" height="300" ref="canvas"></canvas>
                    <h5>白板操作</h5>
                </div>
                <div>
                    <video src="" id="rtcB-Board" playsinline autoplay></video>
                    <h5>演示画面</h5>
                    <button @click="call2" :disabled="allowCall">call</button>
                    <button @click="hangup2" :disabled="allowHangup">hangup</button>
                </div>
            </div>

        </div>
        <!--画板 end-->
    </div>
</template>
<script>
    import socket from '../../utils/socket';
    import {Palette} from '../../utils/palette';

    export default {
        name: 'remote1',
        data() {
            return {
                // 画板start
                peerA: null,
                peerB: null,
                offerOption2: {
                    offerToReceiveAudio: 1,
                    offerToReceiveVideo: 1
                },
                allowCall: true,
                allowHangup: true,
                handleList: [
                    {name: '圆', type: 'arc'},
                    {name: '线条', type: 'line'},
                    {name: '矩形', type: 'rect'},
                    {name: '多边形', type: 'polygon'},
                    {name: '橡皮擦', type: 'eraser'},
                    {name: '撤回', type: 'cancel'},
                    {name: '前进', type: 'go'},
                    {name: '清屏', type: 'clear'},
                    {name: '线宽', type: 'lineWidth'},
                    {name: '颜色', type: 'color'}
                ],
                color: 'rgba(19, 206, 102, 1)',
                currHandle: 'line',
                lineWidth: 5,
                palette: null, // 画板
                allowCancel: true,
                allowGo: true,
                sides: 3,
                boardLocalStream: null,
                // 画板end

                account: window.sessionStorage.account || '',
                isJoin: false,
                userList: [],
                roomid: 'webrtc_1v1', // 指定房间ID
                isCall: false, // 正在通话的对象
                loading: false,
                loadingText: '呼叫中',
                isToPeer: false, // 是否建立了 P2P 连接
                peer: null,
                offerOption: {
                    offerToReceiveAudio: 1,
                    offerToReceiveVideo: 1
                }
            };
        },
        methods: {
            join() {
                if (!this.account) return;
                this.isJoin = true;
                window.sessionStorage.account = this.account;
                socket.emit('join', {roomid: this.roomid, account: this.account});
            },
            initSocket() {
                // 为何不是join？
                socket.on('joined', (data) => {
                    this.userList = data;
                });
                socket.on('reply', async data => { // 收到回复
                    this.loading = false;
                    console.log(data);
                    switch (data.type) {
                        case '1': // 同意
                            this.isCall = data.self;
                            // 对方同意之后创建自己的 peer
                            await this.createP2P(data);
                            // 建立DataChannel
                            await this.createDataChannel();
                            // 并给对方发送 offer
                            this.createOffer(data);
                            break;
                        case '2': //拒绝
                            this.$message({
                                message: '对方拒绝了你的请求！',
                                type: 'warning'
                            });
                            break;
                        case '3': // 正在通话中
                            this.$message({
                                message: '对方正在通话中！',
                                type: 'warning'
                            });
                            break;
                    }
                });
                socket.on('apply', data => { // 收到请求
                    console.log('apply')
                    if (this.isCall) {
                        this.reply(data.self, '3');
                        return;
                    }
                    console.log('apply data start')
                    console.log(data)
                    console.log('apply data end')
                    this.$confirm(data.self + ' 向你请求视频通话, 是否同意?', '提示', {
                        confirmButtonText: '同意',
                        cancelButtonText: '拒绝',
                        type: 'warning'
                    }).then(async () => {
                        await this.createP2P(data); // 同意之后创建自己的 peer 等待对方的 offer
                        await this.onDataChannel(); // 接收 DataChannel
                        this.isCall = data.self;
                        this.reply(data.self, '1');
                    }).catch(() => {
                        this.reply(data.self, '2');
                    });
                });
                socket.on('1v1answer', (data) => { // 接收到 answer
                    this.onAnswer(data);
                });
                socket.on('1v1ICE', (data) => { // 接收到 ICE
                    this.onIce(data);
                });
                socket.on('1v1offer', (data) => { // 接收到 offer
                    this.onOffer(data);
                });
                socket.on('1v1hangup', _ => { // 通话挂断
                    this.$message({
                        message: '对方已断开连接！',
                        type: 'warning'
                    });
                    this.peer.close();
                    this.peer = null;
                    this.isToPeer = false;
                    this.isCall = false;
                });
            },
            hangup() { // 挂断通话
                socket.emit('1v1hangup', {account: this.isCall, self: this.account});
                this.peer.close();
                this.peer = null;
                this.isToPeer = false;
                this.isCall = false;
            },
            apply(account) {
                // account 对方account  self 是自己的account
                this.loading = true;
                this.loadingText = '呼叫中';
                alert('call before')
                socket.emit('apply', {account: account, self: this.account});
                alert('call after')
            },
            reply(account, type) {
                socket.emit('reply', {account: account, self: this.account, type: type});
            },
            async createP2P(data) {
                this.loading = true;
                this.loadingText = '正在建立通话连接';
                await this.createMedia(data);
            },
            async createMedia(data) {
                // 保存本地流到全局
                try {
                    this.boardLocalStream = this.$refs['canvas'].captureStream();
                    this.localstream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
                    let video = document.querySelector('#rtcA');
                    video.srcObject = this.localstream;
                } catch (e) {
                    console.log('getUserMedia: ', e)
                }
                this.initPeer(data); // 获取到媒体流后，调用函数初始化 RTCPeerConnection
                this.initPeer2(); // 获取到媒体流后，调用函数初始化 RTCPeerConnection
            },
            initPeer(data) {
                // 创建输出端 PeerConnection
                let PeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
                this.peer = new PeerConnection();
                this.peer.addStream(this.localstream); // 添加本地流
                // 监听ICE候选信息 如果收集到，就发送给对方
                this.peer.onicecandidate = (event) => {
                    if (event.candidate) {
                        socket.emit('1v1ICE', {account: data.self, self: this.account, sdp: event.candidate});
                    }
                };
                this.peer.onaddstream = (event) => { // 监听是否有媒体流接入，如果有就赋值给 rtcB 的 src
                    this.isToPeer = true;
                    this.loading = false;
                    let video = document.querySelector('#rtcB');
                    video.srcObject = event.stream;


                    // let video2 = document.querySelector('#rtcB-Board')
                    // video2.srcObject = event.stream

                    // this.initPalette(); // 初始化画板
                };

                // this.allowCall = false;
            },
            async createOffer(data) { // 创建并发送 offer
                try {
                    // 创建offer
                    let offer = await this.peer.createOffer(this.offerOption);
                    // 呼叫端设置本地 offer 描述
                    await this.peer.setLocalDescription(offer);
                    // 给对方发送 offer
                    socket.emit('1v1offer', {account: data.self, self: this.account, sdp: offer});
                } catch (e) {
                    console.log('createOffer: ', e);
                }
            },
            async onOffer(data) { // 接收offer并发送 answer
                try {
                    // 接收端设置远程 offer 描述
                    await this.peer.setRemoteDescription(data.sdp);
                    // 接收端创建 answer
                    let answer = await this.peer.createAnswer();
                    // 接收端设置本地 answer 描述
                    await this.peer.setLocalDescription(answer);
                    // 给对方发送 answer
                    socket.emit('1v1answer', {account: data.self, self: this.account, sdp: answer});
                } catch (e) {
                    console.log('onOffer: ', e);
                }
            },
            async onAnswer(data) { // 接收answer
                try {
                    await this.peer.setRemoteDescription(data.sdp); // 呼叫端设置远程 answer 描述
                } catch (e) {
                    console.log('onAnswer: ', e);
                }
            },
            async onIce(data) { // 接收 ICE 候选
                try {
                    await this.peer.addIceCandidate(data.sdp); // 设置远程 ICE
                } catch (e) {
                    console.log('onAnswer: ', e);
                }
            },
            createDataChannel() { // 创建 DataChannel
                try {
                    this.channel = this.peer.createDataChannel('messagechannel');
                    this.handleChannel(this.channel);
                } catch (e) {
                    console.log('createDataChannel:', e);
                }
            },
            onDataChannel() { // 接收 DataChannel
                this.peer.ondatachannel = (event) => {
                    // console.log('ondatachannel', event);
                    this.channel = event.channel;
                    this.handleChannel(this.channel);
                };
            },
            handleChannel(channel) { // 处理 channel
                channel.binaryType = 'arraybuffer';
                channel.onopen = (event) => { // 连接成功
                    console.log('channel onopen', event);
                    this.isToPeer = true; // 连接成功
                    this.loading = false;
                    this.initPalette();     // 在这里传输画板信息吗？
                };
                channel.onclose = function (event) { // 连接关闭
                    console.log('channel onclose', event)
                };
                channel.onmessage = (e) => { // 收到消息
                    if (Array.isArray(JSON.parse(e.data))) {
                        let [type, ...arr] = JSON.parse(e.data);
                        // console.log('onmessage', type, arr);
                        this.palette[type](...arr);
                    } else {
                        this.messageList.push(JSON.parse(e.data));
                    }
                    // console.log('channel onmessage', e.data);
                };
            },

            // 画板 start
            initPalette() {
                alert(1)
                this.palette = new Palette(this.$refs['canvas'], {
                    drawColor: this.color,
                    drawType: this.currHandle,
                    lineWidth: this.lineWidth,
                    allowCallback: this.allowCallback,
                    moveCallback: this.moveCallback,
                });
            },
            moveCallback(...arr) { // 同步到对方
                // console.log('moveCallback', arr);
                this.send(arr);
            },
            allowCallback(cancel, go) {
                console.log('cancle=' + cancel)
                this.allowCancel = !cancel;
                this.allowGo = !go;
            },
            send(arr) { // 发送消息
                if (arr[0] === 'text') {
                    let params = {
                        account: this.account,
                        time: this.formatTime(new Date()),
                        mes: this.sendText,
                        type: 'text'
                    };
                    this.channel.send(JSON.stringify(params));
                    this.messageList.push(params);
                    this.sendText = '';
                } else {
                    // 画板信息，是这里传输的吗？是
                    console.log('send', arr);
                    this.channel.send(JSON.stringify(arr));
                }
            },
            sidesChange() {
                this.palette.changeWay({sides: this.sides});
            },
            colorChange() {
                this.palette.changeWay({color: this.color});
            },
            lineWidthChange() {
                this.palette.changeWay({lineWidth: this.lineWidth});
            },
            handleClick(v) {
                if (['cancel', 'go', 'clear'].includes(v.type)) {
                    this.palette[v.type]();
                    return;
                }
                this.palette.changeWay({type: v.type});
                if (['color', 'lineWidth'].includes(v.type)) return;
                this.currHandle = v.type;
            },
            start() {
                this.state = '2';
                this.newRecognition.start();
            },
            stop() {
                this.state = '1';
                this.newRecognition.stop();
            },
            async call2() {

                // this.allowCall = true;
                // this.allowHangup = false;
                // return
                //
                // if (!this.peerA || !this.peerB) { // 判断是否有对应实例，没有就重新创建
                //     this.initPeer2();
                // }
                try {
                    let offer = await this.peerB.createOffer(this.offerOption2); // 创建 offer
                    await this.onCreateOffer(offer);
                } catch (e) {
                    console.log('createOffer: ', e);
                }

                this.allowCall = true;
                this.allowHangup = false;
            },
            hangup2() {
                this.peerA.close();
                this.peerB.close();
                this.peerA = null;
                this.peerB = null;
                this.allowCall = false;
                this.allowHangup = true;
                this.palette.destroy();
                this.palette = null;
            },
            async onCreateOffer(desc) {
                try {
                    await this.peerB.setLocalDescription(desc); // 呼叫端设置本地 offer 描述
                } catch (e) {
                    console.log('Offer-setLocalDescription: ', e);
                }
                try {
                    await this.peerA.setRemoteDescription(desc); // 接收端设置远程 offer 描述
                } catch (e) {
                    console.log('Offer-setRemoteDescription: ', e);
                }
                try {
                    let answer = await this.peerA.createAnswer(); // 接收端创建 answer
                    await this.onCreateAnswer(answer);
                } catch (e) {
                    console.log('createAnswer: ', e);
                }
            },
            async onCreateAnswer(desc) {
                try {
                    await this.peerA.setLocalDescription(desc); // 接收端设置本地 answer 描述
                } catch (e) {
                    console.log('answer-setLocalDescription: ', e);
                }
                try {
                    await this.peerB.setRemoteDescription(desc); // 呼叫端设置远程 answer 描述
                } catch (e) {
                    console.log('answer-setRemoteDescription: ', e);
                }
            },
            initPeer2() {
                // 创建输出端 PeerConnection
                let PeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
                this.peerA = new PeerConnection();
                this.peerA.addStream(this.boardLocalStream); // 添加本地流
                // 监听 A 的ICE候选信息
                // 如果收集到，就添加给 B
                this.peerA.onicecandidate = (event) => {
                    if (event.candidate) {
                        this.peerB.addIceCandidate(event.candidate);
                    }
                };
                // 创建呼叫端
                this.peerB = new PeerConnection();
                this.peerB.onaddstream = (event) => { // 监听是否有媒体流接入，如果有就赋值给 rtcB 的 src
//                    console.log('event-stream', event.stream);
                    let video = document.querySelector('#rtcB-Board');
                    video.srcObject = event.stream;
                    this.initPalette(); // 初始化画板
                };
                // 监听 B 的ICE候选信息
                // 如果收集到，就添加给 A
                this.peerB.onicecandidate = (event) => {
                    if (event.candidate) {
                        this.peerA.addIceCandidate(event.candidate);
                    }
                };
                this.allowCall = false;
            },
            async createMedia2() {
                // 保存本地流到全局
                this.boardLocalStream = this.$refs['canvas'].captureStream();
                this.initPeer2(); // 获取到媒体流后，调用函数初始化 RTCPeerConnection
            }
            // 画板 end


        },
        mounted() {
            // this.initPalette(); // 初始化画板
            this.initSocket();

            if (this.account) {
                this.join();
            }
        }
    }
</script>
<style lang="scss" scoped>
    .remote1 {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: flex-start;
    }

    .shade {
        position: fixed;
        width: 100vw;
        height: 100vh;
        left: 0;
        top: 0;
        z-index: 100;
        background-color: rgba(0, 0, 0, 0.9);

        .input-container {
            position: absolute;
            left: 50%;
            top: 30%;
            transform: translate(-50%, 50%);
            display: flex;
            justify-content: space-between;
            align-items: center;

            input {
                margin: 0;
            }
        }
    }

    .userList {
        border: 1px solid #ddd;
        margin-right: 50px;

        h5 {
            text-align: left;
            margin-bottom: 5px;
        }

        p {
            border-bottom: 1px solid #ddd;
            line-height: 32px;
            width: 200px;
            position: relative;
            overflow: hidden;
            cursor: pointer;

            span {
                position: absolute;
                left: 0;
                top: 100%;
                background-color: #1fbeca;
                color: #fff;
                height: 100%;
                transition: top 0.2s;
                display: block;
                width: 100%;
            }

            i {
                font-style: normal;
                font-size: 11px;
                border: 1px solid #1fbeca;
                color: #27cac7;
                border-radius: 2px;
                line-height: 1;
                display: block;
                position: absolute;
                padding: 1px 2px;
                right: 5px;
                top: 5px;
            }
        }

        p:last-child {
            border-bottom: none;
        }

        p:hover span {
            top: 0;
        }
    }

    .video-container {
        display: flex;
        justify-content: center;

        video {
            width: 400px;
            height: 300px;
            margin-left: 20px;
            background-color: #ddd;
        }
    }

    /*画板*/
    .rtcBox {
        display: flex;
        justify-content: center;

        video {
            width: 400px;
            height: 300px;
            margin-left: 20px;
            background-color: #ddd;
            border: 1px solid #000;
        }

        canvas {
            border: 1px solid #000;
        }

        ul {
            text-align: left;
        }
    }
</style>
