import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      count: 0,
      templates: JSON.parse(localStorage.getItem('templates') || '[]'),
      editTitle: '',
      currentId: ''
    },
    mutations: {
      addCurrentId(state, id) {
        state.currentId = id
      },
      addTemplates(state, obj) {
        state.templates.push(obj);
        localStorage.setItem('templates', JSON.stringify(state.templates))
      },
      changeEditTitle(state, name) {
        state.editTitle = name;
      },
      deleteTemplate(state, obj) {
        state.templates.remove(obj);
        localStorage.setItem('templates', JSON.stringify(state.templates))
      },
      increment (state) {
        state.count++
      }
    },
    getters: {
      getTemplates(state) {
       state.templates = JSON.parse(localStorage.getItem('templates') || '[]')
       return state.templates
      }
    },
    actions: {

    }
  })