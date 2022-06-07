import { Axios } from "axios";
import authHeader from "../utils/auth.header";
import { http } from "../utils/http";

class FriendService {
       constructor(private readonly request: Axios) { }

       /**
        *put-- block friend
        * auth:authorization token
        */
       async blockFriend(friendId: string): Promise<any> {
              const response = await this.request
                     .put(`user/friend/${friendId}/block`, undefined, { headers: authHeader() })
              return response.data
       }
       /**
       *put-- unblock friend
       * auth:authorization token
       */
       async unblockFriend(friendId: string): Promise<any> {
              const response = await this.request
                     .put(`user/friend/${friendId}/unblock`, undefined,
                            { headers: authHeader() })
              return response.data
       }
       /**
       *get-- fetch all friends
       * auth:authorization token
       */
       async fetchFriends(): Promise<any> {
              const response = await this.request
                     .get(`user/friend`, { headers: authHeader() })
              return response.data
       }
}

export default new FriendService(http);
