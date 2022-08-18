import GroupChatService from "../../services/groupChat";
import { defineStore } from 'pinia';

const useGroupChat = defineStore('group-chat', {
       actions: {
              async getGroupChat(groupId: string): Promise<any> {
                     try {

                            const response = await GroupChatService.getGroupChat(groupId);
                            if (response.data) { return await Promise.resolve(response) }
                            else if (response.response) { return await Promise.reject(response.response) }
                            else { return await Promise.reject(response.message) }

                     } catch (error: any) {
                            return await Promise.reject(error);
                     }
              },

              async deleteGroupChat(data: { chatId: string, groupId: string }): Promise<any> {
                     try {

                            const response = await GroupChatService.deleteChat(data);
                            if (response.data) { return await Promise.resolve(response) }
                            else if (response.response) { return await Promise.reject(response.response) }
                            else { return await Promise.reject(response.message) }

                     } catch (error: any) {
                            return await Promise.reject(error);
                     }
              },



       }
})
export default useGroupChat