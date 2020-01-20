<template>
<div>
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
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
              <input type="text" placeholder="输入你的昵称" id="username" class="form-control">
            </div>
            <button class="btn btn-success" onclick="btnLink()">连接</button>
            <button class="btn btn-danger" id="linkState" disabled="disabled" disabled onclick="closeBtn()">断开</button>
        </div>
        </div><!--/.navbar-collapse -->
      </div>
    </nav>
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	  @media (min-width: 768px){
			.col-sm-6{
				width: 81rem;
			}
			.row{
				width: 100rem;
				margin: 0 auto;
			}
            #msg_list>p{
                padding: .2rem;
                background: #eee;
                width: 30rem;
                margin: 0 auto;
                border-radius: 1.2rem;
                margin: .5rem auto;
            }
	  }
	  @media (max-width: 500px){
        #msg_list>p{
            padding: .2rem;
            background: #eee;
            width: 22rem;
            margin: 0 auto;
            border-radius: 1.2rem;
            margin: .5rem auto;
      }
	  }
      .myself{
          float:right;
          background: #cfffcf;
          margin: 1rem;
          padding: .5rem;
          border-radius: .6rem;
      }
      .friend{
          float:left;
          background: #ffe6b8;
          margin: 1rem;
          padding: .5rem;
          border-radius: .6rem;
      }
      .clearboth{
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
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        border-radius: 10px;
    }
    /* 滚动条滑块 */
    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: #bbb;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
    }
    ::-webkit-scrollbar-thumb:window-inactive {
        background: rgba(255,0,0,0.4);
    }
</style>
