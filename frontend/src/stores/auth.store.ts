import { defineStore } from "pinia";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { User } from "../models/user";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {} as User,
    token: '',
  }),
  actions: {
    checkAuth() {
      const token = Cookies.get('access_token');

      if (token) {
        try {
          this.token = token;
          this.user = jwtDecode(token) as User;
        } catch (error) {
          this.user = {} as User;
          this.token = '';
        }
      }
    },

    logout() {
      Cookies.remove("access_token");
      this.user = {} as User;
      this.token = '';
    },
  },
  getters: {
    isAuth: (state) => {
      return !!state.user && !!state.token;
    }
    
  },  
});
