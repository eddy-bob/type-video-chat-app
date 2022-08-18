import { defineStore } from 'pinia';
import UserService from '../../services/userService';
const user = defineStore('user', {
  actions: {
    async getUsers(): Promise<any> {
      try {

        const response = await UserService.getUsers();
        if (response.data) { return await Promise.resolve(response) }
        else if (response.response) { return await Promise.reject(response.response) }
        else { return await Promise.reject(response.message) }
      } catch (error: any) {
        return await Promise.reject(error);
      }
    },

    async deleteUsers(): Promise<any> {
      try {

        const response = await UserService.deleteUsers();
        if (response.data) { return await Promise.resolve(response) }
        else if (response.response) { return await Promise.reject(response.response) }
        else { return await Promise.reject(response.message) }

      } catch (error: any) {
        return await Promise.reject(error);
      }
    },
    async deleteAccount(userId: string): Promise<any> {
      try {

        const response = await UserService.deleteAccount();
        if (response.data) { return await Promise.resolve(response) }
        else if (response.response) { return await Promise.reject(response.response) }
        else { return await Promise.reject(response.message) }

      } catch (error: any) {
        return await Promise.reject(error);
      }
    },
    async deleteUser(userId: string): Promise<any> {
      try {

        const response = await UserService.deleteUser(userId);
        if (response.data) { return await Promise.resolve(response) }
        else if (response.response) { return await Promise.reject(response.response) }
        else { return await Promise.reject(response.message) }

      } catch (error: any) {
        return await Promise.reject(error);
      }
    },
    async getUserProfile(userId: string): Promise<any> {
      try {

        const response = await UserService.getUserProfile(userId);
        if (response.data) { return await Promise.resolve(response) }
        else if (response.response) { return await Promise.reject(response.response) }
        else { return await Promise.reject(response.message) }

      } catch (error: any) {
        return await Promise.reject(error);
      }
    },
    async getProfile(): Promise<any> {
      try {

        const response = await UserService.getProfile();
        if (response.data) { return await Promise.resolve(response) }
        else if (response.response) { return await Promise.reject(response.response) }
        else { return await Promise.reject(response.message) }

      } catch (error: any) {
        return await Promise.reject(error);
      }
    },
    async updateProfile(data: any): Promise<any> {
      try {

        const response = await UserService.updateProfile(data);
        if (response.data) { return await Promise.resolve(response) }
        else if (response.response) { return await Promise.reject(response.response) }
        else { return await Promise.reject(response.message) }

      } catch (error: any) {
        return await Promise.reject(error);
      }
    },
    async updateUserProfile(data: any, userId: string): Promise<any> {
      try {

        const response = await UserService.updateUserProfile(data, userId);
        if (response.data) { return await Promise.resolve(response) }
        else if (response.response) { return await Promise.reject(response.response) }
        else { return await Promise.reject(response.message) }

      } catch (error: any) {
        return await Promise.reject(error);
      }
    },
    async updateProfilePic(data: ArrayBuffer): Promise<any> {
      try {

        const response = await UserService.updateProfilePic(data);
        if (response.data) { return await Promise.resolve(response) }
        else if (response.response) { return await Promise.reject(response.response) }
        else { return await Promise.reject(response.message) }

      } catch (error: any) {
        return await Promise.reject(error);
      }
    },
    async updateCoverPhoto(data: ArrayBuffer): Promise<any> {
      try {

        const response = await UserService.updateCoverPhoto(data);
        if (response.data) { return await Promise.resolve(response) }
        else if (response.response) { return await Promise.reject(response.response) }
        else { return await Promise.reject(response.message) }

      } catch (error: any) {
        return await Promise.reject(error);
      }
    },
    async verifyEmail(): Promise<any> {
      try {

        const response = await UserService.verifyEmail();
        if (response.data) { return await Promise.resolve(response) }
        else if (response.response) { return await Promise.reject(response.response) }
        else { return await Promise.reject(response.message) }

      } catch (error: any) {
        return await Promise.reject(error);
      }
    },

    async verifyEmailConfirm(token: string): Promise<any> {
      try {

        const response = await UserService.verifyEmailConfirm(token);
        if (response.data) { return await Promise.resolve(response) }
        else if (response.response) { return await Promise.reject(response.response) }
        else { return await Promise.reject(response.message) }

      } catch (error: any) {
        return await Promise.reject(error);
      }
    },
    async fetchUser(query: string): Promise<any> {
      try {

        const response = await UserService.fetchUser(query);
        if (response.data) { return await Promise.resolve(response) }
        else if (response.response) { return await Promise.reject(response.response) }
        else { return await Promise.reject(response.message) }

      } catch (error: any) {
        return await Promise.reject(error);
      }
    },

  }
})
export default user