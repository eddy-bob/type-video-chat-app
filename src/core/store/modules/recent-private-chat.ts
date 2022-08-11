import recentPrivateChat from "../../services/recentPrivateChat";
import { defineStore } from 'pinia';

const useRecentPrivateChatStore = defineStore('recent-private-chat-store', {
       state: () => {
              return {
                     recentChats: []
              }
       },
       actions: {
              async addRecentPrivateChat(data: { friend: string, relationship: string }): Promise<any> {
                     try {

                            const response = await recentPrivateChat.addRecentPrivateChats(data);
                            if (response.data) { return await Promise.resolve(response) }
                            else if (response.response) { return await Promise.reject(response.response) }
                            else { return await Promise.reject(response.message) }

                     } catch (error: any) {
                            return await Promise.reject(error);
                     }
              },
              async getRecentPrivateChats(): Promise<any> {
                     try {

                            const response = await recentPrivateChat.getRecentPrivateChats();
                            if (response.data) {
                                   return await Promise.resolve(response)
                            }
                            else if (response.response) {
                                   return await Promise.reject(response.response)
                            }
                            else { return await Promise.reject(response.message) }

                     } catch (error: any) {
                            return await Promise.reject(error);
                     }
              },
       }
})
export default useRecentPrivateChatStore 