<template>
    <div>
        <div id="main-container">
            <div id="left-bar">
                <div id="menu">
                    <ul>
                        <li
                                @click="hideMsgBox($event)"
                                :class="[{ 'active':userMenuIsActive == true}, '']"
                        >会议成员({{participantNumber}})
                        </li>
                        <li @click="hideUserBox($event)"
                            :class="[{ 'active':msgMenuIsActive == true}, '']"
                        >消息框
                        </li>
                    </ul>
                </div>
                <div id="user-list">
                    <ul>
                        <!--有更简单的if写法吗-->
                        <li v-for="user in participants">
                            <i class="user-icon">
                            <span v-if="user.account == undefined">
                                D
                            </span>
                                <span v-else>
                                {{user.account.slice(0,1)}}
                            </span>
                            </i>
                            <span v-if="user.account == undefined">
                            Default
                        </span>
                            <span v-else>
                            {{user.account}}
                        </span>
                            <span v-if="user.account== account">(您)</span>
                        </li>
                    </ul>
                </div>
                <div id="message" style="display: none">
                    <div id="msg-list">
                        <ul>
                            <li v-for="msg in messageList">
                                <p class="speaker">
                                    {{msg.user}}
                                    <span class="post-time">{{msg.time}}</span>
                                </p>
                                <p>
                                    {{msg.content}}
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div id="msg-ipt">
                        <textarea placeholder="请输入聊天信息" v-model="sendText"></textarea>
                        <button @click="sendMsg">发送</button>
                    </div>
                </div>

            </div>
            <div id="paint-board">
                <div id="paint-board-container">
                    <!--my-canvas-->
                    <!--width="1040" height="675"-->
                    <div id="canvas-container">
                        <canvas ref="canvas" id="my-canvas0" class="my-canvas" width="1184" height="780"></canvas>
                    </div>

                    <!--<input id="canvas-txt"></input>-->
                    <!--切换幻灯片等工具 start-->
                    <div id="tool" style="display: none">
                        <div id="switch">
                            <select>
                                <option>幻灯片1</option>
                                <option>幻灯片2</option>
                                <option>幻灯片3</option>
                                <option>幻灯片4</option>
                                <option>幻灯片5</option>
                            </select>
                        </div>
                        <!--<div id="small-tool"></div>-->
                    </div>
                    <!--切换幻灯片等工具 end-->

                </div>
                <div id="tools">
                    <p id="my-big-title">
                        工具栏
                        <span class="big-fold-btn" @click="hideTool($event)">-</span>
                    </p>
                    <div>
                        <div class="tool  paint-tool">
                            <!--画板工具区 start-->
                            <p class="my-small-title">
                                画板工具
                                <span class="fold-btn" @click="hideTool($event)">-</span>
                            </p>
                            <ul>
                                <li v-for="v in handleList" :key="v.type" :id="v.type === 'lineWidth' ? 'linewidth':''">
                                    <!--颜色 start-->
                                    <el-color-picker
                                            v-model="color" show-alpha v-if="v.type === 'color'" @change="colorChange"
                                            :disabled="allowHangup"
                                    >
                                    </el-color-picker>
                                    <!--颜色 end-->

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
                                        <el-input-number v-model="sides" controls-position="right" @change="sidesChange"
                                                         :min="3"
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
                                        <button slot="reference" :disabled="allowHangup">{{v.name}} <i>{{lineWidth +
                                            'px'}}</i>
                                        </button>
                                    </el-popover>
                                </li>
                            </ul>
                            <!--画板工具区 end-->
                        </div>
                        <div class="tool paint-tool">
                            <p class="my-small-title">
                                会议管理
                                <span class="fold-btn" @click="hideTool($event)">-</span>
                            </p>
                            <ul>
                                <li v-show="hostFlag">
                                    <button>注销会议</button>
                                </li>
                                <li v-show="hostFlag">
                                    <button @click="invite($event)">邀请参会</button>
                                    <!--<router-link :to="{path:'invite',query:{roomid:roomid}}"-->
                                    <!--style="display: none">-->
                                    <!--</router-link>-->
                                    <router-link :to="{path:'meeting-list',query:{roomid:roomid,host:host}}"
                                                 style="display: none">
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                        <div class="tool paint-tool">
                            <p class="my-small-title">
                                视频管理
                                <span class="fold-btn" @click="hideTool($event)">-</span>
                            </p>
                            <ul>
                                <li>
                                    <button>开启声音</button>
                                </li>
                                <li>
                                    <button>开启视频</button>
                                </li>
                                <li>
                                    <button @click="hideVideoBox($event)">隐藏视频</button>
                                </li>
                            </ul>
                        </div>
                        <div class="tool paint-tool">
                            <p class="my-small-title">
                                存储管理
                                <span class="fold-btn" @click="hideTool($event)">-</span>
                            </p>
                            <ul>
                                <li>
                                    <button @click="savePaint($event)">保存画板</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!--视频区 start-->
                <div id="video-list">
                    <!--<div class="video-box" ref="video-box">-->
                    <!--<video class="video-mine" autoplay controls ref="video-mine"></video>-->
                    <!--</div>-->
                    <div class="video-box" ref="video-box" id="videoBox">
                        <div class="video-container">
                            <video class="video-mine" autoplay controls ref="video-mine" id="video-test"
                                   height="100"></video>
                            <span class="video-user">{{account}}</span>
                        </div>
                    </div>
                    <!--<video src="" id="rtcB-Board" playsinline autoplay></video>-->
                    <!--<h5>演示画面</h5>-->
                    <!--<button @click="call2" :disabled="allowCall">call</button>-->
                    <!--<button @click="hangup2" :disabled="allowHangup">hangup</button>-->
                </div>
                <!--视频区 end-->

            </div>
        </div>
    </div>
</template>

<script>
    import socket from '../../../utils/socket';     // 这是相对于本文件的路径
    import {Palette} from '../../../utils/palette';

    export default {
        name: 'index',
        data() {
            return {
                // 画板start
                // 画板预设数据
                currentCanvasIndex: 0,   // 当前画板在canvas中的索引

                canvas: [],
                context: [],

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
                    // {name: '文字', type: 'txt'},
                    {name: '撤回', type: 'cancel'},
                    {name: '前进', type: 'go'},
                    {name: '清屏', type: 'clear'},
                    {name: '线宽', type: 'lineWidth'},
                    {name: '颜色', type: 'color'}
                ],
                color: 'rgba(19, 206, 102, 1)',
                currHandle: 'line',
                lineWidth: 5,
                palette: [], // 画板
                allowCancel: true,
                allowGo: true,
                sides: 3,
                boardLocalStream: null,
                // 画板end

                // 聊天框 start
                messageList: [],
                sendText: '',
                isToPeer: false,
                receiverChannel: {},
                // 聊天框 end


                roomid: 0,
                peer: null,
                peerList: {},
                paintPeerList: {},     // 传输画板的P2P
                channelList: {},
                candidate: null,
                localStream: null,
                // 参会用户
                participants: [],
                // 参会用户数量
                participantNumber: 0,
                // 当前用户
                account: 'Default',
                queuedSendMsg: [],       // 待发送数据

                hostFlag: 0,         // 是否主持人，0.不是；1.是
                host: '主持人',

                // 菜单
                msgMenuIsActive: false,
                userMenuIsActive: true,
            }
        },
        watch: {
            userList: {
                handler() {
                },
                deep: true
            }
        },
        beforeDestroy() {
            for (let k in this.peerList) {
                this.peerList[k].close();
                this.peerList[k] = null;

                this.paintPeerList[k].close();
                this.paintPeerList[k] = null;
            }
        },
        methods: {
            initPeer() {
                // 创建输出端 PeerConnection
                let PeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
                this.peer = new PeerConnection();
                // 监听ICE候选信息 如果收集到，就发送给对方
                this.peer.onicecandidate = (event) => {
                    if (event.candidate) {
                        socket.emit('__ice_candidate', {
                            'candidate': event.candidate,
                            roomid: this.$route.query.roomid,
                            account: event.account,
                            type: 'video',
                        });
                    }
                };
            },
            async createP2P() {
                this.loading = true;
                // this.loadingText = '正在建立通话连接';
                await this.initPeer(); // 获取到媒体流后，调用函数初始化 RTCPeerConnection
            },
            // 保存canvas中的图片
            saveImageInfo() {
                var mycanvas = document.getElementById("my-canvas");
                var image = mycanvas.toDataURL("image/png");
                var w = window.open('about:blank', 'image from canvas');
                w.document.write("<img src='" + image + "' alt='from canvas'/>");
            },
            getUserMedia() {
                //兼容浏览器的getUserMedia写法
                let myVideo = this.$refs['video-mine'];
                let getUserMedia = (navigator.getUserMedia ||
                    navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia ||
                    navigator.msGetUserMedia);
                //获取本地的媒体流，并绑定到一个video标签上输出，并且发送这个媒体流给其他客户端
                return new Promise((resolve, reject) => {
                    getUserMedia.call(navigator, {
                        "audio": false,
                        "video": true
                    }, (stream) => {
                        //绑定本地媒体流到video标签用于输出
                        myVideo.srcObject = stream;
                        this.localStream = stream;
                        resolve();
                    }, function (error) {
                        reject(error);
                        // console.log(error);
                        //处理媒体流创建失败错误
                    });
                })
            },
            getVideoUserName(peerKey) {
                return 'todo';
            },
            getPeerConnection(v) {

                let iceServer = {
                    "iceServers": [
                        {
                            "url": "stun:stun.l.google.com:19302"
                        }
                    ]
                };
                //兼容浏览器的PeerConnection写法
                let PeerConnection = (window.RTCPeerConnection ||
                    window.webkitRTCPeerConnection ||
                    window.mozRTCPeerConnection);
                // 创建
                let peer = new PeerConnection(iceServer);
                //向PeerConnection中加入需要发送的流
                peer.addStream(this.localStream);
                // let videoBox = this.$refs['video-box'];
                //如果检测到媒体流连接到本地，将其绑定到一个video标签上输出
                peer.onaddstream = function (event) {
                    let videos = document.querySelector('#' + v.account);
                    if (videos) {
                        videos.srcObject = event.stream;
                    } else {
                        let videoBox = document.getElementById('videoBox')
                        let div = document.createElement('div');
                        div.setAttribute('class', 'video-container');
                        let video = document.createElement('video');
                        video.setAttribute('class', 'video-mine');
                        video.controls = true;
                        video.autoplay = 'autoplay';
                        video.srcObject = event.stream;
                        video.id = v.account;
                        video.style.height = '100px';
                        // video.height = 100;  // 错误
                        div.append(video)
                        let videoUser = document.createElement('span')
                        videoUser.setAttribute('class', 'video-user')
                        videoUser.innerText = 'todo'
                        div.append(videoUser)
                        console.log('============= getPeerConnection start')
                        console.log(videoBox)
                        console.log('============= getPeerConnection end')
                        videoBox.append(div);
                    }
                };
                //发送ICE候选到其他客户端
                peer.onicecandidate = (event) => {
                    if (event.candidate) {
                        socket.emit('__ice_candidate', {
                            'candidate': event.candidate,
                            roomid: this.$route.query.roomid,
                            account: v.account,
                            type: 'video',
                            user: this.account
                        });
                    }
                };
                // console.log('v.account', v.account);
                this.peerList[v.account] = peer;
            },

            getPaintPeerConnection(v) {
                // 文字没有用webrct传输
                let paintPeer = this.initPeer2(v)
                console.log('paintPeer start')
                console.log(paintPeer)
                console.log(v.account)
                console.log('paintPeer end')
                this.paintPeerList[v.account] = paintPeer
                // 同一个P2P能同时产生接收和发送数据的channel吗？可以，运行过这样的例子了。
                if (this.hostFlag == 1) {
                    // 建立DataChannel
                    this.createDataChannel(v.account);
                    this.createOfferPaint(v.account, this.paintPeerList[v.account], 'paint');
                } else {
                    this.onDataChannel(v.account); // 接收 DataChannel
                }
            },

            createOfferPaint(account, peer, type) {
                //发送offer，发送本地session描述
                peer.createOffer().then((desc) => {
                    // console.log('send-offer', desc);
                    peer.setLocalDescription(desc, () => {
                        socket.emit('offer', {
                            'sdp': peer.localDescription,
                            roomid: this.$route.query.roomid,
                            account: account,
                            type: type,
                        });
                    });
                });
            },

            createOffer(account, peer, type) {
                //发送offer，发送本地session描述
                peer.createOffer({
                    offerToReceiveAudio: 0,
                    offerToReceiveVideo: 1
                }).then((desc) => {
                    // console.log('send-offer', desc);
                    peer.setLocalDescription(desc, () => {
                        socket.emit('offer', {
                            'sdp': peer.localDescription,
                            roomid: this.$route.query.roomid,
                            account: account,
                            type: type,
                        });
                    });
                });
            },
            // 可用的解码函数，解决了socket.io发送中文乱码的问题。
            ab2str(arrayBuf, encodeType) {
                var decoder = new TextDecoder(encodeType)
                var u8arr = new Uint8Array(arrayBuf)
                return decoder.decode(u8arr)
            },
            socketInit() {
                socket.on('offer', v => {
                    // console.log('take_offer', this.peerList[v.account]);
                    let type = v.type;
                    let peerList = {}
                    if (type == 'paint') {
                        peerList = this.paintPeerList
                    } else {
                        peerList = this.peerList
                    }
                    peerList[v.account] && peerList[v.account].setRemoteDescription(v.sdp, () => {
                        peerList[v.account].createAnswer().then((desc) => {
                            // console.log('send-answer', desc);
                            peerList[v.account].setLocalDescription(desc, () => {
                                socket.emit('answer', {
                                    'sdp': peerList[v.account].localDescription,
                                    roomid: this.$route.query.roomid,
                                    account: v.account,
                                    type: type,
                                });
                            });
                        });
                    }, () => {// console.log(err)
                    });
                });
                socket.on('answer', v => {
                    console.log('take_answer', v.sdp);
                    let type = v.type;
                    let peerList = {}
                    if (type == 'paint') {
                        peerList = this.paintPeerList
                    } else {
                        peerList = this.peerList
                    }
                    peerList[v.account] && peerList[v.account].setRemoteDescription(v.sdp, function () {
                    }, () => {

                    }).catch((err) => {
                        console.log(err)
                    });
                });
                socket.on('__ice_candidate', v => {
                    // console.log('take_candidate', v.candidate);
                    //如果是一个ICE的候选，则将其加入到PeerConnection中
                    // if (v.user == this.account) {
                    //     return
                    // }
                    let peerList = {}
                    let type = v.type
                    if (type == 'paint') {
                        peerList = this.paintPeerList
                    } else {
                        peerList = this.peerList
                    }
                    if (v.candidate) {
                        peerList[v.account] && peerList[v.account].addIceCandidate(v.candidate).catch((e) => {
                                console.log('__ice_candidate_err', e)
                            }// console.log('err', e)
                        );
                    }
                });
                socket.on('disconnected', id => {
                    console.log('disconnected======', id);
                    let dom = document.querySelector('#' + id);
                    if (dom) {
                        dom.remove();
                    }
                });

                // data.account, data.msg_time,
                //     data.msg, data.type
                // users[data.roomid], data.account, data.time2,
                //     data.mes2, data.type,sock.id
                socket.on('test', (observers, account, msg_time, msg, type) => {
                    console.log('manychat start')
                    let content = msg;
                    content = this.ab2str(content,'utf-8');
                    let params = {
                        user: account,
                        time: msg_time,
                        // time: this.formatTime(new Date()),
                        content: content,
                        type: type,
                    };
                    console.log(params)
                    // ArrayBuffer在网页会自动解码
                    this.messageList.push(params);
                    console.log(this.messageList)
                    console.log('manychat end')
                });

                socket.on('why', (data) => {
                    console.log('wy start')
                    console.log(data)
                    console.log('manychat end')
                });

            },

            // 画板 start
            initPalette() {
                for (var i = 0; i < this.canvas.length; i++) {
                    console.log('this.palette.push' + 1)
                    let canvas = this.canvas[i]
                    let context = this.context[i]
                    var imgData = context.getImageData(0, 0, canvas.width, canvas.height)
                    var inputElement = document.getElementById('canvas-txt');
                    let palette = new Palette(canvas, {
                        paint: context,
                        imgDataInit: imgData,
                        // inputElement: inputElement,
                        drawColor: this.color,
                        drawType: this.currHandle,
                        lineWidth: this.lineWidth,
                        allowCallback: this.allowCallback,
                        moveCallback: this.moveCallback,
                    });

                    let isExists = false
                    for (var j = 0; j < this.palette.length; j++) {
                        let p = this.palette[j]
                        if (canvas.id == p.canvas.id) {
                            console.log('this.palette.push' + 2)
                            isExists = true
                        }
                    }

                    if (isExists == false) {
                        console.log('this.palette.push' + palette)
                        this.palette.push(palette)
                    }
                }
            },
            moveCallback(...arr) { // 同步到对方
                console.log('moveCallback', arr);
                this.send(arr);
            },
            allowCallback(cancel, go) {
                console.log('cancle=' + cancel)
                this.allowCancel = !cancel;
                this.allowGo = !go;
            },
            send(arr) { // 发送消息
                console.log('send ==========' + this.channelList)
                for (let channelKey in this.channelList) {
                    let channel = this.channelList[channelKey]
                    console.log('channelList.length: = ' + channel)
                    console.log('channelList.length: = ' + channel.readyState)
                    console.log('channelList.length: = ' + channel.readyState)
                    console.log('channelList.length: = ' + channelKey)
                    if (arr[0] === 'text') {
                        let params = {
                            user: this.account,
                            time: this.formatTime(new Date()),
                            content: this.sendText + '-------cg',
                            type: 'text'
                        };
                        channel.send(JSON.stringify(params));
                        this.messageList.push(params);
                        this.sendText = '';
                    } else {
                        if (channel.readyState == 'open') {
                            // 画板信息，是这里传输的吗？是
                            console.log('send', arr);
                            channel.send(JSON.stringify(arr));
                        }
                    }
                }
            },
            sidesChange() {
                this.palette[this.currentCanvasIndex].changeWay({sides: this.sides});
            }
            ,
            colorChange() {
                console.log('========================colorChange start')
                console.log(this.color)
                console.log('========================colorChange end')
                this.palette[this.currentCanvasIndex].changeWay({color: this.color});
            }
            ,
            lineWidthChange() {
                this.palette[this.currentCanvasIndex].changeWay({lineWidth: this.lineWidth});
            }
            ,
            handleClick(v) {
                console.log('========================this.palette start')
                console.log(this.palette)
                console.log(this.currentCanvasIndex)
                let count = 0;
                for (let k in this.channelList) {
                    count++;
                    console.log('channelList.length:' + k);
                }
                console.log('channelList.length:' + count)
                console.log('========================this.palette end')
                // return;
                let palette = this.palette[this.currentCanvasIndex]
                // if(palette == undefined){
                //     return
                // }
                if (['cancel', 'go', 'clear'].includes(v.type)) {
                    palette[v.type]();
                    return;
                }
                palette.changeWay({type: v.type});
                if (['color', 'lineWidth'].includes(v.type)) return;
                this.currHandle = v.type;
            }
            ,
            start() {
                this.state = '2';
                this.newRecognition.start();
            }
            ,
            stop() {
                this.state = '1';
                this.newRecognition.stop();
            }
            ,
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
            }
            ,
            hangup2() {
                this.peerA.close();
                this.peerB.close();
                this.peerA = null;
                this.peerB = null;
                this.allowCall = false;
                this.allowHangup = true;
                this.palette.destroy();
                this.palette = null;
            }
            ,
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
            }
            ,
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
            }
            ,
            initPeer2(v) {
                let iceServer = {
                    "iceServers": [
                        {
                            "url": "stun:stun.l.google.com:19302"
                        }
                    ]
                };
                // 创建输出端 PeerConnection
                let PeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
                let peer = new PeerConnection(iceServer);

                // 监听ICE候选信息 如果收集到，就发送给对方
                peer.onicecandidate = (event) => {
                    if (event.candidate) {
                        socket.emit('__ice_candidate', {
                            'candidate': event.candidate,
                            roomid: this.$route.query.roomid,
                            account: v.account,
                            type: 'paint',
                            user: v.user
                        });
                    }
                };
                return peer;
            }
            ,
            async createMedia2() {
                // 保存本地流到全局
                // this.boardLocalStream = this.$refs['canvas'].captureStream();
                this.createP2P(); // 获取到媒体流后，调用函数初始化 RTCPeerConnection
            }
            ,
            createDataChannel(account) { // 创建 DataChannel
                try {
                    let channel = this.paintPeerList[account].createDataChannel('messagechannel');
                    this.channelList[account] = channel
                    console.log('createDataChannel start')
                    console.log(this.paintPeerList[account])
                    console.log(channel)
                    console.log('createDataChannel end')
                    this.handleChannel(channel);
                } catch (e) {
                    console.log('createDataChannel:', e);
                }
            }
            ,
            // remote
            onDataChannel(account) { // 接收 DataChannel
                this.paintPeerList[account].ondatachannel = (event) => {
                    // console.log('ondatachannel', event);
                    this.channelList[account] = event.channel
                    this.handleChannel(event.channel);
                };
            },
            // 判断对象是否相等
            isObjectValueEqual(a, b) {
                var aProps = Object.getOwnPropertyNames(a);
                var bProps = Object.getOwnPropertyNames(b);
                if (aProps.length != bProps.length) {
                    return false;
                }
                for (var i = 0; i < aProps.length; i++) {
                    var propName = aProps[i]

                    var propA = a[propName]
                    var propB = b[propName]
                    if ((typeof (propA) === 'object')) {
                        if (this.isObjectValueEqual(propA, propB)) {
                            // return true     这里不能return ,后面的对象还没判断
                        } else {
                            return false
                        }
                    } else if (propA !== propB) {
                        return false
                    } else {

                    }
                }
                return true
            },


            handleChannel(channel) { // 处理 channel
                channel.binaryType = 'arraybuffer';
                channel.onopen = (event) => { // 连接成功
                    console.log('channel onopen', event);
                    this.isToPeer = true; // 连接成功
                    this.loading = false;
                    // this.initPalette();     // 在这里传输画板信息吗？
                };

                // channel.onconnecting = (event) => { // 连接中
                // };

                channel.onclose = function (event) { // 连接关闭
                    console.log('channel onclose', event)
                };
                channel.onmessage = (e) => { // 收到消息
                    let palette = this.palette[this.currentCanvasIndex]
                    if (Array.isArray(JSON.parse(e.data))) {
                        let [type, ...arr] = JSON.parse(e.data);
                        // alert('channel.onmessage')
                        console.log('onmessage', type, arr);
                        // 接收到的画板数据，需要传递给所有人，其中，要排除发送者
                        if (this.hostFlag == 1) {
                            console.log('host 转发：' + arr)
                            this.send(JSON.parse(e.data));
                        }
                        palette[type](...arr);
                    } else {
                        let msg = JSON.parse(e.data)
                        this.messageList.push(msg);
                    }
                    console.log('channel onmessage', e.data);
                };
                channel.onerror = function (event) {
                    console.log('channel event.message:' + event.message)
                }
            },
            formatTime(date) {
                const hour = date.getHours();
                const minute = date.getMinutes();
                const second = date.getSeconds();
                return [hour, minute, second].map(this.formatNumber).join(':');
            },
            formatNumber(n) {
                n = n.toString();
                return n[1] ? n : '0' + n;
            },

            sendMsg() { // 本地发送消息
                if (this.sendText == '') {
                    //
                    alert('请输入聊天信息');
                    return
                }
                let msg = new Buffer(this.sendText);
                msg.toString();
                let params = {
                    roomid: this.roomid,
                    account: this.account,
                    time2: this.formatTime(new Date()),
                    mes2: msg,
                    type: 'text'
                };
                console.log('发送----------start')
                console.log(params)
                console.log('发送----------end')
                socket.emit('manychat', params);
                this.sendText = ''
            },
            // 保存画板
            savePaint() {
                let canvas = document.getElementById('my-canvas0');
                let paint = canvas.toDataURL();
                alert(paint)
                let params = {roomid: this.roomid, paint: paint, account: this.account}
                socket.emit('savepaint', params);
            },
            // 画板 end
            // 画圆
            drawCircle() {

                var c = document.getElementById("myCanvas");
                var ctx = c.getContext("2d");
                ctx.beginPath();
                ctx.arc(95, 50, 40, 0, 2 * Math.PI);
                ctx.stroke();
            },
            // 创建canvas
            createCanvas(imgSrc) {
                for (var i = 0; i < 1; i++) {
                    let id = 'my-canvas' + i
                    let canvas = document.getElementById(id);
                    this.canvas.push(canvas);

                    let context = canvas.getContext('2d');
                    this.context.push(context)
                    console.log('this.context start')
                    console.log(this.context)
                    console.log('this.context end')
                    var img = new Image();
                    // let context2 = this.context[this.currentCanvasIndex]
                    // let canvas2 = this.canvas[this.currentCanvasIndex]
                    img.onload = function () {
                        context.drawImage(this, 0, 0, canvas.width, canvas.height);
                    }
                    img.src = imgSrc
                    // img.src = "data:image/png;base64,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"
                    // img.src = "http://pic.sc.chinaz.com/files/pic/pic9/202006/apic26003.jpg"
                    // {mediaSource: 'screen'}
                }
            },

            hideMsgBox() {
                var msgBox = document.getElementById('message');
                msgBox.style.display = 'none';

                var userBox = document.getElementById('user-list');
                userBox.style.display = 'block';

                this.userMenuIsActive = true;
                this.msgMenuIsActive = false;

                // 无效
                // let current = e.target;
                // current.setAttribute('class', 'active');
            },

            hideUserBox() {
                var msgBox = document.getElementById('message');
                msgBox.style.display = 'block';

                var userBox = document.getElementById('user-list');
                userBox.style.display = 'none';

                this.userMenuIsActive = false;
                this.msgMenuIsActive = true;
            },
            // 隐藏工具栏
            hideTool(e) {
                let current = e.target;
                let target = current.parentElement.nextElementSibling;
                if (target.style.display == 'none') {
                    target.style.display = 'block';
                    current.innerHTML = '-';
                } else {
                    target.style.display = 'none';
                    current.innerHTML = '+';
                }
            },
            // 隐藏视频区
            hideVideoBox(e) {
                let current = e.target;
                let videoList = document.getElementById('video-list');
                if (videoList.style.display == 'none') {
                    videoList.style.display = 'block';
                    current.innerHTML = '隐藏视频';
                } else {
                    videoList.style.display = 'none';
                    current.innerHTML = '显示视频';
                }
            },
            // 邀请参会
            invite(e) {
                let target = e.target.nextElementSibling
                console.log(target)
                // alert(target)
                let url = target.getAttribute('href')
                // url = '&url=' + url
                // alert(url);
                // window.location.href = url;
                window.open(url);   // 新窗口打开
            },


        },

        messageList: function () {
            console.log("changed");
            // this.show();
        },

        mounted() {
            // socket.emit('join', {roomid: this.roomid, account: this.account, is_host: this.hostFlag});
            // return
            // 没有用户名跳转到进入房间页面
            // if (this.$route.query.account == undefined) {
            //     this.$router.push('/meeting');
            //     return
            // }
            this.$nextTick(() => {

                this.hostFlag = this.$route.query.hostFlag
                // 是0时才需要初始化，否则，使用上次的值。
                if (this.roomid == 0) {
                    this.roomid = this.$route.query.roomid
                }

                console.log('this.roomid:' + this.roomid)

                this.allowCall = true;
                this.allowHangup = false;

                this.getUserMedia().then(() => {
                    this.account = this.$route.query.account
                    socket.emit('join',
                        {
                            roomid: this.roomid,
                            account: this.account,
                            is_host: this.hostFlag
                        }
                    );
                });
                this.socketInit();
                this.boardLocalStream = this.$refs['canvas'].captureStream();

                socket.on('joined', (data, account, is_host, msgList, paintContent) => {
                    this.messageList = msgList;
                    console.log('主持人users start')
                    for (let k = 0; k < data.length; k++) {
                        console.log('user:' + data[k])
                    }
                    console.log('主持人users end')
                    this.participants = data
                    this.participantNumber = data.length
                    // 创建canvas
                    this.createCanvas(paintContent)
                    console.log('data.length:' + data.length)
                    if (data.length >= 1) {
                        data.forEach(v => {
                            let obj = {};
                            let arr = [v.account, this.$route.query.account];
                            obj.account = arr.sort().join('-');         // 必须如此
                            obj.user = this.account
                            // 不管有没有建立连接，画板都要可以使用。在这里耗费了33分钟才找出问题。
                            this.initPalette();
                            // 自己和自己不建立P2P连接。实际上是忽视了这里的判断条件。
                            if (!this.peerList[obj.account] && v.account !== this.$route.query.account) {
                                // if (v.account !== this.$route.query.account) {
                                this.getPeerConnection(obj);
                                if (data.is_host != 1) {
                                    this.getPaintPeerConnection(obj)
                                }
                            }
                        });
                        if (account === this.$route.query.account) {
                            // console.log('account', account);
                            for (let k in this.peerList) {
                                console.log('=======k start')
                                console.log(k)
                                console.log('=======k end')
                                this.createOffer(k, this.peerList[k], 'video');
                                // this.createOfferPaint(k, this.paintPeerList[k], 'paint');
                            }
                        }
                    }
                });
            });

            // this.drawCircle()
        },
        created() {
        }
    }
    ;
</script>
<style scoped>
    @import "./index.css";
</style>
