<template>
    <div id="wrapper">
        <div id="my-head">
            <div class="inner">
                <div id="logo">在线会议</div>
                <div id="menu">
                    <ul>
                        <li><router-link :to="{path:'login'}">登录</router-link></li>
                        <li><router-link :to="{path:'register'}">注册</router-link></li>
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
                            <span id="content-first-letter">C</span>
                            chuganghong（主持人）
                        </div>
                    </div>
                    <div class="enter-op">
                        <input type="text" placeholder="请输入您的名字！">
                        <button>加入</button>
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
            return {}
        },
        methods: {},
        mounted() {
        }
    };
</script>
<style scoped>
    @import "./index.css";
</style>
