import { Instance, SnapshotOut, types } from "mobx-state-tree"

import { api } from "app/services/api"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { MeasureModel } from "./MeasureModel";

export const MeasureStoreModel = types
  .model("MeasureStore")
  .props({
    measures: types.array(MeasureModel)
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async fetchMeasures() {
      const response = await api.getMeasures();
      store.setProp("measures", response.data ?? []);
    },
    async getOneMeasure(id: string) {
      console.log(store)
      return store.measures.find((measure) => measure.id === id);
    },
  }))
  .views((store) => ({
    get measuresList() {
      return store.measures ?? []
    }
  }))

export interface MeasureStore extends Instance<typeof MeasureStoreModel> { }
export interface MeasureStoreSnapshot extends SnapshotOut<typeof MeasureStoreModel> { }
