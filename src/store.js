
import Vue from 'vue';
import Vuex from 'vuex';

import { VDR_SAVE_PROG, TEMP_UPDATE } from './actions';

Vue.use(Vuex);

const store = new Vuex.Store({
    // state should only be changed through mutations
    state: {
        temp: {

        },
        vdr: {

        }
    },
    // mutations are always sync
    mutations: {
        increment (state, payload) {
            state.count += payload || 1;
        },
        [VDR_SAVE_PROG] (state) {
          // mutate state
        },
        [TEMP_UPDATE] (state) {
          // mutate state
        }
    },
    // actions can be async:
    // use store.dispatch('increment', 10).then(() => {
    // });
    actions: {
        // commit calls the actual mutation to trigger change state
        increment ({commit}, payload) {
            commit('increment', payload);
        },
        [VDR_SAVE_PROG] ({commit}, payload) {
            // mutate state
            setTimeout(() => {
                commit(VDR_SAVE_PROG, payload);
            }, 1000);
        }
    }
});

export default store;
