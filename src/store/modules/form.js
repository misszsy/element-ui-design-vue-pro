const state = {
  step: {}
};

const mutations = {
  saveStepFormData(state, { entity }) {
    state.step = {
      ...state.step,
      ...entity
    };
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
