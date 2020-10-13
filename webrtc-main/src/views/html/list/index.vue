<template>
    <div id="wrapper">
        <div id="my-head">
            <div class="inner">
                <div id="logo">在线会议</div>
                <div id="menu">
                    <ul>
                        <li><a href="#"><i class="home"></i>首页</a></li>
                        <li><a href="#"><i class="video"></i>所有录像</a></li>
                        <li>
                            <span id="first-letter">C</span>
                            chuganghong
                        </li>
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
                        <p>5&nbsp;会议&nbsp;|&nbsp;0&nbsp;会议录像</p>
                    </div>
                    <div class="meeting-link">
                        <div class="copy">
                            <p class="copy-label">邀请参与者的链接</p>
                            <p class="ipt">
                            <span>
                                <i class="icon-link"></i>
                                <input type="text" v-model="meetingUrl">
                            </span>
                                <span>
                                <button><i class="icon-copy"></i>复制</button>
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
                            <li v-for="(meeting,index) in meetingsList"
                                :class="[{'active-meeting':activeMeetingIndex == index},'last-meeting']"
                                v-bind:meeting-url="meeting.meetingUrl"
                                v-bind:roomid="meeting.roomid"
                                v-on:click="setMeetingUrl($event)"
                            >
                                <i class="last-meeting-icon"></i>
                                <div class="meeting-brief" title="请点击空白区域">
                                    <h4>主会议室</h4>
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

                host: 'cg',
                roomid: 0,
                // account: '',
                hostFlag: 1,
                meetingsList: [],        // 会议集合,
                meeting: null,             // 当前选中的会议
            }
        },
        methods: {
            initSocket() {
                socket.on('have-a-meeting', (data) => {
                    console.log('have-a-meeting start')
                    console.log(data)
                    console.log('have-a-meeting end')
                    this.roomid = data._id

                    let meetingUrl = this.hostAddress + '/#/invite' + '?roomid=' + this.roomid
                        + '&host=' + this.host
                    let meeting = {meetingUrl: meetingUrl, host: this.host, roomid: this.roomid}
                    this.meetingsList.push(meeting)
                });
            },

            createMeeting() {
                socket.emit('meeting',
                    {
                        account: this.host
                    }
                );
            },

            join() {
                if (this.meeting) {
                    let host = this.host
                    // this.$router.push({name: 'detail', params: params})
                    let url = this.hostAddress + '/#/detail' + '?roomid=' + this.meeting.roomid
                        + '&host=' + host + '&account=' + host + '&hostFlag=1'
                    window.open(url)
                }
            },

            // 设置input里的会议链接
            setMeetingUrl(e) {
                let target = e.target;
                console.log(target)
                let meetingUrl = target.getAttribute('meeting-url');
                alert(meetingUrl)
                this.meetingUrl = meetingUrl;
                let roomid = target.getAttribute('roomid');
                this.roomid = roomid;
                let meeting = {
                    meetingUrl: meetingUrl,
                    roomid: roomid
                };
                this.meeting = meeting;
                localStorage.setItem('meeting', meeting);
            }
        },
        mounted() {

            this.meeting = null;

            this.$nextTick(() => {
                this.initSocket();
            });

            if (this.meeting == null
            ) {
                // this.meeting = localStorage.getItem('meeting');
            }

            //
            //
            // let roomid = this.$route.query.roomid;
            // let host = this.$route.query.host;
            // let path = this.$route.path;
            //
            // console.log(roomid, host, path);

        }
    };
</script>
<style scoped>
    @import "./index.css";
</style>
