const Koa = require('koa');
const app = new Koa();

let meetingItem;

app.use(async ctx => {
    ctx.body = 'Hello World';


});

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // console.log("we're connected!");
});

const kittySchema = new mongoose.Schema({
    name: String
});


// NOTE: methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function () {
    const greeting = this.name
        ? "Meow name is " + this.name
        : "I don't have a name";
    console.log(greeting);
}


const Kitten = mongoose.model('Kitten', kittySchema);


const silence = new Kitten({name: 'Silence'});
// console.log(silence.name); // 'Silence'


const fluffy = new Kitten({name: 'fluffy'});
fluffy.speak(); // "Meow name is fluffy"

fluffy.save(function (err, fluffy) {
    if (err) return console.error(err);
    // fluffy.speak();
    // console.log('res:' + fluffy)
});


Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    // console.log(kittens);
})

Kitten.find({name: /^fluff/}, function (e) {
    // console.log('=====================')
    // console.log(e)
});


const meetingSchema = new mongoose.Schema({
    status: Boolean,       // 会议状态：true：正常；false：已经注销
    host: String,        // 主持人
    users: [String],           // 参会者
    paint: String,       // 画板内容
    msg: [{user: String, content: String, createTime: {type: Date, default: Date.now()}}], // 聊天记录
    createTime: {type: Date, default: Date.now},
});
// String最多能存储多少个字符？能存储下画板base64后的数据吗？
// 能增量更新msg而不是全量更新msg吗？

const Meeting = mongoose.model('Meeting', meetingSchema);
const meeting = new Meeting();
meeting.host = 'chuganghong';
meeting.users = ['jim', 'kate', 'Lily'];
meeting.paint = 'hello';
meeting.msg = [{user: 'jim', content: '111'}, {user: 'kate', content: '222'}];
// 存储数据
// let res = meeting.save(function (err, meeting) {
//     console.log('创建会议错误：' + err);
//     console.log('创建会议结果：' + meeting);
//     meetingItem = meeting;
//     doNext(meeting)
//     return meeting;
// });
//
// function doNext(item) {
//     meetingItem = item
//     console.log('meetingItem:' + meetingItem)
// }
//
// const res = meeting.save(function (err, meeting) {
//     var promise = new Promise(function (resolve, reject) {
//         resolve(meeting);//关键
//     });
//     return promise;
// });


console.log('创建会议结果res:' + test);    // 创建会议结果res:undefined


// 加入房间后，获取参会者、聊天记录、画板内容
// 聊天记录后续不能存储到会议表
let getMeeting = function (id) {
    return Meeting.findById(id, function (err, meeting) {
        console.log('会议错误：' + err)      // 会议错误：CastError: Cast to ObjectId failed for value "2" at path "_id" for model "Meeting"

        console.log('会议结果：' + meeting)  // 会议结果：undefined

        return

    });
}

let meeting2 = getMeeting(2);
console.log('get meeting:' + meeting2);   // get meeting:[object Object]


//
// // 更新数据
// Meeting.findOneAndUpdate({_id: '5f8404e5833b99d4f01a07c7'}, {
//     $set: {
//         paint: 'hi'
//     }
// }, {new: true}, function (err, meeting) {
//     console.log(err)
//     console.log(meeting)
// });
//
// Meeting.findOneAndUpdate({_id: '5f8404e5833b99d4f01a07c7'}, {
//         $set: {
//             paint: '=====hi==='
//         },
//         $addToSet: {
//             users: ["c", "d", "jim"]
//         },
//         $push: {
//             msg: {user: 'c', content: 'c111'}
//         },
//     }
//     // {
//     //     new:
//     //         true
//     // }
//     ,
//
//     function (err, meeting) {
//         console.log(err)
//         console.log(meeting)
//     }
// )
// ;
//
// Meeting.find(function (err, meetings) {
//     if (err) return console.error(err);
//     console.log(meetings);
// })

//
// // 主持人进入房间，创建会议
// createMeeting(host)
// {
//     const meeting = new Meeting();
//     meeting.host = host;
//     meeting.users = [host];
// // 存储数据
//     return meeting.save(function (err, meeting) {
//         console.log('创建会议：' + err);
//         console.log(meeting)
//         return meeting._id;
//     })
// }
//
// // 保存聊天记录
// saveUserMsg(id, user, content)
// {
//     Meeting.findOneAndUpdate({_id: id}, {
//         $set: {
//             msg: {user: user, content: content}
//         }
//     }, {new: true}, function (err) {
//         console.log('保存聊天记录:' + err);
//     });
// }
//
// // 保存画板内容
// savePaint(id, paintContent)
// {
//     Meeting.findOneAndUpdate({_id: id}, {
//         $set: {
//             paint: paintContent
//         }
//     }, {new: true}, function (err) {
//         console.log('保存聊天记录:' + err);
//     });
// }
//
// // 新增用户
// addUser(id, user)
// {
//     Meeting.findOneAndUpdate({_id: id}, {
//             $set: {
//                 paint: '=====hi==='
//             },
//             $push: {
//                 user: {user}
//             },
//         },
//         function (err) {
//             console.log('新增用户:' + err)
//         }
//     )
// }
//
// // 加入房间后，获取参会者、聊天记录、画板内容
// // 聊天记录后续不能存储到会议表
// getMeeting(id)
// {
//     return Meeting.findById(id, function (err, meeting) {
//         console.log('会议：' + err)
//         return meeting
//     });
// }

app.listen(3000);
