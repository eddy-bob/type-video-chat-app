import GroupService from "../../services/groupService";
import { defineStore } from 'pinia';
import { GroupInterface, GroupUpdateInterface } from "../../../interfaces/group.interface"

const useGroupStore = defineStore('group', {
       actions: {
              async getGroup(groupId: string): Promise<any> {
                     try {

                            const response = await GroupService.getGroup(groupId);
                            if (response.data) { return await Promise.resolve(response) }
                            else if (response.response) { return await Promise.reject(response.response) }
                            else { return await Promise.reject(response.message) }

                     } catch (error: any) {
                            return await Promise.reject(error);
                     }
              },
              async getGroups(): Promise<any> {
                     try {

                            const response = await GroupService.getGroups();
                            if (response.data) { return await Promise.resolve(response) }
                            else if (response.response) { return await Promise.reject(response.response) }
                            else { return await Promise.reject(response.message) }

                     } catch (error: any) {
                            return await Promise.reject(error);
                     }
              },
              async updateGroup(data: GroupUpdateInterface): Promise<any> {
                     try {

                            const response = await GroupService.updateGroup(data)
                            if (response.data) { return await Promise.resolve(response) }
                            else if (response.response) { return await Promise.reject(response.response) }
                            else { return await Promise.reject(response.message) }

                     } catch (error: any) {
                            return await Promise.reject(error);
                     }
              },
              async updateGroupPicture(data: { photo: ArrayBuffer, groupId: string }): Promise<any> {
                     try {

                            const response = await GroupService.updateGroup(data)
                            if (response.data) { return await Promise.resolve(response) }
                            else if (response.response) { return await Promise.reject(response.response) }
                            else { return await Promise.reject(response.message) }

                     } catch (error: any) {
                            return await Promise.reject(error);
                     }
              },
              async createGroup(data: GroupInterface): Promise<any> {
                     try {

                            const response = await GroupService.createGroup(data);
                            if (response.data) { return await Promise.resolve(response) }
                            else if (response.response) { return await Promise.reject(response.response) }
                            else { return await Promise.reject(response.message) }

                     } catch (error: any) {
                            return await Promise.reject(error);
                     }
              },

              async deleteGroup(groupId: string): Promise<any> {
                     try {

                            const response = await GroupService.deleteGroup(groupId);
                            if (response.data) { return await Promise.resolve(response) }
                            else if (response.response) { return await Promise.reject(response.response) }
                            else { return await Promise.reject(response.message) }

                     } catch (error: any) {
                            return await Promise.reject(error);
                     }
              },



       }
})
export default useGroupStore