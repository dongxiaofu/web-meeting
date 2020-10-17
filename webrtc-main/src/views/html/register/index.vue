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
                            <router-link :to="{path:'meeting-list'}"><i class="video"></i>注册</router-link>
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
                            <input type="text" placeholder="请输入电子邮箱" v-model="email"/>
                        </div>
                        <!--<div class="form-line">-->
                        <!--<label>验证码:</label>-->
                        <!--<input type="text" placeholder="请输入验证码"/>-->
                        <!--<button id="send-verify-code">发送</button>-->
                        <!--</div>-->
                        <div class="form-line">
                            <label>密码:</label>
                            <input type="password" placeholder="请输入密码" v-model="password"/>
                        </div>
                        <div class="form-line btn">
                            <button @click="reset">重置</button>
                            <button v-on:click="register">注册</button>
                        </div>
                        <div class="tips">
                            已有账号？直接
                            <router-link :to="{path:'login'}">登录</router-link>
                            。
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
        name: 'index',          // 必须和路由中的路径一致
        data() {
            return {
                apiHost: 'http://127.0.0.1:4000',

                email: '',
                password: ''
            }
        },
        methods: {
            register() {
                if (!this.email || !this.password) {
                    this.$message({
                        message: '邮箱和密码都必须填写',
                        type: 'error'
                    });
                    return;
                }
                let api = this.apiHost + '/noauth/users/register'
                let params = {
                    username: this.email,
                    password: this.password
                }
                this.$http.put((api), params, {emulateJSON: true}).then(response => {
                    let result = response.body;
                    console.log(result)

                    this.$message({
                        message: '注册成功，即将进入您的主页',
                        type: 'success'
                    });
                    let params = {
                        token:result.token,
                        userId:result._id,
                        account:result.username,
                    }

                    localStorage.setItem('token', result.token)
                    localStorage.setItem('userId', result.userId)
                    localStorage.setItem('username',result.username)
                    localStorage.setItem('account',result.username)

                    // this.$route.push({path:'meeting-list',params:params});   // 错误
                    this.$router.push({name: 'meeting-list', params: params})

                }, response => {
                    console.log(response)
                    this.$message({
                        message: '出问题啦',
                        type: 'error'
                    });
                }).finally(response => {
                    this.reload()
                })
            },

            reset() {
                this.email = ''
                this.password = ''
            },
        },
        mounted() {
        }
    };
</script>
<style scoped>
    @import "./index.css";
</style>
