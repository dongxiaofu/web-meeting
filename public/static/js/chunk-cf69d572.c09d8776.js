(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cf69d572"],{"096a":function(t,e,n){},"113a":function(t,e,n){
/*!
 * clipboard.js v2.0.6
 * https://clipboardjs.com/
 * 
 * Licensed MIT © Zeno Rocha
 */
(function(e,n){t.exports=n()})(0,(function(){return function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=6)}([function(t,e){function n(t){var e;if("SELECT"===t.nodeName)t.focus(),e=t.value;else if("INPUT"===t.nodeName||"TEXTAREA"===t.nodeName){var n=t.hasAttribute("readonly");n||t.setAttribute("readonly",""),t.select(),t.setSelectionRange(0,t.value.length),n||t.removeAttribute("readonly"),e=t.value}else{t.hasAttribute("contenteditable")&&t.focus();var i=window.getSelection(),o=document.createRange();o.selectNodeContents(t),i.removeAllRanges(),i.addRange(o),e=i.toString()}return e}t.exports=n},function(t,e){function n(){}n.prototype={on:function(t,e,n){var i=this.e||(this.e={});return(i[t]||(i[t]=[])).push({fn:e,ctx:n}),this},once:function(t,e,n){var i=this;function o(){i.off(t,o),e.apply(n,arguments)}return o._=e,this.on(t,o,n)},emit:function(t){var e=[].slice.call(arguments,1),n=((this.e||(this.e={}))[t]||[]).slice(),i=0,o=n.length;for(i;i<o;i++)n[i].fn.apply(n[i].ctx,e);return this},off:function(t,e){var n=this.e||(this.e={}),i=n[t],o=[];if(i&&e)for(var r=0,a=i.length;r<a;r++)i[r].fn!==e&&i[r].fn._!==e&&o.push(i[r]);return o.length?n[t]=o:delete n[t],this}},t.exports=n,t.exports.TinyEmitter=n},function(t,e,n){var i=n(3),o=n(4);function r(t,e,n){if(!t&&!e&&!n)throw new Error("Missing required arguments");if(!i.string(e))throw new TypeError("Second argument must be a String");if(!i.fn(n))throw new TypeError("Third argument must be a Function");if(i.node(t))return a(t,e,n);if(i.nodeList(t))return s(t,e,n);if(i.string(t))return l(t,e,n);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}function a(t,e,n){return t.addEventListener(e,n),{destroy:function(){t.removeEventListener(e,n)}}}function s(t,e,n){return Array.prototype.forEach.call(t,(function(t){t.addEventListener(e,n)})),{destroy:function(){Array.prototype.forEach.call(t,(function(t){t.removeEventListener(e,n)}))}}}function l(t,e,n){return o(document.body,t,e,n)}t.exports=r},function(t,e){e.node=function(t){return void 0!==t&&t instanceof HTMLElement&&1===t.nodeType},e.nodeList=function(t){var n=Object.prototype.toString.call(t);return void 0!==t&&("[object NodeList]"===n||"[object HTMLCollection]"===n)&&"length"in t&&(0===t.length||e.node(t[0]))},e.string=function(t){return"string"===typeof t||t instanceof String},e.fn=function(t){var e=Object.prototype.toString.call(t);return"[object Function]"===e}},function(t,e,n){var i=n(5);function o(t,e,n,i,o){var r=a.apply(this,arguments);return t.addEventListener(n,r,o),{destroy:function(){t.removeEventListener(n,r,o)}}}function r(t,e,n,i,r){return"function"===typeof t.addEventListener?o.apply(null,arguments):"function"===typeof n?o.bind(null,document).apply(null,arguments):("string"===typeof t&&(t=document.querySelectorAll(t)),Array.prototype.map.call(t,(function(t){return o(t,e,n,i,r)})))}function a(t,e,n,o){return function(n){n.delegateTarget=i(n.target,e),n.delegateTarget&&o.call(t,n)}}t.exports=r},function(t,e){var n=9;if("undefined"!==typeof Element&&!Element.prototype.matches){var i=Element.prototype;i.matches=i.matchesSelector||i.mozMatchesSelector||i.msMatchesSelector||i.oMatchesSelector||i.webkitMatchesSelector}function o(t,e){while(t&&t.nodeType!==n){if("function"===typeof t.matches&&t.matches(e))return t;t=t.parentNode}}t.exports=o},function(t,e,n){"use strict";n.r(e);var i=n(0),o=n.n(i),r="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var l=function(){function t(e){s(this,t),this.resolveOptions(e),this.initSelection()}return a(t,[{key:"resolveOptions",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action=t.action,this.container=t.container,this.emitter=t.emitter,this.target=t.target,this.text=t.text,this.trigger=t.trigger,this.selectedText=""}},{key:"initSelection",value:function(){this.text?this.selectFake():this.target&&this.selectTarget()}},{key:"selectFake",value:function(){var t=this,e="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandlerCallback=function(){return t.removeFake()},this.fakeHandler=this.container.addEventListener("click",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[e?"right":"left"]="-9999px";var n=window.pageYOffset||document.documentElement.scrollTop;this.fakeElem.style.top=n+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,this.container.appendChild(this.fakeElem),this.selectedText=o()(this.fakeElem),this.copyText()}},{key:"removeFake",value:function(){this.fakeHandler&&(this.container.removeEventListener("click",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(this.container.removeChild(this.fakeElem),this.fakeElem=null)}},{key:"selectTarget",value:function(){this.selectedText=o()(this.target),this.copyText()}},{key:"copyText",value:function(){var t=void 0;try{t=document.execCommand(this.action)}catch(e){t=!1}this.handleResult(t)}},{key:"handleResult",value:function(t){this.emitter.emit(t?"success":"error",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})}},{key:"clearSelection",value:function(){this.trigger&&this.trigger.focus(),document.activeElement.blur(),window.getSelection().removeAllRanges()}},{key:"destroy",value:function(){this.removeFake()}},{key:"action",set:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"copy";if(this._action=t,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function(){return this._action}},{key:"target",set:function(t){if(void 0!==t){if(!t||"object"!==("undefined"===typeof t?"undefined":r(t))||1!==t.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&t.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(t.hasAttribute("readonly")||t.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=t}},get:function(){return this._target}}]),t}(),c=l,u=n(1),d=n.n(u),f=n(2),m=n.n(f),h="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},g=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();function p(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function v(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!==typeof e&&"function"!==typeof e?t:e}function y(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var b=function(t){function e(t,n){p(this,e);var i=v(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return i.resolveOptions(n),i.listenClick(t),i}return y(e,t),g(e,[{key:"resolveOptions",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action="function"===typeof t.action?t.action:this.defaultAction,this.target="function"===typeof t.target?t.target:this.defaultTarget,this.text="function"===typeof t.text?t.text:this.defaultText,this.container="object"===h(t.container)?t.container:document.body}},{key:"listenClick",value:function(t){var e=this;this.listener=m()(t,"click",(function(t){return e.onClick(t)}))}},{key:"onClick",value:function(t){var e=t.delegateTarget||t.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new c({action:this.action(e),target:this.target(e),text:this.text(e),container:this.container,trigger:e,emitter:this})}},{key:"defaultAction",value:function(t){return k("action",t)}},{key:"defaultTarget",value:function(t){var e=k("target",t);if(e)return document.querySelector(e)}},{key:"defaultText",value:function(t){return k("text",t)}},{key:"destroy",value:function(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)}}],[{key:"isSupported",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:["copy","cut"],e="string"===typeof t?[t]:t,n=!!document.queryCommandSupported;return e.forEach((function(t){n=n&&!!document.queryCommandSupported(t)})),n}}]),e}(d.a);function k(t,e){var n="data-clipboard-"+t;if(e.hasAttribute(n))return e.getAttribute(n)}e["default"]=b}])["default"]}))},bab5:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"wrapper"}},[n("div",{attrs:{id:"my-head"}},[n("div",{staticClass:"inner"},[n("div",{attrs:{id:"logo"}},[t._v("在线会议")]),n("div",{attrs:{id:"menu"}},[n("ul",[n("li",{directives:[{name:"show",rawName:"v-show",value:""!=t.username,expression:"username != ''"}]},[n("span",{attrs:{id:"first-letter"}},[t._v(t._s(t.username.slice(0,1).toUpperCase()))]),t._v("\n                        "+t._s(t.username)+"\n                    ")]),n("li",{directives:[{name:"show",rawName:"v-show",value:t.isLogin,expression:"isLogin"}],staticStyle:{cursor:"pointer"},on:{click:t.logout}},[t._v("退出")])])])])]),n("div",{attrs:{id:"tip"}},[t._v("\n        Due to increased demand, recordings are temporarily disabled and the maximum duration of a meeting has\n        been reduced to 60 minutes on this server.\n    ")]),n("div",{attrs:{id:"main"}},[n("div",{staticClass:"inner"},[n("div",{staticClass:"meeting-operation"},[n("div",{staticClass:"meeting-title"},[t._m(0),n("p",[t._v(t._s(t.meetingNum)+" 会议 | 0 会议录像")])]),n("div",{staticClass:"meeting-link"},[n("div",{staticClass:"copy"},[n("p",{staticClass:"copy-label"},[t._v("邀请参与者的链接")]),n("p",{staticClass:"ipt"},[n("span",[n("i",{staticClass:"icon-link"}),n("input",{directives:[{name:"model",rawName:"v-model",value:t.meetingUrl,expression:"meetingUrl"}],attrs:{type:"text",id:"url-read"},domProps:{value:t.meetingUrl},on:{input:function(e){e.target.composing||(t.meetingUrl=e.target.value)}}})]),n("span",[n("button",{on:{click:t.copy}},[n("i",{staticClass:"icon-copy"}),t._v("复制")])])])]),n("div",{staticClass:"start-meeting"},[n("button",{on:{click:t.join}},[t._v("加入")])])]),n("div",{staticClass:"clear"}),n("div",{staticClass:"two-meeting"},[n("ul",[t._l(t.meetingsList,(function(e){return n("li",{class:[{"active-meeting":t.activeMeetingIndex==e.roomid},"last-meeting"],attrs:{"meeting-url":e.meetingUrl,roomid:e.roomid},on:{click:function(e){return t.setMeetingUrl(e)}}},[n("i",{staticClass:"last-meeting-icon"}),n("div",{staticClass:"meeting-brief",attrs:{title:"请点击空白区域"}},[n("h4",[t._v(t._s(e.title))]),n("p",[t._v("上一次会议十月07,2020")])])])})),n("li",{staticClass:"new-meeting",on:{click:t.createMeeting}},[n("span",{staticClass:"add-meeting-icon"},[t._v("+")]),t._v("\n                            创建会议室\n                        ")])],2)])]),n("div",{staticClass:"clear"}),t._m(1)])]),n("div",{staticClass:"inner",attrs:{id:"my-foot"}},[t._v("\n        Powered by chugang\n    ")])])},o=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h2",[t._v("主会议室"),n("i",{staticClass:"home"})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"meeting-list"},[n("div",{staticClass:"list-title"},[n("div",{staticClass:"title"},[t._v("会议录像")]),n("div",{staticClass:"search-ipt"},[n("input",{attrs:{type:"text",placeholder:"搜索"}}),n("i",{staticClass:"search-icon"})])]),n("div",{staticClass:"my-table"},[n("div",{staticClass:"my-th"},[n("ul",[n("li",[t._v("名字")]),n("li",{staticClass:"pic"},[t._v("预览图")]),n("li",[t._v("长度")]),n("li",[t._v("用户数")]),n("li",[t._v("可见性")]),n("li",[t._v("格式")])])]),n("div",{staticClass:"no-video"},[t._v("\n                        这个会议室没有录像\n                    ")]),n("div",{staticClass:"my-td"},[n("ul",[n("li",[t._v("名字")]),n("li",[n("img",{attrs:{src:"http://dev.meeting.com/html/pic.png "}})]),n("li",[t._v("1小时42分")]),n("li",[t._v("3人")]),n("li",[t._v("私密")]),n("li",[t._v("格式")])]),n("ul",[n("li",[t._v("名字")]),n("li",[n("img",{attrs:{src:"http://dev.meeting.com/html/pic.png "}})]),n("li",[t._v("1小时42分")]),n("li",[t._v("3人")]),n("li",[t._v("私密")]),n("li",[t._v("格式")])]),n("ul",[n("li",[t._v("名字")]),n("li",[n("img",{attrs:{src:"http://dev.meeting.com/html/pic.png "}})]),n("li",[t._v("1小时42分")]),n("li",[t._v("3人")]),n("li",[t._v("私密")]),n("li",[t._v("格式")])])])])])}],r=(n("29b2"),n("113a"),{name:"index",data:function(){return{meetingUrl:"请在会议列表选择一个会议，点击选则",hostAddress:"http://127.0.0.1:3221",activeMeetingIndex:0,account:"",roomid:0,hostFlag:1,meetingsList:[],meeting:null,meetings:[],userId:"",username:"",meetingTitle:"碰头会",isLogin:!1,apiHost:"http://127.0.0.1:4000",getMeetingListApi:"/api/list",createMeetingApi:"/api/create-meeting",token:"",meetingNum:0,maxMeetingNum:5}},methods:{copy:function(){var t=document.querySelector("#url-read");t.select(),document.execCommand("Copy")},getMeetings:function(){var t=this,e=this.apiHost+this.getMeetingListApi,n={authorization:"Bearer "+this.token};this.$http.get(e,{params:{creatorId:this.userId},headers:n}).then((function(e){t.meetings=e.body.data,console.log(e);for(var n=t.meetings,i=0;i<n.length;i++){console.log("m:"+n[i]);var o=n[i].roomid,r=n[i].title,a=t.hostAddress+"/#/invite?roomid="+o+"&creatorId="+t.userId,s={meetingUrl:a,account:t.account,roomid:o,title:r};console.log(s),t.meetingsList.push(s),t.meetingNum=t.meetingsList.length}}),(function(t){console.log(t)})).finally((function(t){}))},createMeeting:function(){var t=this;if(this.meetingNum!=this.maxMeetingNum){""==this.account&&(this.account=this.username),localStorage.setItem("account",this.account);var e=this.apiHost+this.createMeetingApi,n={account:this.account,title:this.meetingTitle,creatorId:this.userId},i={authorization:"Bearer "+this.token},o={emulateJSON:!0,headers:i};this.$http.post(e,n,o).then((function(e){var n=e.body.meeting;console.log(e),t.roomid=n.roomid;var i=t.hostAddress+"/#/invite?roomid="+t.roomid+"&account="+t.account,o={meetingUrl:i,host:t.account,roomid:t.roomid,title:n.title};t.meetingsList.push(o)}),(function(e){console.log(e),t.$message({message:"创建会议失败",type:"error"})})).finally((function(t){console.log(t)}))}else this.$message({message:"最多只能创建"+this.maxMeetingNum,type:"warning"})},join:function(){if(this.meeting){var t=this.username,e=this.hostAddress+"/#/detail?roomid="+this.meeting.roomid+"&host="+t+"&account="+t+"&hostFlag=1";window.open(e)}else this.$message({message:"请先选择一个会议！",type:"warning"})},setMeetingUrl:function(t){var e=t.target,n=e.getAttribute("roomid");console.log("target===========start"),console.log(e),console.log(n),console.log("target===========end"),this.activeMeetingIndex=n,localStorage.setItem("currentIndex",n);var i=e.getAttribute("meeting-url");if(null!=i){this.meetingUrl=i;var o=e.getAttribute("roomid");this.roomid=o;var r={meetingUrl:i,roomid:o};this.meeting=r,localStorage.setItem("meeting",r)}else alert("请点击空白区")},checkLogin:function(){if(null!=this.token&&""!=this.token||(this.token=localStorage.getItem("token")),null==this.token||""==this.token)return this.$message({message:"您未登录，请先登录！",type:"error"}),void this.$router.push({name:"login"});this.userId=localStorage.getItem("userId"),this.username=localStorage.getItem("username");var t=this.username;void 0==t&&null==t||(this.isLogin=!0)},logout:function(){var t=localStorage.getItem("username");void 0==t&&null==t||(localStorage.setItem("token",null),localStorage.setItem("userId",null),localStorage.setItem("username",null),localStorage.setItem("account",null),localStorage.setItem("creatorId",null),this.isLogin=!1,this.$router.push({path:"login"}))}},mounted:function(){if(this.checkLogin(),0==this.activeMeetingIndex){var t=localStorage.getItem("currentIndex");void 0!=t&&""!=t||(t=0),console.log(t),this.activeMeetingIndex=t}this.getMeetings()}}),a=r,s=(n("f8750"),n("2c07")),l=Object(s["a"])(a,i,o,!1,null,"b58d7f86",null);e["default"]=l.exports},f8750:function(t,e,n){"use strict";n("096a")}}]);