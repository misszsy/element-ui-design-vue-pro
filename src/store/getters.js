const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  nickname: state => state.user.name,
  profile: state => state.user.profile,
  userInfo: state => state.user.info
};

export default getters;
