import { Axios } from "axios";
import authHeader from "../utils/auth.header";
import { http } from "../utils/http";

class UserService {
  constructor(private readonly request: Axios) { }

  /**
   *get-- user-profile-details
   * auth:authorization token
   *@param {*} userId
   */
  async getUserProfile(userId: string): Promise<any> {
    const response = await this.request
      .get(`user/user-profile/${userId}`, { headers: authHeader() })
    return response.data
  }
  /**
   *put-- update-profile-details
   * auth:authorization token
   */

  async updateProfile(data: any): Promise<any> {
    const response = await this.request
      .put(
        "user/update-profile-details",
        { ...data },
        { headers: authHeader() }
      )
    return response.data
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
    return response.data
  }


  async verifyEmail(): Promise<any> {
    const response = await this.request
      .get(
        "user/auth/verify-email/init",
        { headers: authHeader() }
      )
    return response.data
  }

  async verifyEmailConfirm(data: any): Promise<any> {
    const response = await this.request
      .put(
        `user/auth/verify-email/${data.token}/confirm`,
        { ...data },
        { headers: authHeader() }
      )

  }
}

export default new UserService(http);
