<template>
    <div>
        <div id="left-side">
            <div class="message">
                <h6>消息</h6>
                <ul>
                    <li id="common-chat">
                        <i class="message-icon"></i>公共聊天
                    </li>
                </ul>
            </div>
            <div class="message">
                <h6>笔记</h6>
                <ul>
                    <li class="notes-icon">分享笔记</li>
                </ul>
            </div>
            <div class="user-list">
                <h6>用户<span class="user-num">(5)</span></h6>
                <ul>
                    <li>
                        <i class="user-icon">C</i>
                        chuganghong（您）
                    </li>
                    <li>
                        <i class="user-icon">小</i>
                        小明
                    </li>
                    <li>
                        <i class="user-icon">J</i>
                        Jim
                    </li>
                </ul>
            </div>
            <div class="clear"></div>
        </div>
        <div id="message">
            <div id="msg-title">
        <span>
            <i class="left-arrow-icon"></i>
            公共聊天
        </span>
            </div>
            <div class="msg-list">
                <ul>
                    <li>
                        <p class="speaker">
                            chuganghong
                            <span class="post-time">2018-10-8 14:52:32</span>
                        </p>
                        <p>
                            欢迎来到主会议室！
                            请参考使用说明。请参考使用说明。请参考使用说明。请参考使用说明。请参考使用说明。请参考使用说明。请参考使用说明。
                            请参考使用说明。请参考使用说明。请参考使用说明。请参考使用说明。请参考使用说明。请参考使用说明。请参考使用说明。
                            请参考使用说明。请参考使用说明。请参考使用说明。请参考使用说明。请参考使用说明。请参考使用说明。请参考使用说明。
                            请参考使用说明。请参考使用说明。请参考使用说明。请参考使用说明。请参考使用说明。请参考使用说明。请参考使用说明。
                        </p>
                    </li>
                    <li>
                        <p class="speaker">
                            chuganghong
                            <span class="post-time">2018-10-8 14:52:32</span>
                        </p>
                        <p>
                            欢迎来到主会议室！
                            请参考使用说明。请参考使用说明。请参考使用说明。请参考使用说明。请参考使用说明。请参考使用说明。请参考使用说明。
                        </p>
                    </li>
                    <li>
                        <p class="speaker">
                            chuganghong
                            <span class="post-time">2018-10-8 14:52:32</span>
                        </p>
                        <p>
                            欢迎来到主会议室！
                            请参考使用说明。请参考使用说明。请参考使用说明。请参考使用说明。请参考使用说明。请参考使用说明。请参考使用说明。
                            请参考使用说明。请参考使用说明。请参考使用说明。请参考使用说明。请参考使用说明。请参考使用说明。请参考使用说明。
                            请参考使用说明。请参考使用说明。请参考使用说明。请参考使用说明。请参考使用说明。请参考使用说明。请参考使用说明。
                            请参考使用说明。请参考使用说明。请参考使用说明。请参考使用说明。请参考使用说明。请参考使用说明。请参考使用说明。
                        </p>
                    </li>
                </ul>
            </div>
            <div class="msg-ipt">
                <input type="text">
                <i class="send-icon"></i>
            </div>
        </div>
        <div id="wrapper">
            <div id="paint-board">
                <div id="head-wrapper">
                    <div id="my-head">
                        <i class="show-user-list"></i>
                        主会议室
                        <i class="logout"></i>
                        <ul id="setting-list">
                            <li>退出</li>
                            <li>结束会议</li>
                        </ul>
                    </div>
                </div>
                <div id="paint-board-container">
                    <div id="my-title">
                        <h2>欢迎使用在线视频会议系统</h2>
                        <p>这是一个使用WebCRT开发的Web视频会议系统。</p>
                    </div>
                    <div id="content">
                        <ul>
                            <li>
                                <h5>CHAT</h5>
                                <p>Send public and private message</p>
                            </li>
                            <li>
                                <h5>CHAT</h5>
                                <p>Send public and private message</p>
                            </li>
                            <li>
                                <h5>CHAT</h5>
                                <p>Send public and private message</p>
                            </li>
                            <li>
                                <h5>CHAT</h5>
                                <p>Send public and private message</p>
                            </li>
                            <li>
                                <h5>CHAT</h5>
                                <p>Send public and private message</p>
                            </li>
                            <li>
                                <h5>CHAT</h5>
                                <p>Send public and private messageSend public and private messageSend public and private
                                    message</p>
                            </li>
                            <li>
                                <h5>CHAT</h5>
                                <p>Send public and private message</p>
                            </li>
                            <li>
                                <h5>CHAT</h5>
                                <p>Send public and private message</p>
                            </li>
                        </ul>
                    </div>
                    <div id="more-info"></div>
                    <!--切换幻灯片等工具 start-->
                    <div id="tool">
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
                <div id="foot-wrapper">
                    <div id="my-foot">
                        <div id="media-operation">
                            <span class="phone"><i class="phone-icon"></i></span>
                            <span class="video"><i class="video-icon"></i></span>
                        </div>
                    </div>
                </div>
                <div id="side-tool">
                    <ul>
                        <li><i class="more-tool-icon"></i></li>
                        <li class="last"><i class="delete-icon"></i></li>
                    </ul>
                </div>
                <div id="paint-tool">
                    <ul></ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'index',          // 必须和路由中的路径一致
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
