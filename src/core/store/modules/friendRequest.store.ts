import friendRequestService from "../../services/friendRequestService";
import { defineStore } from 'pinia';

const useFriendRequestStore = defineStore('friend-request', {
       actions: {
              async sendFriendRequest(id: string): Promise<any> {
                     try {

                            const response = await friendRequestService.sendFriendRequest(id);
                            if (response.data) { return await Promise.resolve(response) }
                            else if (response.response) { return await Promise.reject(response.response) }
                            else { return await Promise.reject(response.message) }

                     } catch (error: any) {
                            return await Promise.reject(error);
                     }
              },
              async acceptFriendRequest(requestId: string): Promise<any> {
                     try {

                            const response = await friendRequestService.acceptFriendRequest(requestId);
                            if (response.data) { return await Promise.resolve(response) }
                            else if (response.response) { return await Promise.reject(response.response) }
                            else { return await Promise.reject(response.message) }

                     } catch (error: any) {
                            return await Promise.reject(error);
                     }
              },
              async rejectFriendRequest(requestId: string): Promise<any> {
                     try {

                            const response = await friendRequestService.rejectFriendRequest(requestId);
                            if (response.data) { return await Promise.resolve(response) }
                            else if (response.response) { return await Promise.reject(response.response) }
                            else { return await Promise.reject(response.message) }

                     } catch (error: any) {
                            return await Promise.reject(error);
                     }
              },
              async deleteFriendRequest(requestId: string): Promise<any> {
                     try {

                            const response = await friendRequestService.deleteFriendRequest(requestId);
                            if (response.data) { return await Promise.resolve(response) }
                            else if (response.response) { return await Promise.reject(response.response) }
                            else { return await Promise.reject(response.message) }

                     } catch (error: any) {
                            return await Promise.reject(error);
                     }
              },


       }
})
export default useFriendRequestStore