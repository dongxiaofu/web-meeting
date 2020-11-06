# web-meeting
web会议系统

#   启动项目

在 /Users/cg/data/www/web-meeting 运行：

node server.js

替代命令：npm run prd # 使用 pm2，很好用

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

========================================================================

[root@VM_0_9_centos web-meeting]# node server.js
internal/modules/cjs/loader.js:628
  throw e;
  ^

Error: No valid exports main found for '/home/cg/web-meeting/node_modules/koa'
    at resolveExportsTarget (internal/modules/cjs/loader.js:625:9)
    at applyExports (internal/modules/cjs/loader.js:502:14)
    at resolveExports (internal/modules/cjs/loader.js:551:12)
    at Function.Module._findPath (internal/modules/cjs/loader.js:657:22)
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:960:27)
    at Function.Module._load (internal/modules/cjs/loader.js:855:27)
    at Module.require (internal/modules/cjs/loader.js:1033:19)
    at require (internal/modules/cjs/helpers.js:72:18)
    at Object.<anonymous> (/home/cg/web-meeting/server.js:5:13)
    at Module._compile (internal/modules/cjs/loader.js:1144:30) {
  code: 'MODULE_NOT_FOUND'
}
========================================================================
../deps/icu-small/source/common/utext.cpp:572:5: 错误：‘max_align_t’不是命名空间‘std’中的一个类型名
     std::max_align_t    extension;
     ^
../deps/icu-small/source/common/utext.cpp: 在函数‘UText* utext_setup_67(UText*, int32_t, UErrorCode*)’中:
../deps/icu-small/source/common/utext.cpp:587:73: 错误：‘max_align_t’不是‘std’的成员
             spaceRequired = sizeof(ExtendedUText) + extraSpace - sizeof(std::max_align_t);
                                                                         ^
../deps/icu-small/source/common/utext.cpp:587:73: 附注：建议的替代：
In file included from /usr/include/c++/4.8.2/cstddef:42:0,
                 from ../deps/icu-small/source/common/utext.cpp:19:
/usr/lib/gcc/x86_64-redhat-linux/4.8.5/include/stddef.h:425:3: 附注：  ‘max_align_t’
 } max_align_t;
   ^
../deps/icu-small/source/common/utext.cpp:598:57: 错误：‘struct ExtendedUText’没有名为‘extension’的成员

[root@VM_0_9_centos node-v14.15.0]# ./configure --prefix=/usr/lnmp/node-v14.15.0
Node.js configure: Found Python 3.7.3...
WARNING: C++ compiler (CXX=g++, 4.8.5) too old, need g++ 6.3.0 or clang++ 8.0.0


wget http://ftp.gnu.org/gnu/gcc/gcc-6.3.0/gcc-6.3.0.tar.gz

2、离线的机器上，在rpm所在的文件夹内，执行以下脚本
#rpm -Uvh --force --nodeps *.rpm
 

	软件包 nodejs-14.14.0-1.aarch64 是针对 different 构架的
	
http://rpmfind.net/linux/rpm2html/search.php?query=nodejs

rpm -Uvh --force --nodeps *.rpm

node -v

node: error while loading shared libraries: libbrotlidec.so.1: cannot open shared object file: No such file or directory


curl --silent --location https://rpm.nodesource.com/setup_14.x | sudo bash

node server.js 出现的奇怪问题，是由于node.js的版本太低导致，使用yum 安装指定版本的node.js 14,成功。

详细文档：

yum安装新版nodejs

https://www.jianshu.com/p/e9db0baf781b

第一步

curl --silent --location https://rpm.nodesource.com/setup_14.x | sudo bash

第二步

yum -y install nodejs
#yum install -y nodejs npm --skip-broken

如果以上步骤不能安装 最新版 node，执行以下命令后再执行第二步：

yum clean all

如果存在多个 nodesoucre，执行以下命令删除，然后重新执行第一第二步：

rm -fv /etc/yum.repos.d/nodesource*


从源码编译安装node.js，可能需要升级gcc，这又是一个可能耗时很多的工作。

使用docker 运行node.js

1.占用空间非常大，10多G。
2.我不是很熟。
3.需要配置端口、把文件放到docker容器内等。

官方文档如下：

https://github.com/nodejs/docker-node

我已经在服务器上执行了

# specify the node base image with your desired version node:<version>
FROM node:14
# replace this with your application's default port
EXPOSE 8888

项目在哪里连接socket.io
========================================================================

这么关键的问题，我居然没有做笔记。

在这里：/Users/cg/data/www/web-meeting/main/src/utils/socket.js


MediaDevices.getUserMedia` undefined 的问题
=======================================================

https://www.cnblogs.com/Wayou/p/using_MediaDevices_getUserMedia_wihtout_https.html


通过相应参数启动 Chrome
传递相应参数来启动 Chrome，以 http://example.com 为例，

 --unsafely-treat-insecure-origin-as-secure="http://example.com"
开启相应 flag
通过传递相应参数来启动 Chrome Insecure origins treated as secure flag 并填入相应白名单。

打开 chrome://flags/#unsafely-treat-insecure-origin-as-secure
将该 flag 切换成 enable 状态
输入框中填写需要开启的域名，譬如 http://example.com"，多个以逗号分隔。
重启后生效。









