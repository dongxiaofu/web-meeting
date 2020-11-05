# web-meeting
web会议系统

#   启动项目

在 /Users/cg/data/www/web-meeting 运行：

node server.js

在 /Users/cg/data/www/web-meeting/webrtc-main 运行：

cnpm run serve

启动mongodb

brew services restart mongodb-community

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

值设置为null后，无法更新为[]。
db.meetings.update({'_id':'5f86f135b0b68c73cddb8c56'},{$set:{'users':[]}})

db.meetings.remove({'_id':'5f86f135b0b68c73cddb8c56'})


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

node.js 更改代码后自动重启

cnpm install --global nodemon

nodemon server.js

chugangdeMacBook-Pro:web-meeting cg$ nodemon server.js
[nodemon] 2.0.5
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node server.js`

==================

silly lifecycle webrtc@0.1.0~build: Args: [ '-c', 'vue-cli-service
 build' ]
 
 
====================================

Error: Loading PostCSS Plugin failed: No valid exports main found for '/home/www/web-meeting/webrtc-main/node_modules
/_autoprefixer@9.8.6@autoprefixer/node_modules/colorette'

删除下面的文件，可以解决问题。

/Users/cg/data/www/web-meeting/webrtc-main/postcss.config.js

上线项目时，被这个问题阻碍1个小时左右。我的解决办法：

1.删除、重新编译。

2.搜索，资料也是删除重新编译，不过还有其他文件。

3.添加build、config文件夹。无用。

4.解决问题的关键：使用了正确的关键词。所以，要从报错信息中挑选正确的关键词。不知道哪个是正确的，就多尝试。

5.一个方法试了两次后不行，就换其他方法。

6.遇到这种问题，最先想到的措施就是去搜索。

====================================

chugangdeMacBook-Pro:webrtc-main cg$ cnpm run build

> webrtc@0.1.0 build /Users/cg/data/www/web-meeting/webrtc-main
> node build/build.js

internal/modules/cjs/loader.js:883
  throw err;
  ^

Error: Cannot find module 'shelljs'
Require stack:
- /Users/cg/data/www/web-meeting/webrtc-main/build/check-versions.js
- /Users/cg/data/www/web-meeting/webrtc-main/build/build.js
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:880:15)
    at Function.Module._load (internal/modules/cjs/loader.js:725:27)
    at Module.require (internal/modules/cjs/loader.js:952:19)
    at require (internal/modules/cjs/helpers.js:88:18)
    at Object.<anonymous> (/Users/cg/data/www/web-meeting/webrtc-main/build/check-versions.js:5:15)
    at Module._compile (internal/modules/cjs/loader.js:1063:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1092:10)
    at Module.load (internal/modules/cjs/loader.js:928:32)
    at Function.Module._load (internal/modules/cjs/loader.js:769:14)
    at Module.require (internal/modules/cjs/loader.js:952:19) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [
    '/Users/cg/data/www/web-meeting/webrtc-main/build/check-versions.js',
    '/Users/cg/data/www/web-meeting/webrtc-main/build/build.js'
  ]
}
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! webrtc@0.1.0 build: `node build/build.js`
npm ERR! Exit status 1
npm ERR! 
npm ERR! Failed at the webrtc@0.1.0 build script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:

========================================================================
Error: Cannot find module 'extract-text-webpack-plugin'


Module build failed: ModuleBuildError: Module build failed: TypeError [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string. Received undefined


Module not found: Error: Can't resolve './store/store' in '/Users/cg/data/www/web-meeting/main/src'


