<template>
    <div id="wrapper">
        <div id="my-head">
            <div class="inner">
                <div id="logo">在线会议</div>
                <div id="menu">
                    <ul>
                        <!--<li>-->
                            <!--<router-link :to="{path:'meeting-list'}"><i class="home"></i>首页</router-link>-->
                        <!--</li>-->
                        <!--<li>-->
                            <!--<router-link :to="{path:'meeting-list'}"><i class="video"></i>录像</router-link>-->
                        <!--</li>-->
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
                            <button @click="login">登录</button>
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
        name: 'index',          // 必须和路由中的路径一致
        data() {
            return {
                apiHost: 'http://127.0.0.1:4000',

                email: '',
                password: ''
            }
        },
        methods: {

            // 验证邮箱和密码
            validateInput(){
                if(this.password.length < 6){
                    this.$message({
                        message: '密码至少6位',
                        type: 'error'
                    });
                    return false
                }

                var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                if(!reg.test(this.email)){
                    this.$message({
                        message: '请输入有效的邮箱',
                        type: 'error'
                    });
                    return false
                }

                return true
            },

            login() {
                if (!this.email || !this.password) {
                    this.$message({
                        message: '邮箱和密码都必须填写',
                        type: 'error'
                    });
                    return;
                }

                if(!this.validateInput()){
                    return
                }

                let api = this.apiHost + '/noauth/users/login'
                let params = {
                    username: this.email,
                    password: this.password
                }
                this.$http.post((api), params, {emulateJSON: true}).then(response => {
                    let result = response.body;
                    console.log(result)

                    this.$message({
                        message: '登录成功，即将进入您的主页',
                        type: 'success'
                    });

                    localStorage.setItem('token', result.token)
                    localStorage.setItem('userId', result.userId)
                    localStorage.setItem('username',result.username)
                    localStorage.setItem('account',result.username)

                    this.$router.push({name: 'meeting-list', params: params})

                }, response => {
                    console.log(response)
                    this.$message({
                        message: '密码或电子邮箱输入错误',
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

