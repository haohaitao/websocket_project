import Vue from 'vue'

var timeout = 6000;
//初始化定时器对象
var wsTimeoutObj = null;
let _this = Vue
export function connect(username) {
  console.log(_this)
    let getUser = username
    let uname = getUser;
    //实例化websocket
    ws = new WebSocket("ws://127.0.0.1:8888");
    //连接成功的回调onopen
    ws.onopen = function (e) {
      let data = "系统消息：建立连接成功";
      listMsg(data, uname);
      if (e.currentTarget.readyState == 1) {
        sessionStorage.setItem('connect',false)
        // _this.$store.commit('connect',false)
      }
      //调定时器方法
      startWsTimeOut();
    };
    //连接关闭的回调onclose
    ws.onclose = function (e) {
      let data = "系统消息：已退出聊天室";
      deleteWsTimeOut();  //清除定时器
      listMsg(data, uname);
      sessionStorage.setItem('connect',true)
      // _this.$store.commit('connect',true)
      var user_num = document.getElementById("user_num");  //获取id为user_num的dom
      user_num.innerHTML = name_list.length;
    };
    //接收服务器返回消息的回调onmessage
    ws.onmessage = function (e) {
      var msg = JSON.parse(e.data);  //解析服务器返回的消息赋值给变量msg
      if (msg.type === 'pong') {
        resetWsTimeOut();
      }
      var sender, user_name, name_list, change_type; //声明变量 sender(内容前的title)，user_name(拿登录用户名)，name_list(拿用户列表)，change_type(消息类型)
      switch (msg.type) {
        case 'system':
          sender = '系统消息: ';
          break;
        case 'user':
          sender = msg.from + ': ';
          break;
        case 'handshake':
          var user_info = { 'type': 'login', 'content': uname };
          sendMsg(user_info);
          return;
        case 'login':
        case 'logout':
          user_name = msg.content;
          name_list = msg.user_list;
          change_type = msg.type;
          dealUser(user_name, change_type, name_list);
          return;
      }
  
      var data = sender + msg.content;   //拼接title和content，例如：'系统消息：xxx上线了'
      listMsg(data, uname);   //传值给listMsg
    };
    //错误的回调onerror
    ws.onerror = function () {
      var data = "系统消息 : 出错了,请退出重试.";
      listMsg(data, uname);
    };
}
//定时器方法
function startWsTimeOut() {
  wsTimeoutObj = setTimeout(function () {
    ws.send('{"type":"heartbeat","content":"ping"}')
  }, timeout)
}
//重置定时器
function resetWsTimeOut() {  // 重置计时器
  clearTimeout(wsTimeoutObj);  // 清空计时器
  startWsTimeOut();
}
//清除定时器
function deleteWsTimeOut() {
  clearTimeout(wsTimeoutObj);  // 清空计时器
}
//断开连接
export function closeBtn() {
  ws.close();
}

//监听回车
export function confirm(event) {
  var key_num = event.keyCode;
  if (13 == key_num) {
    send();
  } else {
    return false;
  }
}
/**
* 发送并清空消息输入框内的消息
*/
export function send() {
  var msg_box = document.getElementById("msg_box");
  var content = msg_box.value;

  var linkState = document.getElementById('linkState');
  if (linkState.disabled) {
    alert('请先连接哦')
  } else if (content == '') {
    alert('不能发送空消息哦')
  } else {
    var reg = new RegExp("\r\n", "g");
    content = content.replace(reg, "");
    var msg = { 'content': content.trim(), 'type': 'user' };
    sendMsg(msg);
    msg_box.value = '';
    // todo 清除换行符
  }
}
/**
* 将消息内容添加到输出框中,并将滚动条滚动到最下方
*/
function listMsg(data, uname) {
  var msg_list = document.getElementById("msg_list");   //获取到id为msg_list的dom(聊天内容区域)
  if (data) {
    if (data.indexOf(uname) !== -1) {
      var nowData = data.split(':')
      var newData = nowData[1]
      // var msg = document.createElement("div");  //创建div标签
      // msg.className = 'myself'
      // var clear = document.createElement("div");
      // clear.className = 'clearboth'
      // msg.innerHTML = newData;  //div标签中添加内容为拼装好的数据
      // msg_list.appendChild(msg); //添加带有内容的div标签到内容div的dom节点
      // msg_list.appendChild(clear); //添加带有清除浮动的div标签到内容div的dom节点
      sessionStorage.setItem('listData',newData)
      // _this.$store.commit('listData',newData)
    } else if (data.indexOf('系统消息') !== -1) {
      // var msg = document.createElement("p");  //创建p标签
      // msg.innerHTML = data;  //p标签中添加内容为拼装好的数据
      // msg_list.appendChild(msg); //添加带有内容的p标签到div的dom节点
      sessionStorage.setItem('listData2',data)
      // _this.$store.commit('listData',data)
    } else {
      // var msg = document.createElement("div");  //创建div标签
      // msg.className = 'friend'
      // var clear = document.createElement("div");
      // clear.className = 'clearboth'
      // var feiendUsername = data.split(':')[0]
      // var feiendContent = data.split(':')[1]
      // msg.innerHTML = '【' + feiendUsername + '】说：' + feiendContent;  //div标签中添加内容为拼装好的数据
      // msg_list.appendChild(msg); //添加带有内容的div标签添加到内容div的dom节点
      // msg_list.appendChild(clear); //添加带有清除浮动的div标签到内容div的dom节点
      sessionStorage.setItem('listData3',data)
      // _this.$store.commit('listData',data)
    }
  }
}
/**
* 处理用户登陆消息
*
* @param user_name 用户名
* @param type  login/logout
* @param name_list 用户列表
*/
function dealUser(user_name, type, name_list) {
  var user_list = document.getElementById("user_list");  //获取id为user_list的dom
  var user_num = document.getElementById("user_num");  //获取id为user_num的dom
  while (user_list.hasChildNodes()) {
    user_list.removeChild(user_list.firstChild);
  }

  for (var index in name_list) {
    var user = document.createElement("p");
    user.innerHTML = name_list[index];
    user_list.appendChild(user);
  }
  user_num.innerHTML = name_list.length;
  user_list.scrollTop = user_list.scrollHeight;

  var change = type == 'login' ? '加入聊天室' : '离开聊天室';
  var time = new Date()
  var nowTime = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() + ':' + (time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()) + ':' + (time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds());
  var data = '系统消息' + '(' + nowTime + ')' + '：' + user_name + ' 已' + change;
  listMsg(data);
}
/**
* 将数据转为json并发送
* @param msg
*/
function sendMsg(msg) {    //websocket的发送方法send(data),data为发送的内容
  var data = JSON.stringify(msg);
  ws.send(data);
}	