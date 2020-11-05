<template>
    <div id="wrapper">
        <div id="my-head">
            <div class="inner">
                <div id="logo">在线会议</div>
                <div id="menu">
                    <ul>
                        <!--<li><a href="#"><i class="home"></i>首页</a></li>-->
                        <!--<li><a href="#"><i class="video"></i>所有录像</a></li>-->
                        <!--<li><a href="#">首页</a></li>-->
                        <!--<li><a href="#">所有录像</a></li>-->
                        <li v-show="username != ''">
                            <span id="first-letter">{{username.slice(0,1).toUpperCase()}}</span>
                            {{username}}
                        </li>
                        <li v-show="isLogin" @click="logout" style="cursor: pointer">退出</li>
                    </ul>
                </div>
            </div>
        </div>
        <div id="tip">
            Due to increased demand, recordings are temporarily disabled and the maximum duration of a meeting has
            been reduced to 60 minutes on this server.
        </div>
        <div id="main">
            <div class="inner">
                <div class="meeting-operation">
                    <div class="meeting-title">
                        <h2>主会议室<i class="home"></i></h2>
                        <p>{{meetingNum}}&nbsp;会议&nbsp;|&nbsp;0&nbsp;会议录像</p>
                    </div>
                    <div class="meeting-link">
                        <div class="copy">
                            <p class="copy-label">邀请参与者的链接</p>
                            <p class="ipt">
                            <span>
                                <i class="icon-link"></i>
                                <input type="text" v-model="meetingUrl" id="url-read">
                            </span>
                                <span>

                                <button

                                        @click="copy"
                                ><i class="icon-copy"></i>复制</button>
                            </span>
                            </p>
                        </div>
                        <div class="start-meeting">
                            <button @click="join">加入</button>
                        </div>
                    </div>
                    <div class="clear"></div>
                    <div class="two-meeting">
                        <ul>
                            <!--<div>-->
                            <li v-for="(meeting) in meetingsList"
                                :class="[{'active-meeting':activeMeetingIndex == meeting.roomid},'last-meeting']"
                                v-bind:meeting-url="meeting.meetingUrl"
                                v-bind:roomid="meeting.roomid"
                                v-on:click="setMeetingUrl($event)"
                            >
                                <i class="last-meeting-icon"></i>
                                <div class="meeting-brief" title="请点击空白区域">
                                    <h4>{{meeting.title}}</h4>
                                    <p>上一次会议十月07,2020</p>
                                </div>
                            </li>
                            <li class="new-meeting" @click="createMeeting">
                                <span class="add-meeting-icon">+</span>
                                创建会议室
                            </li>
                            <!--</div>-->
                            <!--<li class="last-meeting active-meeting">-->
                            <!--<i class="last-meeting-icon"></i>-->
                            <!--<div class="meeting-brief">-->
                            <!--<h4>主会议室</h4>-->
                            <!--<p>上一次会议十月07,2020</p>-->
                            <!--</div>-->
                            <!--</li>-->
                            <!--<li class="last-meeting">-->
                            <!--<i class="last-meeting-icon"></i>-->
                            <!--<div class="meeting-brief">-->
                            <!--<h4>主会议室</h4>-->
                            <!--<p>上一次会议十月07,2020</p>-->
                            <!--</div>-->
                            <!--</li>-->
                            <!--<li class="last-meeting">-->
                            <!--<i class="last-meeting-icon"></i>-->
                            <!--<div class="meeting-brief">-->
                            <!--<h4>主会议室</h4>-->
                            <!--<p>上一次会议十月07,2020</p>-->
                            <!--</div>-->
                            <!--</li>-->
                            <!--<li class="last-meeting">-->
                            <!--<i class="last-meeting-icon"></i>-->
                            <!--<div class="meeting-brief">-->
                            <!--<h4>主会议室</h4>-->
                            <!--<p>上一次会议十月07,2020</p>-->
                            <!--</div>-->
                            <!--</li>-->
                            <!--<li class="last-meeting">-->
                            <!--<i class="last-meeting-icon"></i>-->
                            <!--<div class="meeting-brief">-->
                            <!--<h4>主会议室</h4>-->
                            <!--<p>上一次会议十月07,2020</p>-->
                            <!--</div>-->
                            <!--</li>-->
                            <!--<li class="last-meeting">-->
                            <!--<i class="last-meeting-icon"></i>-->
                            <!--<div class="meeting-brief">-->
                            <!--<h4>主会议室</h4>-->
                            <!--<p>上一次会议十月07,2020</p>-->
                            <!--</div>-->
                            <!--</li>-->
                            <!--<li class="new-meeting" @click="createMeeting">-->
                            <!--<span class="add-meeting-icon">+</span>-->
                            <!--创建会议室-->
                            <!--</li>-->
                        </ul>

                        <!--<div class="last-meeting">-->
                        <!--<i class="last-meeting-icon"></i>-->
                        <!--<div class="meeting-brief">-->
                        <!--<h4>主会议室</h4>-->
                        <!--<p>上一次会议十月07,2020</p>-->
                        <!--</div>-->
                        <!--</div>-->
                    </div>

                </div>
                <div class="clear"></div>
                <div class="meeting-list">
                    <div class="list-title">
                        <div class="title">会议录像</div>
                        <div class="search-ipt">
                            <input type="text" placeholder="搜索">
                            <i class="search-icon"></i>
                        </div>
                    </div>
                    <div class="my-table">
                        <div class="my-th">
                            <ul>
                                <li>名字</li>
                                <li class="pic">预览图</li>
                                <li>长度</li>
                                <li>用户数</li>
                                <li>可见性</li>
                                <li>格式</li>
                            </ul>
                        </div>
                        <div class="no-video">
                            这个会议室没有录像
                        </div>
                        <div class="my-td">
                            <ul>
                                <li>名字</li>
                                <li><img src="http://dev.meeting.com/html/pic.png "></li>
                                <li>1小时42分</li>
                                <li>3人</li>
                                <li>私密</li>
                                <li>格式</li>
                            </ul>
                            <ul>
                                <li>名字</li>
                                <li><img src="http://dev.meeting.com/html/pic.png "></li>
                                <li>1小时42分</li>
                                <li>3人</li>
                                <li>私密</li>
                                <li>格式</li>
                            </ul>
                            <ul>
                                <li>名字</li>
                                <li><img src="http://dev.meeting.com/html/pic.png "></li>
                                <li>1小时42分</li>
                                <li>3人</li>
                                <li>私密</li>
                                <li>格式</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="my-foot" class="inner">
            Powered by chugang
        </div>
    </div>
</template>

<script>

    import socket from '../../../utils/socket';     // 这是相对于本文件的路径

    export default {
        name: 'index',
        data() {
            return {
                meetingUrl: '请在会议列表选择一个会议，点击选则',          // 会议地址
                hostAddress: 'http://127.0.0.1:3221',

                activeMeetingIndex: 0,       // 当前选中的会议

                account: '',        // 参会者名称。本想改成Host，但在会议详情里，account用得太广泛了。
                roomid: 0,
                hostFlag: 1,
                meetingsList: [],        // 将meetings格式化后的会议列表
                meeting: null,             // 当前选中的会议
                meetings: [],              // 从API获取的元素会议列表
                userId: '',                 // 当前登录的用户ID
                username: '',                // 当前登录的用户的用户名
                meetingTitle: '碰头会',          // 会议标题
                isLogin: false,                // 是否登录

                apiHost: 'http://127.0.0.1:4000',
                getMeetingListApi: '/api/list',
                createMeetingApi: '/api/create-meeting',

                token: '',          //jwt
                meetingNum: 0,        // 会议数量
                maxMeetingNum: 5,     // 能创建的会议数量的最大值
            }
        },
        methods: {

            copy() {
                let url = document.querySelector('#url-read');
                url.select(); // 选择对象
                document.execCommand("Copy");
            },

            getMeetings: function () {
                let getMeetingListApi = this.apiHost + this.getMeetingListApi;
                // let config = {
                //     headers: {
                //         'Content-Type': 'multipart/form-data',
                //         'authorization': 'Bearer ' + this.$route.params.token
                //     }
                // }
                let config =
                    {
                        'authorization': 'Bearer ' + this.token
                    }

                this.$http.get((getMeetingListApi), {
                    params: {creatorId: this.userId},
                    headers: config
                }).then(response => {
                    this.meetings = response.body.data;
                    console.log(response)
                    let meetings = this.meetings;
                    for (let i = 0; i < meetings.length; i++) {
                        console.log('m:' + meetings[i])
                        let roomid = meetings[i].roomid;
                        let title = meetings[i].title;
                        let meetingUrl = this.hostAddress + '/#/invite' + '?roomid=' + roomid
                            + '&creatorId=' + this.userId
                        let meetingItem = {meetingUrl: meetingUrl, account: this.account, roomid: roomid, title: title}
                        console.log(meetingItem)
                        this.meetingsList.push(meetingItem)
                        this.meetingNum = this.meetingsList.length
                    }
                }, response => {
                    console.log(response)
                }).finally(
                    response => {
                        // alert('over')
                        // this.reload()
                    }
                )
            },

            createMeeting() {
                // 这种简单的逻辑，还搞错了两三次。忽略了meetingNum不会自增，却把它当成了会增加到6或大于maxMeetingNum
                if (this.meetingNum == this.maxMeetingNum) {
                    this.$message({
                        message: '最多只能创建' + this.maxMeetingNum,
                        type: 'warning'
                    });
                    return;
                }

                // 分散在系统各处的多重用户名称体系，感觉会成为以后的大麻烦。
                // 存储参会者名称。没有填写，默认就是当前登录用户名。
                // todo 会议创建者自定义参会者名称
                if (this.account == '') {
                    this.account = this.username
                }
                localStorage.setItem('account', this.account)


                let api = this.apiHost + this.createMeetingApi
                let params = {
                    account: this.account,
                    title: this.meetingTitle,
                    creatorId: this.userId
                }
                let headers = {
                    'authorization': 'Bearer ' + this.token
                }
                let config = {
                    emulateJSON: true,
                    headers: headers
                }
                this.$http.post((api), params, config).then(response => {
                    let meetingOriginal = response.body.meeting;
                    console.log(response)
                    this.roomid = meetingOriginal.roomid
                    let meetingUrl = this.hostAddress + '/#/invite' + '?roomid=' + this.roomid
                        + '&account=' + this.account
                    let meeting = {
                        meetingUrl: meetingUrl,
                        host: this.account,
                        roomid: this.roomid,
                        title: meetingOriginal.title
                    }
                    this.meetingsList.push(meeting)

                }, response => {
                    console.log(response)
                    this.$message({
                        message: '创建会议失败',
                        type: 'error'
                    });
                }).finally(response => {
                    console.log(response)
                    // this.reload()
                })


                // 用API代替
                // let title = '会议名称'
                // title = new Buffer(title);
                // socket.emit('meeting',
                //     {
                //         account: this.host,
                //         title: title
                //     }
                // );
            },

            join() {
                if (!this.meeting) {
                    this.$message({
                        message: '请先选择一个会议！',
                        type: 'warning'
                    });
                    return
                }

                let account = this.username
                // this.$router.push({name: 'detail', params: params})
                let url = this.hostAddress + '/#/detail' + '?roomid=' + this.meeting.roomid
                    + '&host=' + account + '&account=' + account + '&hostFlag=1'
                window.open(url)
            },

            // 设置input里的会议链接
            setMeetingUrl(e) {
                let target = e.target;
                // console.log(target)
                // 设置选中的会议的CSSA选中效果
                // target.index 无这个值,undefined
                let currentIndex = target.getAttribute('roomid')
                console.log('target===========start')
                console.log(target)
                console.log(currentIndex)
                console.log('target===========end')
                this.activeMeetingIndex = currentIndex
                localStorage.setItem('currentIndex', currentIndex)
                let meetingUrl = target.getAttribute('meeting-url');
                if (meetingUrl == null) {
                    alert('请点击空白区')
                    return
                }
                this.meetingUrl = meetingUrl;
                let roomid = target.getAttribute('roomid');
                this.roomid = roomid;
                let meeting = {
                    meetingUrl: meetingUrl,
                    roomid: roomid
                };
                this.meeting = meeting;
                localStorage.setItem('meeting', meeting);
            },

            checkLogin() {
                if (this.token == null || this.token == '') {
                    this.token = localStorage.getItem('token')
                }

                if (this.token == null || this.token == '') {
                    this.$message({
                        message: '您未登录，请先登录！',
                        type: 'error'
                    });
                    this.$router.push({name: 'login'});
                    return
                }

                this.userId = localStorage.getItem('userId')
                this.username = localStorage.getItem('username');

                // 判断是否登录
                let username = this.username
                if (username != undefined || username != null) {
                    this.isLogin = true
                }
            },

            // 退出登录
            logout() {
                // 若是非登录状态，不执行退出操作
                let username = localStorage.getItem('username')
                if (username != undefined || username != null) {
                    localStorage.setItem('token', null)
                    localStorage.setItem('userId', null)
                    localStorage.setItem('username', null)
                    localStorage.setItem('account', null)
                    localStorage.setItem('creatorId', null)
                    this.isLogin = false
                    this.$router.push({path:'login'})
                }
            },
        }
        ,
        mounted() {
            // 检测登录
            // myComm.checkLogin() // TypeError: Cannot read property 'params' of undefined
            this.checkLogin();

            // 当前选中的会议的CSS效果
            // 不确定从localStorage中取出来的空值是null还是''，所以使用两个判断
            if (this.activeMeetingIndex == 0) {
                let activeMeetingIndex = localStorage.getItem('currentIndex')
                if (activeMeetingIndex == undefined || activeMeetingIndex == '') {
                    activeMeetingIndex = 0
                }
                console.log(activeMeetingIndex)
                this.activeMeetingIndex = activeMeetingIndex
            }


            // this.getMeetingListApi = this.apiHost + this.getMeetingListApi
            // 记住这段巨坑无比的代码 start
            this.getMeetings();
            // 执行完上面的代码后，在上面代码中赋值过的this.meetings仍是data中的初始数据。
            // 原因是，上面的方法和下面的方法，执行顺序，不是先后顺序
            // let meetings = this.meetings;
            // console.log(meetings.length);
            // console.log(this.meetings);
            //
            // for (let i = 0; i < meetings.length; i++) {
            //     console.log('m:' + meeting)
            //     let roomid = meetings[i].roomid;
            //     let meetingUrl = this.hostAddress + '/#/invite' + '?roomid=' + roomid
            //         + '&host=' + this.host
            //     let meetingItem = {meetingUrl: meetingUrl, host: this.host, roomid: roomid}
            //     console.log('mi:' + meetingItem)
            //     this.meetingsList.push(meetingItem)
            // }
            // 记住这段巨坑无比的代码 end

            // this.meeting = null;

        }
    }
    ;
</script>
<style scoped>
    @import "index.css";
</style>
