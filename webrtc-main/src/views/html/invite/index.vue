<template>
    <div id="wrapper">
        <div id="my-head">
            <div class="inner">
                <div id="logo">在线会议</div>
                <div id="menu">
                    <ul>
                        <!--加一层div是为了使用vue的v-if，不影响页面效果-->
                        <div v-if="isLogin">
                            <li v-show="username != ''">
                                <span id="first-letter">{{username.slice(0,1).toUpperCase()}}</span>
                                {{username}}
                            </li>
                            <li @click="logout" style="cursor: pointer">退出</li>
                        </div>
                        <div v-else>
                            <li>
                                <router-link :to="{path:'login'}">登录</router-link>
                            </li>
                            <li>
                                <router-link :to="{path:'register'}">注册</router-link>
                            </li>
                        </div>
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
                        <div class="tips">
                            <p>您已被邀请加入</p>
                            <p id="main-room">主会议室</p>
                        </div>
                        <div class="host">
                            <span id="content-first-letter">{{host.slice(0,1)}}</span>
                            {{host}}（主持人）
                        </div>
                    </div>
                    <div class="enter-op">
                        <input type="text" placeholder="请输入您的名字" v-model="participant">
                        <button @click="join">加入</button>
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
    export default {
        name: 'index',
        data() {
            return {
                participant: '',             // 参会者名字
                roomid: '',
                host: '',                    // 主持人
                meeting: {},                  // 会议详情
                isLogin: false,                // 是否登录
                username: '',

                hostAddress: 'http://127.0.0.1:4000',
                getMeetingApi: '/noauth/meeting',
            }
        },
        methods: {
            join() {
                if (this.roomid && this.participant) {
                    let params = {
                        account: this.participant,
                        roomid: this.roomid,
                    }
                    // 存储参会者名称
                    localStorage.setItem('account', this.participant)
                    // url中不带查询参数，除非路由写成和带查询参数一样的格式。
                    // this.$router.push({name: 'detail', params: params})
                    // url中带查询查询，不需要路由配合
                    this.$router.push({path: 'detail', query: params})
                }
                this.$message({
                    message: '请填写您的名字',
                    type: 'error'
                });
            },
            //获取会议详情
            getMeeting() {
                let getMeetingApi = this.hostAddress + this.getMeetingApi
                this.$http.get((getMeetingApi), {
                    params: {roomid: this.roomid},
                }).then(response => {
                    console.log(response)
                    this.meeting = response.body.data;
                    this.host = this.meeting.host
                    // 如果是会议的创建者，跳转到会议列表页
                    let userId = localStorage.getItem('userId')
                    if (userId == this.meeting.creatorId) {
                        this.$router.push({path: 'meeting-list'})
                        return
                    }
                }, response => {
                    console.log('error:')
                    console.log(response)
                }).finally(
                    response => {
                        // alert('over')
                        // this.reload()
                    }
                )
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
                }
            },
        },
        mounted() {
            // 判断是否登录
            let username = localStorage.getItem('username')
            console.log('username:' + username)
            if (username != undefined || username != null) {
                this.isLogin = true
                this.username = username
            }
            this.roomid = this.$route.query.roomid
            this.roomid == undefined ? '' : this.roomid
            if (this.roomid != '') {
                this.getMeeting()
            }
        }
    };
</script>
<style scoped>
    @import "./index.css";
</style>
