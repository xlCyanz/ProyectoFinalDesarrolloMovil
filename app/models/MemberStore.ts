import { Instance, SnapshotOut, types } from "mobx-state-tree"

import { api } from "../services/api"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { MemberModel } from "./MemberModel";

export const MemberStoreModel = types
  .model("MemberStore")
  .props({
    members: types.array(MemberModel)
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async fetchMembers() {
      const response = await api.getMembers();
      store.setProp("members", response.data ?? []);
    },
    async getOneMember(id: string) {
      return store.members.find((member) => member.id === id);
    },
  }))
  .views((store) => ({
    get membersList() {
      return store.members ?? []
    }
  }))

export interface MemberStore extends Instance<typeof MemberStoreModel> { }
export interface MemberStoreSnapshot extends SnapshotOut<typeof MemberStoreModel> { }
