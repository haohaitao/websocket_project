<template>
<div>
        <div class="col-xs-12 col-sm-12" style="height:5rem;">
            <div class="col-lg-12" style="padding-left: 0;padding-right: 0;padding-bottom:3rem;">
				<div class="input-group">
					<input type="text" class="form-control input-group-lg" style="height:8rem;" id="msg_box" onkeydown="confirm(event)">
					<span class="input-group-btn">
						<button class="btn btn-default" type="button" style="height: 8rem;width: 9rem;" id="msg_box" onclick="send()">
							发送
						</button>
					</span>
				</div><!-- /input-group -->
			</div><!-- /.col-lg-6 -->
        </div>
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
