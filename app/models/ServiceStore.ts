import { Instance, SnapshotOut, types } from "mobx-state-tree"

import { api } from "../services/api"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { ServiceModel } from "./ServiceModel";

export const ServiceStoreModel = types
  .model("ServiceStore")
  .props({
    services: types.array(ServiceModel)
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async fetchServices() {
      const response = await api.getServices();
      store.setProp("services", response.data ?? []);
    },
    async getOneService(id: string) {
      return store.services.find((service) => service.id === id);
    },
  }))
  .views((store) => ({
    get servicesList() {
      return store.services ?? []
    }
  }))

export interface ServiceStore extends Instance<typeof ServiceStoreModel> { }
export interface ServiceStoreSnapshot extends SnapshotOut<typeof ServiceStoreModel> { }
