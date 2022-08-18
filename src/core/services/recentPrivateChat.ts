import { Axios } from "axios";
import authHeader from "../utils/auth.header";
import { http } from "../utils/http";

class FriendRequestService {
       constructor(private readonly request: Axios) { }

       /**
        *post-- add recent private vhats
        * auth:authorization token
        * *   @body {*}friendId
        */
       async addRecentPrivateChats(data: { friend: string, relationship: string }): Promise<any> {
              const response = await this.request
                     .post(`user/recent-private-chat/add`, data, { headers: authHeader() })
              return response;
       }

       /**
     *get-- get recent private chats
     * auth:authorization token
     
     */
       async getRecentPrivateChats(): Promise<any> {
              const response = await this.request
                     .get(`user/recent-private-chat`, { headers: authHeader() })
              return response;
       }
}

export default new FriendRequestService(http);
