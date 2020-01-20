<template>
  <div>
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button
            type="button"
            class="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#navbar"
            aria-expanded="false"
            aria-controls="navbar"
          >
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">在线聊天室</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <div class="navbar-form navbar-right">
            <div class="form-group">
              <input type="text" placeholder="输入你的昵称" v-model="username" class="form-control" />
            </div>
            <button class="btn btn-success" @click="btnLink">连接</button>
            <button
              class="btn btn-danger"
              id="linkState"
              :disabled="disabled"
              @click="closeBtn"
            >断开</button>
          </div>
        </div>
        <!--/.navbar-collapse -->
      </div>
    </nav>
    <blockquote style="margin-top: 100px;text-align: center;">
      Websocket是一种用于H5浏览器的实时通讯协议，可以做到数据的实时推送，本项目基于Websocket制作。
      <small>
        <cite title="Source Title">在线聊天室</cite>
      </small>
    </blockquote>
    <div style="margin:0 auto;text-align:center;" class="col-xs-12 col-sm-12">
      <div class="row">
        <div
          class="panel panel-default col-xs-12 col-sm-2"
          style="padding-left:0;padding-right:0;margin-right:2rem;height:38rem;"
        >
          <div class="panel-heading">
            <h3 class="panel-title">
              当前在线人数：
              <span>{{online_total}}</span>
            </h3>
          </div>
          <!-- 用户列表 -->
          <div
            class="panel-body"
            id="user_list"
            style="overflow: auto;-webkit-overflow-scrolling: touch;height: 34rem;"
          ></div>
        </div>
        <!-- 内容 -->
        <div class="col-xs-12 col-sm-6 panel panel-success" style="padding-left:0;padding-right:0;">
          <div class="panel-heading">
            <h3 class="panel-title">公共聊天室</h3>
          </div>
          <div
            ref="content"
            class="panel-body"
            style="height: 35rem;overflow: auto;-webkit-overflow-scrolling: touch;"
            v-for="(item,i) in listData" :key="i"
          >
              <div :class="temp.indexOf(username) !== -1 ? 'myself' : 'friend'">{{item}}</div>
          </div>
          <div class="clearboth"></div>
        </div>
        <!-- 提交栏 -->
        <div class="col-xs-12 col-sm-12" style="height:5rem;">
          <div class="col-lg-12" style="padding-left: 0;padding-right: 0;padding-bottom:3rem;">
            <div class="input-group">
              <input
                type="text"
                class="form-control input-group-lg"
                style="height:8rem;"
                id="msg_box"
                onkeydown="confirm(event)"
              />
              <span class="input-group-btn">
                <button
                  class="btn btn-default"
                  type="button"
                  style="height: 8rem;width: 9rem;"
                  id="msg_box"
                  @click="send"
                >发送</button>
              </span>
            </div>
            <!-- /input-group -->
          </div>
          <!-- /.col-lg-6 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      username:'',//用户名
      online_total:0,//在线人数
      timeout:6000,//延时
      wsTimeoutObj:null,//延时器对象
      disabled:true, //默认禁止点击断开
      ws:{}, //websocket实例对象
      listData:[],//存聊天内容
      temp:"",//存data
    };
  },
  methods:{
    btnLink(){
      var _this = this
        //初始化定时器对象
        if(this.username === ''){
            alert('请输入一个昵称，再点击连接！')
            return false;
        }else{
            //实例化websocket
            let uname = this.username
            _this.ws = new WebSocket("wss://tool.haoht123.com/wss/");
            //连接成功的回调onopen
            _this.ws.onopen = function (e) {
                let data = "系统消息：建立连接成功";
                this.temp = data
                _this.listMsg(data,uname,this.username);
                if(e.currentTarget.readyState == 1){
                    _this.disabled = false
                }
                //调定时器方法
                _this.startWsTimeOut();
              };
            //连接关闭的回调onclose
            _this.ws.onclose = function (e) {
                let data = "系统消息：已退出聊天室";
                _this.deleteWsTimeOut();  //清除定时器
                this.temp = data
                _this.listMsg(data,uname,getUser);
                _this.disabled = true
            };
            //接收服务器返回消息的回调onmessage
            _this.ws.onmessage = function (e) {
                var msg = JSON.parse(e.data);  //解析服务器返回的消息赋值给变量msg
            if(msg.type === 'pong'){
              _this.resetWsTimeOut();
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
                        var user_info = {'type': 'login', 'content': uname};
                        _this.sendMsg(user_info);
                        return;
                    case 'login':
                    case 'logout':
                        user_name = msg.content;
                        name_list = msg.user_list;
                        change_type = msg.type;
                        _this.dealUser(user_name, change_type, name_list);
                        return;
                }

                var data = sender + msg.content;   //拼接title和content，例如：'系统消息：xxx上线了'
                this.temp = data
                _this.listMsg(data,uname,getUser);   //传值给listMsg
            };
            //错误的回调onerror
            _this.ws.onerror = function () {
                var data = "系统消息 : 出错了,请退出重试.";
                this.temp = data
                _this.listMsg(data,uname,getUser);
            };
                }
            },
      //定时器方法
      startWsTimeOut(){
        this.wsTimeoutObj = setTimeout( function(){
        this.ws.send('{"type":"heartbeat","content":"ping"}')
      },this.timeout)
    },
      //重置定时器
        resetWsTimeOut() {  // 重置计时器
            clearTimeout(this.wsTimeoutObj);  // 清空计时器
            this.startWsTimeOut();
          },
        //清除定时器
        deleteWsTimeOut(){
          clearTimeout(this.wsTimeoutObj);  // 清空计时器
        },
        //断开连接
        closeBtn(){
          this.ws.close();
        },
        //监听回车
        confirm(event) {
            var key_num = event.keyCode;
            if (13 == key_num) {
                this.send();
            } else {
                return false;
            }
        },
    /**
     * 发送并清空消息输入框内的消息
     */
    send() {
        var msg_box = document.getElementById("msg_box");
        var content = msg_box.value;

        var linkState = document.getElementById('linkState');
        if(linkState.disabled){
            alert('请先连接哦')
        }else if(content == ''){
            alert('不能发送空消息哦')
        }else{
            var reg = new RegExp("\r\n", "g");
            content = content.replace(reg, "");
            var msg = {'content': content.trim(), 'type': 'user'};
            this.sendMsg(msg);
            msg_box.value = '';
            // todo 清除换行符
        }
    },
    /**
     * 将消息内容添加到输出框中,并将滚动条滚动到最下方
     */
    listMsg(data,uname,getUser) {
      this.temp = data
 		if(data){
			if(data.indexOf(uname) !== -1){
				var nowData = data.split(':')
				var newData = nowData[1]
        this.listData.push(newData)
        console.log(this.listData)
			}else if(data.indexOf('系统消息') !== -1){
				var msg = document.createElement("p");  //创建p标签
        msg.innerHTML = data;  //p标签中添加内容为拼装好的数据
        this.listData.push(data)
			}else{
				clear.className = 'clearboth'
				var feiendUsername = data.split(':')[0]
				var feiendContent = data.split(':')[1]
				// msg.innerHTML = '【' + feiendUsername + '】说：' + feiendContent;  //div标签中添加内容为拼装好的数据
			}
		}
        // this.$refs.content.scrollTop = this.$refs.content.scrollHeight; //添加内容后滚动到底部
        // console.log(this.$refs)
    },
    /**
     * 处理用户登陆消息
     *
     * @param user_name 用户名
     * @param type  login/logout
     * @param name_list 用户列表
     */
    dealUser(user_name, type, name_list) {
        var user_list = document.getElementById("user_list");  //获取id为user_list的dom
        while(user_list.hasChildNodes()) {
            user_list.removeChild(user_list.firstChild);
        }
        for (var index in name_list) {
            var user = document.createElement("p");
            user.innerHTML = name_list[index];
            user_list.appendChild(user);
        }
        this.online_total = name_list.length; //刷新在线人数
        user_list.scrollTop = user_list.scrollHeight;

        var change = type == 'login' ? '加入聊天室' : '离开聊天室';
		    var time = new Date()
		    var nowTime = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' +time.getDate() + ' ' + time.getHours() + ':' + (time.getMinutes()<10 ? '0'+time.getMinutes() : time.getMinutes()) + ':' + (time.getSeconds()<10 ? '0'+ time.getSeconds() : time.getSeconds());
        var data = '系统消息'+'('+ nowTime + ')'+'：'  + user_name + ' 已' + change;
        this.listMsg(data);
    },
    /**
     * 将数据转为json并发送
     * @param msg
     */
    sendMsg(msg) {    //websocket的发送方法send(data),data为发送的内容
        var data = JSON.stringify(msg);
        this.ws.send(data);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media (min-width: 768px) {
  .col-sm-6 {
    width: 81rem;
  }
  .row {
    width: 100rem;
    margin: 0 auto;
  }
  #msg_list > p {
    padding: 0.2rem;
    background: #eee;
    width: 30rem;
    margin: 0 auto;
    border-radius: 1.2rem;
    margin: 0.5rem auto;
  }
}
@media (max-width: 500px) {
  #msg_list > p {
    padding: 0.2rem;
    background: #eee;
    width: 22rem;
    margin: 0 auto;
    border-radius: 1.2rem;
    margin: 0.5rem auto;
  }
}
.myself {
  float: right;
  background: #cfffcf;
  margin: 1rem;
  padding: 0.5rem;
  border-radius: 0.6rem;
}
.friend {
  float: left;
  background: #ffe6b8;
  margin: 1rem;
  padding: 0.5rem;
  border-radius: 0.6rem;
}
.clearboth {
  color: gray;
  clear: both;
  margin-left: 20px;
  padding-top: 5px;
}
/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 6px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #bbb;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(255, 0, 0, 0.4);
}
</style>
