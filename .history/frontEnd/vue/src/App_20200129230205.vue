<template>
  <div id="app">
    <HelloWorld/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
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
  word-wrap: break-word;
  word-break: break-all;
  text-align: left;
}
.friend {
  float: left;
  background: #ffe6b8;
  margin: 1rem;
  padding: 0.5rem;
  border-radius: 0.6rem;
  word-wrap: break-word;
  word-break: break-all;
  text-align: left;
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
