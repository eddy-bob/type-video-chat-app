import { Axios } from "axios";
import authHeader from "../utils/auth.header";
import { http } from "../utils/http";

class UserService {
  constructor(private readonly request: Axios) { }
  /**
     *get-- users
     * auth:authorization token
     *
     */
  async getUsers(): Promise<any> {
    const response = await this.request
      .get(`users`, { headers: authHeader() })
    return response;
  }

  /**
       *delete-- users
       * auth:authorization token
       *
       */
  async deleteUsers(): Promise<any> {
    const response = await this.request
      .delete(`delete-all`, { headers: authHeader() })
    return response;
  }
  /**
         *delete-- user
         * auth:authorization token
         *@param {*} userId
         */
  async deleteUser(userId: string): Promise<any> {
    const response = await this.request
      .delete(`delete-user-account/${userId}`, { headers: authHeader() })
    return response;
  }
  /**
       *delete-- account
       * auth:authorization token
       *@param {*} userId
       */
  async deleteAccount(): Promise<any> {
    const response = await this.request
      .delete(`delete-account`, { headers: authHeader() })
    return response;
  }
  /**
   *get-- user-profile
   * auth:authorization token
   *@param {*} userId
   */
  async getUserProfile(userId: string): Promise<any> {
    const response = await this.request
      .get(`/user-profile/${userId}`, { headers: authHeader() })
    return response;
  }
  /**
 *get-- profile
 * auth:authorization token
 */
  async getProfile(): Promise<any> {
    const response = await this.request
      .get(`/profile`, { headers: authHeader() })
    return response;
  }
  /**
   *put-- update-profile
   * auth:authorization token
   */

  async updateProfile(data: any): Promise<any> {
    const response = await this.request
      .put(
        "/update-profile",
        { ...data },
        { headers: authHeader() }
      )
    return response;
  }
  /**
  *put-- update-profile
  * auth:authorization token
  */

  async updateUserProfile(data: any, userId: string): Promise<any> {
    const response = await this.request
      .put(
        `/update-user/:${userId}`,
        { ...data },
        { headers: authHeader() }
      )
    return response;
  }
  /**
   *put--update-profile-picture
   * auth:authorization token
   *@param {*} data
   */
  async updateProfilePic(data: any): Promise<any> {
    const response = await this.request
      .put(
        "user/update-profile-picture",
        { ...data },
        { headers: authHeader() }
      )
    return response;
  }
  /**
   *put--update-cover-picture
   * auth:authorization token
   *@param {*} data
   */
  async updateCoverPhoto(data: any): Promise<any> {
    const response = await this.request
      .put(
        "user/update-cover-photo",
        { ...data },
        { headers: authHeader() }
      )
    return response;
  }


  async verifyEmail(): Promise<any> {
    const response = await this.request
      .get(
        "user/auth/verify-email/init",
        { headers: authHeader() }
      )
    return response;
  }

  async verifyEmailConfirm(token: string): Promise<any> {
    const response = await this.request
      .put(
        `user/auth/verify-email/${token}/confirm`,

        { headers: authHeader() }
      )

  }
}

export default new UserService(http);
