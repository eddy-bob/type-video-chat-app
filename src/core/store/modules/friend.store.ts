import { defineStore } from 'pinia';
import friendService from '../../services/friendService';
const useFriend = defineStore('friend', {
       actions: {
              async blockFriend(friendId: string): Promise<any> {
                     try {

                            const response = await friendService.blockFriend(friendId);
                            if (response.data) { return await Promise.resolve(response) }
                            else if (response.response) { return await Promise.reject(response.response) }
                            else { return await Promise.reject(response.message) }
                     } catch (error: any) {
                            return await Promise.reject(error);
                     }
              },

              async unblockFriend(friendId: string): Promise<any> {
                     try {

                            const response = await friendService.unblockFriend(friendId);
                            if (response.data) { return await Promise.resolve(response) }
                            else if (response.response) { return await Promise.reject(response.response) }
                            else { return await Promise.reject(response.message) }

                     } catch (error: any) {
                            return await Promise.reject(error);
                     }
              },
              async fetchFriends(): Promise<any> {
                     try {

                            const response = await friendService.fetchFriends();
                            if (response.data) { return await Promise.resolve(response) }
                            else if (response.response) { return await Promise.reject(response.response) }
                            else { return await Promise.reject(response.message) }

                     } catch (error: any) {
                            return await Promise.reject(error);
                     }
              },



       }
})
export default useFriend