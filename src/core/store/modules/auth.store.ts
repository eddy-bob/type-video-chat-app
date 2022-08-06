import { defineStore } from 'pinia';

import authService from "../../services/authService";
import { storeItem } from '../../utils/storage.helper';
import { Register, Login, ForgotPasswordInit, ForgotPasswordComplete, ChangePassword } from "../../../interfaces/auth.interface"
import isAuthenticated from '../../../helpers/authenticate';
const isIdentity = isAuthenticated();

const authStore = defineStore('auth', {
  state: () => {
    return {
      isAuthenticated: isIdentity,
      active: false,
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


        if (response && response.data && response.data.access_token) {
          console.log(response.data.data)
          storeItem(import.meta.env.VITE_ACCESSTK, {
            rsa: response.data.access_token,
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


          sessionStorage.setItem(import.meta.env.VITE_USERDETAILS, data)
         
          this.isAuthenticated = true;

          return await Promise.resolve(response);

        }
        else if (response.response) {
          console.log("na second stage o")
          return await Promise.reject(response.response)
        }
        else {
          console.log("na third stage o")
          return await Promise.reject(response.message)
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
        else if (response.response) { return await Promise.reject(response.response) }
        else { return await Promise.reject(response.message) }

      } catch (error: any) {
        return await Promise.reject(error);
      }
    },
    async userForgotPasswordInit(data: ForgotPasswordInit): Promise<any> {
      try {
        const response = await authService.forgotPasswordInit(data);

        if (response.data) {
          return await Promise.resolve(response)
        }
        else if (response.response) {
          return await Promise.reject(response.response)
        }
        else { return await Promise.reject(response.message) }

      } catch (error: any) {
        console.log("error:", error)
        return await Promise.reject(error);
      }
    },
    async forgotPasswordComplete(data: ForgotPasswordComplete): Promise<any> {
      try {
        const response = await authService.forgotPasswordComplete(data);
        if (response.data) {
          return await Promise.resolve(response)
        }
        else if (response.response) {
          return await Promise.reject(response.response)
        }
        else { return await Promise.reject(response.message) }

      } catch (error) {
        return await Promise.reject(error);
      }
    },
    async changePassword(data: ChangePassword): Promise<any> {
      try {
        const response = await authService.changePassword(data);
        if (response.data) {
          return await Promise.resolve(response)
        }
        else if (response.response) {

          return await Promise.reject(response.response)
        }
        else {

          return await Promise.reject(response.message)
        }

      } catch (error: any) {

        return await Promise.reject(error);
      }
    },
    async getAuthUser() {
      try {
        const response = await authService.getAuthUser();
        if (response.data) { return await Promise.resolve(response) }
        else if (response.response) { return await Promise.reject(response.response) }
        else { return await Promise.reject(response.message) }

      } catch (error: any) {
        return await Promise.reject(error);
      }
    },
    logoutUser() {

      this.isAuthenticated = false;
      sessionStorage.removeItem(import.meta.env.VITE_ACCESSTK);
      
    },
  },
});

export default authStore;

