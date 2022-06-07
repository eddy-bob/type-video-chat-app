import { Axios } from "axios";
import authHeader from "../utils/auth.header";
import { http } from "../utils/http";
import { GroupInterface, GroupUpdateInterface } from "../../interfaces/group.interface"

class GroupService {
       constructor(private readonly request: Axios) { }

       /**
        *get-- group 
        * auth:authorization token
        */
       async getGroup(groupId: string): Promise<any> {
              const response = await this.request
                     .get(`group/get-group/${groupId}`, { headers: authHeader() })
              return response.data
       }
       /**
        *get-- get groups
        * auth:authorization token
        */

       async getGroups(): Promise<any> {
              const response = await this.request
                     .get(
                            `group/fetch-groups`,
                            { headers: authHeader() }
                     )
              return response.data
       }
       /**
      *put-- update group
      * auth:authorization token
      */

       async updateGroup(data: GroupUpdateInterface): Promise<any> {
              const response = await this.request
                     .put(
                            `group/update/${data.groupId}`,
                            { ...data },
                            { headers: authHeader() }
                     )
              return response.data
       }

       /**
   *post-- create group
   * auth:authorization token
   */

       async createGroup(data: GroupInterface): Promise<any> {
              const response = await this.request
                     .put(
                            `group/create`,
                            { ...data },
                            { headers: authHeader() }
                     )
              return response.data
       }
       /**
     *delete-- delete group
     * auth:authorization token
     */

       async deleteGroup(groupId: string): Promise<any> {
              const response = await this.request
                     .delete(
                            `group/delete/${groupId}`,
                            { headers: authHeader() }
                     )
              return response.data
       }

}

export default new GroupService(http);
