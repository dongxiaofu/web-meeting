<template>
    <div class="many">
        <div class="center">
            登录名：<input type="text" v-model="account"> <br>
            <!--主持人：<input type="text" v-model="hostFlag"> <br>-->
            会议ID：<input type="text" v-model="roomid"> <br>
            <button @click="createMeeting">创建会议</button>
            <p>{{roomid}}</p>
            <p>
                <router-link :to="{path:'detail',query:{roomid:roomid,account:account,hostFlag:1}}">进入会议</router-link>
            </p>
            <p>
                <router-link :to="{path:'invite',query:{roomid:roomid}}">参会者进入会议</router-link>
            </p>
        </div>
        <hr/>
        <!--<div class="center">-->
        <!--<ul>-->
        <!--<li>-->
        <!--<span>{{roomid}}</span>-->

        <!--</li>-->
        <!--</ul>-->
        <!--</div>-->
    </div>
</template>

<script>
    import socket from '../../utils/socket';     // 这是相对于本文件的路径

    export default {
        name: 'home',
        data() {
            return {
                roomid: 0,
                account: '',
                hostFlag: 1,
                meetingsList: [],        // 会议集合
            }
        },
        methods: {
            initSocket() {
                socket.on('have-a-meeting', (data) => {
                    console.log('have-a-meeting start')
                    console.log(data)
                    console.log('have-a-meeting end')
                    this.roomid = data._id
                    this.meetingsList.push(this._id)
                });
            },

            createMeeting() {
                socket.emit('meeting',
                    {
                        account: this.account
                    }
                );
            },

            join() {
                if (this.account) {
                    let params = {account: this.account, roomid: this.roomid}
                    this.$router.push({name: 'detail', params: params})
                }
            },
        },

        mounted() {

            this.$nextTick(() => {
                this.initSocket();
            });

        }
    };
</script>

<style lang="scss" scoped>
    .many {
        text-align: center;
    }

    .center {
        width: 500px;
        height: 400px;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
    }
</style>
