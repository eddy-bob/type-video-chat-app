import { Axios } from "axios";
import authHeader from "../utils/auth.header";
import { http } from "../utils/http";

class FriendRequestService {
       constructor(private readonly request: Axios) { }

       /**
        *post-- send friend request
        * auth:authorization token
        */
       async sendFriendRequest(id: string): Promise<any> {
              const response = await this.request
                     .post(`user/friend/request/${id}/send-request`, undefined, { headers: authHeader() })
              return response;
       }
       /**
       *get-- accept friend request
       * auth:authorization token
       */
       async acceptFriendRequest(requestId: string): Promise<any> {
              const response = await this.request
                     .get(`user/friend/request/${requestId}/accept-request`,
                            { headers: authHeader() })
              return response;
       }
       /**
       *delete-- reject friend request
       * auth:authorization token
       */
       async rejectFriendRequest(requestId: string): Promise<any> {
              const response = await this.request
                     .delete(`user/friend/request/${requestId}/reject-request`, { headers: authHeader() })
              return response;
       }
       /**
       *delete-- delete friend request
       * auth:authorization token
       */
       async deleteFriendRequest(requestId: string): Promise<any> {
              const response = await this.request
                     .delete(`user/friend/request/${requestId}/delete-request`, { headers: authHeader() })
              return response;
       }
}

export default new FriendRequestService(http);
