import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)
const state = {
    message:'', //默认值为''
}

//mutations是执行方法，点击分类存储分类id
const mutations={
    save(state,n){
        state.message=n;
    }
}
export default new Vuex.Store({
    state,
    mutations,
    strict: true // 严格模式，只能通过 mutation 来更改状态
  })