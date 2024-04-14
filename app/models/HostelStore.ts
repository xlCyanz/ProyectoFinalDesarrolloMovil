import { Instance, SnapshotOut, types } from "mobx-state-tree"

import { api } from "app/services/api"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { HostelModel } from "./HostelModel";

export const HostelStoreModel = types
  .model("HostelStore")
  .props({
    hostels: types.array(HostelModel)
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async fetchHostels() {
      const response = await api.getHostels();
      store.setProp("hostels", response.data ?? []);
    },
    async getOneHostel(code: string) {
      return store.hostels.find((Hostel) => Hostel.codigo === code);
    },
  }))
  .views((store) => ({
    get hostelsList() {
      return store.hostels ?? []
    }
  }))

export interface HostelStore extends Instance<typeof HostelStoreModel> { }
export interface HostelStoreSnapshot extends SnapshotOut<typeof HostelStoreModel> { }
