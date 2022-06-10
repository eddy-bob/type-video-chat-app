import { defineStore } from 'pinia';
import privateChatService from '../../services/privateChatService';
const usePrivateChat = defineStore('private-chat', {
       actions: {
              async getChat(friendId: string): Promise<any> {
                     try {

                            const response = await privateChatService.getChat(friendId);
                            if (response.data) { return await Promise.resolve(response) }
                            else if (response.response) { return await Promise.reject(response.response) }
                            else { return await Promise.reject(response.message) }

                     } catch (error: any) {
                            return await Promise.reject(error);
                     }
              },

              async deleteChat(chatId: string): Promise<any> {
                     try {

                            const response = await privateChatService.deleteChat(chatId);
                            if (response.data) { return await Promise.resolve(response) }
                            else if (response.response) { return await Promise.reject(response.response) }
                            else { return await Promise.reject(response.message) }

                     } catch (error: any) {
                            return await Promise.reject(error);
                     }
              },



       }
})
export default usePrivateChat