<template>
    <div id="wrapper">
        <div id="my-head">
            <div class="inner">
                <div id="logo">在线会议</div>
                <div id="menu">
                    <ul>
                        <li>
                            <router-link :to="{path:'meeting-list'}"><i class="home"></i>首页</router-link>
                        </li>
                        <li>
                            <router-link :to="{path:'meeting-list'}"><i class="video"></i>首页</router-link>
                        </li>
                        <!--<li>-->
                        <!--<span id="first-letter">C</span>-->
                        <!--chuganghong-->
                        <!--</li>-->
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
                <div id="left-bar">
                    <div id="ad">
                        <img src="./ad.jpeg">
                    </div>
                </div>
                <div id="register-box">
                    <div id="register-box-inner">
                        <!--<div class="form-line">-->
                        <!--<label>用户名:</label>-->
                        <!--<input type="text" placeholder="请输入用户名"/>-->
                        <!--</div>-->
                        <div class="form-line">
                            <label>电子邮箱:</label>
                            <input type="text" placeholder="请输入电子邮箱"/>
                        </div>
                        <!--<div class="form-line">-->
                        <!--<label>验证码:</label>-->
                        <!--<input type="text" placeholder="请输入验证码"/>-->
                        <!--<button id="send-verify-code">发送</button>-->
                        <!--</div>-->
                        <div class="form-line">
                            <label>密码:</label>
                            <input type="password" placeholder="请输入密码"/>
                        </div>
                        <div class="form-line btn">
                            <button>重置</button>
                            <button>登录</button>
                        </div>
                        <div class="tips">
                            没有有账号？
                            <router-link :to="{path:'register'}">注册</router-link>
                            一个。
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

