import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)
const state = {
    username:'', //默认值为''
    connectState:true, //默认为不可选择
}

//mutations是执行方法，点击分类存储分类id
const mutations={
    save(state,n){
        state.username=n;
    },
    connectState(state,n){
        state.connectState=n;
    }
}
export default new Vuex.Store({
    state,
    mutations,
    strict: true // 严格模式，只能通过 mutation 来更改状态
  })