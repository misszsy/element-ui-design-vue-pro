import storage from "store";
import { login, getInfo, logout } from "@/api/login";
import { ACCESS_TOKEN } from "@/store/mutation-types";

const user = {
  state: {
    token: "",
    name: "",
    avatar: "",
    profile: false,
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_PROFILE: (state, profile) => {
      state.profile = profile;
    },
    SET_INFO: (state, info) => {
      state.info = info;
    }
  },

  actions: {
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then(response => {
            const data = response.data;
            storage.set(ACCESS_TOKEN, data.token, 7 * 24 * 60 * 60 * 1000);
            commit("SET_TOKEN", data.token);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then(response => {
            const data = response.data;
            commit("SET_INFO", data);
            commit("SET_PROFILE", true);
            commit("SET_NAME", data.name);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    Logout({ commit, state }) {
      return new Promise(resolve => {
        logout(state.token)
          .then(() => {
            resolve();
          })
          .catch(() => {
            resolve();
          })
          .finally(() => {
            commit("SET_PROFILE", false);
            commit("SET_TOKEN", "");
            storage.remove(ACCESS_TOKEN);
          });
      });
    }
  }
};
export default user;
