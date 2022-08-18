import { Axios } from "axios";
import authHeader from "../utils/auth.header";
import { http } from "../utils/http";

class GroupChatService {
       constructor(private readonly request: Axios) { }

       /**
        *delete-- group chat
        * auth:authorization token
        */
       async deleteChat(data: { chatId: string, groupId: string }): Promise<any> {
              const response = await this.request
                     .delete(`group/chat/?chatId=${data.chatId}&&groupId=${data.groupId}`, { headers: authHeader() })
              return response;
       }
       /**
        *get-- get group chats
        * auth:authorization token
        */

       async getGroupChat(groupId: string): Promise<any> {
              const response = await this.request
                     .get(
                            `group/chat/${groupId}`,
                            { headers: authHeader() }
                     )
              return response;
       }

}

export default new GroupChatService(http);
