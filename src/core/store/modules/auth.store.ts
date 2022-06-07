import { defineStore } from 'pinia';
import { VueCookieNext } from "vue-cookie-next"
import authService from "../../services/authService";
import { storeItem } from '../../utils/storage.helper';
import { Register, Login, ForgotPasswordInit, ForgotPasswordComplete, ChangePassword } from "../../../interfaces/auth.interface"
import isAuthenticated from '../../../helpers/authenticate';
const isIdentity = isAuthenticated();

const authStore = defineStore('auth', {
  state: () => {
    return {
      isAuthenticated: isIdentity,
      customerReg: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",

      },
      userLogin: {
        email: "",
      },
      successMessage: null,
      errorMessage: null,
    };
  },
  actions: {
    async userLogin(data: Login): Promise<any> {
      try {
        const response = await authService.login(data);
        console.log(response.data.token)
        if (response && response.data.token && response.data) {
          storeItem(import.meta.env.VITE_ACCESSTK, {
            rsa: response.data.token,
          });
          // store user details to cookies with an expiration 
          const data = JSON.stringify({
            customerReg: {
              firstName: response.data.data.firstName,
              lastName: response.data.data.lastName,
              email: response.data.data.email,
              phone: response.data.data.phone,
            }
          })

          VueCookieNext.setCookie(import.meta.env.VITE_USERDETAILS,
            data, { expire: import.meta.env.VITE_COOKIE_EXPIRE }

          )
          this.isAuthenticated = true;

          return await Promise.resolve(response);
        } else {

          return await Promise.reject(response.response);
        }

      } catch (error: any) {
        console.log(error)
        return await Promise.reject(error);
      }
    },
    async userRegister(data: Register): Promise<any> {
      try {

        const response = await authService.register(data);
        if (response.data) { return await Promise.resolve(response) }
        else { return await Promise.reject(response.response) }
      } catch (error: any) {
        return await Promise.reject(error);
      }
    },
    async userForgotPasswordInit(data: ForgotPasswordInit): Promise<any> {
      try {
        const response = await authService.forgotPasswordInit(data);
        if (response.data) { return await Promise.resolve(response) }
        else { return await Promise.reject(response.response) }
      } catch (error: any) {

        return await Promise.reject(error);
      }
    },
    async forgotPasswordComplete(data: ForgotPasswordComplete): Promise<any> {
      try {
        const response = await authService.forgotPasswordComplete(data);
        if (response.data) { return await Promise.resolve(response) }
        else { return await Promise.reject(response.response) }
      } catch (error) {
        return await Promise.reject(error);
      }
    },
    async changePassword(data: ChangePassword): Promise<any> {
      try {
        const response = await authService.changePassword(data);
        if (response.data) { return await Promise.resolve(response) }
        else { return await Promise.reject(response.response) }
      } catch (error: any) {
        return await Promise.reject(error);
      }
    },
    async getAuthUser() {
      try {
        const response = await authService.getAuthUser();
        if (response.data) { return await Promise.resolve(response) }
        else { return await Promise.reject(response.response) }
      } catch (error: any) {
        return await Promise.reject(error);
      }
    },
    logoutUser() {

      this.isAuthenticated = false;
      sessionStorage.removeItem(import.meta.env.VITE_ACCESSTK);
      VueCookieNext.removeCookie(import.meta.env.VITE_USERDETAILS)
    },
  },
});

export default authStore;

