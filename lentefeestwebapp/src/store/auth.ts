import firebase from "firebase";
export default {
  state: {
    Token: <firebase.auth.AuthCredential>{},
    user: <firebase.User | null>{},
    userLoggedIn: <boolean>false
  },
  mutations: {
    setUser(state: any, payload: firebase.auth.UserCredential) {
      state.user = payload ? payload.user : null;
      state.Token = payload ? payload.credential : null;
    },
    setUserLoggedIn(state: any, payload: boolean) {
      state.userLoggedIn = payload;
    }
  },
  getters: {
    getUser(state: any): firebase.User | null {
      return state.user;
    },
    getAccessToken(state: any): firebase.auth.AuthCredential {
      return state.Token;
    },
    isUserLoggedIn(state: any): boolean {
      return state.userLoggedIn;
    }
  },
  actions: {
    setUser(state: any, user: firebase.User) {
      state.user = user;
    }
  }
};
