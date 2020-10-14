# web-meeting
web会议系统

#   启动项目

在 /Users/cg/data/www/web-meeting 运行：

node server.js

在 /Users/cg/data/www/web-meeting/webrtc-main 运行：

cnpm run serve

vue 网页的的根DOM在

/Users/cg/data/www/web-meeting/webrtc-main/src/App.vue

# 使用mongodb

## mongodb在本机

### 在运行吗？
ps -ef | grep mongodb

chugangdeMacBook-Pro:webrtc-main cg$ ps -ef | grep mongo
501   917     1   0 19 920  ??        49:01.94 /usr/local/opt/mongodb-community/bin/mongod --config /usr/local/etc/mongod.conf
501 52485   604   0  1:08下午 ttys005    0:00.00 grep mongo

### 连接
通过 shell 连接 MongoDB 服务：

chugangdeMacBook-Pro:webrtc-main cg$ mongo
MongoDB shell version v4.4.0
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("830ecaea-0f01-4f22-820f-681a14803202") }
MongoDB server version: 4.4.0
Welcome to the MongoDB shell.
For interactive help, type "help".
For more comprehensive documentation, see
	https://docs.mongodb.com/
Questions? Try the MongoDB Developer Community Forums
	https://community.mongodb.com
	
### 语法

use runoob

show dbs

db.runoob.insert({"name":"菜鸟教程"})

show collections

db.createCollection("runoob")

db.createCollection("mycol", { capped : true, autoIndexId : true, size : 
   6142800, max : 10000 } )
   
db.mycol2.insert({"name" : "菜鸟教程"})

db.col.insert({title: 'MongoDB 教程', 
    description: 'MongoDB 是一个 Nosql 数据库',
    by: '菜鸟教程',
    url: 'http://www.runoob.com',
    tags: ['mongodb', 'database', 'NoSQL'],
    likes: 100
})

db.col.find()

db.col.find().pretty()

## Koa

### hello,world

## 本项目数据存储

user web-meeting

刚创建的数据库 runoob 并不在数据库的列表中， 要显示它，我们需要向 runoob 数据库插入一些数据

删除当前数据库

db.dropDatabase()#正确

meeting.dropDatabase()#错误

db.meetings.find().pretty()

检出某个分支的文件到当前分支
git checkout v1 dataService.js

vue 复制粘贴

cnpm install clipboard --save 

引入，可以在mian.js中全局引入也可以在单个vue中引入

import Clipboard from 'clipboard'; 

使用不成功，放弃。无太大价值的复制粘贴。 


(node:95307) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 disconnect listeners added. Use emitter.setMaxListeners() to increase limit

(node:96070) UnhandledPromiseRejectionWarning: TypeError: undefined is not a function
    at Array.map (<anonymous>)
    at /Users/cg/data/www/web-meeting/server.js:310:47
    at internalTickCallback (internal/process/next_tick.js:77:7)
    at _tickCallback (internal/process/next_tick.js:47:5)
    at processImmediate (timers.js:605:7)
(node:96070) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 1)
(node:96070) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.

(node:97579) [DEP0005] DeprecationWarning: Buffer() is deprecated due to security and usability issues. Please use the Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() methods instead.
