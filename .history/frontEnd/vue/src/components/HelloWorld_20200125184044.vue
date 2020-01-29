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
          >
          <div v-for="(item,i) in listData" :key="i">
              <!-- <div :class="temp.indexOf(username) !== -1 ? 'myself' : (temp.indexOf('系统消息') !== -1 ? 'stystem' : 'friend')">{{item}}</div>
              <div class="clearboth"></div> -->
          </div>
          </div>
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
import * as ws from '../common/websocket.js'
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
  mounted(){
    console.log(ws.connect)
  },
  //返回connectState
  computed:{
    getconnectState(){
      return this.$store.state.connectState;
    }
  },
  //监听计算属性返回的值
  watch:{
    getconnectState(){
      this.disabled = this.$store.state.connectState;
    }
  },
  methods:{
    btnLink(){
        if(this.username === ''){
          alert('请输入一个昵称，再点击连接！')
          return false;
      }else{
        ws.connect(this.username); //链接websocket
      }
    },
    closeBtn(){
      ws.closeBtn();
    },
    send(){
      ws.send()
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
  .stystem {
    padding: 0.2rem;
    background: #eee;
    width: 30rem;
    margin: 0 auto;
    border-radius: 1.2rem;
    margin: 0.5rem auto;
  }
}
@media (max-width: 500px) {
  .stystem {
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
