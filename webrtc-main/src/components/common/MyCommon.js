import Vue from 'vue';

let MyComm = new Vue({
    el: '#app',
    data: {
        // 本项目使用的API
        apiHost: 'http://127.0.0.1:4000'
    },
    methods: {
        checkLogin() {
            this.token = this.$route.params.token
            if (this.token == null || this.token == '') {
                this.token = localStorage.getItem('token')
            } else {
                localStorage.setItem('token', this.token)
            }
            if (this.token == null || this.token == '') {
                this.$message({
                    message: '您未登录，请先登录！',
                    type: 'error'
                });
                this.$router.push({name: 'login'});
            }
        },
    },
    mounted: {}
})

export default MyComm;
