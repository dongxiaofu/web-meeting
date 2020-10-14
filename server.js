/**
 * Created by wyw on 2018/10/14.
 */

const Koa = require('koa');
const path = require('path');
const koaSend = require('koa-send');
const static = require('koa-static');
const socket = require('koa-socket');
// const users = {}; // 保存用户
const sockS = {}; // 保存客户端对应的socket
const io = new socket({
    ioOptions: {
        pingTimeout: 10000,
        pingInterval: 2000,
    }
});
var dataService = require('./dataService');

// 创建一个Koa对象表示web app本身:
const app = new Koa();
// socket注入应用
io.attach(app);
app.use(static(
    path.join(__dirname, './public')
));

// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    if (!/\./.test(ctx.request.url)) {
        await koaSend(
            ctx,
            'index.html',
            {
                root: path.join(__dirname, './'),
                maxage: 1000 * 60 * 60 * 24 * 7,
                gzip: true,
            } // eslint-disable-line
        );
    } else {
        await next();
    }
});
// io.on('join', ctx=>{ // event data socket.id
// });
app._io.on('connection', sock => {
    sock.on('join', data => {
        sock.join(data.roomid, () => {
            let meetingId = data.roomid;
            console.log('会议不存在0:' + data.roomid)
            let obj = {
                account: data.account,
                sockId: sock.id
            };
            // 留着做转发使用
            // console.log('sockS[data.account]:' + data.account)
            sockS[data.account] = sock;
            // console.log('sockS[data.account]:' + sockS)

            dataService.getMeetingPromise(meetingId).then(function (serviceResponse) {
                // console.log(serviceResponse)
                // todo 错误检查：无这个会议，先不做
                console.log('会议存在:' + data.roomid)
                let meeting = serviceResponse.result;
                data.roomid = meeting._id;
                meetingId = data.roomid

                let users = serviceResponse.result.users;
                // 主持人还没有进入会议，不允许非主持人参会者进入会议
                console.log('参会:' + users + 'user数量：' + users.length + ',is_host = ' + data.is_host)
                if (data.is_host == 0 || data.is_host == undefined) {
                    if (users == null || users.length == 0) {
                        return
                    }
                }
                // users可能为null，因为我在注销会议时将users字段设置为了null。
                if (users == null) users = [];

                // 用户加入房间
                // 房间内是否存在当前进入房间的用户
                let arr = users.filter(v => v.account === data.account);
                if (!arr.length) {
                    users.push(obj);
                    // 存储到数据库
                    dataService.addUserPromise(meetingId, obj.account, obj.sockId).then(function (serviceResponse) {
                        console.log('用户进房间：' + obj.account);
                    })
                }

                // 加入房间后，获取参会者、聊天记录、画板内容
                let msgList = meeting.msg;
                let paintContent = meeting.paint;
                // todo 聊天记录后续不能存储到会议表，要单独存储

                // 对房间内的所有用户触发joined事件
                console.log('会议ID:' + meetingId);
                console.log('非主持人users start')
                for (let k = 0; k < users.length; k++) {
                    console.log('user:' + users[k])
                }
                console.log('非主持人users end')
                app._io.in(meetingId).emit('joined',
                    users,
                    data.account,
                    data.is_host,
                    msgList, paintContent,
                    sock.id); // 发给房间内所有人
            });

            return;

            dataService.getMeetingPromise(meetingId).then(function (serviceResponse) {
                console.log(serviceResponse)
                // todo 错误检查：无这个会议，先不做
                if (serviceResponse.result == undefined) {
                    console.log('会议不存在:' + meetingId)
                    dataService.createMeetingPromise(obj).then(function (serviceResponse) {
                        // console.log('创建会议结果：' + serviceResponse.result);

                        let meeting = serviceResponse.result;
                        data.roomid = meeting._id;
                        meetingId = data.roomid

                        let users = serviceResponse.result.users;

                        console.log('createMeetingPromise会议ID:' + meetingId);

                        // 用户加入房间
                        // 房间内是否存在当前进入房间的用户
                        let arr = users.filter(v => v.account === data.account);
                        if (!arr.length) {
                            users.push(obj);
                            // 存储到数据库
                            dataService.addUserPromise(meetingId, obj.account, obj.sockId).then(function (serviceResponse) {
                                // console.log('用户进房间：' + serviceResponse);
                            })
                        }

                        // 加入房间后，获取参会者、聊天记录、画板内容
                        let msgList = meeting.msg;
                        let paintContent = meeting.paint;
                        // todo 聊天记录后续不能存储到会议表，要单独存储
                        // console.log('主持人users start')
                        // for (let k = 0; k < users.length; k++) {
                        //     console.log('user:' + users[k])
                        // }
                        // console.log('主持人users end')

                        // console.log('sockS start:')
                        // for (let k in sockS) {
                        //     // console.log(k)
                        //     // console.log(sockS[k])
                        // }
                        // console.log('sockS end:')

                        // 对房间内的所有用户触发joined事件
                        console.log('会议ID:' + meetingId);
                        app._io.in(meetingId).emit('joined',
                            users,
                            data.account,
                            data.is_host,
                            msgList, paintContent,
                            sock.id); // 发给房间内所有人
                    });
                } else {
                    console.log('会议存在:' + data.roomid)
                    let meeting = serviceResponse.result;
                    data.roomid = meeting._id;
                    meetingId = data.roomid

                    let users = serviceResponse.result.users;

                    // 用户加入房间
                    // 房间内是否存在当前进入房间的用户
                    let arr = users.filter(v => v.account === data.account);
                    if (!arr.length) {
                        users.push(obj);
                        // 存储到数据库
                        dataService.addUserPromise(meetingId, obj.account, obj.sockId).then(function (serviceResponse) {
                            // console.log('用户进房间：' + serviceResponse.result);
                        })
                    }

                    // 加入房间后，获取参会者、聊天记录、画板内容
                    let msgList = meeting.msg;
                    let paintContent = meeting.paint;
                    // todo 聊天记录后续不能存储到会议表，要单独存储

                    // 对房间内的所有用户触发joined事件
                    // console.log('会议ID:' + meetingId);
                    // console.log('非主持人users start')
                    // for (let k = 0; k < users.length; k++) {
                    //     console.log('user:' + users[k])
                    // }
                    // console.log('非主持人users end')
                    app._io.in(meetingId).emit('joined',
                        users,
                        data.account,
                        data.is_host,
                        msgList, paintContent,
                        sock.id); // 发给房间内所有人
                }
            });
        });
    });
    sock.on('offer', data => {
        // console.log('offer', data);
        sock.to(data.roomid).emit('offer', data);
    });
    sock.on('answer', data => {
        // console.log('answer', data);
        sock.to(data.roomid).emit('answer', data);
    });
    sock.on('__ice_candidate', data => {
        // console.log('__ice_candidate', data);
        // data.roomid不知有何用
        sock.to(data.roomid).emit('__ice_candidate', data);
    });

    // 1 v 1
    sock.on('apply', data => { // 转发申请
        console.log('转发 apply')
        // console.log(data)
        sockS[data.account].emit('apply', data);
    });
    sock.on('reply', data => { // 转发回复
        sockS[data.account].emit('reply', data);
    });
    // sock.on('1v1answer', data => { // 转发 answer
    //     sockS[data.account].emit('1v1answer', data);
    // });
    sock.on('1v1ICE', data => { // 转发 ICE
        sockS[data.account].emit('1v1ICE', data);
    });
    sock.on('1v1offer', data => { // 转发 Offer
        sockS[data.account].emit('1v1offer', data);
    });
    // sock.on('1v1hangup', data => { // 转发 hangup
    //     sockS[data.account].emit('1v1hangup', data);
    // });
    sock.on('manychat', data => {
        // console.log('on manychat start')
        let meetingId = data.roomid;
        sockS[data.account] = sock;
        dataService.getMeetingPromise(meetingId).then(function (serviceResponse) {
            let usersArray = serviceResponse.result.users;
            let users = [];
            for (let k = 0; k < usersArray.length; k++) {
                // 不发送给自己
                if (usersArray[k].account != data.account) {
                    users.push(usersArray[k].account);
                }
            }
            // console.log('manychat users:' + users);
            app._io.in(meetingId).emit('test',
                users, data.account, data.time2,
                data.mes2, data.type, sock.id
            ); // 发给房间内所有人
        });

        dataService.saveUserMsgPromise(meetingId, data.account, data.mes2).then(function (serviceResponse) {
            // console.log('保存聊天记录:' + serviceResponse);
        });
    });

    sock.on('savepaint', data => {
        dataService.savePaintPromise(data.roomid, data.paint).then(function (serviceResponse) {
            // console.log('保存画板内容:' + serviceResponse);
            sockS[data.account].emit('why', data);
            // app._io.in(meetingId).emit('test',
            //     users, data.account, data.time2,
            //     data.mes2, data.type, sock.id
            // ); // 发给房间内所有人
        });
    });
    // 建立会议室
    sock.once('meeting', data => {
        dataService.createMeetingPromise(data.account, data.title).then(function (serviceResponse) {
            console.log('建立会议室:' + serviceResponse.result._id);
            sockS[data.account] = sock;
            sockS[data.account].emit('have-a-meeting', serviceResponse.result);
        });
    });

    // 注销会议
    sock.on('hangup', data => {
        // console.log('退出会议2');
        // return
        let meetingId = data.roomid;
        // let host = data.host;
        // todo 检测host和会议是否匹配
        console.log('注销会议开始，roomid:' + meetingId)
        app._io.in(meetingId).emit('hangup', sock.id); // 发给房间内所有人
        // 更新参会人员，清空所有参会者
        dataService.saveUserPromise(meetingId, null);   // 怎么将数组类型字段设置为[]？null不行。
        console.log('注销会议结束')

    });

    // 退出会议
    sock.on('logout', data => {
        let meetingId = data.roomid;
        dataService.getMeetingPromise(meetingId).then(function (serviceResponse) {
            let usersArray = serviceResponse.result.users;
            let users = [];
            let filterdUsers = [];  // 去掉退出会议者后的用户数据
            for (let k = 0; k < usersArray.length; k++) {
                // 不发送给自己
                if (usersArray[k].account != data.account) {

                    users.push({account: usersArray[k].account});
                    filterdUsers.push(usersArray[k]);
                }
            }

            let msg = data.account + ' 已经退出了会议。'
            console.log(msg)
            msg = new Buffer(msg);

            let date = new Date();
            const hour = date.getHours();
            const minute = date.getMinutes();
            const second = date.getSeconds();
            let time = [hour, minute, second].map(function (v) {
                v = v.toString();
                return v[1] ? v : '0' + v;
            }).join(':');

            console.log('date:' + time)

            // 更新参会人员
            dataService.saveUserPromise(meetingId, filterdUsers);

            app._io.in(meetingId).emit('test',
                users, data.account, time,
                msg, 'logout', sock.id
            ); // 发给房间内所有人

            console.log('退出会议执行结束')


        });
    });
    // app._io.on('disconnect', (sock) => {
    //     for (let k in users) {
    //         users[k] = users[k].filter(v => v.id !== sock.id);
    //     }
    //     console.log(`disconnect id => ${users}`);
    // });
});

// 在端口3001监听:
let port = 3001;
app.listen(port, _ => {
    console.log('app started at port ...' + port);
});
// https.createServer(app.callback()).listen(3001);
