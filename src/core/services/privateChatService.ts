import { Axios } from "axios";
import authHeader from "../utils/auth.header";
import { http } from "../utils/http";

class PrivateChatService {
       constructor(private readonly request: Axios) { }

       /**
        *delete-- private chat
        * auth:authorization token
        */
       async deleteChat(chatId: string): Promise<any> {
              const response = await this.request
                     .delete(`user/private-chat/delete/${chatId}`, { headers: authHeader() })
             return response;
       }
       /**
        *get-- get private chats between the logged in user and another
        * auth:authorization token
        */

       async getChat(friendId: string): Promise<any> {
              const response = await this.request
                     .get(
                            `user/private-chat/${friendId}/get-chats`,
                            { headers: authHeader() }
                     )
             return response;
       }

}

export default new PrivateChatService(http);
